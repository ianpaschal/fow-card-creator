import React from 'react';
import jsPDF from 'jspdf';
import { pt } from '../../utils/convertDistance';
import { Nationality } from '../../enums/Nations';
import { Era } from '../../enums/Eras';

import MWBackgroundPNG from '../../../assets/images/unit-card-background-mw.png';
import LWBackgroundPNG from '../../../assets/images/unit-card-background-lw.png';
// import FlagFI from '../../../assets/images/flags/print/flag-fi.png';
// import FlagFR from '../../../assets/images/flags/print/flag-fr.png';
// import FlagHU from '../../../assets/images/flags/print/flag-hu.png';
// import FlagIT from '../../../assets/images/flags/print/flag-it.png';
// import FlagJP from '../../../assets/images/flags/print/flag-jp.png';
// import FlagNL from '../../../assets/images/flags/print/flag-nl.png';
// import FlagNO from '../../../assets/images/flags/print/flag-no.png';
// import FlagPL from '../../../assets/images/flags/print/flag-pl.png';
// import FlagRO from '../../../assets/images/flags/print/flag-ro.png';
import FlagBE from '../../../assets/images/flags/print/flag-be.png';
import FlagBR from '../../../assets/images/flags/print/flag-br.png';
import FlagCN from '../../../assets/images/flags/print/flag-cn.png';
import FlagGE from '../../../assets/images/flags/print/flag-ge.png';
import FlagSU from '../../../assets/images/flags/print/flag-su.png';
import FlagUS from '../../../assets/images/flags/print/flag-us.png';

export interface BackgroundProps {
	nationality?: string;
	era?: Era;
}

const flags: Record<Nationality, string> = {
	'BE': FlagBE,
	'BR': FlagBR,
	'CN': FlagCN,
	'GE': FlagGE,
	'SU': FlagSU,
	'US': FlagUS,
	'FI': null,
	'FR': null,
	'HU': null,
	'IT': null,
	'JP': null,
	'NL': null,
	'NO': null,
	'PL': null,
	'RO': null,
};

export class Background {
	static SVG: React.FC<BackgroundProps> = ({
		nationality,
		era,
	}: BackgroundProps) => {
		return (
			<>
				{nationality && flags[ nationality ] && (
					<image
						xlinkHref={flags[ nationality ]}
						width={pt(116, 'mm')}
						height={ pt(86, 'mm')}
						x={pt(-3, 'mm')}
						y={pt(-3, 'mm')}
					/>
				)}
				<image
					xlinkHref={era === 'LW' ? LWBackgroundPNG : MWBackgroundPNG}
					width={pt(116, 'mm')}
					height={ pt(86, 'mm')}
					x={pt(-3, 'mm')}
					y={pt(-3, 'mm')}
				/>
			</>
		);
	};

	static PDF = (doc: jsPDF, {
		nationality,
		era,
	}: BackgroundProps) => {
		if (nationality && flags[ nationality ]) {
			doc.addImage(flags[ nationality ], 'PNG', pt(-3, 'mm'), pt(-3, 'mm'), pt(116, 'mm'), pt(86, 'mm'));
		}
		doc.addImage(era === 'LW' ? LWBackgroundPNG : MWBackgroundPNG, 'PNG', pt(-3, 'mm'), pt(-3, 'mm'), pt(116, 'mm'), pt(86, 'mm'));
	}
}
