import { jsPDF } from 'jspdf';
import { Unit } from '../typing/Unit';
import { convertDistance as c } from './convertDistance';
import { UnitCardFront } from '../components/card/UnitCardFront';
import { UnitCardBackPDF } from '../components/card/UnitCardBack';
import { addFontsToPDF } from './addFontsToPDF';

export function createUnitCardPDF(unit: Unit) {
	const format = [c(110, 'mm'), c(80, 'mm')];
	const orientation = 'landscape';
	const doc = new jsPDF({
		orientation,
		unit: 'pt',
		format,
		filters: ['ASCIIHexEncode'],
	});

	addFontsToPDF(doc);

	// TODO: Remove once everything uses the Text primitive
	doc.setFont('OpenSans-Bold');
	doc.setFontSize(10);

	// Construct the card:
	UnitCardFront.PDF(doc, unit);

	doc.addPage(format, orientation);

	UnitCardBackPDF(doc, unit);

	// Save the card:
	doc.save(`${unit.title || 'my unit'}.pdf`);
}
