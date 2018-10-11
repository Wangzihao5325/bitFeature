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