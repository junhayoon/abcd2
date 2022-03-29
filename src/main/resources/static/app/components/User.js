
import usertemplate from './templates/User.html.js'

export default Vue.component('User', {
	template: usertemplate,
	components: {
		
	},
	data: function () {
		return {
			apiMyInfo: '/api/myinfo',
            
            // change my info
			myId		: null,			// 1
			myName		: '',			// 관리자
			myUsername	: '',			// admin
			myEmail		: '',
			myMobilePhone : '',
			
			// change password
			pw1			: '',
			pw2			: '',
            notSamePasswords: false
		}
	},
	computed: {
		
	},
	watch: {
        myInfo(state) {
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
        }
	},
	methods: {	
		init: function() {
			this.pw1 = '';
            this.pw2 = '';
            this.password = '';
            this.checkPassword = '';
			this.notSamePasswords = false;
			
			var myInfo = this.$store.state.basic.myInfo;
			this.myId = myInfo.id;
			this.myUsername = myInfo.username;
			this.myName = myInfo.name;
			this.myEmail = myInfo.email;
			this.myMobilePhone = myInfo.mobilePhone;
		},	
		//passCheck: function() {
		//	if (this.pw1 != '' && this.pw2 != '') {
		//		this.notSamePasswords = (this.pw1 !== this.pw2);
		//	}
		//},
		//updateName: function(value) {
		//	this.$store.commit('basic/setMyName', value);
		//	this.myName = value;
		//},
		//updateEmail: function(value) {
		//	this.$store.commit('basic/setMyEmail', value);
		//	this.myEmail = value;
		//},
		//updateMobilePhone: function(value) {
		//	this.$store.commit('basic/setMyMobilePhone', value);
		//	this.myMobilePhone = value;
		//},
		updateMyInfo: function() {			
			let user = {
				id : this.myId,
				username : this.myUsername,
				name : this.myName,
				email : this.myEmail,
				mobilePhone : this.myMobilePhone,
			};
			
			var me = this;
			axios.put(this.apiMyInfo, user, this.config)
				.then(res=> {
					alert(this.$i18n.t("frontend.user.message.updated"));
					
					this.$store.commit('basic/setMyName', user.name);
					this.$store.commit('basic/setMyEmail', user.email);
					this.$store.commit('basic/setMyMobilePhone', user.mobilePhone);
				})
				.catch(err=> {
					alert(err.message);
				})
				.finally(()=>{
					this.init();
					this.$forceUpdate();
				});
		},
		updatePassword: function() {
			var me = this;
			
			if (this.notSamePasswords) {
				alert(this.$i18n.t("frontend.user.message.not_match"));
			} else {
				let user = {
					id: me.myInfo.id,
					password: this.pw1
				};
	
				axios.put(this.apiMyInfo, user, this.config)
					.then(res=> {
						alert(this.$i18n.t("frontend.user.message.updated"));
					})
					.catch(err=> {
						alert(err.message);
					})
					.finally(()=>{
						this.init();
						this.$forceUpdate();
					});
			}
		},
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
		me.init();
	}
});