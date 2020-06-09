"use strict";

const Msg = require("../../models/msg");
const Chan = require("../../models/chan");

module.exports = function (irc, network) {
	const client = this;

	irc.on("nick", function (data) {
		const self = data.nick === irc.user.nick;

		if (self) {
			network.setNick(data.new_nick);

			const lobby = network.channels[0];
			const msg = new Msg({
				text: `You're now known as ${data.new_nick}`,
			});
			lobby.pushMessage(client, msg, true);

			client.save();
			client.emit("nick", {
				network: network.uuid,
				nick: data.new_nick,
			});
		}

		network.channels.forEach((chan) => {
			let user;

			if (chan.type === Chan.Type.QUERY) {
				if (chan.name !== data.nick) {
					return;
				}

				chan.name = data.new_nick;

				user = {
					nick: data.nick,
					ident: data.ident,
					hostname: data.hostname,
				};

				client.emit("nick:query", {
					id: chan.id,
					name: data.new_nick,
				});
			} else {
				user = chan.findUser(data.nick);

				if (typeof user === "undefined") {
					return;
				}

				chan.removeUser(user);
				user.nick = data.new_nick;
				chan.setUser(user);

				client.emit("users", {
					chan: chan.id,
				});
			}

			chan.pushMessage(
				client,
				new Msg({
					from: user,
					old_nick: data.nick,
					time: data.time,
					type: Msg.Type.NICK,
				})
			);
		});
	});
};
