import jsPDF from 'jspdf';
import React from 'react';
import { Unit } from '../../typing/Unit';
import { pt } from '../../utils/convertDistance';
import { Settings } from '../../Settings';
import { SoftStatBlock, SoftStatBlockProps } from './SoftStatBlock';
import { HeaderBlock } from './HeaderBlock';
import { Background } from './Background';
import { ArmorBlockLayout, ArmorBlockPDF, ArmorBlockProps, ArmorBlockSVG } from './ArmorBlock';
import { SaveBlockLayout, SaveBlockPDF, SaveBlockProps, SaveBlockSVG } from './SaveBlock';
import { MobilityBlockPDF, MobilityBlockProps, MobilityBlockSVG } from './MobilityBlock';

export interface UnitCardProps {
	unit: Unit;
}

export class UnitCardFrontLayout {
	unit: Unit;

	constructor(props: UnitCardProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get saveBlockProps(): ArmorBlockProps | SaveBlockProps {
		const { unit } = this;
		return {
			x: Settings.CARD_WIDTH - (Settings.CARD_MARGINS + Settings.STAT_BLOCK_WIDTH),
			y: pt(15.125, 'mm') + SoftStatBlock.calcHeight(unit.hitOn) + Settings.SOFT_STAT_MARGIN_BOTTOM,
			unit,
		};
	}

	get motivationBlockProps(): SoftStatBlockProps {
		const { unit } = this;
		return {
			x: Settings.CARD_MARGINS,
			y: pt(15.125, 'mm'),
			unit,
			attribute: 'motivation',
		};
	}

	get skillBlockProps(): SoftStatBlockProps {
		const { unit } = this;
		return {
			x: Settings.CARD_MARGINS,
			y: pt(15.125, 'mm') + SoftStatBlock.calcHeight(unit.motivation) + Settings.SOFT_STAT_MARGIN_BOTTOM,
			unit,
			attribute: 'skill',
		};
	}

	get hitOnBlockProps(): SoftStatBlockProps {
		const { unit } = this;
		return {
			x: Settings.CARD_WIDTH - (Settings.CARD_MARGINS + Settings.STAT_BLOCK_WIDTH),
			y: pt(15.125, 'mm'),
			unit,
			attribute: 'hitOn',
		};
	}

	get stackHeightLeft(): number {
		const { unit } = this;
		let h = 0;
		h += pt(15.125, 'mm');
		h += SoftStatBlock.calcHeight(unit.motivation);
		h += Settings.SOFT_STAT_MARGIN_BOTTOM;
		h += SoftStatBlock.calcHeight(unit.skill);
		h += Settings.SOFT_STAT_MARGIN_BOTTOM;
		return h;
	}

	get stackHeightRight(): number {
		const { unit } = this;
		let h = 0;
		h += pt(15.125, 'mm');
		h += SoftStatBlock.calcHeight(unit.hitOn);
		h += Settings.SOFT_STAT_MARGIN_BOTTOM;
		h += unit.armor ? ArmorBlockLayout.height : SaveBlockLayout.height;
		h += Settings.SOFT_STAT_MARGIN_BOTTOM;
		return h;
	}

	get mobilityBlockProps(): MobilityBlockProps {
		const { unit } = this;
		return {
			y: Math.max(this.stackHeightLeft, this.stackHeightRight),
			unit,
		};
	}
}

export class UnitCard {
	static SVG: React.FC<UnitCardProps> = ({
		unit,
	}: UnitCardProps) => {
		const layout = new UnitCardFrontLayout({ unit });
		return (
			<svg
				id="card-print-front"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				version="1.1"
				width={pt(110, 'mm')}
				height={pt(80, 'mm')}
				viewBox={`0 0 ${pt(110, 'mm')} ${pt(80, 'mm')}`}
				preserveAspectRatio="xMidYMid meet"
			>
				<Background.SVG nationality={unit.nationality} />
				<HeaderBlock.SVG unit={unit} />
				<SoftStatBlock.SVG {...layout.motivationBlockProps} />
				<SoftStatBlock.SVG {...layout.skillBlockProps} />
				<SoftStatBlock.SVG {...layout.hitOnBlockProps} />
				{unit.armor && (
					<ArmorBlockSVG {...layout.saveBlockProps} />
				)}
				{unit.save && (
					<SaveBlockSVG {...layout.saveBlockProps} />
				)}
				<MobilityBlockSVG {...layout.mobilityBlockProps} />
			</svg>
		);
	}

	static PDF = (doc: jsPDF, unit: Unit): void => {
		const layout = new UnitCardFrontLayout({ unit });

		// TODO: Switch to new format:
		Background.PDF(doc, { nationality: unit.nationality });
		HeaderBlock.PDF(doc, {
			unit,
		});
		SoftStatBlock.PDF(doc, layout.motivationBlockProps);
		SoftStatBlock.PDF(doc, layout.skillBlockProps);
		SoftStatBlock.PDF(doc, layout.hitOnBlockProps);
		if (unit.armor) {
			ArmorBlockPDF(doc, layout.saveBlockProps);
		}
		if (unit.save) {
			SaveBlockPDF(doc, layout.saveBlockProps);
		}
		MobilityBlockPDF(doc, layout.mobilityBlockProps);
	}
}
