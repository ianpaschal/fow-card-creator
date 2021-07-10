import jsPDF from 'jspdf';
import React from 'react';
import { connect } from 'react-redux';
import { CardSettings } from '../../CardSettings';
import { RootState, store } from '../../store';
import { Area } from '../../typing/Area';
import { pt } from '../../utils/convertDistance';
import { SoftStatBlockLayout } from './SoftStatBlock';

const PRINT_DPI_FACTOR = 4.1666666667;

// Generic
const mapStateToProps = (state: RootState) => ({
	era: state.editor.unitCard.unit.motivation,
	headerBlockHeight: state.editor.unitCard.layout.headerBlock.height,
	primaryImageFormat: state.editor.unitCard.unit.primaryImageFormat,
	primaryImageURL: state.editor.unitCard.unit.primaryImageURL,
	url: state.editor.unitCard.unit.accentColor,
});

export type PrimaryImageProps = ReturnType<typeof mapStateToProps>;

export class PrimaryImageLayout {
	constructor(readonly props: PrimaryImageProps) {}

	// Computed
	get x(): number {
		if (this.props.primaryImageFormat === 'LARGE') {
			return pt(4, 'mm');
		}
		return CardSettings.MARGIN_OUTER + SoftStatBlockLayout.width;
	}

	get y(): number {
		if (this.props.primaryImageFormat === 'LARGE') {
			return CardSettings.MARGIN_OUTER + this.props.headerBlockHeight - pt(2.5, 'mm');
		}
		return CardSettings.MARGIN_OUTER + this.props.headerBlockHeight;
	}

	get width(): number {
		return CardSettings.WIDTH - 2 * this.x;
	}

	get height(): number {
		return pt(43.5, 'mm') - this.y;
	}

	// eslint-disable-next-line max-statements
	get canvasMask(): HTMLCanvasElement {
		const mask = document.createElement('canvas');

		mask.width = this.width * PRINT_DPI_FACTOR;
		mask.height = this.height * PRINT_DPI_FACTOR;

		const context = mask.getContext('2d');

		const blur = 5 * PRINT_DPI_FACTOR;
		context.beginPath();
		context.rect(0, 0, mask.width, mask.height);
		context.fillStyle = CardSettings.COLOR_BLACK;
		context.fill();
		context.shadowColor = CardSettings.COLOR_WHITE;
		context.shadowOffsetX = -mask.width;
		context.shadowOffsetY = 0;
		context.shadowBlur = blur;
		context.beginPath();
		context.rect(mask.width + blur, blur, mask.width - (2 * blur), mask.height - (2 * blur));
		context.fillStyle = CardSettings.COLOR_WHITE;
		context.fill();

		// const gradient = context.createLinearGradient(0, 0, 0, mask.height / 3);
		// gradient.addColorStop(0, 'black');
		// gradient.addColorStop(1, 'transparent');
		// context.fillStyle = gradient;
		// context.fillRect(0, 0, mask.width, mask.height / 3);

		const data = context.getImageData(0, 0, mask.width, mask.height);
		for (let i = 0; i < data.data.length; i += 4) {
			const alphaValue = data.data[ i ]; // If grayscale, red value == gray value
			data.data[ i + 0 ] = 0;
			data.data[ i + 1 ] = 0;
			data.data[ i + 2 ] = 0;
			data.data[ i + 3 ] = alphaValue; // Formerly 255, now red value
		}
		context.putImageData(data, 0, 0);

		return mask;
	}

	maskPrimaryImage(image: HTMLImageElement): string {

		const canvas = document.createElement('canvas');

		canvas.width = this.width * PRINT_DPI_FACTOR;
		canvas.height = this.height * PRINT_DPI_FACTOR;

		const context = canvas.getContext('2d');

		context.drawImage(this.canvasMask, 0, 0);
		context.globalCompositeOperation = 'source-in';
		const imageSlice = this.calcImageSlice(canvas, image);
		context.drawImage(
			image,
			imageSlice.x, imageSlice.y, imageSlice.width, imageSlice.height,
			0, 0, canvas.width, canvas.height,
		);
		return canvas.toDataURL('image/png');
	}

	calcImageSlice(canvas: HTMLCanvasElement, image: HTMLImageElement): Area {
		// > 1 means landscape, < 1 means portrait
		const canvasAspectRatio = canvas.width / canvas.height;
		const imageAspectRatio = image.width / image.height;

		if (canvasAspectRatio > imageAspectRatio) {
			// Canvas is wider/shorter than image, so fit width and crop height
			return {
				x: 0,
				y: (image.height - (image.width / canvasAspectRatio)) / 2,
				width: image.width,
				height: image.width / canvasAspectRatio,
			};
		} else {
			// Canvas is narrower/taller than image, so fit height and crop width
			return {
				x: (image.width - (image.height * canvasAspectRatio)) / 2,
				y: 0,
				width: image.height * canvasAspectRatio,
				height: image.height,
			};
		}
	}
}

// React
export class PrimaryImageSVG extends React.Component<PrimaryImageProps> {
	render() {
		const layout = new PrimaryImageLayout(this.props);
		return (
			<>
				<defs>
					<filter id="filter">
						<feGaussianBlur stdDeviation={2.5} />
					</filter>
					<mask id="mask">
						<rect
							x={layout.x + 5}
							y={layout.y + 5}
							width={layout.width - 10}
							height={layout.height - 10}
							fill="white"
							filter="url(#filter)"
						/>
					</mask>
				</defs>
				<image
					x={layout.x}
					y={layout.y}
					href={layout.props.primaryImageURL}
					width={layout.width}
					height={layout.height}
					mask="url(#mask)"
					preserveAspectRatio="xMidYMid slice"
				/>
			</>
		);
	}
};

export const ConnectedPrimaryImageSVG = connect(mapStateToProps, null)(PrimaryImageSVG);

// jsPDF
export const PrimaryImagePDF = (doc: jsPDF, props: PrimaryImageProps, image: HTMLImageElement) => {
	const layout = new PrimaryImageLayout(props);
	doc.addImage(layout.maskPrimaryImage(image), 'PNG', layout.x, layout.y, layout.width, layout.height);
};

export const ConnectedPrimaryImagePDF = (doc: jsPDF, image: HTMLImageElement) => (
	PrimaryImagePDF(doc, mapStateToProps(store.getState()), image)
);
