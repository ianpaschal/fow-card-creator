import jsPDF from 'jspdf';
import React from 'react';
import { CardSettings } from '../../CardSettings';
import { formatDiceRoll } from '../../utils/formatDiceRoll';
import { HitOnNumbers } from '../../enums/HitOnNumbers';
import { HitOnRatings } from '../../enums/HitOnRatings';
import { MotivationNumbers } from '../../enums/MotivationNumbers';
import { MotivationRatings } from '../../enums/MotivationRatings';
import { pt } from '../../utils/convertDistance';
import {
	RoundedRectanglePDF,
	RoundedRectangleProps,
	RoundedRectangleSVG,
} from './generic/RoundedRectangle';
import { TextPDF, TextProps, TextSVG } from './generic/Text';
import { SkillNumbers } from '../../enums/SkillNumbers';
import { SkillRatings } from '../../enums/SkillRatings';
import { TextAlignment } from '../../typing/TextAlignment';

// Generic
export interface SoftStatBaseRatingProps {
	label: string;
	value?: number;
	x: number;
	y: number;
}

export class SoftStatBaseRatingLayout {
	static getRatingEnum(attribute: string) {
		if (attribute === 'motivation') {
			return MotivationRatings;
		}
		if (attribute === 'skill') {
			return SkillRatings;
		}
		if (attribute === 'hitOn') {
			return HitOnRatings;
		}
	}

	static getNumberEnum(attribute: string) {
		if (attribute === 'motivation') {
			return MotivationNumbers;
		}
		if (attribute === 'skill') {
			return SkillNumbers;
		}
		if (attribute === 'hitOn') {
			return HitOnNumbers;
		}
	}

	static align: TextAlignment = 'center';
	static color: string = CardSettings.COLOR_WHITE;
	static fill: string = CardSettings.COLOR_RED;
	static font: string = 'OpenSans-Bold';
	static fontSize: number = 8;
	static height: number = pt(3.3, 'mm');
	static lineHeight: number = SoftStatBaseRatingLayout.height;
	static radius: number = CardSettings.CORNER_RADIUS - pt(0.5, 'mm');
	static width: number = pt(22, 'mm'); // TODO: Use SoftStatBlockLayout.innerWidth

	constructor(readonly props: SoftStatBaseRatingProps) {}

	get baseProps(): RoundedRectangleProps {
		return { ...this.props, ...SoftStatBaseRatingLayout };
	}

	get labelProps(): TextProps {
		return {
			...this.props,
			...SoftStatBaseRatingLayout,
			text: this.props.label,
			width: this.props.value ? SoftStatBaseRatingLayout.width - pt(4, 'mm') : SoftStatBaseRatingLayout.width,
		};
	}

	get valueProps(): TextProps {
		return {
			...this.props,
			...SoftStatBaseRatingLayout,
			text: formatDiceRoll(this.props.value),
			width: pt(4, 'mm'),
			x: this.props.x + SoftStatBaseRatingLayout.width - pt(4, 'mm'),
		};
	}
}

// React
export const SoftStatBaseRatingPDF = (doc: jsPDF, props: SoftStatBaseRatingProps) => {
	const layout = new SoftStatBaseRatingLayout(props);
	RoundedRectanglePDF(doc, layout.baseProps);
	TextPDF(doc, layout.labelProps);
	if (props.value) {
		TextPDF(doc, layout.valueProps);
	}
};

// jsPDF
export const SoftStatBaseRatingSVG: React.FC<SoftStatBaseRatingProps> = (props: SoftStatBaseRatingProps) => {
	const layout = new SoftStatBaseRatingLayout(props);
	return (
		<>
			<RoundedRectangleSVG {...layout.baseProps} />
			<TextSVG {...layout.labelProps} />
			{props.value && (
				<TextSVG {...layout.valueProps} />
			)}
		</>
	);
};
