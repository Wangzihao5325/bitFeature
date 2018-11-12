import { PLATFORM_DOMAIN, APP_VERSIONS, TRADE_DOMAIN, TRADE_VERSION } from '../../global/config';
import Variables from '../../global/Variables';
class api {
  requset(url, formData, onSuccess, onError) {
    let fullUrl = PLATFORM_DOMAIN + url;
    let success = false;
    let headers = Variables.account.secret !== null && Variables.account.token !== null ?
      { 'Content-Type': 'multipart/form-data', token: Variables.account.token, secret: Variables.account.secret } :
      { 'Content-Type': 'multipart/form-data' };
    let obj = formData ? { method: 'POST', headers: headers, body: formData } : { method: 'POST', headers: headers }
    fetch(fullUrl, obj).then((response) => response.json())
      .then((responseJson) => {
        const result = responseJson.data ? responseJson.data : null;
        const code = responseJson.code ? responseJson.code : null;
        const message = responseJson.message ? responseJson.message : null;
        if (responseJson.success) {
          try {
            onSuccess(result, code, message);
          } catch (error) {
            console.log(error);
          }
        } else {
          onError ? onError(result, code, message) : console.log(responseJson);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getVersions(onSuccess, onError) {
    const url = '/socket/config/getVersions';
    let formData = new FormData();
    formData.append('appVersions', APP_VERSIONS);
    this.requset(url, formData, onSuccess, onError);
  }

  login(userName, password, onSuccess, onError) {
    const url = '/login';
    let formData = new FormData();
    formData.append('loginName', userName);
    formData.append('password', password);
    this.requset(url, formData, onSuccess, onError);
  }

  getbalancerate(businessType, couponBusinessType, onSuccess, onError) {
    const url = '/user/getbalancerate';
    let formData = new FormData();
    formData.append('businessType', businessType);
    if (couponBusinessType !== null) {
      formData.append('couponBusinessType', couponBusinessType);
    }
    this.requset(url, formData, onSuccess, onError);
  }

  getCapitalDetails(onSuccess, onError) {
    const url = '/user/fund/list';
    let formData = new FormData();
    formData.append('pageIndex', 1);
    formData.append('size', 10);
    this.requset(url, formData, onSuccess, onError);
  }

  sendMessageWithToken(mobile, type, onSuccess, onError) {
    const url = '/user/security/send_sms';
    let formData = new FormData();
    formData.append('mobile', mobile);
    formData.append('type', type);
    this.requset(url, formData, onSuccess, onError);
  }

  updateLoginPwd(password, code, onSuccess, onError) {
    const url = '/user/security/update_loginPwd';
    let formData = new FormData();
    formData.append('password', password);
    formData.append('code', code);
    this.requset(url, formData, onSuccess, onError);
  }

  getTradeAccount(onSuccess, onError) {
    const url = '/user/ftrade/list';
    let formData = new FormData();
    formData.append('businessType', 99);
    this.requset(url, formData, onSuccess, onError);
  }

  getClassifyInfo(onSuccess, onError) {
    const url = '/commodity/classifyInfo';
    let formData = new FormData();
    formData.append('RN', 'RN');
    this.requset(url, formData, onSuccess, onError);
  }

  getCommodityTradeRules(commodityCode, onSuccess, onError) {
    const url = '/commodity/tradeRules';
    let formData = new FormData();
    formData.append('commodityCode', commodityCode);
    this.requset(url, formData, onSuccess, onError);
  }

  getAccountOpenScheme(onSuccess, onError) {
    const url = '/ftrade/params';
    let formData = new FormData();
    formData.append('businessType', 99);
    this.requset(url, formData, onSuccess, onError)
  }

  getTradeURL(onSuccess, onError) {
    const url = '/socket/config/getVersions';
    let formData = new FormData();
    formData.append('appVersions', TRADE_VERSION);
    this.requset(url, formData, onSuccess, onError)
  }

  payApplyTrade(traderBond, onSuccess, onError) {
    const url = '/user/ftrade/handle';
    let formData = new FormData();
    formData.append('vid', -1);
    formData.append('tranLever', 0);
    formData.append('businessType', 99);
    formData.append('version', 1);
    formData.append('traderBond', traderBond);
    this.requset(url, formData, onSuccess, onError);
  }

  getBusinessNews(pageIndex, size, onSuccess, onError) {
    const url = '/crawler/getCrawler';
    let formData = new FormData();
    formData.append('pageIndex', pageIndex);
    formData.append('size', size);
    this.requset(url, formData, onSuccess, onError);
  }

  getCrawlerCalendar(pageIndex, size, startTime, endTime, onSuccess, onError) {
    const url = '/crawler/getCrawlerCalendar';
    let formData = new FormData();
    formData.append('pageIndex', pageIndex);
    formData.append('size', size);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    this.requset(url, formData, onSuccess, onError);
  }

  registerCode(pageIndex, size, startTime, endTime, onSuccess, onError) {
    const url = '/sms';
    let formData = new FormData();
    formData.append('pageIndex', pageIndex);
    formData.append('size', size);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    this.requset(url, formData, onSuccess, onError);
  }
}

export default new api();