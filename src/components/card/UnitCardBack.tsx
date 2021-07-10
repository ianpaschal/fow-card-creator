import jsPDF from 'jspdf';
import React from 'react';
import { Unit } from '../../typing/Unit';
import { CardSettings } from '../../CardSettings';
import { ConnectedBackgroundSVG, ConnectedBackgroundPDF } from './Background';
import { ConnectedHeaderBlockSVG, ConnectedHeaderBlockPDF } from './HeaderBlock';

export const UnitCardBackSVG: React.FC = () => {
	return (
		<svg
			id="card-print-back"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			version="1.1"
			width={CardSettings.WIDTH}
			height={CardSettings.HEIGHT}
			viewBox={`0 0 ${CardSettings.WIDTH} ${CardSettings.HEIGHT}`}
			preserveAspectRatio="xMidYMid meet"
		>
			<ConnectedBackgroundSVG />
			<ConnectedHeaderBlockSVG />
		</svg>
	);
};

export const UnitCardBackPDF = (doc: jsPDF, unit: Unit): void => {
	ConnectedBackgroundPDF(doc);
	ConnectedHeaderBlockPDF(doc);
};
