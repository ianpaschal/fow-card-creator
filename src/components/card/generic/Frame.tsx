import jsPDF from 'jspdf';
import React from 'react';
import { Settings } from '../../../Settings';
import { RoundedRectangleLayout, RoundedRectangleProps } from './RoundedRectangle';

export interface FrameProps extends RoundedRectangleProps {
	border?: {
		top?: number;
		right?: number;
		bottom?: number;
		left?: number;
	}
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

	constructor(props: FrameProps) {
		Object.keys(props).forEach((key) => {
			if (key === 'border') {
				Object.keys(this.border).forEach((side) => {
					this.border[ side ] = props.border[ side ] || Settings.STROKE_WIDTH;
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
			radius: this.radius - Settings.STROKE_WIDTH,
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
			radius: this.radius - Settings.STROKE_WIDTH,
		});
	}
}

export const FrameSVG: React.FC<FrameProps> = (props: FrameProps) => {
	const layout = new FrameLayout(props);
	return (
		<>
			<path d={layout.outerPathSVG + layout.innerPathSVG} fill={layout.stroke} fillRule="evenodd" />
			{layout.fill && (
				<path d={layout.innerPathSVG} fill={layout.fill} fillRule="evenodd" />
			)}
		</>
	);
};

export const  FramePDF = (doc: jsPDF, props: FrameProps): void => {
	const layout = new FrameLayout(props);
	doc.path([...layout.outerPathPDF, ...layout.innerPathPDF]).setFillColor(layout.stroke).fillEvenOdd();
	if (layout.fill) {
		doc.path(layout.innerPathPDF).setFillColor(layout.fill).fill();
	}
};
