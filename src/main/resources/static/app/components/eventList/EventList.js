/**
 * 상황발생현황
 */
 
import EventList from '../templates/eventList/EventList.html.js';

export default Vue.component('EventList', {
	template: EventList,
	data: function () {
		return {
			isOpen: false,
			apiTodayDashboardEvents: 'api/getTodayDashboardEvents',
			todayDashboardEvents: [],
			todayTotalDashboardEventCnt: 0,
			todayDashboardEventsNoChecking: 0,
			gradeInfo: {
				CT: {
					color: 'red'
				},
				MJ: {
					color: 'orange'
				},
				MI: {
					color: 'yellow'
				},
			}
		}
	},
	computed: {
		
	},
	methods: {
		/**
		 * 이벤트 컴포넌트 펼치기/접기
		 */
		handleCollapse: function() {
			this.isOpen = !this.isOpen;
		},

		/**
		 * 경고 이벤트 목록 데이터 조회
		 */
		getTodayDashboardEvents: function() {
			axios.get(this.apiTodayDashboardEvents, {
				params: {
					enabled: true
				}
			})
    		.then(res => {
    			if(res != null && res.data != null) {
    				this.todayDashboardEvents = res.data;
    				console.log(this.todayDashboardEvents);
    				this.todayTotalDashboardEventCnt = res.data.length;
    				this.todayDashboardEventsNoChecking = 0;
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					if(!obj.checking) {
    						this.todayDashboardEventsNoChecking++;
    					}
    				}
    			}
    		});
		},
		
		refreshDashboardEvent: function() {
			this.getTodayDashboardEvents();
		}
		
	},
	mounted: function () {
		this.getTodayDashboardEvents();
	}
});