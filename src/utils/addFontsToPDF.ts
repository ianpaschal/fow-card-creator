import jsPDF from 'jspdf';
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
		{ name: 'OpenSans-Bold', data: OpenSansBold },
		{ name: 'OpenSans-BoldItalic', data: OpenSansBoldItalic },
		{ name: 'OpenSans-ExtraBold', data: OpenSansExtraBold },
		{ name: 'OpenSans-ExtraBoldItalic', data: OpenSansExtraBoldItalic },
		{ name: 'OpenSans-Light', data: OpenSansLight },
		{ name: 'OpenSans-LightItalic', data: OpenSansLightItalic },
		{ name: 'OpenSans-Regular', data: OpenSansRegular },
		{ name: 'OpenSans-RegularItalic', data: OpenSansRegularItalic },
		{ name: 'OpenSans-SemiBold', data: OpenSansSemiBold },
		{ name: 'OpenSans-SemiBoldItalic', data: OpenSansSemiBoldItalic },
		{ name: 'PTSans-Bold', data: PTSansBold },
		{ name: 'PTSans-BoldItalic', data: PTSansBoldItalic },
		{ name: 'PTSans-Regular', data: PTSansRegular },
		{ name: 'PTSans-RegularItalic', data: PTSansRegularItalic },
	];
	fonts.forEach((font: FontDefinition) => {
		const { name, data } = font;
		doc.addFileToVFS(`${name}.ttf`, data);
		doc.addFont(`${name}.ttf`, name, 'normal');
	});
}
