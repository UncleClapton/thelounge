"use strict";

const nickRegExp = /([\w[\]\\`^{|}-]+)/g;

function findNames(text, users) {
	const result = [];

	// Return early if we don't have any nicknames to find
	if (Object.keys(users).length === 0) {
		return result;
	}

	let match;

	while ((match = nickRegExp.exec(text))) {
		if (users[match[1]]) {
			result.push({
				start: match.index,
				end: match.index + match[1].length,
				user: users[match[1]],
			});
		}
	}

	return result;
}

export default findNames;
