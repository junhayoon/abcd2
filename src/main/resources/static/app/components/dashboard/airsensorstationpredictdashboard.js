
import template from '../templates/dashboard/airsensorstationpredictdashboard.html.js'
import i18n from '../../i18n/index.js'

export default Vue.component('airsensorstationpredictdashboard', {
	i18n,
	props: { airsensorStations: Array, isOpenAirSensorStationPredict: Boolean, isFullScreen: Boolean, parentContainerId: String},
	template: template,
	data: function () {
		return {
			//apiStationList: '/api/airstation/station',
			apiStationPrediction: '/api/airstation/prediction',
			defaultLogCnt: 10,
			maxLogCnt: 10,			
			stationSelector: null,		
			selectedStationCode: null,			
			timerSwitch: null,
			resizeTimer: null,
			charts: {},
			colorIdx: 0,
			stationPrediction: {},
			baseLevelPm25: 	[0, 15, 35, 75, 100],			// y축 설정값: [min, good, normal, notgood, bad(max)]
			baseLevelPm10: 	[0, 30, 80, 150, 200],
			baseLevelNo2: 	[0, 0.03, 0.06, 0.20, 0.27],
			baseLevelCo: 	[0, 2, 9, 15, 20],
			baseLevelO3: 	[0, 0.03, 0.09, 0.15, 0.20],
			baseLevelSo2: 	[0, 0.02, 0.05, 0.15, 0.20],
			
			timerSwitchCycle: 1000*30,
			timerSwitchCnt: 0,
			timerReloadCnt: 2*60,	// 1시간
		}
	},
	computed: {
	},
	watch: {
		airsensorStations: function() {
			let me = this;
			console.log("airsensorstationpredictdashboard.js watch airsensorStations: start...");
			me.init();			
			me.createTimer();
			
			console.log("airsensorstationpredictdashboard.js watch airsensorStations: end...");
		},
		isOpenAirSensorStationPredict: function() {
			console.log("airsensorstationpredictdashboard.js watch this.isOpenAirSensorStationPredict:"+this.isOpenAirSensorStationPredict);
			this.init();
		},		
		isFullScreen: function() {
			let me = this;
			
			me.updateNonoScrollbar();
			me.redrawChart();
		},
	},
	methods: {
		init: function() {
			let me = this;
			
			console.log("airsensorstationpredictdashboard.js init() this.airsensorStations:"+this.airsensorStations);
			
			if(me.isOpenAirSensorStationPredict) {
				me.createSelector();
				
				if (this.airsensorStations != null && this.airsensorStations.length > 0) {				
					me.getStationPrediction();					
				}
			}
			
			//console.log("airsensorstationpredictdashboard.js init() end...");
		},
		createTimer: function() {
			let me = this;
			
			me.clearTimer();			
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
			
			console.log("airsensordashboard.js handleTimerSwitch() 1..." + (Object.keys(me.stationPrediction).length === 0));
						
			if (me.isOpenAirSensorStationPredict) {
				me.timerSwitchCnt++;
				
				//console.log("airsensordashboard.js handleTimerSwitch() 2..." + me.timerSwitchCnt + "," + me.timerReloadCnt);
				
				if ((Object.keys(me.stationPrediction).length === 0) || (me.timerSwitchCnt >= me.timerReloadCnt)) {
					me.timerSwitchCnt = 0;
					me.getStationPrediction();
				}
				else			
					me.switchStation();
			}
			
			//console.log("airsensordashboard.js handleTimerSwitch() end...");			
		},
		switchStation: function() {
			let me = this;
			let curIndex = 0;
			let nextIndex = 0;
			
			me.airsensorStations.forEach((item, index) => {
					if (item.code == me.selectedStationCode) {
						curIndex = index;
					}
					
					if (curIndex == me.airsensorStations.length - 1) {
						nextIndex = 0;
					} else {
						nextIndex = curIndex + 1;
					}
			});
			
			if (me.stationSelector != null) {
			 	me.stationSelector.select(nextIndex);
			}				
		},		
		createSelector: function() {
			let me = this;
			
			console.log("airsensorstationpredictdashboard.js createSelector() stationSelector:" + me.stationSelector);
			console.log("airsensorstationpredictdashboard.js createSelector() airsensorStations:" + me.airsensorStations);
			
			if(this.airsensorStations != null && this.airsensorStations.length > 0) {
				let statioinItemData = [];
				this.airsensorStations.forEach((item) => {
					statioinItemData.push({
						label: item.name,
						value: item.code
					});
				});
				
				if(this.stationSelector == null) {
					this.stationSelector = new tui.SelectBox('#stationSelectorPredict', {
						data: statioinItemData,
						autofocus: false,
						showIcon: true
					});
					
					this.stationSelector.on('change', (ev) => {
						me.onChangeStationSelector(ev.prev.getValue(), ev.curr.getValue());
					});
					
					me.selectedStationCode = me.stationSelector.getSelectedItem().value;
					me.updateNonoScrollbar();
				}
			}
			
			//console.log("airsensorstationpredictdashboard.js createSelector() end...");
		},
		getStationPrediction: function() {
			var me = this;
			
			console.log("airsensorstationpredictdashboard.js getStationPrediction() 1...");
			
			axios.get(me.apiStationPrediction)
    		.then(res => {
    			console.log("airsensorstationpredictdashboard.js getStationPrediction() res:"+JSON.stringify(res));
    			
    			if(res != null && res.data != null) {
    				me.stationPrediction = res.data; 
    				me.correctStationPrediction(me.stationPrediction);
    				   				
    				//console.log("airsensorstationpredictdashboard.js getStationPrediction() 3..." + me.selectedStationCode);
    				
    				let predictiveItems = me.driveStationPrediction(me.selectedStationCode);
    				
    				me.colorIdx = 0;
					me.createChart(predictiveItems);
    			}
    		})
    		.catch(err => {
    		});
    		
    		//console.log("airsensorstationpredictdashboard.js getStationPrediction() end...");
		},
		correctStationPrediction: function(logs) {
			var me = this;
			//console.log("airsensorstationpredictdashboard.js correctStationPrediction() 1...");
			
			for (let stationCode in logs) {
			 	let allItems = logs[stationCode];
			 	for (let itemName in allItems) {
			 		let eachItem = allItems[itemName];

			 		for (let eachDay in eachItem) {
			 			let predicVal = eachItem[eachDay];
			 			if (predicVal < 0)
			 				eachItem[eachDay] = 0;
					}
				}
			}
			
			//console.log("airsensorstationpredictdashboard.js correctStationPrediction() end...");
		},
		driveStationPrediction: function(code) {		// 관측소별 추출
			let me = this;
			let retPrediction = null;
			
//			console.log("airsensorstationpredictdashboard.js driveStationPrediction() 1..." + code);

			if (me.stationPrediction != null && me.stationPrediction != undefined) {
				for (var stationCode in me.stationPrediction) {
				 	if (stationCode = code)
				 		retPrediction = me.stationPrediction[stationCode];
				}
			}
			
//			console.log("airsensorstationpredictdashboard.js driveStationPrediction() end..." + retPrediction);
//			console.log(retPrediction);
			
			return retPrediction;	
		},
		redrawChart: function() {
			let me = this;
//			let ratio = $("#" + me.parentContainerId).width()/Math.floor(window.screen.width/5);
//			let oldCnt = me.maxLogCnt;
//			me.maxLogCnt = Math.floor(Math.max(ratio*me.defaultLogCnt, me.defaultLogCnt));
//			if(oldCnt != me.maxLogCnt) {
//				//console.log("redrawChart() 1..." + oldCnt + "," + String(me.maxLogCnt));
//				
//				me.getAirSensorLogs(me.selectedFacilId);
//			} else 
			{
				//console.log("redrawChart() 2...");				
   				
    			me.colorIdx = 0;
				me.createChart(me.driveStationPrediction(me.selectedStationCode));
			}
		},
		onChangeStationSelector: function(prev, curr) {
			this.selectedStationCode = curr;
			if(this.selectedStationCode != null) {
				this.redrawChart();
			}
		},
		onResize: function(ev) {
			let me = this;
			me.updateNonoScrollbar();
			
			if(me.resizeTimer != null) {
				clearTimeout(me.resizeTimer);
				me.resizeTimer = null;
			}
			
			me.resizeTimer = setTimeout(() => {
				me.redrawChart();
			}, 500);
		},
		updateNonoScrollbar: function(option) {
			let me = this;

			// top과 bottom의 padding 2px만큼 더 빼기 위해 4를 추가로 뺌
			let h = $("#" + me.parentContainerId).height() - $("#" + me.parentContainerId).children().first().height() - 4;				
			$("#airsensorStationPredictContainer").css("height", h + "px");						
			$(".nano").nanoScroller(option);
			$(".nano-content").css("margin-right", "0px");			

		},
		createChart: function(predictiveData) {
			let me = this;
			me.destoryAllChart();
			
			//console.log("airsensorstationpredictdashboard.js createChart() 1...");
							
			let labels = [];
			let dataPm25 = [];
			let dataPm10 = [];
			let dataNo2 = [];
			let dataCo = [];
			let dataO3 = [];
			let dataSo2 = [];
			
			let itemPm25 = predictiveData["PM25"];
			let itemPm10 = predictiveData["PM10"];
			let itemNo2 = predictiveData["NO2"];
			let itemCo = predictiveData["CO"];
			let itemO3 = predictiveData["O3"];
			let itemSo2 = predictiveData["SO2"];
			
			for (let eachDay in itemPm25) {
				labels.push(me.dateStringFromStation(eachDay));
				//labels.push(eachDay);
				dataPm25.push(itemPm25[eachDay]);
			}
			for (let eachDay in itemPm10) {
				dataPm10.push(itemPm10[eachDay]);
			}
			for (let eachDay in itemNo2) {
				dataNo2.push(itemNo2[eachDay]);
			}
			for (let eachDay in itemCo) {
				dataCo.push(itemCo[eachDay]);
			}
			for (let eachDay in itemO3) {
				dataO3.push(itemO3[eachDay]);
			}
			for (let eachDay in itemSo2) {
				dataSo2.push(itemSo2[eachDay]);
			}

			me.charts['pm25'] = me.newChart(me.$i18n.t("frontend.dashboard.airSensorStation.pm25")+"(PM2.5)", '㎍/㎥', labels, dataPm25, me.baseLevelPm25, 'pm25-chart-area-2');
			me.charts['pm10'] = me.newChart(me.$i18n.t("frontend.dashboard.airSensorStation.pm10")+"(PM10)", '㎍/㎥', labels, dataPm10, me.baseLevelPm10, 'pm10-chart-area-2');
			me.charts['no2'] = me.newChart(me.$i18n.t("frontend.dashboard.airSensorStation.no2")+"(No2)", 'ppm', labels, dataNo2, me.baseLevelNo2, 'no2-chart-area-2');
			me.charts['co'] = me.newChart(me.$i18n.t("frontend.dashboard.airSensorStation.co")+"(Co)", 'ppm', labels, dataCo, me.baseLevelCo, 'co-chart-area-2');
			me.charts['o3'] = me.newChart(me.$i18n.t("frontend.dashboard.airSensorStation.o3")+"(O3)", 'ppm', labels, dataO3, me.baseLevelO3, 'o3-chart-area-2');
			me.charts['so2'] = me.newChart(me.$i18n.t("frontend.dashboard.airSensorStation.so2")+"(So2)", 'ppm', labels, dataSo2, me.baseLevelSo2, 'so2-chart-area-2');
									
			//console.log("airsensordashboard.js createChart() end...");
		},
		newChart: function(chartTitle, chartLeftLabel, dataLabel, dataVal, chartLevel, target) {		
			let me = this;
			
			//console.log("airsensordashboard.js newChart() 1..." + chartTitle);

			let chart = null;							
			let labels = [];
			let datasets = [];
			let chartData = {};				
								
			if(me.colorIdx >= window.chartColorArray.length) {
				me.colorIdx = 0;
			}
			let ds_1 = {
				label: chartTitle,
				borderColor: window.chartColorArray[me.colorIdx],
				backgroundColor: window.chartColorArray[me.colorIdx],
				fill: false,
				lineTension: 0,
				data: dataVal,
				yAxisID: 'y-axis-1'
			};
			//me.colorIdx += 1;
			
			let yAxes = [];
			let tooltipsOpt = {};												
				
			yAxes.push({
				type: 'linear',
				display: true,
				position: 'left',
				id: 'y-axis-1',
				scaleLabel: {
					display: true,
					labelString: chartLeftLabel
				}
			});
			
			labels = dataLabel;						
			datasets.push(ds_1);
			
			chartData['labels'] = labels;
			chartData['datasets'] = datasets;
			
			var ctx = document.getElementById(target).getContext('2d');
			chart = new Chart(ctx, {
				type: 'line',
				data: chartData,
				options: {
					responsive: true,
					title: {
						display: false
					},
					scales: {
						yAxes: yAxes
					},
					tooltips: tooltipsOpt
				}
			});
			
			if (chartLevel !== null)
				me.updateChartLevel(chart, chartLevel);
				
			//console.log("airsensordashboard.js newChart() end..." + chart);
			
			return chart;
		},
		updateChartLevel: function(chart, level) {		// level - y축 설정값: [min, good, normal, notgood, bad(max)]
			let me = this;
			
			//let min = 0;
			let max = Math.round(Math.max(...chart.data.datasets[0].data)).toFixed(3);
				if (max < level[4])
					max = level[4];
			let step = parseFloat((max-level[0])/10).toFixed(3);
				
			chart.options.scales.yAxes[0].ticks.max = parseFloat(max);
			chart.options.scales.yAxes[0].ticks.min = level[0];
			chart.options.scales.yAxes[0].ticks.stepSize = step;
			chart.options['annotation'] = {
				drawTime: 'afterDraw',
				annotations: [{
					type: 'box',
					xScaleID: 'x-axis-1',
					xMin: 0,
					xMax: me.maxLogCnt,
					yScaleID: 'y-axis-1',
					yMax: level[1],
					yMin: level[0],
					backgroundColor: 'rgb(0, 0, 255, 0.1)',
					borderColor: 'rgb(0, 0, 255, 0.1)',
					borderWidth: 1
				}, {
					type: 'box',
					xScaleID: 'x-axis-1',
					xMin: 0,
					xMax: me.maxLogCnt,
					yScaleID: 'y-axis-1',
					yMax: level[2],
					yMin: level[1],
					backgroundColor: 'rgb(0, 255, 0, 0.1)',
					borderColor: 'rgb(0, 255, 0, 0.1)',
					borderWidth: 1
				}, {
					type: 'box',
					xScaleID: 'x-axis-1',
					xMin: 0,
					xMax: me.maxLogCnt,
					yScaleID: 'y-axis-1',
					yMax: level[3],
					yMin: level[2],
					backgroundColor: 'rgb(255, 255, 0, 0.1)',
					borderColor: 'rgb(255, 255, 0, 0.1)',
					borderWidth: 1
				}, {
					type: 'box',
					xScaleID: 'x-axis-1',
					xMin: 0,
					xMax: me.maxLogCnt,
					yScaleID: 'y-axis-1',
					yMax: max,
					yMin: level[3],
					backgroundColor: 'rgb(255, 0, 0, 0.1)',
					borderColor: 'rgb(255, 0, 0, 0.1)',
					borderWidth: 1
				}]
			};
			
			chart.update();			
		},
		destoryAllChart: function() {
			let me = this;
			me.destoryChart('pm25');
			me.destoryChart('pm10');
			me.destoryChart('no2');
			me.destoryChart('co');
			me.destoryChart('o3');
			me.destoryChart('so2');
		},
		destoryChart: function(airElement) {
			let me = this;
			if(this.charts != null && this.charts[airElement] != null) {
				this.charts[airElement].destroy();
				this.charts[airElement] = null;
			}
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
		
		console.log("airsensorstationpredictdashboard.js created 1...");
	},
	mounted: function () {
		let me = this;
		
		console.log("airsensorstationpredictdashboard.js mounted 1...");
		
		if (this.isOpenAirSensorStationPredict) {
			this.init();
		}
		
		$("#" + me.parentContainerId).on('resize', me.onResize);
		me.updateNonoScrollbar();
		
		//$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		//	if(e.target.id == 'bridgeinformation-tab') {
		//		me.redrawChart();
		//	}
		//});
		
		console.log("airsensorstationpredictdashboard.js mounted end...");
	},
	beforeUpdated: function() {
		//console.log("airsensorstationpredictdashboard.js beforeUpdated end...");		
	},
	updated: function() {
		//console.log("airsensorstationpredictdashboard.js updated end...");
	},
	beforeDestroy: function() {
		this.clearTimer();
	},
});