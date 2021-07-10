import jsPDF from 'jspdf';
import React from 'react';
import { ConnectedBackgroundSVG, ConnectedBackgroundPDF } from './Background';
import { ConnectedHeaderBlockSVG, ConnectedHeaderBlockPDF } from './HeaderBlock';
import { SVGWrapper } from './SVGWrapper';

export const UnitCardBackSVG: React.FC = () => {
	return (
		<SVGWrapper>
			<ConnectedBackgroundSVG />
			<ConnectedHeaderBlockSVG />
		</SVGWrapper>
	);
};

export const UnitCardBackPDF = (doc: jsPDF): void => {
	ConnectedBackgroundPDF(doc);
	ConnectedHeaderBlockPDF(doc);
};
