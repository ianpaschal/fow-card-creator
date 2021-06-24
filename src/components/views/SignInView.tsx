import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { auth } from '../../firebase';
import { Password } from 'primereact/password';
import './SignInView.scss';

export interface SignInViewProps extends RouteComponentProps {
	className?: string;
}

export class SignInView extends React.Component<SignInViewProps, {}> {
	constructor(props: SignInViewProps) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	private async onSubmit(e): Promise<void> {
		const { history } = this.props;
		e.preventDefault();
		auth.signInWithEmailAndPassword(e.target[ 0 ].value, e.target[ 1 ].value).then((_user) => {
			history.push('/mycards');
		}).catch((error) => {
			console.error(error);
		});
	}

	render() {
		return (
			<div className="sign-in-view">
				<h1>Sign In</h1>
				<form onSubmit={this.onSubmit}>
					<InputText placeholder="email" />
					<Password feedback={false}/>

					<Button type={'submit'}>Sign In</Button>
				</form>
			</div>
		);
	}
}

export const RoutedSignInView = withRouter(SignInView);
