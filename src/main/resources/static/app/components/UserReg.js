
import userregtemplate from './templates/UserReg.html.js'

export default Vue.component('UserReg', {
	template: userregtemplate,
	components: {
		
	},
	data: function () {
		return {
			api: '/api/users',
			pw1: '',
			pw2: '',
			cnfrmPswdFrmCreateValid: true,
            modeNew: true,
            currentItem: {},
            collectionView: {},
            pager: {},            
            roleSelector: null,
            enabledSelector: null,
            userGrid: null
		}
	},
	computed: {
		
	},
	watch: {
		pw2: function(){
			this.cnfrmPswdFrmCreateValid = this.pw1 != this.pw2 ? false : true;
        }
	},
	methods: {
		onDeleteUser: function(evt) {
			let me = this;
        	evt.preventDefault();
        	if(me.userGrid != null) {
				let cell = me.userGrid.getFocusedCell();
				if(cell != null && cell.rowKey != null) {
					let item = me.userGrid.getRow(cell.rowKey);
					$("#confirmContent").html(this.$i18n.t("user.confirm.delete.content"));
					$("#confirmTitle").html(this.$i18n.t("user.confirm.delete.title"));
					$("#confirmCancel").html(this.$i18n.t("button.cancel"));
					$("#confirmOk").html(this.$i18n.t("button.ok"));
					$("#confirmOk").removeClass('btn-primary');
					$("#confirmOk").addClass('btn-danger');
					
					$("#confirmOk").data('id', item.id);
					$("#confirmOk").data('op', 'delete');
					$("#confirmDialog").modal('toggle');
					$('#confirmOk').on('click', me.onConfirmOk);
				}
			}
        	
        },
		loadGrid: function() {
			let me = this;
			if(this.userGrid != null) {
				this.userGrid.destroy();
				this.userGrid = null;
			}
			
			class deleteButtonRenderer {
				constructor(props) {
//					const el = document.createElement('a');
//					el.href = "#";
//					el.onclick = me.onDeleteUser;
//					el.className = "text-secondary";
//					el.innerHTML = "<i class=\"fa fa-trash-alt\"></i>";
//					this.el = el;
//					this.render(props);
					
					const el = document.createElement('a');
					el.href = "#";
					el.onclick = me.onDeleteUser;
					el.className = "text-secondary";
					el.innerHTML = '<button type="button" class="round-btn yellow-btn">' + me.$i18n.t("button.del") + '</button>';
					this.el = el;
					this.render(props);
				};
				
				getElement() {
					return this.el;
				};
				 
				render(props) {
					 
				};
			};
			
			let Grid = tui.Grid;
			this.userGrid = new Grid({
				el: document.getElementById('userGrid'),
				data: {
					api: {
						readData: {
							url: me.api,
							method: 'GET'
						}
					}
				},
				scrollX: false,
				scrollY: false,
				pageOptions: {
					perPage: 20
				},
				selectionUnit: 'row',
				columns: [ 
					{
						header: 'ID',
						name: 'id',
						width: 60,
						align: 'center'
					},
					{
						header: me.$i18n.t("user.grid.header.username"),
						name: 'username',
						width: 140,
						align: 'center'
					},
					{
						header: me.$i18n.t("user.grid.header.name"),
						name: 'name',
						width: 140,
						align: 'center'
					},
					{
						header: me.$i18n.t("user.grid.header.role"),
						name: 'roles',
						formatter: function(value) {
							let roles = "";
							value.row.roles.forEach((item) => {
								roles += item.roleName;
								roles += ", ";
							});
							roles = $.trim(roles);
							return roles.slice(0, -1);
						},
						width: 160,
						align: 'center'
					},
					{
						header: me.$i18n.t("user.grid.header.email"),
						name: 'email',
						width: 200,
						align: 'center'
					},
					{
						header: me.$i18n.t("user.grid.header.mobile"),
						name: 'mobilePhone',
						width: 140,
						align: 'center'
					},
					{
						header: me.$i18n.t("user.grid.header.phone"),
						name: 'officePhone',
						width: 140,
						align: 'center'
					},
					{
						header: me.$i18n.t("user.grid.header.fax"),
						name: 'officeFax',
						width: 140,
						align: 'center'
					},
					{
						header: me.$i18n.t("user.grid.header.organization"),
						name: 'offorganizationiceFax',
						align: 'center'
					},
					{
						header: me.$i18n.t("user.grid.header.department"),
						name: 'department',
						width: 200,
						align: 'center'
					},
					{
						header: me.$i18n.t("user.grid.header.enabled"),
						name: 'enabled',
						width: 80,
						formatter: function(value) {
							if(value.row.enabled) {
								return me.$i18n.t("label.enabled");
							} else {
								return me.$i18n.t("label.disabled");
							}
						},
						align: 'center'
					},
					{
						header: me.$i18n.t("label.del"),
						name: '',
						width: 100,
						align: 'center',
						renderer: {
							type: deleteButtonRenderer
						}
					}
				]
			});
			
			this.userGrid.on('dblclick', (ev) => {
				if(me.userGrid != null) {
					let cell = me.userGrid.getFocusedCell();
					if(cell != null && cell.rowKey != null) {
						let item = me.userGrid.getRow(cell.rowKey);
						me.currentItem = $.extend(true, {}, item);
						me.onOpenDialog(false);
					}
					
				}
			});
			
			this.userGrid.on('click', (ev) => {
				if(me.userGrid != null) {
					const rowNum = me.userGrid.getRowCount();
					for(var i = 0; i < rowNum; i++) {
						me.userGrid.removeRowClassName(i, "focused-row");
					}
					
					let cell = me.userGrid.getFocusedCell();
					if(cell != null && cell.rowKey != null) {
						me.userGrid.addRowClassName(cell.rowKey, "focused-row");
					}
					
				}
			});
			
			this.userGrid.reloadData();
		},
        onCloseDialog: function() {
        	this.modeNew = true;
        	this.currentItem = {};
        	this.pw1 = '';
        	this.pw2 = '';
        },
        onOpenDialog: function(isNew) {
        	let me = this;
        	this.modeNew = isNew;
        	
        	if(this.modeNew) {
        		this.currentItem = $.extend(true, {}, {});
        		this.currentItem.roles = [];
        		this.enabledSelector.select(0);
        		this.roleSelector.set([]);
        	} else {
        		var roleIds = [];
        		for(var idx in this.currentItem.roles) {
        			roleIds.push(this.currentItem.roles[idx].roleId);
        		}
        		
        		this.roleSelector.set(roleIds);
        		if(this.currentItem.enabled) {
        			this.enabledSelector.select(0);
        		} else {
        			this.enabledSelector.select(1);
        		}
        	}
        	
        	$('#frmCreateAccount').modal('toggle');
        },
        initRoleControl : function() {
        	if(this.roleSelector != null) {
        		this.roleSelector.destroy();
        		this.roleSelector = null;
        	}
        	let roleData = [];
        	this.roleInfo.forEach((item) => {
        		roleData.push({
        			text: item.roleName,
        			value: item.roleId
        		});
        	});
        	this.roleSelector = new SlimSelect({
        		select: document.getElementById('roles'),
        		data: roleData,
        		placeholder: this.$i18n.t("user.popup.label.role")
        	});
        },
		onConfirmOk: function(e) {
			let me = this;
			
			let op = $(e.target).data('op');
			if(op == "delete") {
				$("#confirmDialog").modal('toggle');
				let id = $(e.target).data('id');
				
				$('#cover-spin').show(0);
				axios.delete(this.api+"/"+id, {},this.config)
        		.then(res => {
        			setTimeout(() => {
        				me.loadGrid();
            			me.initRoleControl();
        			}, 500);
        			$('#cover-spin').hide();
        		})
        		.catch(err => {
        			setTimeout(() => {
        				me.initRoleControl();
        			}, 500);
        			$('#cover-spin').hide();
        			$('#error_toast').toast('show');
        		});
				
			} else {
				$('#frmCreateAccount').modal('toggle');
				$("#confirmDialog").modal('toggle');
				
				$('#cover-spin').show(0);
				if(!this.modeNew) {
	        		axios.put(this.api, JSON.stringify(this.currentItem), this.config)
	        		.then(res => {
	        			setTimeout(() => {
	        				me.loadGrid();
	            			me.initRoleControl();
	        			}, 500);
	        			$('#cover-spin').hide();
	        		})
	        		.catch(err => {
	        			setTimeout(() => {
	        				me.initRoleControl();
	        			}, 500);
	        			$('#cover-spin').hide();
	        			$('#error_toast').toast('show');
	        		});
	        	} else {
	        		axios.post(this.api, JSON.stringify(this.currentItem), this.config)
	        		.then(res => {
	        			setTimeout(() => {
	        				me.loadGrid();
	            			me.initRoleControl();
	        			}, 500);
	        			$('#cover-spin').hide();
	        		})
	        		.catch(err => {
	        			setTimeout(() => {
	        				me.initRoleControl();
	        			}, 500);
	        			$('#cover-spin').hide();
	        			$('#error_toast').toast('show');
	        		});
	        	}
			}
		},
        onSubmit: function(){
        	var me = this;
        	
        	if(!this.cnfrmPswdFrmCreateValid) {
        		return;
        	}
        	
        	if(!this.modeNew) this.currentItem.password = '';
        	
        	if(this.pw1 != null && this.pw1.length > 0) {
        		this.currentItem.password = this.pw1;
        	}
        	
        	let roleIds = this.roleSelector.selected();
        	let removeIds = [];
        	this.currentItem.roles.forEach((item, index, object) => {
        		let idx = roleIds.indexOf(item.roleId);
        		if(idx == -1) {
        			removeIds.push(item.roleId);
        		} else {
        			roleIds.splice(idx, 1);
        		}
        	});
        	
        	this.roleInfo.forEach((item) => {
        		if(roleIds.includes(item.roleId)) {
        			this.currentItem.roles.push(item);
        		}
        	});
        	
        	removeIds.forEach((value) => {
        		let idx = this.currentItem.roles.findIndex((item) => {
        			return (item.roleId == value);
        		});
        		if(idx != -1) {
        			this.currentItem.roles.splice(idx, 1);
        		}
        	});
        	
        	this.currentItem.enabled = this.enabledSelector.getSelectedItem().value;
        	
        	if(this.modeNew) {
        		$("#confirmContent").html(this.$i18n.t("user.confirm.insert.content"));
				$("#confirmTitle").html(this.$i18n.t("user.confirm.insert.title"));
				$("#confirmCancel").html(this.$i18n.t("button.cancel"));
				$("#confirmOk").html(this.$i18n.t("button.ok"));
				$("#confirmOk").removeClass('btn-danger');
				$("#confirmOk").addClass('btn-primary');
        	} else {
        		$("#confirmContent").html(this.$i18n.t("user.confirm.update.content"));
				$("#confirmTitle").html(this.$i18n.t("user.confirm.update.title"));
				$("#confirmCancel").html(this.$i18n.t("button.cancel"));
				$("#confirmOk").html(this.$i18n.t("button.ok"));
				$("#confirmOk").removeClass('btn-danger');
				$("#confirmOk").addClass('btn-primary');
        	}
        	
        	$("#confirmDialog").modal('toggle');
			$('#confirmOk').on('click', this.onConfirmOk);
        },
		subStyle: function() {
			return 'background: url("/static/images/user_reg_bg.jpg") no-repeat; background-size: 100% 100%;';
		},
		mainTitleStyle: function() {
			return "color: #fd9b46;"
		}
	},
	created: function () {
		
	},
	mounted: function () {
		var me = this;
		
		this.initRoleControl();
		
		this.enabledSelector = new tui.SelectBox('#enabled', {
			data: this.enabledData,
			autofocus: true,
			showIcon: true
		});
		this.enabledSelector.select(0);
				
		this.$refs['username'].title = this.$i18n.t("user.popup.title.username");
		this.$refs['name'].title = this.$i18n.t("user.popup.title.name");
		this.$refs['password'].title = this.$i18n.t("user.popup.title.password");
		
		$('#frmCreateAccount').on('hidden.bs.modal', this.onCloseDialog);
		$('.toast').toast();
		
		let Grid = tui.Grid;
		Grid.setLanguage(me.$i18n.t("label.lang"));
		Grid.applyTheme('default', me.gridOption);
		
		this.loadGrid();
		
	}
});