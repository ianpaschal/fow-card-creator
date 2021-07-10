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
	path: string;
}

export function addFontsToPDF(doc: jsPDF) {
	const fonts: FontDefinition[] = [
		{ name: FontNames.OPEN_SANS_BOLD_ITALIC, path: OpenSansBoldItalic },
		{ name: FontNames.OPEN_SANS_BOLD, path: OpenSansBold },
		{ name: FontNames.OPEN_SANS_EXTRA_BOLD_ITALIC, path: OpenSansExtraBoldItalic },
		{ name: FontNames.OPEN_SANS_EXTRA_BOLD, path: OpenSansExtraBold },
		{ name: FontNames.OPEN_SANS_LIGHT_ITALIC, path: OpenSansLightItalic },
		{ name: FontNames.OPEN_SANS_LIGHT, path: OpenSansLight },
		{ name: FontNames.OPEN_SANS_REGULAR_ITALIC, path: OpenSansRegularItalic },
		{ name: FontNames.OPEN_SANS_REGULAR, path: OpenSansRegular },
		{ name: FontNames.OPEN_SANS_SEMI_BOLD_ITALIC, path: OpenSansSemiBoldItalic },
		{ name: FontNames.OPEN_SANS_SEMI_BOLD, path: OpenSansSemiBold },
		{ name: FontNames.PT_SANS_BOLD_ITALIC, path: PTSansBoldItalic },
		{ name: FontNames.PT_SANS_BOLD, path: PTSansBold },
		{ name: FontNames.PT_SANS_REGULAR_ITALIC, path: PTSansRegularItalic },
		{ name: FontNames.PT_SANS_REGULAR, path: PTSansRegular },
	];
	fonts.forEach((font: FontDefinition) => {
		const { name, path } = font;
		doc.addFileToVFS(`${name}.ttf`, path);
		doc.addFont(`${name}.ttf`, name, 'normal');
	});
}
