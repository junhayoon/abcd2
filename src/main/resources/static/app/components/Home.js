
import hometemplate from './templates/Home.html.js'

export default Vue.component('Home', {
	template: hometemplate,
	data: function () {
		return {
			stompClient: null,
			isConnectedStome: false,
			peninsula: {},
			baseDateTime: new Date(),
			inStatus: 0,
			outStatus: 0,
			inStatusLabel: this.$i18n.t("home.mobile.trafficGood"),
			outStatusLabel: this.$i18n.t("home.mobile.trafficGood"),
			totalInCount: 0,
			totalBusCount: 0,
			todayOutCnt: 0,
			todayInCnt: 0,
			modal: false,
			modalData: {}
		}
	},
	computed: {
		
	},
	methods: {
		isMobile: function() {
			if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			     return true
			} else {
			     return false
			}
		},
		onConnected: function() {
			var me = this;
			me.isConnectedStome = true;
			me.subscribews("/w2c/peninsula", this.onPeninsula);
			me.subscribews("/w2c/event", this.onEventAlert);
			me.sendws("/c2w/peninsula", JSON.stringify({'command': 'traffic'}));
		},
		onError: function() {
			var me = this;
			
			me.isConnectedStome = false;
			me.stompClient.connect({}, this.onConnected, this.onError);
		},
		subscribews: function(topic, callback) {
			var me = this;
			if(me.isConnectedStome) {
				me.stompClient.subscribe(topic, callback);
			}
		},
		sendws: function(topic, data) {
			let me = this;
			
			if(me.isConnectedStome) {
				me.stompClient.send(topic, {}, data);
				return true;
			}
			return false;
		},
		onPeninsula: function(data) {
			let me = this;
			
			me.baseDateTime = new Date();
			
			let tmp = JSON.parse(data.body);
			if(tmp.inSpeed <= 0) {
				tmp.inSpeed = me.peninsula.inSpeed;
			}
			if(tmp.outSpeed <= 0) {
				tmp.outSpeed = me.peninsula.outSpeed;
			}
			if(tmp.todayOutCnt < 0) {
				tmp.todayOutCnt = 0;
			}
			if(tmp.todayInCnt < 0) {
				tmp.todayInCnt = 0;
			}
			if(tmp.visitingCnt < 0) {
				tmp.visitingCnt = 0;
			}
			if(tmp.todayBusCnt < 0) {
				tmp.todayBusCnt = 0;
			}
			
			me.peninsula = tmp;
			if(me.peninsula.inSpeed > 30) {
				me.inStatus = 0;
				me.inStatusLabel = this.$i18n.t("home.mobile.trafficGood");
			} else if(me.peninsula.inSpeed >= 20 && me.peninsula.inSpeed <= 30) {
				me.inStatus = 1;
				me.inStatusLabel = this.$i18n.t("home.mobile.trafficDelay");
			} else {
				me.inStatus = 2;
				me.inStatusLabel = this.$i18n.t("home.mobile.trafficJam");
			}
			
			if(me.peninsula.outSpeed > 30) {
				me.outStatus = 0;
				me.outStatusLabel = this.$i18n.t("home.mobile.trafficGood");
			} else if(me.peninsula.outSpeed >= 20 && me.peninsula.outSpeed <= 30) {
				me.outStatus = 1;
				me.outStatusLabel = this.$i18n.t("home.mobile.trafficDelay");
			} else {
				me.outStatus = 2;
				me.outStatusLabel = this.$i18n.t("home.mobile.trafficJam");
			}
			
			me.todayOutCnt = me.peninsula.todayOutCnt;
			me.todayInCnt = me.peninsula.todayInCnt;
			me.totalInCount = me.peninsula.visitingCnt;
			me.totalBusCount = me.peninsula.todayBusCnt; // + me.peninsula.todayTruckCnt;
		},
		// 이벤트 감지 소켓 연결 부분
		onConnectEventAlram: function() {
			let me = this;
			let socket = new SockJS('/wamp');
			me.stompClient = Stomp.over(socket);
			me.stompClient.debug = () => {};
			me.stompClient.connect({}, this.onConnected, this.onError);
		},
		// 이벤트 감지 소켓 구독 처리 부분
		onEventAlert: function(data) {
			var eventBody = JSON.parse(data.body);
            console.log('eventBody : ', eventBody);
			this.$store.commit('basic/setEventAlertShow', true);
			this.$store.commit('basic/setEventAlertData', eventBody);
            this.$refs.basemapRef.getTodayDashboardEvents();
		}
	},
	mounted: function () {
		var me = this;
		
		if(me.isMobile()) {
			//let socket = new SockJS('/wamp');
			//me.stompClient = Stomp.over(socket);
			//me.stompClient.debug = () => {};
			//me.stompClient.connect({}, this.onConnected, this.onError);
		}
		
		// 이벤트 감지를 위한 웹소켓 생성 함수 호출
		me.onConnectEventAlram();
	}
});