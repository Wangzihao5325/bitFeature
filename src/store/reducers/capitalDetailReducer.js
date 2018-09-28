import * as types from '../actionType';

const initialState = {
  incomeMoney: 0,
  incomeNum: 0,
  outlayMoney: 0,
  outlayNum: 0,
  fundList: []     //{payTime:'2018-10-20 15:30',money:'-10',remark:'国际综合追加保证金'}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_CAPITAL_DETAILS_STORE:
      return {
        ...state,
        incomeMoney: action.incomeMoney,
        incomeNum: action.incomeNum,
        outlayMoney: action.outlayMoney,
        outlayNum: action.outlayNum,
        fundList: action.fundList
      };
    case types.UPDATE_CAPITAL_DETAILS_STORE:
      return {
        ...state,
      };
    default: return state;
  }
};
export default reducer;