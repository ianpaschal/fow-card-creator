import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { auth } from '../../../firebase';
import { SiteSettings } from '../../../SiteSettings';
import { Password } from 'primereact/password';
import './RegisterView.scss';
import { Page } from '../../general/Page';

export class RegisterView extends React.Component<RouteComponentProps> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	private async onSubmit(e): Promise<void> {
		const { history } = this.props;
		e.preventDefault();
		auth.createUserWithEmailAndPassword(e.target[ 0 ].value, e.target[ 1 ].value).then((_user) => {
			history.push(SiteSettings.ROUTE_BROWSE);
		}).catch((error) => {
			console.error(error);
		});
	}

	render() {
		return (
			<Page className="register-view">
				<h1>Register</h1>
				<form onSubmit={this.onSubmit}>
					<InputText placeholder="Email" />
					<Password placeholder="Password" feedback={false} />
					<Button type={'submit'}>Sign Up</Button>
				</form>
			</Page>
		);
	}
}

export const RoutedRegisterView = withRouter(RegisterView);
