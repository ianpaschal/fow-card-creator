import { UnitCard } from '../typing/UnitCard';
import { computeCardLayout } from './computeCardLayout';
import { createDefaultUnit } from './createDefaultUnit';

export const createDefaultUnitCard = (): UnitCard => {
	const unit = createDefaultUnit();
	return {
		authorID: 'Unknown',
		created: new Date(),
		id: null,
		isPublic: false,
		layout: computeCardLayout(unit),
		ratings: {},
		unit,
	};
};
