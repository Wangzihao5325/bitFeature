/*查询到的合约的配置信息，只增加不删减*/
let contractMap2Config = {
  'undefine_contract': { fullName: 'undefined', dotSize: 2 },
  'undefine_contract1': { fullName: 'undefined1', dotSize: 2 },
  'undefine_contract2': { fullName: 'undefined2', dotSize: 2 }
};

/*当前订阅状态的合约列表，用于退订合约时使用*/
let aliveContractList = [];

/*合约快照，用来保存某一时刻合约定约状态，用来进行恢复订阅的操作*/
let aliveContractSnapShot = [];

/*分类推荐合约映射表*/
let recommendContractMap = {};

/*分类合约映射表*/
let classifyContractMap = {};

/*允许订阅合约的全集，用于初始化合约store*/
let initContractList = [];
export {
  contractMap2Config,
  aliveContractList,
  aliveContractSnapShot,

  recommendContractMap,
  classifyContractMap,
  initContractList
}