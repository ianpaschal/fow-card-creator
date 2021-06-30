import jsPDF from 'jspdf';
import React from 'react';
import { MotivationAttributes } from '../../enums/MotivationRatings';
import { SkillAttributes } from '../../enums/SkillRatings';
import { Settings } from '../../Settings';
import { SoftStatModifier } from '../../typing/SoftStatModifier';
import { pt } from '../../utils/convertDistance';
import { formatDiceRoll } from '../../utils/formatDiceRoll';
import {
	RoundedRectanglePDF,
	RoundedRectangleProps,
	RoundedRectangleSVG,
} from './generic/RoundedRectangle';
import { TextPDF, TextProps, TextSVG } from './generic/Text';

export interface SoftStatModifierProps {
	modifier: SoftStatModifier;
	x: number;
	y: number;
}

export class SoftStatModifierLayout {
	static width: number = Settings.STAT_BLOCK_WIDTH - pt(1, 'mm');
	static height: number = Settings.SOFT_STAT_SECONDARY_RATING_HEIGHT;
	static radius: number = pt(0.5, 'mm');
	static ratingWidth: number = pt(4, 'mm');
	static color: string = '#000000';

	constructor(readonly props: SoftStatModifierProps) {}

	get attributeName(): string {
		if (Object.keys(MotivationAttributes).includes(this.props.modifier.attribute)) {
			return MotivationAttributes[ this.props.modifier.attribute ];
		}
		if (Object.keys(SkillAttributes).includes(this.props.modifier.attribute)) {
			return SkillAttributes[ this.props.modifier.attribute ];
		}
		return 'Unknown Attribute';
	}

	get baseProps(): RoundedRectangleProps {
		return {
			...this.props,
			...SoftStatModifierLayout,
			fill: Settings.SOFT_STAT_SECONDARY_RATING_BACKGROUND_COLOR,
		};
	}

	get nameProps(): TextProps {
		return {
			align: 'center',
			color: SoftStatModifierLayout.color,
			font: 'PTSans-Regular-Italic',
			fontSize: Settings.SOFT_STAT_SECONDARY_RATING_NAME_FONT_SIZE,
			height: pt(2.4, 'mm'),
			lineHeight: pt(2.4, 'mm'),
			maxLines: 1,
			text: this.props.modifier.name || 'No-Name',
			width: SoftStatModifierLayout.width - (SoftStatModifierLayout.ratingWidth + pt(2, 'mm')),
			x: this.props.x + pt(1, 'mm'),
			y: this.props.y,
		};
	}

	get attributeProps(): TextProps {
		return {
			align: 'center',
			color: SoftStatModifierLayout.color,
			font: 'PTSans-Bold-Italic',
			fontSize: Settings.SOFT_STAT_SECONDARY_RATING_ATTRIBUTE_FONT_SIZE,
			height: pt(1, 'mm'),
			lineHeight: pt(1, 'mm'),
			maxLines: 1,
			text: this.attributeName,
			width: SoftStatModifierLayout.width - (SoftStatModifierLayout.ratingWidth + pt(2, 'mm')),
			x: this.props.x + pt(1, 'mm'),
			y: this.props.y + pt(2.5, 'mm'),
		};
	}

	get ratingProps(): TextProps {
		return {
			align: 'center',
			color: SoftStatModifierLayout.color,
			font: 'OpenSans-Bold',
			fontSize: Settings.SOFT_STAT_PRIMARY_RATING_FONT_SIZE,
			height: SoftStatModifierLayout.height,
			lineHeight: SoftStatModifierLayout.height,
			text: formatDiceRoll(this.props.modifier.value, false),
			width: SoftStatModifierLayout.ratingWidth,
			x: this.props.x + SoftStatModifierLayout.width - SoftStatModifierLayout.ratingWidth,
			y: this.props.y,
		};
	}
}

export const SoftStatModifierPDF = (doc: jsPDF, props: SoftStatModifierProps) => {
	const layout = new SoftStatModifierLayout(props);
	RoundedRectanglePDF(doc, layout.baseProps);
	TextPDF(doc, layout.nameProps);
	TextPDF(doc, layout.attributeProps);
	TextPDF(doc, layout.ratingProps);
};

export const SoftStatModifierSVG: React.FC<SoftStatModifierProps> = (props: SoftStatModifierProps) => {
	const layout = new SoftStatModifierLayout(props);
	return (
		<>
			<RoundedRectangleSVG {...layout.baseProps}/>
			<TextSVG {...layout.nameProps} />
			<TextSVG {...layout.attributeProps} />
			<TextSVG {...layout.ratingProps} />
		</>
	);
};
