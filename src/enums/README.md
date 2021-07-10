# Enums

This project uses a slightly unconventional enum pattern.
Instead of the conventional "singular" enum naming, enums are plural and provide a mapping between either an attribute (JSON key) or data value, and a human-readable (i.e. formatted and capitalized) string version of that field name or data.

For example, consider this (simplified) piece of unit card JSON, which includes both an field name and a value:

```json
{
    "weapon": {
        "bombardment": {
            "template": "SALVO",
            "firePower": 3
        }
    }
}
```

In this example, `template` and `firePower` are field names which `WeaponFields.tsx` allows us to map to the strings `"Template"` and `"Fire-Power"`.
`"SALVO"` on the other hand is data, and `ArtilleryTemplateTypes.tsx` allows us to map it to the string `"Salvo"` in the UI.

To my mind, this the added value of an enum over simply using an array of strings for the field names, or a very long union type (`|`).
This also avoids the common, but somewhat verbose pattern of:

```ts
export enum EraDataValues {
	earlyWar = 'EW',
	midWar = 'MW',
	lateWar = 'LW',
}

export enum EraPrettyValues {
	earlyWar = 'Early War',
	midWar = 'Mid-War',
	lateWar = 'Late War',
}
```

For typing purposes, an additional export is included with the pattern:

```ts
export enum Eras {
	EW = 'Early War',
	MW = 'Mid-War',
	LW = 'Late War',
}

export type Era = keyof typeof Eras;
```

When assigning an era to a unit card, the `Era` type can be used as a short-hand for `'EW' | 'MW' | 'LW'`. These strings can also be easily mapped back to 'Mid-War' (or whichever) when the unit card is read back.

Besides the normal enum exports (see above), an addition export is sometimes included which reduces the need to call `Object.keys()` within UI rendering code.
This export follows the pattern:

```ts
export const EraKeys = Object.keys(Eras);
```
