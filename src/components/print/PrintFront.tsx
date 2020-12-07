import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { SoftStatBlock } from './SoftStatBlock';
import { Background } from './Background';

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
			<Background nation={unit.nationality} />

			{/* HEADER */}
			<rect x="5" y="5" width="100" height="8.25" rx="1" fill={unit.accentColor}/>
			<rect x="6.25" y="6.25" width="5.75" height="5.75" fill="white"/>
			<text textAnchor="middle" dominantBaseline="middle" fontSize="2" x="55" y="10" fill="white">{unit.title}</text>

			<SoftStatBlock isComponent={unit.isComponent} attribute="motivation" x="5" y="15.125" stat={unit.motivation} accentColor={unit.accentColor} />
			<SoftStatBlock isComponent={unit.isComponent} attribute="skill" x="5" y="30" stat={unit.skill} accentColor={unit.accentColor} />
			<SoftStatBlock isComponent={unit.isComponent} attribute="hitOn" x="82" y="15.125" stat={unit.hitOn} accentColor={unit.accentColor} />
		</svg>
	);
};

export const ConnectedPrintFront = connector(PrintFront);
