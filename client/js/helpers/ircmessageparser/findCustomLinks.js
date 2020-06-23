"use strict";

function findCustomLinks(text, detectors = {}) {
	const result = [];

	// Return early if we don't have any custom links to find
	if (Object.keys(detectors).length === 0) {
		return result;
	}

	for (const detector of Object.values(detectors)) {
		if (!detector.pattern.trim() || !detector.link.trim()) {
			return
		}

		try {
			const regExp = new RegExp(detector.pattern, "g");
			let match;

			while ((match = regExp.exec(text))) {
				result.push({
					start: match.index,
					end: match.index + match[0].length,
					link: detector.link.replace("$@", match[0]),
				});
			}
		} catch (e) {
			// do nothing if it's invalid for now
		}
	}

	return result;
}

module.exports = findCustomLinks;
