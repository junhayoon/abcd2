
import airworkplacetemplate from './templates/AirSensorWorkplace.html.js'

export default Vue.component('AirWorkplace', {
	template: airworkplacetemplate,
	components: {
		Multiselect: window.VueMultiselect.default,
		'paginate' : VuejsPaginate,
	},
	data: function () {
		return {
			apiFacilityAirSensor: '/api/facility/airsensor',
			apiAirSensorStatus: '/api/airsensor/status',
			apiAirSensorLogs: '/api/airsensor/logs',
            apiAirPrediction: '/api/airsensor/prediction',
            redIcon: '/static/icons/icons8-red-circle-48.png',
			yellowIcon: '/static/icons/icons8-yellow-circle-48.png',
			greenIcon: '/static/icons/icons8-green-circle-48.png',
			blueIcon: '/static/icons/icons8-blue-circle-48.png',
            facilityList: [],
            airSensorStatusList: [],
			
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
		getFacility: function(id) {
			let items = this.facilityList.filter((item) => {
				return (item.fcode == id);
			});
			
			if(items != null && items.length > 0) return items[0];
			return null;
		},
		getFacilityList: function() {	// only air sensors
			var me = this;
			
			$('#cover-spin').show(0);
			this.$refs['viewMiniMap'].removeAllLayer();
			
			me.facilityList = [];
			
			axios.get(me.apiFacilityAirSensor, {
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
    				
    				if (res.data.length > 0) {
						me.getAirSensorStatusList();			
					}
    			}
    			
    			this.$refs['viewMiniMap'].setFacility(me.facilityList);
    			$('#cover-spin').hide();    			
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
		},
		getAirSensorStatusList: function() {
			var me = this;
			me.airSensorStatusList = [];			
			
			axios.get(me.apiAirSensorStatus)
    		.then(res => {
    			if(res != null && res.data != null) {
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					me.correctRecvAirSensorInfo(obj);    					
    					me.appendAirSensorStatusProps(obj);
    				}
    				
    				// for updating UI after receiving air status info
    				me.airSensorStatusList = me.facilityList;	
    			}
    		})
    		.catch(err => {    			   			
    		});
		},
		appendAirSensorStatusProps: function(airSensorStatus) {
			this.facilityList.forEach((item, index) => {				
				if(item.fcode == airSensorStatus.facility.fcode) {
					//console.log("appendAirSensorStatusProps() 1..." + item.id);
										
					//airSensorStatus.facility = {};
					item.airStatus = airSensorStatus;					
				}
			});
		},
		correctRecvAirSensorInfo: function(item) {
			var me = this;
			
			if (item != null && item != undefined) {
				if (item.pm10 < 0)
					item.pm10 = 0;
				else
					item.pm10 = parseFloat(item.pm10).toFixed(3);
					
				if (item.pm25 < 0)
					item.pm25 = 0;
				else
					item.pm25 = parseFloat(item.pm25).toFixed(3);
					
				if (item.pm1 < 0)
					item.pm1 = 0;
				else
					item.pm1 = parseFloat(item.pm1).toFixed(3);
					
				if (item.co2 < 0)
					item.co2 = 0;
				else
					item.co2 = parseInt(item.co2);
					
				if (item.tvoc < 0)
					item.tvoc = 0;
				else
					item.tvoc = parseInt(item.tvoc, 10);
					
				item.temp = parseFloat(item.temp).toFixed(1);
				item.humi = parseFloat(item.humi).toFixed(1);
								
				me.evalAirQuality(item);
			}			
		},
		correctRecvAirSensorLogs: function(logs) {
			var me = this;
			logs.forEach((item) => {
				me.correctRecvAirSensorInfo(item);
			});
		},
		onRefreshAirSensor: function(isNew) {
        	let me = this;
        	me.getFacilityList();
        },
        onSelectAirSensor: function(index) {
			this.$refs['viewMiniMap'].selectedSymbol(this.facilityList[index].fcode);
			
			var pt = [this.facilityList[index].longitude, this.facilityList[index].latitude];
			this.$refs['viewMiniMap'].setCenter(pt);
			
			$(event.target).closest('tr').addClass('bg-info').siblings().removeClass('bg-info');
		},
		onViewMiniMapSeletedSymbol: function(id) {
			for(var i=0; i<this.facilityList.length; i++) {
				if(this.facilityList[i].fcode == id) {
					this.$refs['viewMiniMap'].selectedSymbol(id);
					var trId = '#facility_' + i;
					$(trId).addClass('bg-info').siblings().removeClass('bg-info');
					break;
				}
			}
		},
		onOpenAirSensorDialog: function(index) {
			
			//this.currentAirSensor.properties = {};

			//let airsensor = this.airSensorStatusList[index];
			//this.currentAirSensor = $.extend(true, {}, airsensor);	// you must use deep copy.
			
			//this.currentFacility.createUserName = this.currentFacility.createUser != null ? this.currentFacility.createUser.name : '';
			//this.currentFacility.updateUserName = this.currentFacility.updateUser != null ? this.currentFacility.updateUser.name : '';
			
			//this.facilityEnableSelector.select(this.currentFacility.enabled ? 0 : 1);
			
			//this.currentFacility.properties = this.filteredFacilityItems[index].properties;
			
			//this.currentFacilityCategory = this.filteredFacilityItems[index].facilityCategory;				
			
			
			//$('#frmAirSensorFacility').modal('toggle');
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
			let pm10Grade = 1;
			let pm25Grade = 1;
			let pm1Grade = 1;
			let co2Grade = 1;
			let tvocGrade = 1;

			pm10Grade = me.evalPm10(item.pm10);
			if (airGrade < pm10Grade)
				airGrade = pm10Grade;
			
			pm25Grade = me.evalPm25(item.pm25);
			if (airGrade < pm25Grade)
				airGrade = pm25Grade;			
			
//			pm1Grade = me.evalPm1(item.pm1);
//			if (airGrade < pm1Grade)
//				airGrade = pm1Grade;
				
			co2Grade = me.evalCo2(item.co2);
			if (airGrade < co2Grade)
				airGrade = co2Grade;
				
			tvocGrade = me.evalTvoc(item.tvoc);
			if (airGrade < tvocGrade)
				airGrade = tvocGrade;			
			
			airQuality.airGrade = airGrade;
			airQuality.pm10Grade = pm10Grade;
			airQuality.pm25Grade = pm25Grade;
			airQuality.pm1Grade = pm1Grade;
			
			airQuality.co2Grade = co2Grade;
			airQuality.tvocGrade = tvocGrade;
			
			item.airQuality = airQuality;
			
			return airQuality;
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
//		evalPm1: function(val) {
//			const	PM1_GOOD_LEVEL_MAX_VALUE			= 30; 	// ug/m3
//			const	PM1_NORMAL_LEVEL_MAX_VALUE			= 80;
//			const	PM1_NOTGOOD_LEVEL_MAX_VALUE		= 150;
//	
//			let grade = 1;
//			
//			if (val < PM1_GOOD_LEVEL_MAX_VALUE)
//				grade = 1;
//			else if (val < PM1_NORMAL_LEVEL_MAX_VALUE)
//				grade = 2;
//			else if (val < PM1_NOTGOOD_LEVEL_MAX_VALUE)
//				grade = 3;
//			else
//				grade = 4;
//			
//			return grade;		
//		},
		evalCo2: function(val) {
			const	CO2_GOOD_LEVEL_MAX_VALUE			= 100; 	//ug/m3
			const	CO2_NORMAL_LEVEL_MAX_VALUE			= 450;
			const	CO2_NOTGOOD_LEVEL_MAX_VALUE			= 1000;
	
			let grade = 1;
			
			if (val < CO2_GOOD_LEVEL_MAX_VALUE)
				grade = 1;
			else if (val < CO2_NORMAL_LEVEL_MAX_VALUE)
				grade = 2;
			else if (val < CO2_NOTGOOD_LEVEL_MAX_VALUE)
				grade = 3;
			else
				grade = 4;
			
			return grade;	
		},		
		evalTvoc: function(val) {
			const	TVOC_GOOD_LEVEL_MAX_VALUE			= 0; 	//ug/m3
			const	TVOC_NORMAL_LEVEL_MAX_VALUE			= 1;
			const	TVOC_NOTGOOD_LEVEL_MAX_VALUE		= 2;
	
			let grade = 1;
			
			if (val <= TVOC_GOOD_LEVEL_MAX_VALUE)
				grade = 1;
			else if (val <= TVOC_NORMAL_LEVEL_MAX_VALUE)
				grade = 2;
			else if (val <= TVOC_NOTGOOD_LEVEL_MAX_VALUE)
				grade = 3;
			else
				grade = 4;
			
			return grade;	
		},
		subStyle: function() {
			return 'background: url("/static/images/user_reg_bg.jpg") no-repeat; background-size: 100% 100%;';
		},
		mainTitleStyle: function() {
			return "color: #58d901;"
		}
	},
	created: function () {
		
	},
	mounted: function () {
		var me = this;
		
		me.getFacilityList();
		
		//console.log('AirStatus.js mounted : myInfo....' + JSON.stringify(me.myInfo));
	}
});