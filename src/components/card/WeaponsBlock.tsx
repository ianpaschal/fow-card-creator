import jsPDF from 'jspdf';
import React from 'react';
import { connect } from 'react-redux';
import { CardSettings } from '../../CardSettings';
import { FontNames } from '../../enums/FontNames';
import { RootState, store } from '../../store';
import { Weapon } from '../../typing/Weapon';
import { pt } from '../../utils/convertDistance';
import { formatDiceRoll } from '../../utils/formatDiceRoll';
import { formatDistance } from '../../utils/formatDistance';
import { ColumnDefinition, TablePDF, TableProps, TableSVG } from './generic/Table';

// Generic
const mapStateToProps = (state: RootState) => ({
	accentColor: state.editor.unitCard.unit.accentColor,
	weapons: state.editor.unitCard.unit.weapons,
	width: state.editor.unitCard.layout.weaponsBlock.width,
	x: state.editor.unitCard.layout.weaponsBlock.x,
	y: state.editor.unitCard.layout.weaponsBlock.y,
});

export type WeaponsBlockProps = ReturnType<typeof mapStateToProps>;

export class WeaponsBlockLayout {
	static headerHeight: number = pt(4.1, 'mm');
	static rowHeight: number = pt(4.3, 'mm');

	constructor(readonly props: WeaponsBlockProps) {}

	get tableColumns(): ColumnDefinition[] {
		return [
			{
				widthFactor: 0.25,
				header: (x, y, width) => ([
					{
						x: x + 3,
						y,
						width: width - 4,
						height: WeaponsBlockLayout.headerHeight,
						text: 'WEAPON',
						fontSize: 4.5,
						font: FontNames.OPEN_SANS_BOLD,
						color: CardSettings.COLOR_WHITE,
						align: 'left',
						maxLines: 1,
					},
				]),
				cell: (x, y, width, record) => ([
					{
						x: x + 3,
						y,
						width: width - 4,
						height: WeaponsBlockLayout.rowHeight,
						text: record.name,
						fontSize: 6.3,
						font: FontNames.OPEN_SANS_SEMI_BOLD,
						color: CardSettings.COLOR_BLACK,
						align: 'left',
						maxLines: 2,
						letterSpacing: -0.25,
					},
				]),
			},
			{
				widthFactor: 0.15,
				header: (x, y, width) => ([{ x, y, width, height: WeaponsBlockLayout.headerHeight, text: 'RANGE', fontSize: 4.5, font: FontNames.OPEN_SANS_BOLD, color: CardSettings.COLOR_WHITE, align: 'center' }]),
				cell: (x, y, width, record) => ([
					{
						x,
						y,
						width,
						height: WeaponsBlockLayout.rowHeight,
						text: formatDistance(record.range),
						fontSize: 6.75,
						font: FontNames.OPEN_SANS_SEMI_BOLD,
						color: CardSettings.COLOR_BLACK,
						align: 'center',
					},
				]),
			},
			{
				widthFactor: 0.16,
				header: (x, y, width) => ([
					{ x, y, width, height: WeaponsBlockLayout.headerHeight / 2, text: 'ROF', fontSize: 4.5, font: FontNames.OPEN_SANS_BOLD, color: CardSettings.COLOR_WHITE, align: 'center' },
					{ x, y: y + WeaponsBlockLayout.headerHeight / 2, width: width / 2, height: WeaponsBlockLayout.headerHeight / 2, text: 'HALTED', fontSize: 4.5, font: FontNames.OPEN_SANS_BOLD, color: CardSettings.COLOR_WHITE, align: 'center' },
					{ x: x + width / 2, y: y + WeaponsBlockLayout.headerHeight / 2, width: width / 2, height: WeaponsBlockLayout.headerHeight / 2, text: 'MOVING', fontSize: 4.5, font: FontNames.OPEN_SANS_BOLD, color: CardSettings.COLOR_WHITE, align: 'center' },
				]),
				cell: (x, y, width, record) => {
					return record.template ? [
						{
							x,
							y,
							width,
							height: WeaponsBlockLayout.rowHeight,
							text: record.template.toUpperCase(),
							fontSize: 6.75,
							font: FontNames.OPEN_SANS_SEMI_BOLD,
							color: CardSettings.COLOR_BLACK,
							align: 'center',
						},
						{
							x: x - (CardSettings.STROKE_WIDTH / 2),
							y: y + WeaponsBlockLayout.rowHeight - CardSettings.STROKE_WIDTH,
							width: width + CardSettings.STROKE_WIDTH,
							height: CardSettings.STROKE_WIDTH,
							fill: this.props.accentColor,
						},
					] : [
						{
							x,
							y,
							width: (width - CardSettings.STROKE_WIDTH) / 2,
							height: WeaponsBlockLayout.rowHeight,
							text: record.rof.halted.toString(),
							fontSize: 6.75,
							font: FontNames.OPEN_SANS_SEMI_BOLD,
							color: CardSettings.COLOR_BLACK,
							align: 'center',
						},
						{
							x: x + ((width - CardSettings.STROKE_WIDTH) / 2),
							y: y - (CardSettings.STROKE_WIDTH / 2),
							width: CardSettings.STROKE_WIDTH,
							height: WeaponsBlockLayout.rowHeight + CardSettings.STROKE_WIDTH,
							fill: this.props.accentColor,
						},
						{
							x: x + ((width - CardSettings.STROKE_WIDTH) / 2) + CardSettings.STROKE_WIDTH,
							y,
							width: (width - CardSettings.STROKE_WIDTH) / 2,
							height: WeaponsBlockLayout.rowHeight,
							text: record.rof.moving.toString(),
							fontSize: 6.75,
							font: FontNames.OPEN_SANS_SEMI_BOLD,
							color: CardSettings.COLOR_BLACK,
							align: 'center',
						},
					];
				},
			},
			{
				widthFactor: 0.07,
				header: (x, y, width) => ([{ x, y, width, height: WeaponsBlockLayout.headerHeight, text: 'ANTI- TANK', fontSize: 4.5, font: FontNames.OPEN_SANS_BOLD, color: CardSettings.COLOR_WHITE, align: 'center' }]),
				cell: (x, y, width, record) => ([
					{
						x,
						y,
						width,
						height: WeaponsBlockLayout.rowHeight,
						text: record.antiTank.toString(),
						fontSize: 6.75,
						font: FontNames.OPEN_SANS_SEMI_BOLD,
						color: CardSettings.COLOR_BLACK,
						align: 'center',
					},
				]),
			},
			{
				widthFactor: 0.07,
				header: (x, y, width) => ([{ x, y, width, height: WeaponsBlockLayout.headerHeight, text: 'FIRE- POWER', fontSize: 4.5, font: FontNames.OPEN_SANS_BOLD, color: CardSettings.COLOR_WHITE, align: 'center' }]),
				cell: (x, y, width, record) => ([
					{
						x,
						y,
						width,
						height: WeaponsBlockLayout.rowHeight,
						text: formatDiceRoll(record.firePower, true),
						fontSize: 6.75,
						font: FontNames.OPEN_SANS_SEMI_BOLD,
						color: CardSettings.COLOR_BLACK,
						align: 'center',
					},
				]),
			},
			{
				widthFactor: 0.3,
				header: (x, y, width) => ([{ x, y, width, height: WeaponsBlockLayout.headerHeight, text: 'NOTES', fontSize: 4.5, font: FontNames.OPEN_SANS_BOLD, color: CardSettings.COLOR_WHITE, align: 'center' }]),
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				cell: (x, y, width) => ([]),
			},
		];
	}

	get tableData(): any {
		const data = [];
		// eslint-disable-next-line complexity
		this.props.weapons.forEach((weapon: Weapon) => {
			const name = weapon.name.length > 0 ? weapon.name : 'No-Name';
			if (weapon.bombardment) {
				data.push({
					name,
					...weapon.bombardment,
					rof: weapon.bombardment.template,
				});
			}
			if (weapon.direct) {
				data.push({
					name: weapon.bombardment ? 'or Direct Fire' : name,
					...weapon.direct,
				});
			}
			if (weapon.secondary) {
				data.push({
					...weapon.secondary,
					name: `or firing ${weapon.secondary?.name.length > 0 ? weapon.secondary.name : 'No-Name'}`,
				});
			}
		});
		return data;
	}

	get tableProps(): TableProps {
		return {
			columns: this.tableColumns,
			data: this.tableData,
			radius: CardSettings.CORNER_RADIUS,
			stroke: this.props.accentColor,
			width: this.props.width,
			x: this.props.x,
			y: this.props.y,
			headerHeight: WeaponsBlockLayout.headerHeight,
			rowHeight: WeaponsBlockLayout.rowHeight,
		};
	}
}

// React
export const WeaponsBlockSVG: React.FC<WeaponsBlockProps> = (props: WeaponsBlockProps) => {
	if (props.weapons.length < 1) {
		return null;
	}
	const layout = new WeaponsBlockLayout(props);
	return <TableSVG {...layout.tableProps} />;
};

export const ConnectedWeaponsBlockSVG = connect(mapStateToProps, null)(WeaponsBlockSVG);

// jsPDF
export const WeaponsBlockPDF = (doc: jsPDF, props: WeaponsBlockProps) => {
	if (props.weapons.length < 1) {
		return;
	}
	const layout = new WeaponsBlockLayout(props);
	TablePDF(doc, layout.tableProps);
};

export const ConnectedWeaponsBlockPDF = (doc: jsPDF) => WeaponsBlockPDF(doc, mapStateToProps(store.getState()));
