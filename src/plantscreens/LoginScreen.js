import React, { Component } from 'react';
import AuthForm from '../ui/AuthForm';
import Reset from '../screens/Reset.js'
import { login, signup, reset, subscribeToAuthChanges } from '../api/PlantsApi';


class LoginScreen extends Component {

  state = {
    authMode: 'login'
  }

  componentDidMount() {
    subscribeToAuthChanges(this.onAuthStateChanged)
  }

  onAuthStateChanged = (user) => {
    if (user !== null) {
      this.props.navigation.navigate('HomeApp');
    }
  }

  switchAuthMode = () => {
    this.setState(prevState => ({
      authMode: prevState.authMode === 'login' ? 'signup' : 'login',
    }));
  }

  render() {
    return (
      <AuthForm
        login={login}
        signup={signup}
        reset={reset}
        authMode={this.state.authMode}
        switchAuthMode={this.switchAuthMode}
      />

    );
  }
}


export default LoginScreen;
