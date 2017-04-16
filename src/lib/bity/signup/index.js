import signupRequestFactory from './signup';
import signup2RequestFactory from './signup-2';
import activateUserByEmailFactory from './activate-by-email';
import resendEmailValidationFactory from './resend-email-validation';

export default function signupApiFactory(ajax) {
  return {
    signup: signupRequestFactory(ajax),
    signup2: signup2RequestFactory(ajax),
    activateUserByEmail: activateUserByEmailFactory(ajax),
    resendEmailValidation: resendEmailValidationFactory(ajax)
  };
}
