import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';

const connector = connect(
	(state: RootState) => ({
		unit: state.editor.unit,
	})
);

export interface OwnProps {
	className?: string;
}

export type ReduxProps = ConnectedProps<typeof connector>;

export type CardPreviewRearProps = OwnProps & ReduxProps;

export const CardPreviewRear: React.FC<CardPreviewRearProps> = ({
	unit,
}: CardPreviewRearProps) => {
	return (
		<div className="card-preivew--rear">
			<HeaderBlock unit={unit}/>
		</div>
	);
};

export const ConnectedCardPreviewRear = connector(CardPreviewRear);
