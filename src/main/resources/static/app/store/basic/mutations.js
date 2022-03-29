export function setMyInfo (state, data) {
	state.myInfo = data
}

export function setRoleInfo (state, data) {
	state.roleInfo = data
}

export function setLinkUrl (state, data) {
	state.linkUrl = data
}

export function setVmsConfig (state, data) {
	state.vmsConfig = data
}

export function setLoginDt (state, data) {
	state.loginDt = data;
}

export function setMyName (state, data) {
	state.myInfo.name = data;
}

export function setMyEmail (state, data) {
	state.myInfo.email = data;
}

export function setMyMobilePhone (state, data) {
	state.myInfo.mobilePhone = data;
}

export function setEventAlertShow (state, data) {
	state.eventAlertShow = data;
}

export function setEventAlertData (state, data) {
	state.eventAlertData = data;
}