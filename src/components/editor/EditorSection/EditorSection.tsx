// Copyright (c) 2020 Ian Paschal

import React from 'react';
import classNamesDedupe from 'classnames/dedupe';
import './EditorSection.scss';

export interface EditorSectionProps {
	className?: string;
	title: string;
	children: React.ReactNode;
}

export const EditorSection: React.FC<EditorSectionProps> = ({
	className: extraClassName,
	title,
	children,
}: EditorSectionProps) => (
	<div className={classNamesDedupe('editor-section', extraClassName)}>
		<h2 className='editor-section__title'>{title}</h2>
		<div className='editor-section__children'>
			{children}
		</div>
	</div>
);
