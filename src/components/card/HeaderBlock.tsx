import React from 'react';
import jsPDF from 'jspdf';
import { Unit } from '../../typing/Unit';
import { pt } from '../../utils/convertDistance';
import { Settings } from '../../Settings';
import { RoundedRectangle } from '../../drawing/RoundedRectangle';

export interface HeaderBlockProps {
	unit: Unit;
}

export class HeaderBlock {
	static SVG: React.FC<HeaderBlockProps> = ({
		unit,
	}: HeaderBlockProps) => {
		return (
			<g transform={`translate(${Settings.CARD_MARGINS} ${Settings.CARD_MARGINS + pt(0.05, 'mm')})`}>
				<rect
					x={0}
					y={0}
					width={pt(100, 'mm')}
					height={pt(8.25, 'mm')}
					rx={Settings.CORNER_RADIUS}
					fill={unit.accentColor}
				/>
			</g>
		);
	}

	static PDF = (doc: jsPDF, {
		unit,
	}: HeaderBlockProps): void => {
		RoundedRectangle.PDF(doc, {
			x: Settings.CARD_MARGINS,
			y: Settings.CARD_MARGINS + pt(0.05, 'mm'),
			w: pt(100, 'mm'),
			h: pt(8.25, 'mm'),
			r: Settings.CORNER_RADIUS,
			fill: unit.accentColor,
		});
	}
}
