export {template as default};

import headercomp from '../common/header.js'
import sidebarmenu from '../common/sidebarmenu.js'
import topbar from '../common/topbar.js'

const template = `
	<div class="wrapper" :style="subStyle()">
		<!--<headercomp></headercomp>-->
		
		<!-- Sidebar -->
	    <sidebarmenu></sidebarmenu>
	    <!-- /#sidebar-wrapper -->
	    	
	    <!-- Page Content -->
    	<div id="content">
      		
      		<div class="main-title">
	  			<h4 :style="mainTitleStyle()">{{ $t("user.account_management_title") }}</h4>
	  		</div>
  			
  			<img src="/static/images/title_bar.jpg" id="subPageTitleBar"/>
	      	
	      	<div class="container-fluid">
	      		<div class="row mt-5">
		    		<div class="col sub-title">
				    	<span class="bold">{{ $t("user.account_registry") }}</span>
		      			<button id="btnCreateAccount" class="round-btn blue-btn float-right" ref="btnCreateAccount" @click="onOpenDialog(true)">{{ $t("button.add") }}</button>
	      			</div>
	  			</div>
	      		<div class="text-center">
		        	<div id="userGrid"></div>
		        </div>
		        
		        <!-- Create Account form -->
		        <form id="frmCreateAccount" ref="frmCreateAccount"  class="modal fade" tabindex="-1" role="dialog" aria-labelledby="createAccountTitle" aria-hidden="true" @submit.prevent="onSubmit()">
		        	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		        		<div class="modal-content">
		        			<div class="modal-header">
        						<div class="modal-title font-weight-bold" id="createAccountTitle" v-if="modeNew == true">
        							{{ $t("user.popup.title.create") }}
        						</div>
        						<div class="modal-title font-weight-bold" id="createAccountTitle" v-else>
        							{{ $t("user.popup.title.edit") }}
        						</div>
        						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
          							<span aria-hidden="true">&times;</span>
        						</button>
      						</div>
      						<div class="modal-body">
      							<div class="row no-margin">
      								<div class="form-group col popup-contents-wrap">
		      							<fieldset class="popup-fieldset">
		      								<!-- <legend class="solid-border">{{ $t("label.required") }}</legend> -->
									        <div class="form-group row">
								                <label for="username" class="col-sm-2 col-form-label">{{ $t("user.popup.label.username") }}</label>
								                <div class="col-sm-4">
								                	<input id="username" ref="username" v-model="currentItem.username" class="form-control popup-input" required pattern=".{5,}" title='' :disabled="modeNew ? false : true" />
								                </div>
								                <label for="name" class="col-sm-2 col-form-label">{{ $t("user.popup.label.name") }}</label>
								                <div class="col-sm-4">
								                	<input id="name" ref="name" v-model="currentItem.name" class="form-control popup-input" required pattern=".{2,}" title='' />
								                </div>
											</div>
											<div class="form-group row">
								                <label for="password"  class="col-sm-2 col-form-label">{{ $t("user.popup.label.password") }}</label>
								                <div class="col-sm-4">
								                    <input id="password" ref="password" v-model="pw1" class="form-control popup-input" type="password" :required="modeNew ? true : false" pattern=".{8,}"  title="" />
								                </div>
								                <label for="confirm"  class="col-sm-2 col-form-label">{{ $t("user.popup.label.confirm_password") }}</label>
								                <div class="col-sm-4">
								                    <input id="confirm" v-model="pw2" class="form-control popup-input" type="password" :required="modeNew ? true : false" pattern=".{8,}" />
								                    <small :hidden="cnfrmPswdFrmCreateValid">
							                            {{ $t("user.popup.title.mismatch") }}
							                        </small>
								                </div>
											</div>
										</fieldset>
										<div class="pt-2"></div>
										<fieldset class="popup-fieldset">
		      								<!-- <legend class="solid-border">{{ $t("label.optional") }}</legend> -->
		      								<div class="form-group row">
								                <label for="roles"  class="col-sm-2 col-form-label">{{ $t("user.popup.label.role") }}</label>
								                <div class="col-sm-4">
													<select id="roles" multiple></select>
										        </div>
								                <label for="email"  class="col-sm-2 col-form-label">{{ $t("user.popup.label.email") }}</label>
								                <div class="col-sm-4">
								                    <input id="email" v-model="currentItem.email" class="form-control popup-input" type="email" />
								                </div>
											</div>
											<div class="form-group row">
								                <label for="mobilePhone" class="col-sm-2 col-form-label">{{ $t("user.popup.label.mobile") }}</label>
								                <div class="col-sm-4">
								                	<input id="mobilePhone" v-model="currentItem.mobilePhone" ref="mobilePhone" class="form-control popup-input" @keypress="isNumber($event)" />
								                </div>
								                <label for="officePhone" class="col-sm-2 col-form-label">{{ $t("user.popup.label.phone") }}</label>
								                <div class="col-sm-4">
								                	<input id="officePhone" ref="officePhone" v-model="currentItem.officePhone" class="form-control popup-input" @keypress="isNumber($event)" />
								                </div>
											</div>
											<div class="form-group row">
								                <label for="officeFax" class="col-sm-2 col-form-label">{{ $t("user.popup.label.fax") }}</label>
								                <div class="col-sm-4">
								                	<input id="officeFax" ref="officeFax" v-model="currentItem.officeFax" class="form-control popup-input" @keypress="isNumber($event)" />
								                </div>
								                <label for="organization" class="col-sm-2 col-form-label">{{ $t("user.popup.label.organization") }}</label>
								                <div class="col-sm-4">
								                	<input id="organization" ref="organization" v-model="currentItem.organization" class="form-control popup-input" />
								                </div>
											</div>
											<div class="form-group row">
								                <label for="department" class="col-sm-2 col-form-label">{{ $t("user.popup.label.department") }}</label>
								                <div class="col-sm-4">
								                	<input id="department" ref="department" v-model="currentItem.department" class="form-control popup-input" />
								                </div>
								                <label for="enabled" class="col-sm-2 col-form-label">{{ $t("user.popup.label.enabled") }}</label>
								                <div class="col-sm-4">
								                	<div id="enabled"></div>
								                </div>
											</div>
		      							</fieldset>
		      						</div>
		      					</div>
							</div>
							<div class="modal-footer">
			        			<button type="button" class="round-btn blue-btn" data-dismiss="modal">{{ $t("button.cancel") }}</button>
				                <button class="round-btn blue-btn" type="submit">{{ $t("button.ok") }}</button>
				            </div>
		        		</div>
		        	</div>
		        </form>
	      	</div>	
	      	
			<div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
				<!-- Then put toasts within -->
		  		<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="error_toast" data-delay="3000" data-autohide="false">
		    		<div class="toast-header">
		      			<img src="/static/icons/alert-circle.svg" class="rounded mr-2">
		      			<strong class="mr-auto">{{ $t("label.error") }}</strong>
		      			<small>&nbsp;</small>
		      			<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
		        			<span aria-hidden="true">&times;</span>
		      			</button>
		    		</div>
		    		<div class="toast-body">
		      		{{ $t("message.error") }}
		    		</div>
		  		</div>
			</div>

    	</div>
		<!-- /#page-content-wrapper -->
	</div>	
`;

