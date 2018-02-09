import React from 'react';
import { Redirect } from 'react-router-dom';

/* Una función de autenticación falsa */
export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
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

