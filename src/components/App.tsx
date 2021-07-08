import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';

import { RootState } from '../store';

import { RoutedAccountMenu } from './AccountMenu';
import { BrowseView } from './views/BrowseView';
import { ConnectedEditView }from './views/EditView';
import { ConnectedMyCardsView } from './views/MyCardsView';
import { RoutedSignInView } from './views/SignInView';
import { RoutedSignUpView } from './views/SignUpView';
import { ConnectedCardView } from './views/CardView';

import './App.scss';

const connector = connect(
	(state: RootState) => ({
		currentUserID: state.auth.currentUserID,
	}),
);

export type AppProps = RouteComponentProps & ConnectedProps<typeof connector>;

export const App: React.FC<AppProps> = ({
	currentUserID,
}: AppProps) => (
	<div className="app">
		<div className="app__header">
			<h1>FoW Card Creator</h1>
			<Link to="/">Browse</Link>
			{currentUserID && (
				<>
					<Link to="/mycards">My Cards</Link>
					<Link to="/create">Create</Link>
				</>
			)}
			<RoutedAccountMenu/>
		</div>
		<div className="app__main">
			<div className="app__page">
				<Switch>
					<Route path="/" exact>
						<BrowseView />
					</Route>
					<Route path="/mycards" exact>
						<ConnectedMyCardsView />
					</Route>
					<Route exact path="/edit/:id">
						<ConnectedEditView />
					</Route>
					<Route path="/create">
						<ConnectedEditView />
					</Route>
					<Route exact path="/card/:id">
						<ConnectedCardView />
					</Route>
					<Route path="/signin" exact>
						<RoutedSignInView />
					</Route>
					<Route path="/register" exact>
						<RoutedSignUpView />
					</Route>
				</Switch>
			</div>
		</div>
	</div>
);

export const RoutedApp = withRouter(App);
export const ConnectedApp = connector(RoutedApp);
