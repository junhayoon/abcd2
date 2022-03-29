
import template from '../templates/dashboard/airsensordashboard.html.js'
import i18n from '../../i18n/index.js'

export default Vue.component('airsensordashboard', {
	i18n,
	props: { airSensors: Array, recvAirSensor: Object, isOpenAirSensor: Boolean, isFullScreen: Boolean, parentContainerId: String},
	template: template,
	data: function () {
		return {
			apiAirSensorLogs: '/api/airsensor/logByGroup', // '/api/airsensor/log',
			defaultLogCnt: 10,
			maxLogCnt: 10,			
			airSensorSelector: null,		
			selectedFacilId: null,
			timer: null,
			resizeTimer: null,
			charts: {},
			colorIdx: 0,
			airSensorLogs: {},
			
			// y축 설정값: [min, good, normal, notgood, bad(max)]
			baseLevelPm10: 	[0, 30, 80, 150, 200],
			baseLevelPm25: 	[0, 15, 35, 75, 100],
			baseLevelPm1: 	[0, 15, 35, 75, 100],
			baseLevelCo2: 	[0, 700, 1000, 1500, 1800],
			baseLevelTvoc: 	[0, 100, 350, 500, 700],
			baseLevelTemp: 	[-15, 0, 15, 30, 45],
			baseLevelHumi: 	[0, 25, 50, 75, 100],
			
			
		}
	},
	computed: {
		
	},
	watch: {
		airSensors: function() {
			let me = this;
			me.init();
		},
		recvAirSensor: function() {
			let me = this;
			
			//console.log("airsensordashboard.js watch recvAirSensor: 1..." + me.selectedFacilId);
			
			if(me.recvAirSensor != null && me.recvAirSensor.facility != null) {
				//console.log( me.recvAirSensor);
				
				if(me.recvAirSensor.facility.fcode == me.selectedFacilId) {
					me.correctRecvAirSensorInfo(me.recvAirSensor);
					me.airSensorLogs.push(me.recvAirSensor);				
					
					if(me.airSensorLogs.length > me.maxLogCnt) {
						me.airSensorLogs.shift();
					}
					me.redrawChart();
				}
			}
		},
		isOpenAirSensor: function() {
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
			
			me.clearTimer();
			
			if(me.isOpenAirSensor) {
				me.createSelector();
				
				if(me.selectedFacilId != null) {
					me.getAirSensorLogs(me.selectedFacilId);
				}
				
				if (this.airSensors != null && this.airSensors.length > 0) {
					this.timer = setInterval(this.handleTimer, 1000*30);
				}
			}
		},
		clearTimer: function() {
			let me = this;

			if (me.timer != null) {
				clearInterval(me.timer);
				me.timer = null;
			}
		},
		handleTimer: function() {
			var me = this;
			
			if (me.isOpenAirSensor) {			
				me.selectNextAirSensor();
			}
			
			//console.log("airsensordashboard.js handleTimer() end...");			
		},
		selectNextAirSensor: function() {
			let me = this;
			let curIndex = 0;
			let nextIndex = 0;
			
			me.airSensors.forEach((item, index) => {
					if (item.fcode == me.selectedFacilId) {
						curIndex = index;
					}
					
					if (curIndex == me.airSensors.length - 1) {
						nextIndex = 0;
					} else {
						nextIndex = curIndex + 1;
					}
			});
			
			if (me.airSensorSelector != null) {
			 	me.airSensorSelector.select(nextIndex);
			}				
		},		
		createSelector: function() {
			let me = this;
			if(this.airSensors != null && this.airSensors.length > 0) {
				let airSensorItemData = [];
				this.airSensors.forEach((item) => {
					airSensorItemData.push({
						label: item.facilityName,
						value: item.fcode
					});
				});
				
				//console.log("airsensordashboard.js createSelector() 1...####" + me.airSensorSelector);
				
				if(this.airSensorSelector == null) {
					this.airSensorSelector = new tui.SelectBox('#airSensorSelector', {
						data: airSensorItemData,
						autofocus: true,
						showIcon: true
					});
					
					this.airSensorSelector.on('change', (ev) => {
						me.onChangeAirSensorSelector(ev.prev.getValue(), ev.curr.getValue());
					});
					
					me.selectedFacilId = me.airSensorSelector.getSelectedItem().value;
					me.updateNonoScrollbar();
				}
			}
		},
		getAirSensorLogs: function(facilityId) {
			var me = this;
			
			axios.get(me.apiAirSensorLogs + "/" + facilityId + "?offset=0&limit=" + me.maxLogCnt)
			//axios.get(me.apiAirSensorLogs + "/" + me.selectedFacilId + "?offset=0&limit=" + me.maxLogCnt)
    		.then(res => {
    			if(res != null && res.data != null) {
    				me.airSensorLogs = res.data; 
    				me.correctRecvAirSensorLogs(me.airSensorLogs);
    				   				
    				me.colorIdx = 0;
					me.createChart(me.airSensorLogs);
					
					me.updateNonoScrollbar();
    			}
    		})
    		.catch(err => {
    		});
		},
		correctRecvAirSensorInfo: function(item) {
			if (item != null && item != undefined) {
				if (item.pm25 < 0)
					item.pm25 = 0;
				if (item.pm10 < 0)
					item.pm10 = 0;
					
				if (item.no2 < 0)
					item.no2 = 0;
				else
					item.no2 = parseFloat(item.no2/1000).toFixed(3);
				
				if (item.co < 0)
					item.co = 0;
				else
					item.co = parseFloat(item.co/1000).toFixed(3);
					
				if (item.o3_org < 0)
					item.o3_org = 0;
				else
					item.o3_org = parseFloat(item.o3_org/1000).toFixed(3);
					
				if (item.so2_org < 0)
					item.so2_org = 0;
				else
					item.so2_org = parseFloat(item.so2_org/1000).toFixed(3);
					
				item.create_date = item.create_date.substring(0,15) + "0:00";
			}			
		},
		correctRecvAirSensorLogs: function(logs) {
			var me = this;
			logs.forEach((item) => {
				me.correctRecvAirSensorInfo(item);
			});
		},
		redrawChart: function() {
			let me = this;
			let ratio = $("#" + me.parentContainerId).width()/Math.floor(window.screen.width/5);
			let oldCnt = me.maxLogCnt;
			me.maxLogCnt = Math.floor(Math.max(ratio*me.defaultLogCnt, me.defaultLogCnt));
			if(oldCnt != me.maxLogCnt) {
				//console.log("redrawChart() 1...##" + oldCnt + "," + String(me.maxLogCnt));
				
				me.getAirSensorLogs(me.selectedFacilId);
			} else {
				//console.log("redrawChart() 2...##");				
   				
    			me.colorIdx = 0;
				me.createChart(me.airSensorLogs);
			}
		},
		onChangeAirSensorSelector: function(prev, curr) {
			this.selectedFacilId = curr;
			if(this.selectedFacilId != null) {
				this.getAirSensorLogs(this.selectedFacilId);
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
			$("#airSensorContainer").css("height", h + "px");						
			$(".nano").nanoScroller(option);
			$(".nano-content").css("margin-right", "0px");
			
		},
		
		createChart: function(airData) {
			let me = this;
			me.destoryAirSensorChart();
			
			//console.log("airsensordashboard.js createAirSensorChart() 1...");
				
			let labels = [];
			let dataPm10 = [];
			let dataPm25 = [];
			let dataPm1 = [];
			let dataCo2 = [];
			let dataTvoc = [];
			let dataTemp = [];
			let dataHumi = [];
									
			airData.forEach((item, index) => {
				labels.push([moment(item.create_date).format('MM/DD').toString(), moment(item.create_date).format('HH:mm').toString()]);
				dataPm10.push(item.pm10);
				dataPm25.push(item.pm25);
				dataPm1.push(item.pm1);
				dataCo2.push(item.co2);
				dataTvoc.push(item.tvoc);
				dataTemp.push(item.temp);
				dataHumi.push(item.humi);
			});
			me.charts['pm10'] = me.newChart(me.$i18n.t("frontend.dashboard.airSensor.pm10")+"(PM10)", '㎍/㎥', labels, dataPm10, me.baseLevelPm10, 'pm10-chart-area');
			me.charts['pm25'] = me.newChart(me.$i18n.t("frontend.dashboard.airSensor.pm25")+"(PM2.5)", '㎍/㎥', labels, dataPm25, me.baseLevelPm25, 'pm25-chart-area');
			me.charts['pm1'] = me.newChart(me.$i18n.t("frontend.dashboard.airSensor.pm10")+"(PM1.0)", '㎍/㎥', labels, dataPm1, me.baseLevelPm1, 'pm1-chart-area');
			me.charts['co2'] = me.newChart(me.$i18n.t("frontend.dashboard.airSensor.co2")+"(CO2)", 'ppm', labels, dataCo2, me.baseLevelCo2, 'co2-chart-area');
			me.charts['tvoc'] = me.newChart(me.$i18n.t("frontend.dashboard.airSensor.tvoc")+"(TVOC)", 'Grade', labels, dataTvoc, me.baseLevelTvoc, 'tvoc-chart-area');
			me.charts['temp'] = me.newChart(me.$i18n.t("frontend.dashboard.airSensor.temp")+"(°C)", '°C', labels, dataTemp, me.baseLevelTemp, 'temp-chart-area');
			me.charts['humi'] = me.newChart(me.$i18n.t("frontend.dashboard.airSensor.humi")+"(%)", '%', labels, dataHumi, me.baseLevelHumi, 'humi-chart-area');
									
			//console.log("airsensordashboard.js createChart() end...");
		},
		newChart: function(chartTitle, chartLeftLabel, dataLabel, dataVal, chartLevel, target) {		
			let me = this;
			
			//console.log("airsensordashboard.js newChart() 1..." + chartTitle + ", " + target);

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
					labelString: chartLeftLabel,
					fontColor: 'white',
				},
				ticks: {
					fontColor: 'white',
				}
			});
			
			labels = dataLabel;						
			datasets.push(ds_1);
			
			chartData['labels'] = labels;
			chartData['datasets'] = datasets;
			
			var ctx = document.getElementById(target).getContext('2d');
			chart = new Chart(ctx, {
				type: 'bar',
				data: chartData,
				options: {
					responsive: true,
					title: {
						display: false
					},
					scales: {
						yAxes: yAxes,
						xAxes:[{
							ticks: {
								fontColor: 'white'
							}			
						}]
					},
					legend: {
			            labels: {
			                // This more specific font property overrides the global property
			                fontColor: 'white'
							}
		            },
					tooltips: tooltipsOpt
				}
			});
			
			if (chartLevel !== null)
				me.updateChartLevel(chart, chartLevel, target);
				
			return chart;
		},
		updateChartLevel: function(chart, level, target) {		// level - y축 설정값: [min, good, normal, notgood, bad(max)]
			let me = this;

			//let min = 0;
			let max = Math.round(Math.max(...chart.data.datasets[0].data)).toFixed(3);
				if (max < level[4])
					max = level[4];
			let step = parseFloat((max-level[0])/10).toFixed(3);
			
			// 온도/습도/TVOC는 최대값이 정해져 있어 따로 처리
			if (target == 'temp-chart-area')
				step = 5;	// -15~45
			else if (target == 'humi-chart-area')
				step = 20;	// 0~100
			else if (target == 'tvoc-chart-area')
				step = 1;	// 1~4
			else if (target == 'co2-chart-area')
				step = 150;	// 1~1200
			
			//console.log("updateChartLevel() 1..." + level[0] + ", " + max + ", " + step + ", " + target);
				
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
					backgroundColor: 'rgb(0, 0, 255, 0.2)',
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
					backgroundColor: 'rgb(0, 255, 0, 0.2)',
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
					backgroundColor: 'rgb(255, 255, 0, 0.2)',
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
					backgroundColor: 'rgb(255, 0, 0, 0.2)',
					borderColor: 'rgb(255, 0, 0, 0.1)',
					borderWidth: 1
				}]
			};
			
			chart.update();
		},
		destoryAirSensorChart: function() {
			let me = this;
			me.destoryChart('pm10');
			me.destoryChart('pm25');
			me.destoryChart('pm1');
			me.destoryChart('co2');
			me.destoryChart('tvoc');
			me.destoryChart('temp');
			me.destoryChart('humi');
		},
		destoryChart: function(airElement) {
			let me = this;
			if(this.charts != null && this.charts[airElement] != null) {
				this.charts[airElement].destroy();
				this.charts[airElement] = null;
			}
		},		
	},
	created: function () {
		
	},
	mounted: function () {
		let me = this;
		
		if (this.isOpenAirSensor) {
			this.init();
		}
		
		$("#" + me.parentContainerId).on('resize', me.onResize);
		me.updateNonoScrollbar();
		
		//$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		//	if(e.target.id == 'bridgeinformation-tab') {
		//		me.redrawChart();
		//	}
		//});
		
		//console.log("airsensordashboard.js mounted end...");
	},
	updated: function() {
		
	},
	beforeDestroy: function() {
		this.clearTimer();
	},
});