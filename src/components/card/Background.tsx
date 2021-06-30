import React from 'react';
import jsPDF from 'jspdf';
import { connect } from 'react-redux';
import { RootState, store } from '../../store';
import { pt } from '../../utils/convertDistance';
import { Nationality } from '../../enums/Nations';

import MWBackgroundPNG from '../../../assets/images/unit-card-background-mw.png';
import LWBackgroundPNG from '../../../assets/images/unit-card-background-lw.png';
import FlagBE from '../../../assets/images/flags/flag-be.png';
import FlagBR from '../../../assets/images/flags/flag-br.png';
import FlagCN from '../../../assets/images/flags/flag-cn.png';
import FlagFI from '../../../assets/images/flags/flag-fi.png';
import FlagFR from '../../../assets/images/flags/flag-fr.png';
import FlagGE from '../../../assets/images/flags/flag-ge.png';
import FlagHU from '../../../assets/images/flags/flag-hu.png';
import FlagIT from '../../../assets/images/flags/flag-it.png';
import FlagJP from '../../../assets/images/flags/flag-jp.png';
import FlagNL from '../../../assets/images/flags/flag-nl.png';
import FlagNO from '../../../assets/images/flags/flag-no.png';
import FlagPL from '../../../assets/images/flags/flag-pl.png';
import FlagRO from '../../../assets/images/flags/flag-ro.png';
import FlagSU from '../../../assets/images/flags/flag-su.png';
import FlagUS from '../../../assets/images/flags/flag-us.png';

// Generic
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

const mapStateToProps = (state: RootState) => ({
	era: state.editor.unitCard.unit.era,
	nationality: state.editor.unitCard.unit.nationality,
});

export type BackgroundProps = ReturnType<typeof mapStateToProps>;

// React
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

export const ConnectedBackgroundSVG = connect(mapStateToProps, null)(BackgroundSVG);

// jsPDF
export const BackgroundPDF = (doc: jsPDF, props) => {
	if (props.nationality && flags[ props.nationality ]) {
		doc.addImage(flags[ props.nationality ], 'PNG', pt(-3, 'mm'), pt(-3, 'mm'), pt(116, 'mm'), pt(86, 'mm'));
	}
	doc.addImage(props.era === 'LW' ? LWBackgroundPNG : MWBackgroundPNG, 'PNG', pt(-3, 'mm'), pt(-3, 'mm'), pt(116, 'mm'), pt(86, 'mm'));
};

export const ConnectedBackgroundPDF = (doc: jsPDF) => BackgroundPDF(doc, mapStateToProps(store.getState()));
