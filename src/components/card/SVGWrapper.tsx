import React from 'react';
import { CardSettings } from '../../CardSettings';

export interface SVGWrapperProps {
	children: React.ReactNode;
}

export const SVGWrapper: React.FC<SVGWrapperProps> = ({
	children,
}: SVGWrapperProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		version="1.1"
		width={CardSettings.WIDTH}
		height={CardSettings.HEIGHT}
		viewBox={`0 0 ${CardSettings.WIDTH} ${CardSettings.HEIGHT}`}
		preserveAspectRatio="xMidYMid meet"
	>
		{children}
	</svg>
);
