import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { auth } from '../../../firebase';

export class RegisterView extends React.Component<RouteComponentProps> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	private async onSubmit(e): Promise<void> {
		const { history } = this.props;
		e.preventDefault();
		auth.createUserWithEmailAndPassword(e.target[ 0 ].value, e.target[ 1 ].value).then((_user) => {
			history.push('/');
		}).catch((error) => {
			console.error(error);
		});
	}

	render() {
		return (
			<div>
				<h1>Sign Up</h1>
				<form onSubmit={this.onSubmit}>
					<InputText placeholder="email" />
					<InputText placeholder="password" />
					<Button type={'submit'}>Sign Up</Button>
				</form>
			</div>
		);
	}
}

export const RoutedRegisterView = withRouter(RegisterView);
