import jsPDF from 'jspdf';
import React from 'react';
import { Unit } from '../../typing/Unit';
import { Settings } from '../../Settings';
import { ConnectedHeaderBlockSVG, HeaderBlockPDF } from './HeaderBlock';
import { BackgroundPDF, ConnectedBackgroundSVG } from './Background';

export const UnitCardBackSVG: React.FC = () => {
	return (
		<svg
			id="card-print-back"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			version="1.1"
			width={Settings.CARD_WIDTH}
			height={Settings.CARD_HEIGHT}
			viewBox={`0 0 ${Settings.CARD_WIDTH} ${Settings.CARD_HEIGHT}`}
			preserveAspectRatio="xMidYMid meet"
		>
			<ConnectedBackgroundSVG />
			<ConnectedHeaderBlockSVG />
		</svg>
	);
};

export const UnitCardBackPDF = (doc: jsPDF, unit: Unit): void => {
	BackgroundPDF(doc, unit);
	HeaderBlockPDF(doc, unit);
};
