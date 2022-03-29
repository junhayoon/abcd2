export function FETCH_MYINFO (context) {
  return new Promise((resolve, reject) => {
	  axios.get('/api/myinfo')
	  .then(res => {
		  context.commit('setMyInfo', res.data);
		  resolve();
      })
      .catch(err => {
    	  console.error(err);
    	  reject();
      })
  })
}

export function FETCH_ROLEINFO (context) {
  return new Promise((resolve, reject) => {
	  axios.get('/api/roles')
	  .then(res => {
		  context.commit('setRoleInfo', res.data);
		  resolve();
      })
      .catch(err => {
    	  console.error(err);
    	  reject();
      })
  })
}

export function FETCH_LINKURL (context) {
  return new Promise((resolve, reject) => {
	  axios.get('/api/linkurl')
	  .then(res => {
		  context.commit('setLinkUrl', res.data);
		  resolve();
      })
      .catch(err => {
    	  console.error(err);
    	  reject();
      })
  })
}

export function FETCH_VMSCONFIG (context) {
  return new Promise((resolve, reject) => {
	  axios.get('/api/vmsconfig')
	  .then(res => {
		  context.commit('setVmsConfig', res.data);
		  resolve();
      })
      .catch(err => {
    	  console.error(err);
    	  reject();
      })
  })
}
