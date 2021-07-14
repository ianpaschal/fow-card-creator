import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink, Route, RouteComponentProps, Switch, useHistory, withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { RootState } from '../../../store';
import { SiteSettings } from '../../../SiteSettings';
import { BrowseView } from '../../views/BrowseView/';
import { ConnectedEditView }from '../../views/EditView';
import { MyCardsView } from '../../views/MyCardsView';
import { RoutedSignInView } from '../../views/SignInView';
import { RoutedRegisterView } from '../../views/RegisterView';
import { ConnectedCardView } from '../../views/CardView';
import { Sidebar } from '../Sidebar/Sidebar';

import './App.scss';
import { RoutedSignOutView } from '../../views/SignOutView';

const connector = connect(
	(state: RootState) => ({
		currentUserID: state.auth.currentUserID,
	}),
);

export type AppProps = RouteComponentProps & ConnectedProps<typeof connector>;

export const App: React.FC<AppProps> = ({
	currentUserID,
}: AppProps) => {

	const history = useHistory();

	// TODO: Simplify duplicate logic with Page
	const [width, setWidth] = useState(window.innerWidth);

	const [sidebarOpen, setSidebarOpen] = useState(width >= 720);

	const onResize = () => {
		setWidth(window.innerWidth);

		// If not open but no longer in mobile view, force sidebar open
		if (!sidebarOpen && window.innerWidth >= 720) {
			setSidebarOpen(true);
			return;
		}

		// If open in mobile view and window is resized, close the sidebar
		if (sidebarOpen && window.innerWidth < 720) {
			setSidebarOpen(false);
			return;
		}
	};

	// Listen for window resize events
	useEffect(() => {
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	});

	const isMobile = width < 720;

	// Close sidebar when on mobile
	useEffect(() => {
		if (isMobile) {
			setSidebarOpen(false);
		}
	}, [history.location.pathname]);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className={classNames('app', !isMobile && 'app--desktop')}>
			<Sidebar isOpen={sidebarOpen} isMobile={isMobile} onToggle={toggleSidebar}>
				<h1>FoW Card Creator</h1>
				{/* TODO: This code could be looped probably... */}
				<NavLink to={SiteSettings.ROUTE_BROWSE} exact activeClassName="sidebar__active-link">Browse</NavLink>
				{currentUserID ? (
					<>
						<NavLink to={SiteSettings.ROUTE_MY_CARDS} exact activeClassName="sidebar__active-link">My Cards</NavLink>
						<NavLink to={SiteSettings.ROUTE_CREATE} exact activeClassName="sidebar__active-link">Create</NavLink>
						<NavLink to={SiteSettings.ROUTE_SIGN_OUT} exact activeClassName="sidebar__active-link">Sign Out</NavLink>
					</>
				) : (
					<>
						<NavLink to={SiteSettings.ROUTE_SIGN_IN} exact activeClassName="sidebar__active-link">Sign In</NavLink>
						<NavLink to={SiteSettings.ROUTE_REGISTER} exact activeClassName="sidebar__active-link">Register</NavLink>
					</>
				)}
			</Sidebar>
			<div className="app__main">
				<Switch>
					<Route path={SiteSettings.ROUTE_BROWSE} exact>
						<BrowseView />
					</Route>
					<Route path={SiteSettings.ROUTE_MY_CARDS} exact>
						<MyCardsView />
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
					<Route path={SiteSettings.ROUTE_SIGN_OUT} exact>
						<RoutedSignOutView />
					</Route>
					<Route path={SiteSettings.ROUTE_REGISTER} exact>
						<RoutedRegisterView />
					</Route>
				</Switch>
			</div>
		</div>
	);
};

export const RoutedApp = withRouter(App);
export const ConnectedApp = connector(RoutedApp);
