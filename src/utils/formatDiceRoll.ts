export function formatDiceRoll(value: number, useAuto?: boolean): string {
	if (value < 2 && useAuto) {
		return 'AUTO';
	}
	return value + (value < 6 && '+');
}
