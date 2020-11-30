// Copyright (c) 2020 Ian Paschal

import React from 'react';
import classNamesDedeupe from 'classnames/dedupe';
import './MobilityBlock.scss';

export type DiceRollValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface FormattedDiceRollProps {
	className?: string;
	value: DiceRollValue;
}

export const FormattedDiceRoll: React.FC<FormattedDiceRollProps> = ({
	className: extraClassName,
	value,
}: FormattedDiceRollProps) => {
	return (
		<span className={classNamesDedeupe('formatted-dice-roll', extraClassName)}>
			{value + (value < 6 && '+')}
		</span>
	);
};
