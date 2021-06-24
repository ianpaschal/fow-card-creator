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
import { RoundedRectanglePDF, RoundedRectangleProps, RoundedRectangleSVG } from './generic/RoundedRectangle';
import { TextPDF, TextProps, TextSVG } from './generic/Text';

export interface SoftStatBaseRatingProps {
	x: number;
	y: number;
	label: string;
	value?: number;
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

	// Passed
	label: string;
	value: number;
	x: number;
	y: number;

	// Static
	width: number = Settings.STAT_BLOCK_WIDTH - (2 * pt(0.5, 'mm'));
	height: number = Settings.SOFT_STAT_PRIMARY_RATING_HEIGHT;
	radius: number = Settings.CORNER_RADIUS - pt(0.5, 'mm');
	fill: string = Settings.SOFT_STAT_PRIMARY_RATING_BACKGROUND_COLOR;

	constructor(props: SoftStatBaseRatingProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get baseProps(): RoundedRectangleProps {
		return { ...this };
	}

	get labelProps(): TextProps {
		return {
			align: 'center',
			color: '#FFFFFF',
			font: 'OpenSans-Bold',
			fontSize: Settings.SOFT_STAT_PRIMARY_RATING_FONT_SIZE,
			height: this.height,
			lineHeight: this.height,
			text: this.label,
			width: this.value ? this.width - pt(4, 'mm') : this.width,
			x: this.x,
			y: this.y,
		};
	}

	get valueProps(): TextProps {
		return {
			align: 'center',
			color: '#FFFFFF',
			font: 'OpenSans-Bold',
			fontSize: Settings.SOFT_STAT_PRIMARY_RATING_FONT_SIZE,
			height: this.height,
			lineHeight: this.height,
			text: formatDiceRoll(this.value),
			width: pt(4, 'mm'),
			x: this.x + this.width - pt(4, 'mm'),
			y: this.y,
		};
	}
}

export const SoftStatBaseRatingPDF = (doc: jsPDF, props: SoftStatBaseRatingProps) => {
	const layout = new SoftStatBaseRatingLayout(props);
	RoundedRectanglePDF(doc, layout.baseProps);
	TextPDF(doc, layout.labelProps);
	if (props.value) {
		TextPDF(doc, layout.valueProps);
	}
};

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
