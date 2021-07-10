import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

import { auth } from '../../../firebase';

export class AccountMenu extends React.Component<RouteComponentProps> {
	menuRef: React.RefObject<Menu> = React.createRef();

	constructor(props) {
		super(props);
		this.signOut = this.signOut.bind(this);
	}

	signOut() {
		const { history } = this.props;
		auth.signOut().then(() => {
			history.push('/');
		}).catch((error) => {
			console.warn(error);
		});
	}

	render() {
		const { history } = this.props;
		const items = [
			...(!auth.currentUser ? [
				{
					label: 'Sign In',
					icon: 'pi pi-fw pi-cog',
					command: () => history.push('/signin'),
				},
				{
					label: 'Register',
					icon: 'pi pi-fw pi-cog',
					command: () => history.push('/register'),
				},
			] : [{ label: 'Sign Out', icon: 'pi pi-fw pi-power-off', command: this.signOut }]),
		];
		return (
			<>
				<Menu model={items} popup ref={this.menuRef} />
				<Button icon="pi pi-user" onClick={(event) => this.menuRef.current.toggle(event)} />
			</>
		);
	}
}

export const RoutedAccountMenu = withRouter(AccountMenu);
