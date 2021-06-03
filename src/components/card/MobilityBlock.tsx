import jsPDF from 'jspdf';
import React from 'react';
import { LabeledRectangle, LabeledRectangleProps } from '../../drawing/LabeledRectangle';
import { RoundedRectangle, RoundedRectangleProps, RoundedRectangleSVG } from '../../drawing/RoundedRectangle';
import { Settings } from '../../Settings';
import { Unit } from '../../typing/Unit';
import { pt } from '../../utils/convertDistance';
import { TextPDF, TextProps, TextSVG } from './primitives/Text';

export interface MobilityBlockProps {
	unit: Unit;
	y: number;
}

export class MobilityBlockLayout {
	unit: Unit;
	y: number;
	height: number = pt(6.8, 'mm');

	constructor(props: MobilityBlockProps) {
		this.unit = props.unit;
		this.y = props.y;
	}

	get outerArea(): RoundedRectangleProps {
		return {
			x: Settings.CARD_MARGINS,
			y: this.y,
			w: Settings.CARD_WIDTH - (2 * Settings.CARD_MARGINS),
			h: this.height,
			r: Settings.CORNER_RADIUS,
		};
	}

	get innerArea(): RoundedRectangleProps {
		return { x: 0, y: 0, w: 0, h: 0, r: 0 };
	}

	get frameProps(): LabeledRectangleProps {
		return {
			...this.outerArea,
			headerHeight: pt(2.9, 'mm'),
			fontSize: 4.5,
			r: Settings.CORNER_RADIUS,
			stroke: this.unit.accentColor,
			fill: '#FFFFFF',
		};
	}
}

export const MobilityBlockPDF = (doc: jsPDF, props: MobilityBlockProps) => {
	const layout = new MobilityBlockLayout(props);
	LabeledRectangle.PDF(doc, layout.frameProps);
};

export const MobilityBlockSVG: React.FC<MobilityBlockProps> = (props: MobilityBlockProps) => {
	const layout = new MobilityBlockLayout(props);
	return (
		<>
			<LabeledRectangle.SVG {...layout.frameProps} />
		</>
	);
};
