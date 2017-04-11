import { connect } from 'react-redux';
import Widget from './page';
import { actions, selectors } from '../state';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    isResendEmailValidationStarted: selectors.isResendEmailValidationStarted(state),
    isValidationEmailSent: selectors.isValidationEmailSent(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMounted() {
      dispatch(actions.mounted());
    },
    onUnmounted() {
      dispatch(actions.unmounted());
    },
    onResend(email) {
      dispatch(actions.resendEmailValidation(email));
    }
  };
}
