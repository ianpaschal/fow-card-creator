import { Area } from '../typing/Area';
import { pt } from './convertDistance';
import { Settings } from '../Settings';
import { Unit } from '../typing/Unit';
import { UnitCardLayout } from '../typing/UnitCardLayout';
import { SoftStatBlockLayout } from '../components/card/SoftStatBlock';

export function computeCardLayout(unit: Unit): UnitCardLayout {
	const fullWidth = Settings.CARD_WIDTH - (2 * Settings.CARD_MARGINS);
	const headerBlock: Area = {
		x: Settings.CARD_MARGINS,
		y: Settings.CARD_MARGINS,
		width: fullWidth,
		height: pt(8.25, 'mm'),
	};
	const motivationBlock: Area = {
		x: Settings.CARD_MARGINS,
		y: Settings.CARD_MARGINS + headerBlock.height + Settings.BLOCK_MARGIN,
		width: Settings.STAT_BLOCK_WIDTH,
		height: SoftStatBlockLayout.calcHeight(unit.motivation),
	};
	const skillBlock: Area = {
		x: Settings.CARD_MARGINS,
		y: motivationBlock.y + motivationBlock.height + Settings.BLOCK_MARGIN,
		width: Settings.STAT_BLOCK_WIDTH,
		height: SoftStatBlockLayout.calcHeight(unit.skill),
	};
	const hitOnBlock: Area = {
		x: Settings.CARD_MARGINS,
		y: Settings.CARD_MARGINS + headerBlock.height + Settings.BLOCK_MARGIN,
		width: Settings.STAT_BLOCK_WIDTH,
		height: SoftStatBlockLayout.calcHeight(unit.hitOn),
	};
	const mobilityBlock: Area = {
		x: Settings.CARD_MARGINS,
		y: Math.max(skillBlock.y + skillBlock.height + Settings.BLOCK_MARGIN, pt(43.5, 'mm')),
		width: fullWidth,
		height: pt(6.8, 'mm'),
	};
	const weaponsBlock: Omit<Area, 'height'> = {
		x: Settings.CARD_MARGINS,
		y: mobilityBlock.y + mobilityBlock.height + Settings.BLOCK_MARGIN,
		width: fullWidth,
	};

	return {
		headerBlock,
		motivationBlock,
		skillBlock,
		hitOnBlock,
		mobilityBlock,
		weaponsBlock,
	};
}
