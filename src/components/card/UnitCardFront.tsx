import jsPDF from 'jspdf';
import React from 'react';
import { Unit } from '../../typing/Unit';
import { Settings } from '../../Settings';
// import { ArmorBlockLayout, ArmorBlockPDF, ArmorBlockProps, ArmorBlockSVG } from './ArmorBlock';
// import { SaveBlockLayout, SaveBlockPDF, SaveBlockProps, SaveBlockSVG } from './SaveBlock';
import { BackgroundPDF, ConnectedBackgroundSVG } from './Background';
import { ConnectedHitOnBlockPDF, ConnectedHitOnBlockSVG } from './HitOnBlock';
import { ConnectedMobilityBlockPDF, ConnectedMobilityBlockSVG } from './MobilityBlock';
import { ConnectedMotivationBlockPDF, ConnectedMotivationBlockSVG } from './MotivationBlock';
import { ConnectedPrimaryImagePDF, ConnectedPrimaryImageSVG } from './PrimaryImage';
import { ConnectedSkillBlockPDF, ConnectedSkillBlockSVG } from './SkillBlock';
import { ConnectedSpecialRulesListPDF, ConnectedSpecialRulesListSVG } from './SpecialRulesList';
import { ConnectedWeaponsBlockPDF, ConnectedWeaponsBlockSVG } from './WeaponsBlock';
import { HeaderBlockPDF, ConnectedHeaderBlockSVG } from './HeaderBlock';

export const UnitCardFrontSVG: React.FC = () => {
	return (
		<svg
			id="card-print-front"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			version="1.1"
			width={Settings.CARD_WIDTH}
			height={Settings.CARD_HEIGHT}
			viewBox={`0 0 ${Settings.CARD_WIDTH} ${Settings.CARD_HEIGHT}`}
			preserveAspectRatio="xMidYMid meet"
		>
			<ConnectedBackgroundSVG />
			<ConnectedPrimaryImageSVG />
			<ConnectedHeaderBlockSVG />
			<ConnectedMotivationBlockSVG />
			<ConnectedSkillBlockSVG />
			<ConnectedSpecialRulesListSVG />
			<ConnectedHitOnBlockSVG />

			{/* {unit.armor && (
					<ArmorBlockSVG {...layout.saveBlockProps} />
				)} */}
			{/* {unit.save && (
					<SaveBlockSVG {...layout.saveBlockProps} />
				)} */}
			<ConnectedMobilityBlockSVG />
			<ConnectedWeaponsBlockSVG />
		</svg>
	);
};

export const UnitCardFrontPDF = (doc: jsPDF, unit: Unit, primaryImage: HTMLImageElement): void => {

	BackgroundPDF(doc, unit);
	ConnectedPrimaryImagePDF(doc, primaryImage);
	HeaderBlockPDF(doc, unit);
	ConnectedMotivationBlockPDF(doc);
	ConnectedSkillBlockPDF(doc);
	ConnectedSpecialRulesListPDF(doc);
	ConnectedHitOnBlockPDF(doc);

	// SoftStatBlock.PDF(doc, layout.hitOnBlockProps);
	// if (unit.armor) {
	// 	ArmorBlockPDF(doc, layout.saveBlockProps);
	// }
	// if (unit.save) {
	// 	SaveBlockPDF(doc, layout.saveBlockProps);
	// }
	ConnectedMobilityBlockPDF(doc);
	ConnectedWeaponsBlockPDF(doc);
};
