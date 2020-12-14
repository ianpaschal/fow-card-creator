import React, { CanvasHTMLAttributes } from 'react';

// @ts-ignore
import UnitCardPaper from '../../assets/unit-card-paper.png';

import { paperBackground } from '../../assets/paperBackground';

import FlagBE from '../../assets/flags/flag-be.svg';
import FlagBR from '../../assets/flags/flag-br.svg';
import FlagCN from '../../assets/flags/flag-cn.svg';
import FlagFI from '../../assets/flags/flag-fi.svg';
import FlagFR from '../../assets/flags/flag-fr.svg';
import FlagGE from '../../assets/flags/flag-ge.svg';
import FlagHU from '../../assets/flags/flag-hu.svg';
import FlagIT from '../../assets/flags/flag-it.svg';
import FlagJP from '../../assets/flags/flag-jp.svg';
import FlagNL from '../../assets/flags/flag-nl.svg';
import FlagNO from '../../assets/flags/flag-no.svg';
import FlagPL from '../../assets/flags/flag-pl.svg';
import FlagRO from '../../assets/flags/flag-ro.svg';
import FlagSU from '../../assets/flags/flag-su.svg';
import FlagUS from '../../assets/flags/flag-us.svg';

export interface BackgroundProps {
	nation?: string;
}

// function encodeImageFileAsURL(element) {
// 	const file = element.files[ 0 ];
// 	const reader = new FileReader();
// 	reader.onloadend = function() {
// 	  console.log('RESULT', reader.result);
// 	};
// 	reader.readAsDataURL(Background);
// }
// <input type="file" onchange="encodeImageFileAsURL(this)" />

export const Background: React.FC<BackgroundProps> = ({
	nation,
}: BackgroundProps) => {
	const backgrounds = {
		FlagBE,
		FlagBR,
		FlagCN,
		FlagFI,
		FlagFR,
		FlagGE,
		FlagHU,
		FlagIT,
		FlagJP,
		FlagNL,
		FlagNO,
		FlagPL,
		FlagRO,
		FlagSU,
		FlagUS,
	};
	const Background = backgrounds[ `Flag${nation}` ];
	return (
		<>
			<image xlinkHref={Background} width="116" height="86" x="-3" y="-3" />
			<image xlinkHref={UnitCardPaper} width="116" height="86" x="-3" y="-3" />
		</>
	);
};
