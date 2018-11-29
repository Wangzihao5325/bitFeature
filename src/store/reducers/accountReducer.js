import * as types from '../actionType';
import { AsyncStorage } from 'react-native';

const initialState = {
  isLogin: false,
  user: '您尚未登录,无法使用更多功能',
  balance: 0,
  userVerified: true,
  isCertification: false,
  isSetDrawPwd: false,
  operateMoney: 0,
  frozenCapital: 0,
  drawHandleFee: 0,
  wxAccount: '未绑定'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN:
      return {
        ...state,
        isLogin: true,
      };
    case types.LOG_OUT:
      AsyncStorage.removeItem('PlatformAccount');
      AsyncStorage.removeItem('PlatformPassword');
      return {
        ...state,
        ...initialState
      };
    case types.GET_ACCOUNT_INFO:
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