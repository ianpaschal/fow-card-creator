import jsPDF from 'jspdf';
import React from 'react';
import { ConnectedArmorBlockPDF, ConnectedArmorBlockSVG } from './ArmorBlock';
import { ConnectedBackgroundPDF, ConnectedBackgroundSVG } from './Background';
import { ConnectedHeaderBlockPDF, ConnectedHeaderBlockSVG } from './HeaderBlock';
import { ConnectedHitOnBlockPDF, ConnectedHitOnBlockSVG } from './HitOnBlock';
import { ConnectedMobilityBlockPDF, ConnectedMobilityBlockSVG } from './MobilityBlock';
import { ConnectedMotivationBlockPDF, ConnectedMotivationBlockSVG } from './MotivationBlock';
import { ConnectedPrimaryImagePDF, ConnectedPrimaryImageSVG } from './PrimaryImage';
import { ConnectedSaveBlockPDF, ConnectedSaveBlockSVG } from './SaveBlock';
import { ConnectedSkillBlockPDF, ConnectedSkillBlockSVG } from './SkillBlock';
import { ConnectedSpecialRulesListPDF, ConnectedSpecialRulesListSVG } from './SpecialRulesList';
import { ConnectedWeaponsBlockPDF, ConnectedWeaponsBlockSVG } from './WeaponsBlock';
import { SVGWrapper } from './SVGWrapper';

export const UnitCardFrontSVG: React.FC = () => {
	return (
		<SVGWrapper>
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
		</SVGWrapper>
	);
};

export const UnitCardFrontPDF = (doc: jsPDF, primaryImage: HTMLImageElement): void => {
	ConnectedBackgroundPDF(doc);
	ConnectedPrimaryImagePDF(doc, primaryImage);
	ConnectedHeaderBlockPDF(doc);
	ConnectedMotivationBlockPDF(doc);
	ConnectedSkillBlockPDF(doc);
	ConnectedSpecialRulesListPDF(doc);
	ConnectedHitOnBlockPDF(doc);
	ConnectedArmorBlockPDF(doc);
	ConnectedSaveBlockPDF(doc);
	ConnectedMobilityBlockPDF(doc);
	ConnectedWeaponsBlockPDF(doc);
};
