
import template from '../templates/dashboard/alarmdashboard.html.js'
import i18n from '../../i18n/index.js'

export default Vue.component('alarmdashboard', {
	i18n,
	props: { airSensor: Object, pollutionStandard: Object, isFullScreen: Boolean, parentContainerId: String, controlFacilityId: String},
	template: template,
	data: function () {
		return {
			apiLastAirSensorInfo: '/api/airsensor/status',
			airSensorTimer: null,
			resizeTimer: null,
			colorIdx: 0,
			error_message: null,
			riskType : null,
			riskValue : null,
			standardValue : null,
			riskUnit : null,
			facilityName : null,
			create_date : null,
			airSensorBlink : null,
			autoControl: false,
			riskTypeCode: null,
			//messageMode: true,
			alarmFacilityOnControlling: false,
		}
	},
	computed: {
		
	},
	watch: {
		airSensor: function() {
			if (this.airSensor != null && this.airSensor != undefined) {
				//console.log("alarmdashboard.js watch this.airSensor.facility.id:" + this.airSensor.facility.id);
				//console.log("alarmdashboard.js watch this.airSensor.facility.facilityName:" + JSON.stringify(this.airSensor.facility.facilityName));
				//console.log("alarmdashboard.js watch this.airSensor.co2:" + JSON.stringify(this.airSensor.co2));
				
				//console.log("alarmdashboard.js watch airSensor call init");
				this.init();
			} else {
				//console.warn("alarmdashboard.js watch airSensor is undefined");
			}
		},
		isFullScreen: function() {
			
			this.updateNonoScrollbar();
		}
	},
	methods: {
		init: function() {
			
			//console.log("alarmdashboard.js init");
			
			if (this.airSensor == null) {
				this.airSensor = this.$parent.alarmAirSensor;
			}
			
			if (this.controlFacilityId === this.airSensor.facility.fcode) {
				this.alarmFacilityOnControlling = true;
			} else {
				this.alarmFacilityOnControlling = false;
			}
			
			if (this.airSensor != null) {
			
				//console.log("alarmdashboard.js init this.airSensor:"+JSON.stringify(this.airSensor));
				
				this.autoControl = this.$parent.alarmAirSensor.facility.autoControl;
				
				this.facilityName = this.airSensor.facility.facilityName;
				this.create_date = this.airSensor.create_date;
				this.riskTypeCode = this.$parent.airAlarmTypeCode;
				
				if (this.airSensor.pm10 >= this.pollutionStandard.pm10High) {
					//this.riskTypeCode = "pm10";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.pm10")+"(PM10)";
					this.riskValue = this.airSensor.pm10;
					this.riskUnit = '㎍/㎥';
					this.standardValue = this.pollutionStandard.pm10Low;
				} else if (this.airSensor.pm25 >= this.pollutionStandard.pm25High) {
					//this.riskTypeCode = "pm25";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.pm25")+"(PM2.5)";
					this.riskValue = this.airSensor.pm25;
					this.riskUnit = '㎍/㎥';
					this.standardValue = this.pollutionStandard.pm25Low;
				} else if (this.airSensor.co2 >= this.pollutionStandard.co2High) {
					//this.riskTypeCode = "co2";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.co2")+"(CO2)";
					this.riskValue = this.airSensor.co2;
					this.riskUnit = 'ppm';
					this.standardValue = this.pollutionStandard.co2Low;
				} else if (this.airSensor.tvoc >= this.pollutionStandard.tvocHigh) {
					//this.riskTypeCode = "tvoc";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.tvoc")+"(TVOC)";
					this.riskValue = this.airSensor.tvoc;
					this.riskUnit = 'Grade';
					this.standardValue = this.pollutionStandard.tvocLow;
				} else if (this.airSensor.pm1 >= this.pollutionStandard.pm1High) {
					//this.riskTypeCode = "pm1";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.pm1")+"(PM1.0)";
					this.riskValue = this.airSensor.pm1;
					this.riskUnit = '㎍/㎥';
					this.standardValue = this.pollutionStandard.pm1Low;
				} else if (this.airSensor.pm10 >= this.pollutionStandard.pm10Middle) {
					//this.riskTypeCode = "pm10";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.pm10")+"(PM10)";
					this.riskValue = this.airSensor.pm10;
					this.riskUnit = '㎍/㎥';
					this.standardValue = this.pollutionStandard.pm10Low;
				} else if (this.airSensor.pm25 >= this.pollutionStandard.pm25Middle) {
					//this.riskTypeCode = "pm25";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.pm25")+"(PM2.5)";
					this.riskValue = this.airSensor.pm25;
					this.riskUnit = '㎍/㎥';
					this.standardValue = this.pollutionStandard.pm25Low;
				} else if (this.airSensor.co2 >= this.pollutionStandard.co2Middle) {
					//this.riskTypeCode = "co2";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.co2")+"(CO2)";
					this.riskValue = this.airSensor.co2;
					this.riskUnit = 'ppm';
					this.standardValue = this.pollutionStandard.co2Low;
				} else if (this.airSensor.tvoc >= this.pollutionStandard.tvocMiddle) {
					//this.riskTypeCode = "tvoc";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.tvoc")+"(TVOC)";
					this.riskValue = this.airSensor.tvoc;
					this.riskUnit = 'Grade';
					this.standardValue = this.pollutionStandard.tvocLow;
				} else if (this.airSensor.pm1 >= this.pollutionStandard.pm1Middle) {
					//this.riskTypeCode = "pm1";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.pm1")+"(PM1.0)";
					this.riskValue = this.airSensor.pm1;
					this.riskUnit = '㎍/㎥';
					this.standardValue = this.pollutionStandard.pm1Low;
				} else if (this.airSensor.pm10 >= this.pollutionStandard.pm10Low) {
					//this.riskTypeCode = "pm10";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.pm10")+"(PM10)";
					this.riskValue = this.airSensor.pm10;
					this.riskUnit = '㎍/㎥';
					this.standardValue = this.pollutionStandard.pm10Low;
				} else if (this.airSensor.pm25 >= this.pollutionStandard.pm25Low) {
					//this.riskTypeCode = "pm25";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.pm25")+"(PM2.5)";
					this.riskValue = this.airSensor.pm25;
					this.riskUnit = '㎍/㎥';
					this.standardValue = this.pollutionStandard.pm25Low;
				} else if (this.airSensor.co2 >= this.pollutionStandard.co2Low) {
					//this.riskTypeCode = "co2";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.co2")+"(CO2)";
					this.riskValue = this.airSensor.co2;
					this.riskUnit = 'ppm';
					this.standardValue = this.pollutionStandard.co2Low;
				} else if (this.airSensor.tvoc >= this.pollutionStandard.tvocLow) {
					//this.riskTypeCode = "tvoc";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.tvoc")+"(TVOC)";
					this.riskValue = this.airSensor.tvoc;
					this.riskUnit = 'Grade';
					this.standardValue = this.pollutionStandard.tvocLow;
				} else if (this.airSensor.pm1 >= this.pollutionStandard.pm1Low) {
					//this.riskTypeCode = "pm1";
					this.riskType = this.$i18n.t("frontend.dashboard.airSensor.pm1")+"(PM1.0)";
					this.riskValue = this.airSensor.pm1;
					this.riskUnit = '㎍/㎥';
					this.standardValue = this.pollutionStandard.pm1Low;
				} else {
					// 등급이 낮아진 경우에도 업데이트 필요
					if (this.riskTypeCode === "pm10") {
						this.riskValue = this.airSensor.pm10;
					} else if (this.riskTypeCode === "pm25") {
						this.riskValue = this.airSensor.pm25;
					} else if (this.riskTypeCode === "co2") {
						this.riskValue = this.airSensor.co2;
					} else if (this.riskTypeCode === "tvoc") {
						this.riskValue = this.airSensor.tvoc;
					} else if (this.riskTypeCode === "pm1") {
						this.riskValue = this.airSensor.pm1;
					}
					
					this.alarmFacilityOnControlling = false;
					this.$parent.control_alarm_facility_id = null;
					this.controlFacilityId = null;
					
					clearInterval(this.airSensorBlink);
				}
				
				//console.log("this.riskValue:"+this.riskValue);
				//console.log("this.standardValue:"+this.standardValue);
				
				//this.airSensorTimer = setInterval(this.getLastAirSensorInfo, 1000*5);
				
				if (this.airSensorBlink == null) {
		
					//console.log("call airSensorBlink");
		
					this.airSensorBlink = setInterval(function(){
				
					  	$(".blink1").toggle();
				
					}, 800);
				}
			}

		},
		/*
		getLastAirSensorInfo: function() {
			var me = this;			
			this.airSensor = {};
			
			axios.get(this.apiLastAirSensorInfo+"/"+facility.id)
    		.then(res => {
    			if(res != null && res.data != null) {
    				this.airSensor = res.data;
    				this.correctRecvAirSensor(this.airSensor);
    			}
    		})
    		.catch(err => {
    			    			
    		});
		},
		correctRecvAirSensor: function(airData) {

		},*/
		onResize: function(ev) {

			this.updateNonoScrollbar();
			
			if(this.resizeTimer != null) {
				clearTimeout(this.resizeTimer);
				this.resizeTimer = null;
			}
			
			this.resizeTimer = setTimeout(() => {
				//this.redrawChart();
			}, 500);
		},
		updateNonoScrollbar: function(option) {
			
			// top과 bottom의 padding 2px만큼 더 빼기 위해 4를 추가로 뺌
			let h = $("#" + this.parentContainerId).height() - $("#" + this.parentContainerId).children().first().height() - 4;				
			$("#airSensorControlContainer").css("height", h + "px");						
			$(".nano").nanoScroller(option);
			$(".nano-content").css("margin-right", "0px");
			
		},
		openAirSensorControl: function() {
			
			if(this.$parent.dashboardManage.airSensorControl.isOpen) {
				this.$parent.dashboardManage.airSensorControl.isOpen = false;
				setTimeout(() => {
					this.$parent.dashboardManage.airSensorControl.isOpen = true;
				}, 100);
			} else {
				this.$parent.dashboardManage.airSensorControl.isOpen = true;
			}
			
			//this.$parent.control_alarm_facility_id = this.airSensor.facility.id;
			
		},
	},
	created: function () {
		//console.log("$$$ alarm created");		
		//this.controlFacilityId = this.$parent.control_alarm_facility_id;
	},
	mounted: function () {
	
		//console.log("$$$ alarm mounted airSensor:"+JSON.stringify(this.airSensor));
		
		this.autoControl = this.$parent.alarmAirSensor.facility.autoControl;
		
		if (this.$parent.alarmAirSensor != null) {
			//console.log("$$$ alarm mounted airSensor:"+JSON.stringify(this.$parent.alarmAirSensor.facility.facilityName));
			//console.log("alarmdashboard.js mounted call init");
			
			this.init();
			
			$("#" + this.parentContainerId).on('resize', this.onResize);
			this.updateNonoScrollbar();
			
		}
		
		//console.log("alarmdashboard.js mounted end...");
	},
	updated: function() {
	
		//console.log("$$$ alarm updated this.controlFacilityId:"+this.controlFacilityId);
		
		//this.init();
	},
	beforeDestroy: function() {
		//this.clearTimer();
		clearInterval(this.airSensorBlink);
		clearInterval(this.airSensorTimer);
	},
});