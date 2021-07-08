import { RatingsMap } from '../typing/RatingsMap';
import { RatingValue } from '../typing/RatingValue';

export const computeCardRating = (ratings: RatingsMap): RatingValue => {
	const ratingKeys = Object.keys(ratings);

	const denominator = ratingKeys.length;
	if (denominator === 0) {
		return null;
	}

	let numerator = 0;
	ratingKeys.forEach((key) => {
		numerator += ratings[ key ];
	});

	return Math.round(numerator / denominator) as RatingValue;
};
