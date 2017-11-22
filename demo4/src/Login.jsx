// @flow
import React from 'react';
import { type ContextRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

type State = {
  redirectToReferrer: boolean,
};

type Props = ContextRouter

/* Una función de autenticación falsa */
export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb: () => void) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
};

export default class Login extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      redirectToReferrer: false,
    };
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div>
        <p>Tienes que estar logueado para ver la pagina {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

