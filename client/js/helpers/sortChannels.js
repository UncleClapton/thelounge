export default function sortChannels(chanA, chanB) {
	if (chanA.name > chanB.name) {
		return 1;
	}

	if (chanA.name < chanB.name) {
		return -1;
	}

	return 0;
}
