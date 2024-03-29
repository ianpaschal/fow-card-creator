import { TextSVGProps } from '../components/card/generic/Text';

export const SPACE_CHAR = '\u00A0';
export const ELLIPSIS_CHAR = '\u2026';

export interface MultiLineTextCustomCharacters {
	separator?: string;
	linePrefix?: string;
	lineSuffix?: string;
}

function calculateWidths(tokens: string[], style: TextSVGProps, customCharacters: MultiLineTextCustomCharacters) {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	const dummyText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	Object.assign(dummyText.style, style);
	svg.appendChild(dummyText);
	document.body.appendChild(svg);

	const getWidth = (text: string) => {
		dummyText.textContent = text;
		return dummyText.getComputedTextLength();
	};

	const widths = {
		tokens: tokens.map((token: string) => getWidth(token)),
		space: getWidth(SPACE_CHAR),
		separator: customCharacters.separator ? getWidth(customCharacters.separator) : 0,
		linePrefix: customCharacters.linePrefix ? getWidth(customCharacters.linePrefix) : 0,
		lineSuffix: customCharacters.lineSuffix ? getWidth(customCharacters.lineSuffix) : 0,
	};

	document.body.removeChild(svg);

	return widths;
}

export interface MultiLineTextOptions extends MultiLineTextCustomCharacters {
	overflow?: number;
	maxLines?: number;
}

export const getMultiLineText = (tokens: string[], style: TextSVGProps, options?: MultiLineTextOptions) => {
	const widths = calculateWidths(tokens, style, {
		...options,
	});

	const maxWidth = style.width * (options.overflow || 1);

	const tokenLines = widths.tokens.reduce((lines, tokenWidth, i) => {
		const token = tokens[ i ];
		const startNewLine = () => lines.push({
			tokens: [...(options.linePrefix ? [options.linePrefix] : []), token],
			totalWidth: (options.linePrefix ? widths.linePrefix + widths.space : 0) + tokenWidth,
		});
		const currentLine = lines[ lines.length - 1 ];
		if (!currentLine) {
			startNewLine();
		} else {
			const nextWidth = (options.separator ? widths.separator + 2 * widths.space : widths.space) + tokenWidth;
			if (currentLine.totalWidth + nextWidth <= maxWidth) {
				// Add the next token if it (and its separator) will fit on the current line:
				if (options.separator) {
					currentLine.tokens.push(options.separator);
				}
				currentLine.tokens.push(token);
				currentLine.totalWidth += nextWidth;
			} else {
				if (options.lineSuffix) {
					currentLine.tokens.push(options.lineSuffix);
				}
				startNewLine();
			}
		}
		return lines;
	}, []);

	// Always add a final suffix to the last line (if using suffixes):
	if (options.lineSuffix) {
		tokenLines[ tokenLines.length - 1 ].tokens.push(options.lineSuffix);
	}

	const joinedLines = tokenLines.map((line) => line.tokens.join(SPACE_CHAR));

	if (options.maxLines && options.maxLines < tokenLines.length) {
		const limitedJoinedLines = joinedLines.slice(0, options.maxLines);
		limitedJoinedLines[ options.maxLines - 1 ] += ELLIPSIS_CHAR;
		return limitedJoinedLines;
	}
	return joinedLines;
};
