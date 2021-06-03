import { jsPDF } from 'jspdf';
import { Unit } from '../typing/Unit';
import { convertDistance as c } from './convertDistance';
import { UnitCard } from '../components/card/UnitCard';
import { addFontsToPDF } from './addFontsToPDF';

export function createUnitCardPDF(unit: Unit) {
	const doc = new jsPDF({
		orientation: 'landscape',
		unit: 'pt',
		format: [c(110, 'mm'), c(80, 'mm')],
		filters: ['ASCIIHexEncode'],
	});

	addFontsToPDF(doc);
	doc.setFont('OpenSans-Bold');
	doc.setFontSize(10);

	// Construct the card:
	UnitCard.PDF(doc, unit);

	// Save the card:
	doc.save(`${unit.title || 'my unit'}.pdf`);
}
