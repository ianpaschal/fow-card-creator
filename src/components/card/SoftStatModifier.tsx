import jsPDF from 'jspdf';
import React from 'react';
import { RoundedRectangle } from '../../drawing/RoundedRectangle';
import { MotivationAttributes } from '../../enums/MotivationRatings';
import { SkillAttributes } from '../../enums/SkillRatings';
import { Settings } from '../../Settings';
import { SoftStatModifier } from '../../typing/SoftStatModifier';
import { pt } from '../../utils/convertDistance';
import { formatDiceRoll } from '../../utils/formatDiceRoll';

function getAttributeName(modifier: SoftStatModifier) {
	if (Object.keys(MotivationAttributes).includes(modifier.attribute)) {
		return MotivationAttributes[ modifier.attribute ];
	}
	if (Object.keys(SkillAttributes).includes(modifier.attribute)) {
		return SkillAttributes[ modifier.attribute ];
	}
	return 'Unknown Attribute';
}

export interface SoftStatModifierProps {
	modifier: SoftStatModifier;
	x: number;
	y: number;
}

export const SoftStatModifierPDF = (doc: jsPDF, {
	modifier,
	x,
	y,
}: SoftStatModifierProps) => {
	const width = Settings.STAT_BLOCK_WIDTH - pt(1, 'mm');
	const textWidth = width - pt(4, 'mm');
	const height = Settings.SOFT_STAT_SECONDARY_RATING_HEIGHT;

	RoundedRectangle.PDF(doc, {
		x, y, w: width, h: height, r: pt(0.5, 'mm'),
		fill: Settings.SOFT_STAT_SECONDARY_RATING_BACKGROUND_COLOR,
	});

	doc.setTextColor('#000000');

	doc.setFont('PTSans-RegularItalic');
	doc.setFontSize(Settings.SOFT_STAT_SECONDARY_RATING_NAME_FONT_SIZE);
	doc.text(modifier.name || 'No-Name', x + (textWidth / 2), y + pt(1.2, 'mm'), {
		align: 'center',
		baseline: 'middle',
	});

	doc.setFont('PTSans-BoldItalic');
	doc.setFontSize(Settings.SOFT_STAT_SECONDARY_RATING_ATTRIBUTE_FONT_SIZE);
	doc.text(getAttributeName(modifier), x + (textWidth / 2), y + pt(3, 'mm'), {
		align: 'center',
		baseline: 'middle',
	});

	doc.setFont('OpenSans-Bold');
	doc.setFontSize(Settings.SOFT_STAT_PRIMARY_RATING_FONT_SIZE);
	doc.text(formatDiceRoll(modifier.number), x + width - pt(2, 'mm'), y + (height / 2), {
		align: 'center',
		baseline: 'middle',
	});
};

export const SoftStatModifierSVG: React.FC<SoftStatModifierProps> = ({
	modifier,
	x,
	y,
}: SoftStatModifierProps) => {
	const width = Settings.STAT_BLOCK_WIDTH - (2 * pt(0.5, 'mm'));
	const textWidth = width - pt(4, 'mm');
	return (
		<g transform={`translate(${x} ${y})`}>
			<rect
				x="0"
				y="0"
				width={Settings.STAT_BLOCK_WIDTH - (2 * pt(0.5, 'mm'))}
				height={Settings.SOFT_STAT_SECONDARY_RATING_HEIGHT}
				rx={pt(0.5, 'mm')}
				fill="#FFFFFF"
			/>
			<text
				textAnchor="middle"
				dominantBaseline="middle"
				fontSize={Settings.SOFT_STAT_SECONDARY_RATING_NAME_FONT_SIZE - 0.5}
				x={textWidth / 2}
				y={pt(1.3, 'mm')}
				fontFamily="PT Sans"
				fontStyle="italic"
			>
				{modifier.name || 'No-Name'}
			</text>
			<text
				textAnchor="middle"
				dominantBaseline="middle"
				fontSize={Settings.SOFT_STAT_SECONDARY_RATING_ATTRIBUTE_FONT_SIZE - 1}
				x={textWidth / 2}
				y={pt(3, 'mm')}
				fontFamily="PT Sans"
				fontStyle="italic"
				fontWeight="700"
			>
				{getAttributeName(modifier)}
			</text>
			<text
				textAnchor="middle"
				dominantBaseline="middle"
				fontSize={Settings.SOFT_STAT_PRIMARY_RATING_FONT_SIZE}
				x={(Settings.STAT_BLOCK_WIDTH - (2 * pt(0.5, 'mm'))) - pt(2, 'mm')}
				y={Settings.SOFT_STAT_SECONDARY_RATING_HEIGHT * 0.55}
				fontWeight="700"
				fontFamily="Open Sans"
			>
				{modifier.number + (modifier.number < 6 && '+')}
			</text>
		</g>
	);
};
