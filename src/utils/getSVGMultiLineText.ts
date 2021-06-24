import { TextSVGProps } from '../components/card/generic/Text';

const SPACE = '\u00A0';
const ELLIPSIS = '\u2026';

function calculateWidths(tokens: string[], style: TextSVGProps) {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	const dummyText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	Object.assign(dummyText.style, style);
	svg.appendChild(dummyText);
	document.body.appendChild(svg);

	const getWidth = (text: string) => {
		dummyText.textContent = text;
		return dummyText.getComputedTextLength();
	};

	const tokensWithWidth = tokens.map((token: string) => {
		return {
			token,
			width: getWidth(token),
		};
	});

	const spaceWidth = getWidth(SPACE); // Unicode space

	document.body.removeChild(svg);

	return { tokensWithWidth, spaceWidth };
}

export interface wrapSVGTextStyle {
	width: number;
}

export const getSVGMultiLineText = (tokens: string[], style: TextSVGProps, overflow = 1, maxLines = null) => {
	const { tokensWithWidth, spaceWidth } = calculateWidths(tokens, style);

	const wordsByLines = tokensWithWidth.reduce((result, { token, width }) => {
		const lastLine = result[ result.length - 1 ] || { tokens: [], width: 0 };

		if (lastLine.tokens.length === 0) {
			// First word on line
			const newLine = { tokens: [token], width };
			result.push(newLine);
		} else if (lastLine.width + width + (lastLine.tokens.length - 1 * spaceWidth) < style.width * overflow) {
			// Word can be added to an existing line
			lastLine.tokens.push(token);
			lastLine.width += width + spaceWidth;
		} else {
			// Word too long to fit on existing line
			const newLine = { tokens: [token], width };
			result.push(newLine);
		}

		return result;
	}, []);

	const joinedLines = wordsByLines.map((line) => line.tokens.join(SPACE));

	if (maxLines && maxLines < wordsByLines.length) {
		const limitedJoinedLines = joinedLines.slice(0, maxLines);
		limitedJoinedLines[ maxLines - 1 ] += ELLIPSIS;
		return limitedJoinedLines;
	}
	return joinedLines;
};
