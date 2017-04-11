import { connect } from 'react-redux';
import Widget from './page';
import { actions } from '../state';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onMounted(token, router) {
      dispatch(actions.mounted(token, router));
    },
    onUnmounted() {
      dispatch(actions.unmounted());
    }
  };
}
