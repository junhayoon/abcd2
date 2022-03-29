/**
 * 풍향/풍속 컴포넌트
 */
 
import WindNavigator from '../templates/windNavigator/WindNavigator.html.js';

export default Vue.component('WindNavigator', {
	template: WindNavigator,
	data: function () {
		return {
			isConnectedStome: false,
			windDirection: 0,
			windSpeed: 0
		}
	},
	computed: {
		
	},
	methods: {
		// 이벤트 감지 소켓 연결 부분
		windSocketConnect: function() {
			let socket = new SockJS('/wamp');
			this.stompClient = Stomp.over(socket);
			this.stompClient.debug = () => {};
			this.stompClient.connect({}, this.onConnected, this.onError);
		},
		onConnected: function() {
			this.isConnectedStome = true;
			this.subscribews("/w2c/wind", this.setWindInfo);
		},
		onError: function() {
			this.isConnectedStome = false;
			this.stompClient.connect({}, this.onConnected, this.onError);
		},
		subscribews: function(topic, callback) {
			if(this.isConnectedStome) {
				this.stompClient.subscribe(topic, callback);
			}
		},
		setWindInfo: function(data) {
			var eventBody = JSON.parse(data.body);
			var deviceIp = eventBody.device_ip;
			var windSpeed = eventBody.wind_speed;
			var windDirection = eventBody.wind_direction;
			if(deviceIp.indexOf("223") > -1) {
				this.windDirection = windDirection;
				this.windSpeed = windSpeed;
			}
		}
	},
	mounted: function () {
		this.windSocketConnect();
	}
});