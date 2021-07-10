import jsPDF from 'jspdf';
import React from 'react';
import { MotivationAttributeKeys, MotivationAttributes } from '../../enums/MotivationAttributes';
import { SoftStatModifier } from '../../typing/SoftStatModifier';
import { pt } from '../../utils/convertDistance';
import { formatDiceRoll } from '../../utils/formatDiceRoll';
import {
	RoundedRectanglePDF,
	RoundedRectangleProps,
	RoundedRectangleSVG,
} from './generic/RoundedRectangle';
import { TextPDF, TextProps, TextSVG } from './generic/Text';
import { SoftStatBaseRatingLayout } from './SoftStatBaseRating';
import { SkillAttributes, SkillAttributeKeys } from '../../enums/SkillAttributes';
import { TextAlignment } from '../../typing/TextAlignment';
import { FontNames } from '../../enums/FontNames';
import { CardSettings } from '../../CardSettings';

export interface SoftStatModifierProps {
	modifier: SoftStatModifier;
	x: number;
	y: number;
}

export class SoftStatModifierLayout {
	static align: TextAlignment = 'center';
	static attributeFontSize: number = 6;
	static color: string = CardSettings.COLOR_BLACK;
	static fill: string = CardSettings.COLOR_WHITE;
	static height: number = pt(4.2, 'mm');
	static lineHeight: number = SoftStatModifierLayout.height;
	static nameFontSize: number = 5;
	static radius: number = pt(0.5, 'mm');
	static ratingWidth: number = pt(4, 'mm');
	static width: number = pt(22, 'mm'); // TODO: Use SoftStatBlockLayout.innerWidth

	constructor(readonly props: SoftStatModifierProps) {}

	get attributeName(): string {
		if (MotivationAttributeKeys.includes(this.props.modifier.attribute)) {
			return MotivationAttributes[ this.props.modifier.attribute ];
		}
		if (SkillAttributeKeys.includes(this.props.modifier.attribute)) {
			return SkillAttributes[ this.props.modifier.attribute ];
		}
		return 'Unknown Attribute';
	}

	get baseProps(): RoundedRectangleProps {
		return {
			...this.props,
			...SoftStatModifierLayout,
		};
	}

	get nameProps(): TextProps {
		return {
			...this.props,
			...SoftStatModifierLayout,
			font: FontNames.PT_SANS_REGULAR_ITALIC,
			fontSize: SoftStatModifierLayout.nameFontSize,
			height: pt(2.4, 'mm'),
			lineHeight: pt(2.4, 'mm'),
			maxLines: 1,
			text: this.props.modifier.name || 'No-Name',
			width: SoftStatModifierLayout.width - (SoftStatModifierLayout.ratingWidth + pt(2, 'mm')),
			x: this.props.x + pt(1, 'mm'),
		};
	}

	get attributeProps(): TextProps {
		return {
			...this.props,
			...SoftStatModifierLayout,
			font: FontNames.PT_SANS_BOLD_ITALIC,
			fontSize: SoftStatModifierLayout.attributeFontSize,
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
			...this.props,
			...SoftStatModifierLayout,
			font: FontNames.OPEN_SANS_BOLD,
			fontSize: SoftStatBaseRatingLayout.fontSize,
			text: formatDiceRoll(this.props.modifier.value, false),
			width: SoftStatModifierLayout.ratingWidth,
			x: this.props.x + SoftStatModifierLayout.width - SoftStatModifierLayout.ratingWidth,
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
