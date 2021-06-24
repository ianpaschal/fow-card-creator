import { UnitCard } from '../../typing/UnitCard';
import { computeCardLayout } from '../../utils/computeCardLayout';
import { defaultUnit } from './defaultUnit';

export const defaultUnitCard: UnitCard = {
	authorID: 'Unknown',
	created: new Date(),
	id: null,
	isPublic: false,
	layout: computeCardLayout(defaultUnit),
	ratings: {},
	unit: defaultUnit,
};
