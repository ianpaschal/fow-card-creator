// Copyright (c) 2020 Ian Paschal

import React from 'react';
import classNamesDedupe from 'classnames/dedupe';
import './FormItem.scss';

export interface FormItemProps {
	className?: string;
	label: string;
	children: React.ReactNode;
}

export const FormItem: React.FC<FormItemProps> = ({
	className: extraClassName,
	label,
	children,
}: FormItemProps) => (
	<div className={classNamesDedupe('form-item', extraClassName)}>
		<label className='form-item__label'>{label}</label>
		<div className='form-item__children'>
			{children}
		</div>
	</div>
);
