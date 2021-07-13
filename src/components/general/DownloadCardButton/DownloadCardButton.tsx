import React, { useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { createUnitCardPDF } from '../../../utils/createUnitCardPDF';
import './DownloadCardButton.scss';

export const DownloadCardButton: React.FC = () => {
	const windowWidth = useWindowWidth();
	const [isGenerating, setIsGenerating] = useState(false);
	const downloadPDF = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsGenerating(true);
		createUnitCardPDF(() => {
			setIsGenerating(false);
		});
	};
	return (
		<div className="download-card-button">
			<Button
				className="download-card-button__button"
				label={windowWidth >= 720 ? 'Export PDF' : null}
				icon="pi pi-download"
				iconPos="right"
				tooltipOptions={{ position: 'bottom' }}
				onClick={downloadPDF}
			/>
			<Dialog className="download-card-button__dialog" visible={isGenerating} modal onHide={() => null}>
				<p>Please wait while the PDF generates...</p>
				<i className="pi pi-spin pi-spinner" />
			</Dialog>
		</div>
	);
};
