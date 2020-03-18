"use strict";

const _ = require("lodash");

module.exports = User;

function User(attr, prefixLookup = {}) {
	console.log("NEW-USER", attr);
	_.defaults(this, attr, {
		modes: [],
		away: "",
		mode: "",
		nick: "",
		ident: "",
		hostname: "",
		lastMessage: 0,
	});

	this.setModes(this.modes, prefixLookup);
}

User.prototype.setModes = function(modes, prefixLookup) {
	// irc-framework sets character mode, but The Lounge works with symbols
	this.modes = modes.map((mode) => prefixLookup[mode]);

	this.mode = this.modes[0] || "";
};

User.prototype.toJSON = function() {
	return {
		nick: this.nick,
		mode: this.mode,
		ident: this.ident,
		hostname: this.hostname,
		lastMessage: this.lastMessage,
	};
};
