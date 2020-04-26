export default function sortChannels(chanA, chanB) {
	const chanAName = chanA.name.toLowerCase();
	const chanBName = chanB.name.toLowerCase();

	if (chanAName > chanBName) {
		return 1;
	}

	if (chanAName < chanBName) {
		return -1;
	}

	return 0;
}
