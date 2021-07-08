import { RatingsMap } from './RatingsMap';
import { Unit } from './Unit';
import { UnitCardLayout } from './UnitCardLayout';

export interface UnitCard {
	authorID: string;
	created: Date;
	id: string;
	isPublic: boolean;
	layout: UnitCardLayout;
	ratings: RatingsMap;
	unit: Unit;
}
