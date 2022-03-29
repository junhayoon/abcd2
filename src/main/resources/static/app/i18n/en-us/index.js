export default {
	frontend: {
		mobile: {
			title: '<Smart Industrial Complex>',
		},
		menu: {
			facility_management				: 'Facility Management',
			facility_category_management	: 'Facility Category Management',
			flight_management				: 'Flight Management',
			media_management				: 'Media Management',
			air_sensor_workplace			: 'Air Quality Management',
			user_management					: 'Account Management',
			dashboard_management			: 'Dashboard Management',
			management						: 'Management',
			submenu: {
				facility_management			: 'Facility Management',			
				facility_category_management: 'Category Management',
				
				flightplan_management       : 'FlightPlan Management',
				flightsched_management      : 'FlightSchedule Management',
				prohibitedArea_management	: 'ProhibitedArea Management',
				
				media_management_vms		: 'Media Management',
				media_management_noti_his	: 'Notification History',	
									
				airquality_workplace		: 'Air Quality in Workplace',
				airquality_workplace_history: 'Air Quality in Workplace History',
				airquality_station			: 'Air Quality Monitoring Stations',
				
				user_management_myinfo		: 'My Account',
				user_management_password	: 'Change Password',
				user_management_reg			: 'Register Account',
				
				dashboard_firecctv_open		: 'Open Fire CCTV',
				dashboard_firecctv_close	: 'Close Fire CCTV',
				dashboard_airsensor_open	: 'Open Air Quality',
				dashboard_airsensor_close	: 'Close Air Quality',
				dashboard_airsensorstation_open		: 'Open Monitoring Stations',
				dashboard_airsensorstation_close	: 'Close Monitoring Stations',
				dashboard_dronestation_open	: 'Open Drone Station',
				dashboard_dronestation_close: 'Close Drone Station',
				dashboard_notification_open	: 'Open Notification',
				dashboard_notification_close: 'Close Notification',
				dashboard_management_init	: 'Initialize dashboard',
			}
		},
		dashboard: {
			fireCCTV: {
				title: 'Fire CCTV Monitoring',
			},
			airSensor: {
				title: 'Air Quality in Workplace',
				
				co: "Carbon Monoxide",
				no2: "Nitrogen Dioxide",
				o3: "Ozone",				
				so2: "Sulfurous Acid Gas",
				pm10: "Fine Dust",
				pm25: "Ultrafine Dust",
				pm1: "Ultrafine Particulate Matter",
				co2: "Carbon Dioxide",
				tvoc: "TOTAL Volatile Organic Compounds",
				tvocBr: "TOTAL Volatile Organic Compounds",
				temp: "Temperature",
				humi: "Humidity",
				filter: "Filter",
				motor: "Motor",
				furifier_power: "Furifier Power",
				furifier_motor_power: "Furifier Motor Power",
				measuring_instrument: "Measuring Instrument Sensor",
				create_date: "Received Time",
			},
			airSensorControl: {
				title: 'Air Cleaner Controller',
				
				air_auto_control_state: "Air Cleaner Auto Control",
				air_power_control: "Air Cleaner Power Control",
				air_motor_control: "Air Cleaner Motor Control",
				auto_control_on_content: "Are you sure you want to change air cleaner to be operated automatically?",
				auto_control_off_content: "Are you sure you want to change air cleaner to be operated manually?",
				motor_power_on_content: "Are you sure you want air cleaner to be turned on?",
				motor_power_off_content: "Are you sure you want air cleaner to be turned off?",
				motor_level_change_content: "Are you sure you want to change intensity of air cleaner Motor?",
				
				changed: "changed successfully.",
				alert_auto_control_on: "You can only control manually on manual mode",
				alert_power_off: "power of air cleaner is off",
			},
			airSensorStation: {
				title: 'Air Quality Prediction',
				
				co: "Carbon Monoxide",
				no2: "Nitrogen Dioxide",
				o3: "Ozone",				
				so2: "Sulfurous Acid Gas",
				pm10: "Coarse Particulate Matter",
				pm25: "Fine Particulate Matter",
				pm1: "Ultrafine Particulate Matter",
				co2: "Carbon Dioxide",
				tvoc: "TOTAL Volatile Organic Compounds",
				temp: "Temperature",
				humi: "Humidity",
				create_date: "Received Time",
			},
			droneStation: {
				title: 'Drone Mobile Station',
			},
			notification: {
				title: 'Notification',
			},
			'default': {
				title: "Default"
			}
		},
		// 메인화면 장비선택시 팝업
		popup2: {
			fireCCTV: {
				group_facility: "Facility Information",
				group_vms: "VMS Information",
				
				facil_name: "Facility Name",
				facil_id: "Facility ID",
				facil_mobius_id: "Mobius ID",
				facil_latitude: "Latitude",
				facil_longitude: "Longitude",

				vms_ip: "Media IP",
				vms_port: "Media Port",
				vms_chanel: "Media Channel",
				vms_rtsp: "RTSP",
				vms_id: "VMS Account",
				vms_passwd: "VMS Password",				
			},
			airSensor: {
				item: "Item",
				grade: "Grade",
				val: "Measures",
			},
			facil_cate_name: "Facility Category",
			facil_addr: "Facility Address",
			workplace_name: "Workplace Name",
			workplace_addr: "Workplace Address",
			facil_lat_lng: "Position(Latitude/Longitude)",
			facil_ip: "IP Address",
			parking_space: "Parking Space"
		},		
		user: {
			user_list:	'User List',
			roles:		'Role class',
			label: {
				name			: 'Full Name',
				username		: 'Username',
				password		: 'Password',
				check_password	: 'Confirm Password',
				current_password: 'Current Password',
				change_password	: 'Change Password',
				email			: 'E-mail',
				mobile			: 'Mobile',
				role			: 'Role',
				number			: 'No.',
				operation		: 'Op.',
			},
			button: {
				register	: 'Register Account',
				edit		: 'Change Account',				
			},
			confirm: {
				delete: 'Are you sure you want to delete [ {0} ]?'
			},
			message: {
				not_match	: 'Passwords do not match.',
				duplicate	: 'This username is already in use.',
				role		: 'Please check the role.',
				registered	: 'This user registered.',
				updated		: 'User information updated.',
				deleted 	: 'User account deleted.'
			}
		},
	},
	font: {
		Gulim: 'Gulim',
		Dotum: 'Dotum',
		Batang: 'Batang'
	},
	label: {
		menu: 'Menu',
		required: 'Required',
		optional: 'Opational',
		enabled: 'Enabled',
		disabled: 'Disabled',
		error: 'Error',
		info: 'Information',
		new_facility: 'New',
		variable_id: 'ID',
		variable_type: 'Type',
		variable_value: 'Value',
		variable_label: 'Name',
		all: 'ALL',
		power_on: 'Power On',
		power_off: 'Power Off',
		door_open: 'Opened',
		door_close: 'Closed',
		manual: 'Manual',
		auto: 'Auto',
		off: 'Off',
		on: 'On',
		del: 'Delete',
		muuido: 'MUUIDO',
		permanent: 'Permanent',
		none: 'None',
		system: 'System',
		reset: 'Reset',
		config: 'Configuration',
		sec: 'SEC',
		required_acronym: '*',
		unknown: 'Unknown',
		cars: 'cars',
		current: 'Current',
		searchDate: 'Date',
		lang: 'en',
		classification: 'Classification',
		byHour: 'Hour',
		item: 'Item',
		average: 'Average',
		max: 'Max',
		min: 'Min',
		date: 'Date',
		note: 'Note',
		power_low: "Low",
		power_middle: "Middle",
		power_high: "High",
		normal: "Normal",
		filter_error: "Need Replacement",
		show_all: "Show All",
		no_data: "No Data"
	},
	page: {
		headerFormat: 'Page {currentPage:n0} of {pageCount:n0}'
	},
	map: {
		base: 'Base',
		base2: '2D Base',
		satellite: 'Satellite',
		hybrid: 'Google'
	},
	button: {
		ok: 'Ok',
		cancel: 'Cancel',
		logout: 'Logout',
		save: 'Save',
		accept: 'Accept',
		update: 'Update',
		search: 'Search',
		add: 'Add',
		del: 'Delete'
	},
	message: {
		error: 'Could not process normally.',
		error_invalid: 'Invalid request.',
		error_password_mismatch: 'Passwords don\'t match.',
		success: 'Your request has been completed.',
		buffering: 'Buffering...',
		connecting: 'Connecting...',
		connection_error: 'Failed to connection.',
		decode_error: 'Failed to decode.',
		buffer_error: 'Invaild data.'
	},
	notification: {
		notification_title: "Notification History",
		notification_history: "Notification History",
		
		label: {
			success: 'Notification',
			info: 'Information',
			warning: 'Warning',
			danger: 'Danger'
		},
		message: {
			inwardTrafficOver100: 'It is over 100 to the island for 30 minutes.',
			outwardTrafficOver100: 'It is over 100 to the land for 30 minutes.',
			inwardTrafficDelay: 'There is traffic delay to the island.',
			outwardTrafficDelay: 'There is traffic delay to the land.',
			inwardTrafficCongestion: 'There is traffic congestion to the island.',
			outwardTrafficCongestion: 'There is traffic congestion to the land.',
			morethan100thanout: 'Up traffic is more than {0} between up and down today.',
			morethan100thanin: 'Down traffic is more than {0} between up and down today.',
			inwardTrafficDown: 'Up traffic is getting down.',
			outwardTrafficDown: 'Down traffic is getting down.',
			inwardEvery100th: '{0}th vehicle was in.',
			outwardEvery100th: '{0}th vehicle was out.',
			solarWindDanger: 'The current wind speed is {0} m/s on the bridge.'
		},
		history: {
			tab_history: {
				title: "Notification History",
				search_range: "Searching Range",
				search_conditions: "Searching Conditions",
				btn_search: "Search",
				
				seq: "Seq No",
				level: "Level",
				info: "Message",
				facil_category: "Facility Category",
				facil_name: "Facility Name",
				facil_id: "Facility ID",
				recv_date: "Received Time",
				
			},
		},
		sidebar: {
			count_title: "Notification Statistics",
			notification_title: "Notification"
		}
	},
	myinfo: {
		confirm: {
			content: "Are you sure that your information is changed?",
			title: "Update"
		}
	},
	user: {
		my_account_title: "My Account Management",
		my_account: "My Account",
		change_password: "Change Password",
		
		account_management_title: "Account Management",
		account_registry: "Account Registry",
		
		grid: {
			header: {
				username: 'ID',
				name: 'Name',
				role: 'Role',
				email: 'E-mail',
				mobile: 'Mobile',
				phone: 'Tel',
				fax: 'FAX',
				organization: 'Organization',
				department: 'Department',
				enabled: 'Active'
			}
		},
		button: {
			create: 'Create Account'
		},
		popup: {
			title: {
				create: 'Create Account',
				edit: 'Edit Account',
				username: 'Please enter 6 characters or more.',
				name: 'Please enter 2 characters or more.',
				role: 'Please select a role or more.',
				password: 'Please enter 8 characters or more.',
				mismatch: 'Passwords don\'t match.',
				myinfo: 'Edit My Info'
			},
			label: {
				username: 'ID',
				name: 'Name',
				password: 'Password',
				confirm_password: 'Confirm Password',
				role: 'Role',
				email: 'E-mail',
				mobile: 'Mobile',
				phone: 'Tel',
				fax: 'FAX',
				organization: 'Organization',
				department: 'Department',
				enabled: 'Active',
				myinfoPassword: 'Please, input your password.'
			}
		},
		confirm: {
			update: {
				content: "Are you sure that this information is changed?",
				title: "Update"
			},
			insert: {
				content: "Are you sure that this user is created?",
				title: "Register"
			},
			delete: {
				content: "Are you sure you want to delete this item?",
				title: "Delete"
			}
		}
	},
	facility: {
		facility_title: "Facility Management",
		facility_category_title: "Category Management",
		
		facility_list: "Facility List",
		facility_category: "Facility Cateogry",
		
		label: {
			category: {
				legend: 'Category',
				symbol: 'Symbol',
				code: 'Code',
				name: 'Name',
				ruleset: 'RuleSet',
				enable: 'Enable',
				creator: 'Creator',
				createDate: 'Created',
				updater: 'Updater',
				updateDate: 'Updated'
			},
			symbol: {
				basiclegend: 'Basic Symbol',
				customlegend: 'Custom Symbol',
				basic_legend_info: "Basic Symbol",
				custom_legend_info: "Custom Symbol",
				upload: 'Upload',
				select: 'Choose file'
			},
			facility: {
				name: 'Name',
				category: 'Category',
				mobius: 'Mobius ID',
				longitude: 'Longitude',
				latitude: 'Latitude',
				status: 'Status',
				enable: 'Enable',
				creator: 'Creator',
				createDate: 'Created',
				updater: 'Updater',
				updateDate: 'Updated',
				purifierPower: "Purifier Power",
				purifierMotorPower: "Purifier Motor Power",
				filter: "Purifier Filter Status",
				motor: "Purifier Motor Status",
				addr: "Address"
			}
		},
		popup: {
			symbol: {
				title: 'Register Symbol',
				delete_title: 'Delete Symbol',
				delete_content: 'Are you sure you want to delete this item?'
			},
			category: {
				title: 'Create Category',
				edit_title: 'Update Category',
				del_title: 'Delete Category',
				delete_content: 'Are you sure you want to delete this item?',
				legend: 'Basic Information',
				option: 'Optional Information',
				symbol: 'Symbol Information',
				name_required: 'Please enter 2 characters or more.',
				code_required: 'Please enter 2 characters or more.',
				symbol_required: 'Please select symbol.'
			},
			facility: {
				title: 'Create Facility',
				edit_title: 'Update Facility',
				del_title: 'Delete Facility',
				delete_content: 'Are you sure you want to delete this item?',
				legend: 'Basic Information',
				option: 'Optional Information',
				name_required: 'Please enter 2 characters or more.',
				lonlat_required: 'Please select longitude and latitude.',
				vms_checked: 'Please check the VMS information again.'
			}
		},
		button: {
			symbol: {
				register: 'Register Symbol'
			},
			category: {
				create: 'Create Category'
			},
			facility: {
				create: 'Create Facility'
			}
		}
	},
	media: {
		label: {
			register: 'Register',
			media_type: 'Media Type',
			media_name: 'Media Name',
			creator: 'Creator',
			createDate: 'Created',
			updater: 'Updater',
			updateDate: 'Updated'
		},
		popup: {
			register_title: 'Register',
			edit_title: 'Edit',
			del_title: 'Delete',
			upload: 'Media File',
			select: 'Choose File',
			name_required: 'Please enter 2 characters or more.',
			mismatch_media_type: 'The selected media type is not match your file.',
			mismatch_media_type_update: 'The selected media type is not match the file that is uploaded on server.',
			file_required: 'Please select file.',
			delete_content: 'Are you sure you want to delete this item?'
		}
	},
	airSensor: {
		grade_1: "Good",
		grade_2: "Normal",
		grade_3: "NotGodd",
		grade_4: "Bad",
		
		workplace: {
			title: "Air Quality in Workplace",
			
			common: {
				seq: "Seq No",
				facil_id: "Facility ID",
				facil_name: "Workplace Name",
				air_status: "Air Quality Status",
				air_grade: "Air Quality Grade",				
				co: "Carbon Monoxide",
				no2: "Nitrogen Dioxide",
				o3: "Ozone",				
				so2: "Sulfurous Acid Gas",
				pm10: "Coarse Particulate Matter",
				pm25: "Fine Particulate Matter",
				pm1: "Ultrafine Particulate Matter",
				co2: "Carbon Dioxide",
				tvoc: "TOTAL Volatile Organic Compounds",
				temp: "Temperature",
				humi: "Humidity",
				facil_status: "Air Sensor Status",
				date: "Received Time",				
				altitude: 'Altitude',
				latitude: 'Latitude',
				longitude: 'Longitude',
				
				station_id: "Station ID",
				station_name: "Station Name",
				observ_date: "Observation Date",	
			},
			tab_status: {
				title: "Air Quality",
				btn_refresh: "Refresh",
			},
			tab_history: {
				title: "Air Quality History",
				search_range: "Search Range",
				btn_search: "Search",
			},
		},
		station: {
			tab_status: {
				title: "Monitoring Stations",
				btn_refresh: "Refresh",
			},
			tab_history: {
				title: "Air Quality History",
				search_range: "Search Range",
				btn_search: "Search",
			},		
		},
		history: {
			title: "Air Quality in Workplace History"
		}
	},
}
