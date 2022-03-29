
import topbartemplate from '../templates/common/topbar.html.js'

export default Vue.component('topbar', {
	template: topbartemplate,
	components: {
		
	},
	data: function () {
		return {
			passwordCheckedApi: '/api/mypassword',
			myapi: '/api/myinfo',
			config: { 
				headers: {
					'Content-Type': 'application/json'
				} 
			},
			mypassword: '',
			pw1: '',
			pw2: '',
			cnfrmMyPswdFrmValid: true,
			checkedPassword: false,
            currentItem: {},
            error_message: this.$i18n.t("message.error_invalid")
		}
	},
	computed: {
		
	},
	watch: {
		pw2: function(){
			this.cnfrmMyPswdFrmValid = this.pw1 != this.pw2 ? false : true;
        }
	},
	methods: {
		onOpenMyInfo : function() {
			$('#alertPassword').hide();
			$('#frmMyInfo').modal('toggle');
			
			if(!this.checkedPassword) {
				setTimeout(function() {
					$('#mypassword').focus();
				}, 500);
			}
		},
		onConfirmOk: function(e) {
			let me = this;
			
			$("#confirmDialog").modal('toggle');
			
			if(!this.cnfrmMyPswdFrmValid) {
        		return;
        	}
			
			$('#cover-spin').show(0);
			
			this.currentItem.password = '';
        	
        	if(this.pw1 != null && this.pw1.length > 0) {
        		this.currentItem.password = this.pw1;
        	}
			
        	axios.put(this.myapi, JSON.stringify(this.currentItem), this.config)
    		.then(res => {
    			$('#frmMyInfo').modal('toggle');
    			me.$store.dispatch('basic/FETCH_MYINFO');
    			$('#cover-spin').hide();
    		})
    		.catch(err => {
    			if (err.response) {
    			      me.error_message = err.response.data.message;
    			} else if (err.request) {
    			      me.error_message = err.request;
    			} else {
    			      me.error_message = err.message;
    			}
    			$('#alertMyEdit').show();
    			$('#cover-spin').hide();
    		});
		},
		onSubmit : function() {
			var me = this;
			if(this.checkedPassword) {
				
	        	$("#confirmContent").html(this.$i18n.t("myinfo.confirm.content"));
				$("#confirmTitle").html(this.$i18n.t("myinfo.confirm.title"));
				$("#confirmCancel").html(this.$i18n.t("button.cancel"));
				$("#confirmOk").html(this.$i18n.t("button.ok"));
				$("#confirmOk").removeClass('btn-danger');
				$("#confirmOk").addClass('btn-primary');
				
				$("#confirmDialog").modal('toggle');
				$('#confirmOk').on('click', this.onConfirmOk);
				
			} else {
				
				axios.post(this.passwordCheckedApi, me.mypassword, me.config)
	    		.then(res => {
	    			if(res != null && res.data != null) {
	    				if(res.data == "OK") {
	    					me.checkedPassword = true;   
	    					
	    					me.selectTab();
	            			
	            			$('#alertPassword').hide();
	            			
	            			this.currentItem = $.extend(true, {}, this.myInfo);;            				
	        				
	    				} else {
	    					me.error_message = res.data;
	            			$('#alertPassword').show();
	    				}
	    			} else {
	    				me.error_message = me.$i18n.t("message.error_invalid");
	        			$('#alertPassword').show();
	    			}
	    			$('#cover-spin').hide();
	    		})
	    		.catch(err => {
	    			me.error_message = me.$i18n.t("message.error_invalid");
	    			$('#alertPassword').show();
	    			$('#cover-spin').hide();
	    		});		
			}
		},
        onCloseDialog: function() {
        	$('#alertPassword').hide();
        	$('#alertMyEdit').hide();
        	this.checkedPassword = false;
        	this.selectTab();
        	this.currentItem = {};
        	this.pw1 = '';
        	this.pw2 = '';
        	this.mypassword = '';
        },
        selectTab: function() {
        	if(this.checkedPassword) {
        		$('#myEditPanel').tab('show');
        		$('#myPasswordPanel').removeClass('show active');
        	} else {
        		$('#myPasswordPanel').tab('show');
        		$('#myEditPanel').removeClass('show active');
        	}
        },
        createRoleSelector: function() {
        	if(this.roleInfo != null && this.roleInfo.length > 0) {
        		if(this.roleSelector == null) {
	        		let roleItemData = [];
	        		this.roleInfo.forEach((item) => {
	        			roleItemData.push({
	        				label: item.roleName,
	        				value: item.roleId
	        			});
	        		});
        		
        			this.roleSelector = new tui.SelectBox('#myroles', {
        				data: roleItemData,
        				autofocus: true,
        				showIcon: true
        			});
        			this.roleSelector.disable();
        		}
        	}
        }
	},
	created: function () {
		
	},
	mounted: function () {
		this.selectTab();
		$('#alertPassword').hide();
		$('#alertMyEdit').hide();
		$('#frmMyInfo').on('hidden.bs.modal', this.onCloseDialog);
		
		this.$refs['myusername'].title = this.$i18n.t("user.popup.title.username");
		this.$refs['myname'].title = this.$i18n.t("user.popup.title.name");
		this.$refs['mypassword'].title = this.$i18n.t("user.popup.title.password");
		this.$refs['mypassword2'].title = this.$i18n.t("user.popup.title.password");
	},
	updated: function() {
		let me = this;
		
		if(this.enabledData != null && this.enabledData.length > 0) {
    		if(this.enabledSelector == null) {
    			this.enabledSelector = new tui.SelectBox('#myenabled', {
    				data: this.enabledData,
    				autofocus: true,
    				showIcon: true
    			});
    			this.enabledSelector.disable();
    		}
    	}
    	
    	this.createRoleSelector();
    	
	}
});