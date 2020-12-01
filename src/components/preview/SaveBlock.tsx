import React from 'react';
import classNamesDedeupe from 'classnames/dedupe';
import './SaveBlock.scss';
import { SaveRating } from '../../typing/SaveRating';
import { UnitTypes } from '../../enums/UnitTypes';

export interface SaveBlockProps {
	className?: string;
	save: SaveRating;
}

export const SaveBlock: React.FC<SaveBlockProps> = ({
	className: extraClassName,
	save,
}: SaveBlockProps) => {
	return (
		<div className={classNamesDedeupe('save-block', extraClassName)}>
			<h4 className="save-block__header">Save</h4>
			<div className="save-block__content">
				<div className="save-block__rating">
					<div className="save-block__rating-label">
						{save.type === 'UNARMOURED_TANK' ? UnitTypes.TANK : UnitTypes[ save.type ]}
					</div>
					<div className="save-block__rating-number">
						{save.value}
					</div>
				</div>
			</div>
		</div>
	);
};
