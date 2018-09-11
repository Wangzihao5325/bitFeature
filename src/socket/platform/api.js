import { PLATFORM_DOMAIN, APP_VERSIONS } from '../../global/config';

class api {
  requset(url, formData, onSuccess, onError) {
    let fullUrl = PLATFORM_DOMAIN + url;
    let success = false;
    fetch(fullUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
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
    let url = '/socket/config/getVersions';
    let formData = new FormData();
    formData.append('appVersions', APP_VERSIONS);
    this.requset(url, formData, onSuccess, onError);
  }

  login(userName, password, onSuccess, onError) {
    let url = '/login';
    let formData = new FormData();
    formData.append('loginName', userName);
    formData.append('password', password);
    this.requset(url, formData, onSuccess, onError)
  }
}

export default new api();