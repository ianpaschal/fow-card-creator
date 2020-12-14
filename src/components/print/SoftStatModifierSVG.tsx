import React from 'react';
import { MotivationAttributes } from '../../enums/MotivationRatings';
import { SkillAttributes } from '../../enums/SkillRatings';
import { SoftStatModifier } from '../../typing/SoftStatModifier';

function getAttributeName(modifier: SoftStatModifier) {
	if (Object.keys(MotivationAttributes).includes(modifier.attribute)) {
		return MotivationAttributes[ modifier.attribute ];
	}
	if (Object.keys(SkillAttributes).includes(modifier.attribute)) {
		return SkillAttributes[ modifier.attribute ];
	}
	return 'Unknown Attribute';
}

export interface SoftStatModifierSVGProps {
	modifier: SoftStatModifier;
	x?: string;
	y?: string;
}

export const SoftStatModifierSVG: React.FC<SoftStatModifierSVGProps> = ({
	modifier,
	x,
	y,
}: SoftStatModifierSVGProps) => (
	<g transform={`translate(${x || 0} ${y || 0})`}>
		<rect
			x="0"
			y="0"
			width="22"
			height="4.2"
			rx="0.5"
			fill="rgb(255,255,255)"
		/>
		<text
			textAnchor="middle"
			dominantBaseline="middle"
			fontSize="1.5"
			x="9"
			y="1.2"
			fontFamily="Open Sans"
			fontStyle="italic"
		>
			{modifier.name || 'No-Name'}
		</text>
		<text
			textAnchor="middle"
			dominantBaseline="middle"
			fontSize="1.875"
			x="9"
			y="3"
			fontFamily="Open Sans"
			fontStyle="italic"
			fontWeight="700"
			letterSpacing="-0.05"
		>
			{getAttributeName(modifier)}
		</text>
		<text
			textAnchor="middle"
			dominantBaseline="middle"
			fontSize="3"
			x="20"
			y="2.3"
			fontWeight="700"
			fontFamily="Open Sans"
			letterSpacing="-0.1"
		>
			{modifier.number + (modifier.number < 6 && '+')}
		</text>
	</g>
);
