export default {
	frontend: {
		mobile: {
			title: '<스마트 산업단지>',
		},
		menu: {
			facility_management				: '시설물 관리',
			facility_category_management	: '시설물 종류 관리',
			workplace_management			: '사업장 관리',
			flight_management				: '드론 관제',
			media_management				: '영상 관리',
			air_sensor_workplace			: '사업장 대기정보',
			user_management					: '계정 관리',
			dashboard_management			: '대쉬보드 창관리',
			management						: '관리',

			submenu: {
				facility_management			: '시설물 관리',			
				facility_category_management: '시설물 종류 관리',
				
				flightplan_management       : '비행 계획 관리',
				flightsched_management      : '비행 일정 관리',
				prohibitedArea_management	: '비행 금지 구역',
				
				media_management_vms		: '영상 관제',
				media_management_noti_his	: '알림 이력',	
									
				airquality_workplace		: '사업장 대기정보',
				airquality_workplace_history: '사업장 대기정보 이력',
				airquality_station			: '관측소 대기정보',
				
				user_management_myinfo		: '내 정보',
				user_management_password	: '비밀번호 변경',				
				user_management_reg			: '계정 등록',
				
				dashboard_firecctv_open		: '열화상카메라 열기',
				dashboard_firecctv_close	: '열화상카메라 닫기',
				dashboard_airsensor_open	: '사업장 대기정보 열기',
				dashboard_airsensor_close	: '사업장 대기정보 닫기',
				dashboard_airsensorstation_open		: '관측소 대기예측 열기',
				dashboard_airsensorstation_close	: '관측소 대기예측 닫기',
				dashboard_dronestation_open	: '드론이동기지 열기',
				dashboard_dronestation_close: '드론이동기지 닫기',
				dashboard_notification_open	: '알림창 열기',
				dashboard_notification_close: '알림창 닫기',
				dashboard_management_init	: '대쉬보드 초기화',
			}
		},
		dashboard: {
			fireCCTV: {
				title: '화재감시카메라',
			},
			airSensor: {
				title: '사업장 안전정보',
				
				co: "이산화탄소",
				no2: "이산화질소",
				o3: "오존",
				so2: "아황산가스",
				pm10: "미세먼지",
				pm25: "초미세먼지",
				pm1: "극초미세먼지",
				co2: "이산화탄소",
				tvoc: "총휘발성유기화합물",
				tvocBr: "총휘발성<br>유기화합물",
				temp: "온도",
				humi: "습도",	
				filter: "공기청정기<br>필터",
				motor: "공기청정기<br>모터",
				furifier_power: "공기청정기<br>전원",
				measuring_instrument: "실내형측정기<br>센서",
				create_date: "수신시간",
			},
			airSensorControl: {
				title: '공기청정기 제어',
				
				air_sensor_control: "공기청정기",
				air_auto_control_state: "사업장 자동운행",
				air_center_auto_control_state: "센터 자동제어",
				air_power: "전원",
				air_motor_intensity: "강도",
				air_power_control: "메인 전원 제어",
				air_motor_control: "모터 강도 제어",
				auto_control_on_content: "공기청정기 센터제어를 자동으로 변경하시겠습니까?",
				auto_control_off_content: "공기청정기 센터제어를 수동으로 변경하시겠습니까?",
				motor_power_on_content: "공기청정기 전원을 켜시겠습니까?",
				motor_power_off_content: "공기청정기 전원을 끄시겠습니까?",
				motor_level_change_content: "공기청정기 모터 강도를 변경하시겠습니까?",
				workplace_auto_mode_on_content: "공기청정기 사업장 운행을 자동으로 변경하시겠습니까?",
				workplace_auto_mode_off_content: "공기청정기 사업장 운행을 수동으로 변경하시겠습니까?",
				
				changed: "공기청정기 가동을 요청하였습니다.", // "상태변경에 성공하였습니다."
				alert_auto_control_on: "사업장/센터 자동제어가 모두 수동인 상태에서만 수동제어를 할 수 있습니다.",
				alert_center_auto_control_on: "센터 자동제어를 먼저 해제해 주시기 바랍니다.",
				alert_workplace_auto_control_on: "사업장 자동운행을 먼저 해제해 주시기 바랍니다.",
				alert_power_off: "공기청정기 전원이 꺼져 있습니다.",
			},
			airSensorStation: {
				title: '관측소 대기정보',
				
				co: "일산화탄소",
				no2: "이산화질소",
				o3: "오존",				
				so2: "아황산가스",
				pm10: "미세먼지",
				pm25: "초미세먼지",
				create_date: "수신시간",
				station_logs_fail: '현재 관측소 대기정보 수신이 원활하지 않습니다.',
			},
			airSensorStationPredict: {
				title: '관측소 대기예측',
				
				co: "일산화탄소",
				no2: "이산화질소",
				o3: "오존",				
				so2: "아황산가스",
				pm10: "미세먼지",
				pm25: "초미세먼지",
				create_date: "수신시간",
			},
			droneStation: {
				title: '드론 이동기지',
			},
			notification: {
				title: '알림',
			},
			alarm: {
				title: '경고',
				standard: '환경기준',
				aircleaner_on: '공기청정기 가동 중...',
				air_cleaned: '공기청정이 완료되었습니다.',
				manual_control: '수동제어',
				auto_control: '자동제어',
				noti_message: '사업장 대기알림',
			},
			'wallFreeSet': {
				title: "Wall Controller",
                content: "Wall Controller를 변경하시겠습니까?",
			},
            'siren': {
                title: "화재 경보"
            },
            'alarmDashBord': {
                title: "알림"
            }
		},
		// 메인화면 장비선택시 팝업
		popup2: {
			fireCCTV: {
				group_facility: "시설물 정보",
				group_vms: "VMS 정보",
				
				facil_name: "시설물명",
				facil_id: "시설물 ID",
				facil_mobius_id: "Mobius ID",
				facil_latitude: "위도",
				facil_longitude: "경도",

				vms_ip: "미디어 IP",
				vms_port: "미디어 포트",
				vms_chanel: "미디어 채널",
				vms_rtsp: "RTSP",
				vms_id: "계정",
				vms_passwd: "패스워드",				
			},
			airSensor: {
				item: "항목",
				grade: "등급",
				val: "측정값",
			},
			facil_cate_name: "시설물 종류",
			facil_addr: "시설물 주소",
			workplace_name: "사업장명",
			workplace_addr: "사업장 주소",
			facil_lat_lng: "위치(위도/경도)",
			facil_ip: "IP주소",
			parking_space: "수용가능 주차공간"
		},		
		user: {
			user_list:	'사용자 리스트',
			roles:		'권한 보기', 		
			label: {
				name			: '이름',
				username		: '아이디',
				password		: '비밀번호',
				check_password	: '비밀번호 확인',
				current_password: '현재 비밀번호',
				change_password	: '비밀번호 변경',
				email			: '이메일',
				mobile			: '휴대폰',
				role			: '역할',
				number			: '번호',
				operation		: 'Op.',
			},
			button: {
				register	: '계정 등록',
				edit		: '업데이트',				
			},
			confirm: {
				delete: '[ {0} ] 사용자 계정을 삭제하시겠습니까?'
			},			
			message: {
				not_match 	: '비밀번호가 일치하지 않습니다.',
				duplicate	: '이미 등록된 아이디입니다.',
				role		: '사용자의 역할을 선택해주세요.',
				registered	: '사용자가 등록되었습니다.',
				updated		: '정보가 업데이트 되었습니다.',
				deleted		: '사용자 정보가 삭제되었습니다',
			}
		},
	},
	font: {
		Gulim: '굴림',
		Dotum: '돋움',
		Batang: '바탕'
	},
	label: {
		menu: '메뉴',
		required: '필수 항목',
		optional: '선택 항목',
		enabled: '활성',
		disabled: '비활성',
		error: '에러',
		info: '정보',
		new_facility: 'New',
		variable_id: '변수선언',
		variable_type: '변수타입',
		variable_value: '값',
		variable_label: '변수이름',
		all: '전체',
		power_on: '전원 켜짐',
		power_off: '전원 꺼짐',
		door_open: '열림',
		door_close: '닫힘',
		manual: '수동',
		auto: '자동',
		off: '꺼짐',
		on: '켜짐',
		del: '삭제',
		muuido: '무의도',
		permanent: '무한',
		none: '없음',
		system: '시스템',
		reset: '리셋',
		config: '설정',
		sec: '초',
		required_acronym: '필수',
		unknown: '알 수 없음',
		cars: '대',
		current: '현재',
		searchDate: '검색일',
		lang: 'ko',
		classification: '분류',
		byHour: '시간대',
		item: '항목',
		average: '평균',
		max: '최대값',
		min: '최소값',
		date: '날짜',
		note: '비고',
		power_low: "약",
		power_middle: "중",
		power_high: "강",
		normal: "정상",
		filter_error: "교체 필요",
		show_all: "전체보기",
		no_data: "데이터가 없습니다."
	},
	page: {
		headerFormat: '페이지 {currentPage:n0} / {pageCount:n0}'
	},
	map: {
		base: '기본지도',
		base2: '2D지도',
		satellite: '위성지도',
		hybrid: '구글지도'
	},
	button: {
		ok: '확인',
		cancel: '취소',
		logout: '로그아웃',
		save: '저장',
		accept: '적용',
		update: '수정',
		search: '검색',
		add: '등록',
		del: '삭제'
	},
	message: {
		error: '정상적으로 처리하지 못했습니다.',
		error_invalid: '잘못된 요청입니다.',
		error_password_mismatch: '패스워드가 일치하지 않습니다.',
		success: '정상적으로 처리하였습니다.',
		buffering: '버퍼링중...',
		connecting: '연결중...',
		connection_error: '연결 오류가 발생하였습니다.',
		decode_error: '미디어 디코딩 오류가 발생하였습니다.',
		buffer_error: '수신 데이타 오류가 발생하였습니다.'
	},
	notification: {
		notification_title: "알림 이력",
		notification_history: "알림 수신 이력",
		
		label: {
			success: '알림',
			info: '정보',
			warning: '경고',
			danger: '위험'
		},
		message: {
			inwardTrafficOver100: '입도차량이 30분간 100대를 초과하였습니다.',
			outwardTrafficOver100: '출도차량이 30분간 100대를 초과하였습니다.',
			inwardTrafficDelay: '연도교 진입 방향으로 지체되고 있습니다.',
			outwardTrafficDelay: '연도교 진출 방향으로 지체되고 있습니다.',
			inwardTrafficCongestion: '연도교 진입 방향으로 지체되고 있습니다.',
			outwardTrafficCongestion: '연도교 진출 방향으로 지체되고 있습니다.',
			morethan100thanout: '금일 입도차량 잔존 차량은 {0}대 입니다.',
			morethan100thanin: '금일 출도차량 초과 차량은 {0}대 입니다.',
			inwardTrafficDown: '입도차량이 줄고 있습니다.',
			outwardTrafficDown: '출도차량이 줄고 있습니다.',
			inwardEvery100th: '{0}번째 차량이 입도했습니다.',
			outwardEvery100th: '{0}번째 차량이 출도했습니다.',
			solarWindDanger: '교량내 {0} m/s 강풍이 불고 있습니다.'
		},
		history: {
			tab_history: {
				title: "알림 수신 이력",
				search_range: "검색범위",
				search_conditions: "검색조건",
				btn_search: "검색",
				
				seq: "알림번호",
				level: "등급",
				info: "메세지",
				facil_category: "종류",
				facil_name: "시설물명",
				facil_id: "시설물 ID",
				recv_date: "수신시간",
				
			},
		},
		sidebar: {
			count_title: "알림 통계",
			notification_title: "실시간 알림"
		}
	},
	myinfo: {
		confirm: {
			content: "입력하신 내용으로 수정하시겠습니까?",
			title: "사용자 정보 변경"			
		}
	},
	user: {
		my_account_title: "내 정보 관리",
		my_account: "나의 정보",
		change_password: "비밀번호 변경",
		
		account_management_title: "계정 관리",
		account_registry: "계정 등록",
		
		grid: {
			header: {
				username: '아이디',
				name: '이름',
				role: '권한',
				email: 'E-mail',
				mobile: '모바일',
				phone: '전화번호',
				fax: 'FAX',
				organization: '조직',
				department: '부서',
				enabled: '사용여부'
			}
		},
		button: {
			create: '사용자 등록'
		},
		popup: {
			title: {
				create: '사용자 등록',
				edit: '사용자 수정',
				username: '6자 이상 입력하세요.',
				name: '2자 이상 입력하세요.',
				role: '권한을 선택하세요.',
				password: '8자 이상 입력하세요.',
				mismatch: '비밀번호가 일치하지 않습니다.',
				myinfo: '내 정보 수정'
			},
			label: {
				username: '아이디',
				name: '이름',
				password: '비밀번호',
				confirm_password: '비밀번호 확인',
				role: '권한',
				email: 'E-mail',
				mobile: '모바일',
				phone: '전화번호',
				fax: 'FAX',
				organization: '조직',
				department: '부서',
				enabled: '사용여부',
				myinfoPassword: '패스워드를 입력해주세요.'
			}
		},
		confirm: {
			update: {
				content: "입력하신 내용으로 수정하시겠습니까?",
				title: "사용자 정보 변경"
			},
			insert: {
				content: "입력하신 내용으로 등록하시겠습니까?",
				title: "사용자 등록"
			},
			delete: {
				content: "선택하신 사용자를 정말 삭제하시겠습니까?",
				title: "사용자 삭제"
			}
		}
	},
	facility: {
		facility_title: "시설물 관리",
		facility_category_title: "시설물 종류 관리",
		facility_workplace : "사업장 관리",
		facility_workplace_list : "사업장 목록",
		facility_list: "시설물 목록",
		facility_category: "시설물 종류",
		
		label: {
			category: {
				legend: '시설물종류',
				symbol: '심볼',
				code: '코드',
				name: '시설물종류명',
				ruleset: '룰셋적용',
				enable: '사용',
				creator: '등록자',
				createDate: '등록일',
				updater: '수정자',
				updateDate: '수정일'
			},
			symbol: {
				basiclegend: '기본 심볼',
				customlegend: '관리자 등록 심볼',
				basic_legend_info: "개발 시 기본으로 등록한 심볼입니다.",
				custom_legend_info: "관리자가 수동으로 등록한 심볼입니다.",
				upload: '업로드',
				select: '파일 선택'
			},
			facility: {
				fcode : '시설코드',
				name: '시설물명',
				category: '종류',
				mobius: '모비우스 ID',
				longitude: '경도',
				latitude: '위도',
				status: '상태',
				enable: '사용',
				creator: '등록자',
				createDate: '등록일',
				updater: '수정자',
				updateDate: '수정일',
				purifierPower: "공기청정기 전원",
				purifierMotorPower: "공기청정기 모터세기",
				filter: "공기청정기 필터 상태",
				motor: "공기청정기 모터 상태",
				addr: "주소",
				nearby_weather_station: "주변 관측소"
			},
			workplace: {
				id : '사업장번호',
				name: '사업장명',
				addr: '사업장 주소',
				tel: '사업장 전화번호',
				gateway: '게이트웨이IP',
				createDate: '등록일',
				creator: '등록자',
				updater: '수정자',
				updateDate: '수정일',
				sys01: '시스템1',
				sys02: '시스템2',
				sys03: '시스템3',
				havingFacility: '설치장비',
				filter:{
					title :'필터검색',
					as : '6종센서',
					ac : '공기청정기',
					fs : 'IOT전기감지',
					gs : '유해물질유출감지',
					sys01 : '시스템1',
					sys02 : '시스템2',
					sys03 : '시스템3'
				},
				facility:{
					as : '대기정보센서',
					ac : '공기청정기',
					fs : 'IOT전기감지',
					gs : '유해물질유출감지',
				}
			}
		},
		popup: {
			symbol: {
				title: '심볼 등록',
				delete_title: '심볼 삭제',
				delete_content: '선택하신 심볼을 정말 삭제하시겠습니까?'
			},
			category: {
				title: '시설물종류 등록',
				edit_title: '시설물종류 수정',
				del_title: '시설물종류 삭제',
				delete_content: '선택하신 시설물종류를 정말 삭제하시겠습니까?',
				legend: '기본 정보',
				option: '추가 정보',
				symbol: '심볼 정보',
				name_required: '2자 이상 입력하세요.',
				code_required: '2자 이상 입력하세요.',
				symbol_required: '심볼을 선택해주세요.'
			},
			facility: {
				title: '시설물 등록',
				edit_title: '시설물 수정',
				del_title: '시설물 삭제',
				delete_content: '선택하신 시설물을 정말 삭제하시겠습니까?',
				legend: '기본 정보',
				option: '추가 정보',
				name_required: '2자 이상 입력하세요.',
				lonlat_required: '위도, 경도 정보를 입력하세요.',
				vms_checked: 'VMS 정보를 확인해주세요.'
			},
			workplace: {
				title: '사업장 등록',
				edit_title: '사업장 수정',
				del_title: '사업장 삭제',
				delete_content: '선택하신 사업장을 정말 삭제하시겠습니까?',
				legend: '기본 정보',
				option: '추가 정보'
			}
			
		},
		button: {
			symbol: {
				register: '심볼 등록'
			},
			category: {
				create: '시설물종류 등록'
			},
			facility: {
				create: '시설물 등록'
			}
		}
	},
	media: {
		label: {
			register: '컨텐츠 등록',
			media_type: '미디어 타입',
			media_name: '미디어 이름',
			creator: '등록자',
			createDate: '등록일',
			updater: '수정자',
			updateDate: '수정일'
		},
		popup: {
			register_title: '미디어 컨텐츠 등록',
			edit_title: '미디어 컨텐츠 수정',
			del_title: '미디어 컨텐츠 삭제',
			upload: '미디어',
			select: '파일 선택',
			name_required: '2자 이상 입력하세요.',
			mismatch_media_type: '선택하신 미디어타입과 파일이 일치하지 않습니다.',
			mismatch_media_type_update: '선택하신 미디어타입과 기존 파일이 일치하지 않습니다.',
			file_required: '파일이 선택되지 않았습니다.',
			delete_content: '선택하신 컨텐츠를 정말 삭제하시겠습니까?'
		}
	},
	airSensor: {
		grade_1: "좋음",
		grade_2: "보통",
		grade_3: "나쁨",
		grade_4: "매우나쁨",
				
		workplace: {
			title: "사업장 대기정보",
			
			common: {
				seq: "이력번호",
				facil_id: "시설물 ID",
				facil_name: "사업장명",				
				air_status: "대기상태",
				air_grade: "대기등급",				
				co: "일산화탄소",				
				no2: "이산화질소",				
				o3: "오존",				
				so2: "아황산가스",
				pm10: "미세먼지",
				pm25: "초미세먼지",
				pm1: "극초미세먼지",
				co2: "일산화탄소",
				tvoc: "총휘발성유기화합물",
				temp: "온도",
				humi: "습도",	
				facil_status: "시설상태",
				date: "수신시간",				
				altitude: '고도',
				latitude: '위도',
				longitude: '경도',
				
				station_id: "관측소 ID",
				station_name: "관측소명",
				observ_date: "관측일자",	
			},
			tab_status: {
				title: "사업장 대기정보",
				btn_refresh: "새로고침",
			},
			tab_history: {
				title: "사업장 대기정보 이력",
				search_range: "검색범위",
				btn_search: "검색",
			},			
		},
		station: {
			tab_status: {
				title: "관측소 대기정보",
				btn_refresh: "새로고침",
			},
			tab_history: {
				title: "관측소 대기정보 이력",
				search_range: "검색범위",
				btn_search: "검색",
			},		
		},
		history: {
			title: "사업장 대기정보 이력"
		}
	},
}
