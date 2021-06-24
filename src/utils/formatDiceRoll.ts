import { DiceRollValue } from '../typing/DiceRollValue';

export function formatDiceRoll(value: number | DiceRollValue, useAuto = true): string {
	if (value === 1 && useAuto) {
		return 'AUTO';
	}
	if (value < 6) {
		return `${value}+`;
	}
	return '6';
}
