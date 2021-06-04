import jsPDF from 'jspdf';
import { FontNames } from '../enums/FontNames';
import OpenSansBold from '../../assets/fonts/OpenSans-Bold';
import OpenSansBoldItalic from '../../assets/fonts/OpenSans-BoldItalic';
import OpenSansExtraBold from '../../assets/fonts/OpenSans-ExtraBold';
import OpenSansExtraBoldItalic from '../../assets/fonts/OpenSans-ExtraBoldItalic';
import OpenSansLight from '../../assets/fonts/OpenSans-Light';
import OpenSansLightItalic from '../../assets/fonts/OpenSans-LightItalic';
import OpenSansRegular from '../../assets/fonts/OpenSans-Regular';
import OpenSansRegularItalic from '../../assets/fonts/OpenSans-RegularItalic';
import OpenSansSemiBold from '../../assets/fonts/OpenSans-SemiBold';
import OpenSansSemiBoldItalic from '../../assets/fonts/OpenSans-SemiBoldItalic';
import PTSansBold from '../../assets/fonts/PTSans-Bold';
import PTSansBoldItalic from '../../assets/fonts/PTSans-BoldItalic';
import PTSansRegular from '../../assets/fonts/PTSans-Regular';
import PTSansRegularItalic from '../../assets/fonts/PTSans-RegularItalic';

interface FontDefinition {
	name: string;
	data: string;
}

export function addFontsToPDF(doc: jsPDF) {
	const fonts: FontDefinition[] = [
		{ name: FontNames.OPEN_SANS_BOLD_ITALIC, data: OpenSansBoldItalic },
		{ name: FontNames.OPEN_SANS_BOLD, data: OpenSansBold },
		{ name: FontNames.OPEN_SANS_EXTRA_BOLD_ITALIC, data: OpenSansExtraBoldItalic },
		{ name: FontNames.OPEN_SANS_EXTRA_BOLD, data: OpenSansExtraBold },
		{ name: FontNames.OPEN_SANS_LIGHT_ITALIC, data: OpenSansLightItalic },
		{ name: FontNames.OPEN_SANS_LIGHT, data: OpenSansLight },
		{ name: FontNames.OPEN_SANS_REGULAR_ITALIC, data: OpenSansRegularItalic },
		{ name: FontNames.OPEN_SANS_REGULAR, data: OpenSansRegular },
		{ name: FontNames.OPEN_SANS_SEMI_BOLD_ITALIC, data: OpenSansSemiBoldItalic },
		{ name: FontNames.OPEN_SANS_SEMI_BOLD, data: OpenSansSemiBold },
		{ name: FontNames.PT_SANS_BOLD_ITALIC, data: PTSansBoldItalic },
		{ name: FontNames.PT_SANS_BOLD, data: PTSansBold },
		{ name: FontNames.PT_SANS_REGULAR_ITALIC, data: PTSansRegularItalic },
		{ name: FontNames.PT_SANS_REGULAR, data: PTSansRegular },
	];
	fonts.forEach((font: FontDefinition) => {
		const { name, data } = font;
		doc.addFileToVFS(`${name}.ttf`, data);
		doc.addFont(`${name}.ttf`, name, 'normal');
	});
}
