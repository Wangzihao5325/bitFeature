class api {
  request(type, url, params, onSuccess, onError) {
    let success = false;
    fetch(url, {
      method: type,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }).then((response) => {
      const resJson = JSON.parse(response);
      const result = resJson.data;
      success = result.success;
      if (success) {
        onSuccess(result)
      } else {
        //onError();
      }
    })
  }
}

export default new api();