import { pt } from './utils/convertDistance';

// Control whether to use the Battlefront dimension (sometimes a bit random)
const useBF = true;

export const CardSettings = {
	CORNER_RADIUS: pt(1, 'mm'),
	HEIGHT: pt(80, 'mm'),
	MARGIN_INNER: pt(1.65, 'mm'),
	MARGIN_OUTER: pt(5, 'mm'),
	STROKE_WIDTH: useBF ? 0.75 : pt(0.25, 'mm'),
	WIDTH: pt(110, 'mm'),
	COLOR_BLACK: '#000000',
	COLOR_RED: '#D2232A',
	COLOR_WHITE: '#FFFFFF',
	COLOR_GRAY: '#CCCCCC',
};
