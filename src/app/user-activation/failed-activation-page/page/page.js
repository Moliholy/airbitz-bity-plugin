import React, { Component, PropTypes } from 'react';
import { LocalForm, Control } from 'react-redux-form';
import Page from '../../../lib/page';
import { Card, CardHeader, CardBody } from '../../../lib/card';
import * as failReasons from '../../fail-reasons';

import styles from './styles.less';

const propTypes = {
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
  isValidationEmailSent: PropTypes.bool.isRequired,
  isResendEmailValidationStarted: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    state: PropTypes.object.isRequired
  }).isRequired
};

const validators = {
  email: {
    required(v) {
      return typeof v === 'string' && v.length > 0;
    },
    email(v) {
      return /.+@.+\..+/i.test(v);
    }
  }
};

export default class FailedActivationPage extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.state = {
      isValid: false
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onMounted();
  }

  componentWillUnmount() {
    this.props.onUnmounted();
  }

  onUpdate({ $form }) {
    this.setState({
      isValid: $form.valid
    });
  }

  onSubmit({ email }) {
    this.props.onResend(email);
  }

  render() {
    if (this.props.isValidationEmailSent) {
      return (
        <Page>
          <Card>
            <CardHeader>
              <span>We&apos;ve sent you an email</span>
            </CardHeader>
            <CardBody>
              <div>Please check your email.</div>
              <div>Can&apos;t find it? Contact us at <a href="mailto:support@bity.com">support@bity.com</a></div>
            </CardBody>
          </Card>
        </Page>
      );
    }

    const {
      isResendEmailValidationStarted,
      location: {
        state: {
          failReason = failReasons.NONE
        }
      }
    } = this.props;

    let formTitle;
    switch (failReason) {
      case failReasons.TOKEN:
        formTitle = (
          <span>Activation token not valid. It could be expired or incorrect.</span>
        );
        break;
      default:
        formTitle = (
          <span>Can not activate your account</span>
        );
    }

    const disableSubmitBtn = !this.state.isValid || isResendEmailValidationStarted;

    return (
      <Page>
        <Card>
          <CardHeader>
            <span>Can not activate your account</span>
          </CardHeader>
          <CardBody>
            <LocalForm noValidate validators={validators} onUpdate={this.onUpdate} onSubmit={this.onSubmit}>
              <div className={styles.formTitle}>
                {formTitle}
              </div>
              <div className="form-group">
                <label htmlFor="email">Please enter your address mail and we will send you an email</label>
                <Control.text id="email" model=".email" type="email" className="form-control" />
              </div>
              <div className={styles.btnContainer}>
                <button type="submit" className={`btn btn-primary ${styles.resendBtn}`} disabled={disableSubmitBtn}>
                  <span>Resend activation code</span>
                </button>
              </div>
            </LocalForm>
          </CardBody>
        </Card>
      </Page>
    );
  }
}
