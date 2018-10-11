import * as types from '../actionType';

const initialState = {
  originContract: 'undefine_contract',
  nowContract: 'undefine_contract',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MARK_DETAIL_DID_MOUNT:
      return {
        ...state,
        originContract: action.originContract,
        nowContract: action.nowContract
      };
    case types.MARK_DETAIL_CHANGE_CONTRACT:
      return {
        ...state,
        isLogin: false,
      };
    case types.MARK_DETAIL_WILL_UNMOUNT:
      return {
        ...state,
        user: action.user,
        balance: action.balance,
        userVerified: action.userVerified,
        isCertification: action.isCertification,
        isSetDrawPwd: action.isSetDrawPwd,
        operateMoney: action.operateMoney,
        frozenCapital: action.frozenCapital,
        drawHandleFee: action.drawHandleFee,
        wxAccount: action.wxAccount
      };
    default: return state;
  }
};
export default reducer;