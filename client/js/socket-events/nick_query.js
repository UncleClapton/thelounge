"use strict";

import socket from "../socket";
import store from "../store";

// Handle nick changes for query windows
socket.on("nick:query", function (data) {
	const channel = store.getters.findChannel(data.id);

	if (channel && channel.channel) {
		channel.channel.name = data.name;
	}
});
