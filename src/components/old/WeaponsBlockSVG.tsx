import React from 'react';
import { WeaponAttributes } from '../../enums/WeaponAttributes';
import { Unit } from '../../typing/Unit';
import { formatDiceRoll } from '../../utils/formatDiceRoll';

// TODO: Optimize; should be possible to use only 1 set of dimensions
const COLUMN_LINE_ANCHORS = [
	'30',
	'40.025',
	'59.975',
	'79.925',
];

const COLUMN_TEXT_ANCHORS = [
	'10.1',
	'30.05',
	'50',
	'69.95',
	'89.9',
];

export interface WeaponsBlockSVGProps {
	unit: Unit;
	x?: string;
	y?: string;
}

export const WeaponsBlockSVG: React.FC<WeaponsBlockSVGProps> = ({
	unit,
	x,
	y,
}: WeaponsBlockSVGProps) => {
	return (
		<g transform={`translate(${x || 0} ${y || 0})`}>
			<path
				className="svg-soft-stat-block__header-bg"
				fill={unit.accentColor}
				d="M1,0C0.45,0,0,0.45,0,1v2.62h0.12c0-0.48,0.39-0.88,0.88-0.88h98c0.48,0,0.88,0.39,0.88,0.88H100V1c0-0.55-0.45-1-1-1H1z"
			/>
			<rect x="0.125" y="2.75" width="99.75" height={(4.25 * unit.weapons.length) + 0.25} rx="0.875" stroke={unit.accentColor} strokeWidth="0.25" fill="rgb(255,255,255)"/>
			{/* {COLUMN_LINE_ANCHORS.map((anchor, i) => (
				<line
					key={`line-${i}`}
					x1={anchor} y1="2.75"
					x2={anchor} y2="6.75"
					stroke={unit.accentColor}
					strokeWidth="0.25"
				/>
			))} */}

			{/* {Object.keys(WeaponAttributes).map((key, i) => (
				<text
					key={`header-${i}`}
					className="mobility-block__header-label"
					dominantBaseline="middle"
					textAnchor="middle"
					x={COLUMN_TEXT_ANCHORS[ i ]}
					y="1.55"
					fontSize="1.5"
					fontWeight="800"
					fontFamily="Open Sans"
					fill="rgb(255,255,255)"
				>
					{`${WeaponAttributes[ key ]}`.toUpperCase()}
				</text>
			))} */}

			{/* {Object.keys(unit.mobility).map((key, i) => (
				<React.Fragment key={`value-${i}`}>
					<text
						className="svg-soft-stat-block__value-text"
						textAnchor="middle"
						x={COLUMN_TEXT_ANCHORS[ i ]}
						y="5.75"
						fontSize="2.5"
						fontWeight="600"
						fontFamily="Open Sans"
					>
						{key === 'cross' ? (
							formatDiceRoll(unit.mobility[ key ], true)
						) : (
							<>
								{ unit.mobility[ key ] > 0 ? (
									<>{unit.mobility[ key ]}&rdquo;/{unit.mobility[ key ] * 2.5}
								) : (
									<>&mdash;</>
								)}
							</>
						)}
					</text>
					{key !== 'cross' && unit.mobility[ key ] > 0 && (
						<text
							key={i}
							className="svg-soft-stat-block__value-text"
							textAnchor="middle"
							x={parseInt(COLUMN_TEXT_ANCHORS[ i ]) + 6}
							y="5.75"
							fontSize="2"
							fontWeight="600"
							fontFamily="Open Sans"
						>
							CM
						</text>
					)}
				</React.Fragment>
			))} */}
		</g>
	);
};
