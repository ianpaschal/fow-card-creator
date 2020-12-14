import React from 'react';
import { SoftStatBlock } from './SoftStatBlock';
import { Background } from './Background';
import { MobilityBlockSVG } from './MobilityBlockSVG';
import { Unit } from '../../typing/Unit';
import { WeaponsBlockSVG } from './WeaponsBlockSVG';

/**
 * We could use the browsers' bounding box tools to assist in placement but that
 * approach has two shortcomings:
 * 1. The measurements will be in unscaled pixesl, which we will then have to
 *    reverse-convert back into SVG-space dimensions.
 * 2. Using bounding boxes requires rendering the SVG first and then correcting
 *    based on the output.
 * Since all dimensions are hardcoded anyway, we might as well compute them up
 * front.
 */

const MOBILITY_BLOCK_HEIGHT = 6.875;

function calcRightHeight(unit: Unit): number {
	const hitOnBlockHeight = 6.2; // No modifiers for hitOn
	const saveBlockHeight = 18; // TODO: Calculate
	return hitOnBlockHeight + 1.65 + saveBlockHeight + 1.65;

}
function calcLeftHeight(unit: Unit): number {
	// The left side has 2 soft stat blocks. Each one is 6.2 by default, plus
	// 4.45 for each modifier. There's also 1.65 of space under each one.
	const motivationBlockHeight = 6.2 + (unit.motivation.modifiers.length * 4.45);
	const skillBlockHeight = 6.2 + (unit.skill.modifiers.length * 4.45);
	return motivationBlockHeight + 1.65 + skillBlockHeight + 1.65;
}
function calcBottomPosition(unit: Unit) {

	const headerDescent = 15.125;

	const leftDescent = headerDescent + calcLeftHeight(unit);
	const rightDescent = headerDescent + calcRightHeight(unit);

	// Never let the lower portion rise above 50% of the card height, even if there is room
	return Math.max(32, Math.max(leftDescent, rightDescent));
}

export interface CardFrontSVGProps {
	className?: string;
	unit: Unit;
}

export const CardFrontSVG: React.FC<CardFrontSVGProps> = ({
	unit,
}: CardFrontSVGProps) => {
	return (
		<svg
			id="card-print-front"
        	xmlns="http://www.w3.org/2000/svg"
        	xmlnsXlink="http://www.w3.org/1999/xlink"
			version="1.1"
			viewBox="0 0 110 80"
			style={{ borderRadius: '8px' }}
			preserveAspectRatio="xMidYMid meet"
		>
			{/* <Background nation={unit.nationality} /> */}

			<g className="svg-unit-card__header" transform="translate(5 5)">
				<rect width="100" height="8.25" rx="1" fill={unit.accentColor}/>
				<rect x="1.25" y="1.25" width="5.75" height="5.75" fill="white"/>
				<text textAnchor="middle" fontFamily="Open Sans" fontSize="6" fontWeight="700" x="50" y="5.5" fill="white">
					{unit.title.toUpperCase() || 'UNTITLED UNIT' }
				</text>
				{unit.subTitle.length > 0 && (
					<text textAnchor="middle" fontFamily="Open Sans" fontSize="2.25" fontWeight="700" x="50" y="7.5" fill="white">
						{unit.subTitle.toUpperCase()}
					</text>
				)}
			</g>

			<g className="svg-unit-card__left" transform="translate(5 15.125)">
				<SoftStatBlock isComponent={unit.isComponent} attribute="motivation" stat={unit.motivation} accentColor={unit.accentColor} />
				<SoftStatBlock
					isComponent={unit.isComponent}
					stat={unit.skill}
					attribute="skill"
					y={`${6.2 + (unit.motivation.modifiers.length * 4.45) + 1.65}`}
					accentColor={unit.accentColor}
				/>
			</g>

			<g className="svg-unit-card__right" transform="translate(82 15.125)">
				<SoftStatBlock
					isComponent={unit.isComponent}
					attribute="hitOn"
					stat={unit.hitOn}
					accentColor={unit.accentColor}
				/>
			</g>

			<g className="svg-unit-card__bottom" transform={`translate(5 ${calcBottomPosition(unit)})`}>
				<MobilityBlockSVG unit={unit} />
				{unit.weapons.length > 0 && (
					<WeaponsBlockSVG y={`${MOBILITY_BLOCK_HEIGHT + 1.65}`} unit={unit} />
				)}
			</g>
		</svg>
	);
};
