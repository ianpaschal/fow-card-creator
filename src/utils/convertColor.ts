export const componentToHex = (c: number): string => {
	const hex = c.toString(16);
	return hex.length == 1 ? '0' + hex : hex;
};

export const rgbToHex = (stringRGB: string): string => {
	const values = stringRGB.split('(')[ 1 ].split(')')[ 0 ].split(',');
	let stringHex = '#';
	for(let i = 0; i < values.length; i++) {
		stringHex += componentToHex(parseInt(values[ i ]));
	}
	return stringHex;
};

export const convertRGBCMYK = function(r, g, b, normalized) {
	let c = 1 - (r / 255);
	let m = 1 - (g / 255);
	let y = 1 - (b / 255);
	let k = Math.min(c, Math.min(m, y));

	c = (c - k) / (1 - k);
	m = (m - k) / (1 - k);
	y = (y - k) / (1 - k);

	if(!normalized) {
		c = Math.round(c * 10000) / 100;
		m = Math.round(m * 10000) / 100;
		y = Math.round(y * 10000) / 100;
		k = Math.round(k * 10000) / 100;
	}

	c = isNaN(c) ? 0 : c;
	m = isNaN(m) ? 0 : m;
	y = isNaN(y) ? 0 : y;
	k = isNaN(k) ? 0 : k;

	return {
		c: c,
		m: m,
		y: y,
		k: k,
	};
};
