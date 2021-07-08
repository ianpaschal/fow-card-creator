import React from 'react';
import { Link } from 'react-router-dom';
import { UnitCard } from '../../typing/UnitCard';
import { computeCardRating } from '../../utils/computeCardRating';
import { StarRating } from '../StarRating/StarRating';
import './UnitCardTile.scss';

export interface UnitCardTileProps {
	card: UnitCard;
	useFooter?: boolean;
	linkURL: string;
}

export const UnitCardTile: React.FC<UnitCardTileProps> = ({
	card,
	useFooter = false,
	linkURL,
}: UnitCardTileProps) => {
	const rating = computeCardRating(card.ratings);
	return (
		<Link className="unit-card-tile" to={linkURL}>
			<div className="unit-card-tile__image-section" style={{
				backgroundColor: card.unit.accentColor,
			}}>
				<div className="unit-card-tile__image-wrapper">
					{card.unit.primaryImageURL && (
						<img src={card.unit.primaryImageURL} />
					)}
				</div>
			</div>
			<div className="unit-card-tile__header-section" style={{
				backgroundColor: card.unit.accentColor,
			}}>
				<h2>{card.unit.title || 'Untitled'}</h2>
				{card.unit.subTitle && (
					<h3>{card.unit.subTitle}</h3>
				)}
			</div>
			{useFooter && (
				<div className="unit-card-tile__footer-section">
					<StarRating rating={rating || 5} />
				</div>
			)}
		</Link>
	);
};
