import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';

// @ts-ignore
import UnitCardPaper from '../../assets/unit-card-paper.png';
// @ts-ignore
import FlagUS from '../../assets/flag-us.png';

const connector = connect(
	(state: RootState) => ({
		unit: state.editor.unit,
	})
);

export interface OwnProps {
	className?: string;
}

export type ReduxProps = ConnectedProps<typeof connector>;

export type PrintFrontProps = OwnProps & ReduxProps;

export const PrintFront: React.FC<PrintFrontProps> = ({
	unit,
}: PrintFrontProps) => {
	return (
		<svg
			id="card-print-front"
        	xmlns="http://www.w3.org/2000/svg"
        	xmlnsXlink="http://www.w3.org/1999/xlink"
			version="1.1"
			width="110mm"
			height="80mm"
			viewBox="0 0 110 80"
			style={{ borderRadius: '8px' }}
		>
			<image xlinkHref={FlagUS} width="116" height="86" x="-3" y="-3" />
			<image xlinkHref={UnitCardPaper} width="116" height="86" x="-3" y="-3" />
			<text textAnchor="middle" dominantBaseline="middle" fontSize="2" x="50%" y="50%">Foo</text>
		</svg>
	);
};

export const ConnectedPrintFront = connector(PrintFront);
