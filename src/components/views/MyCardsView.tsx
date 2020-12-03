// Copyright (c) 2020 Ian Paschal

import React from 'react';

export interface MyCardsViewProps {
	className?: string;
	cards: any[]
}

export interface MyCardsViewState {
	view: 'editor' | 'split' | 'preview';
}

export class MyCardsView extends React.Component<MyCardsViewProps, MyCardsViewState> {
	constructor(props: MyCardsViewProps) {
		super(props);
		this.state = {
			view: 'split',
		};
	}
	render() {
		const { cards } = this.props;
		const {} = this.state;
		return (
			<div>
				{cards.map((card, i) => (
					<div key={i} style={{ padding: '24px', borderBottom: '1px solid black' }}>
						<pre>
							{JSON.stringify(card, null, 2)}
						</pre>
					</div>
				))}
			</div>
		);
	}
}
