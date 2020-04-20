"use strict";

import socket from "../socket";
import store from "../store";

// Handle nick changes for query windows
socket.on("nick:query", function (data) {
	const chanInfo = store.getters.findChannel(data.chanId);

	if (chanInfo && chanInfo.channel) {
		chanInfo.channel.name = data.new_nick;
	}
});
