import React from 'react';
import {
	HitOnNumbers,
	HitOnRating,
	HitOnRatings,
} from '../../enums/HitOnRatings';
import {
	MotivationNumbers,
	MotivationRating,
	MotivationRatings,
} from '../../enums/MotivationRatings';
import {
	SkillNumbers,
	SkillRating,
	SkillRatings,
} from '../../enums/SkillRatings';
import { formatDiceRoll } from '../../utils/formatDiceRoll';

export interface SoftStatBaseRatingSVGProps {
	isComponent?: boolean;
	type: 'motivation' | 'skill' | 'hitOn';
	rating: MotivationRating | SkillRating | HitOnRating;
	x?: string;
	y?: string;
}

export const SoftStatBaseRatingSVG: React.FC<SoftStatBaseRatingSVGProps> = ({
	isComponent,
	type,
	rating,
	x,
	y,
}: SoftStatBaseRatingSVGProps) => {
	let ratingsEnum;
	let numbersEnum;
	if (type === 'motivation') {
		ratingsEnum = MotivationRatings;
		numbersEnum = MotivationNumbers;
	}
	if (type === 'skill') {
		ratingsEnum = SkillRatings;
		numbersEnum = SkillNumbers;
	}
	if (type === 'hitOn') {
		ratingsEnum = HitOnRatings;
		numbersEnum = HitOnNumbers;
	}
	return (
		<g transform={`translate(${x || 0} ${y || 0})`}>
			<rect
				x="0"
				y="0"
				width="22"
				height="3.3"
				rx="0.5"
				fill="rgb(210,35,42)"
			/>
			{isComponent ? (
				<>
					<text
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize="3"
						x="11"
						y="1.9"
						fontWeight="800"
						fontFamily="Open Sans"
						fill="rgb(255,255,255)"
						letterSpacing="-0.1"
					>
						AS PER UNIT
					</text>
				</>
			) : (
				<>
					<text
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize="3"
						x="9"
						y="1.9"
						fontWeight="800"
						fontFamily="Open Sans"
						fill="rgb(255,255,255)"
						letterSpacing="-0.1"
					>
						{`${ratingsEnum[ rating ]}`.toUpperCase()}
					</text>
					<text
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize="3"
						x="20"
						y="1.9"
						fontWeight="800"
						fontFamily="Open Sans"
						fill="rgb(255,255,255)"
						letterSpacing="-0.1"
					>
						{formatDiceRoll(numbersEnum[ rating ])}
					</text>
				</>
			)}
		</g>
	);
};
