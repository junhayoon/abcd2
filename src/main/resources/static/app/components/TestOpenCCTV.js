

import cctvtemplate from './templates/TestOpenCCTV.html.js'

//import cctv from './common/openDataCctvStream.js'
//import commons from './common/commons.js'
//import its_min from './common/its_min.js'

export default Vue.component('TestOpenCCTV', {
	template: cctvtemplate,
	components: {

	},
	data: function () {
		return {

		}
	},
	computed: {

	},
	watch: {
        /*myInfo(state) {
			this.myId = state.id,
			this.myUsername = state.username,
			this.myName = state.name,
			this.myEmail = state.email,
			this.myMobilePhone = state.mobilePhone

			console.log('watch : myId...' + this.myId);
			//console.log('watch : myName.....' + this.myName);
		},
		pw2: function(){
			this.notSamePasswords = this.pw1 != this.pw2 ? true : false;
        }*/
	},
	methods: {

		subStyle: function() {
			return 'background: url("/static/images/user_reg_bg.jpg") no-repeat; background-size: 100% 100%;';
		},
		mainTitleStyle: function() {
			return "color: #8c6eda;"
		}
	},
	created: function () {

	},
	mounted: function () {
		var me = this;

		//cctv.loadCCTV()
	}
});
