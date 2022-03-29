
import template from '../templates/dashboard/airsensorcontroldashboard.html.js'
import i18n from '../../i18n/index.js'

export default Vue.component('airsensorcontroldashboard', {
	i18n,
	props: { airSensors: Array, recvAirSensor: Object, isOpenAirSensorControl: Boolean, isFullScreen: Boolean, parentContainerId: String},
	template: template,
	data: function () {
		return {
			apiLastAirSensorInfo: '/api/airsensor/status',
			apiFacility: '/api/facility',
			apiAirCleanerPowerControl: '/api/aircleaner/control/status', // 서버 처리 필요
			apiAirCleanerMotorPowerIntensityControl: '/api/aircleaner/control/status', // 서버 처리 필요
			//apifacilityInfo: '/api/facilityByMobiusId/{mobiusId}',
			defaultLogCnt: 10,
			maxLogCnt: 10,			
			airSensorControlSelector: null,	
			selectedFacility: {},
			timer: null,
			resizeTimer: null,
			colorIdx: 0,
			airSensor: {},
			error_message: null,
			selectedIntensity: null,
			alarmAirSensor:null,
		}
	},
	computed: {
		
	},
	watch: {
		airSensors: function() {
			//console.log("airsensorcontroldashboard.js watch airSensors:" + JSON.stringify(this.airSensors));
			if (this.airSensors && this.airSensors.length > 0) {
				let me = this;
				me.init();
			}
		},
		alarmAirSensor: function() {
			//console.log("airsensorcontroldashboard.js watch alarmAirSensor:" + JSON.stringify(this.$parent.alarmAirSensor));
			let me = this;
			me.init();
		},
		recvAirSensor: function() {
			var me = this;
			
			//console.log("airsensorcontroldashboard.js watch recvAirSensor:" + JSON.stringify(this.recvAirSensor));
			//console.log("airsensorcontroldashboard.js watch recvAirSensor me.selectedFacility.id:" + me.selectedFacility.id);
					
			if (this.recvAirSensor && this.recvAirSensor.facility.fcode == me.selectedFacility.fcode) {
				//me.evalAirQuality(me.recvAirSensor);	
				me.airSensor = me.recvAirSensor;
			}
			
			//me.init();
		},
		isOpenAirSensorControl: function() {
			this.init();
		},		
		isFullScreen: function() {
			let me = this;
			
			me.updateNonoScrollbar();
			//me.redrawChart();
		},
	},
	methods: {
		init: function() {
			let me = this;
			
			//me.clearTimer();
			
			if(me.isOpenAirSensorControl) {
				
				if (this.alarmAirSensor && this.alarmAirSensor.facility) {
					//console.log("airsensorcontroldashboard.js init alarmAirSensor.facility:" + JSON.stringify(this.alarmAirSensor.facility));
					//console.log("airsensorcontroldashboard.js init alarmAirSensor.facility.id:" + me.alarmAirSensor.facility.id);
					this.selectedFacility = this.alarmAirSensor.facility;
					if(this.airSensorControlSelector != null) {
						this.airSensorControlSelector.select(me.selectedFacility.fcode.toString());
					}
				}
				
				me.createSelector();
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
				
				//console.log("airsensorcontroldashboard.js createSelector() 1...####" + me.airSensorControlSelector);
				//console.log("airsensorcontroldashboard.js createSelector() 1... airSensors:" + JSON.stringify(this.airSensors));
				
				if(this.airSensorControlSelector == null) {
					this.airSensorControlSelector = new tui.SelectBox('#airSensorControlSelector', {
						data: airSensorItemData,
						autofocus: true,
						showIcon: true
					});
					
					this.airSensorControlSelector.on('change', (ev) => {
						me.onChangeAirSensorControlSelector(ev.prev.getValue(), ev.curr.getValue());
					});
					
					if (me.selectedFacility != null && me.selectedFacility.fcode) {
						//console.log("airsensorcontroldashboard.js selectedFacility.id:" + me.selectedFacility.id);
						this.airSensorControlSelector.select(me.selectedFacility.fcode.toString());
					} else {
						//me.selectedFacilId = me.airSensorControlSelector.getSelectedItem().value;
						me.selectedFacility = this.airSensors[0];
					}
				
					this.getLastAirSensorInfo(this.selectedFacility.fcode);
					
					/*
					if (this.selectedFacility.autoControl) {
						$("#autoControlOn").show();
						$("#autoControlOff").hide();
					} else {
						$("#autoControlOn").hide();
						$("#autoControlOff").show();
					}
					*/
					//console.log("createSelector me.selectedFacility:"+JSON.stringify(me.selectedFacility));
					
					me.updateNonoScrollbar();
				}
			}
		},
		getLastAirSensorInfo: function() {
			var me = this;			
			me.airSensor = {};
			
			axios.get(me.apiLastAirSensorInfo+"/"+this.selectedFacility.fcode)
    		.then(res => {
    		
				//console.log("airsensorcontroldashboard.js sendws 1...");
				
    			if(res != null && res.data != null) {
    				me.airSensor = res.data;
    				me.correctRecvAirSensor(me.airSensor);
    			}
    		})
    		.catch(err => {
    			    			
    		});
		},
		correctRecvAirSensor: function(airData) {
						
		},
		onChangeAirSensorControlSelector: function(prev, curr) {
		
			this.airSensors.forEach((item) => {
				if (item.fcode == curr) {
					this.selectedFacility = item;
				}
			});					
			
			this.getLastAirSensorInfo(this.selectedFacility.fcode);
		},
		onResize: function(ev) {
			let me = this;
			me.updateNonoScrollbar();
			
			if(me.resizeTimer != null) {
				clearTimeout(me.resizeTimer);
				me.resizeTimer = null;
			}
			
			me.resizeTimer = setTimeout(() => {
				//me.redrawChart();
			}, 500);
		},
		updateNonoScrollbar: function(option) {
			let me = this;			
			
			// top과 bottom의 padding 2px만큼 더 빼기 위해 4를 추가로 뺌
			let h = $("#" + me.parentContainerId).height() - $("#" + me.parentContainerId).children().first().height() - 4;				
			$("#airSensorControlContainer").css("height", h + "px");						
			$(".nano").nanoScroller(option);
			$(".nano-content").css("margin-right", "0px");
			
		},
		airSensorConfirmCommon: function() {
			
			$("#confirmTitle").html(this.$i18n.t("frontend.dashboard.airSensorControl.title"));
			$("#confirmCancel").html(this.$i18n.t("button.cancel"));
			$("#confirmOk").html(this.$i18n.t("button.ok"));
			$("#confirmOk").removeClass('btn-primary');
			$("#confirmOk").addClass('btn-danger');
			
			//$("#confirmOk").data('index', index);
			$("#confirmDialog").modal('toggle');
		},
		airSensorAlertCommon: function(content) {
					
			$("#confirmTitle").html(this.$i18n.t("frontend.dashboard.airSensorControl.title"));
			
			$("#confirmContent").html(content);					
			
			$('#confirmOk').on('click', this.commonModalToggle);
			$("#confirmCancel").hide();
			
			$("#confirmDialog").modal('toggle');
		},
		commonModalToggle: function(e) {
			$("#confirmDialog").modal('toggle');
		},
		toggleWorkplaceAutoControl: function() {
			
			if (this.selectedFacility.autoControl) {
				
				//this.toastMessage("info", this.$i18n.t("frontend.dashboard.airSensorControl.title"), this.$i18n.t("frontend.dashboard.airSensorControl.alert_center_auto_control_on"));				
				
				this.airSensorAlertCommon(this.$i18n.t("frontend.dashboard.airSensorControl.alert_center_auto_control_on"));				
				
			} else {
				console.log("toggleWorkplaceAutoControl this.airSensor.unit:"+this.airSensor.unit);
				if (this.airSensor.cmd == undefined || this.airSensor.cmd === 'MANUAL') {
					// call autoMode on
					$("#confirmContent").html(this.$i18n.t("frontend.dashboard.airSensorControl.workplace_auto_mode_on_content"));
				} else {
					// call autoMode off
					$("#confirmContent").html(this.$i18n.t("frontend.dashboard.airSensorControl.workplace_auto_mode_off_content"));
				}				
				
				this.airSensorConfirmCommon();
				
				$('#confirmOk').on('click', this.toggleWorkplaceAutoControlConfirmOk);
				$('#confirmCancel').on('click', this.toggleWorkplaceAutoControlConfirmCancel);
			}
			
		},
		toggleWorkplaceAutoControlConfirmOk: function(e) {
			
			//console.log("toggleWorkplaceAutoControlConfirmOk this.airSensor:"+JSON.stringify(this.airSensor));
			
			let param = {
				facility_id: this.selectedFacility.fcode
				, mobius_id: this.selectedFacility.mobiusId
				, mode: 'AUTO'
				, astrength: 0
				, controlType: '021'
			};
			
			if (this.airSensor.cmd == undefined || this.airSensor.cmd === 'MANUAL') {
				// call auto mode on
				param.mode = 'AUTO';
				param.controlType = '021';
				param.astrength = this.airSensor.astrength;
			} else {
				// call auto mode off
				param.mode = 'MANUAL';
				param.controlType = '020';
				param.astrength = this.airSensor.astrength; // 0;
			}
			
			if (param.astrength == 0) {
				param.astrength = 1;
			}
		
			console.log("toggleWorkplaceAutoControlConfirmOk param:"+JSON.stringify(param));
			//console.log("change this.config:"+JSON.stringify(this.config));
			
			//console.log("airsensorcontroldashboard.js toggleWorkplaceAutoControlConfirmOk sendws 1...");

			// me.sendws("/c2w/request/workplace", JSON.stringify({'MOBIUSID': '/AirSensor/Workplace_0004', 'CMD': 'SET', 'MODE': 'AUTO'}));                     // 공기청정기 모드 설정 : AUTO, MANUAL
            //this.$parent.sendws("/c2w/request/workplace", JSON.stringify({'MOBIUSID': this.selectedFacility.mobiusId, 'CMD': 'SET', 'MODE': param.mode, 'facility_id': param.facility_id, 'controlType': param.controlType, 'autoControlled': false}));         
            
			let paramSend = {'MOBIUSID': this.selectedFacility.mobiusId, 'CMD': param.mode, 'ASTRENGTH': param.astrength, 'RANGE':[7,15,35]};
			
			console.log("toggleWorkplaceAutoControlConfirmOk paramSend:"+JSON.stringify(paramSend));
			
			this.$parent.sendws("/c2w/request/workplace", JSON.stringify(paramSend));       
            
            if (this.$parent.alarmAirSensor != null && this.$parent.alarmAirSensor.facility.fcode === this.selectedFacility.fcode) {
            	this.$parent.control_alarm_facility_id = this.selectedFacility.fcode;
            }
            
            console.log("airsensorcontroldashboard.js toggleWorkplaceAutoControlConfirmOk this.$parent.control_alarm_facility_id " + this.$parent.control_alarm_facility_id);
            
            $("#confirmDialog").modal('toggle');
					
			this.toastMessage("info", this.$i18n.t("frontend.dashboard.airSensorControl.title"), this.$i18n.t("frontend.dashboard.airSensorControl.changed"));
			
            console.log("airsensorcontroldashboard.js sendws end...");
            
		},
		toggleWorkplaceAutoControlConfirmCancel: function(e) {
				
		},
		// 센터 자동제어 설정
		toggleAutoControl: function() {
			
			console.log("cur autoControl:"+this.selectedFacility.autoControl);
			
			if (this.selectedFacility.autoControl) {
			
				$("#confirmContent").html(this.$i18n.t("frontend.dashboard.airSensorControl.auto_control_off_content"));
				
			} else {
			
				if (this.airSensor.cmd == 'AUTO') {
					this.toastMessage("info", this.$i18n.t("frontend.dashboard.airSensorControl.title"), this.$i18n.t("frontend.dashboard.airSensorControl.alert_workplace_auto_control_on"));
				} else {
					$("#confirmContent").html(this.$i18n.t("frontend.dashboard.airSensorControl.auto_control_on_content"));	
				}							
			}
			
			this.airSensorConfirmCommon();
				
			$('#confirmOk').on('click', this.toggleAutoControlConfirmOk);
			$('#confirmCancel').on('click', this.toggleAutoControlConfirmCancel);
			
		},
		// 센터 자동제어 설정
		toggleAutoControlConfirmOk: function(e) {
			
			console.log("confirm cur autoControl:"+this.selectedFacility.autoControl);
			
			let updateFacility = this.selectedFacility;
			
			updateFacility.autoControl = !this.selectedFacility.autoControl;
			
			console.log("change autoControl:"+updateFacility.autoControl);
			console.log("change apiFacility:"+this.apiFacility);
			//console.log("change updateFacility:"+JSON.stringify(updateFacility));
			//console.log("change this.config:"+JSON.stringify(this.config));
			// call toggleAutoControl
			axios.put(this.apiFacility, JSON.stringify(updateFacility), this.config)
        		.then(async res => {
					$("#confirmDialog").modal('toggle');
					
					this.toastMessage("info", this.$i18n.t("frontend.dashboard.airSensorControl.title"), this.$i18n.t("frontend.dashboard.airSensorControl.changed"));
					//console.log("change res:"+JSON.stringify(res));
        			//$('#cover-spin').hide();
        			
        			//this.init();
        		})
        		.catch(async err => {
					$("#confirmDialog").modal('toggle');
					console.error("change err:"+err);
        			//$('#cover-spin').hide();
        			
        			if (err.response) {
	  			      	this.error_message = err.response.data.message;
	      			} else if (err.request) {
	      			    this.error_message = err.request;
	      			} else {
	      			    this.error_message = err.message;
	      			}
		        	
		        	//$('#alertFacilityError').show();
					
				});
		},
		toggleAutoControlConfirmCancel: function(e) {
				
		},
		togglePowerOn: function() {
			
			if (this.selectedFacility.autoControl) {
				
				this.toastMessage("info", this.$i18n.t("frontend.dashboard.airSensorControl.title"), this.$i18n.t("frontend.dashboard.airSensorControl.alert_auto_control_on"));
			} else {
				console.log("togglePowerOn this.airSensor.unit:"+this.airSensor.unit);
				if (this.airSensor.unit === 0) {
					// call power on
					$("#confirmContent").html(this.$i18n.t("frontend.dashboard.airSensorControl.motor_power_on_content"));
				} else {
					// call power off
					$("#confirmContent").html(this.$i18n.t("frontend.dashboard.airSensorControl.motor_power_off_content"));
				}				
				
				this.airSensorConfirmCommon();
				
				$('#confirmOk').on('click', this.togglePowerOnConfirmOk);
				$('#confirmCancel').on('click', this.togglePowerOnConfirmCancel);
			}
			
		},
		togglePowerOnConfirmOk: function(e) {
			
			//console.log("togglePowerOnConfirmOk this.airSensor:"+JSON.stringify(this.airSensor));
			
			let param = {
				facility_id: this.selectedFacility.fcode
				, mobius_id: this.selectedFacility.mobiusId
				, state: 0
				, controlType: '001'
			};
			
			if (this.airSensor.unit === 0) {
				// call power on
				param.state = 1;  // this.airSensor.astrength
				param.controlType = '001';
			} else {
				// call power off
				param.state = 0; 
				param.controlType = '000';
			}
		
			console.log("togglePowerOnConfirmOk param:"+JSON.stringify(param));
			//console.log("change this.config:"+JSON.stringify(this.config));
			// call toggleAutoControl
			
			//this.toastMessage("info", this.$i18n.t("frontend.dashboard.airSensorControl.title"), "준비중입니다.");
			
			//$("#confirmDialog").modal('toggle');
			//return;
			
			//console.log("airsensorcontroldashboard.js togglePowerOnConfirmOk sendws 1...");

			// dest(mobiusId), which(airsensor or aircleaner), command(-1: reboot, 0: stop, 1~3: strength)
			// me.sendws("/c2w/request/workplace", JSON.stringify({'MOBIUSID': '/AirSensor/Workplace_0004', 'CMD': 'CTRL', 'APOWER': 0}));              // 공기청정기 전원제어 : 0~1
            //this.$parent.sendws("/c2w/request/workplace", JSON.stringify({'MOBIUSID': this.selectedFacility.mobiusId, 'CMD': 'CTRL', 'APOWER': param.state, 'facility_id': param.facility_id, 'controlType': param.controlType, 'autoControlled': false}));         
            
			let paramSend = {'MOBIUSID': this.selectedFacility.mobiusId, 'CMD': 'MANUAL', 'ASTRENGTH': param.state, 'RANGE':[7,15,35]};
			
			console.log("togglePowerOnConfirmOk paramSend:"+JSON.stringify(paramSend));
			
			this.$parent.sendws("/c2w/request/workplace", JSON.stringify(paramSend));         
            
            if (this.$parent.alarmAirSensor != null && this.$parent.alarmAirSensor.facility.fcode === this.selectedFacility.fcode) {
            	this.$parent.control_alarm_facility_id = this.selectedFacility.fcode;
            }
            
            console.log("airsensorcontroldashboard.js togglePowerOnConfirmOk this.$parent.control_alarm_facility_id " + this.$parent.control_alarm_facility_id);
            
            $("#confirmDialog").modal('toggle');
					
			this.toastMessage("info", this.$i18n.t("frontend.dashboard.airSensorControl.title"), this.$i18n.t("frontend.dashboard.airSensorControl.changed"));
								
            console.log("airsensorcontroldashboard.js sendws end...");
            
		},
		togglePowerOnConfirmCancel: function(e) {
				
		},
		onMotorPowerIntensityChange: function(intensity) {
			
			//console.log("onMotorPowerIntensityChange intensity:"+intensity);
			//console.log("onMotorPowerIntensityChange selectedFacility.autoControl:"+this.selectedFacility.autoControl);
			
			if (this.selectedFacility.autoControl) {
				
				//this.toastMessage("info", this.$i18n.t("frontend.dashboard.airSensorControl.title"), this.$i18n.t("frontend.dashboard.airSensorControl.alert_auto_control_on"));
				
				this.airSensorAlertCommon(this.$i18n.t("frontend.dashboard.airSensorControl.alert_auto_control_on"));				
				
			} else {
					
				//console.log("onMotorPowerIntensityChange airSensor.unit:"+this.airSensor.unit);
				
				//if (this.airSensor.unit === 0) {
				
				//	this.toastMessage("info", this.$i18n.t("frontend.dashboard.airSensorControl.title"), this.$i18n.t("frontend.dashboard.airSensorControl.alert_power_off"));
				//} else {
					
					this.selectedIntensity = intensity;
					//console.log("onMotorPowerIntensityChange confirmContent set");
					$("#confirmContent").html(this.$i18n.t("frontend.dashboard.airSensorControl.motor_level_change_content"));
					
					this.airSensorConfirmCommon();
					
					$('#confirmOk').on('click', this.onMotorPowerIntensityChangeConfirmOk);
					$('#confirmCancel').on('click', this.onMotorPowerIntensityChangeConfirmCancel);
					//console.log("onMotorPowerIntensityChange confirmContent set end");
				//}
			}
			
		},
		onMotorPowerIntensityChangeConfirmOk: function(e) {
		
			//console.log("onMotorPowerIntensityChangeConfirmOk e:"+JSON.stringify(e));
			
			let param = {
				facility_id: this.selectedFacility.fcode
				, mobius_id: this.selectedFacility.mobiusId
				, intensity: this.selectedIntensity
			};
			
			//console.log("onMotorPowerIntensityChangeConfirmOk param:"+JSON.stringify(param));
			//console.log("change this.config:"+JSON.stringify(this.config));			
			
			//this.toastMessage("info", this.$i18n.t("frontend.dashboard.airSensorControl.title"), "준비중입니다.");
			
			//$("#confirmDialog").modal('toggle');
			//return;
			
			// call apiAirCleanerMotorPowerIntensityControl
			//console.log("airsensorcontroldashboard.js onMotorPowerIntensityChangeConfirmOk sendws 1...");

			// dest(mobiusId), which(airsensor or aircleaner), command(-1: reboot, 0: stop, 1~3: strength)
			// me.sendws("/c2w/request/workplace", JSON.stringify({'MOBIUSID': '/AirSensor/Workplace_0004', 'CMD': 'CTRL', 'ASTRENGTH': 0}));                     // 공기청정기 강도제어 : 0~3
            //this.$parent.sendws("/c2w/request/workplace", JSON.stringify({'MOBIUSID': this.selectedFacility.mobiusId, 'CMD': 'CTRL', 'ASTRENGTH': this.selectedIntensity, 'facility_id': param.facility_id, 'controlType': '01'+this.selectedIntensity, 'autoControlled': false}));         
            
            let paramSend = {'MOBIUSID': this.selectedFacility.mobiusId, 'CMD': 'MANUAL', 'ASTRENGTH': this.selectedIntensity, 'RANGE':[7,15,35]};
			
			console.log("onMotorPowerIntensityChangeConfirmOk paramSend:"+JSON.stringify(paramSend));
			
			this.$parent.sendws("/c2w/request/workplace", JSON.stringify(paramSend));         
            
            if (this.$parent.alarmAirSensor != null && this.$parent.alarmAirSensor.facility.fcode === this.selectedFacility.fcode) {
            	this.$parent.control_alarm_facility_id = this.selectedFacility.fcode;
            }
            
            //console.log("airsensorcontroldashboard.js onMotorPowerIntensityChangeConfirmOk this.$parent.control_alarm_facility_id:" + this.$parent.control_alarm_facility_id);
            
			$("#confirmDialog").modal('toggle');
			
			this.toastMessage("info", this.$i18n.t("frontend.dashboard.airSensorControl.title"), this.$i18n.t("frontend.dashboard.airSensorControl.changed"));
			
		},
		onMotorPowerIntensityChangeConfirmCancel: function(e) {
		
		},
	},
	created: function () {
		
	},
	mounted: function () {
		let me = this;
		
		this.alarmAirSensor = this.$parent.alarmAirSensor;
			
		if (this.isOpenAirSensorControl) {
			this.init();
		}
		
		//$("#" + me.parentContainerId).on('resize', me.onResize);
		//me.updateNonoScrollbar();
		
		//$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		//	if(e.target.id == 'bridgeinformation-tab') {
		//		me.redrawChart();
		//	}
		//});
		
		//console.log("airsensorcontroldashboard.js mounted end...");
	},
	updated: function() {
		
	},
	beforeDestroy: function() {
		//this.clearTimer();
	},
});