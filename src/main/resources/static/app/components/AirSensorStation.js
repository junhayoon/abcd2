
import airstationtemplate from './templates/AirSensorStation.html.js'

export default Vue.component('AirStation', {
	template: airstationtemplate,
	components: {
		Multiselect: window.VueMultiselect.default,
		'paginate' : VuejsPaginate,
	},
	data: function () {
		return {
			apiAirStation: '/api/airstation/station',
			apiAirStationToday: '/api/airstation/today',
			apiAirStationLogs: '/api/airstation/logs',
  
            redIcon: '/static/icons/icons8-red-circle-48.png',
			yellowIcon: '/static/icons/icons8-yellow-circle-48.png',
			greenIcon: '/static/icons/icons8-green-circle-48.png',
			blueIcon: '/static/icons/icons8-blue-circle-48.png',

            airStationList: [],
            airStationToday: [],
            airStationLogs: [],  
            airStationForSearch: null,            
            startDateTime: new Date(),
			endDateTime: new Date(),
			
			size: 50,
			totalPage: 0,
			page: 1,			
			isActivePage: false,
			orderByDesc: true,
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
			this.getAirStationList();			
		},
		getAirStation: function(id) {
			let items = this.airStationList.filter((item) => {
				return (item.id == id);
			});
			
			if(items != null && items.length > 0) return items[0];
			return null;		
		},
		getAirStationList: function() {
			var me = this;
			
			//console.log("AirStation.js getAirStationList() 1...");
			
			$('#cover-spin').show(0);			
			this.$refs['viewMiniMap'].removeAllLayer();
			
			me.airStationList = [];			
			
			axios.get(me.apiAirStation)
    		.then(res => {
    			if(res != null && res.data != null) {
    				let category = {categorySymbol:"air-sensor", categorySymbolRemovable: false};
    				
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					
    					let item = {id: obj.code, facilityName: obj.name, longitude: obj.longitude, latitude: obj.latitude, facilityCategory: category};
    					me.airStationList.push(item);
    				}
    				
    				if (res.data.length > 0) {
						me.getAirStationToday();			
					}
    			}
    			
    			this.$refs['viewMiniMap'].setFacility(me.airStationList);
    			$('#cover-spin').hide();    			
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
    		
    		//console.log("AirStation.js getAirStationList() end...");
		},		
		getAirStationToday: function() {
			var me = this;
			me.airStationToday = [];
			
			//console.log("AirStation.js getAirStationToday() 1...");

			axios.get(me.apiAirStationToday)
    		.then(res => {
    			if(res != null && res.data != null) {
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					me.correctRecvAirStationInfo(obj);    					
    					me.appendAirStationStatus(obj);
    				}
    				
    				// for updating UI after receiving air station info
    				me.airStationToday = me.airStationList;	
    			}
    		})
    		.catch(err => {  
    			console.log("AirStation.js getAirStationToday() err...");  			   			
    		});
			    		
    		//console.log("AirStation.js getAirStationToday() end...");
		},
		appendAirStationStatus: function(airStationStatus) {
			this.airStationList.forEach((item, index) => {				
				if(item.id == airStationStatus.code) {
					//console.log("appendAirStationStatus() 1..." + item.id);
			
					item.airStatus = airStationStatus;					
				}
			});
		},
		correctRecvAirStationInfo: function(item) {
			var me = this;
			
			if (item != null && item != undefined) {
				if (item.pm25 < 0)
					item.pm25 = 0;
				if (item.pm10 < 0)
					item.pm10 = 0;
					
				if (item.no2 < 0)
					item.no2 = 0;
				else
					item.no2 = parseFloat(item.no2).toFixed(3);
				
				if (item.co < 0)
					item.co = 0;
				else
					item.co = parseFloat(item.co).toFixed(3);
					
				if (item.o3 < 0)
					item.o3 = 0;
				else
					item.o3 = parseFloat(item.o3).toFixed(3);
					
				if (item.so2 < 0)
					item.so2 = 0;
				else
					item.so2 = parseFloat(item.so2).toFixed(3);
					
				me.evalAirQuality(item);
			}			
		},
		correctRecvAirStationLogs: function(logs) {
			var me = this;
			logs.forEach((item) => {
				me.correctRecvAirStationInfo(item);
			});
		},
		onRefreshAirStation: function(isNew) {
        	let me = this;
        	me.getAirStationList();
        },
        onSelectAirStation: function(index) {
			this.$refs['viewMiniMap'].selectedSymbol(this.airStationList[index].id);
			
			// 지도 중앙으로 심볼 이동
			var pt = [this.airStationList[index].longitude, this.airStationList[index].latitude];
			this.$refs['viewMiniMap'].setCenter(pt);
			
			$(event.target).closest('tr').addClass('bg-info').siblings().removeClass('bg-info');
		},
		onViewMiniMapSeletedSymbol: function(id) {
			for(var i=0; i<this.airStationList.length; i++) {
				if(this.airStationList[i].id == id) {
					this.$refs['viewMiniMap'].selectedSymbol(id);
					var trId = '#facility_' + i;
					$(trId).addClass('bg-info').siblings().removeClass('bg-info');
					break;
				}
			}
		},
		onOpenAirStationDialog: function(index) {			
		},			
		getAirStationLogs: function() {
			var me = this;
						
			let station = -1;			
			me.isActivePage = false;
			me.airStationLogs = [];
			
			if (me.airStationForSearch != undefined && me.airStationForSearch.id != null)
				station = me.airStationForSearch.id;
			
			//console.log("AirStatus.js getAirStationLogs() 1..." + station);
			
			axios.get(me.apiAirStationLogs, {params: {
									size: this.size,
									page: (this.page - 1),
									startDate: this.startDateTime,
									endDate: this.endDateTime,
									orderBy: this.orderByDesc,
									station: station
									}})
				.then(res => {
					if (res != null && res.data != null) {	
						for (var i = 0; i < res.data.length; i++) {							
							let obj = res.data[i];
							let facility = me.getAirStation(obj.code);
							
							obj.no = i;
							obj.facility = facility;
							me.correctRecvAirStationInfo(obj);
							me.airStationLogs.push(obj);
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
			
			//console.log("AirStatus.js getAirStationLogs() end...");		
		},
		getAirStationLogsyWithPageNo: function(p) {
			this.page = parseInt(p);
			this.getAirStationLogs();
		},
		transAirStatusToString(grade) {
			let me = this;
			let status = "";

			if (grade == 1) {
				status = me.$i18n.t("airSensor.grade_1");
			} else if (grade == 2) {
				status = me.$i18n.t("airSensor.grade_2");
			} else if (grade == 3) {
				status = me.$i18n.t("airSensor.grade_3");
			} else {		// BAD
				status = me.$i18n.t("airSensor.grade_4");
			}
			
			return status;
		},
		transAirStatusToIcon(grade) {
			let me = this;
			let symbolPath = "";

			if (grade == 1) {
				symbolPath = me.blueIcon;
			} else if (grade == 2) {
				symbolPath = me.greenIcon;
			} else if (grade == 3) {
				symbolPath = me.yellowIcon;
			} else {		// BAD
				symbolPath = me.redIcon;
			}
			
			return symbolPath;
		},
		evalAirQuality: function(item) {
			let me = this;
			
			let airQuality = {};
			
			let airGrade = 1;		// 1:good, 2:normal, 3:not good, 4:bad
			let pm25Grade = 1;
			let pm10Grade = 1;
			let no2Grade = 1;
			let coGrade = 1;
			let o3Grade = 1;
			let so2Grade = 1;
			
			pm25Grade = me.evalPm25(item.pm25);
			if (airGrade < pm25Grade)
				airGrade = pm25Grade;			
			
			pm10Grade = me.evalPm10(item.pm10);
			if (airGrade < pm10Grade)
				airGrade = pm10Grade;			
							
			no2Grade = me.evalNo2(item.no2);
			if (airGrade < no2Grade)
				airGrade = no2Grade;			
			
			coGrade = me.evalCo(item.co);
			if (airGrade < coGrade)
				airGrade = coGrade;			
			
			o3Grade = me.evalO3(item.o3);
			if (airGrade < o3Grade)
				airGrade = o3Grade;
			
			so2Grade = me.evalSo2(item.so2);
			if (airGrade < so2Grade)
				airGrade = so2Grade;
			
			airQuality.airGrade = airGrade;
			airQuality.pm25Grade = pm25Grade;
			airQuality.pm10Grade = pm10Grade;
			airQuality.no2Grade = no2Grade;
			airQuality.coGrade = coGrade;
			airQuality.o3Grade = o3Grade;
			airQuality.so2Grade = so2Grade;
			
			item.airQuality = airQuality;
			
			return airQuality;
		},	
		evalPm25: function(val) {
			const	PM25_GOOD_LEVEL_MAX_VALUE			= 15; 	//ug/m3
			const	PM25_NORMAL_LEVEL_MAX_VALUE			= 35;
			const	PM25_NOTGOOD_LEVEL_MAX_VALUE		= 75;
	
			let grade = 1;
			
			if (val < PM25_GOOD_LEVEL_MAX_VALUE)
				grade = 1;
			else if (val < PM25_NORMAL_LEVEL_MAX_VALUE)
				grade = 2;
			else if (val < PM25_NOTGOOD_LEVEL_MAX_VALUE)
				grade = 3;
			else
				grade = 4;
			
			return grade;		
		},
		evalPm10: function(val) {
			const	PM10_GOOD_LEVEL_MAX_VALUE			= 30; 	// ug/m3
			const	PM10_NORMAL_LEVEL_MAX_VALUE			= 80;
			const	PM10_NOTGOOD_LEVEL_MAX_VALUE		= 150;
	
			let grade = 1;
			
			if (val < PM10_GOOD_LEVEL_MAX_VALUE)
				grade = 1;
			else if (val < PM10_NORMAL_LEVEL_MAX_VALUE)
				grade = 2;
			else if (val < PM10_NOTGOOD_LEVEL_MAX_VALUE)
				grade = 3;
			else
				grade = 4;
			
			return grade;		
		},
		evalNo2: function(val) {
			const	NO2_GOOD_LEVEL_MAX_VALUE			= 0.03; // ppm
			const	NO2_NORMAL_LEVEL_MAX_VALUE			= 0.06;
			const	NO2_NOTGOOD_LEVEL_MAX_VALUE			= 0.2;
			
			let grade = 1;
			
			if (val < NO2_GOOD_LEVEL_MAX_VALUE)
				grade = 1;
			else if (val < NO2_NORMAL_LEVEL_MAX_VALUE)
				grade = 2;
			else if (val < NO2_NOTGOOD_LEVEL_MAX_VALUE)
				grade = 3;
			else
				grade = 4;
			
			return grade;
		},
		evalCo: function(val) {
			const	CO_GOOD_LEVEL_MAX_VALUE				= 2; 	// ppm
			const	CO_NORMAL_LEVEL_MAX_VALUE			= 9;
			const	CO_NOTGOOD_LEVEL_MAX_VALUE			= 15;
			
			let grade = 1;
	
			if (val < CO_GOOD_LEVEL_MAX_VALUE)
				grade = 1;								// good
			else if (val < CO_NORMAL_LEVEL_MAX_VALUE)
				grade = 2;								// normal
			else if (val < CO_NOTGOOD_LEVEL_MAX_VALUE)
				grade = 3;								// not good
			else
				grade = 4;								// bad
			
			return grade;
		},
		evalO3: function(val) {
			const	O3_GOOD_LEVEL_MAX_VALUE				= 0.03; // ppm
			const	O3_NORMAL_LEVEL_MAX_VALUE			= 0.09;
			const	O3_NOTGOOD_LEVEL_MAX_VALUE			= 0.15;

			let grade = 1;
			
			if (val < O3_GOOD_LEVEL_MAX_VALUE)
				grade = 1;
			else if (val < O3_NORMAL_LEVEL_MAX_VALUE)
				grade = 2;
			else if (val < O3_NOTGOOD_LEVEL_MAX_VALUE)
				grade = 3;
			else
				grade = 4;
			
			return grade;
		},
		evalSo2: function(val) {
			const	SO2_GOOD_LEVEL_MAX_VALUE			= 0.02; // ppm
			const	SO2_NORMAL_LEVEL_MAX_VALUE			= 0.05;
			const	SO2_NOTGOOD_LEVEL_MAX_VALUE			= 0.15;
	
			let grade = 1;
			
			if (val < SO2_GOOD_LEVEL_MAX_VALUE)
				grade = 1;
			else if (val < SO2_NORMAL_LEVEL_MAX_VALUE)
				grade = 2;
			else if (val < SO2_NOTGOOD_LEVEL_MAX_VALUE)
				grade = 3;
			else
				grade = 4;
						
			return grade;
		},		
		onSelectAirStationForSearch: function(airStation) {
			var me = this;
			me.airStationForSearch = airStation;			
		},
		onRemoveAirStationForSearch: function() {
			var me = this;			
			me.airStationForSearch = null;
		},
		dateStringFromStation: function (recvDate) {
			let result = String(recvDate);
			
			if (result != null && result.length >= 10) {
				result = result.substr(0, 4) + "-" + result.substr(4, 2) + "-" + result.substr(6, 2);
				//result = result.substr(0, 4) + "-" + result.substr(4, 2) + "-" + result.substr(6, 2) + " " + result.substr(8, 2);
			} 
				
			return result;
		}
	},
	created: function () {
		
	},
	mounted: function () {
		var me = this;
		
		let today = new Date();
		today.setHours(0,0,0,0);		
		me.startDateTime = today;
		
		me.init();
		
		//console.log('AirStatus.js mounted : myInfo....' + JSON.stringify(me.myInfo));
	}
});