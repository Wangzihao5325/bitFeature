/*查询到的合约的配置信息，只增加不删减*/
let contractMap2Config = {
  'undefine_contract':{fullName:'undefined',dotSize:2}
};

/*当前订阅状态的合约列表，用于退订合约时使用*/
let aliveContractList = [];

/*合约快照，用来保存某一时刻合约定约状态，用来进行恢复订阅的操作*/
let aliveContractSnapShot = [];
export {
  contractMap2Config,
  aliveContractList,
  aliveContractSnapShot
}