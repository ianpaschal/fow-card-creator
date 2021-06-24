import { Unit } from './Unit';
import { UnitCardLayout } from './UnitCardLayout';

export interface UnitCard {
	authorID: string;
	created: Date;
	id: string;
	isPublic: boolean;
	layout: UnitCardLayout;
	ratings: {[key: string]: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10};
	unit: Unit;
}
