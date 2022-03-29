
import template from './templates/Facility.html.js'
import addfield from './common/addfield.js'

export default Vue.component('Facility', {
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
			apiBasicSymbols: '/api/facility/basic/symbols',
			apiCustomSymbols: '/api/facility/custom/symbols',
			apiSymbolFile: '/api/facility/symbol',
			apiCategory: '/api/facility/category',
			apiFacility: '/api/facility',
			//paging api 호출
			apiFacilityPaging: '/api/facility/paging',
			error_message: '',
			data: {},
			currentCategory: {},
			currentFacility: {},
			currentFacilityCategory: {},
			currentCategoryFilter: {
				id: -1
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
			inodepBool : true
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
		filteredFacilityItems: function() {
			if(this.currentCategoryFilter.id =='-1') {
				return this.facilityItems;
			} else {
				return this.facilityItems.filter(item => {
					return item.facilityCategory.ccode == this.currentCategoryFilter.id;

				});
			}
		}
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
//			me.facilityCategoryFilterSelector = new tui.SelectBox('#facilityCategoryFilterSelector', {
//				data: categorySelectorItems,
//				autofocus: true,
//				showIcon: true
//			});
			
//			me.facilityCategoryFilterSelector.on('change', (ev) => {
//				if(ev.curr.getValue() != null) {
//					me.currentCategoryFilter = me.getFcailityCategoryItemsWitAllById(ev.curr.getValue());
//	        		me.$refs['viewMiniMap'].setFacility(me.filteredFacilityItems);
//				}
//			});
		}
	},
	methods: {
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
		getSymbolList: function(mode) {
			var me = this;
			
			$('#cover-spin').show(0);
			
			var apiUrl = this.apiBasicSymbols; 
			if(mode != 0) {
				apiUrl = this.apiCustomSymbols;
				me.customesymbolitems = [];
			} else {
				me.basicsymbolitems = [];
			}
			
			axios.get(apiUrl)
    		.then(res => {
    			if(res != null && res.data != null) {
    				var obj = res.data;
    				for(var i=0; i < obj.length; i++ ) {
    					if(mode == 0) {
    						me.basicsymbolitems.push({
        						title: obj[i].split('.').slice(0, -1).join('.'),
        						path: me.apiSymbolFile +"/" + obj[i] + '?removable=' + mode,
        						removable: false 
        					});
        				} else {
        					me.customesymbolitems.push({
        						title: obj[i].split('.').slice(0, -1).join('.'),
        						path: me.apiSymbolFile +"/" + obj[i] + '?removable=' + mode,
        						removable: true 
        					});
        				}
        			}
    				
    				if(mode != 0) {
    					me.symbolItems = me.basicsymbolitems.concat(me.customesymbolitems);
    				}
    			}
    			
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
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
		getCategoryList: function() {
			var me = this;
			
			$('#cover-spin').show(0);
			
			me.categoryItems = [];
			
			axios.get(me.apiCategory)
    		.then(res => {
    			if(res != null && res.data != null) {
    				for(var i=0; i < res.data.length; i++) {
    					var obj = res.data[i];
    					obj.categorySymbolPath = '/api/facility/symbol/' + obj.categorySymbol + '.png?removable=';
    					if(obj.categorySymbolRemovable == true) {
    						obj.categorySymbolPath += '1';
    					} else {
    						obj.categorySymbolPath += '0';
    					}
    					me.categoryItems.push(obj);
    				}
    			}
    			
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
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
		onCategorySubmit: function() {
			var me = this;
			
			var symbolName = null;
			var symbolType = 0;
			for(var i = 0; i < this.symbolItems.length; i++) {
				if(this.symbolItems[i].selected == true) {
					symbolName = this.symbolItems[i].title;
					symbolType = this.symbolItems[i].removable;
				}
			}
			
			if(symbolName == null) {
				this.error_message = this.$i18n.t("facility.popup.category.symbol_required");
				$('#alertCategoryError').show();
	        	setTimeout(function() {
	        		$('#alertCategoryError').hide();
	        	}, 2000);
	        	
				return;
			}
			
			this.currentCategory.categorySymbol = symbolName;
			this.currentCategory.categorySymbolRemovable = symbolType;
			this.currentCategory.enabled = this.categoryEnableSelector.getSelectedItem().getValue();
			this.currentCategory.hasRuleSet = $("#categoryHasRuleSet").prop('checked');
			
			this.currentCategory.properties = [];
			
			for(let i=0; i<this.categoryFields.length; i++) {
				if(['String', 'Number', 'Email', 'IP'].includes(this.categoryFields[i].valueType) && this.categoryFields[i].valueId != null && this.categoryFields[i].valueId.length > 0 && this.categoryFields[i].valueName != null && this.categoryFields[i].valueName.length > 0) {
					this.currentCategory.properties.push(this.categoryFields[i]);
				}
			}
			
			$('#cover-spin').show(0);
			if(!this.modeNew) {
        		axios.put(this.apiCategory, JSON.stringify(this.currentCategory), this.config)
        		.then(res => {
        			$('#cover-spin').hide();
        			$('#frmCategory').modal('toggle');
        			
        			me.init();
        		})
        		.catch(err => {
        			$('#cover-spin').hide();
        			
        			if (err.response) {
	  			      	me.error_message = err.response.data.message;
	      			} else if (err.request) {
	      			    me.error_message = err.request;
	      			} else {
	      			    me.error_message = err.message;
	      			}
		        	
		        	$('#alertCategoryError').show();
        		});
        	} else {
        		axios.post(this.apiCategory, JSON.stringify(this.currentCategory), this.config)
        		.then(res => {
        			$('#cover-spin').hide();
        			$('#frmCategory').modal('toggle');
        			
        			me.init();
        		})
        		.catch(err => {
        			$('#cover-spin').hide();
        			
        			if (err.response) {
  	  			      	me.error_message = err.response.data.message;
  	      			} else if (err.request) {
  	      				me.error_message = err.request;
  	      			} else {
  	      			    me.error_message = err.message;
  	      			}
  		        	
  		        	$('#alertCategoryError').show();
        		});
        	}
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
		onOpenFacilityDialog: function(index) {
			if(index == -1) {
				this.modeNew = true;
			} else {
				this.modeNew = false;
			}
			
			this.currentFacility.properties = {};
			if(!this.modeNew) {
				let facility = this.filteredFacilityItems[index];
				this.currentFacility = $.extend(true, {}, facility);	// you must use deep copy.
				this.currentFacility.createUserName = this.currentFacility.createUser != null ? this.currentFacility.createUser.name : '';
				this.currentFacility.updateUserName = this.currentFacility.updateUser != null ? this.currentFacility.updateUser.name : '';
				
				this.facilityEnableSelector.select(this.currentFacility.enabled ? 0 : 1);
				
				this.currentFacility.properties = this.filteredFacilityItems[index].properties;
				
				this.currentFacilityCategory = this.filteredFacilityItems[index].facilityCategory;
				console.log(this.currentFacility);
				
				if(this.currentFacility.facilityCategory && this.currentFacility.facilityCategory.ccode === "AIR_SENSOR") {
					this.getLastAirSensorInfo();
				} else {
					this.currentAirSensorInfo = null;
				}
				// TODO :: modi	
			} else {
				this.currentFacility = $.extend(true, {}, { properties: {} });
			}
			
			$('#frmFacility').modal('toggle');
		},
		onShowFacilityDialog: function() {
			var me = this;
			this.$refs['newMiniMap'].updateSize();

			setTimeout(() => {
				if(me.facilityCategorySelector != null) {
					me.facilityCategorySelector.destroy();
					me.facilityCategorySelector = null;
				}
				
				if(me.facilityStatusSelector != null) {
					me.facilityStatusSelector.destroy();
					me.facilityStatusSelector = null;
				}
				
				if(me.facilityCategorySelector == null) {
					let facilityCategorySelectorItems = [];
					me.enabledCategoryItems.forEach((item) => {
						facilityCategorySelectorItems.push({
							label: item.categoryName,
							value: item.ccode
						});
					});
					
					me.facilityCategorySelector = new tui.SelectBox('#facilityCategorySelector', {
						data: facilityCategorySelectorItems,
						autofocus: true,
						showIcon: true
					});
					
					me.facilityCategorySelector.on('change', (ev) => {
						var fname = (me.currentFacility.facilityName != null && me.currentFacility.facilityName.length > 0) ? me.currentFacility.facilityName : ev.curr.getLabel();
						me.currentFacilityCategory = me.getFacilityCategoryById(ev.curr.getValue());
						if (this.modeNew===true && me.currentFacilityCategory.properties.length > 1) {
							for (var key in me.currentFacilityCategory.properties) {
								if (//me.currentFacilityCategory.properties[key].valueId === "vmsUser" || 
									//me.currentFacilityCategory.properties[key].valueId === "vmsPw" ||
									me.currentFacilityCategory.properties[key].valueId === "mediaIp" ||
									//me.currentFacilityCategory.properties[key].valueId === "vmsRestPort" ||
									me.currentFacilityCategory.properties[key].valueId === "mediaPort") {
										me.currentFacility.properties[me.currentFacilityCategory.properties[key].valueId] = me.vmsConfig[me.currentFacilityCategory.properties[key].valueId];
								}
							}
						}
						
						me.$refs['newMiniMap'].updateNewSymbolName(fname, me.currentFacilityCategory.categorySymbol, me.currentFacilityCategory.categorySymbolRemovable == false ? 0 : 1);
			        	me.$refs['newMiniMap'].redraw();
					});
					
				}
				
				if(me.facilityStatusSelector == null) {
					me.facilityStatusSelector = new tui.SelectBox('#facilityStatus', {
						data: me.facilityStatusItems,
						autofocus: true,
						showIcon: true
					});
				}
				
				if(!me.modeNew) {
					for(var i=0; i<me.enabledCategoryItems.length; i++) {
						if(me.enabledCategoryItems[i].ccode == me.currentFacilityCategory.ccode) {
							me.facilityCategorySelector.select(i);
							break;
						}
					}
					
					
					for(var i=0; i<me.facilityStatusItems.length; i++) {
						if(me.facilityStatusItems[i].value == me.currentFacility.status) {
							me.facilityStatusSelector.select(i);
							break;
						}
					}
					
					me.$refs['newMiniMap'].addNewSymbolName([me.currentFacility.longitude, me.currentFacility.latitude], me.currentFacility.facilityName, me.currentFacility.facilityCategory.categorySymbol, me.currentFacility.facilityCategory.categorySymbolRemovable == false ? 0 : 1);
					me.$refs['newMiniMap'].setCenter([me.currentFacility.longitude, me.currentFacility.latitude]);
				} else {
					me.$refs['newMiniMap'].setNewSymbolProperties(me.enabledCategoryItems[0].categorySymbol, me.enabledCategoryItems[0].categorySymbolRemovable == false ? 0 : 1);
					me.$refs['newMiniMap'].setCenter([126.695906, 37.405324]);
				}
				
				me.$refs['newMiniMap'].redraw();	
				
			}, 200);
		},
		onCloseFacilityDialog: function() {
			// this.currentFacility = {};	// I don't konw why this line make some script error which is "TypeError: Cannot read property 'mediaIp' of undefined".
			// this.currentFacilityCategory = {};
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
		onFacilitySubmit: async function() {
			let me = this;
			this.currentFacility.facilityCategory = me.getFacilityCategoryById(me.facilityCategorySelector.getSelectedItem().getValue());
			this.currentFacility.status = this.facilityStatusSelector.getSelectedItem().getValue();
			this.currentFacility.enabled = this.facilityEnableSelector.getSelectedItem().getValue();

			if(this.currentFacility.longitude == null || this.currentFacility.longitude.length <= 0
					|| this.currentFacility.latitude == null || this.currentFacility.latitude.length <= 0) {
				this.error_message = this.$i18n.t("facility.popup.facility.lonlat_required");
				$('#alertFacilityError').show();
	        	setTimeout(function() {
	        		$('#alertFacilityError').hide();
	        	}, 2000);
	        	
				return;
			}

			$('#cover-spin').show(0);

			// start vms
			if(me.currentFacility.properties.mediaIp !== undefined && me.currentFacility.properties.mediaPort !== undefined) {
				// console.log(this.vmsConfig);
				// return;
				// vms login
				me.inodepURL = `http://${me.vmsConfig.vmsRestIp}:${me.vmsConfig.vmsRestPort}/api/`;
				// console.log(me.inodepURL);
				await axios.get(me.inodepURL + me.inodepLoginURL, 
					{
						headers: {
							"x-account-id": me.vmsConfig.vmsUser, 
							"x-account-pass": me.vmsConfig.vmsPw, 
							"x-account-group" : me.inodepGroup, 
							"x-license" : me.inodepLicense
						}
					}
				)
				.then(async res => {
					var resData = res.data.results;
					me.inodepAuthToken = resData.auth_token;
					me.inodepApiSerial = resData.api_serial;
					me.inodepUserSerial = resData.user_serial;
					me.inodepVmsId = resData.vms_id;
					// console.log(resData);

					// vms get device detail info
					await axios.get(me.inodepURL + `${me.inodepDeviceListURL+me.inodepUserSerial}/1?channel_type=media&dev_addr=${me.currentFacility.properties.mediaDevIp}`, 
						{
							headers : {
								"x-auth-token": me.inodepAuthToken, 
								"x-api-serial": me.inodepApiSerial
							}
						}
					)
					.then(async res => {
						if (res.data.results.tree.length === 0) {
							me.inodepBool = false;
							return;
						}
						var detailResData = res.data.results.tree[0];
						var urls = `${detailResData.vms_id}/${detailResData.dev_serial}/${detailResData.dch_ch}/${detailResData.dchm_serial}`
						me.currentFacility.properties.mediaVurixUrl = urls;
						// me.currentFacility.properties.vmsId = detailResData.vms_id;
						// me.currentFacility.properties.vmsDevSerial = detailResData.dev_serial;
						// me.currentFacility.properties.vmsCh = detailResData.dch_ch;
						// me.currentFacility.properties.vmsMedia = detailResData.dchm_serial;
						me.inodepBool = true;
					})
					.catch(async err => {
						console.log(err);
						me.inodepBool = false;
						return;
					});
				})
				.catch(async err => {
				console.log(err);
					me.inodepBool = false;
					return;
				});
				// vms logout
				await axios.delete(this.inodepURL+this.inodepLogoutURL, {headers:{"x-auth-token":this.inodepAuthToken}})
				.then(res=>{
					
				})
				.catch(err=>{
					console.log(err);
					me.inodepBool = false;
					return;
				});
			}
			// end vms

			// vms boolean verify
			// if (!me.inodepBool) {
			// 	$('#cover-spin').hide();
			// 	this.error_message = this.$i18n.t("facility.popup.facility.vms_checked");
			// 	$('#alertFacilityError').show();
			// 	setTimeout(function() {
			// 		$('#alertFacilityError').hide();
			// 	}, 2000);
			// 	return;
			// }
			// end vms boolean verify

			if(!this.modeNew) {
        		await axios.put(this.apiFacility, JSON.stringify(this.currentFacility), this.config)
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
        		await axios.post(this.apiFacility, JSON.stringify(this.currentFacility), this.config)
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
//		getFacilityList: function() {
//			var me = this;
//			
//			$('#cover-spin').show(0);
//			
//			this.$refs['viewMiniMap'].removeAllLayer();
//			me.facilityItems = [];
//			
//			axios.get(me.apiFacility)
//    		.then(res => {
//    			if(res != null && res.data != null) {
//    				for(var i=0; i < res.data.length; i++) {
//    					var obj = res.data[i];
//    					obj.facilityCategory.categorySymbolPath = '/api/facility/symbol/' + obj.facilityCategory.categorySymbol + '.png?removable=';
//    					if(obj.facilityCategory.categorySymbolRemovable == true) {
//    						obj.facilityCategory.categorySymbolPath += '1';
//    					} else {
//    						obj.facilityCategory.categorySymbolPath += '0';
//    					}
//    					
//    					me.facilityItems.push(obj);				
//    				}    				
//    			}
//    			
//    			this.$refs['viewMiniMap'].setFacility(me.filteredFacilityItems);
//    			$('#cover-spin').hide();
//    		})
//    		.catch(err => {
//    			$('#cover-spin').hide();    			
//    		});
//		},

		// paging구현
		getFacilityList: function() {
			var me = this;
			
			$('#cover-spin').show(0);
			
			this.$refs['viewMiniMap'].removeAllLayer();
			
			me.isActivePage = false;
			me.facilityItems = [];
			
			axios.get(me.apiFacilityPaging, {params: {
									size: this.size,
									page: (this.page - 1),
									enabled: false
									}})
    		.then(res => {    			
    			if(res != null && res.data != null) {
    				if (res.data.totalElements > 0)			// total element counts
							me.isActivePage = true;
					me.totalPage = res.data.totalPages;		// total pages
					me.page = res.data.number + 1;			// cur page
						
					let no = 0;    				
    				for(var i=0; i < res.data.numberOfElements; i++) {
    					var obj = res.data.content[i];
    					if (obj.facilityCategory != null && obj.facilityCategory != undefined) {
	    					obj.facilityCategory.categorySymbolPath = '/api/facility/symbol/' + obj.facilityCategory.categorySymbol + '.png?removable=';
	    					if(obj.facilityCategory.categorySymbolRemovable == true) {
	    						obj.facilityCategory.categorySymbolPath += '1';
	    					} else {
	    						obj.facilityCategory.categorySymbolPath += '0';
	    					}
    					}
    					
    					no = res.data.number * res.data.size + 1 + i;
    					obj.no = no;
    					
    					me.facilityItems.push(obj);				
    				}    				
    			}
    			
    			this.$refs['viewMiniMap'].setFacility(me.filteredFacilityItems);
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			$('#cover-spin').hide();    			
    		});
		},
		getFacilityListWithPageNo: function(p) {
			this.page = parseInt(p);
			this.getFacilityList();
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
			this.getFacilityStatusList();
			this.getCategoryList();
			this.getSymbolList(0);
			this.getSymbolList(1);
			this.getFacilityStatusList();
			this.getFacilityList();
			this.initVmsData();
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
			var target = me.filteredFacilityItems[index];
			
			axios.delete(this.apiFacility + "/" + target.fcode)
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
			$('#confirmOk').on('click', this.onConfirmCategoryDeleteOk);
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