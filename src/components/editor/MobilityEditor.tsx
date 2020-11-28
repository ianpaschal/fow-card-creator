import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import classNamesDedupe from 'classnames/dedupe';
import { MobilityAttribute, MobilityAttributeKeys, MobilityAttributes } from '../../enums/Mobility';
import { setMobilityActionCreator } from '../../store/editor/editorActionCreators';

const connector = connect(
	(state: RootState) => ({
		mobility: state.editor.unit.mobility,
	}),
	(dispatch) => bindActionCreators({
		setMobility: setMobilityActionCreator,
	}, dispatch),
);

export interface OwnProps {
	className?: string;
}

export type ReduxProps = ConnectedProps<typeof connector>;

export type MobilityEditorProps = OwnProps & ReduxProps;

export const MobilityEditor: React.FC<MobilityEditorProps> = ({
	className: extraClassName,
	mobility,
	setMobility,
}: MobilityEditorProps) => (
	<div className={classNamesDedupe('card-editor__section', extraClassName)}>

		{MobilityAttributeKeys.map((attribute: MobilityAttribute, i: number) => (
			<div key={i} className="card-editor__input-row">
				<label htmlFor={attribute}>{MobilityAttributes[ attribute ]}</label>
				<input type="number"
					id={attribute}
					name={attribute}
					min={attribute !== 'cross' ? '0' : '1'}
					max={attribute !== 'cross' ? '72' : '6'}
					step={attribute !== 'cross' ? '2' : undefined}
					onChange={(e) => {
						setMobility(attribute, parseInt(e.target.value));
					}}
					value={mobility[ attribute ]}
				/>
			</div>
		))}

	</div>
);

export const ConnectedMobilityEditor = connector(MobilityEditor);
