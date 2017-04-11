import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import PageLoader from '../../../lib/page-loader';

const propTypes = {
  router: PropTypes.object.isRequired,
  location: PropTypes.shape({
    query: PropTypes.object.isRequired
  }).isRequired,
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired
};

class ActivateUserPage extends Component {
  static propTypes = propTypes;

  componentDidMount() {
    const { router, location: { query: { token: rawToken = '' } } } = this.props;
    const token = typeof rawToken === 'string' ? rawToken : '';
    this.props.onMounted(token, router);
  }

  componentWillUnmount() {
    this.props.onUnmounted();
  }

  render() {
    return (
      <PageLoader />
    );
  }
}

export default withRouter(ActivateUserPage);
