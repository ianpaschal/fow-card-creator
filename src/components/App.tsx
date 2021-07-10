import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';

import { RootState } from '../store';
import { SiteSettings } from '../SiteSettings';

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
			<Link to={SiteSettings.ROUTE_BROWSE}>Browse</Link>
			{currentUserID && (
				<>
					<Link to={SiteSettings.ROUTE_MY_CARDS}>My Cards</Link>
					<Link to={SiteSettings.ROUTE_CREATE}>Create</Link>
				</>
			)}
			<RoutedAccountMenu/>
		</div>
		<div className="app__main">
			<div className="app__page">
				<Switch>
					<Route path={SiteSettings.ROUTE_BROWSE} exact>
						<BrowseView />
					</Route>
					<Route path={SiteSettings.ROUTE_MY_CARDS} exact>
						<ConnectedMyCardsView />
					</Route>
					<Route path={SiteSettings.ROUTE_EDIT} exact>
						<ConnectedEditView />
					</Route>
					<Route path={SiteSettings.ROUTE_CREATE} exact>
						<ConnectedEditView />
					</Route>
					<Route path={SiteSettings.ROUTE_CARD} exact>
						<ConnectedCardView />
					</Route>
					<Route path={SiteSettings.ROUTE_SIGN_IN} exact>
						<RoutedSignInView />
					</Route>
					<Route path={SiteSettings.ROUTE_REGISTER} exact>
						<RoutedSignUpView />
					</Route>
				</Switch>
			</div>
		</div>
	</div>
);

export const RoutedApp = withRouter(App);
export const ConnectedApp = connector(RoutedApp);
