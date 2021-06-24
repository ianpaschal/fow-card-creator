import jsPDF from 'jspdf';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Era } from '../../enums/Eras';
import { ImageFormat, ImageFormats } from '../../enums/ImageFormats';
import { Settings } from '../../Settings';
import { RootState, store } from '../../store';
import { Area } from '../../typing/Area';
import { SoftStat } from '../../typing/SoftStat';
import { mm, pt } from '../../utils/convertDistance';
import { SoftStatBlockPDF, SoftStatBlockProps, SoftStatBlockSVG } from './SoftStatBlock';

const PRINT_DPI_FACTOR = 4.1666666667;

export type PrimaryImageProps = ConnectedProps<typeof connector>;

export class PrimaryImageLayout {
	// Passed
	era: SoftStat;
	url: string;
	headerBlockHeight: number;
	primaryImageURL: string;
	primaryImageFormat: ImageFormat;

	constructor(props: PrimaryImageProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	// Computed
	get x(): number {
		if (this.primaryImageFormat === 'LARGE') {
			return pt(4, 'mm');
		}
		return Settings.CARD_MARGINS + Settings.STAT_BLOCK_WIDTH;
	}

	get y(): number {
		if (this.primaryImageFormat === 'LARGE') {
			return Settings.CARD_MARGINS + this.headerBlockHeight - pt(2.5, 'mm');
		}
		return Settings.CARD_MARGINS + this.headerBlockHeight;
	}

	get width(): number {
		return Settings.CARD_WIDTH - 2 * this.x;
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
		context.fillStyle = '#000000';
		context.fill();
		context.shadowColor = '#FFFFFF';
		context.shadowOffsetX = -mask.width;
		context.shadowOffsetY = 0;
		context.shadowBlur = blur;
		context.beginPath();
		context.rect(mask.width + blur, blur, mask.width - (2 * blur), mask.height - (2 * blur));
		context.fillStyle = '#FFFFFF';
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
			const cropFactor = ((canvas.width / imageAspectRatio) - canvas.height) / 2;
			const y = image.height * cropFactor;
			const height = image.height - (2 * y);
			return {
				x: 0,
				y: (image.height - (image.width / canvasAspectRatio)) / 2,
				width: image.width,
				height: image.width / canvasAspectRatio,
			};
		} else {
			// Canvas is narrower/taller than image, so fit height and crop width
			const cropFactor = ((canvas.height * imageAspectRatio) - canvas.width) / 2;
			const x = image.width * cropFactor;
			const width = image.width - (2 * x);
			return {
				x: (image.width - (image.height * canvasAspectRatio)) / 2,
				y: 0,
				width: image.height * canvasAspectRatio,
				height: image.height,
			};
		}
	}
}

const connector = connect((state: RootState) => ({
	era: state.editor.unitCard.unit.motivation,
	url: state.editor.unitCard.unit.accentColor,
	headerBlockHeight: state.editor.unitCard.layout.headerBlock.height,
	primaryImageURL: state.editor.unitCard.unit.primaryImageURL,
	primaryImageFormat: state.editor.unitCard.unit.primaryImageFormat,
}), null);

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
					href={layout.primaryImageURL}
					width={layout.width}
					height={layout.height}
					mask="url(#mask)"
					preserveAspectRatio="xMidYMid slice"
				/>
			</>
		);
	}
};

export const ConnectedPrimaryImageSVG = connector(PrimaryImageSVG);

export const PrimaryImagePDF = (doc: jsPDF, props: PrimaryImageProps, image: HTMLImageElement) => {
	const layout = new PrimaryImageLayout(props);
	doc.addImage(layout.maskPrimaryImage(image), 'PNG', layout.x, layout.y, layout.width, layout.height);
};

export const ConnectedPrimaryImagePDF = (doc: jsPDF, image: HTMLImageElement) => PrimaryImagePDF(doc, {
	era: store.getState().editor.unitCard.unit.motivation,
	url: store.getState().editor.unitCard.unit.accentColor,
	headerBlockHeight: store.getState().editor.unitCard.layout.headerBlock.height,
	primaryImageURL: store.getState().editor.unitCard.unit.primaryImageURL,
	primaryImageFormat: store.getState().editor.unitCard.unit.primaryImageFormat,
}, image);
