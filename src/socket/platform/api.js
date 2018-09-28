import { PLATFORM_DOMAIN, APP_VERSIONS } from '../../global/config';
import Variables from '../../global/Variables';
class api {
  requset(url, formData, onSuccess, onError) {
    let fullUrl = PLATFORM_DOMAIN + url;
    let success = false;
    let headers = Variables.account.secret !== null && Variables.account.token !== null ?
      { 'Content-Type': 'multipart/form-data', token: Variables.account.token, secret: Variables.account.secret } :
      { 'Content-Type': 'multipart/form-data' };
    fetch(fullUrl, {
      method: 'POST',
      headers: headers,
      body: formData
    }).then((response) => response.json())
      .then((responseJson) => {
        const result = responseJson.data;
        if (responseJson.success) {
          try {
            onSuccess(result);
          } catch (error) {
            console.log(error);
          }
        } else {
          onError ? onError(result) : console.log(responseJson);
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
}

export default new api();