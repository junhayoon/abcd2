
import template from '../templates/dashboard/airsensorstationdashboard.html.js'
import i18n from '../../i18n/index.js'

export default Vue.component('airsensorstationdashboard', {
	i18n,
	props: { alarmAirSensor: Object, isOpenAirSensorStation: Boolean, isFullScreen: Boolean, parentContainerId: String},
	template: template,
	data: function () {
		return {
			//apiStationList: '/api/airstation/station',
			apiStationlogs: '/api/airstation/curlogs',
			defaultLogCnt: 10,
			maxLogCnt: 10,			
			stationSelector: null,		
			selectedStationCode: null,
			stationLogs: {},
			stationLogStyle: {
				pm10: 'color: white;'
				, pm25: 'color: white;'
				, o3: 'color: white;'
				, no2: 'color: white;'
				, co: 'color: white;'
				, so2: 'color: white;'
			},
			stationLogsSuccess: true,
			grade: {
				pm10: ''
				, pm25: ''
				, o3: ''
				, no2: ''
				, co: ''
				, so2: ''
			},	
			timerSwitch: null,
			resizeTimer: null,
			
			timerSwitchCycle: 1000*10,
			timerSwitchCnt: 0,
			timerReloadCnt: 2*60,	// 1시간
			airAlarmTypeCode: null,
		}
	},
	computed: {
	},
	watch: {
		isOpenAirSensorStation: function() {
			this.init();
		},		
		isFullScreen: function() {
			let me = this;
			
			me.updateNonoScrollbar();
		},
	},
	methods: {
		init: function() {
			let me = this;
			
			console.log("airsensorstationdashboard.js init() this.$parent.airAlarmTypeCode:"+this.$parent.airAlarmTypeCode);
			this.airAlarmTypeCode = this.$parent.airAlarmTypeCode;
			
			if(me.isOpenAirSensorStation) {
				me.createSelector();
			}
			
			this.stationLogStyle[this.airAlarmTypeCode] = "color: #ff07ca; font-weight: bold";
			
			console.log("airsensorstationdashboard.js init() end...");
		},
		createTimer: function() {
			let me = this;
			
			me.clearTimer();
			
			this.handleTimerSwitch();
			
			me.timerSwitch = setInterval(this.handleTimerSwitch, me.timerSwitchCycle);
		},
		clearTimer: function() {
			let me = this;

			if (me.timerSwitch != null) {
				clearInterval(me.timerSwitch);
				me.timerSwitch = null;
			}
			if (me.resizeTimer != null) {
				clearInterval(me.resizeTimer);
				me.resizeTimer = null;
			}
		},
		handleTimerSwitch: function() {
			var me = this;
						
			if (me.isOpenAirSensorStation) {
				
				me.getNextStationLogs();
			}
			
			//console.log("airsensorstationdashboard.js handleTimerSwitch() end...");			
		},
		createSelector: function() {
			let me = this;
			
			console.log("airsensorstationdashboard.js createSelector me.stationSelector:" + me.stationSelector);
			console.log("airsensorstationdashboard.js createSelector this.$parent.airsensorStations:" + this.$parent.airsensorStations);
			
			if(this.$parent.airsensorStations != null && this.$parent.airsensorStations.length > 0) {
				console.log("airsensorstationdashboard.js createSelector this.$parent.airsensorStations.length:" + this.$parent.airsensorStations.length);
				let statioinItemData = [];
				this.$parent.airsensorStations.forEach((item) => {
					statioinItemData.push({
						label: item.name,
						value: item.code
					});
				});
				
				if(this.stationSelector == null) {
					this.stationSelector = new tui.SelectBox('#stationSelector', {
						data: statioinItemData,
						autofocus: false,
						showIcon: true
					});
					
					this.stationSelector.on('change', (ev) => {
						me.onChangeStationSelector(ev.prev.getValue(), ev.curr.getValue());
					});
					
					console.log("airsensorstationdashboard.js createSelector me.alarmAirSensor.facility.weatherStation.code:" + me.alarmAirSensor.facility.weatherStation.code);
					if (!me.alarmAirSensor.facility) {
						this.stationSelector.select(me.alarmAirSensor.facility.weatherStation.code.toString());
					}
					
					me.selectedStationCode = me.stationSelector.getSelectedItem().value;
					
					me.updateNonoScrollbar();
					
					me.createTimer();
				}
			}
			
			//console.log("airsensorstationdashboard.js createSelector() end...");
		},
		getNextStationLogs: function() {
			var me = this;
			let nextIdx = 0;
			
			let i = 0;
			for(i=0;i<this.$parent.airsensorStations.length;i++)
			{
				if (this.$parent.airsensorStations[i].code == me.stationSelector.getSelectedItem().value) {
					break;
				}
			}
			//console.log("airsensorstationdashboard.js getNextStationLogs() curIdx:"+i);
			
			nextIdx = i + 1;
			
			if (nextIdx > (this.$parent.airsensorStations.length-1)) {
				nextIdx = 0;
			}
			
			//console.log("airsensorstationdashboard.js getNextStationLogs() nextIdx:"+nextIdx);
			
			me.selectedStationCode = this.$parent.airsensorStations[nextIdx].code;
			
			this.stationSelector.select(this.$parent.airsensorStations[nextIdx].code.toString());
			
			//console.log("airsensorstationdashboard.js getNextStationLogs() end...");			
		},
		getStationLogs: function() {
			var me = this;
			
			//console.log("airsensorstationdashboard.js getStationLogs me.selectedStationCode:"+me.selectedStationCode);
			
			//let curTime = new Date();
			let startTime = moment().subtract(1, 'days').format('YYYY-MM-DDTHH:mm:ss'); // 최근 24시간 데이터
			let endTime = moment().format('YYYY-MM-DDTHH:mm:ss');
			
			//startTime.setHours(curTime.getHours()-24, 0, 0, 0); // 최근 24시간 데이터
			//endTime.setHours(curTime.getHours()+2, 0, 0, 0);
			
			me.stationLogs = {};
			
			var param = {
				station: me.selectedStationCode
				, startDate: startTime // '2020-04-06 09:00:00'
				, endDate: endTime // '2020-04-06 11:00:00'
			};
			
    		//console.log("airsensorstationdashboard.js getStationLogs param:"+JSON.stringify(param));
			
			axios.get(me.apiStationlogs, {params: param})
    		.then(res => {
    			//console.log("airsensorstationdashboard.js getStationLogs res:"+JSON.stringify(res));
    			
    			if(res != null && res.data != null && res.data.length > 0) {
    				me.stationLogsSuccess = true;
    				for(let i=res.data.length-1;i>=0;i--) {
    					if (res.data[i].pm10 > 0 || res.data[i].pm25 > 0 || res.data[i].o3 > 0) {
	    					me.stationLogs = res.data[i]; // 값이 유효한 마지막 값
	    					break;
    					}
    				}
    				
    				if (me.stationLogs.pm10 == undefined) {
    					//me.stationLogs = res.data[res.data.length-1];
    				}
    				
    				this.correctRecvAirStationInfo(me.stationLogs);
    				this.setGrade();
    				//console.log("airsensorstationdashboard.js getStationLogs 3...###" + me.selectedStationCode);
    			} else {
    				me.stationLogsSuccess = false;
    				//console.error("airsensorstationdashboard.js getStationLogs res:"+JSON.stringify(res)); handark333 오류로 인한 주석처리
    			}
    		})
    		.catch(err => {
    			console.error("airsensorstationdashboard.js getStationLogs err:"+err);
    		});
    		
    		//console.log("airsensorstationdashboard.js getStationLogs end...");
		},
		correctRecvAirStationInfo: function(item) {
			var me = this;
			
			if (item != null && item != undefined) {
				
				let strDate = item.date.toString();
				
				if (strDate.length >= 10) {
					item.date = strDate.substring(0,4) + "/" + strDate.substring(4,6) + "/" + strDate.substring(6,8) + " " + strDate.substring(8,10) + ":00";
				}
				
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
			}			
		},
		setGrade: function () {
			
			if (this.selectedStationCode == this.alarmAirSensor.facility.weatherStation.code) {
				this.stationLogStyle[this.airAlarmTypeCode] = "color: #ff07ca; font-weight: bold";
			} else {
				this.stationLogStyle[this.airAlarmTypeCode] = "color: white; ";
			}
			
			if (this.stationLogs.pm10 >= this.$parent.pollutionStandard.pm10High) {
				this.grade.pm10 = 'VERY_BAD';
			} else if (this.stationLogs.pm10 >= this.$parent.pollutionStandard.pm10Middle) {
				this.grade.pm10 = 'BAD';
			} else if (this.stationLogs.pm10 >= this.$parent.pollutionStandard.pm10Low) {
				this.grade.pm10 = 'NOT_BAD';
			} else {
				this.grade.pm10 = 'GOOD';
			}
			
			if (this.stationLogs.pm25 >= this.$parent.pollutionStandard.pm25High) {
				this.grade.pm25 = 'VERY_BAD';
			} else if (this.stationLogs.pm25 >= this.$parent.pollutionStandard.pm25Middle) {
				this.grade.pm25 = 'BAD';
			} else if (this.stationLogs.pm25 >= this.$parent.pollutionStandard.pm25Low) {
				this.grade.pm25 = 'NOT_BAD';
			} else {
				this.grade.pm25 = 'GOOD';
			}
			
			if (this.stationLogs.o3 >= this.$parent.pollutionStandard.o3High) {
				this.grade.o3 = 'VERY_BAD';
			} else if (this.stationLogs.o3 >= this.$parent.pollutionStandard.o3Middle) {
				this.grade.o3 = 'BAD';
			} else if (this.stationLogs.o3 >= this.$parent.pollutionStandard.o3Low) {
				this.grade.o3 = 'NOT_BAD';
			} else {
				this.grade.o3 = 'GOOD';
			}
			
			if (this.stationLogs.no2 >= this.$parent.pollutionStandard.no2High) {
				this.grade.no2 = 'VERY_BAD';
			} else if (this.stationLogs.no2 >= this.$parent.pollutionStandard.no2Middle) {
				this.grade.no2 = 'BAD';
			} else if (this.stationLogs.no2 >= this.$parent.pollutionStandard.no2Low) {
				this.grade.no2 = 'NOT_BAD';
			} else {
				this.grade.no2 = 'GOOD';
			}			
			
			if (this.stationLogs.co >= this.$parent.pollutionStandard.coHigh) {
				this.grade.co = 'VERY_BAD';
			} else if (this.stationLogs.co >= this.$parent.pollutionStandard.coMiddle) {
				this.grade.co = 'BAD';
			} else if (this.stationLogs.co >= this.$parent.pollutionStandard.coLow) {
				this.grade.co = 'NOT_BAD';
			} else {
				this.grade.co = 'GOOD';
			}			
			
			if (this.stationLogs.so2 >= this.$parent.pollutionStandard.so2High) {
				this.grade.so2 = 'VERY_BAD';
			} else if (this.stationLogs.so2 >= this.$parent.pollutionStandard.so2Middle) {
				this.grade.so2 = 'BAD';
			} else if (this.stationLogs.so2 >= this.$parent.pollutionStandard.so2Low) {
				this.grade.so2 = 'NOT_BAD';
			} else {
				this.grade.so2 = 'GOOD';
			}			
			
		},
		transAirStatusToIcon: function(grade) {
			
			let symbolPath = "";
			
			if(grade == 'GOOD') {
			
				symbolPath = '/static/icons/icons8-blue-circle-48.png';
				
			} else if(grade == 'NOT_BAD') {
			
				symbolPath = '/static/icons/icons8-green-circle-48.png';
								
			} else if(grade == 'BAD') {
			
				symbolPath = '/static/icons/icons8-yellow-circle-48.png';
								
			} else if(grade == 'VERY_BAD') {
			
				symbolPath = '/static/icons/icons8-red-circle-48.png';				
			}
			
			return symbolPath;
		},
		onChangeStationSelector: function(prev, curr) {
			this.selectedStationCode = curr;
			//console.log("airsensorstationdashboard.js onChangeStationSelector this.selectedStationCode:"+this.selectedStationCode);
			if(this.selectedStationCode != null) {
				//console.log("onChangeStationSelector call getStationLogs");
				this.getStationLogs();
			}
		},
		onResize: function(ev) {
			let me = this;
			me.updateNonoScrollbar();
			
			if(me.resizeTimer != null) {
				clearTimeout(me.resizeTimer);
				me.resizeTimer = null;
			}
			
			//me.resizeTimer = setTimeout(() => {
			//	me.redrawChart();
			//}, 500);
		},
		updateNonoScrollbar: function(option) {
			let me = this;

			// top과 bottom의 padding 2px만큼 더 빼기 위해 4를 추가로 뺌
			let h = $("#" + me.parentContainerId).height() - $("#" + me.parentContainerId).children().first().height() - 4;				
			$("#airsensorStationContainer").css("height", h + "px");						
			$(".nano").nanoScroller(option);
			$(".nano-content").css("margin-right", "0px");			

		},
		dateStringFromStation: function (recvDate) {
			let result = String(recvDate);
			
			if (result != null && result.length >= 8) {
				result = result.substr(4, 2) + "/" + result.substr(6, 2);
			} 
			
			return result;
		}		
	},
	created: function () {
		
	},
	mounted: function () {
		let me = this;
		
		//console.log("airsensorstationdashboard.js mounted 1...");
		
		if (this.isOpenAirSensorStation) {
			this.init();
		}
		
		$("#" + me.parentContainerId).on('resize', me.onResize);
		me.updateNonoScrollbar();
		
		//console.log("airsensorstationdashboard.js mounted end...");
	},
	beforeUpdated: function() {
		//console.log("airsensorstationdashboard.js beforeUpdated end...");		
	},
	updated: function() {
		//console.log("airsensorstationdashboard.js updated end...");
	},
	beforeDestroy: function() {
		this.clearTimer();
	},
});