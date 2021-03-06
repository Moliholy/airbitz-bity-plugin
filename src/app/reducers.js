import { combineReducers } from 'redux';
import createBity from './create-bity';
import { setup as setupAuthStore } from './common-data/auth';
import setupNotifications from './notifications/setup';
import { setupAccountInfoPage } from './account/account-info-page/state';
import { setup as setupAccountInfoStore } from './common-data/account-info';
import { setup as setupOrdersHistory } from './orders/orders-history/data';
import { setup as setupPaymentMethodsStore } from './common-data/payment-methods';
import { setup as setupBankAccounts } from './common-data/bank-accounts';
import { setup as setupConvertPageState } from './orders/convert-page/state';
import { setup as setupQuotaStore } from './common-data/quota';
import { setup as setupQuotaExceededPageState } from './quota/quota-exceeded-page/state';
import { setup as setupExchangeRatesStore } from './common-data/exchange-rates';
import { setup as setupExchangeOrder } from './common-data/exchange-order';
import { setup as setupConvertForm2State } from './orders/convert-form/form.state';
import { setup as setupOrderDetailsPageState } from './orders/order-details-page/state';
import { setup as setupSignupWidgetState } from './auth/signup-widget/state';
import { setup as setupPhoneStore } from './common-data/phone';
import { setup as setupRegisterPhonePageState } from './phone/register-phone-page/state';
import { setup as setupVerifyPhonePageState } from './phone/verify-phone-page/state';
import { setup as setupAddBankAccountPageState } from './bank-accounts/create-page/state';
import { setup as setupAppPreloader } from './app-preloader/state';

const bity = createBity();

let cfg = {
  reducers: {},
  sagas: []
};

cfg = setupAuthStore(cfg, bity);
cfg = setupNotifications(cfg);
cfg = setupAccountInfoPage(cfg);
cfg = setupAccountInfoStore(cfg, bity);
cfg = setupOrdersHistory(cfg, bity);
cfg = setupPaymentMethodsStore(cfg, bity);
cfg = setupBankAccounts(cfg, bity);
cfg = setupConvertPageState(cfg, bity);
cfg = setupQuotaStore(cfg, bity);
cfg = setupQuotaExceededPageState(cfg, bity);
cfg = setupPhoneStore(cfg, bity);
cfg = setupExchangeRatesStore(cfg, bity);
cfg = setupExchangeOrder(cfg, bity);
cfg = setupConvertForm2State(cfg, bity);
cfg = setupOrderDetailsPageState(cfg, bity);
cfg = setupSignupWidgetState(cfg, bity);
cfg = setupRegisterPhonePageState(cfg, bity);
cfg = setupVerifyPhonePageState(cfg, bity);
cfg = setupAddBankAccountPageState(cfg, bity);
cfg = setupAppPreloader(cfg, bity);

const { reducers, sagas } = cfg;
const reducer = combineReducers(reducers);

export { reducer, sagas };
