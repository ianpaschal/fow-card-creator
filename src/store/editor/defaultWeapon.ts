export const defaultWeapon = {
	name: undefined,
	direct: {
		range: 16,
		rof: {
			halted: 1,
			moving: 1,
		},
		antiTank: 1,
		firePower: 6,
		notes: [],
	},
};

export const defaultBombardemtn = {
	range: 72,
	template: 'artillery',
	antiTank: 3,
	firePower: 2,
	notes: [
		'Forward Firing',
		'Smoke Bombardment',
	],
};
