import router from './router/index.js'
import store from './store/index.js'
import i18n from './i18n/index.js'

Vue.config.devtools = true;
Vue.config.debug = true;

Vue.mixin({
	data: function() {
		return {
			fonts: [{ label: this.$i18n.t("font.Gulim"), value:'Gulim, 굴림' }, { label: this.$i18n.t("font.Dotum"), value:'Dotum, 돋움' }, { label: this.$i18n.t("font.Batang"), value:'Batang, 바탕' }],
			fontSizes: [{ label: "8", value: 8}, { label: "9", value: 9}, { label: "10", value: 10}, { label: "11", value: 11}, { label: "12", value: 12}, { label: "13", value: 13}, { label: "14", value: 14}, 
				{ label: "15", value: 15}, { label: "16", value: 16}, { label: "17", value: 17}, { label: "18", value: 18}, { label: "19", value: 19}, { label: "20", value: 20}, { label: "21", value: 21}, { label: "22", value: 22}, 
				{ label: "23", value: 23}, { label: "24", value: 24}, { label: "25", value: 25}, { label: "26", value: 26}, { label: "27", value: 27}, { label: "28", value: 28}, { label: "29", value: 29}, { label: "30", value: 30}, 
				{ label: "31", value: 31}, { label: "32", value: 32}, { label: "33", value: 33}, { label: "34", value: 34}, { label: "35", value: 35}, { label: "36", value: 36}, { label: "37", value: 37}, { label: "38", value: 38}, { label: "39", value: 39}, { label: "40", value: 40}],
			libraryIds: [{ label: "00", value: 0 }, { label: "01", value: 1 }, { label: "02", value: 2 }, { label: "03", value: 3 }, { label: "04", value: 4 }, { label: "05", value: 5 }, { label: "06", value: 6 }, { label: "07", value: 7 }, { label: "08", value: 8 }, { label: "09", value: 9 }, 
				{ label: "10", value: 10 }, { label: "11", value: 11 }, { label: "12", value: 12 }, { label: "13", value: 13 }, { label: "14", value: 14 }, { label: "15", value: 15 }, { label: "16", value: 16 }],
			displayFuctions: [
				{
					value: 0,
					label: 'Shift'
				},
				{
					value: 1,
					label: 'Scroll'
				},
				{
					value: 2,
					label: 'Wipe'
				},
				{
					value: 3,
					label: 'Curtain'
				},
				{
					value: 4,
					label: 'Blind'
				},
				{
					value: 5,
					label: 'Blinking'
				},
				{
					value: 6,
					label: 'Stationary'
				}
			],
			displayDirections: [
				{
					value: 0,
					label: 'Up'
				},
				{
					value: 1,
					label: 'Down'
				},
				{
					value: 2,
					label: 'Left'
				},
				{
					value: 3,
					label: 'Right'
				}
			],
			onoff: [ { "value": true, "name": this.$i18n.t("label.on") }, { "value": false, "name": this.$i18n.t("label.off") }],
			automanual: [ { "value": true, "name": this.$i18n.t("label.auto") }, { "value": false, "name": this.$i18n.t("label.manual") }],
			enabledData: [ { "value": true, "label": this.$i18n.t("label.enabled") }, { "value": false, "label": this.$i18n.t("label.disabled") }],
			config: { 
				headers: {
					'Content-Type': 'application/json'
				} 
			},
			gridOption: {
				grid: {
					background: '#fff',
					border: '#ccc',
					text: '#444'
				},
				selection: {
					background: '#4daaf9',
					border: '#004082'
				},
				toolbar: {
					border: '#ccc',
					background: '#fff'
				},
				scrollbar: {
					background: '#f5f5f5',
					thumb: '#d9d9d9',
					active: '#c1c1c1'
				},
				row: {
					even: {
						background: '#f3ffe3'
					},
					hover: {
						background: '#ccc'
					}
				},
				cell: {
					normal: {
						background: '#fbfbfb',
						border: '#e0e0e0'
					},
					head: {
						background: '#eee',
						border: '#ccc'
					},
					editable: {
						background: '#fbfbfb'
					},
					selectedHead: {
						background: '#d8d8d8'
					},
					focused: {
						border: '#418ed4'
					},
					disabled: {
						text: '#b0b0b0'
					}
				}
			},
			loginDt: null
		}
	},
	computed: {
		...Vuex.mapGetters({
			myInfo: 'basic/getMyInfo',
			roleInfo: 'basic/getRoleInfo',
			linkUrl: 'basic/getLinkUrl'
		})
//		myInfo: function() {
//			return this.$store.getters['basic/getMyInfo'];
//		},
//		roleInfo: function() {
//			return this.$store.getters['basic/getRoleInfo'];
//		},
//		linkUrl: function() {
//			return this.$store.getters['basic/getLinkUrl'];
//		},
	},
	methods: {
		setGlobal: function(key, value) {
			this.$root['_u' + key] = value;
		},
		getGlobal: function(key) {
			return this.$root['_u' + key];
		},
//		setMyInfo: function() {
//			this.$store.dispatch('basic/FETCH_MYINFO');
//		},
//		setRoleInfo: function() {
//			this.$store.dispatch('basic/FETCH_ROLEINFO');
//		},
//		setLinkUrl: function() {
//			this.$store.dispatch('basic/FETCH_LINKURL');
//		},
		hasRole(roleId) {
			let me = this;
			let has = false;
			let roleIds = [];
			if(Array.isArray(roleId)) {
				roleIds = roleId;
			} else {
				roleIds = roleId.split(",").map(function(item) {
					  return item.trim();
				});
			}
			
			if(me.myInfo != null && me.myInfo.roles != null && me.myInfo.roles.length > 0) {
				me.myInfo.roles.forEach((item) => {
					if(roleIds.includes(item.roleId)) {
						has = true;
					}
				});
			}
			return has;
		},
		isNumber: function(evt) {
			evt = (evt) ? evt : window.event;
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
				evt.preventDefault();
			} else {
				return true;
			}
		},
		isAlphaNumeric: function(evt) {
			evt = (evt) ? evt : window.event;
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if ((charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 122) || (charCode == 95 || charCode == 64) || (charCode == 8 || charCode == 9 || charCode == 37 || charCode == 39 || charCode == 46)) {
				return true;
			} else {
				evt.preventDefault();
			}
		},
		moment: function () {
			return moment();
		},
		zeroPad: function(n, width) {
			n = n + '';
			return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
		},
		toastMessage: function(type, title, message) {
			if(type == 'error') {
				$("#toastNoticeMessage").prop("fill", "#ff7a00");
			} else {
				$("#toastNoticeMessage").prop("fill", "#007aff");
			}
			$("#toastNoticeTime").text(moment(new Date()).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss'));
			$("#toastNoticeTitle").text(title);
        	$("#toastNoticeMessage").text(message);
        	$('#toastNotice').toast('show');
		},
		rgb2hex: function(rgb) {
		     if (  rgb.search("rgb") == -1 ) {
		          return rgb;
		     } else {
		          rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
		          function hex(x) {
		               return ("0" + parseInt(x).toString(16)).slice(-2);
		          }
		          return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
		     }
		}
	},
	filters: {
		dateString: function (date) {
			moment.locale('ko');
			let d = moment(date).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss');
			if(d != 'Invalid date') return d;
			
			let ds = date.year + "-" + (date.monthValue.toString().length < 2 ? "0" + date.monthValue : date.monthValue) + "-" + (date.dayOfMonth.toString().length < 2 ? "0" + date.dayOfMonth : date.dayOfMonth) 
			+ "T" + (date.hour.toString().length < 2 ? "0" + date.hour : date.hour) + ":" + (date.minute.toString().length < 2 ? "0" + date.minute : date.minute) + ":" + (date.second.toString().length < 2 ? "0" + date.second : date.second);
			return moment(ds).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss');
		},
		dateStringFormat: function (date, f) {
			moment.locale('ko');
			return moment(date).tz(moment.tz.guess()).format(f);
		},
		comma: function(val){
		  	return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		fillZero: function(str, width) {
			if(!isNaN(str)) str = str.toString();
			return str.length >= width ? str : new Array(width - str.length + 1).join("0") + str;
		}
	},
	created: function() {
	},
	mounted: function() {
		$("#confirmDialog").on('hide.bs.modal', function() {
			$("#confirmOk").off();
		});

		var me = this;
		
		window.global = {};
		
		window.chartColors = {
			red: 'rgb(255, 99, 132)',
			orange: 'rgb(255, 159, 64)',
			yellow: 'rgb(255, 205, 86)',
			green: 'rgb(75, 192, 192)',
			blue: 'rgb(54, 162, 235)',
			purple: 'rgb(153, 102, 255)',
			grey: 'rgb(201, 203, 207)'
		};
		
		window.chartColorArray = [
			'rgb(166,206,227)',
			'rgb(31,120,180)',
			'rgb(178,223,138)',
			'rgb(51,160,44)',
			'rgb(251,154,153)',
			'rgb(227,26,28)',
			'rgb(253,191,111)',
			'rgb(255,127,0)',
			'rgb(202,178,214)',
			'rgb(106,61,154)',
			'rgb(177,89,40)',
			'rgb(141,211,199)',
			'rgb(190,186,218)',
			'rgb(251,128,114)',
			'rgb(128,177,211)',
			'rgb(253,180,98)',
			'rgb(179,222,105)',
			'rgb(252,205,229)',
			'rgb(217,217,217)',
			'rgb(188,128,189)',
			'rgb(204,235,197)',
			'rgb(141,211,199)',
			'rgb(190,186,218)',
			'rgb(251,128,114)',
			'rgb(128,177,211)',
			'rgb(253,180,98)',
			'rgb(179,222,105)',
			'rgb(217,217,217)',
			'rgb(188,128,189)',
			'rgb(204,235,197)'
		];
	}
});

new Vue({
	el: '#app',
	router,
	store,
	i18n,
	computed: {
		...Vuex.mapGetters({
			myInfo: 'basic/getMyInfo',
			roleInfo: 'basic/getRoleInfo',
			linkUrl: 'basic/getLinkUrl',
		})
	},
	created: function() {
		this.$store.dispatch('basic/FETCH_MYINFO');
		this.$store.dispatch('basic/FETCH_ROLEINFO');
		this.$store.dispatch('basic/FETCH_LINKURL');
		
		// 로그인 시간 기록
		// 여기에 도달했다면 로그인 성공으로 보고 date 객체를 생성하여 로컬 스토리지와 vuejs 전역변수에 저장
		// 새로고침을 하면 vuejs가 다시 동작하므로 loginDt를 덮어쓰지 않기 위해 기존 로컬스토리지에 loginDt가 있으면 저장하지 않음
		// login.html로 이동 시 loginDt 로컬 스토리지 데이터를 삭제
		var loginDt = localStorage.getItem("loginDt");
		if(!loginDt) {
			loginDt = moment().format('YYYY-MM-DDThh:mm:ss'); // new Date().toISOString();
			localStorage.setItem("loginDt", loginDt);
		}
		this.$store.commit('basic/setLoginDt', loginDt);
	},
	mounted: function() {
		
	}
});
