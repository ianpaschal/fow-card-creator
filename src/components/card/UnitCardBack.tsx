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

export class UnitCardBackLayout {
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
			y: pt(15.125, 'mm') + SoftStatBlock.calcHeight(unit.hitOn) + Settings.BLOCK_MARGIN,
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
			y: pt(15.125, 'mm') + SoftStatBlock.calcHeight(unit.motivation) + Settings.BLOCK_MARGIN,
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
		h += Settings.BLOCK_MARGIN;
		h += SoftStatBlock.calcHeight(unit.skill);
		h += Settings.BLOCK_MARGIN;
		return h;
	}

	get stackHeightRight(): number {
		const { unit } = this;
		let h = 0;
		h += pt(15.125, 'mm');
		h += SoftStatBlock.calcHeight(unit.hitOn);
		h += Settings.BLOCK_MARGIN;
		h += unit.armor ? ArmorBlockLayout.height : SaveBlockLayout.height;
		h += Settings.BLOCK_MARGIN;
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

export const UnitCardBackSVG: React.FC<UnitCardProps> = ({
	unit,
}: UnitCardProps) => {
	const layout = new UnitCardBackLayout({ unit });
	return (
		<svg
			id="card-print-back"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			version="1.1"
			width={pt(110, 'mm')}
			height={pt(80, 'mm')}
			viewBox={`0 0 ${pt(110, 'mm')} ${pt(80, 'mm')}`}
			preserveAspectRatio="xMidYMid meet"
		>
			<Background.SVG {...unit} />
			<HeaderBlock.SVG unit={unit} />
		</svg>
	);
};

export const UnitCardBackPDF = (doc: jsPDF, unit: Unit): void => {
	const layout = new UnitCardBackLayout({ unit });

	// TODO: Switch to new format:
	Background.PDF(doc, { ...unit });
	HeaderBlock.PDF(doc, {
		unit,
	});
};
