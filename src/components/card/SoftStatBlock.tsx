import jsPDF from 'jspdf';
import React from 'react';
import { LabeledRectangle } from '../../drawing/LabeledRectangle';
import { HitOnRating } from '../../enums/HitOnRatings';
import { MotivationRating } from '../../enums/MotivationRatings';
import { SkillRating } from '../../enums/SkillRatings';
import { Settings } from '../../Settings';
import { SoftStatModifier } from '../../typing/SoftStatModifier';
import { SoftStatBaseRating } from './SoftStatBaseRating';
import { SoftStatModifierPDF, SoftStatModifierSVG } from './SoftStatModifier';
import { pt } from '../../utils/convertDistance';
import { RoundedRectangle } from '../../drawing/RoundedRectangle';
import { Unit } from '../../typing/Unit';

export interface Stat {
	baseRating: MotivationRating | SkillRating | HitOnRating;
	modifiers?: SoftStatModifier[];
}

export interface SoftStatBlockProps {
	x: number;
	y: number;
	unit: Unit;
	attribute: 'motivation' | 'skill' | 'hitOn';
}

export class SoftStatBlock {
	static innerMargin = pt(0.5, 'mm');
	static innerWidth = Settings.STAT_BLOCK_WIDTH - (2 * SoftStatBlock.innerMargin);
	static headerHeight = pt(1.9, 'mm');

	static calcHeight(stat: Stat): number {
		let height = 0;
		height += pt(1.9, 'mm');
		height += Settings.STROKE_WIDTH + Settings.SOFT_STAT_PRIMARY_RATING_HEIGHT;
		stat.modifiers.forEach(() => {
			height += Settings.STROKE_WIDTH + Settings.SOFT_STAT_SECONDARY_RATING_HEIGHT;
		});
		height += pt(0.5, 'mm');
		return height;
	}

	static calcModifierY(i: number, yStart = 0): number {
		let y = 0;
		y += yStart;
		y += SoftStatBlock.headerHeight;
		y += Settings.STROKE_WIDTH;
		y += Settings.SOFT_STAT_PRIMARY_RATING_HEIGHT;
		y += Settings.STROKE_WIDTH;
		y += i * (Settings.SOFT_STAT_SECONDARY_RATING_HEIGHT + Settings.STROKE_WIDTH);
		return y;
	};

	static PDF = (doc: jsPDF, {
		x,
		y,
		unit,
		attribute,
	}: SoftStatBlockProps) => {
		LabeledRectangle.PDF(doc, {
			x,
			y,
			w: Settings.STAT_BLOCK_WIDTH,
			h: SoftStatBlock.calcHeight(unit[ attribute ]),
			r: Settings.CORNER_RADIUS,
			headerHeight: SoftStatBlock.headerHeight,
			text: attribute === 'hitOn' ? 'IS HIT ON' : attribute.toUpperCase(),
			stroke: unit.accentColor,
			fontSize: Settings.STAT_HEADER_FONT_SIZE,
			fill: '#FFFFFF',
		});

		SoftStatBaseRating.PDF(doc, {
			x: x + SoftStatBlock.innerMargin,
			y: y + SoftStatBlock.headerHeight + Settings.STROKE_WIDTH,
			unit,
			attribute,
		});

		unit[ attribute ].modifiers.forEach((modifier, i: number) => {
			SoftStatModifierPDF(doc, {
				x: x + SoftStatBlock.innerMargin,
				y: SoftStatBlock.calcModifierY(i, y),
				modifier,
			});
		});
	}

	static SVG: React.FC<SoftStatBlockProps> = ({
		x,
		y,
		unit,
		attribute,
	}: SoftStatBlockProps) => {
		return(
			<g transform={`translate(${x} ${y})`}>
				<LabeledRectangle.SVG
					x={0}
					y={0}
					w={Settings.STAT_BLOCK_WIDTH}
					h={SoftStatBlock.calcHeight(unit[ attribute ])}
					r={Settings.CORNER_RADIUS}
					headerHeight={SoftStatBlock.headerHeight}
					text={attribute === 'hitOn' ? 'IS HIT ON' : attribute.toUpperCase()}
					stroke={unit.accentColor}
					fontSize={Settings.STAT_HEADER_FONT_SIZE}
					fill={'#FFFFFF'}
				/>
				<SoftStatBaseRating.SVG
					x={SoftStatBlock.innerMargin}
					y={SoftStatBlock.headerHeight + Settings.STROKE_WIDTH}
					unit={unit}
					attribute={attribute}
				/>
				{unit[ attribute ].modifiers.map((modifier, i) => (
					<SoftStatModifierSVG
						key={i}
						x={SoftStatBlock.innerMargin}
						y={SoftStatBlock.calcModifierY(i, 0)}
						modifier={modifier}
					/>
				))}
			</g>
		);
	}
}
