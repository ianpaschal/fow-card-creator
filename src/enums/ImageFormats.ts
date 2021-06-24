export enum ImageFormats {
	SMALL = 'Small',
	LARGE = 'Large',
}

export type ImageFormat = keyof typeof ImageFormats;

export const ImageFormatKeys = Object.keys(ImageFormats);
