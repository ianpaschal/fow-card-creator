import React from 'react';
import jsPDF from 'jspdf';
import { pt } from '../../utils/convertDistance';
import { Nationality } from '../../enums/Nations';

import MWBackgroundPNG from '../../../assets/images/unit-card-background-mw.png';
import LWBackgroundPNG from '../../../assets/images/unit-card-background-lw.png';
import FlagBE from '../../../assets/images/flags/print/flag-be.png';
import FlagBR from '../../../assets/images/flags/print/flag-br.png';
import FlagCN from '../../../assets/images/flags/print/flag-cn.png';
import FlagFI from '../../../assets/images/flags/print/flag-fi.png';
import FlagFR from '../../../assets/images/flags/print/flag-fr.png';
import FlagGE from '../../../assets/images/flags/print/flag-ge.png';
import FlagHU from '../../../assets/images/flags/print/flag-hu.png';
import FlagIT from '../../../assets/images/flags/print/flag-it.png';
import FlagJP from '../../../assets/images/flags/print/flag-jp.png';
import FlagNL from '../../../assets/images/flags/print/flag-nl.png';
import FlagNO from '../../../assets/images/flags/print/flag-no.png';
import FlagPL from '../../../assets/images/flags/print/flag-pl.png';
import FlagRO from '../../../assets/images/flags/print/flag-ro.png';
import FlagSU from '../../../assets/images/flags/print/flag-su.png';
import FlagUS from '../../../assets/images/flags/print/flag-us.png';
import { Unit } from '../../typing/Unit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';

const flags: Record<Nationality, string> = {
	'BE': FlagBE,
	'BR': FlagBR,
	'CN': FlagCN,
	'FI': FlagFI,
	'FR': FlagFR,
	'GE': FlagGE,
	'HU': FlagHU,
	'IT': FlagIT,
	'JP': FlagJP,
	'NL': FlagNL,
	'NO': FlagNO,
	'PL': FlagPL,
	'RO': FlagRO,
	'SU': FlagSU,
	'US': FlagUS,
};

// Position props passed from parent
export interface PositionProps {}

// Unit props from Redux
const connector = connect((state: RootState) => ({
	nationality: state.editor.unitCard.unit.nationality,
	era: state.editor.unitCard.unit.era,
}), null);

export type BackgroundProps = PositionProps & ConnectedProps<typeof connector>;

export const BackgroundSVG: React.FC<BackgroundProps> = (props: BackgroundProps) => {
	return (
		<>
			{props.nationality && flags[ props.nationality ] && (
				<image
					xlinkHref={flags[ props.nationality ]}
					width={pt(116, 'mm')}
					height={ pt(86, 'mm')}
					x={pt(-3, 'mm')}
					y={pt(-3, 'mm')}
				/>
			)}
			<image
				xlinkHref={props.era === 'LW' ? LWBackgroundPNG : MWBackgroundPNG}
				width={pt(116, 'mm')}
				height={ pt(86, 'mm')}
				x={pt(-3, 'mm')}
				y={pt(-3, 'mm')}
			/>
		</>
	);
};

export const ConnectedBackgroundSVG = connector(BackgroundSVG);

export const BackgroundPDF = (doc: jsPDF, unit: Unit) => {
	if (unit.nationality && flags[ unit.nationality ]) {
		doc.addImage(flags[ unit.nationality ], 'PNG', pt(-3, 'mm'), pt(-3, 'mm'), pt(116, 'mm'), pt(86, 'mm'));
	}
	doc.addImage(unit.era === 'LW' ? LWBackgroundPNG : MWBackgroundPNG, 'PNG', pt(-3, 'mm'), pt(-3, 'mm'), pt(116, 'mm'), pt(86, 'mm'));
};
