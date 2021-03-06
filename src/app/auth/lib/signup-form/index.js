import React, { Component, PropTypes } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineForms } from 'react-redux-form';
import LoginForm from './signup-form';

const modelName = 'signupForm';

const propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default class LoginFormRoot extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    const reducer = combineForms({
      [modelName]: {
        userName: '',
        email: '',
        phone: '',
        password: '',
        confirmedPassword: ''
      }
    });
    this.store = createStore(reducer);
  }

  render() {
    const { onSubmit } = this.props;

    return (
      <Provider store={this.store}>
        <LoginForm modelName={modelName} onSubmit={onSubmit} />
      </Provider>
    );
  }
}
