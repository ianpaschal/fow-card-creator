import React from 'react';
import classNames from 'classnames';
import { RatingValue } from '../../typing/RatingValue';
import './StarRating.scss';

export interface StarRatingProps {
	rating: RatingValue;
}

export const StarRating: React.FC<StarRatingProps> = ({
	rating,
}: StarRatingProps) => {
	const createStars = (): JSX.Element[] => {
		const elements = [];
		for (let i = 0; i < 10; i++) {
			elements.push(
				<div key={i} className={classNames(
					'star-rating__half-star',
					i % 2 == 0 ? 'star-rating__half-left' : 'star-rating__half-right'
				)}>
					<i className={classNames('pi', rating > i ? 'pi-star' : 'pi-star-o')} />
				</div>
			);
		}
		return elements;
	};
	return (
		<div className="star-rating">
			{createStars()}
		</div>
	);
};
