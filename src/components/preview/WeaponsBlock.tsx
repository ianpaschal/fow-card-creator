import React from 'react';
import classNamesDedeupe from 'classnames/dedupe';
import './WeaponsBlock.scss';
import { WeaponAttributes } from '../../enums/WeaponAttributes';

export interface WeaponsBlockProps {
	className?: string;
	weapons: any[]
}

export const WeaponsBlock: React.FC<WeaponsBlockProps> = ({
	className: extraClassName,
	weapons,
}: WeaponsBlockProps) => {
	return (
		<div className={classNamesDedeupe('weapons-block', extraClassName)}>
			<div className="weapons-block__header">
				<h3 className="weapons-block__header-cell">
					{WeaponAttributes.NAME}
				</h3>
				<h3 className="weapons-block__header-cell">
					{WeaponAttributes.RANGE}
				</h3>
				<div className="weapons-block__header-cell">
					ROF
				</div>
				<h3 className="weapons-block__header-cell">
					{WeaponAttributes.ANTI_TANK}
				</h3>
				<h3 className="weapons-block__header-cell">
					{WeaponAttributes.FIRE_POWER}
				</h3>
				<h3 className="weapons-block__header-cell">
					{WeaponAttributes.NOTES}
				</h3>
			</div>
			<div className="weapons-block__body">
				{weapons.map((weapon, i) => (
					<React.Fragment key={i}>
						{weapon.bombardment && (
							<div className="weapons-block__row">
								<div className="weapons-block__row-cell">
									{weapon.name}
								</div>
								<div className="weapons-block__row-cell">
									<p>{weapon.bombardment.range}&rdquo;/{weapon.bombardment.range * 2.5}<span className="metric-unit">CM</span></p>
								</div>
								<div className="weapons-block__row-cell--bombardment">
									<p>{weapon.bombardment.template}</p>
								</div>
								<div className="weapons-block__row-cell">
									<p>{weapon.bombardment.antiTank}</p>
								</div>
								<div className="weapons-block__row-cell">
									<p>{weapon.bombardment.firePower}{weapon.bombardment.firePower < 6 && '+'}</p>
								</div>
								<div className="weapons-block__row-cell">
									{weapon.bombardment.notes.map((note, n) => (
										<span key={n}>{note}, </span>
									))}
								</div>
							</div>
						)}
						<div className={classNamesDedeupe(
							'weapons-block__row',
							{ 'weapons-block__row--direct-fire': weapon.bombardment },
						)}>
							<div className="weapons-block__row-cell">
								<p>{weapon.bombardment ? 'or Direct Fire' : weapon.name}</p>
							</div>
							<div className="weapons-block__row-cell">
								<p>{weapon.direct.range}&rdquo;/{weapon.direct.range * 2.5}<span className="metric-unit">CM</span></p>
							</div>
							<div className="weapons-block__row-cell--rate-of-fire">
								<p>{weapon.direct.rof.halted}</p>
								<p>{weapon.direct.rof.moving}</p>
							</div>
							<div className="weapons-block__row-cell">
								<p>{weapon.direct.antiTank}</p>
							</div>
							<div className="weapons-block__row-cell">
								<p>{weapon.direct.firePower}{weapon.direct.firePower < 6 && '+'}</p>
							</div>
							<div className="weapons-block__row-cell">
								{weapon.direct.notes.map((note, n) => (
									<span key={n}>{note}, </span>
								))}
							</div>
						</div>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};
