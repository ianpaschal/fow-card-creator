import jsPDF from 'jspdf';
import React from 'react';
import { Unit } from '../../typing/Unit';
import { Settings } from '../../Settings';
import { BackgroundPDF, ConnectedBackgroundSVG } from './Background';
import { ConnectedArmorBlockPDF, ConnectedArmorBlockSVG } from './ArmorBlock';
import { ConnectedHitOnBlockPDF, ConnectedHitOnBlockSVG } from './HitOnBlock';
import { ConnectedMobilityBlockPDF, ConnectedMobilityBlockSVG } from './MobilityBlock';
import { ConnectedMotivationBlockPDF, ConnectedMotivationBlockSVG } from './MotivationBlock';
import { ConnectedPrimaryImagePDF, ConnectedPrimaryImageSVG } from './PrimaryImage';
import { ConnectedSaveBlockPDF, ConnectedSaveBlockSVG } from './SaveBlock';
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
			<ConnectedArmorBlockSVG />
			<ConnectedSaveBlockSVG />
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
	ConnectedArmorBlockPDF(doc);
	ConnectedSaveBlockPDF(doc);
	ConnectedMobilityBlockPDF(doc);
	ConnectedWeaponsBlockPDF(doc);
};
