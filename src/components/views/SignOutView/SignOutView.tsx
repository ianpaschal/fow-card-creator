import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { auth } from '../../../firebase';
import { SiteSettings } from '../../../SiteSettings';

export const SignOutView: React.FC = () => {
	useEffect(() => {
		auth.signOut();
	});
	return (
		<Redirect to={SiteSettings.ROUTE_BROWSE} />
	);
};

export const RoutedSignOutView = withRouter(SignOutView);
