import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classNamesDedeupe from 'classnames/dedupe';
import { MotivationAttributes, MotivationNumbers, MotivationRatings } from '../enums/MotivationRatings';
import { UnitSpecialRuleNames } from '../enums/UnitSpecialRuleNames';
import { UnitTypes } from '../enums/UnitTypes';
import { RootState } from '../store';
import './CardPreview.scss';
import { SkillNumbers, SkillRatings } from '../enums/SkillRatings';
import { HitOnNumbers, HitOnRatings } from '../enums/HitOnRatings';
import { SoftStatBlock } from './preview/SoftStatBlock';
import { MobilityBlock } from './preview/MobilityBlock';
import { WeaponsBlock } from './preview/WeaponsBlock';
import { ArmorBlock } from './preview/ArmorBlock';
import { SaveBlock } from './preview/SaveBlock';

const connector = connect(
	(state: RootState) => ({
		unit: state.editor.unit,
	})
);

export interface OwnProps {
	className?: string;
}

export type ReduxProps = ConnectedProps<typeof connector>;

export type CardEditorProps = OwnProps & ReduxProps;

export class CardPreview extends React.Component<CardEditorProps> {
	render() {
		const { unit, className } = this.props;
		return (
			<div className={classNamesDedeupe(
				'card-preview',
				`card-preview--${unit.nationality}-${unit.era}`,
				className
			)}>
				<div className="card-preview__header">
					<div className="card-preview__header-icon">
						<svg
							viewBox="0 0 32 32"
						>
							<rect x="4.69" y="4.69" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.6274 16)" className="st0" width="22.63" height="22.63"/>
							<line className="st1" x1="0" y1="0" x2="32" y2="32"/>
							<line className="st1" x1="32" y1="0" x2="0" y2="32"/>
						</svg>
					</div>
					<div className="card-preview__title">
						<h1>{unit.title || 'Unamed Unit' }</h1>
						{unit.subTitle && (
							<h2>{unit.subTitle}</h2>
						)}
					</div>
					<div className="card-preview__header-icon--formation-hq">
						<svg
							viewBox="0 0 32 32"
						>
							<rect x="4.69" y="4.69" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.6274 16)" className="st0" width="22.63" height="22.63"/>
							<line className="st1" x1="0" y1="0" x2="32" y2="32"/>
							<line className="st1" x1="32" y1="0" x2="0" y2="32"/>
						</svg>
					</div>
				</div>
				<div className="card-preview__left">
					<SoftStatBlock type="motivation" stat={unit.motivation}/>
					<SoftStatBlock type="skill" stat={unit.skill}/>
				</div>
				<div className="card-preview__center">
					<div className="card-preview__special-rules">
						<span>{unit.unitType === 'UNARMOURED_TANK' ? UnitTypes[ unit.unitType ]: `${UnitTypes[ unit.unitType ]} Unit`}</span>
						{unit.specialRules.map((rule, key) => (
							<span key={key}>{UnitSpecialRuleNames[ rule ]}</span>
						))}
					</div>
				</div>
				<div className="card-preview__right">
					<SoftStatBlock type="hitOn" stat={unit.hitOn}/>
					{unit.armor && (
						<ArmorBlock armor={unit.armor}/>
					)}
					{unit.save && (
						<SaveBlock save={unit.save}/>
					)}
				</div>
				<MobilityBlock className="card-preview__movement" mobility={unit.mobility}/>
				<WeaponsBlock className="card-preview__weapons" weapons={unit.weapons}/>
			</div>
		);
	}
}

export const ConnectedCardPreview = connector(CardPreview);
