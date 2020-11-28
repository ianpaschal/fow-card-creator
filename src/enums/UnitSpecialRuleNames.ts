export enum UnitSpecialRuleNames {
	TIME_ON_TARGET = 'Time on Target',
	RANGERS_LEAD_THE_WAY = 'Rangers Lead the Way',
	SEEK_STRIKE_AND_DESTROY = 'Seek, Strike, and Destroy',
	STORMTROOPERS = 'Stormtroopers',
	BAZOOKA_SKIRTS = 'Bazooka Skirts',
	GUN_SHIELD = 'Gun Shield',
	LARGE_GUN = 'Large Gun',
	GIANTIC = 'Gigantic',
	SCOUT = 'Scout',
	SPEARHEAD = 'Spearhead',
	OBSERVER = 'Observer',
	INDEPENDENT = 'Independent',
}

export type UnitSpecialRuleName = keyof typeof UnitSpecialRuleNames;
