
import basemaptemplate from '../templates/map/basemap.html.js'

import olpopup from '../common/olpopup.js'


export default Vue.component('basemap', {
	template: basemaptemplate,
	components: {

	},
	data: function () {
		return {
			baseMap: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			//baseMap2: 'http://xdworld.vworld.kr:8080/2d/Base/201908/{z}/{x}/{y}.png', // vworld 기본지도
			baseMap2: 'https://icloud.incheon.go.kr/Basemap/Normal_kor/{z}/{x}/{y}.png', // 인천시 기본지도
			//satelliteMap: 'http://xdworld.vworld.kr:8080/2d/Satellite/201807/{z}/{x}/{y}.jpeg', // vworld 위성지도
			satelliteMap: 'https://icloudgis.incheon.go.kr/server/rest/services/Outer_image/BASEMAP_AIREX_WM/MapServer/tile/{z}/{y}/{x}', // 인천시 항공사진
			//hybridMap: 'http://mt{0-3}.google.com/vt/lyrs=m&hl=ko&x={x}&y={y}&z={z}', //'http://xdworld.vworld.kr:8080/2d/Hybrid/201812/{z}/{x}/{y}.png',
			hybridMap: 'https://iocloud.incheon.go.kr/Basemap/Normal_kor/{x}/{y}/{z}',
			symbolPath: '/api/facility/symbol/',
			symbolStatusPath: '/api/facility/symbol/status/',
			apiFacility: '/api/facility',
			apiCategory: '/api/facility/category',
			apiNotification: '/api/notification/last',
			apiNotificationAdd: '/api/notification/add',
			apiTodayDashboardEvents: 'api/getTodayDashboardEvents',

			apiStationList: '/api/airstation/station',
            apiUser: '/api/users',
            apiFreeSetLine: '/api/freeSetInfo',

            apiFreeSetLineGroup: '/api/freeSetInfoGrade',
            apiMapFreeSet: '/api/mapFreeSetInfo',
            apiTrafficFreeSet: '/api/trafficLineSpeed',
            apiTrafficGroupFreeSet: '/api/trafficLineSpeedGroup',
            apiCCTVGradeGroupInfo: '/api/CCTVGradeGroupInfo',
            apiCCTVGradeInfo: '/api/CCTVGradeInfo',
            apiWallFreeSetInfo: '/api/wallFreeSetInfo',
            apiWallFreeSetAction: '/api/WallFreeSetAction',
            apiWizWigSocket: '/api/wizWingData',

			apiLastAirSensorInfo: '/api/airsensor/status',
			apiPollutionStandard: '/api/pollutionStandard',
			//kjw
			apideviceEvent: '/api/deviceEvent',
			
			apiInsertDashboardEventProc: '/api/insertDashboardEventProc',
			apiUpdateDashboardEventChecking: '/api/updateDashboardEventChecking',
			
			apiVmsTokens: '/api/vmsTokens',
			
			symbolVectorLayer: null,
			symbolVectorSource: null,
			statusVectorLayer: null,
			statusVectorSource: null,
            freeSetLineVectorLayer: null,
            freeSetLineVectorSource: null,

			selectedFacilityPopup: null,
			olpopupComp: null,
			mapArea: null,
			stompClient: null,
			isConnectedStome: false,
			controlTargetFacility: {},

			// used data
			facilityCategoryItems: [],
			facilityItems: [],
			notificationItems: [],
			airsensorStations: [],	// 에어코리아 관측소 (not 사업장대기센서)
			selectedFacility: {},
			wallControlSelector: null,
			airAlarmTypeCode: null,
			airAlarmValue: null,
			control_alarm_facility_id: null,
			todayDashboardEvents: [],
			todayDashboardEventsNoChecking: 0,
			firePopStep: '',
			firePopStepNm: '',
			firePopEventId: '',
			classEventStart: '',
			classFreesetManualStop: '',
			classGetCoodinate: '',
			classSendCoordiDron: '',
			classSendInfoRelated: '',
			classSendSmsCompany: '',
			classEventFinish: '',			
			
			fireMessagePop: false,
			commonPopTitle: '',
			commonPopMessage: '',
			commonConfirmPop: false,
			fireLatitude: null,
			fireLongitude: null,
			confirm_message: '',
			fireItem: null,
			
			isShowPtzCtrl: false,
			isShowDronePtzCtrl: false,
            isFreeSet: false,
            isGlobalOpen: false,
            isGlobalId: [],
            isGlobalPresetNo: 0,
            isDronStationOpen: false,
            isWallControlOpen: false,
            isBusControlOpen: false,
            busCoordinate: [],
//			//속도표출
//			speedOpen : false,

			//Draw
			currentCoordinate: [],
			pointerCoordinate: [],
			pointerLonLat: [],
			saveLonLat: [],
			pointerOpen: false,
			lonlatItems :{
				longitude : null,
				latitude : null,
			},
			isNamed : false,

			apiDrawLine: '/api/drawLine',
            // VMS
			
			//온도 연기 and조합
			presetObj : {
				cctvNo :0,
			 	presetNo :'',
			},
			//
			cctv:0,
			preSet:'',
			
            inodepURL : "",
            inodepLoginURL : "login?force-login=true",
            inodepLogoutURL : "logout",
            inodepGroup : "group1",
            inodepLicense : "licNormalClient",
            inodepAuthToken : null,
            inodepApiSerial : 0,
            inodepUserSerial : null,
            restIp: "172.16.1.24",
            restPort: 8080,
            vmsId: "sandan2",
            vmsPw: "P@ssw0rd1",
            /*restIp: "112.219.69.210",
            restPort: 16118,
            vmsId: "sdk",
            vmsPw: "Innodep1@",*/

			// 대시보드 관련 관리 값들
			// isOpen : 해당 대시보드의 열림 / 닫힘 bool
			// isFull : 해당 대시보드의 전체창모드 bool
			// uiUpdateFunctionName : 해당 대시보드의 스타일과 이벤트 관련 함수 (드래그, z-index 등)
			dashboardManage: {
				airSensor: {
                    isOpen: false,
                    isFull: false,
                    uiUpdateFunctionName: "onUpdateAirSensorUI"
                },
                airSensorPopup: {
                    isOpen: false,
                    isFull: false,
                    uiUpdateFunctionName: "onUpdateAirSensorUI"
                },
                droneStation: {
                    isOpen: false,
                    isFull: false,
                    uiUpdateFunctionName: "onUpdateDroneStationUI"
                },
                droneStationPopup: {
                    isOpen: false,
                    isFull: false,
                    uiUpdateFunctionName: "onUpdateDroneStationUI"
                },
                airSensorControl: {
                    isOpen: false,
                    isFull: false,
                    uiUpdateFunctionName: "onUpdateAirSensorControlUI"
                },
                airSensorControlPopup: {
                    isOpen: false,
                    isFull: false,
                    uiUpdateFunctionName: "onUpdateAirSensorControlUI"
                },
                airSensorStation: {
                    isOpen: false,
                    isFull: false,
                    uiUpdateFunctionName: "onUpdateAirSensorStationUI"
                },
                airSensorStationPredict: {
                    isOpen: false,
                    isFull: false,
                    uiUpdateFunctionName: "onUpdateAirSensorStationPredictUI"
                },
                alarm: {
                    isOpen: false,
                    isFull: false,
                    uiUpdateFunctionName: "onUpdateAlarmUI"
                },
                wallFreeSet: {
                    isOpen: false,
                    isFull: false,
                    uiUpdateFunctionName: "onUpdateWallFreeSetUI"
                },
                cctvGrade1: {
                    isOpen: false,
                    uiUpdateFunctionName: "onUpdateCctvGrade1"
                },
                cctvGrade2: {
                    isOpen: false,
                    uiUpdateFunctionName: "onUpdateCctvGrade2"
                },
                wallFreeSetPopup: {
                    isOpen: false,
                    isFull: false,
                    uiUpdateFunctionName: "onUpdateWallFreeSetUI"
                },
                siren: {
                    isOpen: false,
                    uiUpdateFunctionName: "onUpdateSirenUI"
                },
                alarmDashBord: {
                    isOpen: false,
                    uiUpdateFunctionName: "onUpdatealarmDashBordUI"
                },
                traffic: {
                    isOpen: false,
                    uiUpdateFunctionName: "interValTraffic"
                },
                onCctv1: {
                    isOpen: false,
                    uiUpdateFunctionName: "onUpdateonCctv1"
                },
                onCctv2: {
                    isOpen: false,
                    uiUpdateFunctionName: "onUpdateonCctv2"
                },
			},

			zIndex: 999,
			timerLayout: null,
			dashboardLayout: {},

			// 시설물 종류별로 정리해놓은 배열
			// 메인 좌측의 사이드바에 편하게 뿌리기 위해 사용
			facilityItemsByCategory: [],

			// 현재 줌 (zoom에 따라 심볼의 스케일을 변화시키기 위해 기록)
			currentZoom: 15,

			// 현재 심볼들의 스케일 (zoom에 따라 스케일이 변하기 때문에 기록)
			currentScale: 1.0,

			// 열화상카메라 시설물만 모아놓은 배열
			// 열화상카메라 대시보드에 사용
			fireCCTVFacility: [],

			airSensorTimer: null,
			lastCheckFacilityIdx: null,
			airSensor: null,
			pollutionStandard: {},
			airSensorCheckCalled: false,
			error_message: null,
			alarmAirSensor: null,
			//kjw
			smoke:"이상 무",
			fiery:"이상 무",
			temperature:"이상 무",
			/*********************
			* 이노뎁 이벤트 json 정보, kjw
			* dev_serial, preset_no
			*********************/
			vmsTokens:{
				inodepAuthToken : '',
				inodepApiSerial : '',
				vmsId : ''

			},
			
			//이벤트 AND연산 실시간은 불가.
			eventItems:{
				smoke:"이상 무",
				fiery:"이상 무",
				temperature:"이상 무",
			},
			
			fireCCTVEventInfo: {},
			//kjw 교통 이터벌 값
            interValTrafficVar: null,
			//vmsConfig: {},

			nodeSource: null,
			linkSource: null


		}
	},
	computed: {
		...Vuex.mapGetters({
			myInfo: 'basic/getMyInfo'
		}),
		...Vuex.mapGetters({
			linkUrl: 'basic/getLinkUrl'
		}),
		...Vuex.mapGetters({
			vmsConfig: 'basic/getVmsConfig'
		}),

		mapCenterLatLong: function() {
			let me = this;
			let center_v = [126.695906, 37.405324];
			return center_v
		},
		
		//일진 도금단지용 센터 좌표(현재는 주차장으로 테스트) yjh
		mapCenterLatLong2: function() {
			let me = this;
			let center_v = [126.71188178449762, 37.416224306812865];
			return center_v
		},
		airSensorFacility: function() {
			return this.facilityItems.filter(item => {
				return (item.facilityCategory.ccode == 'AIR_SENSOR');
			});
		},
		droneStationFacility: function() {
			return this.facilityItems.filter(item => {
				return (item.facilityCategory.ccode == 'DRONE_STATION');
			});
		},
		// 모든 대시보드 열기 / 닫기 bool
		isOpenAllDashboard: {
			get: function() {
				var me = this;

				// 모든 대시보드가 열려있다면 이 값도 true, 하나라도 닫혀있다면 false
				return Object.keys(me.dashboardManage).every(key => me.dashboardManage[key].isOpen);
			},
			set: function(isOpen) {
				var me = this;

				// 이 값이 변경될때 같은 값을 모든 대시보드에 적용 (열린 상태라면 모든 대시보드 열림, 닫힘 상태라면 모든 대시보드 닫힘)
				Object.keys(me.dashboardManage).forEach(key => {
					if (key != 'alarm' && key != 'siren' && key != 'alarmDashBord' && key != 'airSensorStation' && key != 'airSensorStationPredict' && key != 'cctvGrade1' && key != 'cctvGrade2'&& key != 'onCctv1' && key != 'onCctv2' && key != 'traffic'&& key != 'airCleaner1'&& key != 'airCleaner2'&& key != 'airCleaner3') {
                        if(key != 'airSensorPopup' && key != 'airSensorControlPopup' && key != 'droneStationPopup' && key != 'wallFreeSetPopup') {
							  me.dashboardManage[key].isOpen = isOpen;
                        }
					}
				});
			}
		},
		// dashboardManage 속성이 변경될때 내부적으로 계산될 computed 속성
		// watch에서 dashboardManage를 감시하는데 dashboardManage가 오브젝트(레퍼런스)이기 때문에 newValue와 oldValue가 차이가 없이 전달됨
		// watch에서 newValue, oldValue의 차이를 만들기 위해 기존 dashboard를 deep copy하여 리턴한다.
		// deep copy에는 lodash 라이브러리 사용
		computedDashboardManage: function() {
			var newValue = _.cloneDeep(this.dashboardManage);
			return newValue;
		},

	},
	watch: {
		vmsConfig(state) {
			this.inodepLogin()
			//this.updateTokens()
		},
		facilityItems: function() {
			let me = this;
		},

		// dashboardManage 속성을 통해 대시보드 창의 열림 / 닫힘을 관리하는데
		// 대시보드 element는 v-if로 그려지기에 isOpen이 false일때는 element가 아예 dom에서 사라진다.
		// 그래서 isOpen이 true일때, 해당 대시보드의 스타일을 조정해주기 위해 (드래그, z-index 등) ui를 업데이트해주는 함수를 실행해준다.
		// 다만, 이전에 이미 열려있는 대시보드가 있을 때 다른 대시보드를 열게 되면 이미 열려있던 대시보드의 isOpen값도
		// 이미 true이기 때문에 ui 업데이트 함수가 또 실행되는 현상이 생긴다.
		// 그래서 dashboardManage가 수정될 때, 내부적으로 사용할 computedDashboardManage를 computed 속성에 선언 후
		// 해당 computedDashboardManage를 감시하도록 하여, computedDashboardManage에 deep copy에 의해 newValue와 oldValue의 차이를 만든 후
		// 현재 isOpen이 true이고, 이벤트 발생 이전 isOpen과 값이 다를 경우에만 ui 업데이트 함수를 실행해준다.
		computedDashboardManage: {
			deep: true,
			handler(newDashboardManage, oldDashboardManage) {
				var me = this;
				Object.keys(newDashboardManage).forEach(key => {
                    if(oldDashboardManage[key].isOpen != newDashboardManage[key].isOpen) {
                        if(key != 'cctvGrade1' && key != 'cctvGrade2' && key != 'onCctv1' && key != 'onCctv2' && key != 'traffic' && key != 'airCleaner1' && key != 'airCleaner2' && key != 'airCleaner3') {
                            this.openCheck(key, newDashboardManage[key].isOpen);
                        }
                    }
					if(newDashboardManage[key].isOpen && newDashboardManage[key].isOpen !== oldDashboardManage[key].isOpen)
                        me[newDashboardManage[key].uiUpdateFunctionName]();
				});
                if(newDashboardManage.droneStation.isOpen) {
                    if(!this.isDronStationOpen) {
                        this.onDronStation();
                        this.isDronStationOpen = true;
                    }
                } else {
                    this.isDronStationOpen = false;
                }
                if(newDashboardManage.wallFreeSet.isOpen) {
                    if(!this.isWallControlOpen) {
                        this.onWallFreeSet();
                        this.isWallControlOpen = true;
                    }
                } else {
                    this.isWallControlOpen = false;
                }
				//A-1구역
				/* 
				// 프리셋 구역 레이어 메모리 문제로 사용중지 
                if(newDashboardManage.cctvGrade1.isOpen) {
                    this.getCCTVGradeInfo('838', true);
                } else {
                    this.getCCTVGradeInfo('838', false);
                }
				//A-2구역
                if(newDashboardManage.cctvGrade2.isOpen) {
                    this.getCCTVGradeInfo('843', true);
                } else {
                    this.getCCTVGradeInfo('843', false);
                }
                */
				//교통소통정보
                if(newDashboardManage.traffic.isOpen) {
					this.getTrafficTemp();
					//this.wizTest22();
					//this.inodepLogout();
					//this.ptzMove();
                } else {
					//kjw
					//인터벌 삭제
					clearInterval(me.interValTrafficVar);
					//교통레이어 삭제
					var layersToRemove = [];
		            this.mapArea.getLayers().forEach(layer => {
		                if(layer.get('name') != undefined && layer.get("name") === 'TRAFFIC'){
		                    layersToRemove.push(layer);
		                }
		            });

		            var len = layersToRemove.length;
		            for(var i = 0; i < len; i++) {
		                this.mapArea.removeLayer(layersToRemove[i]);
		            }
                }
				//1번카메라 프리셋
				if(newDashboardManage.onCctv1.isOpen){
					this.onToggleCameraButton('838',true);
				}else{
					this.onToggleCameraButton('838',false);
				}
				//2번카메라 프리셋
				if(newDashboardManage.onCctv2.isOpen){
					this.onToggleCameraButton('843',true);
				}else{
					this.onToggleCameraButton('843',false);
				}
			}
		}
		, alarmAirSensor: function() {

			//console.log('basemap watch alarmAirSensor:' + this.alarmAirSensor);

			if (this.alarmAirSensor != null && this.alarmAirSensor.facility != null) {

				let notiItem = {
					info: this.airAlarmTypeCode + " " + this.$i18n.t("frontend.dashboard.alarm.noti_message")
					//info: this.$i18n.t("frontend.dashboard.alarm.noti_message") + this.airAlarmTypeCode + " " + this.airAlarmValue
					, level: 2
					, data: this.airAlarmValue
					, facility: this.alarmAirSensor.facility
				};
				//console.log("### apiNotificationAdd param notiItem:"+JSON.stringify(notiItem));

				axios.put(this.apiNotificationAdd, JSON.stringify(notiItem), this.config)
	    		.then(res => {

	    			if(res != null && res.data != null && res.data != "") {
						//console.log("### apiNotificationAdd res.data:"+JSON.stringify(res.data));
	    			} else {
						console.error("### apiNotificationAdd result res:"+JSON.stringify(res));
					}
	    		})
	    		.catch(err => {
					console.error("apiNotificationAdd err:"+err);
	    		});
			}
		}
		, control_alarm_facility_id: function() {

			//console.log('basemap watch control_alarm_facility_id:' + this.control_alarm_facility_id);

			if (this.alarmAirSensor != null && this.control_alarm_facility_id != null) {

				if (this.dashboardManage.alarm.isOpen) {

					this.dashboardManage.alarm.isOpen = false;

					setTimeout(() => {

						this.dashboardManage.alarm.isOpen = true;

						setTimeout(() => {

							this.$set(this.$refs.alarmdashboardComp, 'controlFacilityId', this.control_alarm_facility_id);
							this.$set(this.$refs.alarmdashboardComp, 'pollutionStandard', this.pollutionStandard);
							this.$set(this.$refs.alarmdashboardComp, 'airSensor', this.airSensor);

						}, 300);

					}, 300);
				} else {
					this.dashboardManage.alarm.isOpen = true;

					setTimeout(() => {

						this.$set(this.$refs.alarmdashboardComp, 'controlFacilityId', this.control_alarm_facility_id);
							this.$set(this.$refs.alarmdashboardComp, 'pollutionStandard', this.pollutionStandard);
							this.$set(this.$refs.alarmdashboardComp, 'airSensor', this.airSensor);

					}, 300);
				}
			}
		},
	},
	methods: {
		toggleCctvAreaPreset: function(event) {
			var areaPresetTarget = event.target.value;
			var areaPresetChecked = event.target.checked;
			
			this.getCCTVGradeInfo(areaPresetTarget, areaPresetChecked);
		},
		commonFireAction: function() {	
		
			if (this.firePopStep == 'SEND_COORDI_DRON') {
				this.sendCoordiDron();
			} else if (this.firePopStep == 'SEND_INFO_RELATED') {
				this.sendInfoRelated();
			} else if (this.firePopStep == 'SEND_SMS_COMPANY') {
				this.sendSmsCompany();
			} else if (this.firePopStep == 'EVENT_FINISH') {
				this.eventFinish();
			}
			
		},
		sendCoordiDron: function(procDesc) {
			// TODO : 드론GCS 좌표 전송 연계 로직 추가			
			
			// 처리 성공시 화재감지 프로세스 처리 이력 등록
			var procDesc = "좌표: " + this.fireLatitude + ", " + this.fireLongitude;
			this.insertDashboardEventProc(procDesc);
		},
		sendInfoRelated: function() {
			// TODO : 유관기관 전송 로직 추가			
			
			// 처리 성공시 화재감지 프로세스 처리 이력 등록
			var procDesc = "좌표: " + this.fireLatitude + ", " + this.fireLongitude;
			this.insertDashboardEventProc(procDesc);
		},
		sendSmsCompany: function() {
			// TODO : 산단기업 SMS 발송 로직 추가			
			
			// 처리 성공시 화재감지 프로세스 처리 이력 등록
			var procDesc = "";
			this.insertDashboardEventProc(procDesc);
		},
		/**
		 * 경고 이벤트 목록 데이터 조회
		 */
		getTodayDashboardEvents: function() {
			var me = this;

			axios.get(me.apiTodayDashboardEvents, {
				params: {
					enabled: true
				}
			})
    		.then(res => {
    			if(res != null && res.data != null) {
    			
    				me.todayDashboardEvents = res.data;
    				
    				me.todayDashboardEventsNoChecking = 0;
    				
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					if(!obj.checking) {
    						me.todayDashboardEventsNoChecking++;
    					}
    				}
    			}
    		});
		},
		eventFinish: function() {
		
			if (this.confirm_message == null) {
				this.confirm_message = '';
			}
			
			var param = {
                    id: this.firePopEventId,
                    confirm_message: this.confirm_message
                    };
            console.log("param:"+JSON.stringify(param));
            
			axios.get(this.apiUpdateDashboardEventChecking, {
                params: param
                })
    		.then(res => {
    			console.log("done");
    			this.getFireMessagePop(this.firePopStepNm, this.firePopStepNm+"이 등록되었습니다.");
    			this.getTodayDashboardEvents();
    		})
    		.catch(err => {
    			this.getFireMessagePop(this.firePopStepNm, this.firePopStepNm+"이 실패하였습니다.");
    		});

		},
		insertDashboardEventProc: function(procDesc) {
		
			axios.get(this.apiInsertDashboardEventProc, {
                params: {
                    event_id: this.firePopEventId,
                    process_cd: this.firePopStep,
                    procDesc: procDesc
                    }
                })
    		.then(res => {
    			console.log("done");
    			this.getFireMessagePop(this.firePopStepNm, this.firePopStepNm+"이 성공하였습니다.");
    		})
    		.catch(err => {
    			this.getFireMessagePop(this.firePopStepNm, this.firePopStepNm+"이 실패하였습니다.");
    		});

		},
		openFireAlert: function(eventId) {
			
			this.firePopEventId = eventId;
			this.firePopStep = 'EVENT_ALERT';

			setTimeout(() => {
				if (this.firePopStep == 'EVENT_ALERT') {
					this.closeFireAlert();
				}
			}, 3000);
		},
		closeFireAlert: function() {
			this.fireNextPop();
		},
		getFireMessagePop: function(title, message) {
		
			this.commonConfirmPop = false;
			
			this.fireMessagePop = true;
			this.commonPopTitle = title;
			this.commonPopMessage = message;
		},
		
		//화재 이벤트 발생시 나오는 스텝
		fireNextPop: function() {
			
			this.fireMessagePop = false;
			
			if (this.firePopStep == 'EVENT_ALERT') {
				this.getFirePopStep('EVENT_START');
			} else if (this.firePopStep == 'EVENT_START') {
				this.getFirePopStep('FREESET_MANUAL_STOP');
			} else if (this.firePopStep == 'FREESET_MANUAL_STOP') {
				this.getFirePopStep('GET_COORDINATE');
			} else if (this.firePopStep == 'GET_COORDINATE') {
				this.getFirePopStep('SEND_COORDI_DRON');
			} else if (this.firePopStep == 'SEND_COORDI_DRON') {
				this.getFirePopStep('SEND_INFO_RELATED');
			} else if (this.firePopStep == 'SEND_INFO_RELATED') {
				this.getFirePopStep('SEND_SMS_COMPANY');
			} else if (this.firePopStep == 'SEND_SMS_COMPANY') {
				this.getFirePopStep('EVENT_FINISH');
			} else if (this.firePopStep == 'EVENT_FINISH') {
				this.getFirePopStep('');
			}
		},
		//화재이벤트 발생시 step 화면
		getFirePopStep: function(step, item) {
			
			if (item != null && item != undefined) {
				this.fireItem = item;
			}
			
			this.firePopStep = step;
			
			this.classEventStart = '';
			this.classFreesetManualStop = '';
			this.classGetCoodinate = '';
			this.classSendCoordiDron = '';
			this.classSendInfoRelated = '';
			this.classSendSmsCompany = '';
			this.classEventFinish = '';
			
			if (this.firePopStep == 'EVENT_START') {
				this.classEventStart = 'on';
				this.firePopStepNm = '화재발생 이벤트분석';
			} else if (this.firePopStep == 'FREESET_MANUAL_STOP') {
				this.classFreesetManualStop = 'on';
				this.firePopStepNm = '관리자 확인(프리셋 수동중지)';
			} else if (this.firePopStep == 'GET_COORDINATE') {
				this.classGetCoodinate = 'on';
				this.firePopStepNm = '좌표확인';
			} else if (this.firePopStep == 'SEND_COORDI_DRON') {
				this.classSendCoordiDron = 'on';
				this.firePopStepNm = '드론 좌표전송';
			} else if (this.firePopStep == 'SEND_INFO_RELATED') {
				this.classSendInfoRelated = 'on';
				this.firePopStepNm = '유관기관 전송';
			} else if (this.firePopStep == 'SEND_SMS_COMPANY') {
				this.classSendSmsCompany = 'on';
				this.firePopStepNm = '산단기업 SMS발송';
			} else if (this.firePopStep == 'EVENT_FINISH') {
				this.classEventFinish = 'on';
				this.firePopStepNm = '관리자 확인(상황종료)';
				this.confirm_message = this.fireItem.confirmMessage;
			}

		},
		
		//화재방지카메라 스트리밍쓰던 시절 스트리밍 화면 조정 함수
		fireCCTVStyle: function(facility) {
			let style = "position:absolute;";
			if(this.hasRole('ADMIN, SECURITY') && facility) {
				if(facility.isFull) {
					style += "left:0px; top: 0px; width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; z-index:999999999999;";
					$("body").css('overflow', 'hidden');
				} else {
					$("body").css('overflow', 'auto');
					if(this.dashboardLayout["fireCCTV" + facility.fcode] != null && this.dashboardLayout["fireCCTV" + facility.fcode].left != null) {
						style += "left:";
						style += this.dashboardLayout["fireCCTV" + facility.fcode].left;
						style += ";";
					} else {
						style += "left:8px;"
					}
					if(this.dashboardLayout["fireCCTV" + facility.fcode] != null && this.dashboardLayout["fireCCTV" + facility.fcode].top != null) {
						style += "top:";
						style += this.dashboardLayout["fireCCTV" + facility.fcode].top;
						style += ";";
					} else {
						if(this.dashboardLayout["fireCCTV" + facility.fcode] != null && this.dashboardLayout["fireCCTV" + facility.fcode].bottom != null) {
							style += "bottom:";
							style += this.dashboardLayout["fireCCTV" + facility.fcode].bottom;
							style += ";";
						} else {
							style += "top:75px;"
						}
					}
					if(this.dashboardLayout["fireCCTV" + facility.fcode] != null && this.dashboardLayout["fireCCTV" + facility.fcode].width != null) {
						style += "width:";
						style += this.dashboardLayout["fireCCTV" + facility.fcode].width;
						style += ";";
					} else {
						style += "width: 20vw;"
					}
					if(this.dashboardLayout["fireCCTV" + facility.fcode] != null && this.dashboardLayout["fireCCTV" + facility.fcode].height != null) {
						style += "height:";
						style += this.dashboardLayout["fireCCTV" + facility.fcode].height;
						style += ";";
					} else {
						style += "height: 35vh;"
					}
					style += "min-width: 20vw; z-index:";
					if(this.dashboardLayout["fireCCTV" + facility.fcode] != null && this.dashboardLayout["fireCCTV" + facility.fcode].zIndex != null) {
						//style += this.dashboardLayout["fireCCTV" + facility.fcode].zIndex;
						//style += ";";
                        style += "999999999999999;"
					} else {
						style += "999999999999999;"
					}
				}
			} else {
				style = "display: none;";
			}
			return style;
		},
		testtest: function(){

			if($('#test').attr('class') == 'btn'){
			$('#test').attr('class','btn on');
			}
			

		},
		
		
		//6종센서 오염도 기준 호출
		getPollutionStandard: function() {

			axios.get(this.apiPollutionStandard)
	    		.then(res => {
	    			if(res != null && res.data != null) {
	    				this.pollutionStandard = res.data;
						if (!this.airSensorCheckCalled && this.airSensorFacility.length > 0) {
							this.airSensorCheckCalled = true;
							this.airSensorCheckCall();
						}
	    			}
	    		})
	    		.catch(err => {
					console.error("pollutionStandard err:"+JSON.stringify(err));
	    		});
		},
		airSensorCheckCall: function() {
			if (this.airSensorFacility != 'undefined') {
				this.airSensorCheck();
			}
			//this.airSensorTimer = setInterval(this.airSensorCheck, 1000*30);
		},
		airSensorCheck: function() {

			//console.log("### airSensorCheck this.airSensorFacility:"+JSON.stringify(this.airSensorFacility));

			this.airSensorFacility.forEach((item) => {

				//console.log("### call apiLastAirSensorInfo item:"+JSON.stringify(item));
				//console.log("### airSensorCheck item.id:"+JSON.stringify(item.id));
				//console.log("### airSensorCheck item.facilityName:"+JSON.stringify(item.facilityName));

				if (true) { // 자동제어는 아니더라도 경고팝업은 띄운다.

					axios.get(this.apiLastAirSensorInfo+"/"+item.fcode)
		    		.then(res => {

						let airSensor = {};
						let airSensorActionLevel = 0;

		    			if(res != null && res.data != null && res.data != "") {

							airSensor = res.data;
							//console.log("### airSensorCheck result:"+airSensor.facility.facilityName+"["+airSensor.facility.fcode+"], autoControl:"+airSensor.facility.autoControl);
		    				//console.log("### airSensorCheck result facility:"+JSON.stringify(airSensor.facility));

							if (this.pollutionStandard == null) {
								console.error("this.pollutionStandard == null");

							} else {

								//console.log("### cur airSensor.pm10:"+airSensor.pm10);
								if (airSensor.pm10 >= this.pollutionStandard.pm10High
									|| airSensor.pm25 >= this.pollutionStandard.pm25High
									|| airSensor.co2 >= this.pollutionStandard.co2High
									|| airSensor.tvoc >= this.pollutionStandard.tvocHigh
									|| airSensor.pm1 >= this.pollutionStandard.pm1High) {
									airSensorActionLevel = 3; //'high';
								} else if (airSensor.pm10 >= this.pollutionStandard.pm10Middle
									|| airSensor.pm25 >= this.pollutionStandard.pm25Middle
									|| airSensor.co2 >= this.pollutionStandard.co2Middle
									|| airSensor.tvoc >= this.pollutionStandard.tvocMiddle
									|| airSensor.pm1 >= this.pollutionStandard.pm1Middle) {
									airSensorActionLevel = 2; //'middle';
								} else if (airSensor.pm10 >= this.pollutionStandard.pm10Low
									|| airSensor.pm25 >= this.pollutionStandard.pm25Low
									|| airSensor.co2 >= this.pollutionStandard.co2Low
									|| airSensor.tvoc >= this.pollutionStandard.tvocLow
									|| airSensor.pm1 >= this.pollutionStandard.pm1Low) {
									airSensorActionLevel = 1; //'low';
								}

								//console.log("### cur airSensor.facility.facilityName:"+airSensor.facility.facilityName);
								//console.log("### cur airSensor.co2:"+airSensor.co2);
								//console.log("### cur airSensor.unit:"+airSensor.unit);
								//console.log("### this.airSensorCheck airSensorActionLevel:"+airSensorActionLevel);

								if (airSensor.unit < airSensorActionLevel) {

									console.warn("### call "+airSensor.facility.facilityName+"["+airSensor.facility.fcode+"] airSensor unit to:"+airSensorActionLevel);

									this.setAirAlarmTypeCode(airSensor);

									if (item.autoControl) { // 자동제어이면 공기청정기 가동
										//if (airSensor.unit === 0) { // 꺼진 경우에도 필요한 모터세기만 호출하면 되도록 서버에서 처리 필요
										//	this.togglePowerOn(airSensor.facility.fcode, airSensor.facility.mobiusId, airSensorActionLevel);
										//} else {
											this.onMotorPowerIntensityChange(airSensor.facility.fcode, airSensor.facility.mobiusId, airSensorActionLevel);
										//}

										this.control_alarm_facility_id = airSensor.facility.fcode;
									}

									if (this.alarmAirSensor == null || this.alarmAirSensor.facility.fcode != airSensor.facility.fcode) {
										this.alarmAirSensor = airSensor;
										//console.log("basemap.js new alarmAirSensor set");
									}

									if (!this.dashboardManage.alarm.isOpen) {

										this.dashboardManage.alarm.isOpen = true;
										//console.log("getZoom:"+this.mapArea.getView().getZoom());
										//this.mapArea.getView().setZoom(17);
										//this.mapArea.getView().setCenter(ol.proj.transform([this.alarmAirSensor.facility.longitude, this.alarmAirSensor.facility.latitude], 'EPSG:4326', 'EPSG:900913'));

									}

									if (!this.dashboardManage.airSensorStation.isOpen) {

										this.dashboardManage.airSensorStation.isOpen = true;
									}

									if (!this.dashboardManage.airSensorStationPredict.isOpen) {

										this.dashboardManage.airSensorStationPredict.isOpen = true;
									}

								} else {

									if (this.alarmAirSensor && this.alarmAirSensor.facility && this.alarmAirSensor.facility.fcode === airSensor.facility.fcode) {
										this.alarmAirSensor = null;
										console.log("basemap.js alarmAirSensor cleaned");
									}
								}

								if (this.alarmAirSensor && this.alarmAirSensor.facility && this.alarmAirSensor.facility.fcode === airSensor.facility.fcode) {

									//console.log("alarmAirSensor status update airSensor:"+JSON.stringify(airSensor));

									if (!this.dashboardManage.alarm.isOpen) {

										this.dashboardManage.alarm.isOpen = true;
									}

									setTimeout(() => {
										if (this.$refs.alarmdashboardComp != null)
											this.$set(this.$refs.alarmdashboardComp, 'airSensor', this.alarmAirSensor);

									}, 300);
								}

								if (this.$refs.airsensorcontroldashboardComp) {

									//console.log('airsensorcontroldashboardComp set recvAirSensor facility.fcode:'+airSensor.facility.fcode);
									this.$set(this.$refs.airsensorcontroldashboardComp, 'recvAirSensor', airSensor);
								}
							}
		    			} else {

							//console.log("### airSensorCheck result is null");
						}
		    		})
		    		.catch(err => {
						console.error("airSensorCheck err:"+err);
		    		});

				} else {

					//console.log("### airSensorCheck item:"+item.facilityName+"["+item.id+"], autoControl:"+item.autoControl);
				}
			});
		},
		setAirAlarmTypeCode: function(airSensor) {

			if (airSensor.pm10 >= this.pollutionStandard.pm10High) {
				this.airAlarmTypeCode = "pm10";
				this.airAlarmValue = airSensor.pm10;
			} else if (airSensor.pm25 >= this.pollutionStandard.pm25High) {
				this.airAlarmTypeCode = "pm25";
				this.airAlarmValue = airSensor.pm25;
			} else if (airSensor.co2 >= this.pollutionStandard.co2High) {
				this.airAlarmTypeCode = "co2";
				this.airAlarmValue = airSensor.co2;
			} else if (airSensor.tvoc >= this.pollutionStandard.tvocHigh) {
				this.airAlarmTypeCode = "tvoc";
				this.airAlarmValue = airSensor.tvoc;
			} else if (airSensor.pm1 >= this.pollutionStandard.pm1High) {
				this.airAlarmTypeCode = "pm1";
				this.airAlarmValue = airSensor.pm1;
			} else if (airSensor.pm10 >= this.pollutionStandard.pm10Middle) {
				this.airAlarmTypeCode = "pm10";
				this.airAlarmValue = airSensor.pm10;
			} else if (airSensor.pm25 >= this.pollutionStandard.pm25Middle) {
				this.airAlarmTypeCode = "pm25";
				this.airAlarmValue = airSensor.pm25;
			} else if (airSensor.co2 >= this.pollutionStandard.co2Middle) {
				this.airAlarmTypeCode = "co2";
				this.airAlarmValue = airSensor.co2;
			} else if (airSensor.tvoc >= this.pollutionStandard.tvocMiddle) {
				this.airAlarmTypeCode = "tvoc";
				this.airAlarmValue = airSensor.tvoc;
			} else if (airSensor.pm1 >= this.pollutionStandard.pm1Middle) {
				this.airAlarmTypeCode = "pm1";
				this.airAlarmValue = airSensor.pm1;
			} else if (airSensor.pm10 >= this.pollutionStandard.pm10Low) {
				this.airAlarmTypeCode = "pm10";
				this.airAlarmValue = airSensor.pm10;
			} else if (airSensor.pm25 >= this.pollutionStandard.pm25Low) {
				this.airAlarmTypeCode = "pm25";
				this.airAlarmValue = airSensor.pm25;
			} else if (airSensor.co2 >= this.pollutionStandard.co2Low) {
				this.airAlarmTypeCode = "co2";
				this.airAlarmValue = airSensor.co2;
			} else if (airSensor.tvoc >= this.pollutionStandard.tvocLow) {
				this.airAlarmTypeCode = "tvoc";
				this.airAlarmValue = airSensor.tvoc;
			} else if (airSensor.pm1 >= this.pollutionStandard.pm1Low) {
				this.airAlarmTypeCode = "pm1";
				this.airAlarmValue = airSensor.pm1;
			}

			//console.log("### this.airSensorCheck this.airAlarmTypeCode:"+this.airAlarmTypeCode);
			//console.log("### this.airSensorCheck this.airAlarmValue:"+this.airAlarmValue);
		},
		togglePowerOn: function(facility_id, mobiusId, airSensorActionLevel) {

			let param = {
				facility_id: facility_id
				, mobiusId: mobiusId
				, state: 1
			};

			//console.log("togglePowerOn param:"+JSON.stringify(param));
			//console.log("change this.config:"+JSON.stringify(this.config));
			// call toggleAutoControl

			//console.log("basemap.js sendws 1...");

			// dest(mobiusId), which(airsensor or aircleaner), command(-1: reboot, 0: stop, 1~3: strength)
			// me.sendws("/c2w/request/workplace", JSON.stringify({'MOBIUSID': '/AirSensor/Workplace_0004', 'CMD': 'CTRL', 'APOWER': 0}));              // 공기청정기 전원제어 : 0~1
            //this.sendws("/c2w/request/workplace", JSON.stringify({'MOBIUSID': mobiusId, 'CMD': 'CTRL', 'APOWER': param.state, 'facility_id': facility_id, 'controlType': '001', 'autoControlled': true}));

            let paramSend = {'MOBIUSID': mobiusId, 'CMD': 'MANUAL', 'ASTRENGTH': 1, 'RANGE':[7,15,35]}; // this.alarmAirSensor.astrength

			console.log("basemap.js togglePowerOn paramSend:"+JSON.stringify(paramSend));

			this.sendws("/c2w/request/workplace", JSON.stringify(paramSend));

			this.toastMessage("info", this.$i18n.t("frontend.dashboard.airSensorControl.title"), this.$i18n.t("frontend.dashboard.airSensorControl.changed"));

            //console.log("basemap.js sendws end...");
		},
		onMotorPowerIntensityChange: function(facility_id, mobiusId, intensity) {

			//console.log("onMotorPowerIntensityChange facility_id:"+facility_id);

			let param = {
				facility_id: facility_id
				, mobiusId: mobiusId
				, intensity: intensity
			};

			//console.log("onMotorPowerIntensityChange param:"+JSON.stringify(param));
			//console.log("change this.config:"+JSON.stringify(this.config));

			// call apiAirCleanerMotorPowerIntensityControl
			//console.log("basemap.js sendws 1...");

			// dest(mobiusId), which(airsensor or aircleaner), command(-1: reboot, 0: stop, 1~3: strength)
			// me.sendws("/c2w/request/workplace", JSON.stringify({'MOBIUSID': '/AirSensor/Workplace_0004', 'CMD': 'CTRL', 'ASTRENGTH': 0}));                     // 공기청정기 강도제어 : 0~3
            //this.sendws("/c2w/request/workplace", JSON.stringify({'MOBIUSID': mobiusId, 'CMD': 'CTRL', 'ASTRENGTH': intensity, 'facility_id': facility_id, 'controlType': '01'+ intensity, 'autoControlled': true}));

            let paramSend = {'MOBIUSID': mobiusId, 'CMD': 'MANUAL', 'ASTRENGTH': intensity, 'RANGE':[7,15,35]};

			console.log("basemap.js onMotorPowerIntensityChange paramSend:"+JSON.stringify(paramSend));

			this.sendws("/c2w/request/workplace", JSON.stringify(paramSend));

			this.toastMessage("info", this.$i18n.t("frontend.dashboard.airSensorControl.title"), this.$i18n.t("frontend.dashboard.airSensorControl.changed"));

            //console.log("basemap.js sendws end...");
		},
		airSensorStyle: function() {
			let style = "position:absolute;";
			if(this.hasRole('ADMIN, SECURITY')) {
				if(this.dashboardManage.airSensor.isFull) {
					$("body").css('overflow', 'hidden');
					style += "left:0px; top: 0px; width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; z-index:9999999;";
				} else {
					$("body").css('overflow', 'auto');
					if(this.dashboardLayout.airSensor != null && this.dashboardLayout.airSensor.left != null) {
						style += "left:";
						style += this.dashboardLayout.airSensor.left;
						style += ";";
					} else {
						if(this.dashboardLayout.airSensor != null && this.dashboardLayout.airSensor.right != null) {
							style += "right:";
							style += this.dashboardLayout.airSensor.right;
							style += ";";
						}
						style += "right:8px;"
					}
					if(this.dashboardLayout.airSensor != null && this.dashboardLayout.airSensor.top != null) {
						style += "top:";
						style += this.dashboardLayout.airSensor.top;
						style += ";";
					} else {
						style += "bottom:8px;"
					}
					if(this.dashboardLayout.airSensor != null && this.dashboardLayout.airSensor.width != null) {
						style += "width:";
						style += this.dashboardLayout.airSensor.width;
						style += ";";
					} else {
						style += "width: 35vw;"
					}
					if(this.dashboardLayout.airSensor != null && this.dashboardLayout.airSensor.height != null) {
						style += "height:";
						style += this.dashboardLayout.airSensor.height;
						style += ";";
					} else {
						style += "height: 45vh"
					}
					style += "min-width: 20vw; z-index:";
					if(this.dashboardLayout.airSensor != null && this.dashboardLayout.airSensor.zIndex != null) {
						style += this.dashboardLayout.airSensor.zIndex;
						style += ";";
					} else {
						style += "999;"
					}
				}
			} else {
				style = "display: none;";
			}
			return style;
		},
		airSensorControlStyle: function() {
			let style = "position:absolute;";
			if(this.hasRole('ADMIN, SECURITY')) {
				if(this.dashboardManage.airSensorControl.isFull) {
					$("body").css('overflow', 'hidden');
					style += "left:0px; top: 0px; width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; z-index:9999999;";
				} else {
					$("body").css('overflow', 'auto');
					if(this.dashboardLayout.airSensorControl != null && this.dashboardLayout.airSensorControl.left != null) {
						style += "left:";
						style += this.dashboardLayout.airSensorControl.left;
						style += ";";
					} else {
						if(this.dashboardLayout.airSensorControl != null && this.dashboardLayout.airSensorControl.right != null) {
							style += "right:";
							style += this.dashboardLayout.airSensorControl.right;
							style += ";";
						}
						style += "right:8px;"
					}
					if(this.dashboardLayout.airSensorControl != null && this.dashboardLayout.airSensorControl.top != null) {
						style += "top:";
						style += this.dashboardLayout.airSensorControl.top;
						style += ";";
					} else {
						style += "bottom:8px;"
					}
					if(this.dashboardLayout.airSensorControl != null && this.dashboardLayout.airSensorControl.width != null) {
						style += "width:";
						style += this.dashboardLayout.airSensorControl.width;
						style += ";";
					} else {
						style += "width: 35vw;"
					}
					if(this.dashboardLayout.airSensorControl != null && this.dashboardLayout.airSensorControl.height != null) {
						style += "height:";
						style += this.dashboardLayout.airSensorControl.height;
						style += ";";
					} else {
						style += "height: 45vh"
					}
					style += "min-width: 23vw; z-index:";
					if(this.dashboardLayout.airSensorControl != null && this.dashboardLayout.airSensorControl.zIndex != null) {
						style += this.dashboardLayout.airSensorControl.zIndex;
						style += ";";
					} else {
						style += "999;"
					}
				}
			} else {
				style = "display: none;";
			}
			//console.log("airSensorControlStyle:"+style);
			return style;
		},
		alarmStyle: function() {
			let style = "position:absolute;";
			if(this.hasRole('ADMIN, SECURITY')) {
				if(this.dashboardManage.alarm.isFull) {
					$("body").css('overflow', 'hidden');
					style += "left:0px; top: 0px; width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; z-index:9999999;";
				} else {
					$("body").css('overflow', 'auto');
					if(this.dashboardLayout.alarm != null && this.dashboardLayout.alarm.left != null) {
						style += "left:";
						style += this.dashboardLayout.alarm.left;
						style += ";";
					} else {
						if(this.dashboardLayout.alarm != null && this.dashboardLayout.alarm.right != null) {
							style += "right:";
							style += this.dashboardLayout.alarm.right;
							style += ";";
						}
						style += "right:8px;"
					}
					if(this.dashboardLayout.alarm != null && this.dashboardLayout.alarm.top != null) {
						style += "top:";
						style += this.dashboardLayout.alarm.top;
						style += ";";
					} else {
						style += "bottom:8px;"
					}
					if(this.dashboardLayout.alarm != null && this.dashboardLayout.alarm.width != null) {
						style += "width:";
						style += this.dashboardLayout.alarm.width;
						style += ";";
					} else {
						style += "width: 35vw;"
					}
					if(this.dashboardLayout.alarm != null && this.dashboardLayout.alarm.height != null) {
						style += "height:";
						style += this.dashboardLayout.alarm.height;
						style += ";";
					} else {
						style += "height: 45vh"
					}
					style += "min-width: 23vw; z-index:";
					if(this.dashboardLayout.alarm != null && this.dashboardLayout.alarm.zIndex != null) {
						style += this.dashboardLayout.alarm.zIndex;
						style += ";";
					} else {
						style += "999;"
					}
				}
			} else {
				style = "display: none;";
			}
			//console.log("alarmStyle:"+style);
			return style;
		},
		airSensorStationStyle: function() {
			let style = "position:absolute;";
			if(this.hasRole('ADMIN, SECURITY')) {
				if(this.dashboardManage.airSensorStation.isFull) {
					$("body").css('overflow', 'hidden');
					style += "left:0px; top: 0px; width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; z-index:9999999;";
				} else {
					$("body").css('overflow', 'auto');
					if(this.dashboardLayout.airSensorStation != null && this.dashboardLayout.airSensorStation.left != null) {
						style += "left:";
						style += this.dashboardLayout.airSensorStation.left;
						style += ";";
					} else {
						if(this.dashboardLayout.airSensorStation != null && this.dashboardLayout.airSensorStation.right != null) {
							style += "right:";
							style += this.dashboardLayout.airSensorStation.right;
							style += ";";
						}
						style += "right:8px;"
					}
					if(this.dashboardLayout.airSensorStation != null && this.dashboardLayout.airSensorStation.top != null) {
						style += "top:";
						style += this.dashboardLayout.airSensorStation.top;
						style += ";";
					} else {
						style += "bottom:8px;"
					}
					if(this.dashboardLayout.airSensorStation != null && this.dashboardLayout.airSensorStation.width != null) {
						style += "width:";
						style += this.dashboardLayout.airSensorStation.width;
						style += ";";
					} else {
						style += "width: 35vw;"
					}
					if(this.dashboardLayout.airSensorStation != null && this.dashboardLayout.airSensorStation.height != null) {
						style += "height:";
						style += this.dashboardLayout.airSensorStation.height;
						style += ";";
					} else {
						style += "height: 45vh"
					}
					style += "min-width: 20vw; z-index:";
					if(this.dashboardLayout.airSensorStation != null && this.dashboardLayout.airSensorStation.zIndex != null) {
						style += this.dashboardLayout.airSensorStation.zIndex;
						style += ";";
					} else {
						style += "999;"
					}
				}
			} else {
				style = "display: none;";
			}
			return style;
		},
		airSensorStationPredictStyle: function() {
			let style = "position:absolute;";
			if(this.hasRole('ADMIN, SECURITY')) {
				if(this.dashboardManage.airSensorStationPredict.isFull) {
					$("body").css('overflow', 'hidden');
					style += "left:0px; top: 0px; width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; z-index:9999999;";
				} else {
					$("body").css('overflow', 'auto');
					if(this.dashboardLayout.airSensorStationPredict != null && this.dashboardLayout.airSensorStationPredict.left != null) {
						style += "left:";
						style += this.dashboardLayout.airSensorStationPredict.left;
						style += ";";
					} else {
						if(this.dashboardLayout.airSensorStationPredict != null && this.dashboardLayout.airSensorStationPredict.right != null) {
							style += "right:";
							style += this.dashboardLayout.airSensorStationPredict.right;
							style += ";";
						}
						style += "right:8px;"
					}
					if(this.dashboardLayout.airSensorStationPredict != null && this.dashboardLayout.airSensorStationPredict.top != null) {
						style += "top:";
						style += this.dashboardLayout.airSensorStationPredict.top;
						style += ";";
					} else {
						style += "bottom:8px;"
					}
					if(this.dashboardLayout.airSensorStationPredict != null && this.dashboardLayout.airSensorStationPredict.width != null) {
						style += "width:";
						style += this.dashboardLayout.airSensorStationPredict.width;
						style += ";";
					} else {
						style += "width: 35vw;"
					}
					if(this.dashboardLayout.airSensorStationPredict != null && this.dashboardLayout.airSensorStationPredict.height != null) {
						style += "height:";
						style += this.dashboardLayout.airSensorStationPredict.height;
						style += ";";
					} else {
						style += "height: 45vh"
					}
					style += "min-width: 20vw; z-index:";
					if(this.dashboardLayout.airSensorStationPredict != null && this.dashboardLayout.airSensorStationPredict.zIndex != null) {
						style += this.dashboardLayout.airSensorStationPredict.zIndex;
						style += ";";
					} else {
						style += "999;"
					}
				}
			} else {
				style = "display: none;";
			}
			return style;
		},
		droneStationStyle: function() {
			let style = "position:absolute;";
			if(this.hasRole('ADMIN, BOARD')) {
				if(this.dashboardManage.droneStation.isFull) {
					$("body").css('overflow', 'hidden');
					style += "left:0px; top: 0px; width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; z-index:9999999;";
				} else {
					$("body").css('overflow', 'auto');
					if(this.dashboardLayout.droneStation != null && this.dashboardLayout.droneStation.left != null) {
						style += "left:";
						style += this.dashboardLayout.droneStation.left;
						style += ";";
					} else {
						if(this.dashboardLayout.droneStation != null && this.dashboardLayout.droneStation.right != null) {
							style += "right:";
							style += this.dashboardLayout.droneStation.right;
							style += ";";
						}
						style += "right:8px;"
					}
					if(this.dashboardLayout.droneStation != null && this.dashboardLayout.droneStation.top != null) {
						style += "top:";
						style += this.dashboardLayout.droneStation.top;
						style += ";";
					} else {
						if(this.dashboardLayout.droneStation != null && this.dashboardLayout.droneStation.bottom != null) {
							style += "bottom:";
							style += this.dashboardLayout.droneStation.bottom;
							style += ";";
						} else {
							style += "top:75px;"
						}
					}
					if(this.dashboardLayout.droneStation != null && this.dashboardLayout.droneStation.width != null) {
						style += "width:";
						style += this.dashboardLayout.droneStation.width;
						style += ";";
					} else {
						style += "width: 20vw;"
					}
					if(this.dashboardLayout.droneStation != null && this.dashboardLayout.droneStation.height != null) {
						style += "height:";
						style += this.dashboardLayout.droneStation.height;
						style += ";";
					} else {
						style += "height: 35vh;"
					}
					style += "min-width: 20vw; z-index:";
					if(this.dashboardLayout.droneStation != null && this.dashboardLayout.droneStation.zIndex != null) {
						style += this.dashboardLayout.droneStation.zIndex;
						style += ";";
					} else {
						style += "999;"
					}
				}
			} else {
				style = "display: none;";
			}
			return style;
		},
		/*notificationWindowStyle: function() {
			let style = "position:absolute;";
			if(this.hasRole('ADMIN, BOARD')) {
				if(this.isFullNotification) {
					$("body").css('overflow', 'hidden');
					style += "left:0px; top: 0px; width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; z-index:9999999;";
				} else {
					$("body").css('overflow', 'auto');
					if(this.dashboardLayout.notification != null && this.dashboardLayout.notification.left != null) {
						style += "left:";
						style += this.dashboardLayout.notification.left;
						style += ";";
					} else {
						if(this.dashboardLayout.notification != null && this.dashboardLayout.notification.right != null) {
							style += "right:";
							style += this.dashboardLayout.notification.right;
							style += ";";
						}
						style += "right:8px;"
					}
					if(this.dashboardLayout.notification != null && this.dashboardLayout.notification.top != null) {
						style += "top:";
						style += this.dashboardLayout.notification.top;
						style += ";";
					} else {
						if(this.dashboardLayout.notification != null && this.dashboardLayout.notification.bottom != null) {
							style += "bottom:";
							style += this.dashboardLayout.notification.bottom;
							style += ";";
						} else {
							style += "bottom:8px;"
						}
					}
					if(this.dashboardLayout.notification != null && this.dashboardLayout.notification.width != null) {
						style += "width:";
						style += this.dashboardLayout.notification.width;
						style += ";";
					} else {
						style += "width: 350px;"
					}
					if(this.dashboardLayout.notification != null && this.dashboardLayout.notification.height != null) {
						style += "height:";
						style += this.dashboardLayout.notification.height;
						style += ";";
					} else {
						style += "height: 45vh;"
					}
					style += "z-index:";
					if(this.dashboardLayout.notification != null && this.dashboardLayout.notification.zIndex != null) {
						style += this.dashboardLayout.notification.zIndex;
						style += ";";
					} else {
						style += "999;"
					}
				}
			} else {
				style = "display: none;";
			}
			return style;
		},*/
		wallFreeSetWindowStyle: function() {
			let style = "position:absolute;";
			if(this.hasRole('ADMIN, BOARD')) {
				 $("body").css('overflow', 'auto');
                style += "top:15.5%; margin-top: -150px;";
                style += "left:36.5%; margin-left: -20%;";
                style += "width: 393px;";
                style += "height: 13vh;"
                style += "min-width: 23vw; z-index:9999999999999;";
                style += "opacity: 0.85";
			} else {
				style = "display: none;";
			}
			return style;
		},
        sirenWindowStyle: function() {
            let style = "position:absolute;";
            if(this.hasRole('ADMIN, SECURITY')) {
                if(this.dashboardManage.siren.isFull) {
                    $("body").css('overflow', 'hidden');
                    style += "left:0px; top: 0px; width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; z-index:9999999;";
                } else {
                    $("body").css('overflow', 'auto');
                    style += "top:50%; margin-top: -150px;";
                    style += "left:10px; width: 99%;";
                    style += "height: 200px;"
                    style += "min-width: 23vw; z-index:9999999999999;";
                    style += "opacity: 0.75";
                }
            } else {
                style = "display: none;";
            }
            return style;
        },
        alarmDashBordWindowStyle: function() {
            let style = "position:absolute;";
            if(this.hasRole('ADMIN, SECURITY')) {
                if(this.dashboardManage.alarmDashBord.isFull) {
                    $("body").css('overflow', 'hidden');
                    style += "left:0px; top: 0px; width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; z-index:9999999;";
                } else {
                    $("body").css('overflow', 'auto');
                    style += "top:50%; margin-top: -150px;";
                    style += "left:50%; width: 400px;";
                    style += "height: 400px;"
                    style += "min-width: 23vw; z-index:9999999999999;";
                }
            } else {
                style = "display: none;";
            }
            return style;
        },
		mapSelectorStyle: function() {
			let style = "position:fixed; left: 50%; top:0; transform: translate(-50%, 0%);";
			return style;
		},
		mapSelectorStyle2: function() {
			let style = "position:fixed; left: 50%; top:30px; transform: translate(-50%, 0%);";
			return style;
		},
		onInitDashboard: function() {
			let me = this;

			me.initLayout();
			me.updateLayout();
		},
		initLayout: function() {
			let me = this;
			// me.dashboardLayout = {};
			/*me.dashboardLayout['fireCCTV'] = {
				left: '8px',
				top: '65px',
				zIndex: 992,
				width: '25vw',
				height: '35vh',
				minHeight: 200,
			    minWidth: 200
			};*/

			me.dashboardLayout['airSensor'] = {
				left: '8px',
				bottom: '8px',
				zIndex: 990,
				width: '30vw',
				height: '45vh',
				minHeight: 440,
			    minWidth: 420
			};

			me.dashboardLayout['airSensorControl'] = {
				left: '568px',
				bottom: '6px',
				zIndex: 992,
				width: '42vw',
				height: '29vh',
				minHeight: 270,
			    minWidth: 780
			};

			me.dashboardLayout['airSensorControlDefault'] = me.dashboardLayout['airSensorControl'];

			me.dashboardLayout['airSensorStation'] = {
				left: '45%',
				bottom: '8px',
				zIndex: 990,
				width: '20vw',
				height: '39vh',
				minHeight: 340,
				minWidth: 320
			};
			me.dashboardLayout['airSensorStationPredict'] = {
				left: '45%',
				bottom: '8px',
				zIndex: 990,
				width: '30vw',
				height: '45vh',
				minHeight: 840,
				minWidth: 420
			};
			me.dashboardLayout['droneStation'] = {
				right: '8px',
				top: '65px',
				zIndex: 991,
				width: '25vw',
				height: '35vh',
				minHeight: 200,
			    minWidth: 200
			};

			me.dashboardLayout['alarm'] = {
				left: '668px',
				top: '165px',
				zIndex: 20000,
				width: '32vw',
				height: '33vh',
				minHeight: 320,
			    minWidth: 600
			};

			me.dashboardLayout['alarmDefault'] = me.dashboardLayout['alarm'];

			/*me.dashboardLayout['notification'] = {
				right: '8px',
				bottom: '8px',
				zIndex: 991,
				width: '350px',
				height: '45vh',
				minHeight: 200,
			    minWidth: 200
			};*/

			me.dashboardLayout['wallFreeSet'] = {
				right: '8px',
				bottom: '8px',
				zIndex: 99999999999,
				width: '393px',
				height: '10vh',
				minHeight: 200,
			    minWidth: 200
			};

            me.dashboardLayout['siren'] = {
                left: '368px',
                top: '65px',
                zIndex: 99999999999,
                width: '25vw',
                height: '20vh',
                minHeight: 250,
                minWidth: 200
            };

            me.dashboardLayout['alarmDashBord'] = {
                right: '8px',
                bottom: '8px',
                zIndex: 99999999999,
                width: '393px',
                height: '10vh',
                minHeight: 200,
                minWidth: 200
            };
		},
		
		//이전 퍼블리싱에서 사용된걸로 추정
		setUserLayout: function() {
			let me = this;
			if(me.myInfo != null && me.myInfo.layouts != null) {
				for(var key in me.myInfo.layouts) {
					if(key.indexOf("fireCCTV") > -1) {
						me.dashboardLayout[key] = me.myInfo.layouts[key];
					}
				}
			}
			if(me.myInfo != null && me.myInfo.layouts != null && me.myInfo.layouts.airSensor != null) {
				me.dashboardLayout.airSensor = me.myInfo.layouts.airSensor;
			}
			if(me.myInfo != null && me.myInfo.layouts != null && me.myInfo.layouts.airSensorControl != null) {
				me.dashboardLayout.airSensorControl = me.myInfo.layouts.airSensorControl;
			}
			if(me.myInfo != null && me.myInfo.layouts != null && me.myInfo.layouts.airSensorStation != null) {
				me.dashboardLayout.airSensorStation = me.myInfo.layouts.airSensorStation;
			}
			if(me.myInfo != null && me.myInfo.layouts != null && me.myInfo.layouts.airSensorStationPredict != null) {
				me.dashboardLayout.airSensorStationPredict = me.myInfo.layouts.airSensorStationPredict;
			}
			if(me.myInfo != null && me.myInfo.layouts != null && me.myInfo.layouts.droneStation != null) {
				me.dashboardLayout.droneStation = me.myInfo.layouts.droneStation;
			}
			if(me.myInfo != null && me.myInfo.layouts != null && me.myInfo.layouts.alarm != null) {
				me.dashboardLayout.alarm = me.myInfo.layouts.alarm;
			}
			/*if(me.myInfo != null && me.myInfo.layouts != null && me.myInfo.layouts.notification != null) {
				me.dashboardLayout.notification = me.myInfo.layouts.notification;
			}*/
			if(me.myInfo != null && me.myInfo.layouts != null && me.myInfo.layouts.wallFreeSet != null) {
				me.dashboardLayout.wallFreeSet = me.myInfo.layouts.wallFreeSet;
			}
            if(me.myInfo != null && me.myInfo.layouts != null && me.myInfo.layouts.siren != null) {
                me.dashboardLayout.siren = me.myInfo.layouts.siren;
            }
			me.$forceUpdate();
		},
		
		//모르겠음..
		updateLayout: function() {
			let me = this;
			if(me.timerLayout != null) {
				clearTimeout(me.timerLayout);
				me.timerLayout = null;
			}

			setTimeout(() => {
				let u = $.extend(true, {}, me.myInfo);
				u.password = "";
				u.layouts = me.dashboardLayout;
				axios.put(me.apiUser, JSON.stringify(u), me.config)
        		.then(res => {

        		})
        		.catch(err => {

        		});
			}, 500);
		},
		
		//위성지도, 일반지도 변경 이벤트
		onChangeMapSelector: function(evt) {
			let me = this;
			let source = null;
			if(evt.target.getAttribute("value") == 'baseMap') {
				source = new ol.source.OSM();
			} else if(evt.target.getAttribute("value") == 'hybridMap') {
				source = new ol.source.OSM({
					url: eval('this.'+evt.target.getAttribute("value"))
				});
			} else {
				source = new ol.source.XYZ({
	                url: eval('this.'+evt.target.getAttribute("value"))
	            });
			}
			this.mapArea.getLayers().item(0).setSource(source);
		},
		
		//fcode로 시설물을 찾을때
		getFacilityById: function(facilityId) {
			return this.facilityItems.filter((item) => {
				return (item.fcode == facilityId);
			});
		},
		//어떤 시설물만 따로 분류하고 싶을때
		getFacilityIndex: function(facility) {
			return this.facilityItems.findIndex((item, index, array) => {
				return (item.fcode == facility.fcode);
			});
		},
		
		//facility테이블의 status(사용여부)값이 1로 세팅되면 GIS상에서 느낌표(?)아이콘으로 표출한다. 
		addStatusSymbol: function(id, facilityName, coordinate, status) {
			var me = this;

			if(status == null || status == 'NORMAL') {
				return;
			}

			var symbolFeature = new ol.Feature({
				name: facilityName,
				geometry: new ol.geom.Point(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:900913')),
			});
			symbolFeature.setId(id);

			var symbolName = me.symbolStatusPath;
			if(status == 'ERROR') {
				symbolName += "facil_status_ERROR.png";
			} else if(status == 'POWEROFF') {
				symbolName += "facil_status_POWEROFF.png";
			}

			var iconStyle = new ol.style.Style({
				image: new ol.style.Icon({
					anchor: [0, 70],
					size : [40, 40],
					anchorXUnits: 'fraction',
			        anchorYUnits: 'pixels',
				    src: symbolName
				})
			});

			symbolFeature.setStyle(iconStyle);

			if(this.statusVectorSource == null) {
				this.statusVectorSource = new ol.source.Vector({
					features: [symbolFeature]
				});
			} else {
				this.statusVectorSource.addFeature(symbolFeature);
			}

			if(this.statusVectorLayer == null) {
				this.statusVectorLayer = new ol.layer.Vector({
					source: this.statusVectorSource
				});

				this.mapArea.addLayer(this.statusVectorLayer);
			}
		},
		//아이콘 추가
		addSymbol: function(id, facilityName, coordinate, symbolName) {
			var me = this;

			var symbolFeature = new ol.Feature({
				name: facilityName,
                id: id,
				geometry: new ol.geom.Point(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:900913')),
			});
			symbolFeature.setId(id);

			var iconStyle = new ol.style.Style({
				image: new ol.style.Icon({
					anchor: [0.5, 40],
					size : [35, 35],
					anchorXUnits: 'fraction',
			        anchorYUnits: 'pixels',
				    src: symbolName
				}),
				stroke: new ol.style.Stroke({
					color: '#3bb2d0',
					width: 60
				})
			});

			symbolFeature.setStyle(iconStyle);

			if(this.symbolVectorSource == null) {
				this.symbolVectorSource = new ol.source.Vector({
					features: [symbolFeature]
				});
			} else {
				this.symbolVectorSource.addFeature(symbolFeature);
			}

			if(this.symbolVectorLayer == null) {
				this.symbolVectorLayer = new ol.layer.Vector({
					source: this.symbolVectorSource,
                    zIndex: 10
				});

				this.mapArea.addLayer(this.symbolVectorLayer);
			}
		},
		//지도위 아이콘들 제거
		removeSymbolLayer: function() {
			if(this.symbolVectorSource != null) {
				this.symbolVectorSource.clear(true);
				this.symbolVectorSource = null;
			}
			if(this.symbolVectorLayer != null) {
				this.mapArea.removeLayer(this.symbolVectorLayer);
				this.symbolVectorLayer = null;
			}
		},
		
		//아이콘 초기화
		removeStatusLayer: function() {
			if(this.statusVectorSource != null) {
				this.statusVectorSource.clear(true);
				this.statusVectorSource = null;
			}
			if(this.statusVectorLayer != null) {
				this.mapArea.removeLayer(this.statusVectorLayer);
				this.statusVectorLayer = null;
			}
		},
		
		//(현재사용하지 않는 걸로 추정)
        removeFreeSetLineLayer: function() {
            if(this.freeSetLineVectorSource != null) {
                this.freeSetLineVectorSource.clear(true);
                this.freeSetLineVectorSource = null;
            }
            if(this.freeSetLineVectorLayer != null) {
                this.mapArea.removeLayer(this.freeSetLineVectorLayer);
                this.freeSetLineVectorLayer = null;
            }
        },
		
		//지도위 모든 레이어를 지우는 함수
		removeAllLayer: function() {
			this.removeSymbolLayer();
			this.removeStatusLayer();
		},
		
		//사이즈변경(현재사용하지 않는걸로 추정)
		onResize (size) {
			console.log(size);
		},
		
		//지도를 마우스로 컨트롤
		onMouseMove: function(event) {
			this.mapArea.getTargetElement().style.cursor = this.mapArea.hasFeatureAtPixel(event.pixel) ? 'pointer' : '';
		},
		
		// 좌표 찍으면 점표시 (그리기툴용 현재사용x)
		onPoint: function(){
			
				//좌표 초기화
	            var layersToRemove = [];
	            this.mapArea.getLayers().forEach(layer => {
	                if((layer.get('name') != undefined && layer.get("name") === 'ONDRAW') || layer.get("name") === 'ONPOINT'){
	                    layersToRemove.push(layer);
	                }
	            });
	
	            var len = layersToRemove.length;
	            for(var i = 0; i < len; i++) {
	                this.mapArea.removeLayer(layersToRemove[i]);
	            }


			//if(this.pointerOpen==false){				
				var lon = this.currentCoordinate [0];
				var lat = this.currentCoordinate [1];

						// Feature들을 담아줄 Source

				var featureSource = new ol.source.Vector({});

				// Source들을 담아줄 Layer
				var featureLayer = new ol.layer.Vector({
					source: featureSource,
					id:'ONPOINT'
			    // 여기에서 위에서 생성한 Source를 포함하여 레이어를 생성해줍니다.
				});

				var pointFeature = new ol.Feature({
					 geometry : new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', "EPSG:900913")),
				});

				featureLayer.set('name','ONPOINT');
				// addFeature();
				featureSource.addFeature(pointFeature);

				this.mapArea.addLayer(featureLayer);
				this.pointerCoordinate.push(ol.proj.transform([lon, lat],'EPSG:4326', "EPSG:900913"));
				this.pointerLonLat.push([lon, lat]);
				this.fireLatitude = this.pointerLonLat[0][1];
				this.fireLongitude = this.pointerLonLat[0][0];
				//this.mapArea.addLayer(pointLayer);
				console.log('pointerCoordinate:'+this.pointerCoordinate);
				console.log('pointerLonLat:'+this.pointerLonLat[0]);
				
				//}else{
				//	this.pointerCoordinate=[];
				//	this.pointerLonLat=[];
					//this.saveLonLat=[];
				//}

		},
		
		// 좌표 그리기 작업(그리기 툴용 현재사용x)
		onDrawLine: function(){
			if(this.pointerOpen==true){

							var features = new Array(this.pointerCoordinate.length);

					 		for(var i =0; i<this.pointerCoordinate.length; i++){

								features[i] = new ol.Feature({});

							}

				            var onDrawFeature = new ol.Feature({
				                 geometry: new ol.geom.LineString(this.pointerCoordinate)
				            });

				            var colors = [[245, 80, 80, .7], [248, 229, 16, .7], [54, 212, 2, .7]];
				            var random = parseInt(Math.random() * colors.length);
				            var style = new ol.style.Style({
				                      stroke : new ol.style.Stroke({
				                      color : colors[random],
				                      width : 5 //두께
				                      })
				          	}); // 스타일 설정

							onDrawFeature.setStyle(style);
							features.push(onDrawFeature);

				            var onDrawSource = new ol.source.Vector({
				                features : features,
				            });

							var onDrawLayer = new ol.layer.Vector({
				               source : onDrawSource,
				               style: style,
				               id: 'ONDRAW'
				            });

							onDrawLayer.set('name','ONDRAW');

							this.mapArea.addLayer(onDrawLayer);

			}else{
				this.pointerCoordinate=[];
				this.pointerLonLat=[];
			}

		},
		
		//좌표 클릭하여 찍은걸 지우는 함수(현재 사용x)
		pointErase:function(){
				//좌표 초기화
	            var layersToRemove = [];
	            this.mapArea.getLayers().forEach(layer => {
	                if((layer.get('name') != undefined && layer.get("name") === 'ONDRAW') || layer.get("name") === 'ONPOINT'){
	                    layersToRemove.push(layer);
	                }
	            });
	
	            var len = layersToRemove.length;
	            for(var i = 0; i < len; i++) {
	                this.mapArea.removeLayer(layersToRemove[i]);
	            }
		},
		
		//클릭시 좌표표시 이벤트
		onClick: function(event) {
			var me = this;
			
			//화재 경보시 드론출동할 좌표 선택 표기
			if (this.firePopStep == 'EVENT_ALERT') {
				this.closeFireAlert();
				me.onPoint();
			} else if(this.firePopStep == 'GET_COORDINATE'){
				this.currentCoordinate = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
				console.log(this.currentCoordinate);
				
				me.onPoint();
				me.onDrawLine();

			}else{
				
				//시설물 클릭시 아이콘 크기변경
				this.mapArea.forEachFeatureAtPixel(event.pixel, function (feature) {
			        if(feature != null) {
			        	console.log(feature.getProperties())
			        	me.onSelectedFacility(me.facilityItems[feature.get('id')]);
			        }
				});
			}
		},
		
		//시설물(아이콘)이 선택 되었을때.
		onSelectedFacility: function(facility) {
			var me = this;

            // ol.geom.Polygon의 이벤트는 제외 함.
            if(typeof facility == 'undefined') {
                return;
            }

			me.selectedFacility = facility;
			me.selectedSymbol(me.getFacilityIndex(facility));

			if(me.selectedFacilityPopup != null) {
        		// this.mapArea.removeOverlay(me.selectedFacilityPopup); // I don't know why this line make some bug.
        		me.selectedFacilityPopup.setPosition(undefined);
        		me.selectedFacilityPopup = null;
        	}

        	if(me.olpopupComp != null) {
        		$("#popup-closer").off("click");
        		me.olpopupComp.closePopup();
        		me.olpopupComp = null;
        	}

        	if(facility == null || facility.fcode == null) return;

        	let node = document.createElement('div');
    		$("#olpopup-content").empty();
        	$("#olpopup-content").append(node);

        	me.olpopupComp = new Vue(olpopup);
        	me.olpopupComp.$mount(node);

	       	me.$set(me.olpopupComp, 'myInfo', me.myInfo);
        	me.$set(me.olpopupComp, 'isOpenFireCCTV', facility.isOpen);
        	me.$set(me.olpopupComp, 'isOpenAirSensor', me.dashboardManage.airSensor.isOpen);
        	me.$set(me.olpopupComp, 'isOpenAirSensorControl', me.dashboardManage.airSensorControl.isOpen);
        	//me.$set(me.olpopupComp, 'isOpenDroneStation', me.dashboardManage.droneStation.isOpen);
        	me.$set(me.olpopupComp, 'onToggleFireCCTV', me.onToggleFireCCTV);
        	me.$set(me.olpopupComp, 'isOpenUticCCTV', me.onToggleUticCCTV);

        	me.olpopupComp.setFacility(me.selectedFacility);

        	var bgColor = "";
			bgColor = me.selectedFacility.facilityCategory.ccode === "AIR_SENSOR" ? "#235969" : "#283e64";
        	$("#facilityPopup").css("background-color", bgColor).show();
        	$("#facilityPopup").on("afterrendered", function(e) {
        		me.selectedFacilityPopup = new ol.Overlay({
	        		element: document.getElementById('facilityPopup'),
	        		autoPan: true,
	        		autoPanAnimation: {
	        			duration: 250
	        		}
	        	});
        		me.mapArea.addOverlay(me.selectedFacilityPopup);
        		me.selectedFacilityPopup.setPosition(ol.proj.transform([me.selectedFacility.longitude, me.selectedFacility.latitude], 'EPSG:4326', 'EPSG:900913'));

        		//me.getView();
        		// me.getView().setCenter(ol.proj.transform([me.selectedFacility.longitude, me.selectedFacility.latitude],'EPSG:4326', "EPSG:900913")); // 지도 이동
        		// this.mapArea.getView().setZoom(12);

        		$("#facilityPopup").off("afterrendered");
        	});
			
			//test(일진도금단지 클릭시 확대)
			if(me.selectedFacility.fcode == 'PARKING_LOT_0012'){
				//me.currentZoom = 19;
				
				me.mapArea.getView().setCenter(ol.proj.transform(me.mapCenterLatLong2, 'EPSG:4326', 'EPSG:900913'));
				console.log(me.mapArea.getView().getCenter());
				me.mapArea.getView().setZoom(17);
			}
			
			

        	$("#popup-closer").on("click", function() {
        		me.selectedFacilityPopup.setPosition(undefined);
        		$("#popup-closer").blur();
        		me.selectedFacility = {};
        		me.selectedSymbol(-1);
        		$("#popup-closer").off("click");
        		me.olpopupComp.closePopup();
        		me.olpopupComp = null;
        		return false;
        	});
		},
		
		//시설물 아이콘을 클릭시 커지는 메소드
		selectedSymbol: function(id) {
			var me = this;
			if(this.symbolVectorSource != null) {
				this.symbolVectorSource.forEachFeature(function(feature) {
					if(feature != null) {
						var style = feature.getStyle();
						var image = style.getImage();
						if(feature.getId() == id) {
							// feature.getStyle().getImage().setScale(1.2);
							image.setScale(me.currentScale + 0.5);
							style.setZIndex(20);
						} else {
							// feature.getStyle().getImage().setScale(1.0);
							image.setScale(me.currentScale);
							style.setZIndex(10);
						}
						feature.changed();
					}
				});
			}

			if(this.statusVectorSource != null) {
				this.statusVectorSource.forEachFeature(function(feature) {
					if(feature != null) {
						if(feature.getId() == id) {
							feature.getStyle().getImage().setScale(0.9);
						} else {
							feature.getStyle().getImage().setScale(0.7);
						}
						feature.changed();
					}
				});
			}
		},
		//facility 테이블에 있는 모든 시설물 리스트
		getFacilityList: function() {
			var me = this;

			$('#cover-spin').show(0);

			me.facilityItems = [];

			axios.get(me.apiFacility, {
				params: {
					enabled: true
				}
			})
    		.then(res => {
    			if(res != null && res.data != null) {
					var fireCCTVFacility = res.data.filter((item) => {
						if(item.facilityCategory.ccode == 'CCTV_FIRE') {
							item.isOpen = false;
							item.isFull = false;
							item.isBigDashboard = false;

							me.onUpdateFireCCTVUI(item.fcode);

							me.dashboardLayout['fireCCTV' + item.fcode] = {
								left: '8px',
								top: '65px',
								zIndex: 992,
								width: '25vw',
								height: '35vh',
								minHeight: 200,
							    minWidth: 200
							};

							return true;
						}
						// return (item.facilityCategory.ccode == 'FIRE_CCTV');
					});

					me.fireCCTVFacility = fireCCTVFacility;

    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					obj.facilityCategory.categorySymbolPath = me.symbolPath + obj.facilityCategory.categorySymbol + '.png?removable=';
    					if(obj.facilityCategory.categorySymbolRemovable == true) {
    						obj.facilityCategory.categorySymbolPath += '1';
    					} else {
    						obj.facilityCategory.categorySymbolPath += '0';
    					}

    					// facilityItem과 지도상 symbol의 id가 facilityItems 배열의 인덱스로 매칭이 되고 있는데
    					// facilityItems의 배열 순서가 뷰에 보여질 때 정렬이 바뀌면 facility와 심볼의 id 매칭이 안되기때문에
    					// facility에 index 값을 가지고 있도록 부여해줌
    					obj.index = i;

    					// 현재 facility에 대응하는 심볼이 보일지 말지 결정하는 bool 값
    					obj.isVisible = true;

    					me.facilityItems.push(obj);

    					// 뷰의 사이드바에 카테고리 별 하위 요소들을 쉽게 뿌려주기 위해 카테고리 별 하위 요소들을 묶어줌
    					var category = JSON.parse(JSON.stringify(obj.facilityCategory));
    					category.isVisible = true;	// 해당 facility 카테고리에 해당하는 심볼들이 보일지 말지 결정하는 bool 값
    					category.isOpen = true;	// 해당 facility 카테고리가 view에서 열려있는지 닫혀있는지 결정하는 bool 값
    					if(me.facilityItemsByCategory.length === 0) {
    						category.facilityItems = [obj];
    						me.facilityItemsByCategory.push(category);
    					} else {
    						var isCorrect = me.facilityItemsByCategory.some(function(item) {
    							if(item.ccode === obj.facilityCategory.ccode) {
    								if(!item.facilityItems) item.facilityItems = [];
    								item.facilityItems.push(obj);
    								return true;
    							}
    							return false;
    						});
    						if(!isCorrect) {
    							category.facilityItems = [obj];
        						me.facilityItemsByCategory.push(category);
    						}
    					}
    				}

    				me.removeAllLayer();
    				me.facilityItems.forEach(function(value, index) {
    					me.addSymbol(index, value.facilityName, [value.longitude, value.latitude], value.facilityCategory.categorySymbolPath);
    					me.addStatusSymbol(index, value.facilityName, [value.longitude, value.latitude], value.status);
//    					me.addSymbol(value.id, value.facilityName, [value.longitude, value.latitude], value.facilityCategory.categorySymbolPath);
//    					me.addStatusSymbol(value.id, value.facilityName, [value.longitude, value.latitude], value.status);
    				});

					if (!this.airSensorCheckCalled && this.pollutionStandard != null) {
						this.airSensorCheckCalled = true;
						this.airSensorCheckCall();
					}
    			}

    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();
    		});
		},
		
		//화재감시 카메라 레이어 표출
        getFreeSetInfo: function(id, isOpen, isShowOpen, presetNo) {
            var me = this;
			//console.log(presetNo)
            if(!isShowOpen) {
                /*
                 기존검색결과를 제거하기 위해 키 값 생성
                 */
                /*this.mapArea.getLayers().forEach(function(layer){
                    //if(layer.get("id")=="FIRE_CCTV_" + id){
                    if(layer.get("name") === 'FIRE_CCTV_' + id){
                        this.mapArea.removeLayer(layer);
                    }
                });*/
                // Vector 레이어를 삭제 후 재 생성
                var layersToRemove = [];
                this.mapArea.getLayers().forEach(layer => {
                    if(layer.get('name') != undefined && layer.get("name") === "FIRE_CCTV_" + id){
                        layersToRemove.push(layer);
                    }
                });

                var len = layersToRemove.length;
                for(var i = 0; i < len; i++) {
                    this.mapArea.removeLayer(layersToRemove[i]);
                }
                if(!isOpen) {
                    return;
                }
            }

			console.log("test call apiFreeSetLineGroup");

            axios.get(me.apiFreeSetLineGroup, {
                params: {
                    freeSetNo: id,
                    freeSetArea: presetNo // TO-DO vms에서 프리셋 정보 넘오면 값 셋팅(handark333)
                }
            })
            .then(resGroup => {
                if(resGroup != null && resGroup.data != null) {

			console.log("test call apiFreeSetLine");

				axios.get(me.apiFreeSetLine, {
                params: {
                    freeSetNo: id,
                    freeSetArea: presetNo // TO-DO vms에서 프리셋 정보 넘오면 값 셋팅(handark333)
                }
            })
            .then(res => {
                if(res != null && res.data != null) {
					for(var z=0; resGroup.data.length; z++){

					var objGroup = resGroup.data[z];
					var coordinates = []; //좌표 설정 라인 좌표를 저장
                    var features = new Array(res.data.length); // feature 배열
                    var grade = '';
                    var color = '';
					var groupNo = '';
					var freeSetArea='';
					var freeSetNo='';


                    var iconStyle = new ol.style.Style({
                        image : new ol.style.Icon(/** @type {olx.style.IconOptions} */
                        ({
                            anchor : [ 0.5, 25 ], // 위치설정
                            anchorXUnits : 'fraction',
                            anchorYUnits : 'pixels',
                            src : 'http://map.vworld.kr/images/ol3/marker_blue.png'
                        }))
                    }); //Point에 마커 디자인을 설정

                    for(var i=0; i < res.data.length; i++) {
                        var obj = res.data[i];

                        features[i] = new ol.Feature({
                            //geometry : new ol.geom.Point(ol.proj.transform([obj.longitude, obj.latitude], 'EPSG:4326', "EPSG:900913"))
                        }); // get, set 과 같으며 속성값을 저장함

                        //features[i].set("id", "FIRE_CCTV_point_"+(i+1));
                        features[i].setStyle(iconStyle); // 스타일 지정

						if(obj.groupNo == objGroup.groupNo){

                        	coordinates.push(ol.proj.transform([obj.longitude, obj.latitude],'EPSG:4326', "EPSG:900913"));
							groupNo = obj.groupNo;
							grade= obj.grade;
							freeSetArea= obj.freeSetArea;

						}

                    }
					// grade는 화재위험구역 별(빨강,파랑,회색) / gradeNo는 그라데이션을 위해 나눔
                    if(grade == 'A') {
						if(groupNo == '1')
						{
						  color = "rgba(255, 0, 0, 0.15)";
						}
						else if(groupNo == '2')
						{
						  color = "rgba(255, 0, 0, 0.1)";
						}
						else if(groupNo == '3')
						{
						  color = "rgba(255, 0, 0, 0.06)";
						}

                    } else if(grade == 'B') {
						if(groupNo == '1')
						{
						  color = "rgba(0, 80, 255, 0.15)";
						}
						else if(groupNo == '2')
						{
						  color = "rgba(0, 80, 255, 0.1)";
						}
						else if(groupNo == '3')
						{
						  color = "rgba(0, 80, 255, 0.06)";
						}

                    } else if(grade == 'C') {
						if(groupNo == '1')
						{
						  color = "rgba(0, 0, 0, 0.15)";
						}
						else if(groupNo == '2')
						{
						  color = "rgba(0, 0, 0, 0.1)";
						}
						else if(groupNo == '3')
						{
						  color = "rgba(0, 0, 0, 0.06)";
						}

                    }

					if(obj.freeSetNo == '838'){
							freeSetNo = '1';
					}
					else if(obj.freeSetNo == '843'){
							freeSetNo = '2';
					}

                    var fill = new ol.style.Style({
                         fill : new ol.style.Fill({ color:color }),
						 text : new ol.style.Text({
						        font : 'bold 11px Verdana',
								scale : 1,
								text : freeSetNo+'-'+freeSetArea,
								fill : new ol.style.Fill({ color:'black'}),
								stoke : new ol.style.Stroke({ color : 'white', width : 3})

			             })

                    });

                    var freeSetFeature = new ol.Feature({
                        geometry: new ol.geom.Polygon([coordinates]),
                        name: 'Line',
                        id: 'FIRE_CCTV_' + id
                    });

                    freeSetFeature.setStyle(fill);
                    features.push(freeSetFeature);

                    var freeSetLineVectorSource = new ol.source.Vector({
                        features : features,
                        zIndex : 0,
                        id : 'FIRE_CCTV_' + id
                    });

                    var FreeSetLineLayer = new ol.layer.Vector({
                        source : freeSetLineVectorSource,
                        zIndex : 0,
                        id: 'FIRE_CCTV_' + id
                    });

                    FreeSetLineLayer.set('name', 'FIRE_CCTV_' + id);
                    this.mapArea.addLayer(FreeSetLineLayer);

                    this.facilityItems.forEach(function(value, index) {
                        me.addSymbol(index, value.facilityName, [value.longitude, value.latitude], value.facilityCategory.categorySymbolPath);
                        me.addStatusSymbol(index, value.facilityName, [value.longitude, value.latitude], value.status);
//                      me.addSymbol(value.id, value.facilityName, [value.longitude, value.latitude], value.facilityCategory.categorySymbolPath);
//                      me.addStatusSymbol(value.id, value.facilityName, [value.longitude, value.latitude], value.status);
                    });
					}

                }
            })
            .catch(err => {
                $('#cover-spin').hide();
            });

                }
            })
            .catch(err => {
                $('#cover-spin').hide();
            });
        },

        getMapFreeSet: function() {
            var me = this;

            axios.get(me.apiMapFreeSet, {
            })
            .then(res => {
                if(res != null && res.data != null) {

                    var coordinates = []; //좌표 설정 라인 좌표를 저장
                    var features = new Array(res.data.length); // feature 배열

                    for(var i=0; i < res.data.length; i++) {
                        var obj = res.data[i];

                        features[i] = new ol.Feature({
                            //geometry : new ol.geom.Point(ol.proj.transform([obj.longitude, obj.latitude], 'EPSG:4326', "EPSG:900913"))
                        }); // get, set 과 같으며 속성값을 저장함

                        coordinates.push(ol.proj.transform([obj.longitude, obj.latitude],'EPSG:4326', "EPSG:900913"));
                    }

                    var freeSetFeature = new ol.Feature({
                        geometry: new ol.geom.Polygon([coordinates])
                    });

                    var fill = new ol.style.Style({
	                     stroke: new ol.style.Stroke({
                         	color: 'rgba(82, 255, 172, 0.47)',
                         	width: 5
                         }),
                         fill : new ol.style.Fill({ color:"rgba(255,255,255,0.3)" }),

                    });

                    freeSetFeature.setStyle(fill);
                    features.push(freeSetFeature);

                    var freeSetLineVectorSource = new ol.source.Vector({
                        features : features,
                    });

                    var FreeSetLineLayer = new ol.layer.Vector({
                        source : freeSetLineVectorSource,
                        style : fill
                    });
                    this.mapArea.addLayer(FreeSetLineLayer);
                }
            })
            .catch(err => {
                $('#cover-spin').hide();
            });
        },
		
		//화재감시카메라 a구역만 표출
        getCCTVGradeInfo: function(id, isShowOpen) {
			console.log(id);
			console.log(isShowOpen);
            var me = this;
            if(!isShowOpen) {
                /*
                 기존검색결과를 제거하기 위해 키 값 생성
                 */
                /*this.mapArea.getLayers().forEach(function(layer){
                    //if(layer.get("id")=="FIRE_CCTV_" + id){
                    if(layer.get("name") === 'FIRE_CCTV_' + id){
                        this.mapArea.removeLayer(layer);
                    }
                });*/
                // Vector 레이어를 삭제 후 재 생성
                var layersToRemove = [];
                this.mapArea.getLayers().forEach(layer => {
                    if(layer.get('name') != undefined && layer.get("name") === "ALL_FIRE_CCTV_" + id){
                        layersToRemove.push(layer);
                    }
                });

                var len = layersToRemove.length;
                console.log('len', len);
                for(var i = 0; i < len; i++) {
                    this.mapArea.removeLayer(layersToRemove[i]);
                }
                return;
            }

            axios.get(me.apiCCTVGradeGroupInfo, {
                params: {
                    freeSetNo: id
                }
            })
            .then(resGroup => {
                if(resGroup != null && resGroup.data != null) {
                    axios.get(me.apiCCTVGradeInfo, {
                        params: {
                            freeSetNo: id
                        }
                    })
                    .then(res => {
                        if(res != null && res.data != null) {
                            for(var z=0; resGroup.data.length; z++) {
                                var objGroup = resGroup.data[z];
								var groupNo = '';
								var color = '';
								var freeSetArea = '';
								var freeSetNo='';
                                var coordinates = []; //좌표 설정 라인 좌표를 저장
                                var features = new Array(res.data.length); // feature 배열


                                for(var i=0; i < res.data.length; i++) {
                                    var obj = res.data[i];

                                    features[i] = new ol.Feature({
                                        //geometry : new ol.geom.Point(ol.proj.transform([obj.longitude, obj.latitude], 'EPSG:4326', "EPSG:900913"))
                                    }); // get, set 과 같으며 속성값을 저장함

                                    if(obj.freeSetArea == objGroup.freeSetArea && obj.groupNo == objGroup.groupNo) {
											 coordinates.push(ol.proj.transform([obj.longitude, obj.latitude],'EPSG:4326', "EPSG:900913"));
											 groupNo = obj.groupNo;
											freeSetArea= obj.freeSetArea;



                                    }

                                }
								//console.log(objGroup);
											if(groupNo == '1') {
						                        color = "rgba(255, 0, 0, 0.15)";
						                    } else if(groupNo == '2') {
						                        color = "rgba(255, 0, 0, 0.1)";
						                    } else if(groupNo == '3') {
						                        color = "rgba(255, 0, 0, 0.06)";
						                    }


											if(obj.freeSetNo == '838'){
												freeSetNo = '1';
											}
											else if(obj.freeSetNo == '843'){
												freeSetNo = '2';
											}


                               var fill = new ol.style.Style({
                                     stroke: new ol.style.Stroke({
                                        color: 'rgba(255, 255, 255, 1.0)',
                                        width: 1
                                     }),
                                     fill : new ol.style.Fill({ color: color }),
									 text : new ol.style.Text({
						                   font : 'bold 11px Verdana',
										   scale : 1,
										   text : freeSetNo+'-'+freeSetArea,
										   fill : new ol.style.Fill({ color:'black'}),
										   stoke : new ol.style.Stroke({ color : 'white', width : 3})

			                        })

                                });


                                var cctvGradeFeature = new ol.Feature({
                                    geometry: new ol.geom.Polygon([coordinates]),
                                    name: 'Line',
                                    id: 'ALL_FIRE_CCTV_' + id
                                });

                                cctvGradeFeature.setStyle(fill);
                                features.push(cctvGradeFeature);

                                var cctvGradeVectorSource = new ol.source.Vector({
                                    features : features,
                                    zIndex : 0,
                                    id : 'ALL_FIRE_CCTV_' + id
                                });

                                var cctvGradeLayer = new ol.layer.Vector({
                                    source : cctvGradeVectorSource,
                                    zIndex : 0,
                                    id: 'ALL_FIRE_CCTV_' + id
                                });

                                cctvGradeLayer.set('name', 'ALL_FIRE_CCTV_' + id);
                                this.mapArea.addLayer(cctvGradeLayer);
                            }
                        }
                    })
                    .catch(err => {
                        $('#cover-spin').hide();
                    });
                }
            })
            .catch(err => {
                $('#cover-spin').hide();
            });
        },
/*		getSpeed: function(speed){
			if(this.speedOpen == true){
				return speed.toString();
			}else{
				return '';
			}

		},*/
		
		//교통정보 레이어 표출
        getTrafficTemp: function() {
            var me = this;
			console.log('test');
            // Vector 레이어를 삭제 후 재 생성
            var layersToRemove = [];
            this.mapArea.getLayers().forEach(layer => {
                if(layer.get('name') != undefined && layer.get("name") === 'TRAFFIC'){
                    layersToRemove.push(layer);
                }
            });


            var len = layersToRemove.length;
            for(var i = 0; i < len; i++) {
                this.mapArea.removeLayer(layersToRemove[i]);
            }
            axios.get(me.apiTrafficGroupFreeSet, {
            })
            .then(resGroup => {
                if(resGroup != null && resGroup.data != null) {
					console.log('test1');
                   axios.get(me.apiTrafficFreeSet, {
                    })
                    .then(res => {
						console.log('test3')
                        if(res != null && res.data != null) {
	                                var features = new Array(res.data.length); // feature 배열

                            for(var z=0; resGroup.data.length; z++) {


									if(z>resGroup.data.length-1){
										break;
									}


                                var objGroup = resGroup.data[z];
                                var coordinates = []; //좌표 설정 라인 좌표를 저장
								var speed='';
								var colors='';
								var linkId='';

                                for(var i=0; i < res.data.length; i++) {
                                    var obj = res.data[i];

                                    features[i] = new ol.Feature({
                                        //geometry : new ol.geom.Point(ol.proj.transform([obj.longitude, obj.latitude], 'EPSG:4326', "EPSG:900913"))
                                    }); // get, set 과 같으며 속성값을 저장함

                                    if(obj.linkId == objGroup.linkId) {
                                        coordinates.push(ol.proj.transform([obj.longitude, obj.latitude],'EPSG:4326', "EPSG:900913"));
										speed = obj.speed;
										linkId=objGroup.linkId;
                                    }
                                }


                                var freeSetFeature = new ol.Feature({
									geometry: new ol.geom.LineString(coordinates),
									zIndex : 0,
                                    id: 'TRAFFIC'
                                });
								if(speed>=25){
									//초록
									colors = 'rgb(129,183,81)';
								}else if(speed>=15){
									//주황
									colors = 'rgb(222,191,82)';
								}else{
									//빨강
									colors = 'rgb(229,89,90)';
								}


                                //var colors = [[245, 80, 80, .7], [248, 229, 16, .7], [54, 212, 2, .7], [2, 71, 232, .7]];
                                //var random = parseInt(Math.random() * colors.length);
                                var style = new ol.style.Style({
                                    stroke : new ol.style.Stroke({
                                        color : colors,
                                        width : 5

                                    }),
									text: new ol.style.Text({
										font : 'bold 11px Verdana',
										scale : 1,
										text : speed.toString()
									})
                                }); // 스타일 설정 be Happy -39-

                                freeSetFeature.setStyle(style);
                                features.push(freeSetFeature);


                            }
                                var freeSetLineVectorSource = new ol.source.Vector({
                                    features : features,
                        			zIndex : 0,
                        			id : 'TRAFFIC'
                                });

                                var TrafficFreeSetLineLayer = new ol.layer.Vector({
                                    source : freeSetLineVectorSource,
                                    zIndex : 0,
                                    id: 'TRAFFIC'
                                });

                                TrafficFreeSetLineLayer.set('name', 'TRAFFIC');
                                this.mapArea.addLayer(TrafficFreeSetLineLayer);
                        }
                    })
                    .catch(err => {
                        $('#cover-spin').hide();
                    });
                }
            })
            .catch(err => {
                $('#cover-spin').hide();
            });
        },
		
		//시설물 종류별로 아이콘을 설정
		getFacilityCategoryList: function() {
			var me = this;

			me.facilityCategoryItems = [];

			axios.get(me.apiCategory, {
				params: {
					enabled: true
				}
			})
    		.then(res => {
    			if(res != null && res.data != null) {
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					obj.categorySymbolPath = me.symbolPath + obj.categorySymbol + '.png?removable=';
    					if(obj.categorySymbolRemovable == true) {
    						obj.categorySymbolPath += '1';
    					} else {
    						obj.categorySymbolPath += '0';
    					}

    					me.facilityCategoryItems.push(obj);

    					//if(obj.ccode == 'CCTV') {
    					//	$("#cctvIcon").attr("src", obj.categorySymbolPath);
    					//} else
    					if(obj.ccode == 'CCTV_FIRE') {
    						$("#fireCctvIcon").attr("src", obj.categorySymbolPath);
    					} else if(obj.ccode == 'AIR_SENSOR') {
    						$("#airSensorIcon").attr("src", obj.categorySymbolPath);
    					} else if(obj.ccode == 'DRONE_STATION') {
    						$("#droneStationIcon").attr("src", obj.categorySymbolPath);
    					}
    				}
    			}
    		})
    		.catch(err => {

    		});
		},
		
		//알림 리스트 (현재 사용하지 않ㅇ므)
		getNotificationList: function() {
			//console.log('getNotificationList() 1...');

			var me = this;
			me.notificationItems = [];

			axios.get(me.apiNotification, {
				params: {
					count: 10,
					removed: false
				}
			})
    		.then(res => {
    			if(res != null && res.data != null) {
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					me.notificationItems.push(obj);
      				}
    			}
    		})
    		.catch(err => {
    		});

    		//console.log('getNotificationList() end...');
		},
		//시설물 중 6종센서에 해당하는 정보 가져옴
		getAirSensorStationList: function() {
			console.log("basemap.jsp getAirSensorStationList() 1...");

			var me = this;
			me.airsensorStations = [];

			axios.get(me.apiStationList)
    		.then(res => {
    			if(res != null && res.data != null) {
    				let tmpStations = [];
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					tmpStations.push(obj);
      				}

      				me.airsensorStations = tmpStations;
    			}
    		})
    		.catch(err => {
    			console.log("basemap.jsp getAirSensorStationList() error...");
    		});

    		//console.log("basemap.jsp getAirSensorStationList() end...");
		},
		
		//시설물 식별
		onFacility: function(data) {
			var me = this;
			let facility = data.body;
			me.facilityItems.forEach(function(value, index) {
				if(value.fcode == facility.fcode) {
					me.facilityItems[index] = facility;
				}
			});

			if(me.controlTargetFacility.fcode != facility.fcode) {
				me.controlTargetFacility = $.extend({}, facility);
			}
		},
        getSubscribeMsgList : function(data) {
          alert("asdfasdf");
          console.log(data);
        },
		onAirSensor: function(data) {
			//console.error("basemap.js onAirSensor() 1...");
			//console.log("basemap.js onAirSensor() 1...data.body:"+JSON.stringify(data.body));

			let airSensor = JSON.parse(data.body);

			// airsensor dashobard
			if(this.$refs.airsensordashboardComp != null) {
				this.$set(this.$refs.airsensordashboardComp, 'recvAirSensor', airSensor);
			}
			// olpopup
			if(this.olpopupComp != null) {
				this.$set(this.olpopupComp, 'recvAirSensor', airSensor);
			}

			this.onAirSensorControl(airSensor);
			//console.log("basemap.js onAirSensor() end...");
		},
		onAirSensorControl: function(airSensor) {
			//console.log("basemap.js onAirSensorControl() 1...");

			// airsensorControl dashobard
			if(this.$refs.airsensorcontroldashboardComp != null) {
				this.$set(this.$refs.airsensorcontroldashboardComp, 'recvAirSensor', airSensor);
				this.$set(this.$refs.airsensorcontroldashboardComp, 'alarmAirSensor', this.alarmAirSensor);
			}

			//console.log("basemap.js onAirSensorControl() end...");
		},/*
		onAlarm: function(airSensor) {
			console.log("basemap.js onAlarm() 1...");

			airSensor.forEach(function(item, index) {
				if(this.alarmAirSensor.facility.id == item.facility.id) {
					this.alarmAirSensor = item;
				}
    		});

			// alarm dashobard
			if(this.$refs.alarmdashboardComp != null) {
				this.$set(this.$refs.alarmdashboardComp, 'alarmAirSensor', this.alarmAirSensor);
			}

			if(this.$refs.airsensorcontroldashboardComp != null && this.alarmAirSensor) {
				this.$set(this.$refs.airsensorcontroldashboardComp, 'alarmAirSensor', this.alarmAirSensor);
			}
			// olpopup
			//if(this.olpopupComp != null) {
			//	this.$set(this.olpopupComp, 'recvAirSensor', airSensorControl);
			//}

			console.log("basemap.js onAlarm() end...");
		},*/
		
		//알림리스트 (현재는 사용안함)
		onNotification: function(data) {
			let me = this;
			let notification = JSON.parse(data.body);
			// level - 0: success, 1: info, 2: warning, 3: danger
			let title = '';
			let warning = false;
			let danger = false;
			let message = notification.info;
			let recvDate = new Date(notification.create_date);

			if (notification.level != null && notification.level > 1) {
				if (notification.level == 2) {
					warning = true;
					title = me.$i18n.t("notification.label.warning");
				} else {
					danger = true;
					title = me.$i18n.t("notification.label.danger");
				}
				me.notificationItems.push({
					warning: warning,
					danger: danger,
					title: title,
					message: message,
					date: recvDate
				});
			}

			//me.$refs.eventsidebar.putNotification(notification);

			// 알림 종류에 따라서 추가 처리
			var from = notification.from;
			if(from && from === 20) {
				var facility = notification.facility;
				var facilityCategory = facility && facility.facilityCategory
						? facility.facilityCategory
						: null;

				if(facilityCategory) {
					switch(facilityCategory.ccode) {
						case "CCTV_FIRE": {
							// 열화상카메라 알림이 오면, 해당 영상 팝업 open
                            var cnt = 0;
                            var sirenInterval = setInterval(function() {
                                cnt++;

                                me.onToggleSiren(true);
                                setTimeout(() => {
                                    me.onToggleSiren(false);
                                }, 700);

                                if(cnt == 5) {
                                    clearInterval(sirenInterval);
                                    me.onToggleAlarmDashBord(true);
                                    me.onToggleFireCCTV(true, facility, true);
                                }
                            }, 1000);

							break;
						}
					}
				}
			}
		},
		onConnected: function() {
			this.isConnectedStome = true;
			this.subscribews("/w2c/facility", this.onFacility);
			this.subscribews("/w2c/airsensor", this.onAirSensor);
			//this.subscribews("/w2c/airsensor", this.onAirSensorControl);
			this.subscribews("/w2c/notification", this.onNotification);
		},
		onError: function() {
			this.isConnectedStome = false;
			this.stompClient.connect({}, this.onConnected, this.onError);
		},
		onDisconnected: function() {
			this.isConnectedStome = false;
			this.stompClient.disconnect(function() {
				console.log("ws disconnect");
			});
		},
		subscribews: function(topic, callback) {
			var me = this;
			if(this.isConnectedStome) {
				this.stompClient.subscribe(topic, callback);
			}
		},
		sendws: function(topic, data) {
			if(this.isConnectedStome) {
				this.stompClient.send(topic, {}, data);
				return true;
			}
			return false;
		},
		//스트리밍 있을시절 화재감시카메라 함수
		onCloseCCTV: function() {
			this.onToggleCCTV(false);
		},
		onToggleCCTV: function(isOpen) {
			this.isOpenCCTV = isOpen;
			if(this.olpopupComp != null) {
				this.$set(this.olpopupComp, 'isOpenCCTV', isOpen);
			}
		},
		//카메라 프리셋 작동
		onToggleCameraButton: function(id, isShow) {
			let me = this;
			if(isShow){

				 me.inodepEventDetail();

				  me.isGlobalOpen = true;
				  for(var j=0; j<me.isGlobalId.length; j++) {
						if(me.isGlobalId[j] == id) {
                              return;										 // 해당 cctv ID 삭제
                           	}
                     }

                 me.isGlobalId.push(id);


			}else{
				  for(var j=0; j < me.isGlobalId.length; j++) {
                        if(me.isGlobalId[j] == id) {
                              me.isGlobalId.splice(j, 1); // 해당 cctv ID 삭제
                                   j--;
                           }
                     }

			}
			me.getFreeSetInfo(id, isShow, false);
			//me.inodepEvent();
        },

		//UTIC(교통카메라) 클릭시 팝업
		onToggleUticCCTV: function(isOpen){
			this.isOpenUticCCTV = isOpen;
			if(this.olpopupComp != null) {
				this.$set(this.olpopupComp, 'isOpenUticCCTV', isOpen);
			}
		},
		
		//스트리밍 있을 시절 쓰던 화재감시카메라 기능
		onToggleFireCCTV: function(isOpen, facility, isBigDashboard) {
			var me = this;
			if(facility) {
				var facilityItems = me.facilityItems;
				for(var i in facilityItems) {
					var item = facilityItems[i];
					if(item.fcode === facility.fcode) {
						item.isOpen = isOpen;
						if(this.olpopupComp != null) {
							this.$set(this.olpopupComp, 'isOpenFireCCTV', isOpen);
						} else if(!isOpen) { // 팝업창 종료시
                            this.isFreeSet = false;
                            //this.isGlobalOpen = isOpen;
//                            for(var j=0; j < me.isGlobalId.length; j++) {
//                                if(me.isGlobalId[j] == item.fcode) {
//                                    me.isGlobalId.splice(j, 1); // 해당 cctv ID 삭제
//                                    j--;
//                                }
//                            }
                            //me.getFreeSetInfo(item.fcode, isOpen, true); // 선택 팝업창의 레이어 삭제
                        }

						// 현재 스트리밍할 열화상카메라 facility 지정
						// 매개변수로 넘어온 facility를 지정
						//if(isOpen) this.fireCctvStreamingFacility = facility;

						if(isOpen) {
                            //this.isGlobalOpen = isOpen;
                            //this.isGlobalId.push(item.fcode);
							// 열화상카메라의 크기를 크게 띄울건지 bool 지정
							item.isBigDashboard = isBigDashboard;

							this.onUpdateFireCCTVUI(item.fcode);
                            //if(!this.isFreeSet) {
                            //    this.isFreeSet = true;
                                //me.getFreeSetInfo(item.id, isOpen, true); //팝업창 오픈시 해당 프리셋 위치 표시
                            //}
						}
					}
				}
			}
		},
        openCheck: function(key, isOpen) {
			//kjw siren, alarmDashBord 대쉬보드 리스트 제외
            if (key != "siren" && key != "alarmDashBord" && key != "traffic"){
	            this.dashboardManage[key].isOpen = isOpen;

	            if(key.indexOf("Popup") < 0) {
	                key = key+"Popup";
	            }


	            var keyName = 'main' + key.charAt(0).toUpperCase() + key.slice(1);
	            if(isOpen) {
	                $("#popup-sidebar").show();
	                $("#" + keyName + "Window").show();
	            } else {

//	                $("#" + keyName + "Window").hide();
//
//	                var airSensor = document.getElementById("mainAirSensorPopupWindow");
//	                var droneStation = document.getElementById("mainDroneStationPopupWindow");
//	                var airSensorControl = document.getElementById("mainAirSensorControlPopupWindow");
//	                var wallFreeSet = document.getElementById("mainWallFreeSetPopupWindow");
//
//	                if(airSensor.style.display == "none" && droneStation.style.display == "none"
//	                   && airSensorControl.style.display == "none" && wallFreeSet.style.display == "none") {
//	                    $("#popup-sidebar").hide();
//	                }
	            }
            }
        },
		//메뉴 클릭시 오픈
        onToggle: function(key) {
            this.dashboardManage[key].isOpen = true;
        },
		onToggleAirSensor: function(isOpen) {
            this.openCheck('airSensor', isOpen);
        },
        onToggleAirSensorControl: function(isOpen) {
            this.openCheck('airSensorControl', isOpen);
            //this.dashboardManage.airSensorControl.isOpen = isOpen;
        },
        onToggleAlarm: function(isOpen) {
            this.dashboardManage.alarm.isOpen = isOpen;
        },
        onToggleAirSensorStation: function(isOpen) {
            this.dashboardManage.airSensorStation.isOpen = isOpen;
        },
        onToggleAirSensorStationPredict: function(isOpen) {
            this.dashboardManage.airSensorStationPredict.isOpen = isOpen;
        },
        onToggleDroneStation: function(isOpen) {
            if(isOpen) {
                this.onDronStation();
            }
            this.openCheck('droneStation', isOpen);
            //this.dashboardManage.droneStation.isOpen = isOpen;
        },
        /*onToggleNotification: function(isOpen) {
            this.isOpenNotification = isOpen;
        },*/
        onToggleWallFreeSet: function(isOpen) {
            if(isOpen) {
                this.onWallFreeSet();
            }
            this.openCheck('wallFreeSet', isOpen);
            //this.dashboardManage.wallFreeSet.isOpen = isOpen;
        },
        onToggleSiren: function(isOpen) {
            this.dashboardManage.siren.isOpen = isOpen;
        },
        onToggleAlarmDashBord: function(isOpen) {
            this.dashboardManage.alarmDashBord.isOpen = isOpen;
        },
		onSelectChangedFacility: function(facility) {
			this.onSelectedFacility(facility);
		},
		onFullFireCCTV: function(facility) {
			if(facility) {
				facility.isFull = !facility.isFull;
				this.onUpdateFireCCTVUI(facility.fcode);
			}
		},
		onFullAirSensor: function() {
			this.dashboardManage.airSensor.isFull = !this.dashboardManage.airSensor.isFull;
			this.onUpdateAirSensorUI();
		},
		onFullAirSensorControl: function() {
			this.dashboardManage.airSensorControl.isFull = !this.dashboardManage.airSensorControl.isFull;
			this.onUpdateAirSensorControlUI();
		},
		onFullAirSensorStation: function() {
			this.dashboardManage.airSensorStation.isFull = !this.dashboardManage.airSensorStation.isFull;
			this.onUpdateAirSensorStationUI();
		},
		onFullAirSensorStationPredict: function() {
			this.dashboardManage.airSensorStationPredict.isFull = !this.dashboardManage.airSensorStationPredict.isFull;
			this.onUpdateAirSensorStationPredictUI();
		},
		onFullDroneStation: function() {
			this.dashboardManage.droneStation.isFull = !this.dashboardManage.droneStation.isFull;
			this.onUpdateDroneStationUI();
		},
		onFullAlarm: function() {
			this.dashboardManage.alarm.isFull = !this.dashboardManage.alarm.isFull;
			this.onUpdateAlarmUI();
		},
		/*onFullNotification: function() {
			this.isFullNotification = !this.isFullNotification;
			this.onUpdateNotificationUI();
		},*/
		/*onFullWallFreeSet: function() {
			this.dashboardManage.wallFreeSet.isFull = !this.dashboardManage.wallFreeSet.isFull;
			this.onUpdateWallFreeSetUI();
		},*/
		onUpdateFireCCTVUI: function(id) {
			let me = this;
			setTimeout(() => {

				var isFull = false;
				for(var i in me.facilityItems) {
					var item = me.facilityItems[i];
					if(item.fcode == id) {
						isFull = item.isFull;
					}
				}

				$("#mainFireCCTVWindow" + id).on('resize', () => {
					me.dashboardLayout["fireCCTV" + id].width = $("#mainFireCCTVWindow" + id).outerWidth() + "px";
					me.dashboardLayout["fireCCTV" + id].height = $("#mainFireCCTVWindow" + id).outerHeight() + "px";
					if(!isFull) {
						me.updateLayout();
					}
				});

				if($("#mainFireCCTVWindow" + id).css("z-index") > me.zIndex) {
					me.zIndex = $("#mainFireCCTVWindow" + id).css("z-index");
				}

				if(isFull) {
					$("#mainFireCCTVWindow" + id).draggable('destroy');
					$("#mainFireCCTVWindow" + id).resizable('destroy');
				} else {
					$("#mainFireCCTVWindow" + id).draggable({
						containment:'document',
						scroll: false,
						revert: false,
						start: function() {
							me.dashboardLayout["fireCCTV" + id].zIndex = me.zIndex + 1;
							me.zIndex++;
							$("#mainFireCCTVWindow" + id).css("z-index", me.dashboardLayout["fireCCTV" + id].zIndex);
							me.updateLayout();
						},
						stop: function() {
							me.dashboardLayout["fireCCTV" + id].left = $("#mainFireCCTVWindow" + id).css("left");
							me.dashboardLayout["fireCCTV" + id].top = $("#mainFireCCTVWindow" + id).css("top");
							me.updateLayout();
						}
					});
					$("#mainFireCCTVWindow" + id).resizable({
						minHeight: me.dashboardLayout["fireCCTV" + id].minHeight,
					    minWidth: me.dashboardLayout["fireCCTV" + id].minWidth
					});

					$("#mainFireCCTVWindow" + id).on('click', '*', () => {
						if($("#mainFireCCTVWindow" + id).css("z-index") != me.zIndex) {
							me.zIndex++;
							$("#mainFireCCTVWindow" + id).css("z-index", me.zIndex);
							me.dashboardLayout["fireCCTV" + id].zIndex = me.zIndex;
							me.updateLayout();
						}
					});
				}
			}, 500);
		},
		onUpdateAirSensorUI: function() {
			let me = this;
			setTimeout(() => {

				$("#mainAirSensorWindow").on('resize', () => {
					me.dashboardLayout.airSensor.width = $("#mainAirSensorWindow").outerWidth() + "px";
					me.dashboardLayout.airSensor.height = $("#mainAirSensorWindow").outerHeight() + "px";
					if(!me.dashboardManage.airSensor.isFull) {
						me.updateLayout();
					}
				});

				if($("#mainAirSensorWindow").css("z-index") > me.zIndex) {
					me.zIndex = $("#mainAirSensorWindow").css("z-index");
				}

				if(me.dashboardManage.airSensor.isFull) {
					$("#mainAirSensorWindow").draggable('destroy');
					$("#mainAirSensorWindow").resizable('destroy');
				} else {
					$("#mainAirSensorWindow").draggable({
						containment:'document',
						scroll: false,
						revert: false,
						start: function() {
							me.dashboardLayout.airSensor.zIndex = me.zIndex + 1;
							me.zIndex++;
							$("#mainAirSensorWindow").css("z-index", me.dashboardLayout.airSensor.zIndex);
							me.updateLayout();
						},
						stop: function() {
							me.dashboardLayout.airSensor.left = $("#mainAirSensorWindow").css("left");
							me.dashboardLayout.airSensor.top = $("#mainAirSensorWindow").css("top");
							me.updateLayout();
						}
					});
					$("#mainAirSensorWindow").resizable({
						minHeight: me.dashboardLayout.airSensor.minHeight,
					    minWidth: me.dashboardLayout.airSensor.minWidth
					});

					$("#mainAirSensorWindow").on('click', '*', () => {
						if($("#mainAirSensorWindow").css("z-index") != me.zIndex) {
							me.zIndex++;
							$("#mainAirSensorWindow").css("z-index", me.zIndex);
							me.dashboardLayout.airSensor.zIndex = me.zIndex;
							me.updateLayout();
						}
					});
				}
			}, 500);
		},
		onUpdateAirSensorControlUI: function() {
			let me = this;
			setTimeout(() => {

				me.dashboardLayout.airSensorControl = me.dashboardLayout.airSensorControlDefault;

				$("#mainAirSensorControlWindow").on('resize', () => {
					me.dashboardLayout.airSensorControl.width = $("#mainAirSensorControlWindow").outerWidth() + "px";
					me.dashboardLayout.airSensorControl.height = $("#mainAirSensorControlWindow").outerHeight() + "px";
					if(!me.dashboardManage.airSensorControl.isFull) {
						me.updateLayout();
					}
				});

				if($("#mainAirSensorControlWindow").css("z-index") > me.zIndex) {
					me.zIndex = $("#mainAirSensorControlWindow").css("z-index");
				}

				if(me.dashboardManage.airSensorControl.isFull) {
					$("#mainAirSensorControlWindow").draggable('destroy');
					$("#mainAirSensorControlWindow").resizable('destroy');
				} else {
					$("#mainAirSensorControlWindow").draggable({
						containment:'document',
						scroll: false,
						revert: false,
						start: function() {
							me.dashboardLayout.airSensorControl.zIndex = me.zIndex + 1;
							me.zIndex++;
							$("#mainAirSensorControlWindow").css("z-index", me.dashboardLayout.airSensorControl.zIndex);
							me.updateLayout();
						},
						stop: function() {
							me.dashboardLayout.airSensorControl.left = $("#mainAirSensorControlWindow").css("left");
							me.dashboardLayout.airSensorControl.top = $("#mainAirSensorControlWindow").css("top");
							me.updateLayout();
						}
					});
					$("#mainAirSensorControlWindow").resizable({
						minHeight: me.dashboardLayout.airSensorControl.minHeight,
					    minWidth: me.dashboardLayout.airSensorControl.minWidth
					});

					$("#mainAirSensorControlWindow").on('click', '*', () => {
						if($("#mainAirSensorControlWindow").css("z-index") != me.zIndex) {
							me.zIndex++;
							$("#mainAirSensorControlWindow").css("z-index", me.zIndex);
							me.dashboardLayout.airSensorControl.zIndex = me.zIndex;
							me.updateLayout();
						}
					});
				}
			}, 500);
		},
		onUpdateAlarmUI: function() {
			let me = this;

			setTimeout(() => {

				me.dashboardLayout.alarm = me.dashboardLayout.alarmDefault;

				$("#mainAlarmWindow").on('resize', () => {
					me.dashboardLayout.alarm.width = $("#mainAlarmWindow").outerWidth() + "px";
					me.dashboardLayout.alarm.height = $("#mainAlarmWindow").outerHeight() + "px";
					if(!this.dashboardManage.alarm.isFull) {
						me.updateLayout();
					}
				});

				if($("#mainAlarmWindow").css("z-index") > me.zIndex) {
					//me.zIndex = $("#mainAlarmWindow").css("z-index");
				}

				if(this.dashboardManage.alarm.isFull) {
					$("#mainAlarmWindow").draggable('destroy');
					$("#mainAlarmWindow").resizable('destroy');
				} else {
					$("#mainAlarmWindow").draggable({
						containment:'document',
						scroll: false,
						revert: false,
						start: function() {
							//me.dashboardLayout.alarm.zIndex = me.zIndex + 1;
							//me.zIndex++;
							$("#mainAlarmWindow").css("z-index", me.dashboardLayout.alarm.zIndex);
							me.updateLayout();
						},
						stop: function() {
							me.dashboardLayout.alarm.left = $("#mainAlarmWindow").css("left");
							me.dashboardLayout.alarm.top = $("#mainAlarmWindow").css("top");
							me.updateLayout();
						}
					});
					$("#mainAlarmWindow").resizable({
						minHeight: me.dashboardLayout.alarm.minHeight,
					    minWidth: me.dashboardLayout.alarm.minWidth
					});

					$("#mainAlarmWindow").on('click', '*', () => {
						if($("#mainAlarmWindow").css("z-index") != me.zIndex) {
							//me.zIndex++;
							//$("#mainAlarmWindow").css("z-index", me.zIndex);
							//me.dashboardLayout.alarm.zIndex = me.zIndex;
							me.updateLayout();
						}
					});
				}
			}, 500);
		},
		onUpdateAirSensorStationUI: function() {
			let me = this;
			setTimeout(() => {
				if(me.dashboardManage.airSensorStation.isFull) {
					$("#mainAirSensorStationWindow").draggable('destroy');
					$("#mainAirSensorStationWindow").resizable('destroy');
				} else {
					$("#mainAirSensorStationWindow").draggable({
						containment:'document',
						scroll: false,
						revert: false,
						start: function() {
							me.dashboardLayout.airSensorStation.zIndex = me.zIndex + 1;
							me.zIndex++;
							$("#mainAirSensorStationWindow").css("z-index", me.dashboardLayout.airSensorStation.zIndex);
							me.updateLayout();
						},
						stop: function() {
							me.dashboardLayout.airSensorStation.left = $("#mainAirSensorStationWindow").css("left");
							me.dashboardLayout.airSensorStation.top = $("#mainAirSensorStationWindow").css("top");
							me.updateLayout();
						}
					});
					$("#mainAirSensorStationWindow").resizable({
						minHeight: me.dashboardLayout.airSensorStation.minHeight,
					    minWidth: me.dashboardLayout.airSensorStation.minWidth
					});
				}
			}, 500);
		},
		onUpdateAirSensorStationPredictUI: function() {
			let me = this;
			setTimeout(() => {

				$("#mainAirSensorStationPredictWindow").on('resize', () => {
					me.dashboardLayout.airSensorStationPredict.width = $("#mainAirSensorStationPredictWindow").outerWidth() + "px";
					me.dashboardLayout.airSensorStationPredict.height = $("#mainAirSensorStationPredictWindow").outerHeight() + "px";
					if(!me.dashboardManage.airSensorStationPredict.isFull) {
						me.updateLayout();
					}
				});

				if(me.dashboardManage.airSensorStationPredict.isFull) {
					$("#mainAirSensorStationPredictWindow").draggable('destroy');
					$("#mainAirSensorStationPredictWindow").resizable('destroy');
				} else {
					$("#mainAirSensorStationPredictWindow").draggable({
						containment:'document',
						scroll: true,
						revert: false,
						start: function() {
							me.dashboardLayout.airSensorStationPredict.zIndex = me.zIndex + 1;
							me.zIndex++;
							$("#mainAirSensorStationPredictWindow").css("z-index", me.dashboardLayout.airSensorStationPredict.zIndex);
							me.updateLayout();
						},
						stop: function() {
							me.dashboardLayout.airSensorStationPredict.left = $("#mainAirSensorStationPredictWindow").css("left");
							me.dashboardLayout.airSensorStationPredict.top = $("#mainAirSensorStationPredictWindow").css("top");
							me.updateLayout();
						}
					});
					$("#mainAirSensorStationPredictWindow").resizable({
						minHeight: me.dashboardLayout.airSensorStationPredict.minHeight,
					    minWidth: me.dashboardLayout.airSensorStationPredict.minWidth
					});
				}
			}, 500);
		},
		onUpdateDroneStationUI: function() {
			let me = this;
			setTimeout(() => {

				$("#mainDroneStationWindow").on('resize', () => {
					me.dashboardLayout.droneStation.width = $("#mainDroneStationWindow").outerWidth() + "px";
					me.dashboardLayout.droneStation.height = $("#mainDroneStationWindow").outerHeight() + "px";
					if(!me.dashboardManage.droneStation.isFull) {
						me.updateLayout();
					}
				});

				if($("#mainDroneStationWindow").css("z-index") > me.zIndex) {
					me.zIndex = $("#mainDroneStationWindow").css("z-index");
				}

				if(me.dashboardManage.droneStation.isFull) {
					$("#mainDroneStationWindow").draggable('destroy');
					$("#mainDroneStationWindow").resizable('destroy');
				} else {
					$("#mainDroneStationWindow").draggable({
						containment:'document',
						scroll: false,
						revert: false,
						start: function() {
							me.dashboardLayout.droneStation.zIndex = me.zIndex + 1;
							me.zIndex++;
							$("#mainDroneStationWindow").css("z-index", me.dashboardLayout.droneStation.zIndex);
							me.updateLayout();
						},
						stop: function() {
							me.dashboardLayout.droneStation.left = $("#mainDroneStationWindow").css("left");
							me.dashboardLayout.droneStation.top = $("#mainDroneStationWindow").css("top");
							me.updateLayout();
						}
					});
					$("#mainDroneStationWindow").resizable({
						minHeight: me.dashboardLayout.droneStation.minHeight,
					    minWidth: me.dashboardLayout.droneStation.minWidth
					});

					$("#mainDroneStationWindow").on('click', '*', () => {
						if($("#mainDroneStationWindow").css("z-index") != me.zIndex) {
							me.zIndex++;
							$("#mainDroneStationWindow").css("z-index", me.zIndex);
							me.dashboardLayout.droneStation.zIndex = me.zIndex;
							me.updateLayout();
						}
					});
				}
			}, 500);
		},
		/*onUpdateNotificationUI: function() {
			let me = this;
			setTimeout(() => {
				if(me.isFullNotification) {
					$("#mainNotificationWindow").draggable('destroy');
					$("#mainNotificationWindow").resizable('destroy');
				} else {
					$("#mainNotificationWindow").draggable({
						containment:'document',
						scroll: false,
						revert: false,
						start: function() {
							me.dashboardLayout.notification.zIndex = me.zIndex + 1;
							me.zIndex++;
							$("#mainNotificationWindow").css("z-index", me.dashboardLayout.notification.zIndex);
							me.updateLayout();
						},
						stop: function() {
							me.dashboardLayout.notification.left = $("#mainNotificationWindow").css("left");
							me.dashboardLayout.notification.top = $("#mainNotificationWindow").css("top");
							me.updateLayout();
						}
					});
					$("#mainNotificationWindow").resizable({
						minHeight: me.dashboardLayout.notification.minHeight,
					    minWidth: me.dashboardLayout.notification.minWidth
					});
				}
			}, 500);
		},*/
		onUpdateWallFreeSetUI: function() {
			let me = this;
			setTimeout(() => {

				$("#mainWallFreeSetWindow").on('resize', () => {
					me.dashboardLayout.wallFreeSet.width = $("#mainWallFreeSetWindow").outerWidth() + "px";
					me.dashboardLayout.wallFreeSet.height = $("#mainWallFreeSetWindow").outerHeight() + "px";
					if(!me.dashboardManage.wallFreeSet.isFull) {
						me.updateLayout();
					}
				});

				if($("#mainWallFreeSetWindow").css("z-index") > me.zIndex) {
					me.zIndex = $("#mainWallFreeSetWindow").css("z-index");
				}

				if(me.dashboardManage.wallFreeSet.isFull) {
					$("#mainWallFreeSetWindow").draggable('destroy');
					$("#mainWallFreeSetWindow").resizable('destroy');
				} else {
					$("#mainWallFreeSetWindow").draggable({
						containment:'document',
						scroll: false,
						revert: false,
						start: function() {
							me.dashboardLayout.wallFreeSet.zIndex = me.zIndex + 1;
							me.zIndex++;
							$("#mainWallFreeSetWindow").css("z-index", me.dashboardLayout.wallFreeSet.zIndex);
							me.updateLayout();
						},
						stop: function() {
							me.dashboardLayout.wallFreeSet.left = $("#mainWallFreeSetWindow").css("left");
							me.dashboardLayout.wallFreeSet.top = $("#mainWallFreeSetWindow").css("top");
							me.updateLayout();
						}
					});
					$("#mainWallFreeSetWindow").resizable({
						minHeight: me.dashboardLayout.wallFreeSet.minHeight,
					    minWidth: me.dashboardLayout.wallFreeSet.minWidth
					});

					$("#mainWallFreeSetWindow").on('click', '*', () => {
						if($("#mainWallFreeSetWindow").css("z-index") != me.zIndex) {
							me.zIndex++;
							$("#mainWallFreeSetWindow").css("z-index", me.zIndex);
							me.dashboardLayout.wallFreeSet.zIndex = me.zIndex;
							me.updateLayout();
						}
					});
				}
			}, 500);
		},
        onUpdateCctvGrade1: function() {
        },
        onUpdateCctvGrade2: function() {
        },
        onUpdateonCctv1: function() {
        },
        onUpdateonCctv2: function() {
        },
        onUpdateairCleaner1: function() {
        },
        onUpdateairCleaner2: function() {
        },
        onUpdateairCleaner3: function() {
        },
        onUpdateSirenUI: function() {
            let me = this;
            setTimeout(() => {

                $("#sirenWindow").on('resize', () => {
                    me.dashboardLayout.siren.width = $("#sirenWindow").outerWidth() + "px";
                    me.dashboardLayout.siren.height = $("#sirenWindow").outerHeight() + "px";
                    me.updateLayout();
                });

                if($("#sirenWindow").css("z-index") > me.zIndex) {
                    me.zIndex = $("#sirenWindow").css("z-index");
                }

                if(me.dashboardManage.siren.isFull) {
                    $("#sirenWindow").draggable('destroy');
                    $("#sirenWindow").resizable('destroy');
                } else {
                    $("#sirenWindow").draggable({
                        containment:'document',
                        scroll: false,
                        revert: false,
                        start: function() {
                            me.dashboardLayout.siren.zIndex = me.zIndex + 1;
                            me.zIndex++;
                            $("#sirenWindow").css("z-index", me.dashboardLayout.siren.zIndex);
                            me.updateLayout();
                        },
                        stop: function() {
                            me.dashboardLayout.siren.left = $("#sirenWindow").css("left");
                            me.dashboardLayout.siren.top = $("#sirenWindow").css("top");
                            me.updateLayout();
                        }
                    });
                    $("#sirenWindow").resizable({
                        minHeight: me.dashboardLayout.siren.minHeight,
                        minWidth: me.dashboardLayout.siren.minWidth
                    });

                    $("#sirenWindow").on('click', '*', () => {
                        if($("#sirenWindow").css("z-index") != me.zIndex) {
                            me.zIndex++;
                            $("#sirenWindow").css("z-index", me.zIndex);
                            me.dashboardLayout.siren.zIndex = me.zIndex;
                            me.updateLayout();
                        }
                    });
                }
            }, 500);
        },

		//대시보드 사이즈조정
        onUpdatealarmDashBordUI: function() {
            let me = this;
            setTimeout(() => {

                $("#alarmDashBordWindow").on('resize', () => {
                    me.dashboardLayout.alarmDashBord.width = $("#alarmDashBordWindow").outerWidth() + "px";
                    me.dashboardLayout.alarmDashBord.height = $("#alarmDashBordWindow").outerHeight() + "px";
                    me.updateLayout();
                });

                if($("#alarmDashBordWindow").css("z-index") > me.zIndex) {
                    me.zIndex = $("#alarmDashBordWindow").css("z-index");
                }

                if(me.dashboardManage.alarmDashBord.isFull) {
                    $("#alarmDashBordWindow").draggable('destroy');
                    $("#alarmDashBordWindow").resizable('destroy');
                } else {
                    $("#alarmDashBordWindow").draggable({
                        containment:'document',
                        scroll: false,
                        revert: false,
                        start: function() {
                            me.dashboardLayout.alarmDashBord.zIndex = me.zIndex + 1;
                            me.zIndex++;
                            $("#alarmDashBordWindow").css("z-index", me.dashboardLayout.alarmDashBord.zIndex);
                            me.updateLayout();
                        },
                        stop: function() {
                            me.dashboardLayout.alarmDashBord.left = $("#alarmDashBordWindow").css("left");
                            me.dashboardLayout.alarmDashBord.top = $("#alarmDashBordWindow").css("top");
                            me.updateLayout();
                        }
                    });
                    $("#alarmDashBordWindow").resizable({
                        minHeight: me.dashboardLayout.alarmDashBord.minHeight,
                        minWidth: me.dashboardLayout.alarmDashBord.minWidth
                    });

                    $("#alarmDashBordWindow").on('click', '*', () => {
                        if($("#alarmDashBordWindow").css("z-index") != me.zIndex) {
                            me.zIndex++;
                            $("#alarmDashBordWindow").css("z-index", me.zIndex);
                            me.dashboardLayout.alarmDashBord.zIndex = me.zIndex;
                            me.updateLayout();
                        }
                    });
                }
            }, 500);
        },
		/*onClickMediaManagementMenu: function(e) {
			e.stopPropagation();
			$("#mediaManagementSubmenu").collapse('toggle');
		},
		onClickAirManagementMenu: function(e) {
			e.stopPropagation();
			$("#airManagementSubmenu").collapse('toggle');
		},
		onClickUserManagementMenu: function(e) {
			e.stopPropagation();
			$("#userManagementSubmenu").collapse('toggle');
		},
		onClickDashboardManagementMenu: function(e) {
			e.stopPropagation();
			$("#dashboardManagementSubmenu").collapse('toggle');
		},*/
		onShowPtzCtrl: function() {
			this.isShowPtzCtrl = !this.isShowPtzCtrl;
			this.onUpdateFireCCTVUI();
		},
		onShowDronePtzCtrl: function() {
			this.isShowDronePtzCtrl = !this.isShowDronePtzCtrl;
			this.onUpdateDroneStationUI();
		},
		drawComplete: function(){
			 	this.isNamed=true;
				this.saveLonLat.push(this.pointerLonLat);
				this.pointerCoordinate=[];
				this.pointerLonLat=[];
		},
		
		//그리기 지우기(지금은 사용x)
		drawErase: function(){
            var me = this;
			me.pointerCoordinate = [];
			me.pointerLonLat = [];
			me.saveLonLat=[];
            // Vector 레이어를 삭제 후 재 생성
            var layersToRemove = [];
            this.mapArea.getLayers().forEach(layer => {
                if((layer.get('name') != undefined && layer.get("name") === 'ONDRAW') || layer.get("name") === 'ONPOINT'){
                    layersToRemove.push(layer);
                }
            });

            var len = layersToRemove.length;
            for(var i = 0; i < len; i++) {
                this.mapArea.removeLayer(layersToRemove[i]);
            }
		},
		
		//그리기툴 저장(지금은 사용x)
		saveDraw: async function(){
			var me = this;
			if(me.saveLonLat.length == 0){
				alert("그리기 완료를 누른후 저장하시오");
			}else{
				for(var i in me.saveLonLat){
					for(var j in me.saveLonLat[i]){
						me.lonlatItems.longitude = me.saveLonLat[i][j][0];
						me.lonlatItems.latitude = me.saveLonLat[i][j][1];
						console.log(me.lonlatItems);
								await axios.post(me.apiDrawLine, JSON.stringify(me.lonlatItems), me.config)
	    							.then(res => {

						    		})
						    		.catch(err => {
										console.error("drawLine err:"+err);
						    		});
					}
				}
				alert("좌표 전송 완료!");
				me.saveLonLat = [];
			}

		},
		wsTest: function() {
			axios.get("/ws/test", {})
//            axios.get("/vms/event", {
//                params: {
//                    authToken: token,
//                    apiSerial: api
//                    }
//                })
    		.then(res => {
    			console.log("done");
    		})
    		.catch(err => {
    		});
		},
        onDronStation: function() {
            axios.get(this.apiWizWigSocket, {})
            .then(res => {
            })
            .catch(err => {
            });
        },
        onWallFreeSet: function() {
            axios.get(this.apiWallFreeSetInfo, {})
            .then(res => {
                if(res != null && res.data != null) {
                    let wallControlItemData = [];
                    for(var i=0; i < res.data.length; i++) {
                        var obj = res.data[i];
                        wallControlItemData.push({
                           label: obj.preseName,
                           value: obj.preseName
                        });
                    }

                    this.wallControlSelector = null;
                    this.wallControlSelector = new tui.SelectBox('#wallControlSelector', {
                        data: wallControlItemData,
                        autofocus: true,
                        showIcon: true
                    });

                    /*this.wallControlSelector.on('change', (ev) => {
                        this.onChangeWallControlSelector(ev.prev.getValue(), ev.curr.getValue());
                    });*/
                }
            })
            .catch(err => {
            });
        },
        onChangeWallControlSelector: function() {
            axios.get(this.apiWallFreeSetAction, {
                params: {
                    presetName: this.wallControlSelector.getSelectedItem().getValue()
                    }
                })
            .then(res => {
            })
            .catch(err => {
            });
        },

        wallControlConfirmCommon: function() {

            $("#confirmTitle").html(this.$i18n.t("frontend.dashboard.wallFreeSet.title"));
            $("#confirmContent").html(this.$i18n.t("frontend.dashboard.wallFreeSet.content"));
            $("#confirmCancel").html(this.$i18n.t("button.cancel"));
            $("#confirmOk").html(this.$i18n.t("button.ok"));
            $("#confirmOk").removeClass('btn-primary');
            $("#confirmOk").addClass('btn-danger');

            $("#confirmDialog").modal('toggle');
            $("#confirmDialog").addStyle('toggle');

            $('#confirmOk').on('click', this.onChangeWallControlSelector);
            $('#confirmCancel').on('click', this.onChangeWallControlSelectorCancel);
        },
        onChangeWallControlSelectorCancel: function(e) {

        },
		dashboardIconPath: function(isOpen, imgName) {
			return "/static/images/dashboard_" + imgName + "_" + (isOpen ? "on" : "off") + "_icon.png";
		},
		setCenter: function(coordinate) {
			this.mapArea.getView().setCenter(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:900913'));
		},
		
		//VMS LOGIN 분리후 사용하지 않음
//        inodepEvent: async function() {
//            let me = this;
//            //me.inodepURL = `http://${me.restIp}:${me.restPort}/api/`;
//			
//			
//			me.inodepURL = `http://${me.vmsConfig.vmsRestIp}:${me.vmsConfig.vmsRestPort}/api/`;
//			console.log("inodepURL : " + me.inodepURL)
//			console.log("me.vmsConfig.vmsUser : " + me.vmsConfig.vmsUser)
//
//			console.log("test inodepEvent start");
//            await axios.get(me.inodepURL + me.inodepLoginURL,
//                {
//                    headers: {
//                        /*"x-account-id": me.vmsId,
//                        "x-account-pass": me.vmsPw,
//                        "x-account-group" : me.inodepGroup,
//                        "x-license" : me.inodepLicense*/
//                        "x-account-id": me.vmsConfig.vmsUser,
//						"x-account-pass": me.vmsConfig.vmsPw,
//						"x-account-group" : me.inodepGroup,
//						"x-license" : me.inodepLicense
//                    }
//                }
//            )
//            .then(async res => {
//	
//				console.log(res);
//
//                var resData = res.data.results;
//                me.inodepAuthToken = resData.auth_token;
//                me.inodepApiSerial = resData.api_serial;
//
//				sessionStorage.setItem("inodepAuthToken", me.inodepAuthToken ); // 저장
//				sessionStorage.setItem("inodepApiSerial", me.inodepApiSerial ); // 저장
//
//				//sessionStorage.length; // 1
//				//sessionStorage.key(0); //
//				//sessionStorage.removeItem("mineSession"); // 삭제
//				//sessionStorage.clear(); // 전체삭제
//				
//				me.inodepEventDetail();
//				//me.testIno();
//				//me.inodepLogout();
//				
//           })
//            .catch(async err => {
//                console.log(err);
//                //me.inodepBool = false;
//
//				// 이노뎁 인증관련 임시처리
//				me.inodepAuthToken = sessionStorage.getItem("inodepAuthToken"); //
//				me.inodepApiSerial = sessionStorage.getItem("inodepApiSerial"); //
//
//				this.inodepEventDetail();
//				//me.testIno();
//				//me.inodepLogout();
//                return;
//            });
//        },

		//VMS 로그인 ->  res로 토큰(다른api작동시 헤더에 필수)발급 yjh
        inodepLogin: async function() {
            let me = this;
            //me.inodepURL = `http://${me.restIp}:${me.restPort}/api/`;
			
			
			me.inodepURL = `http://${me.vmsConfig.vmsRestIp}:${me.vmsConfig.vmsRestPort}/api/`;
			console.log("inodepURL : " + me.inodepURL)
			console.log("me.vmsConfig.vmsUser : " + me.vmsConfig.vmsUser)

			console.log("test inodepEvent start");
            await axios.get(me.inodepURL + me.inodepLoginURL,
                {
                    headers: {
                        /*"x-account-id": me.vmsId,
                        "x-account-pass": me.vmsPw,
                        "x-account-group" : me.inodepGroup,
                        "x-license" : me.inodepLicense*/
                        "x-account-id": me.vmsConfig.vmsUser,
						"x-account-pass": me.vmsConfig.vmsPw,
						"x-account-group" : me.inodepGroup,
						"x-license" : me.inodepLicense
                    }
                }
            )
            .then(async res => {
				console.log('로그인 성공');
				console.log(res);
				
                var resData = res.data.results;
                me.inodepAuthToken = resData.auth_token;
                me.inodepApiSerial = resData.api_serial;
				
				me.updateTokens();
				me.testIno();
				//sessionStorage.setItem("inodepAuthToken", me.inodepAuthToken ); // 저장
				//sessionStorage.setItem("inodepApiSerial", me.inodepApiSerial ); // 저장

				//sessionStorage.length; // 1
				//sessionStorage.key(0); //
				//sessionStorage.removeItem("mineSession"); // 삭제
				//sessionStorage.clear(); // 전체삭제
				
				//this.inodepEventDetail();
				//this.testIno();
				//this.inodepLogout();
				
           })
            .catch(async err => {
				console.log('로그인 실패');
                console.log(err);
                //me.inodepBool = false;
				
				me.loadTokens(me.vmsConfig.vmsUser);
				
				me.inodepLogout();
				me.inodepLogin();
				
				

				// 이노뎁 인증관련 임시처리
				//me.inodepAuthToken = sessionStorage.getItem("inodepAuthToken"); //
				//me.inodepApiSerial = sessionStorage.getItem("inodepApiSerial"); //

				//this.inodepEventDetail();
				//this.testIno();
				//this.inodepLogout();
                //return;
            });
        },
		
		//test이노뎁api yjh
		testIno:  function(){
			console.log(`http://${this.vmsConfig.vmsRestIp}:${this.vmsConfig.vmsRestPort}/api/device/infos?dev_serial_list=[100003,100056]`);
			 axios.get(`http://${this.vmsConfig.vmsRestIp}:${this.vmsConfig.vmsRestPort}/api/device/infos?dev_serial_list=[100003,100056]`,
			   {
                    headers: {
                                    "x-auth-token" : this.inodepAuthToken,
                                    "x-api-serial" : this.inodepApiSerial,
                    }
                }
			
			)
			.then(res => {
				console.log("성공")
				console.log(res);
	        })
	        .catch(err => {
				console.log("실패");
				console.log(err);
	        });
		},
		
		//이노뎁 로그아웃 (토큰 삭제) yjh
		inodepLogout: async function(){
			console.log(`http://${this.vmsConfig.vmsRestIp}:${this.vmsConfig.vmsRestPort}/api/logout`);
			await axios.delete(`http://${this.vmsConfig.vmsRestIp}:${this.vmsConfig.vmsRestPort}/api/logout`,
			   {
                    headers: {
                                    "x-auth-token" : this.inodepAuthToken
                    }
                }
			
			)
			.then(res => {
				console.log("로그아웃 성공")
				console.log(res);
	        })
	        .catch(err => {
				console.log("로그아웃 실패");
				console.log(err);
	        });
		},
		
		//이노뎁 토큰연장  yjh 현재는 쓸일이 없은 나중에 필요시.
		inodepKeep: async function(){
			console.log(`http://${this.vmsConfig.vmsRestIp}:${this.vmsConfig.vmsRestPort}/api/keep-alive`);
			await axios.get(`http://${this.vmsConfig.vmsRestIp}:${this.vmsConfig.vmsRestPort}/api/keep-alive`,
			   {
                    headers: {
                                    "x-auth-token" : this.inodepAuthToken,
                    }
                }
			
			)
			.then(res => {
				console.log("성공")
				console.log(res);
	        })
	        .catch(err => {
				console.log("실패");
				console.log(err);
	        });
		},

		//화재감시 이벤트 socket단 yjh 수정
		inodepEventDetail: function() {
			let me = this;
			console.log()
						//me.inodepLogout();
						//me.inodepLogin();
			//me.isGlobalId.push(838,843);
			require(['static/js/socket.io'], function(io) {
					console.log("test io.connect start");
                    var socket = io.connect(`http://${me.vmsConfig.vmsRestIp}:${me.vmsConfig.vmsRestPort}/`,//me.restIp,
                             {
                                 path: '/api/event/receive',
                                 method: 'GET',
                                 query: {
                                    "auth-token" : me.inodepAuthToken,
                                    "api-serial" : me.inodepApiSerial,
                                    "event" : true,
                                    "system" : true
                                    //"monitoring" : "vurix"
                                 }
                            });
					console.log(socket);
					console.log("test io.connect end");
				
                    socket.on('message', function(message) {
                        //console.log(message);
						

						console.log("test message.cmd:"+message.cmd);
				
                        if("PTZ_TOURING_STATUS" == message.cmd) {
						

                            //CCTV이벤트 정보, kjw
                            me.fireCCTVEventInfo = {"dev_serial" :message.dev_serial, "preset_no" : message.preset_no};

											console.log("test me.isGlobalOpen:"+me.isGlobalOpen);
                            if(me.isGlobalOpen) {
                                var cctvNo = 0;

                                if(message.dev_serial == '100003') {
                                    cctvNo = 838;
                                } else if(message.dev_serial == '100001') {
                                    cctvNo = 843;
                                }
								
											console.log("test me.isGlobalId.length:"+me.isGlobalId.length);
                                for(var i=0; i < me.isGlobalId.length; i++) {
                                    if(me.isGlobalId[i] == cctvNo) {
											console.log("test me.isGlobalId[i]:"+me.isGlobalId[i]);
											//console.log("test cctvNo:"+cctvNo);
                                        setTimeout(function(){
											console.log("test setTimeout cctvNo:"+cctvNo);
											console.log("test setTimeout message.preset_no:"+message.preset_no);
											 me.getFreeSetInfo(cctvNo, me.isGlobalOpen, false, message.preset_no);

                                        }, 2000);
                                    }
                                }
								me.presetObj.presetNo = message.preset_no;
								me.presetObj.cctvNo = cctvNo;
                                console.log("프리셋 번호 : " + message.preset_no);
                                console.log(me.presetObj.presetNo);
                            }

						//me.inodepLogout();
						//me.inodepEvent();
						
                        } else if("DEVICE_EVENT" == message.cmd|| "DEV_MON_EVENT" == message.cmd) {
                        	//kjw 장비 이벤트 알람 호출

							//100001 : 2번카메라 투어링(열감지)  100002 : 2번카메라 연기 불꽃감지  100003 : 1번카메라 투어링(열감지) 100004 : 1번카메라 연기 불꽃 감지 yjh
							// 화재감시 카메라 해당 채널만 화재이벤트 yjh
							if(message.dev_serial == 100001 ||message.dev_serial == 100002 ||message.dev_serial == 100003 ||message.dev_serial == 100004){
								me.deviceEventAlarm(message, me.presetObj);
							}else{
								//열화상 카메라 이벤트를 만들어 넣는다. yjh 
								me.fireCameraEvent(message);
							}
							
                        }
                    });
                });
		},
		
		//열화상 카메라 이벤트 yjh 구체적기획이 없어 콘솔만 찍은상황, 현재는 프리셋 이벤트와 연결되어있어, 이후 토글 함수를 바꾸거나 별도의 소켓기능을 구현해야함.
		fireCameraEvent :function(message){

			console.log('발생 사업장 : '+ message.dev_name);
			console.log('최저온도 :' + message.evt.nv[0].evt[0].temp);
			console.log('최고온도 :' + message.evt.nv[0].evt[1].temp);
			console.log('평균온도 :' + message.evt.nv[0].evt[2].temp);
			console.log('온도조건 : ' + message.evt.nv[0].temp +'도 이상');
		},
		
		
		// 화재감지 이벤트 조건 및 api
        deviceEventAlarm : function(message, presetObj){
			//kjw
			let me = this;

			//이벤트 메세지
			var evtMessage = message;
			// 이벤트 카메라 정보
			var eventCCTVFacility = null;
			//알람 싸이렌 카운트
			var cnt = 0;
			//  
			//프리셋 위치 셋팅
			if(presetObj.cctvNo == 838){
				me.cctv = 1;
			}
			if(presetObj.cctvNo == 843){
				me.cctv = 2;
			}
			me.preSet = presetObj.presetNo
			
			//presetObj테스트
			console.log(presetObj.cctvNo);
			
			//이벤트 테스트 json
			if(evtMessage.cmd == null){
				evtMessage = {"cmd":"DEVICE_EVENT","msg":"[2021-07-14 14:35:08.456] 연기","company_code":0,"dch_ch":0,"dch_name":"Ch 01","dev_name":"02.TPV-C_1","dev_serial":100004,"event_sub_type":"smoke,fiery","evt":{"nv":[{"smoke":1}],"ov":null,"tm":"2021-07-14 14:35:08.456"},"grp_serial":1,"out_msg":"[2021-07-14 14:35:08.456] 연기","product_code":0,"type":"vca","vms_id":101910};
			}

			//이벤트 카메라정보 셋팅
			for(var i=0; i < me.fireCCTVFacility.length; i++) {
				var obj = me.fireCCTVFacility[i];
				if (obj.properties.mediaVurixUrl.indexOf(evtMessage.dev_serial) > -1){
					eventCCTVFacility = obj;
				}
			}

			console.log("이벤트발생시간: " + evtMessage.evt.tm + " , 이벤트발생타입: " + evtMessage.event_sub_type);
			//console.log("프리셋 번호 : " + me.fireCCTVEventInfo.preset_no);
			//프리셋 이동
			//http://172.16.1.24:8080/api/device/function/ptz/100004/0?cmd=32&preset_no=45

			//대쉬보드 오픈, db저장
			var sirenInterval = setInterval(function() {
	            cnt++;
	            me.onToggleSiren(true);
	            setTimeout(() => {
					if(me.dashboardManage.siren.isOpen == true){
						me.onToggleSiren(false);
					}
	            }, 700);

	            if(cnt == 5) {
	                clearInterval(sirenInterval);
	                me.onToggleAlarmDashBord(true);
	                //me.onToggleFireCCTV(true, eventCCTVFacility);
	                // cctv팝업창 닫기
					me.timerPopClose(eventCCTVFacility)


					//AlarmDashBord 값 적용
					if (evtMessage.event_sub_type.indexOf("smoke") > -1){
						me.smoke = "발생";
					}
					if (evtMessage.event_sub_type.indexOf("fire") > -1){
						me.fiery = "발생";
					}
					if (evtMessage.event_sub_type.indexOf("temperature") > -1){
						me.temperature = "발생";
					}

					//db 저장
					var eventData ={
						"dev_serial" : evtMessage.dev_serial,
						"tm" : evtMessage.evt.tm,
						"event_type" : evtMessage.event_sub_type,
					};

					axios.post(me.apideviceEvent, eventData, {
		    			headers: {
		    				'Content-Type': 'application/json'
		    			}
					})
					.then(res => {
						console.log("db insert 성공")
			        })
			        .catch(err => {
						console.log("db insert 실패")
			        });
	            }
	        }, 1000);
		},
		timerPopClose : function(eventCCTVFacility){
			//kjw
			let me = this;
			var facilityItems = me.facilityItems;
			for(var i in facilityItems) {
				var item = facilityItems[i];
				if(item.id === eventCCTVFacility.id) {
					if(item.isOpen){
						// 10후 창닫기
						setTimeout(me.onToggleFireCCTV, 600000, false, eventCCTVFacility);
						//setTimeout(me.onToggleAlarmDashBord, 30000, false);
					}
				}
			}
		},
		interValTraffic : function(){
			let me = this;
			me.interValTrafficVar = setInterval(function() {
				                    me.getTrafficTemp();
				                  }, 300000);
		},
		mapTest : function(){
			let me = this;


			var style = [
				new ol.style.Style({
			        stroke: new ol.style.Stroke({
			            color : 'rgba(255, 0, 0, 0)'
			        })
		    	})
		    ]

			me.nodeSource = new ol.source.Vector({
					            url: '/static/app/components/node33.json',
					            projection: 'EPSG:4326',
					            format: new ol.format.GeoJSON(),
							});

			me.linksource = new ol.source.Vector({
					            url: '/static/app/components/linknode.json',
					            projection: 'EPSG:4326',
					            format: new ol.format.GeoJSON(),

							});


			var node = new ol.layer.Vector({
	            source: me.nodeSource
	        });

			var link = new ol.layer.Vector({
	            source: me.linksource,
	            style : style
	        });

	        //this.mapArea.addLayer(node);
			this.mapArea.addLayer(link);
		},
		mapTest2: function(){
			let me = this;
			var color = ''

			me.linksource.getFeatures().forEach(function(feature) {
				let values = feature.getProperties()
				var geometry = feature.getGeometry();
				//var coords = geometry.getCoordinates();
				//var geometry = feature.getGeometry().clone().transform(this.mapArea.getView().getProjection(), 'EPSG:4326');
				//var linestrings = geometry.getLineStrings();

				if(values.LINK_ID == "1650385001" || values.LINK_ID == "1650384901" || values.LINK_ID == "1650400901"
					|| values.LINK_ID == "1650355401" || values.LINK_ID == "1650397501"  ){
					color = '#FF0000'
				}else{
					color = '#00FF00'
				}

				var style = [
					new ol.style.Style({
				        stroke: new ol.style.Stroke({
				            color: '#000000',
				            width: 5

				        })
			    	}),
			    	new ol.style.Style({
				        stroke: new ol.style.Stroke({
				            color: color,
				            width: 3
				        })
			    	}),
			    ]

				feature.setStyle(style);

			});
		},
		wizTest : function(){
			var eventData ={
				"lat" : "37.39293946742875",
				"lng" : "126.69657877736807"
			};

			axios.post("/api/wizWingPosSend", eventData, {
    			headers: {
    				'Content-Type': 'application/json'
    			}
			})
			.then(res => {
				console.log("db insert 성공")
	        })
	        .catch(err => {
				console.log("db insert 실패")
	        });
		},
		wizTest11 : function(){

			//let paramSend = {'UID': 4, 'SID': 'AIR_SENSOR', 'GCMD': 'SET', 'DATA':{"CMD":"RESET"}};
			let paramSend = {'UID': 1010, 'SID': 'AIR_CLEANER', 'GCMD': 'SET', 'DATA':{"CMD":"POWER","POWER":"OFF"}};
			var param = JSON.stringify(paramSend);

			axios.post("/api/test11", param, {
    			headers: {
    				'Content-Type': 'application/json'
    			}
			})
			.then(res => {
				console.log("db insert 성공")
	        })
	        .catch(err => {
				console.log("db insert 실패")
	        });
		},
		wizTest22 : function(){
			//let paramSend = {'UID': 1004, 'SID': 'AIR_CLEANER', 'GCMD': 'SET', 'DATA':{"CMD":"POWER","POWER":"OFF"},'IP':'223.171.71.137'};
			//let paramSend = {'UID': 1003, 'SID': 'AIR_CLEANER', 'GCMD': 'SET', 'DATA':{"CMD":"POWER","POWER":"ON"}};
			//let paramSend = {'UID': 4, 'SID': 'AIR_CLEANER', 'GCMD': 'SET', 'DATA':{"CMD":"MODE","MODE":"AUTO"}};
			//let paramSend = {'UID': 4, 'SID': 'AIR_CLEANER', 'GCMD': 'SET', 'DATA':{"CMD":"MODE","MODE":"MANUAL"}};
			//let paramSend = {'UID': 1004, 'SID': 'AIR_CLEANER', 'GCMD': 'SET', 'DATA':{"CMD":"ASTRENGTH","ASTRENGTH":1},'IP':'223.171.71.137'};
			let paramSend = {'UID': 1004, 'SID': 'AIR_SENSOR', 'GCMD': 'SET', 'DATA':{"CMD":"RESET"}};
			//let paramSend = {'UID': 1004, 'SID': 'AIR_SENSOR', 'GCMD': 'SET', 'DATA':{"CMD":"RESET"}};

			var param = JSON.stringify(paramSend);

			axios.post("/api/test11", param, {
    			headers: {
    				'Content-Type': 'application/json'
    			}
			})
			.then(res => {
				console.log("db insert 성공")
	        })
	        .catch(err => {
				console.log("db insert 실패")
	        });
		},
		
		//공기청정기 제어 yjh (현재는 일괄제어지만 추후에 개별제어바꿈 UID별로)
		airControl : function(power){
			
			let paramSend= {};
			
			if(power == 1){
						
				paramSend = {'UID': 1013, 'SID': 'AIR_CLEANER', 'GCMD': 'SET', 'DATA':{"CMD":"ASTRENGTH","ASTRENGTH":power}};
			}
			if(power == 2){
				
				paramSend = {'UID': 1013, 'SID': 'AIR_CLEANER', 'GCMD': 'SET', 'DATA':{"CMD":"ASTRENGTH","ASTRENGTH":power}};
			}
			if(power == 3){
				
				paramSend = {'UID': 1013, 'SID': 'AIR_CLEANER', 'GCMD': 'SET', 'DATA':{"CMD":"ASTRENGTH","ASTRENGTH":power}};
				
			}
				var param = JSON.stringify(paramSend);
	
				axios.post("/api/test11", param, {
	    			headers: {
	    				'Content-Type': 'application/json'
	    			}
				})
				.then(res => {
					console.log("db insert 성공")
		        })
		        .catch(err => {
					console.log("db insert 실패")
		        });
		},
		
		
		//토큰 DB저장
		loadTokens : function(param) {
			
           
				axios.get(this.apiVmsTokens,{
					params: {
						vmsId : param
					}
				})
				.then(res => {
					//db 토큰가져와서 세션 적용
					this.inodepApiSerial = res.data.inodepApiSerial
					this.inodepAuthToken = res.data.inodepAuthToken
					console.log('이전 토큰을 불러옴');
					
		        })
		        .catch(err => {
					console.log('토큰 불러오기 실패');
		        });
			
		},
		
		//토큰 DB저장
		updateTokens : function() {
			this.vmsTokens.inodepAuthToken = this.inodepAuthToken;
			this.vmsTokens.inodepApiSerial = this.inodepApiSerial;
			this.vmsTokens.vmsId = this.vmsConfig.vmsUser;
           
				axios.post(this.apiVmsTokens, JSON.stringify(this.vmsTokens),this.config)
				.then(res => {
					
					console.log('새로운 토큰을 갱신(저장)함.');

		        })
		        .catch(err => {
					console.log('토큰 저장 실패');
		        });
			
		},
		
		//오른쪽 상단 석삼자버튼 토글 제이쿼리 yjh
		controlBtn : function(){
			
			$('.quick-menu').find('.control > .btn').on('click', function(){
				$('.quick-menu').find('.link > li > a').removeClass('on');
				$(this).toggleClass('on');
			});
			$('.quick-menu').find('.control > ul > li > a').on('click', function(){
				if($(this).hasClass('on')){
					$(this).removeClass('on');
				}else {
					$('.quick-menu').find('.control > ul > li > a').removeClass('on');
					$(this).addClass('on');
				}
			});
			$('.quick-menu').find('.link > li > a').on('click', function(){
				$('.quick-menu').find('.control > .btn').removeClass('on');
				if($(this).hasClass('on')){
					$(this).removeClass('on')
				} else {
					$('.quick-menu').find('.link > li > a').removeClass('on');
					$(this).addClass('on')
				}
			});
			$('.quick-menu').find('.link > li > ul > li > a').on('click', function(){
				var lyID = $(this).data('target');
				if($(this).hasClass('on')){
					$(lyID).removeClass('on');
					$(this).removeClass('on');
				} else {
					$(lyID).addClass('on')
					$(this).addClass('on');
				}
			});

		},
		

	},


	created: function () {
		this.getFacilityCategoryList();

		//this.getPollutionStandard(); handark333 임시 주석
		this.$store.dispatch('basic/FETCH_VMSCONFIG');

	},
	mounted: function () {
		var me = this;
//		source = new ol.source.OSM({
//			url: eval('this.'+evt.target.value)
//		});
//		source = new ol.source.XYZ({
//            url: eval('this.'+evt.target.value)
//        });
		
		me.controlBtn();
		
		$('.event-wrap').find('.btn-toggle').on('click', function(){
			$('.event-wrap').toggleClass('on');
		});	
		$('.event-wrap').find('.table-wrap button').on('click', function(){
			$('.ly-alert').addClass('on');
		});
		$('.ly-alert').find('.btn-closed').on('click', function(){
			$('.ly-alert').removeClass('on');
		});
		
		//기본 맵 설정	
		me.mapArea = new ol.Map({
			target: 'basemapArea',
			layers: [
				new ol.layer.Tile({
					source: new ol.source.XYZ({
						url: eval('this.baseMap2')
			        })
				}),
			],
			view: new ol.View({
				center: ol.proj.transform(me.mapCenterLatLong, 'EPSG:4326', 'EPSG:900913'),
				zoom: me.currentZoom,
		        minZoom: 1,
		        maxZoom: 20,

			}),
			controls: ol.control.defaults({
				attribution: false,
				zoom: false
			}).extend([
			    new ol.control.ScaleLine()
			])
		});
		//화재 이벤트 today리스트 
		me.getTodayDashboardEvents();
		//시설물 리스트 마운트
		me.getFacilityList();
		//남동공단 경계선 마운트
        me.getMapFreeSet();
		//me.getTrafficTemp();
        //me.getFreeSetInfo();
		//me.getNotificationList();

		//6종센서 리스트 마운트
		me.getAirSensorStationList();
		
		//클릭시 나오는 함수
		this.mapArea.on('click', this.onClick);
		this.mapArea.on('pointermove', this.onMouseMove);
		this.mapArea.on("moveend", function() {
			var nextZoom = me.mapArea.getView().getZoom();
			if(nextZoom !== me.currentZoom) {
				var changedZoom = nextZoom - me.currentZoom;
				me.currentZoom = nextZoom;

				me.symbolVectorSource.getFeatures().forEach(function(feature) {
					var image = feature.getStyle().getImage();
					var currentScale = image.getScale();
					var nextScale = currentScale + changedZoom / 4;
					image.setScale(nextScale);
					feature.changed();

					me.currentScale = nextScale;
				});
			}
		});

		//me.openFireAlert(1); // test

		let socket = new SockJS('/wamp');
		me.stompClient = Stomp.over(socket);
		me.stompClient.debug = () => {};
		me.stompClient.connect({}, this.onConnected, this.onError);

		me.initLayout();
		//me.onUpdateFireCCTVUI();
		me.onUpdateAirSensorUI();
		me.onUpdateAirSensorControlUI();
		//me.onUpdateAlarmUI(); handark333 임시 주석

		//me.onUpdateAirSensorStationUI(); handark333 임시 주석
		//me.onUpdateAirSensorStationPredictUI(); handark333 임시 주석
		//me.onUpdateDroneStationUI();
//		me.onUpdateNotificationUI();
		me.onUpdateWallFreeSetUI();
        me.onUpdateSirenUI();
//		window.addEventListener('resize', function () {
//			console.log("resize");
//		});

		var mapButtonsOverlay = new ol.Overlay({
    		element: me.$refs.mapButtons,
    		positioning: "top-center",
    		position: ol.proj.transform([37, 127], 'EPSG:4326', 'EPSG:900913')
    	});
		this.mapArea.addOverlay(mapButtonsOverlay);

		//kjw test
		//me.mapTest();
		
		//이전에 쓰던 스트리밍 소켓 찾는중.
		//me.wsTest();
		
		me.onDronStation();

		//me.drawReset();
		//me.inodepEvent();

        /*let traffic = setInterval(function() {
                        me.getTrafficTemp();
                      }, 4000);*/

		//setTimeout(() => { handark333 임시 주석
		//	me.setUserLayout(); handark333 임시 주석

			/*$(".mainFireCCTVWindow").on('click', '*', () => {
				var _this = this;
				var id = _this.data("id");
				console.log(id);
				if(_this.css("z-index") != me.zIndex && !me.isFullFireCCTV) {
					me.zIndex++;
					_this.css("z-index", me.zIndex);
					me.dashboardLayout.fireCCTV.zIndex = me.zIndex;
					me.updateLayout();
				}
			});*/

			/*$("#mainAirSensorWindow").on('click', '*', () => {
				if($("#mainAirSensorWindow").css("z-index") != me.zIndex && !me.isFullAirSensor) {
					me.zIndex++;
					$("#mainAirSensorWindow").css("z-index", me.zIndex);
					me.dashboardLayout.airSensor.zIndex = me.zIndex;
					me.updateLayout();
				}
			});

			$("#mainAirSensorStationWindow").on('click', '*', () => {
				if($("#mainAirSensorStationWindow").css("z-index") != me.zIndex && !me.isFullAirSensorStation) {
					me.zIndex++;
					$("#mainAirSensorStationWindow").css("z-index", me.zIndex);
					me.dashboardLayout.airSensorStation.zIndex = me.zIndex;
					me.updateLayout();
				}
			});*/

			//$("#mainAirSensorStationPredictWindow").on('click', '*', () => { handark333 임시 주석
			//	if($("#mainAirSensorStationPredictWindow").css("z-index") != me.zIndex && !me.isFullAirSensorStationPredict) { handark333 임시 주석
			//		me.zIndex++; handark333 임시 주석
			//		$("#mainAirSensorStationPredictWindow").css("z-index", me.zIndex); handark333 임시 주석
			//		me.dashboardLayout.airSensorStationPredict.zIndex = me.zIndex; handark333 임시 주석
			//		me.updateLayout(); handark333 임시 주석
			//	} handark333 임시 주석
			//}); handark333 임시 주석

//			$("#mainNotificationWindow").on('click', '*', () => {
//				if($("#mainNotificationWindow").css("z-index") != me.zIndex && !me.isFullNotification) {
//					me.zIndex++;
//					$("#mainNotificationWindow").css("z-index", me.zIndex);
//					me.dashboardLayout.notification.zIndex = me.zIndex;
//					me.updateLayout();
//				}
//			});

			/*$("#mainDefaultWindow").on('click', '*', () => {
				if($("#mainDefaultWindow").css("z-index") != me.zIndex && !me.isFullDefault) {
					me.zIndex++;
					$("#mainDefaultWindow").css("z-index", me.zIndex);
					me.dashboardLayout.default.zIndex = me.zIndex;
					me.updateLayout();
				}
			});*/

			/*$("#mainFireCCTVWindow").on('resize', () => {
				me.dashboardLayout.fireCCTV.width = $("#mainFireCCTVWindow").outerWidth() + "px";
				me.dashboardLayout.fireCCTV.height = $("#mainFireCCTVWindow").outerHeight() + "px";
				if(!me.isFullFireCCTV) {
					me.updateLayout();
				}
			});*/

			/*$("#mainAirSensorWindow").on('resize', () => {
				me.dashboardLayout.airSensor.width = $("#mainAirSensorWindow").outerWidth() + "px";
				me.dashboardLayout.airSensor.height = $("#mainAirSensorWindow").outerHeight() + "px";
				if(!me.isFullAirSensor) {
					me.updateLayout();
				}
			});*/

			//$("#mainAirSensorStationWindow").on('resize', () => { handark333 임시 주석
			//	me.dashboardLayout.airSensorStation.width = $("#mainAirSensorStationWindow").outerWidth() + "px"; handark333 임시 주석
			//	me.dashboardLayout.airSensorStation.height = $("#mainAirSensorStationWindow").outerHeight() + "px"; handark333 임시 주석
			//	if(!me.isFullAirSensorStation) { handark333 임시 주석
			//		me.updateLayout(); handark333 임시 주석
			//	} handark333 임시 주석
			//}); handark333 임시 주석

			//$("#mainAirSensorStationPredictWindow").on('resize', () => { handark333 임시 주석
			//	me.dashboardLayout.airSensorStationPredict.width = $("#mainAirSensorStationPredictWindow").outerWidth() + "px"; handark333 임시 주석
			//	me.dashboardLayout.airSensorStationPredict.height = $("#mainAirSensorStationPredictWindow").outerHeight() + "px"; handark333 임시 주석
			//	if(!me.isFullAirSensorStationPredict) { handark333 임시 주석
			//		me.updateLayout(); handark333 임시 주석
			//	} handark333 임시 주석
			//}); handark333 임시 주석

//			$("#mainNotificationWindow").on('resize', () => {
//				me.dashboardLayout.notification.width = $("#mainNotificationWindow").outerWidth() + "px";
//				me.dashboardLayout.notification.height = $("#mainNotificationWindow").outerHeight() + "px";
//				if(!me.isFullTrafficInformation) {
//					me.updateLayout();
//				}
//			});

			/*$("#mainDefaultWindow").on('resize', () => {
				me.dashboardLayout.default.width = $("#mainDefaultWindow").outerWidth() + "px";
				me.dashboardLayout.default.height = $("#mainDefaultWindow").outerHeight() + "px";
				if(!me.isFullDefault) {
					me.updateLayout();
				}
			});*/

			/*if($("#mainFireCCTVWindow").css("z-index") > me.zIndex) {
				me.zIndex = $("#mainFireCCTVWindow").css("z-index");
			}*/

			/*if($("#mainAirSensorWindow").css("z-index") > me.zIndex) {
				me.zIndex = $("#mainAirSensorWindow").css("z-index");
			}

			if($("#mainAirSensorStationWindow").css("z-index") > me.zIndex) {
				me.zIndex = $("#mainAirSensorStationWindow").css("z-index");
			}*/

//			if($("#mainNotificationWindow").css("z-index") > me.zIndex) {
//				me.zIndex = $("#mainNotificationWindow").css("z-index");
//			}

			/*if($("#mainDefaultWindow").css("z-index") > me.zIndex) {
				me.zIndex = $("#mainDefaultWindow").css("z-index");
			}*/

//			if($("#mainNotificationWindow").css("left") != null) {
//				$("#mainNotificationWindow").css("left", $("#mainNotificationWindow").css("left"));
//				$("#mainNotificationWindow").css("right", '');
//				if(me.dashboardLayout.notification.left == null) {
//					me.dashboardLayout.notification.left = $("#mainNotificationWindow").css("left");
//				}
//			}

		//}, 500); handark333 임시 주석
	},
	updated: function () {
		var me = this;

		//console.log("basemap.js updated 1..." + me.myInfo);
		//console.log("basemap.js updated 2..." + JSON.stringify(me.myInfo));
		//console.log("basemap.js updated 3..." + JSON.stringify(me.linkUrl));
	},
	beforeDestroy: function() {
		this.onDisconnected();
	},
});