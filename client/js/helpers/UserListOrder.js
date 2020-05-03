const userModes = {
	"~": "Owner",
	"&": "Administrators",
	"!": "Administrators",
	"@": "Operators",
	"%": "Half-Operators",
	"+": "Voiced",
	"": "Users",
};

class UserListOrder {
	constructor(orderString = "") {
		this.orderString = orderString;
		this.groupOrder = {};
		this.config = {};

		if (orderString.length) {
			String(orderString || "")
				.replace(/\r\n|\r|\n/g, "\n")
				.split("\n")
				.forEach((groupString) => {
					const [groupName, matchListString] = groupString.split(":");

					if (!groupName || !matchListString) {
						return;
					}

					this.groupOrder[groupName] = null;

					(matchListString.split(",") || []).forEach((matchRule) => {
						this.config[matchRule] = groupName;
					});
				});

			this.groupOrder.Users = null;
		}
	}

	groupByModes(userList, filtered = false) {
		const groups = {};

		for (const user of userList) {
			const userObj = filtered ? user.original : user;

			const modeName = userModes[userObj.mode];

			if (!groups[modeName]) {
				groups[modeName] = [];
			}

			groups[modeName].push(user);
		}

		return groups;
	}

	groupUsers(userList, filtered = false) {
		if (!this.orderString.length) {
			return this.groupByModes(userList, filtered);
		}

		const groups = {...this.groupOrder};

		for (const user of userList) {
			const userObj = filtered ? user.original : user;
			const userString = `${userObj.nick}!${userObj.ident || ""}@${userObj.hostname || ""}`;
			let matchedGroup = "Users";

			for (const [matchRule, groupName] of Object.entries(this.config)) {
				if (userString.includes(matchRule)) {
					matchedGroup = groupName;
					break;
				}
			}

			if (!groups[matchedGroup]) {
				groups[matchedGroup] = [];
			}

			groups[matchedGroup].push(user);
		}

		return groups;
	}
}

export default UserListOrder;
