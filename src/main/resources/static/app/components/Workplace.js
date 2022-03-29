
import template from './templates/Workplace.html.js'
import addfield from './common/addfield.js'

export default Vue.component('Workplace', {
	template: template,
	components: {
		'paginate' : VuejsPaginate
	},
	data: function () {
		return {
			categoryFields: [],
			basicsymbolitems: [],
			customesymbolitems: [],
			symbolItems: [],
			categoryItems: [],
			facilityItems: [],
			workplaceItems:[],
			havingFacilityItems:[],
			//testlist:[],
			peoplecntURL:'',
			filterList:[],
			apiBasicSymbols: '/api/facility/basic/symbols',
			apiCustomSymbols: '/api/facility/custom/symbols',
			apiSymbolFile: '/api/facility/symbol',
			apiCategory: '/api/facility/category',
			apiFacility: '/api/facility',
			apiWorkplace: '/api/workplace',
			apiAirSensorFilter: '/api/AirSensorFilter',
			apiAirCleanerFilter: '/api/AirCleanerFilter',
			apiFireSensorFilter: '/api/FireSensorFilter',
			apiGasSensorFilter: '/api/GasSensorFilter',
			apiFacilityPaging: '/api/workplace/paging',
			apiWorkplacePaging: '/api/workplace/paging',
			apiHavingFacility: '/api/HavingFacility',
			apiPeopleCnt:'/cameraDataInpnr.wd',
			error_message: '',
			data: {},
			currentCategory: {},
			currentFacility: {},
			currentWorkplace: {},
			currentFacilityCategory: {},
			currentCategoryFilter: {
				id: -1
			},
			//yjh
			havefacility:{
				airSensor: false,
				airCleaner: false,
				fireSensor: false,
				gasSensor: false
			},
			modeNew: false,
            categoryEnableSelector: {},
			facilityEnableSelector: {},
			facilityCategorySelector: null,
			facilityStatusSelector: null,
			facilityCategoryFilterSelector: null,
			facilityStatusItems: [],
			apiFacilityStatus: '/api/facility/status',
			apiLastAirSensorInfo: '/api/airsensor/status',
			currentAirSensorInfo: null,
			
			// pagenation
			size: 10,
			totalPage: 0,
			page: 1,			
			isActivePage: false,
			orderByDesc: true,

			// VMS
			inodepURL : "",
			inodepLoginURL : "login",
			inodepLogoutURL : "logout",
			inodepDeviceListURL : "device/detail-list/",
			inodepGroup : "group1",
			// inodepLicense : "licGIS",
			inodepLicense : "licNormalClient",
			inodepAuthToken : null,
			inodepApiSerial : null,
			inodepUserSerial : null,
			inodepVmsId: null,
			inodepBool : true,
			
			
            airSensorToggle: {isOpen:false,items:[]},
            airCleanerToggle: {isOpen:false,items:[]},
            fireSensorToggle: {isOpen:false,items:[]},
            gasSensorToggle: {isOpen:false,items:[]},
            system1Toggle: {isOpen:false},
            system2Toggle: {isOpen:false},
            system3Toggle: {isOpen:false},
			filterManage:[],
			filteredItems:[],
			sysfilteritems:[]	
			
		}
	},
	computed: {
		...Vuex.mapGetters({
			vmsConfig: 'basic/getVmsConfig',
		}),
		enabledCategoryItems: function() {
			return this.categoryItems.filter(item => {
				return item.enabled;
			});
		},
		selectCategoryItemsWitAll: function() {
			var categorySelector = [];
			categorySelector.push({
				categoryName: this.$i18n.t("label.all"),
				id: -1
			});
			
			var enabledCategory = this.categoryItems.filter(item => {
				return item.enabled;
			});
			
			categorySelector = categorySelector.concat(enabledCategory);
			
			return categorySelector;
		},

		
		

	},
	watch: {
		customesymbolitems: function() {
			this.symbolItems = this.basicsymbolitems.concat(this.customesymbolitems);
		},
		basicsymbolitems: function() {
			this.symbolItems = this.basicsymbolitems.concat(this.customesymbolitems);
		},
		categoryItems: function() {
			var me = this;
			if(me.facilityCategoryFilterSelector != null) {
				me.facilityCategoryFilterSelector.destroy();
				me.facilityCategoryFilterSelector = null;
			}
			
			let categorySelectorItems = [];
			me.selectCategoryItemsWitAll.forEach((item) => {
				categorySelectorItems.push({
					label: item.categoryName,
					value: item.ccode
				});
			});
		},

		
	},
	methods: {
		
		 peoplecnt: function() {
            let me = this;

            //me.inodepURL = `http://${me.restIp}:${me.restPort}/api/`;
			//me.peoplecntURL = `http://220.126.101.248:8283?camId=${me.camId}&inpTm=${me.inpTm}&inpMs=${me.inpMs}&4inOut=${me.inOut}&lineNo=${me.lineNo}&totInCnt=${me.toInCnt}&totOutCnt=${me.totOutCnt}`;
			me.peoplecntURL = `/cameraDataInpnr.wd`;
			console.log("peoplecntURL : " + me.peoplecntURL);

           axios.get(me.peoplecntURL)
            .then(res => {
				console.log(res.data);
			
           })
            .catch( err => {
                console.log(err);
				
                return;
            });
        },
		getFcailityCategoryItemsWitAllById: function(id) {
			let categorys =  this.selectCategoryItemsWitAll.filter(item => {
				return (item.ccode == id);
			});
			
			if(categorys != null && categorys.length > 0) return categorys[0];
			return null;
		},
		getFacilityCategoryById: function(id) {
			let categorys =  this.categoryItems.filter(item => {
				return (item.ccode == id);
			});
			
			if(categorys != null && categorys.length > 0) return categorys[0];
			return null;
		},
		onSelectSymbol: function(index) {
			this.data = index;
			for(var i = 0; i < this.symbolItems.length; i++) {
				if(i != index) {
					this.symbolItems[i].selected = false;
				} else {
					this.symbolItems[i].selected = true;
				}
			}			
		},
		onConfirmOk: function(e) {
			var op = $(e.target).data('op');
			var mode = $(e.target).data('mode');
			var data = $(e.target).data('data');
			
			if(op == 'symbol') {
				if(mode == 'delete') {
					this.removeSymbol(data);
				}
			}
			$("#confirmDialog").modal('toggle');
		},
		openConfirm: function(op, mode, data) {
			if(op =='symbol') {
				if(mode == 'delete') {
					$("#confirmContent").html(this.$i18n.t("facility.popup.symbol.delete_content"));
					$("#confirmTitle").html(this.$i18n.t("facility.popup.symbol.delete_title"));
					$("#confirmCancel").html(this.$i18n.t("button.cancel"));
					$("#confirmOk").html(this.$i18n.t("button.ok"));
					$("#confirmOk").removeClass('btn-primary');
					$("#confirmOk").addClass('btn-danger');
					
					$("#confirmOk").data('op', op);
					$("#confirmOk").data('mode', mode);
					$("#confirmOk").data('data', data);
				
					this.data = {};
					$("#confirmDialog").modal('toggle');
					$('#confirmOk').on('click', this.onConfirmOk);
				}
			}
		},
		onRemoveSymbol: function(index) {
			if(index >= this.customesymbolitems.length) return;
			
			this.openConfirm('symbol', 'delete', index);
			
		},
		removeSymbol: function(index) {
			if(index >= this.customesymbolitems.length) return;
			
			var me = this;
			var item = this.customesymbolitems[index];
			
			if(item.removable == 1) {
				axios.delete(this.apiSymbolFile + "/" + item.title, {}, {
				    headers: {
				    	'Content-Type': 'application/json'
				    }
				})
				.then(res => {
					var filename = res.data;
					if(filename != null && filename.length > 0) {
						this.customesymbolitems.splice(index, 1);
					}
		        })
		        .catch(err => {
		        	if (err.response) {
		        		me.error_message = err.response.data.message;
	      			} else if (err.request) {
	      			    me.error_message = err.request;
	      			} else {
	      			    me.error_message = err.message;
	      			}
		        	
		        	$('#alertCustomSymbolDel').show();
		        	setTimeout(function() {
		        		$('#alertCustomSymbolDel').hide();
		        	}, 2000);
		        });
			}
		},
		onOpenUploadDialog : function() {
			$('#frmUploadSymbol').modal('toggle');
		},
		onCloseUploadDialog : function() {
			$('.custom-file-label').html(this.$i18n.t("facility.label.symbol.select"));
			$('#alertCustomSymbol').hide();
		},
		onSymbolSubmit : function() {
			var me = this;
			var files = $("#inputGroupSymbolFile")[0].files;
			if(files != null) {
				let formData = new FormData();
				for( var i = 0; i < files.length; i++ ){
					  let file = files[i];
					  formData.append("files", file);
				}
				
				axios.post(this.apiSymbolFile, formData, {
				    headers: {
				    	'Content-Type': 'multipart/form-data'
				    }
				})
				.then(res => {
					var obj = res.data;
    				for(var i=0; i < obj.length; i++ ) {
    					me.customesymbolitems.push({
    						title: obj[i].split('.').slice(0, -1).join('.'),
    						path: me.apiSymbolFile +"/" + obj[i] + '?removable=1',
    						removable: true 
    					});
        			}
    				
					$('#frmUploadSymbol').modal('toggle');
		        })
		        .catch(err => {
		        	if (err.response) {
		        		me.error_message = err.response.data.message;
	      			} else if (err.request) {
	      			    me.error_message = err.request;
	      			} else {
	      			    me.error_message = err.message;
	      			}
		        	$('#alertCustomSymbol').show();
		        });
			}
		},
		getFacilityStatusList: function() {
			var me = this;
			
			$('#cover-spin').show(0);
			
			me.categoryItems = [];
			
			axios.get(me.apiFacilityStatus)
    		.then(res => {
    			if(res != null && res.data != null) {
    				me.facilityStatusItems = res.data;
    			}
    			
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();
    		});
		},
		getStatusName: function(value) {
			for(let i=0; i<this.facilityStatusItems.length; i++) {
				if(value == this.facilityStatusItems[i].value) {
					return this.facilityStatusItems[i].label;
				}
 			}
			return 'Invalid'
		},
		onOpenCategoryDialog: function(index) {

			if(index == -1) {
				this.modeNew = true;
			} else {
				this.modeNew = false;
			}
			
			this.removeCategoryField();
			
			if(!this.modeNew) {
				let category = this.categoryItems[index];
				this.currentCategory = $.extend(true, {}, category);	// you must use deep copy.
				
				this.currentCategory.createUserName = this.currentCategory.createUser != null ? this.currentCategory.createUser.name : '';
				this.currentCategory.updateUserName = this.currentCategory.updateUser != null ? this.currentCategory.updateUser.name : '';
				
				this.categoryEnableSelector.select(this.currentCategory.enabled ? 0 : 1);
				for(var i = 0; i < this.symbolItems.length; i++) {
					if(this.symbolItems[i].title != this.currentCategory.categorySymbol) {
						this.symbolItems[i].selected = false;
					} else {
						this.symbolItems[i].selected = true;
						this.data = i;
					}
				}
				
				if(this.currentCategory.properties != null) {
					this.categoryFields = $.extend(true, [], this.currentCategory.properties);	// you must use deep copy.
					
				} else {
					this.categoryFields = [];
				}
				
				$("#categoryHasRuleSet").prop('checked', this.currentCategory.hasRuleSet).change();
			} else {
				$("#categoryHasRuleSet").prop('checked', false).change();
				this.currentCategory = $.extend(true, {}, {});
			}
			
			$('#frmCategory').modal('toggle');
		},
		onCloseCategoryDialog: function() {
			this.data = {};
			this.currentCategory = {};
			this.modeNew = true;
			$('#alertCategoryError').hide();
			
			this.removeCategoryField();
		},
		onAddCategoryField: function(e) {
			this.categoryFields.push({
				valueType: this.$i18n.t("label.variable_type"),
				valueId: "",
				valueName: "",
				valueRequired: false,
				id: moment().valueOf()
			});
		},
		onFieldChanged: function(e) {
			for(let i=0; i<this.categoryFields.length; i++) {
				if(this.categoryFields[i].id == e.id) {
					this.categoryFields[i].valueType = e.valueType;
					this.categoryFields[i].valueId = e.valueId;
					this.categoryFields[i].valueName = e.valueName;
					this.categoryFields[i].valueRequired = e.valueRequired;
					break;
				}
			}
		},
		removeCategoryField: function() {
			this.categoryFields = [];
		},
		
		onOpenWorkplaceDialog: function(index) {
			//this.peoplecnt();
			//this.getPeopleCnt();
			if(index == -1) {
				this.modeNew = true;
			} else {
				this.modeNew = false;
			}

			if(!this.modeNew) {
				let workplace = this.workplaceItems[index];
				this.currentWorkplace = $.extend(true, {}, workplace);	// you must use deep copy.
				this.currentWorkplace.createUserName = this.currentWorkplace.createUser != null ? this.currentWorkplace.createUser.name : '';
				this.currentWorkplace.updateUserName = this.currentWorkplace.updateUser != null ? this.currentWorkplace.updateUser.name : '';

			} else {
				this.currentWorkplace = $.extend(true, {}, { properties: {} });
			}
			
			$('#frmFacility').modal('toggle');
		},

		onCloseFacilityDialog: function() {

			this.$refs['newMiniMap'].removeAllLayer();
			this.facilityEnableSelector.select(0);
			this.facilityStatusSelector.select(0);
			this.facilityCategorySelector.select(0);
			
			$('#alertFacilityError').hide();
		},
		onMiniMapClick: function(coordinate) {
			if(coordinate != null) {
				this.currentFacility.longitude = coordinate[0];
				this.currentFacility.latitude = coordinate[1];
			}
			
			this.$forceUpdate();
		},
		onChangePosition: function() {
			if(this.currentFacility.longitude != null && this.currentFacility.longitude.length > 0 
					&& this.currentFacility.latitude != null && this.currentFacility.latitude.length > 0) {
				
				if(!this.modeNew) {
					this.$refs['newMiniMap'].addNewSymbolName([this.currentFacility.longitude, this.currentFacility.latitude], this.currentFacility.facilityName, this.currentFacility.facilityCategory.categorySymbol, this.currentFacility.facilityCategory.categorySymbolRemovable == false ? 0 : 1);
				} else {
					this.$refs['newMiniMap'].addNewSymbolName([this.currentFacility.longitude, this.currentFacility.latitude], this.$i18n.t("label.new_facility"), this.enabledCategoryItems[0].categorySymbol, this.enabledCategoryItems[0].categorySymbolRemovable == false ? 0 : 1);
				}
				
				this.$forceUpdate();
			}
		},
		
		getDirectWokplace: function(){
			var dw = this.workplaceItems;
			
			return dw;
		},
		
		
		getFilterList: function(){

			let me = this;
			me.filteredItems = [];
			var filterManage = [me.airSensorToggle,me.airCleanerToggle,me.fireSensorToggle,me.gasSensorToggle];
			for(var i in filterManage){
				if(filterManage[i].isOpen == true){
					for(var j in filterManage[i].items){
						me.filteredItems.push(filterManage[i].items[j]);
					}
				}
			}
			me.filteredItems = _.uniqBy(this.filteredItems,"id");
		 	me.filteredItems = [...new Set(this.filteredItems.map(JSON.stringify))].map(JSON.parse);
			me.filteredItems = me.filteredItems.sort(function(a,b){
				return a.id - b.id;
			})
			
			me.workplaceItems = me.filteredItems;
		},

		onWorkplaceSubmit: async function() {
			let me = this;
			

			$('#cover-spin').show(0);



			if(!this.modeNew) {
        		await axios.put(this.apiWorkplace, JSON.stringify(this.currentWorkplace), this.config)
        		.then(async res => {
        			$('#cover-spin').hide();
        			$('#frmFacility').modal('toggle');
        			
        			me.init();
        		})
        		.catch(async err => {
        			$('#cover-spin').hide();
        			
        			if (err.response) {
	  			      	me.error_message = err.response.data.message;
	      			} else if (err.request) {
	      			    me.error_message = err.request;
	      			} else {
	      			    me.error_message = err.message;
	      			}
		        	
		        	$('#alertFacilityError').show();
				});
        	} else {
				// console.log(this.currentFacility);
        		await axios.post(this.apiWorkplace, JSON.stringify(this.currentWorkplace), this.config)
        		.then(async res => {
					$('#cover-spin').hide();
        			$('#frmFacility').modal('toggle');
        			me.init();
        		})
        		.catch(async err => {
        			$('#cover-spin').hide();
        			
        			if (err.response) {
  	  			      	me.error_message = err.response.data.message;
  	      			} else if (err.request) {
  	      				me.error_message = err.request;
  	      			} else {
  	      			    me.error_message = err.message;
  	      			}
  		        	
  		        	$('#alertFacilityError').show();
        		});
        	}
		},

		getWorkplaceList: function() {
			var me = this;
			
			for(var i=0; i<length; i++){
				
			}
			
			$('#cover-spin').show(0);
			
			//this.$refs['viewMiniMap'].removeAllLayer();
			
			me.isActivePage = false;
			me.workplaceItems = [];
			//me.havingFacilityItems=[];
			
			axios.get(me.apiWorkplacePaging, {params: {
									size: this.size,
									page: (this.page - 1)
									}})
    		.then(async res => {    			
    			if(res != null && res.data != null) {
    				if (res.data.totalElements > 0)			// total element counts
							me.isActivePage = true;
					me.totalPage = res.data.totalPages;		// total pages
					me.page = res.data.number + 1;			// cur page
						
					let no = 0;    				
    				for(var i=0; i < res.data.numberOfElements; i++) {
    					var obj = res.data.content[i];
    					
    					no = res.data.number * res.data.size + 1 + i;
    					obj.no = no;
    					Object.assign(obj, me.havefacility);
    					me.workplaceItems.push(obj);
						//me.gettest(obj.id);
															
    				}
					if(me.airSensorToggle.isOpen == true || me.airCleanerToggle.isOpen == true || me.fireSensorToggle.isOpen==true || me.gasSensorToggle.isOpen==true){
						me.getFilterList();
					}	
					me.systemFilter();
					if(me.system1Toggle.isOpen==true){
						me.system1Items();
					}
					if(me.system2Toggle.isOpen==true){
						me.system2Items();
					}
					if(me.system3Toggle.isOpen==true){
						me.system3Items();
					}
    			}
 				
    		
	//this.$refs['viewMiniMap'].setFacility(me.filteredFacilityItems);
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
		},
		system1Items: function(){
			if(this.system1Toggle.isOpen==true){
				this.workplaceItems = this.workplaceItems.filter(item=>item.airSensor==true||item.airCleaner==true);
			}
			
		},
		system2Items: function(){
			if(this.system2Toggle.isOpen==true){
				this.workplaceItems = this.workplaceItems.filter(item=>item.fireSensor==true);
			}
		},
		system3Items: function(){
			if(this.system3Toggle.isOpen==true){
				this.workplaceItems = this.workplaceItems.filter(item=>item.gasSensor==true);
			}
		},
		
		getAirSensorFilter: function() {
			var me = this;
			
			$('#cover-spin').show(0);
			
			//this.$refs['viewMiniMap'].removeAllLayer();
			
			
			axios.get(me.apiAirSensorFilter)
    		.then(res => {    			
    			if(res != null && res.data != null) {
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					me.airSensorToggle.items.push(obj);				
    				}    				
    			}
 				
    			//this.$refs['viewMiniMap'].setFacility(me.filteredFacilityItems);
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
		},
		getAirCleanerFilter: function() {
			var me = this;
			
			$('#cover-spin').show(0);
			
			//this.$refs['viewMiniMap'].removeAllLayer();
			
			
			axios.get(me.apiAirCleanerFilter)
    		.then(res => {    			
    			if(res != null && res.data != null) {
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					me.airCleanerToggle.items.push(obj);				
    				}    				
    			}
 				
    			//this.$refs['viewMiniMap'].setFacility(me.filteredFacilityItems);
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
		},
		getFireSensorFilter: function() {
			var me = this;
			
			$('#cover-spin').show(0);
			
			//this.$refs['viewMiniMap'].removeAllLayer();
			
			
			axios.get(me.apiFireSensorFilter)
    		.then(res => {    			
    			if(res != null && res.data != null) {
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					me.fireSensorToggle.items.push(obj);				
    				}    				
    			}
 				
    			//this.$refs['viewMiniMap'].setFacility(me.filteredFacilityItems);
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
		},
		getGasSensorFilter: function() {
			var me = this;
			
			$('#cover-spin').show(0);
			
			//this.$refs['viewMiniMap'].removeAllLayer();
			
			
			axios.get(me.apiGasSensorFilter)
    		.then(res => {    			
    			if(res != null && res.data != null) {
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					me.gasSensorToggle.items.push(obj);				
    				}    				
    			}
 				
    			//this.$refs['viewMiniMap'].setFacility(me.filteredFacilityItems);
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
		},
		getPeopleCnt: function(){
			var me = this;
			
			axios.get(me.apiPeopleCnt)
    		.then(res => {    			
    			if(res != null && res.data != null) {
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					me.peopleCnt.items.push(obj);				
    				}    				
    			}
 				
    			//this.$refs['viewMiniMap'].setFacility(me.filteredFacilityItems);
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
		},
		
		getFacilityItems: function() {
			var me = this;
			
			$('#cover-spin').show(0);
			
			//this.$refs['viewMiniMap'].removeAllLayer();
			
			
			axios.get(me.apiFacility)
    		.then(res => {    			
    			if(res != null && res.data != null) {
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
						if(obj.workplace != null){
							me.facilityItems.push(obj);
						}
				
    				}
					me.systemFilter();    				
    			}
 				
    			//this.$refs['viewMiniMap'].setFacility(me.filteredFacilityItems);
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
		},
		
				
		//yjh
		systemFilter : function(){
			for(var i in this.workplaceItems){
				for(var j in this.facilityItems){
					if(this.facilityItems[j].workplace.id == this.workplaceItems[i].id ){
						if(this.facilityItems[j].facilityCategory.ccode == 'AIR_CLEANER'){
							this.workplaceItems[i].airCleaner = true;
						}
						if(this.facilityItems[j].facilityCategory.ccode == 'AIR_SENSOR'){
							this.workplaceItems[i].airSensor = true;
						}
						if(this.facilityItems[j].facilityCategory.ccode == 'ELECTRONIC_BREAKER'){
							this.workplaceItems[i].fireSensor = true;
						}
						if(this.facilityItems[j].facilityCategory.ccode == 'GAS_SENSOR'){
							this.workplaceItems[i].gasSensor = true;
						}						
					}
				}											
			}
		},
		
		
		getHavingFacility: function(id) {
			
			$('#cover-spin').show(0);
			
			
			
			 axios.get(this.apiHavingFacility,{
				params: {
					workplaceId: id
				}
			})
    		.then(async res => {    			
    			if(res != null && res.data !=null) {

    					this.havingFacilityItems.push(res.data);
										    				
    			}
 				
    			//this.$refs['viewMiniMap'].setFacility(me.filteredFacilityItems);
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
		},
		getWorkplaceListWithPageNo: function(p) {
			this.page = parseInt(p);
			this.getWorkplaceList();
		},
		onSelectFacility: function(index) {
			this.$refs['viewMiniMap'].selectedSymbol(this.filteredFacilityItems[index].fcode);
			
			// 지도 중앙으로 심볼 이동
			var pt = [this.filteredFacilityItems[index].longitude, this.filteredFacilityItems[index].latitude];
			this.$refs['viewMiniMap'].setCenter(pt);
			
			$(event.target).closest('tr').addClass('bg-info').siblings().removeClass('bg-info');
		},
		onSelectCategory: function(event) {
			$(event.target).closest('tr').addClass('bg-info').siblings().removeClass('bg-info');
		},
		onViewMiniMapSeletedSymbol: function(id) {
			for(var i=0; i<this.filteredFacilityItems.length; i++) {
				if(this.filteredFacilityItems[i].fcode == id) {
					this.$refs['viewMiniMap'].selectedSymbol(id);
					var trId = '#facility_' + i;
					$(trId).addClass('bg-info').siblings().removeClass('bg-info');
					break;
				}
			}
		},
		init: function() {
			//this.gettest();
			//this.getHavingFacility(1);
			this.getFacilityItems();
			this.getFacilityStatusList();
			this.getFacilityStatusList();
			this.getWorkplaceList();
			this.initVmsData();
			this.getAirSensorFilter();
			this.getAirCleanerFilter();
			this.getFireSensorFilter();
			this.getGasSensorFilter();
			
			
		},
		initVmsData: function() {
			this.inodepAuthToken = null,
			this.inodepApiSerial = null,
			this.inodepUserSerial = null,
			this.inodepVmsId = null
			this.inodepBool = true
		},
		onDeleteFacility: function(index) {
			var me = this;
			
			$("#confirmContent").html(this.$i18n.t("facility.popup.facility.delete_content"));
			$("#confirmTitle").html(this.$i18n.t("facility.popup.facility.del_title"));
			$("#confirmCancel").html(this.$i18n.t("button.cancel"));
			$("#confirmOk").html(this.$i18n.t("button.ok"));
			$("#confirmOk").removeClass('btn-primary');
			$("#confirmOk").addClass('btn-danger');
			
			$("#confirmOk").data('index', index);
			$("#confirmDialog").modal('toggle');
			$('#confirmOk').on('click', this.onConfirmFacilityDeleteOk);
			
		},
		onConfirmFacilityDeleteOk: function(e) {
			let me = this;
			
			$("#confirmDialog").modal('toggle');
			
			var index = $(e.target).data('index');
			var target = me.workplaceItems[index];
			
			axios.delete(this.apiWorkplace + "/" + target.id)
			.then(res => {
				me.init();
	        })
	        .catch(err => {
	        	if (err.response) {
	        		me.toastMessage("error", me.$i18n.t("facility.popup.facility.del_title"), err.response.data.message);
      			} else if (err.request) {
      				me.toastMessage("error", me.$i18n.t("facility.popup.facility.del_title"), err.request);
      			} else {
      				me.toastMessage("error", me.$i18n.t("facility.popup.facility.del_title"), err.message);
      			}
	        	me.init();
	        });
		},
		onDeleteFacilityCategory: function(index) {
			var me = this;
			
			$("#confirmContent").html(this.$i18n.t("facility.popup.category.delete_content"));
			$("#confirmTitle").html(this.$i18n.t("facility.popup.category.del_title"));
			$("#confirmCancel").html(this.$i18n.t("button.cancel"));
			$("#confirmOk").html(this.$i18n.t("button.ok"));
			$("#confirmOk").removeClass('btn-primary');
			$("#confirmOk").addClass('btn-danger');
			
			$("#confirmOk").data('index', index);
			$("#confirmDialog").modal('toggle');
			$('#confirmOk').on('click', me.onConfirmCategoryDeleteOk);
		},
		onConfirmCategoryDeleteOk: function(e) {
			let me = this;
			
			$("#confirmDialog").modal('toggle');
			
			var index = $(e.target).data('index');
			var target = me.categoryItems[index];
			
			axios.delete(this.apiCategory + "/" + target.id)
			.then(res => {
				me.init();
	        })
	        .catch(err => {
	        	if (err.response) {
	        		me.toastMessage("error", me.$i18n.t("facility.popup.category.del_title"), err.response.data.message);
      			} else if (err.request) {
      				me.toastMessage("error", me.$i18n.t("facility.popup.category.del_title"), err.request);
      			} else {
      				me.toastMessage("error", me.$i18n.t("facility.popup.category.del_title"), err.message);
      			}
	        	me.init();
	        });
		},
		subStyle: function() {
			return 'background: url("/static/images/facility_bg.jpg") no-repeat; background-size: 100% 100%;';
		},
		mainTitleStyle: function() {
			return "color: #069991;"
		},
		getLastAirSensorInfo: function() {
			var me = this;			
			
			axios.get(me.apiLastAirSensorInfo+"/"+me.currentFacility.fcode)
    		.then(res => {
    			if(res != null && res.data != null) {
    				me.currentAirSensorInfo = res.data;
    				console.log(this.currentAirSensorInfo);
    			}
    		})
    		.catch(err => {
    			    			
    		});
		}
	},
	created: function () {
		this.$store.dispatch('basic/FETCH_VMSCONFIG');
		//this.gettest();
	},
	mounted: function () {
		var me = this;
		
		me.init();
		
		$('#alertCustomSymbol').hide();
		$('#alertCustomSymbolDel').hide();
		$('#alertCategoryError').hide();
		$('#alertFacilityError').hide();
		
		me.facilityEnableSelector = new tui.SelectBox('#facilityEnable', {
			data: me.enabledData,
			autofocus: true,
			showIcon: true
		});
		
		$('#frmUploadSymbol').on('hidden.bs.modal', this.onCloseUploadDialog);
		$('#frmCategory').on('hidden.bs.modal', this.onCloseCategoryDialog);
		$('#frmFacility').on('shown.bs.modal', this.onShowFacilityDialog);
		$('#frmFacility').on('hidden.bs.modal', this.onCloseFacilityDialog);
		$("#facilityLatitude").change(function() {
			me.onChangePosition();
		});
		$("#facilityLongitude").change(function() {
			me.onChangePosition();
		});
		
		$('#inputGroupSymbolFile').on('change',function() {
			var files = [];
	        for (var i = 0; i < $(this)[0].files.length; i++) {
	            files.push($(this)[0].files[i].name);
	        }
	        $(this).next('.custom-file-label').html(files.join(', '));
        });
		
		this.$refs['newMiniMap'].$on('coordinate', this.onMiniMapClick);
		this.$refs['viewMiniMap'].$on('selectedSymbol', this.onViewMiniMapSeletedSymbol);
		
	}
});