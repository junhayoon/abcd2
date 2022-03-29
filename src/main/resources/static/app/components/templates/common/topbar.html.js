export {template as default};

const template = `
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<span v-if="$router.currentRoute.name == 'Facility'"><i class="fas fa-cogs"></i>&nbsp;&nbsp;<strong>{{ $t("frontend.menu.facility_management") }}</strong></span>
			<span v-else-if="$router.currentRoute.name == 'Media'"><i class="fas fa-images"></i>&nbsp;&nbsp;<strong>{{ $t("frontend.menu.media_management") }}</strong></span>
			<span v-else-if="$router.currentRoute.name == 'NotiHistory'"><i class="fas fa-images"></i>&nbsp;&nbsp;<strong>{{ $t("frontend.menu.media_management") }}</strong></span>
			<span v-else-if="$router.currentRoute.name == 'AirWorkplace'"><i class="fas fa-chart-area"></i>&nbsp;&nbsp;<strong>{{ $t("frontend.menu.air_sensor_workplace") }}</strong></span>
			<span v-else-if="$router.currentRoute.name == 'AirStation'"><i class="fas fa-chart-area"></i>&nbsp;&nbsp;<strong>{{ $t("frontend.menu.air_sensor_workplace") }}</strong></span>
			<span v-else-if="$router.currentRoute.name == 'User'"><i class="fas fa-users-cog"></i>&nbsp;&nbsp;<strong>{{ $t("frontend.menu.user_management") }}</strong></span>
			<span v-else-if="$router.currentRoute.name == 'UserReg'"><i class="fas fa-users-cog"></i>&nbsp;&nbsp;<strong>{{ $t("frontend.menu.user_management") }}</strong></span>

			
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
	    		<ul class="nav navbar-nav ml-auto">
	    			<li class="nav-item">
						  <!--<a class="nav-link" href="#" @click="onOpenMyInfo()">{{myInfo.name}}&nbsp;&nbsp;<img src="/static/icons/person.svg" style="margin-left: 5px; width:32px; height:32px"></img></a>-->
						  <a class="nav-link" href="#">{{myInfo.name}}&nbsp;&nbsp;<img src="/static/icons/person.svg" style="margin-left: 5px; width:32px; height:32px"></img></a>
	            	</li>	            	
	    			<li class="nav-item">
	              		<a class="nav-link" href="/logout">{{ $t("button.logout") }}&nbsp;<img src="/static/icons/box-arrow-right.svg" style="margin-left: 5px; width:32px; height:32px"></img></a>
	            	</li>
	          	</ul>
	    	</div>
	    	
	  		<!-- My Info -->
	        <form id="frmMyInfo" ref="frmMyInfo"  class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myInfoTitle" aria-hidden="true" @submit.prevent="onSubmit()">
	        	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
	        		<div class="modal-content">
	        			<div class="modal-header">
							<div class="modal-title font-weight-bold" id="myInfoTitle"><i class="fa fa-user"></i>&nbsp;{{ $t("user.popup.title.myinfo") }}</div>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
	  							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body" role="tablist">
							<div class="tab-content" id="myInfoTab">
								<div id="myPasswordPanel" class="tab-pane fade" role="tabpanel" aria-labelledby="password-tab">
									<div class="align-middle" style="display: flex; justify-content: center; align-items: center;">
										<div class="form-group">
											<label for="mypassword">{{ $t("user.popup.label.myinfoPassword") }}</label>
	    									<input type="password" v-model="mypassword" class="form-control" ref="mypassword" id="mypassword" pattern=".{4,}" autofocus title='' />
	    									<div class="alert alert-danger mt-2" role="alert" id="alertPassword">{{ error_message }}</div>
										</div>
									</div>
								</div>
								<div id="myEditPanel" class="tab-pane fade" role="tabpanel" aria-labelledby="edit-tab">
									<fieldset class="solid-border">
										<legend class="solid-border">{{ $t("label.required") }}</legend>
								        <div class="form-group row">
							                <label for="myusername" class="col-sm-3 col-form-label">{{ $t("user.popup.label.username") }}</label>
							                <div class="col-sm-3">
							                	<input id="myusername" ref="myusername" v-model="currentItem.username" class="form-control" :required="checkedPassword ? true : false"  pattern=".{5,}" :disabled="true" title='' />
							                </div>
							                <label for="myname" class="col-sm-3 col-form-label">{{ $t("user.popup.label.name") }}</label>
							                <div class="col-sm-3">
							                	<input id="myname" ref="myname" v-model="currentItem.name" class="form-control" :required="checkedPassword ? true : false" pattern=".{2,}" title='' />
							                </div>
										</div>
										<div class="form-group row">
							                <label for="mypassword2"  class="col-sm-3 col-form-label">{{ $t("user.popup.label.password") }}</label>
							                <div class="col-sm-3">
							                    <input id="mypassword2" ref="mypassword2" v-model="pw1" class="form-control" type="password" pattern=".{8,}"  title="" />
							                </div>
							                <label for="myconfirm"  class="col-sm-3 col-form-label">{{ $t("user.popup.label.confirm_password") }}</label>
							                <div class="col-sm-3">
							                    <input id="myconfirm" v-model="pw2" class="form-control" type="password" pattern=".{8,}" />
							                    <small :hidden="cnfrmMyPswdFrmValid">
						                            {{ $t("user.popup.title.mismatch") }}
						                        </small>
							                </div>
										</div>
									</fieldset>
									<fieldset class="solid-border">
										<legend class="solid-border">{{ $t("label.optional") }}</legend>
										<div class="form-group row">
							                <label for="myroles"  class="col-sm-3 col-form-label">{{ $t("user.popup.label.role") }}</label>
							                <div class="form-group col-sm-3">
												<div id="myroles"></div>
									        </div>
							                <label for="myemail"  class="col-sm-3 col-form-label">{{ $t("user.popup.label.email") }}</label>
							                <div class="col-sm-3">
							                    <input id="myemail" v-model="currentItem.email" class="form-control" type="email" />
							                </div>
										</div>
										<div class="form-group row">
							                <label for="mymobilePhone" class="col-sm-3 col-form-label">{{ $t("user.popup.label.mobile") }}</label>
							                <div class="col-sm-3">
							                	<input id="mymobilePhone" v-model="currentItem.mobilePhone" ref="mymobilePhone" class="form-control" @keypress="isNumber($event)" />
							                </div>
							                <label for="myofficePhone" class="col-sm-3 col-form-label">{{ $t("user.popup.label.phone") }}</label>
							                <div class="col-sm-3">
							                	<input id="myofficePhone" ref="myofficePhone" v-model="currentItem.officePhone" class="form-control" @keypress="isNumber($event)" />
							                </div>
										</div>
										<div class="form-group row">
							                <label for="myofficeFax" class="col-sm-3 col-form-label">{{ $t("user.popup.label.fax") }}</label>
							                <div class="col-sm-3">
							                	<input id="myofficeFax" ref="myofficeFax" v-model="currentItem.officeFax" class="form-control" @keypress="isNumber($event)" />
							                </div>
							                <label for="myorganization" class="col-sm-3 col-form-label">{{ $t("user.popup.label.organization") }}</label>
							                <div class="col-sm-3">
							                	<input id="myorganization" ref="myorganization" v-model="currentItem.organization" class="form-control" />
							                </div>
										</div>
										<div class="form-group row">
							                <label for="mydepartment" class="col-sm-3 col-form-label">{{ $t("user.popup.label.department") }}</label>
							                <div class="col-sm-3">
							                	<input id="mydepartment" ref="mydepartment" v-model="currentItem.department" class="form-control" />
							                </div>
							                <label for="myenabled" class="col-sm-3 col-form-label">{{ $t("user.popup.label.enabled") }}</label>
							                <div class="col-sm-3">
							                	<div id="myenabled"></div>
							                </div>
										</div>
									</fieldset>
									<div class="alert alert-danger mt-2" role="alert" id="alertMyEdit">{{ error_message }}</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
		        			<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">{{ $t("button.cancel") }}</button>
			                <button class="btn btn-outline-primary" type="submit">{{ $t("button.ok") }}</button>
			            </div>
	        		</div>
	        	</div>
	        </form>
			
		</div>
	</nav>
`;

