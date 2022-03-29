
import notihistorytemplate from './templates/NotiHistory.html.js'

export default Vue.component('NotiHistory', {
	template: notihistorytemplate,
	components: {
		Multiselect: window.VueMultiselect.default,
		'paginate' : VuejsPaginate,
	},
	data: function () {
		return {
			apiFacilityNoti: '/api/facility/notification',
			apiFacilitySymbol: '/api/facility/symbol',
			apiNotiHistory: '/api/notification/history',
            redIcon: '/static/icons/icons8-red-circle-48.png',
			yellowIcon: '/static/icons/icons8-yellow-circle-48.png',
			greenIcon: '/static/icons/icons8-green-circle-48.png',
			blueIcon: '/static/icons/icons8-blue-circle-48.png',
			facilityList: [],
			notiList: [],
            levelList: [],
            levelForSearch: null,
            notiForSearch: null,
            startDateTime: new Date(),
			endDateTime: new Date(),
			
			size: 50,
			totalPage: 0,
			page: 1,			
			isActivePage: false,
			orderByDesc: true,
			
			// 리스트 데이터가 있는지 없는지 판단하는 bool
			showNoData: false
		}
	},
	computed: {

	},
	watch: {
        myInfo(state) {
		},
	},
	methods: {
		init: function() {
			var me = this;
			
			me.levelList = [];
			me.levelList.push({ name: me.$i18n.t("notification.label.success"), level: 0 });
			me.levelList.push({ name: me.$i18n.t("notification.label.info"), level: 1 });
			me.levelList.push({ name: me.$i18n.t("notification.label.warning"), level: 2 });
			me.levelList.push({ name: me.$i18n.t("notification.label.danger"), level: 3 });
		},
		getFacility: function(id) {
			let items = this.facilityList.filter((item) => {
				return (item.id == id);
			});
			
			if(items != null && items.length > 0) return items[0];
			return null;		
		},
		getFacilityList: function() {	// only noticeable facility
			var me = this;
			me.facilityList = [];			
			
			axios.get(me.apiFacilityNoti, {
				params: {
					enabled: true
				}
			})
    		.then(res => {
    			if(res != null && res.data != null) {
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					me.facilityList.push(obj);
    				}
    			}
    		})
    		.catch(err => {
    		});
		},
		getCategorySymbolPath: function(item) {
			return this.apiFacilitySymbol + '/' + item.facility.facilityCategory.categorySymbol + '.png';
		},
		getNotiHistory: function() {
			var me = this;
			
			let notiLevel = -1;
			let facilityId = -1;			
			me.isActivePage = false;
			me.notiList = [];
			
			//console.log("NotiHistory.js getNotiHistory() ...");
			
			if (me.levelForSearch != undefined && me.levelForSearch.level != null)
				notiLevel = me.levelForSearch.level;
			if (me.notiForSearch != undefined && me.notiForSearch.id != null)
				facilityId = me.notiForSearch.id;
			
			//console.log("NotiHistory.js getNotiHistory() 2..." + notiLevel + "," + facilityId + "," + this.startDateTime + "," + this.endDateTime);
			
			axios.get(me.apiNotiHistory, {params: {
									size: this.size,
									page: (this.page - 1),
									startDate: this.startDateTime,
									endDate: this.endDateTime,
									orderBy: this.orderByDesc,
									notiLevel: notiLevel,
									facilityId: facilityId
									}})
				.then(res => {
					if (res != null && res.data != null) {
						if (res.data.totalElements > 0)			// total element counts
							me.isActivePage = true;
						me.totalPage = res.data.totalPages;		// total pages
						me.page = res.data.number + 1;			// cur page
						
						let no = 0;
						for (var i = 0; i < res.data.numberOfElements; i++) {							
							var obj = res.data.content[i];
							
							if (me.orderByDesc)
								no = res.data.totalElements - res.data.number * res.data.size - i;
							else
								no = res.data.number * res.data.size + 1 + i;
							
							obj.no = no;
							me.notiList.push(obj);
							//console.log("NotiHistory.js getNotiHistory() 5...#### index=" + i + ", " + no);
							//console.log(obj);
						}
						
						if(me.notiList.length > 0) {
							me.showNoData = false;
						} else {
							me.showNoData = true;
						}
					}
				})
				.catch(err => {					
					if (err.response) {
						me.error_message = err.response.data.message;
					} else if (err.request) {
						me.error_message = err.request;
					} else {
						me.error_message = err.message;
					}
					console.log(me.error_message);
				});			
		},
		getNotiHistoryWithPageNo: function(p) {
			this.page = parseInt(p);
			this.getNotiHistory();
		},
		onSelectLevelForSearch: function(level) {
			var me = this;
			me.levelForSearch = level;			
		},
		removeLevelForSearch: function() {
			var me = this;			
			me.levelForSearch = null;
		},
		onSelectNotiForSearch: function(noti) {
			var me = this;
			me.notiForSearch = noti;			
		},
		removeNotiForSearch: function() {
			var me = this;			
			me.notiForSearch = null;
		},
		transNotiLevelToString(level) {
			let me = this;
			let text = "";

			if (level == 0) {
				text = me.$i18n.t("notification.label.success");
			} else if (level == 1) {
				text = me.$i18n.t("notification.label.info");
			} else if (level == 2) {
				text = me.$i18n.t("notification.label.warning");
			} else {
				text = me.$i18n.t("notification.label.danger");
			}

			return text;
		},
		transNotiLevelToIcon(level) {
			let me = this;
			let symbolPath = "";

			if (level == 0) {
				symbolPath = me.greenIcon;
			} else if (level == 1) {
				symbolPath = me.blueIcon;
			} else if (level == 2) {
				symbolPath = me.yellowIcon;
			} else {
				symbolPath = me.redIcon;
			}
			
			return symbolPath;
		},
		subStyle: function() {
			return 'background: url("/static/images/user_reg_bg.jpg") no-repeat; background-size: 100% 100%;';
		},
		mainTitleStyle: function() {
			return "color: #ffdd00;"
		}
//		getNotiLevelToString(item) {
//			console.log('NotiHistory.js getNotiLevelToString() 1...' + item);
//			
//			let me = this;	
//			let text = "";
//
//			if (item.level == 0) {
//				text = me.$i18n.t("notification.label.success");
//			} else if (item.level == 1) {
//				text = me.$i18n.t("notification.label.info");
//			} else if (item.level == 2) {
//				text = me.$i18n.t("notification.label.warning");
//			} else {
//				text = me.$i18n.t("notification.label.danger");
//			}
//			
//			return text;
//		},
	},
	created: function () {
		
	},
	mounted: function () {
		var me = this;
		
		me.init();
		
		let today = new Date();
		today.setHours(0,0,0,0);		
		me.startDateTime = today;
		
		me.getFacilityList();
		
		//console.log('AirStatus.js mounted : myInfo....' + JSON.stringify(me.myInfo));
	}
});