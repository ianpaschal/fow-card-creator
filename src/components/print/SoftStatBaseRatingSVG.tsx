import React from 'react';
import { HitOnNumbers, HitOnRating, HitOnRatings } from '../../enums/HitOnRatings';
import { MotivationAttributes, MotivationNumbers, MotivationRating, MotivationRatings } from '../../enums/MotivationRatings';
import { SkillNumbers, SkillRating, SkillRatings } from '../../enums/SkillRatings';

export interface SoftStatBaseRatingProps {
	isComponent?: boolean;
	type: 'motivation' | 'skill' | 'hitOn';
	rating: MotivationRating | SkillRating | HitOnRating;
	x?: string;
	y?: string;
}

export const SoftStatBaseRating: React.FC<SoftStatBaseRatingProps> = ({
	isComponent,
	type,
	rating,
	x,
	y,
}: SoftStatBaseRatingProps) => {
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
	const numericValue = numbersEnum[ rating ];
	const textualValue = `${ratingsEnum[ rating ]}`.toUpperCase();
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
						fontSize="2.5"
						x="11"
						y="1.85"
						fontWeight="700"
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
						fontSize="2.5"
						x="9"
						y="1.85"
						fontWeight="700"
						fontFamily="Open Sans"
						fill="rgb(255,255,255)"
						letterSpacing="-0.1"
					>
						{textualValue}
					</text>
					<text
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize="2.5"
						x="20"
						y="1.85"
						fontWeight="700"
						fontFamily="Open Sans"
						fill="rgb(255,255,255)"
					>
						{numericValue + (numericValue < 6 && '+')}
					</text>
				</>
			)}

		</g>
	);
};
