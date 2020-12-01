import React from 'react';
import Firebase from 'firebase';
import { ConnectedCardEditor }from './CardEditor';
import { ConnectedCardPreview }from './CardPreview';
import './App.scss';
import { Link, Route, Switch } from 'react-router-dom';

interface AppProps {
  db: Firebase.firestore.Firestore;
}

class App extends React.Component<AppProps> {
	constructor(props: AppProps) {
		super(props);
		this._loadAllConfigs = this._loadAllConfigs.bind(this);
	}

	private async _loadAllConfigs(): Promise<void> {
		const { db } = this.props;

		const docs = await db.collection('cards').get();
		const cards = [];
		docs.forEach((doc) => {
		  cards.push({
				...(doc.data()),
				id: doc.id,
		  });
		});
		console.log(cards);

		// this.setState({ allListConfigs: loadedListConfigs });
	}
	componentDidMount() {
		this._loadAllConfigs();
	}
	render() {
		return (
			<div className="app">
				<div className="app__header">
					<h1>FoW Card Creator</h1>
					{/* <Link to="/">Browse</Link> */}
					<Link to="/">My Cards</Link>
					<Link to="/edit">Create</Link>
					<Link to="/help">Help</Link>
					<Link to="/sign-in">Sign In</Link>
				</div>
				<div className="app__main">
					<Switch>
						<Route path="/" exact>
							<div>
								My Cards
							</div>
						</Route>
						<Route path="/help" exact>
							<div>
								Help
							</div>
						</Route>
						<Route path="/edit">
							<div className="app__edit-pane">
								<ConnectedCardEditor />
							</div>
							<div className="app__preview-pane">
								<ConnectedCardPreview />
							</div>
						</Route>
						{/* <Route path="/">
							<div>
								Browse
							</div>
						</Route> */}
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
