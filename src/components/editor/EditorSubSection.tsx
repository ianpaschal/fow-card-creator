import React from 'react';
import classNamesDedupe from 'classnames/dedupe';
import './EditorSubSection.scss';
import { Button } from 'primereact/button';

export interface EditorSubSectionProps {
	className?: string;
	children: React.ReactNode;
	onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditorSubSection: React.FC<EditorSubSectionProps> = ({
	className: extraClassName,
	children,
	onRemove,
}: EditorSubSectionProps) => (
	<div className={classNamesDedupe('editor-sub-section', extraClassName)}>
		<div className="editor-sub-section__delete-button">
			<Button
				className="p-button-icon-only p-button-danger p-button-text"
				icon="pi pi-trash"
				onClick={(e) => {
					e.preventDefault();
					onRemove(e);
				}}
			/>
		</div>
		<div className="editor-sub-section__children">
			{children}
		</div>
	</div>
);
