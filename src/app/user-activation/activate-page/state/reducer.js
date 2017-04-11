import * as actions from './actions';

const initialState = {
  mounted: false
};

export default function activateUserPageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.MOUNTED:
      return onMounted(state, action);
    case actions.UNMOUNTED:
      return onUnmounted(state, action);
    default:
      return state;
  }
}

function onMounted(state) {
  return {
    ...state,
    mounted: true
  };
}

function onUnmounted() {
  return { ...initialState };
}
