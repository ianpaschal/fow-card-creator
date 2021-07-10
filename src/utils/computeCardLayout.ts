import { Area } from '../typing/Area';
import { pt } from './convertDistance';
import { CardSettings } from '../CardSettings';
import { Unit } from '../typing/Unit';
import { UnitCardLayout } from '../typing/UnitCardLayout';
import { SoftStatBlockLayout } from '../components/card/SoftStatBlock';
import { ArmorBlockLayout } from '../components/card/ArmorBlock';
import { SaveBlockLayout } from '../components/card/SaveBlock';

export function computeCardLayout(unit: Unit): UnitCardLayout {
	const fullWidth = CardSettings.WIDTH - (2 * CardSettings.MARGIN_OUTER);
	const headerBlock: Area = {
		x: CardSettings.MARGIN_OUTER,
		y: CardSettings.MARGIN_OUTER,
		width: fullWidth,
		height: pt(8.25, 'mm'),
	};
	const motivationBlock: Area = {
		x: CardSettings.MARGIN_OUTER,
		y: CardSettings.MARGIN_OUTER + headerBlock.height + CardSettings.MARGIN_INNER,
		width: SoftStatBlockLayout.width,
		height: SoftStatBlockLayout.calcHeight(unit.motivation),
	};
	const skillBlock: Area = {
		x: CardSettings.MARGIN_OUTER,
		y: motivationBlock.y + motivationBlock.height + CardSettings.MARGIN_INNER,
		width: SoftStatBlockLayout.width,
		height: SoftStatBlockLayout.calcHeight(unit.skill),
	};
	const hitOnBlock: Area = {
		x: CardSettings.WIDTH - (CardSettings.MARGIN_OUTER + SoftStatBlockLayout.width),
		y: CardSettings.MARGIN_OUTER + headerBlock.height + CardSettings.MARGIN_INNER,
		width: SoftStatBlockLayout.width,
		height: SoftStatBlockLayout.calcHeight(unit.hitOn),
	};
	const armorBlock: Area = {
		x: CardSettings.WIDTH - (CardSettings.MARGIN_OUTER + SoftStatBlockLayout.width),
		y: hitOnBlock.y + hitOnBlock.height + CardSettings.MARGIN_INNER,
		width: SoftStatBlockLayout.width,
		// eslint-disable-next-line max-len
		height: SoftStatBlockLayout.headerHeight + 5 * CardSettings.STROKE_WIDTH + 3 * ArmorBlockLayout.ratingHeight,
	};
	const saveBlock: Area = {
		x: CardSettings.WIDTH - (CardSettings.MARGIN_OUTER + SoftStatBlockLayout.width),
		y: hitOnBlock.y + hitOnBlock.height + CardSettings.MARGIN_INNER,
		width: SoftStatBlockLayout.width,
		height: SoftStatBlockLayout.headerHeight + 3 * CardSettings.STROKE_WIDTH + SaveBlockLayout.ratingHeight,
	};
	const mobilityBlock: Area = {
		x: CardSettings.MARGIN_OUTER,
		y: Math.max(skillBlock.y + skillBlock.height + CardSettings.MARGIN_INNER, pt(43.5, 'mm')),
		width: fullWidth,
		height: pt(6.8, 'mm'),
	};
	const weaponsBlock: Omit<Area, 'height'> = {
		x: CardSettings.MARGIN_OUTER,
		y: mobilityBlock.y + mobilityBlock.height + CardSettings.MARGIN_INNER,
		width: fullWidth,
	};

	// TODO: Warn if too tall!

	return {
		headerBlock,
		motivationBlock,
		skillBlock,
		hitOnBlock,
		armorBlock,
		saveBlock,
		mobilityBlock,
		weaponsBlock,
	};
}
