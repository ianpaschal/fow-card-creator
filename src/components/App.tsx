import React from 'react';
import { ConnectedCardEditor }from './CardEditor';
import { ConnectedCardPreview }from './CardPreview';
import './App.scss';

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<div className="app__header">
					FoW Card Creator
				</div>
				<div className="app__main">
					<div className="app__edit-pane">
						<ConnectedCardEditor />
					</div>
					<div className="app__preview-pane">
						<ConnectedCardPreview />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
