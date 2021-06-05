import jsPDF from 'jspdf';
import React from 'react';
import { RoundedRectangle } from '../../drawing/RoundedRectangle';
import {
	HitOnNumbers,
	HitOnRatings,
} from '../../enums/HitOnRatings';
import {
	MotivationNumbers,
	MotivationRatings,
} from '../../enums/MotivationRatings';
import {
	SkillNumbers,
	SkillRatings,
} from '../../enums/SkillRatings';
import { Settings } from '../../Settings';
import { formatDiceRoll } from '../../utils/formatDiceRoll';
import { pt } from '../../utils/convertDistance';
import { Unit } from '../../typing/Unit';

export interface SoftStatBaseRatingProps {
	x: number;
	y: number;
	unit: Unit;
	attribute: 'motivation' | 'skill' | 'hitOn';
}

export class SoftStatBaseRating {

	static getRatingEnum(attribute: string) {
		if (attribute === 'motivation') {
			return MotivationRatings;
		}
		if (attribute === 'skill') {
			return SkillRatings;
		}
		if (attribute === 'hitOn') {
			return HitOnRatings;
		}
	}
	static getNumberEnum(attribute: string) {
		if (attribute === 'motivation') {
			return MotivationNumbers;
		}
		if (attribute === 'skill') {
			return SkillNumbers;
		}
		if (attribute === 'hitOn') {
			return HitOnNumbers;
		}
	}

	static PDF = (doc: jsPDF, {
		x,
		y,
		unit,
		attribute,
	}: SoftStatBaseRatingProps) => {
		const ratingEnum = SoftStatBaseRating.getRatingEnum(attribute);
		const numberEnum = SoftStatBaseRating.getNumberEnum(attribute);
		const { isComponent } = unit;
		const { baseRating } = unit[ attribute ];
		const w = Settings.STAT_BLOCK_WIDTH - (2 * pt(0.5, 'mm'));
		const h = Settings.SOFT_STAT_PRIMARY_RATING_HEIGHT;
		const r = Settings.CORNER_RADIUS - pt(0.5, 'mm');

		RoundedRectangle.PDF(doc, {
			x, y, w, h, r,
			fill: Settings.SOFT_STAT_PRIMARY_RATING_BACKGROUND_COLOR,
		});

		doc.setTextColor('#FFFFFF');
		doc.setFont('OpenSans-Bold');
		doc.setFontSize(Settings.SOFT_STAT_PRIMARY_RATING_FONT_SIZE);

		if (isComponent) {
			doc.text('AS PER UNIT', x + w / 2, y + (h / 2), {
				align: 'center',
				baseline: 'middle',
			});
		} else {
			doc.text(`${ratingEnum[ baseRating ]}`.toUpperCase(), x + (w - pt(4, 'mm')) / 2, y + (h / 2), {
				align: 'center',
				baseline: 'middle',
				charSpace: -0.15,
			});
			doc.text(formatDiceRoll(numberEnum[ baseRating ]), x + w - pt(2, 'mm'), y + (h / 2), {
				align: 'center',
				baseline: 'middle',
			});
		}
	}

	static SVG: React.FC<SoftStatBaseRatingProps> = ({
		x,
		y,
		unit,
		attribute,
	}: SoftStatBaseRatingProps) => {
		const ratingEnum = SoftStatBaseRating.getRatingEnum(attribute);
		const numberEnum = SoftStatBaseRating.getNumberEnum(attribute);
		const { isComponent } = unit;
		const { baseRating } = unit[ attribute ];
		const w = Settings.STAT_BLOCK_WIDTH - (2 * pt(0.5, 'mm'));
		const h = Settings.SOFT_STAT_PRIMARY_RATING_HEIGHT;
		const r = Settings.CORNER_RADIUS - pt(0.5, 'mm');

		return (
			<g transform={`translate(${x} ${y})`}>
				<rect
					x="0"
					y="0"
					width={w}
					height={h}
					rx={r}
					fill={Settings.SOFT_STAT_PRIMARY_RATING_BACKGROUND_COLOR}
				/>
				{isComponent ? (
					<>
						<text
							textAnchor="middle"
							dominantBaseline="middle"
							fontSize={Settings.SOFT_STAT_PRIMARY_RATING_FONT_SIZE}
							x={w / 2}
							y={h * 0.55}
							fontWeight="700"
							fontFamily="Open Sans"
							fill="#FFFFFF"
						>
							AS PER UNIT
						</text>
					</>
				) : (
					<>
						<text
							textAnchor="middle"
							dominantBaseline="middle"
							fontSize={Settings.SOFT_STAT_PRIMARY_RATING_FONT_SIZE}
							x={(w - pt(4, 'mm')) / 2}
							y={h * 0.55}
							fontWeight="700"
							fontFamily="Open Sans"
							fill="#FFFFFF"
							letterSpacing={-0.15}
						>
							{`${ratingEnum[ baseRating ]}`.toUpperCase()}
						</text>
						<text
							textAnchor="middle"
							dominantBaseline="middle"
							fontSize={Settings.SOFT_STAT_PRIMARY_RATING_FONT_SIZE}
							x={w - pt(2, 'mm')}
							y={h * 0.55}
							fontWeight="700"
							fontFamily="Open Sans"
							fill="#FFFFFF"
						>
							{formatDiceRoll(numberEnum[ baseRating ])}
						</text>
					</>
				)}
			</g>
		);
	}
}
