import { jsPDF } from 'jspdf';
import { convertDistance as c } from './convertDistance';
import { UnitCardFrontPDF } from '../components/card/UnitCardFront';
import { UnitCardBackPDF } from '../components/card/UnitCardBack';
import { addFontsToPDF } from './addFontsToPDF';
import { store } from '../store';

const loadPrimaryImage = async (url: string): Promise<HTMLImageElement> => {
	const image = new Image();
	image.crossOrigin = 'anonymous';
	image.src = url;
	return await image.decode().then(() => {
		return image;
	});
};

export function createUnitCardPDF() {
	const unit = store.getState().editor.unitCard.unit;
	const format = [c(110, 'mm'), c(80, 'mm')];
	const orientation = 'landscape';
	const doc = new jsPDF({
		orientation,
		unit: 'pt',
		format,
		filters: ['ASCIIHexEncode'],
	});

	addFontsToPDF(doc);
	loadPrimaryImage(unit.primaryImageURL).then((image) => {
		console.log(image);
		console.log('Unit card creation started...');

		// Construct the card:
		UnitCardFrontPDF(doc, unit, image);

		// doc.addPage(format, orientation);

		// UnitCardBackPDF(doc, unit);

		console.log('Unit card creation complete, saving...');

		// Save the card:
		doc.save(`${unit.title || 'my unit'}.pdf`);
	});
}
