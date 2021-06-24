import { Area } from './Area';

export interface UnitCardLayout {
	headerBlock: Area;
	hitOnBlock: Area;
	armorBlock?: Area;
	mobilityBlock: Area;
	motivationBlock: Area;
	saveBlock?: Area;
	skillBlock: Area;
	weaponsBlock?: Omit<Area, 'height'>;
}
