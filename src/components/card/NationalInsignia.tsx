import React from 'react';
import jsPDF from 'jspdf';
import { pt } from '../../utils/convertDistance';
import { Nationality } from '../../enums/Nations';
import { Era } from '../../enums/Eras';

import BE from '../../../assets/images/insignia/insignia-be.png';
import BR from '../../../assets/images/insignia/insignia-br.png';
import FI_MW from '../../../assets/images/insignia/insignia-fi-mw.png';
import FI_LW from '../../../assets/images/insignia/insignia-fi-lw.png';
import FR from '../../../assets/images/insignia/insignia-fr.png';
import GE_MW from '../../../assets/images/insignia/insignia-ge-mw.png';
import GE_LW from '../../../assets/images/insignia/insignia-ge-lw.png';
import HU from '../../../assets/images/insignia/insignia-hu.png';
import PL from '../../../assets/images/insignia/insignia-pl.png';
import SU from '../../../assets/images/insignia/insignia-su.png';
import US from '../../../assets/images/insignia/insignia-us.png';

const insignia: Record<Nationality, string | {EW: string, MW: string, LW: string}> = {
	'BE': BE,
	'BR': BR,
	'CN': null,
	'FI': {
		'EW': FI_MW,
		'MW': FI_MW,
		'LW': FI_LW,
	},
	'FR': FR,
	'GE': {
		'EW': GE_MW,
		'MW': GE_MW,
		'LW': GE_LW,
	},
	'HU': HU,
	'IT': null,
	'JP': null,
	'NL': null,
	'NO': null,
	'PL': PL,
	'RO': null,
	'SU': SU,
	'US': US,
};

export interface NationalInsigniaProps {
	x: number;
	y: number;
	nationality: Nationality;
	era: Era;
}

// React
export const NationalInsigniaSVG: React.FC<NationalInsigniaProps> = (props: NationalInsigniaProps) => {
	const insigniaDef = insignia[ props.nationality ];
	if (!props.nationality || !insigniaDef) {
		return null;
	}
	const imageURL = typeof insigniaDef === 'string' ? insigniaDef : insigniaDef[ props.era ];
	return (
		<image
			xlinkHref={imageURL}
			width={pt(8.2, 'mm')}
			height={ pt(8.2, 'mm')}
			x={props.x}
			y={props.y}
		/>
	);
};

// jsPDF
export const NationalInsigniaPDF = (doc: jsPDF, props: NationalInsigniaProps) => {
	const insigniaDef = insignia[ props.nationality ];
	if (!props.nationality || !insigniaDef) {
		return null;
	}
	const imageURL = typeof insigniaDef === 'string' ? insigniaDef : insigniaDef[ props.era ];
	doc.addImage(imageURL, 'PNG', props.x, props.y, pt(8.2, 'mm'), pt(8.2, 'mm'));
};
