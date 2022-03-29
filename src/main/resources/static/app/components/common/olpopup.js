
import template from '../templates/common/olpopup.html.js'
import i18n from '../../i18n/index.js'

export default Vue.component('olpopup', {
	template: template,
	i18n,
	props: [ 'isOpenFireCCTV', 'isOpenAirSensor', 'isOpenAirSensorControl', 'isOpenDroneStation', 'myInfo', 'onToggleFireCCTV','isOpenUticCCTV'],
	components: {
		
	},
	data: function () {
		return {
			facility: {
				facilityCategory: {
					properties: []
				}
			},
			properties: [],
			apiFacilityStatus: '/api/facility/status',
			apiFacilitySymbol: '/api/facility/symbol',
			apiLastAirSensorInfo: '/api/airsensor/status',
			redIcon: '/static/images/status_bad.png',
			yellowIcon: '/static/images/status_warning.png',
			greenIcon: '/static/images/status_normal.png',
			blueIcon: '/static/images/status_good.png',
			facilityStatusLabels: [],
			airSensor: null,
			recvAirSensor: null,
			olpopupComp: null,
		}
	},
	computed: {
		statusName: function() {
			return this.getFacilityStatusName(this.facility.status);
		},
		isFireCCTV: function() {
			return this.facility.facilityCategory.ccode == 'CCTV_FIRE';
		},
		isAirSensor: function() {
			return this.facility.facilityCategory.ccode == 'AIR_SENSOR';
		},
		isDroneStation: function() {
			return this.facility.facilityCategory.ccode == 'DRONE_STATION';
		},
		isParkingLot: function() {
			return this.facility.facilityCategory.ccode == 'PARKING_LOT';
		},
		isStreetLight: function() {
			return this.facility.facilityCategory.ccode == 'STREET_LIGHT';
		},
		isAirCleaner: function() {
			return this.facility.facilityCategory.ccode == 'AIR_CLEANER';
		},
		isAirSensor: function() {
			return this.facility.facilityCategory.ccode == 'AIR_SENSOR';
		},
		isFireSensor: function() {
			return this.facility.facilityCategory.ccode == 'FIRE_SENSOR';
		},
		isGasSensor: function() {
			return this.facility.facilityCategory.ccode == 'GAS_SENSOR';
		},
		isUticCctv: function() {
			return this.facility.facilityCategory.ccode == 'UTIC_CCTV';
		},
	},
	watch: {
		myInfo(state) {
			//console.log('olpopup.js watch 1... myInfo');							
		},
		facility: function() {					// updated facility information
			var me = this;
				
			if (this.facility.fcode != null) {
				if (this.facility.facilityCategory.ccode == 'CCTV_FIRE') {

				} else if(this.facility.facilityCategory.ccode == 'AIR_SENSOR') {
					this.getLastAirSensorInfo();
				}
				else if(this.facility.facilityCategory.ccode == 'DRONE_STATION') {

				}				
			}
		},
		recvAirSensor: function() {
			var me = this;
			
			// 아래 if문은 시설물등록은 되어있지만 한번도 사업장대기정보를 받지못한 경우 처리
			if (me.airSensor.facility != null && me.airSensor.facility != undefined) {
				if (me.airSensor.facility.fcode == me.recvAirSensor.facility.fcode) {
					me.evalAirQuality(me.recvAirSensor);	
					me.airSensor = me.recvAirSensor;
				}
			}
		}
	},
	filters: {
		
	},
	methods: {
		trafficOpen: function(facility){
			if(facility.facilityCategory.ccode=="UTIC_CCTV"){
				var link = facility.properties.uri;
				window.open(link,'교통정보','width=400, height=350');
			}
		},
		setFacility: function(facility) {
			this.facility = facility;
			
			this.trafficOpen(facility);
			// 장비 상태에 대한 문자값 가져오기
			this.getFacilityStatusLabels();			
			this.facility.categorySymbolPath = this.apiFacilitySymbol + '/' + this.facility.facilityCategory.categorySymbol + '.png';
		},
		getFacilityStatusLabels: function() {
			var me = this;
			
			axios.get(me.apiFacilityStatus)
    		.then(res => {
    			if(res != null && res.data != null) {
    				me.facilityStatusLabels = res.data;
    			}
    		})
    		.catch(err => {
    			
    		});
		},
		getFacilityStatusName: function(value) {
			for(let i=0; i<this.facilityStatusLabels.length; i++) {
				if(value == this.facilityStatusLabels[i].value) {
					return this.facilityStatusLabels[i].label;
				}
 			}
			return 'Invalid'
		},
		getFacility: function() {
			return this.facility;
		},
		getLastAirSensorInfo: function() {
			var me = this;			
			me.airSensor = {};
			
			axios.get(me.apiLastAirSensorInfo+"/"+this.facility.fcode)
    		.then(res => {
    			if(res != null && res.data != null) {
    				me.airSensor = res.data;
    				me.correctRecvAirSensor(me.airSensor);
    			}
    		})
    		.catch(err => {
    			    			
    		});
		},
		correctRecvAirSensor: function(airData) {
			let me = this;
			
			if (airData.pm25 < 0)
				airData.pm25 = 0;				
			if (airData.pm10 < 0)
				airData.pm10 = 0;
				
			if (airData.no2 < 0)
				airData.no2 = 0;
			else
				airData.no2 = parseFloat(airData.no2/1000).toFixed(3);
				
			if (airData.co < 0)
				airData.co = 0;
			else
				airData.co = parseFloat(airData.co/1000).toFixed(3);
								
			if (airData.o3_org < 0)
				airData.o3_org = 0;
			else
				airData.o3_org = parseFloat(airData.o3_org/1000).toFixed(3);
								
			if (airData.so2_org < 0)
				airData.so2_org = 0;
			else
				airData.so2_org = parseFloat(airData.so2_org/1000).toFixed(3);
				
			me.evalAirQuality(airData);
		},
		closePopup: function() {
			let me = this;
			if(this.isCCTV && this.facility != null && this.facility.fcode != null) {
				if(me.unrealPlayer != null) {
					me.unrealPlayer.stop();
					me.unrealPlayer = null;
				}
			}
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
			
//			let airGrade = 1;		// 1:good, 2:normal, 3:not good, 4:bad
//			let pm25Grade = 1;
//			let pm10Grade = 1;
//			let no2Grade = 1;
//			let coGrade = 1;
//			let o3Grade = 1;
//			let so2Grade = 1;
//			
//			pm25Grade = me.evalPm25(item.pm25);
//			if (airGrade < pm25Grade)
//				airGrade = pm25Grade;			
//			
//			pm10Grade = me.evalPm10(item.pm10);
//			if (airGrade < pm10Grade)
//				airGrade = pm10Grade;			
//							
//			no2Grade = me.evalNo2(item.no2);
//			if (airGrade < no2Grade)
//				airGrade = no2Grade;			
//			
//			coGrade = me.evalCo(item.co);
//			if (airGrade < coGrade)
//				airGrade = coGrade;			
//			
//			o3Grade = me.evalO3(item.o3_org);
//			if (airGrade < o3Grade)
//				airGrade = o3Grade;
//			
//			so2Grade = me.evalSo2(item.so2_org);
//			if (airGrade < so2Grade)
//				airGrade = so2Grade;
//			
//			airQuality.airGrade = airGrade;
//			airQuality.pm25Grade = pm25Grade;
//			airQuality.pm10Grade = pm10Grade;
//			airQuality.no2Grade = no2Grade;
//			airQuality.coGrade = coGrade;
//			airQuality.o3Grade = o3Grade;
//			airQuality.so2Grade = so2Grade;
			
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
		onCCTVPopup: function() {
			this.onToggleFireCCTV(true, this.facility);
		},
	},
	created: function () {
		
	},
	mounted: function () {
		var me = this;
		//console.log("olpopup.js mounted 1..." + JSON.stringify(me.myInfo));
		//console.log("olpopup.js mounted 1...");
	},
	updated: function () {
		let me = this;
		
		//console.log("olpopup.js updated 1...me.airSensor : " + JSON.stringify(me.airSensor));
		//console.log("olpopup.js updated 1... ^^^" + me.airSensor.pm25);
		//console.log("olpopup.js updated 1..." + me.airSensor.pm10);
		//console.log("olpopup.js updated 1..." + me.airSensor.no2);
		//console.log("olpopup.js updated 1..." + me.airSensor.co);
		//console.log("olpopup.js updated 1..." + me.airSensor.o3_org);
		//console.log("olpopup.js updated 1..." + me.airSensor.so2_org);
		
		this.$nextTick(function () {
			$( "#facilityPopup" ).trigger( "afterrendered" );
		});
		
		
	}
});