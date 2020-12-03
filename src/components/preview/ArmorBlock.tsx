import React from 'react';
import classNamesDedeupe from 'classnames/dedupe';
import './ArmorBlock.scss';
import { ArmorRating } from '../../typing/ArmorRating';
import { Unit } from '../../typing/Unit';

export interface ArmorBlockProps {
	className?: string;
	armor: ArmorRating;
}

export const ArmorBlock: React.FC<ArmorBlockProps> = ({
	className: extraClassName,
	armor,
}: ArmorBlockProps) => {
	return (
		<div className={classNamesDedeupe('armor-block', extraClassName)}>
			<h4 className="armor-block__header">Armour</h4>
			<div className="armor-block__content">
				<div className="armor-block__rating">
					<div className="armor-block__rating-label">
						Front
					</div>
					<div className="armor-block__rating-number">
						{armor.front}
					</div>
				</div>
				<div className="armor-block__rating">
					<div className="armor-block__rating-label">
						Side &amp; Rear
					</div>
					<div className="armor-block__rating-number">
						{armor.sideRear}
					</div>
				</div>
				<div className="armor-block__rating">
					<div className="armor-block__rating-label">
						Top
					</div>
					<div className="armor-block__rating-number">
						{armor.top}
					</div>
				</div>
			</div>
		</div>
	);
};
