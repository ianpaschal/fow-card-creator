// Copyright (c) 2020 Ian Paschal

import React from 'react';
import classNamesDedeupe from 'classnames/dedupe';
import './MobilityBlock.scss';
import { MobilityAttributes } from '../../enums/Mobility';
import { FormattedDiceRoll } from '../card/FormattedDiceRoll';

export interface MobilityBlockProps {
	className?: string;
	mobility: {
		tactical: number;
		terrainDash: number;
		crossCountryDash: number;
		roadDash: number;
		cross: number;
	}
}

export const MobilityBlock: React.FC<MobilityBlockProps> = ({
	className: extraClassName,
	mobility,
}: MobilityBlockProps) => {
	return (
		<div className={classNamesDedeupe('mobility-block', extraClassName)}>
			<div className="mobility-block__header">
				{Object.keys(MobilityAttributes).map((key, i) => (
					<h3 key={i} className="mobility-block__header-label">
						{MobilityAttributes[ key ]}
					</h3>))
				}
			</div>
			<div className="mobility-block__body">
				<div className="mobility-block__row">
					{Object.keys(mobility).map((key, i) => (
						<div key={i} className="mobility-block__row-cell">
							{key === 'cross' ? (
								<FormattedDiceRoll value={mobility[ key ]}/>
							) : (
								<>
									{ mobility[ key ] > 0 ? (
										<>{mobility[ key ]}&rdquo;/{mobility[ key ] * 2.5}<span className="metric-unit">CM</span></>
									) : (
										<>&mdash;</>
									)}
								</>
							)}
						</div>))
					}
				</div>
			</div>
		</div>
	);
};
