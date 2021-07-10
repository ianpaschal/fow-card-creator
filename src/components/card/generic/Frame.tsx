import jsPDF, { GState } from 'jspdf';
import React from 'react';
import { CardSettings } from '../../../CardSettings';
import { RoundedRectangleLayout, RoundedRectangleProps } from './RoundedRectangle';

export interface FrameProps extends RoundedRectangleProps {
	border?: {
		top?: number;
		right?: number;
		bottom?: number;
		left?: number;
	}
	fillOpacity?: number;
}

export class FrameLayout {
	stroke: string;
	fill: string;
	border: {[key: string]: number} = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	};
	x: number;
	y: number;
	width: number;
	height: number;
	radius: number;
	fillOpacity?: number;

	constructor(props: FrameProps) {
		Object.keys(props).forEach((key) => {
			if (key === 'border') {
				Object.keys(this.border).forEach((side) => {
					this.border[ side ] = props.border[ side ] || CardSettings.STROKE_WIDTH;
				});
			} else {
				this[ key ] = props[ key ];
			}
		});
	}

	get outerPathSVG(): string {
		return RoundedRectangleLayout.createSVGPath({ ...this });
	}

	get innerPathSVG(): string {
		return RoundedRectangleLayout.createSVGPath({
			x: this.x + this.border.left,
			y: this.y + this.border.top,
			width: this.width - (this.border.left + this.border.right),
			height: this.height - (this.border.top + this.border.bottom),
			radius: this.radius - CardSettings.STROKE_WIDTH,
		});
	}
	get outerPathPDF(): any[] {
		return RoundedRectangleLayout.createPDFPath({ ...this });
	}

	get innerPathPDF(): any[] {
		return RoundedRectangleLayout.createPDFPath({
			x: this.x + this.border.left,
			y: this.y + this.border.top,
			width: this.width - (this.border.left + this.border.right),
			height: this.height - (this.border.top + this.border.bottom),
			radius: this.radius - CardSettings.STROKE_WIDTH,
		});
	}
}

export const FrameSVG: React.FC<FrameProps> = (props: FrameProps) => {
	const layout = new FrameLayout(props);
	return (
		<>
			<path d={layout.outerPathSVG + layout.innerPathSVG} fill={layout.stroke} fillRule="evenodd" />
			{layout.fill && (
				<path d={layout.innerPathSVG} fill={layout.fill} fillRule="evenodd" opacity={layout.fillOpacity || 1} />
			)}
		</>
	);
};

export const  FramePDF = (doc: jsPDF, props: FrameProps): void => {
	const layout = new FrameLayout(props);
	doc.path([...layout.outerPathPDF, ...layout.innerPathPDF]).setFillColor(layout.stroke).fillEvenOdd();
	if (layout.fill) {
		if (layout.fillOpacity) {
			doc.setGState(new GState({
				opacity: layout.fillOpacity,
			}));
		}
		doc.path(layout.innerPathPDF).setFillColor(layout.fill).fill();
		// Reset so subsequent draws are not affected by fillOpacity
		doc.setGState(new GState({
			opacity: 1,
		}));
	}
};
