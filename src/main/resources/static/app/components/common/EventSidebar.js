import sidebartemplate from '../templates/common/EventSidebar.html.js'

export default Vue.component('eventsidebar', {
	props: {},
	template: sidebartemplate,
	components: {},
	data: function () {
		return {
			apiNotificationHistory: "/api/notification/history",
			levelList: [
	            { name: this.$i18n.t("notification.label.danger"), level: 3, key: "danger", count: 0 },
	            { name: this.$i18n.t("notification.label.warning"), level: 2, key: "warning", count: 0 },
	            { name: this.$i18n.t("notification.label.info"), level: 1, key: "info", count: 0 },
				{ name: this.$i18n.t("notification.label.success"), level: 0, key: "success", count: 0 }
			],
			notiList: []
		}
	},
	computed: {
		
	},
	watch: {
		
	},
	methods: {
		putNotification: function(notification) {
		
			let newList = [];
			
			newList.push(notification);
			
			this.notiList.forEach(function(item) {
				newList.push(item);
			});
			
			this.notiList = newList;
			
			var level = notification.level;
			++this.levelList[3 - level].count;	// levelList���� level�� 3���� �������� ���ֱ� ������ 3���� level�� ���ش�
		},
		getNotificationHistory: function() {
		
			var me = this;
			
			let param = {
					startDate: moment().subtract(3, 'days').format('YYYY-MM-DDTHH:mm:ss'), //this.$store.state.basic.loginDt,
					endDate: moment().format('YYYY-MM-DDTHH:mm:ss'), // 2021-04-16T00:28:06
					page: 0,
					size: 10000
				};
				
			//console.log('getNotificationHistory param:'+ JSON.stringify(param));
			
			axios.get(me.apiNotificationHistory, {
				params: param
			})
    		.then(res => {
    			
    			$('#cover-spin').show(0);
    			
    			if(res != null && res.data != null) {
					//console.log('getNotificationHistory res.data:'+ JSON.stringify(res.data));
    				var content = res.data.content;
    				me.notiList = [...me.notiList, ...content];
    				content.forEach(function(item) {
    					// levelList도 loop를 돌리면 notiHistory 1개당 levelList도 반복문을 돌게 되기 때문에
    					// 반복의 최소화를 위해 levelList가 3부터 역순으로 저장되있는 점을 이용하여 3에서 해당 notiHistory의 level을 뺀 index에 있는
    					// count를 증가시킨다.
    					// ex -> 3레벨의 notiHistory라면 3 - '3' = levelList 0번째의 count를 증가
    					//       1레벨의 notiHisotry라면 3 - '1' = levelList 2번째의 count를 증가
    					++me.levelList[3 - item.level].count;
    				});
    			}
    			
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
		}
	},
	created: function () {
		
	},
	mounted: function () {
		this.getNotificationHistory();
	},
	updated: function() {
		
	}
});