import React from 'react';
import Firebase from 'firebase';
import { Link, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { ConnectedEditView }from './views/EditView';
import { MyCardsView } from './views/MyCardsView';
import { Unit } from '../typing/Unit';
import './App.scss';

interface OwnProps {
	db: Firebase.firestore.Firestore;
}

interface AppState {
	cards: any[];
}

export type AppProps = OwnProps & RouteComponentProps;

class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			cards: [],
		};
		this._loadAllCards = this._loadAllCards.bind(this);
		this._saveCard = this._saveCard.bind(this);
	}

	private async _loadAllCards(): Promise<void> {
		const { db } = this.props;
		const docs = await db.collection('cards').get();
		const cards = [];
		docs.forEach((doc) => {
		  cards.push({
				...(doc.data()),
				id: doc.id,
		  });
		});
		this.setState({ cards });
	}

	private async _saveCard(unit: Unit): Promise<void> {
		const { db, history } = this.props;
		// const newListConfig: Omit<ListConfig, 'id'> = {
		//   userId,
		//   name: `Untitled ${factionsDB.getFactionById(factionId).name} List`,
		//   factionId: factionId,
		//   formationConfigs: [],
		// };

		console.log(unit);

		const docRef = await db.collection('cards').add(unit);

		// await this._loadAllConfigs();
		console.log(docRef.id);
		history.push('/');
	  }

	componentDidMount() {
		this._loadAllCards();
	}

	render() {
		const { cards } = this.state;
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
							<div className="app__page">
								<MyCardsView cards={cards} />
							</div>
						</Route>
						<Route path="/help" exact>
							<div className="app__page">
								Help
							</div>
						</Route>
						<Route path="/edit">
							<div className="app__page">
								<ConnectedEditView onSave={this._saveCard}/>
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

export default withRouter(App);
