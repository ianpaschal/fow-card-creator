/* eslint-disable max-statements */
export function wraptorect(textnode, boxObject, padding, linePadding) {

	const x_pos = parseInt(boxObject.getAttribute('x'));
	const y_pos = parseInt(boxObject.getAttribute('y'));
	const boxwidth = parseInt(boxObject.getAttribute('width'));
	const fz = parseInt(window.getComputedStyle(textnode)[ 'font-size' ]);  // We use this to calculate dy for each TSPAN.

	const line_height = fz + linePadding;

	// Clone the original text node to store and display the final wrapping text.

	const wrapping = textnode.cloneNode(false);        // False means any TSPANs in the textnode will be discarded
	wrapping.setAttributeNS(null, 'x', x_pos + padding);
	wrapping.setAttributeNS(null, 'y', y_pos + padding);

	// Make a copy of this node and hide it to progressively draw, measure and calculate line breaks.

	const testing = wrapping.cloneNode(false);
	testing.setAttributeNS(null, 'visibility', 'hidden');  // Comment this out to debug

	var testingTSPAN = document.createElementNS(null, 'tspan');
	var testingTEXTNODE = document.createTextNode(textnode.textContent);
	testingTSPAN.appendChild(testingTEXTNODE);

	testing.appendChild(testingTSPAN);
	const tester = document.getElementsByTagName('svg')[ 0 ].appendChild(testing);

	const words = textnode.textContent.split(' ');
	let line = line2 = '';
	let linecounter = 0;
	let testwidth;

	for (let n = 0; n < words.length; n++) {

		line2 = line + words[ n ] + ' ';
		testing.textContent = line2;
		testwidth = testing.getBBox().width;

		if ((testwidth + 2 * padding) > boxwidth) {

			testingTSPAN = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
			testingTSPAN.setAttributeNS(null, 'x', x_pos + padding);
			testingTSPAN.setAttributeNS(null, 'dy', line_height);

			testingTEXTNODE = document.createTextNode(line);
			testingTSPAN.appendChild(testingTEXTNODE);
			wrapping.appendChild(testingTSPAN);

			line = words[ n ] + ' ';
			linecounter++;
		} else {
			line = line2;
		}
	}

	var testingTSPAN = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
	testingTSPAN.setAttributeNS(null, 'x', x_pos + padding);
	testingTSPAN.setAttributeNS(null, 'dy', line_height);

	var testingTEXTNODE = document.createTextNode(line);
	testingTSPAN.appendChild(testingTEXTNODE);

	wrapping.appendChild(testingTSPAN);

	testing.parentNode.removeChild(testing);
	textnode.parentNode.replaceChild(wrapping, textnode);

	return linecounter;
}

document.getElementById('original').onmouseover = function () {

	const container = document.getElementById('destination');
	const numberoflines = wraptorect(this, container, 20, 1);
	console.log(numberoflines);  // In case you need it

};
