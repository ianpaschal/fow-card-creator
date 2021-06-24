import jsPDF from 'jspdf';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { MobilityAttribute, MobilityAttributeKeys, MobilityAttributes } from '../../enums/Mobility';
import { Settings } from '../../Settings';
import { RootState } from '../../store';
import { Weapon } from '../../typing/Weapon';
import { pt } from '../../utils/convertDistance';
import { formatDiceRoll } from '../../utils/formatDiceRoll';
import { formatDistance } from '../../utils/formatDistance';
import { ColumnDefinition, TableProps, TableSVG } from './generic/Table';

// 0.25, 0.14, 0.17, 0.07, 0.07, 0.30

export class WeaponsBlockLayout {
	// Passed
	weapons: Weapon[];
	accentColor: string;
	x: number;
	y: number;
	width: number;

	// Static:
	headerHeight: number = pt(4.1, 'mm');
	rowHeight: number = pt(4.3, 'mm');

	constructor(props: WeaponsBlockProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get tableColumns(): ColumnDefinition[] {
		return [
			{
				widthFactor: 0.25,
				header: (x, y, width) => ([
					{
						x: x + 3,
						y,
						width: width - 4,
						height: this.headerHeight,
						text: 'WEAPON',
						fontSize: 4.5,
						font: 'OpenSans-Bold',
						color: '#FFFFFF',
						align: 'left',
						maxLines: 1,
					},
				]),
				cell: (x, y, width, record) => ([
					{
						x: x + 3,
						y,
						width: width - 4,
						height: this.rowHeight,
						text: record.name,
						fontSize: 6.3,
						font: 'OpenSans-SemiBold',
						color: '#000000',
						align: 'left',
						maxLines: 2,
						letterSpacing: -0.25,
					},
				]),
			},
			{
				widthFactor: 0.15,
				header: (x, y, width) => ([{ x, y, width, height: this.headerHeight, text: 'RANGE', fontSize: 4.5, font: 'OpenSans-Bold', color: '#FFFFFF', align: 'center' }]),
				cell: (x, y, width, record) => ([
					{
						x,
						y,
						width,
						height: this.rowHeight,
						text: formatDistance(record.range),
						fontSize: 6.75,
						font: 'OpenSans-SemiBold',
						color: '#000000',
						align: 'center',
					},
				]),
			},
			{
				widthFactor: 0.16,
				header: (x, y, width) => ([
					{ x, y, width, height: this.headerHeight / 2, text: 'ROF', fontSize: 4.5, font: 'OpenSans-Bold', color: '#FFFFFF', align: 'center' },
					{ x, y: y + this.headerHeight / 2, width: width / 2, height: this.headerHeight / 2, text: 'HALTED', fontSize: 4.5, font: 'OpenSans-Bold', color: '#FFFFFF', align: 'center' },
					{ x: x + width / 2, y: y + this.headerHeight / 2, width: width / 2, height: this.headerHeight / 2, text: 'MOVING', fontSize: 4.5, font: 'OpenSans-Bold', color: '#FFFFFF', align: 'center' },
				]),
				cell: (x, y, width, record) => {
					return record.template ? [
						{
							x,
							y,
							width,
							height: this.rowHeight,
							text: record.template.toUpperCase(),
							fontSize: 6.75,
							font: 'OpenSans-SemiBold',
							color: '#000000',
							align: 'center',
						},
						{
							x: x - (Settings.STROKE_WIDTH / 2),
							y: y + this.rowHeight - Settings.STROKE_WIDTH,
							width: width + Settings.STROKE_WIDTH,
							height: Settings.STROKE_WIDTH,
							fill: this.accentColor,
						},
					] : [
						{
							x,
							y,
							width: (width - Settings.STROKE_WIDTH) / 2,
							height: this.rowHeight,
							text: record.rof.halted.toString(),
							fontSize: 6.75,
							font: 'OpenSans-SemiBold',
							color: '#000000',
							align: 'center',
						},
						{
							x: x + ((width - Settings.STROKE_WIDTH) / 2),
							y: y - (Settings.STROKE_WIDTH / 2),
							width: Settings.STROKE_WIDTH,
							height: this.rowHeight + Settings.STROKE_WIDTH,
							fill: this.accentColor,
						},
						{
							x: x + ((width - Settings.STROKE_WIDTH) / 2) + Settings.STROKE_WIDTH,
							y,
							width: (width - Settings.STROKE_WIDTH) / 2,
							height: this.rowHeight,
							text: record.rof.moving.toString(),
							fontSize: 6.75,
							font: 'OpenSans-SemiBold',
							color: '#000000',
							align: 'center',
						},
					];
				},
			},
			{
				widthFactor: 0.07,
				header: (x, y, width) => ([{ x, y, width, height: this.headerHeight, text: 'ANTI- TANK', fontSize: 4.5, font: 'OpenSans-Bold', color: '#FFFFFF', align: 'center' }]),
				cell: (x, y, width, record) => ([
					{
						x,
						y,
						width,
						height: this.rowHeight,
						text: record.antiTank.toString(),
						fontSize: 6.75,
						font: 'OpenSans-SemiBold',
						color: '#000000',
						align: 'center',
					},
				]),
			},
			{
				widthFactor: 0.07,
				header: (x, y, width) => ([{ x, y, width, height: this.headerHeight, text: 'FIRE- POWER', fontSize: 4.5, font: 'OpenSans-Bold', color: '#FFFFFF', align: 'center' }]),
				cell: (x, y, width, record) => ([
					{
						x,
						y,
						width,
						height: this.rowHeight,
						text: formatDiceRoll(record.firePower, true),
						fontSize: 6.75,
						font: 'OpenSans-SemiBold',
						color: '#000000',
						align: 'center',
					},
				]),
			},
			{
				widthFactor: 0.3,
				header: (x, y, width) => ([{ x, y, width, height: this.headerHeight, text: 'NOTES', fontSize: 4.5, font: 'OpenSans-Bold', color: '#FFFFFF', align: 'center' }]),
				cell: (x, y, width) => ([]),
			},
		];
	}

	get tableData(): any {
		const data = [];
		this.weapons.forEach((weapon) => {
			if (weapon.bombardment) {
				data.push({
					name: weapon.name.length > 0 ? weapon.name : 'No-Name',
					...weapon.bombardment,
					rof: weapon.bombardment.template,

				});
				data.push({
					name: 'Or Direct Fire',
					...weapon.direct,
				});
			} else {
				data.push({
					name: weapon.name.length > 0 ? weapon.name : 'No-Name',
					...weapon.direct,
					optional: false,
				});
			}
		});
		return data;
	}

	get tableProps(): TableProps {
		return {
			columns: this.tableColumns,
			data: this.tableData,
			radius: Settings.CORNER_RADIUS,
			stroke: this.accentColor,
			width: this.width,
			x: this.x,
			y: this.y,
			headerHeight: this.headerHeight,
			rowHeight: this.rowHeight,
		};
	}
}

// export const WeaponsBlockPDF = (doc: jsPDF, unit: Unit, props: WeaponsBlockProps) => {
// 	const layout = new WeaponsBlockLayout(props);
// 	LabeledRectangle.PDF(doc, layout.frameProps);
// 	MobilityAttributeKeys.forEach((key: MobilityAttribute, i: number) => {
// 		TextPDF(doc, {
// 			...layout.getMobilityLabelProps(i),
// 			text: MobilityAttributes[ key ].toUpperCase(),
// 		});
// 		TextPDF(doc, {
// 			...layout.getMobilityValueProps(i),
// 			text: key === 'cross' ? formatDiceRoll(unit.mobility[ key ], true) : formatDistance(unit.mobility[ key ]),
// 		});
// 		if (i > 0) {
// 			doc.setFillColor(unit.accentColor).rect(
// 				layout.getMobilityValueProps(i).x - Settings.STROKE_WIDTH,
// 				layout.getMobilityValueProps(i).y,
// 				Settings.STROKE_WIDTH,
// 				layout.innerArea.h,
// 				'F',
// 			);
// 		}
// 	});
// };

const connector = connect((state: RootState) => ({
	accentColor: state.editor.unitCard.unit.accentColor,
	weapons: state.editor.unitCard.unit.weapons,
	x: state.editor.unitCard.layout.weaponsBlock.x,
	y: state.editor.unitCard.layout.weaponsBlock.y,
	width: state.editor.unitCard.layout.weaponsBlock.width,
}), null);

export type WeaponsBlockProps = ConnectedProps<typeof connector>;

export const WeaponsBlockSVG: React.FC<WeaponsBlockProps> = (props: WeaponsBlockProps) => {
	if (props.weapons.length < 1) {
		return null;
	}
	const layout = new WeaponsBlockLayout(props);
	return (
		<TableSVG {...layout.tableProps} />
	);
};

export const ConnectedWeaponsBlockSVG = connector(WeaponsBlockSVG);
