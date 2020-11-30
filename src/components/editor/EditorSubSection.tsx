// Copyright (c) 2020 Ian Paschal

import React from 'react';
import classNamesDedupe from 'classnames/dedupe';
import './EditorSubSection.scss';

export interface EditorSubSectionProps {
	className?: string;
	children: React.ReactNode;
	onRemove: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export const EditorSubSection: React.FC<EditorSubSectionProps> = ({
	className: extraClassName,
	children,
	onRemove,
}: EditorSubSectionProps) => (
	<div className={classNamesDedupe('editor-sub-section', extraClassName)}>
		<button className='editor-sub-section__delete-button' onClick={onRemove}>X</button>
		<div className='editor-sub-section__children'>
			{children}
		</div>
	</div>
);
