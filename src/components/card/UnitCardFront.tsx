import jsPDF from 'jspdf';
import React from 'react';
import { Unit } from '../../typing/Unit';
import { pt } from '../../utils/convertDistance';
import { Settings } from '../../Settings';
import { SoftStatBlockProps } from './SoftStatBlock';
import { HeaderBlockPDF, ConnectedHeaderBlockSVG, HeaderBlockLayout } from './HeaderBlock';
import { BackgroundPDF, ConnectedBackgroundSVG } from './Background';
import { ArmorBlockLayout, ArmorBlockPDF, ArmorBlockProps, ArmorBlockSVG } from './ArmorBlock';
import { SaveBlockLayout, SaveBlockPDF, SaveBlockProps, SaveBlockSVG } from './SaveBlock';
import { ConnectedMobilityBlockPDF, ConnectedMobilityBlockSVG, MobilityBlockLayout, MobilityBlockProps, MobilityBlockSVG } from './MobilityBlock';
import { WeaponsBlockSVG, WeaponsBlockProps, ConnectedWeaponsBlockSVG } from './WeaponsBlock';
import { ConnectedMotivationBlockPDF, ConnectedMotivationBlockSVG, MotivationBlockPDF } from './MotivationBlock';
import { ConnectedSkillBlockPDF, ConnectedSkillBlockSVG } from './SkillBlock';
import { ConnectedSpecialRulesListPDF, ConnectedSpecialRulesListSVG } from './SpecialRulesList';
import { ConnectedPrimaryImagePDF, ConnectedPrimaryImageSVG } from './PrimaryImage';
import { ConnectedHitOnBlockPDF, ConnectedHitOnBlockSVG } from './HitOnBlock';

export interface UnitCardFrontProps {}

export const UnitCardFrontSVG: React.FC<UnitCardFrontProps> = () => {
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
	// ConnectedWeaponsBlockPDF(doc);
};
