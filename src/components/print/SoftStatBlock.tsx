import React from 'react';
import { HitOnRating } from '../../enums/HitOnRatings';
import { MotivationRating } from '../../enums/MotivationRatings';
import { SkillRating } from '../../enums/SkillRatings';
import { SoftStatModifier } from '../../typing/SoftStatModifier';
import { SoftStatBaseRating } from './SoftStatBaseRatingSVG';

export interface SoftStatBlockProps {
	isComponent?: boolean;
	stat: {
		baseRating: MotivationRating | SkillRating | HitOnRating;
		modifiers?: SoftStatModifier[];
	}
	accentColor?: string;
	attribute: 'motivation' | 'skill' | 'hitOn';
	x: string;
	y: string;
}

export const SoftStatBlock: React.FC<SoftStatBlockProps> = ({
	isComponent,
	stat,
	accentColor,
	attribute,
	x,
	y,
}: SoftStatBlockProps) => {
	return (
		<g transform={`translate(${x} ${y})`}>
			<path
				className="svg-soft-stat-block__header-bg"
				fill={accentColor}
				d="M23,2.9V1c0-0.55-0.45-1-1-1H1C0.45,0,0,0.45,0,1v1.9h0.12c0-0.48,0.39-0.88,0.88-0.88h21c0.48,0,0.88,0.39,0.88,0.88H23z"
			/>
			<text
				className="svg-soft-stat-block__header-text"
				textAnchor="middle"
				dominantBaseline="middle"
				fontSize="1.5"
				x="11.5"
				y="1.2"
				fontWeight="800"
				fontFamily="Open Sans"
				fill="white"
			>
				{attribute === 'hitOn' ? 'IS HIT ON' : attribute.toUpperCase()}
			</text>
			<rect x="0.125" y="2.025" width="22.75" height={`${(stat.modifiers.length * 4.45) + 4.05}`} rx="0.875" stroke={accentColor} strokeWidth="0.25" fill="none"/>
			<SoftStatBaseRating isComponent={isComponent} x="0.5" y="2.4" type={attribute} rating={stat.baseRating}/>
			{stat.modifiers.map((mod, i) => (
				<rect key={i} x="0.5" y={`${5.95 + (i * 4.45)}`} width="22" height="4.2" rx="0.5" fill="rgb(255,255,255)"/>
			))}
		</g>
	);
};
