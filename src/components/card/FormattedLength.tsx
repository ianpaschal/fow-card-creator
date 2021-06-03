// Copyright (c) 2020 Ian Paschal

import React from 'react';
import classNamesDedeupe from 'classnames/dedupe';
import './MobilityBlock.scss';

export interface FormattedLengthProps {
	className?: string;
	value: number;
}

export const FormattedLength: React.FC<FormattedLengthProps> = ({
	className: extraClassName,
	value,
}: FormattedLengthProps) => {
	return (
		<span className={classNamesDedeupe('formatted-length', extraClassName)}>
			{ value === 0 ? (
				<>&mdash;</>
			) : (
				<>{value}&rdquo;/{value * 2.5}<span className="formatted-length'__metric-unit">CM</span></>
			)}
		</span>
	);
};
