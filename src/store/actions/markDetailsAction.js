import * as types from '../actionType';

export function action_detailMarketDidMount(contract) {

  return (dispatch) => {
    dispatch({
      type: types.MARK_DETAIL_DID_MOUNT,
      originContract: contract,
      nowContract: contract,
    });
  }
}

export function action_detailMarketWillUnmount() {

  return (dispatch) => {
    dispatch({
      type: types.MARK_DETAIL_DID_MOUNT,
      nowContract: null,
      originContract: null,
    });
  }
}