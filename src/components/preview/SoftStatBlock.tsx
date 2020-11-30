import React from 'react';
import classNamesDedeupe from 'classnames/dedupe';
import './SoftStatBlock.scss';
import { MotivationAttributes, MotivationNumbers, MotivationRatings } from '../../enums/MotivationRatings';
import { SkillAttributes, SkillNumbers, SkillRatings } from '../../enums/SkillRatings';
import { HitOnNumbers, HitOnRatings } from '../../enums/HitOnRatings';
import {FormattedDiceRoll} from './FormattedDiceRoll';

export interface SoftStatBlockProps {
	className?: string;
	// TODO: Use type to select stat
	type: 'motivation' | 'skill' | 'hitOn';
	stat: {
		baseRating: string;
		modifiers: any[];
	}
}

export const SoftStatBlock: React.FC<SoftStatBlockProps> = ({
	className: extraClassName,
	type,
	stat,
}: SoftStatBlockProps) => {
	let ratingsEnum;
	let numbersEnum;
	let attributesEnum;
	let heading;
	if (type === 'motivation') {
		ratingsEnum = MotivationRatings;
		numbersEnum = MotivationNumbers;
		attributesEnum = MotivationAttributes;
		heading = 'Motivation';
	}
	if (type === 'skill') {
		ratingsEnum = SkillRatings;
		numbersEnum = SkillNumbers;
		attributesEnum = SkillAttributes;
		heading = 'Skill';
	}
	if (type === 'hitOn') {
		ratingsEnum = HitOnRatings;
		numbersEnum = HitOnNumbers;
		heading = 'Is Hit On';
	}
	return (
		<div className={classNamesDedeupe('soft-stat-block', extraClassName)}>
			<h4 className="soft-stat-block__header">{heading}</h4>
			<div className="soft-stat-block__content">
				<div className="soft-stat-block__rating soft-stat-block__rating--primary">
					<div className="soft-stat-block__rating-label">
						{ratingsEnum[ stat.baseRating ]}
					</div>
					<div className="soft-stat-block__rating-number">
						<FormattedDiceRoll value={numbersEnum[ stat.baseRating ]}/>
					</div>
				</div>
				{stat.modifiers.map((modifier, i) => (
					<div key={i} className="soft-stat-block__rating soft-stat-block__rating--secondary">
						<div className="soft-stat-block__rating-label">
							<span className="soft-stat-block__rating-label-name">
								{modifier.name || 'No-Name'}
							</span>
							<span className="soft-stat-block__rating-label-attribute">
								{attributesEnum[ modifier.attribute ]}
							</span>
						</div>
						<div className="soft-stat-block__rating-number">
							<FormattedDiceRoll value={modifier.number}/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
