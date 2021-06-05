import { TextSVGProps } from '../components/card/generic/Text';

function calculateWordWidths(text: string, style: TextSVGProps) {
	// Calculate length of each word to be used to determine number of words per line
	const words: string[] = text.split(/\s+/);
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	const dummyText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	Object.assign(dummyText.style, {
		fontSize: 10,
		fontFamily: 'Foo',
	});
	svg.appendChild(dummyText);
	document.body.appendChild(svg);

	const getWidth = (text: string, style) => {
		Object.assign(dummyText.style, style);
		dummyText.textContent = text;

		return dummyText.getComputedTextLength();
	};

	const wordsWithComputedWidth = words.map((word: string) => {
		return {
			word,
			width: getWidth(word, style),
		};
	});

	const spaceWidth = getWidth('\u00A0', style); // Unicode space

	document.body.removeChild(svg);

	return { wordsWithComputedWidth, spaceWidth };
}

export interface wrapSVGTextStyle {
	width: number;
}

export const getSVGMultiLineText = (text: string, style: TextSVGProps, overflow = 1) => {

	const { wordsWithComputedWidth, spaceWidth } = calculateWordWidths(text, style);

	const wordsByLines = wordsWithComputedWidth.reduce((result, { word, width }) => {
		const lastLine = result[ result.length - 1 ] || { words: [], width: 0 };

		if (lastLine.words.length === 0) {
			// First word on line
			const newLine = { words: [word], width };
			result.push(newLine);
		} else if (lastLine.width + width + (lastLine.words.length * spaceWidth) < style.w * overflow) {
			// Word can be added to an existing line
			lastLine.words.push(word);
			lastLine.width += width;
		} else {
			// Word too long to fit on existing line
			const newLine = { words: [word], width };
			result.push(newLine);
		}

		return result;
	}, []);

	return wordsByLines.map((line) => line.words.join(' ')).slice(0, style.maxLines || wordsByLines.length);
};
