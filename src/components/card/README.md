# Card Components

Card Components use an abstract layout class to create prop objects which can be passed to both jsPDF render functions (for PDF) and React functional components (for SVG).
This almost completely removes the need to write/modify components twice (once for PDF, once for SVG), except at the lowest levels where the compnents interact with the jsPDF and SVG APIs.
These components can be found in the `./generic` folder.

```tsx
// Foo.tsx

export interface FooProps { /* ... */ }

// Calculates all data required to render the component
export class FooLayout { /* ... */ }

// Renders the Foo component within a provided jsPDF document
export const FooPDF = (doc: jsPDF, props: FooProps) => {
	const layout = new FooLayout(props);
	BarPDF(doc, layout.barProps);
	QuxPDF(doc, layout.quxProps);
};

export const FooSVG: React.FC<FooProps> = (props: FooProps) => {
	const layout = new FooLayout(props);
	return (
		<>
			<BarSVG {...layout.barProps} />
			<QuxSVG {...layout.quxProps} />
		</>
	);
};
```

For example, the FooProps & FooLayout might look like:

```tsx
export interface FooProps {
	y: number;
}

export class FooLayout {

	// Static props which never change:
	static width: number = 42;
	static radius: number = Settings.CORNER_RADIUS;

	// Dynamic props to be assigned values by constructor:
	y: number;

	constructor(props: FooProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	// No logic should be done in the render functions!
	// All child-component props should be calculated below!

	// Required props for the BarLayout/BarPDF/BarSVG:
	get barProps(): BarProps {
		return {
			...FooLayout,
			...this,
			height: 12,
		};
	}

	// Required props for the QuxLayout/QuxPDF/QuxSVG:
	get quxProps(): QuxProps {
		return {
			...FooLayout,
			...this,
			y: this.barProps.height + 2,
			height: 24, // A computed prop used only here
		};
	}
}
```
