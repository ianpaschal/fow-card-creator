import { jsPDF } from 'jspdf';
import { pt } from './convertDistance';
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
	const unitID = store.getState().editor.unitCard.id;
	const format = [pt(110, 'mm'), pt(80, 'mm')];
	const orientation = 'landscape';
	const doc = new jsPDF({
		orientation,
		unit: 'pt',
		format,
		filters: ['ASCIIHexEncode'],
	});

	addFontsToPDF(doc);
	loadPrimaryImage(unit.primaryImageURL).then((image) => {
		UnitCardFrontPDF(doc, unit, image);
		doc.addPage(format, orientation);
		UnitCardBackPDF(doc, unit);
		doc.save(`${unitID}.pdf`);
	});
}
