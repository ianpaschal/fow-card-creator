// Copyright (c) 2020 Ian Paschal

import React from 'react';
import classNamesDedeupe from 'classnames/dedupe';
import { DiceRollValue } from '../../typing/DiceRollValue';
import './MobilityBlock.scss';

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
