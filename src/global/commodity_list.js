/*查询到的合约的配置信息，只增加不删减*/
let contractMap2Config = {
  'undefine_contract': { fullName: 'undefined', dotSize: 2 },
  'undefine_contract1': { fullName: 'undefined1', dotSize: 2 },
  'undefine_contract2': { fullName: 'undefined2', dotSize: 2 }
};

/*当前订阅状态的合约列表，用于退订合约时使用---行情页面行情订阅列表*/
let aliveContractList = [];

/*当前订阅状态的合约列表，用于退订合约时使用---交易页面行情订阅列表*/
let tradeAliveContractList = [];

/*合约快照，用来保存某一时刻合约定约状态，用来进行恢复订阅的操作*/
let aliveContractSnapShot = [];

/*合约快照，用来保存某一时刻合约定约状态，用来进行恢复订阅的操作 -- 交易用*/
let tradeAliveContractSnapShot = [];

/*分类推荐合约映射表*/
let recommendContractMap = {};

/*分类合约映射表*/
let classifyContractMap = {};

/*允许订阅合约的全集，用于初始化合约store*/
let initContractList = [];

/*订阅结构体列表，包含所有可订阅合约，存储于data字段 */
let subscribeObjList = {};

/*商品类别与合约的映射表 -deposit use- ag->ag1812*/
let commodityNoMap2MainContract = {}
export {
  contractMap2Config,
  aliveContractList,
  tradeAliveContractList,
  aliveContractSnapShot,
  tradeAliveContractSnapShot,

  recommendContractMap,
  classifyContractMap,
  initContractList,
  subscribeObjList,
  commodityNoMap2MainContract
}