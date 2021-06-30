import jsPDF from 'jspdf';
import React from 'react';
import {
	HitOnNumbers,
	HitOnRatings,
} from '../../enums/HitOnRatings';
import {
	MotivationNumbers,
	MotivationRatings,
} from '../../enums/MotivationRatings';
import {
	SkillNumbers,
	SkillRatings,
} from '../../enums/SkillRatings';
import { Settings } from '../../Settings';
import { pt } from '../../utils/convertDistance';
import { formatDiceRoll } from '../../utils/formatDiceRoll';
import {
	RoundedRectanglePDF,
	RoundedRectangleProps,
	RoundedRectangleSVG,
} from './generic/RoundedRectangle';
import { TextPDF, TextProps, TextSVG } from './generic/Text';

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

	static width: number = Settings.STAT_BLOCK_WIDTH - (2 * pt(0.5, 'mm'));
	static height: number = Settings.SOFT_STAT_PRIMARY_RATING_HEIGHT;
	static radius: number = Settings.CORNER_RADIUS - pt(0.5, 'mm');
	static fill: string = Settings.SOFT_STAT_PRIMARY_RATING_BACKGROUND_COLOR;

	constructor(readonly props: SoftStatBaseRatingProps) {}

	get baseProps(): RoundedRectangleProps {
		return { ...this.props, ...SoftStatBaseRatingLayout };
	}

	get labelProps(): TextProps {
		return {
			align: 'center',
			color: '#FFFFFF',
			font: 'OpenSans-Bold',
			fontSize: Settings.SOFT_STAT_PRIMARY_RATING_FONT_SIZE,
			height: SoftStatBaseRatingLayout.height,
			lineHeight: SoftStatBaseRatingLayout.height,
			text: this.props.label,
			width: this.props.value ? SoftStatBaseRatingLayout.width - pt(4, 'mm') : SoftStatBaseRatingLayout.width,
			x: this.props.x,
			y: this.props.y,
		};
	}

	get valueProps(): TextProps {
		return {
			align: 'center',
			color: '#FFFFFF',
			font: 'OpenSans-Bold',
			fontSize: Settings.SOFT_STAT_PRIMARY_RATING_FONT_SIZE,
			height: SoftStatBaseRatingLayout.height,
			lineHeight: SoftStatBaseRatingLayout.height,
			text: formatDiceRoll(this.props.value),
			width: pt(4, 'mm'),
			x: this.props.x + SoftStatBaseRatingLayout.width - pt(4, 'mm'),
			y: this.props.y,
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
