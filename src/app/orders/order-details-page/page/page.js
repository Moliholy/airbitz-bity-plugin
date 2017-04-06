import React, { Component, PropTypes } from 'react';
import Page from '../../../lib/page';
import { Card, CardHeader, CardBody } from '../../../lib/card';
import PageLoader from '../../../lib/page-loader';
import Link from '../../../lib/link';
import CancelOrderUi from './cancel-ui';
import * as utils from './utils';

import styles from './styles.less';

const propTypes = {
  params: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }).isRequired,
  order: PropTypes.object,
  orderWasCanceled: PropTypes.bool.isRequired,
  paymentMethods: PropTypes.array,
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isPreparationStarted: PropTypes.bool.isRequired,
  isPreparationFailed: PropTypes.bool.isRequired,
  isPreparationCompleted: PropTypes.bool.isRequired
};

const defaultProps = {
  order: {},
  paymentMethods: []
};

export default class OrderDetailsPage extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    const { params: { id: orderId }, onMounted } = this.props;
    onMounted(orderId);
  }

  componentWillUnmount() {
    this.props.onUnmounted();
  }

  onCancel() {
    const {
      order: { id: orderId },
      onCancel
    } = this.props;

    onCancel(orderId);
  }

  render() {
    if (this.props.isPreparationStarted) {
      return (
        <PageLoader />
      );
    }

    if (this.props.isPreparationFailed) {
      return (
        <Page>
          <Card>
            <CardHeader>Error</CardHeader>
            <CardBody className={styles.errorCardBody}>
              <div>Page can&lsquo;t be loaded</div>
            </CardBody>
          </Card>
        </Page>
      );
    }

    if (this.props.isPreparationCompleted) {
      const { order, orderWasCanceled, paymentMethods } = this.props;
      const {
        input: {
          reference: orderReference,
          amount,
          currencyCode,
          paymentMethodCode,
          reference: inputReference,
          status: inputStatus
        },
        output: {
          reference: outputReference
        }
      } = order;

      const paymentMethodDetails = utils.getPaymentMethodDetails(paymentMethodCode, paymentMethods);
      const hasPaymentMethodDetails = paymentMethodDetails !== null;

      let paymentMethodNameNode = null;
      if (hasPaymentMethodDetails) {
        paymentMethodNameNode = (
          <div className={styles.paymentMethodDetails}>
            <span>Payment method used: {paymentMethodDetails.name}</span>
          </div>
        );
      }

      let paymentMethodProviderAccounts = [];
      if (hasPaymentMethodDetails) {
        paymentMethodProviderAccounts =
          paymentMethodDetails.provider.accounts.filter(obj => obj.currencyCode === currencyCode);
      }

      /* eslint-disable react/no-danger, react/no-array-index-key */
      let paymentMethodProviderAccountsNode = null;
      if (paymentMethodProviderAccounts.length > 0) {
        paymentMethodProviderAccountsNode = (
          <div>
            {paymentMethodProviderAccounts.map((obj, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: obj.details }} />
            ))}
          </div>
        );
      }
      /* eslint-enable react/no-danger, react/no-array-index-key */

      const formattedInputAmount = utils.formatAmount(amount, currencyCode);
      const inputAmountNode = (
        <div>
          <span>Amount: {formattedInputAmount} {currencyCode}</span>
        </div>
      );

      const inputReferenceNode = (
        <div>
          <span className={styles.inputReference}>REFERENCE: {inputReference}</span>
        </div>
      );

      let outputReferenceNode = null;
      if (typeof outputReference === 'string' && outputReference.length > 0) {
        outputReferenceNode = (
          <div>
            <span> / {outputReference}</span>
          </div>
        );
      }

      const isCanceled = inputStatus.isCanceled || orderWasCanceled;

      const statusForTitle = isCanceled ? { isCanceled: true } : inputStatus;
      const orderStatusTitle = utils.getOrderStatusTitle(statusForTitle);
      let orderStatusNode = null;
      if (typeof orderStatusTitle === 'string' && orderStatusTitle.length > 0) {
        orderStatusNode = (
          <div>
            <span>Status: {orderStatusTitle}</span>
          </div>
        );
      }

      const shouldShowCancelUi = order.status.isOpen === true && !isCanceled;
      let cancelUiNode = null;
      if (shouldShowCancelUi) {
        cancelUiNode = (
          <div className={styles.cancelUi}>
            <div className={styles.cancelUi}>
              <CancelOrderUi onSubmit={this.onCancel} />
            </div>
          </div>
        );
      }

      return (
        <Page>
          <Card>
            <CardHeader>
              <span>Order n°{orderReference}</span>
            </CardHeader>
            <CardBody>
              {paymentMethodNameNode}
              <div className={styles.orderInfo}>
                {paymentMethodProviderAccountsNode}
                {inputAmountNode}
                {inputReferenceNode}
                {outputReferenceNode}
                {orderStatusNode}
              </div>
              <div className={styles.footer}>
                {cancelUiNode}
                <Link to="/orders" className={`btn btn-primary ${styles.backBtn}`}>
                  <span>Back to History</span>
                </Link>
              </div>
            </CardBody>
          </Card>
        </Page>
      );
    }

    return null;
  }
}
