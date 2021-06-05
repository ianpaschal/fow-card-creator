import jsPDF from 'jspdf';
import React from 'react';
import { LabeledRectangle, LabeledRectangleProps } from '../../drawing/LabeledRectangle';
import { RoundedRectangle, RoundedRectangleProps, RoundedRectangleSVG } from '../../drawing/RoundedRectangle';
import { MobilityAttribute, MobilityAttributeKeys, MobilityAttributes } from '../../enums/Mobility';
import { Settings } from '../../Settings';
import { Unit } from '../../typing/Unit';
import { pt } from '../../utils/convertDistance';
import { formatDiceRoll } from '../../utils/formatDiceRoll';
import { TextPDF, TextProps, TextSVG } from './generic/Text';

export interface MobilityBlockProps {
	unit: Unit;
	y: number;
}

export class MobilityBlockLayout {
	unit: Unit;
	y: number;

	static height: number = pt(6.8, 'mm');
	static headerHeight: number = pt(2.9, 'mm');
	static columns: number = 5;

	constructor(props: MobilityBlockProps) {
		this.unit = props.unit;
		this.y = props.y;
	}

	get outerArea(): RoundedRectangleProps {
		return {
			x: Settings.CARD_MARGINS,
			y: this.y,
			w: Settings.CARD_WIDTH - (2 * Settings.CARD_MARGINS),
			h: MobilityBlockLayout.height,
			r: Settings.CORNER_RADIUS,
		};
	}

	get innerWidth(): number {
		return Settings.CARD_WIDTH - (2 * (Settings.CARD_MARGINS + Settings.STROKE_WIDTH));
	}

	get columnWidth(): number {
		const strokeSpace = (MobilityBlockLayout.columns - 1) * Settings.STROKE_WIDTH;
		return (this.innerWidth - strokeSpace) / 5;
	}

	get innerArea(): RoundedRectangleProps {
		return {
			x: Settings.CARD_MARGINS + Settings.STROKE_WIDTH,
			y: this.y + MobilityBlockLayout.headerHeight,
			w: this.innerWidth,
			h: MobilityBlockLayout.height - (MobilityBlockLayout.headerHeight + Settings.STROKE_WIDTH),
			r: Settings.CORNER_RADIUS - Settings.STROKE_WIDTH,
		};
	}

	get frameProps(): LabeledRectangleProps {
		return {
			...this.outerArea,
			headerHeight: MobilityBlockLayout.headerHeight,
			fontSize: 4.5,
			r: Settings.CORNER_RADIUS,
			stroke: this.unit.accentColor,
			fill: '#FFFFFF',
		};
	}

	calcColumnX(i: number): number {
		return Settings.CARD_MARGINS + Settings.STROKE_WIDTH + (i * (this.columnWidth + Settings.STROKE_WIDTH));
	}

	getMobilityLabelProps(key: MobilityAttribute, i: number): TextProps {
		return {
			x: this.calcColumnX(i),
			y: this.y,
			w: this.columnWidth,
			h: MobilityBlockLayout.headerHeight,
			color: '#FFFFFF',
			font: 'OpenSans-Bold',
			fontSize: 4.5,
			text: MobilityAttributes[ key ].toUpperCase(),
			align: 'center',
		};
	}

	getMobilityValueProps(key: MobilityAttribute, i: number): TextProps {
		const formattedDistance = `${this.unit.mobility[ key ]}”/${this.unit.mobility[ key ] * 2.5}CM`;
		return {
			x: this.calcColumnX(i),
			y: this.y + MobilityBlockLayout.headerHeight,
			w: this.columnWidth,
			h: this.innerArea.h,
			color: '#000000',
			font: 'OpenSans-SemiBold',
			fontSize: 6.75,
			text: key === 'cross' ? formatDiceRoll(this.unit.mobility[ key ], true) : formattedDistance,
			align: 'center',
		};
	}
}

export const MobilityBlockPDF = (doc: jsPDF, props: MobilityBlockProps) => {
	const layout = new MobilityBlockLayout(props);
	LabeledRectangle.PDF(doc, layout.frameProps);
	MobilityAttributeKeys.forEach((key: MobilityAttribute, i: number) => {
		TextPDF(doc, layout.getMobilityLabelProps(key, i));
		TextPDF(doc, layout.getMobilityValueProps(key, i));
		if (i > 0) {
			doc.setFillColor(layout.unit.accentColor).rect(
				layout.getMobilityValueProps(key, i).x - Settings.STROKE_WIDTH,
				layout.getMobilityValueProps(key, i).y,
				Settings.STROKE_WIDTH,
				layout.innerArea.h,
				'F',
			);
		}
	});
};

export const MobilityBlockSVG: React.FC<MobilityBlockProps> = (props: MobilityBlockProps) => {
	const layout = new MobilityBlockLayout(props);
	return (
		<>
			<LabeledRectangle.SVG {...layout.frameProps} />
			{MobilityAttributeKeys.map((key: MobilityAttribute, i: number) => (
				<React.Fragment key={i}>
					<TextSVG {...layout.getMobilityLabelProps(key, i)} />
					<TextSVG {...layout.getMobilityValueProps(key, i)} />
					{i > 0 && (
						<rect
							x={layout.getMobilityValueProps(key, i).x - Settings.STROKE_WIDTH}
							y={layout.getMobilityValueProps(key, i).y}
							width={Settings.STROKE_WIDTH}
							height={layout.innerArea.h}

							fill={layout.unit.accentColor}
						/>
					)}
				</React.Fragment>
			))}
		</>
	);
};
