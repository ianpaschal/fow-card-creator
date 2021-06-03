import { MM_PER_INCH, PT_PER_INCH } from '../Constants';

export const convertDistance = (amount: number, from: 'mm' | 'pt', to = 'pt'): number => {
	if (from === 'mm' && to === 'pt') {
		return (amount / MM_PER_INCH) * PT_PER_INCH;
	}
	if (from === 'pt' && to === 'mm') {
		return (amount / PT_PER_INCH) * MM_PER_INCH;
	}
	return null;
};

export const pt = (amount: number, from: 'mm') => {
	return convertDistance(amount, from);
};

export const mm = (amount: number, from: 'pt') => {
	return convertDistance(amount, from);
};
