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
	  			<h4 :style="mainTitleStyle()">{{ $t("user.my_account_title") }}</h4>
	  		</div>
	  		
	  		<img src="/static/images/title_bar.jpg" id="subPageTitleBar"/>
	  		
			<div class="row">
				<div class="col">
					<form id="myInfo" @submit.prevent="updateMyInfo()" class="col">
			    		<div class="sub-title">
					    	<span class="bold">{{ $t("user.my_account") }}</span>
			      			<button type="submit" class="round-btn blue-btn">{{$t("frontend.user.button.edit")}}</button>
		      			</div>
		      			<table class="table">
		      				<tr>
		      					<th>{{ $t("frontend.user.label.username") }}</th>
		      					<td><input type="text" v-model="myUsername" class="form-control popup-input" readonly/></td>
		      				</tr>
		      				<tr>
		      					<th>{{ $t("frontend.user.label.name") }}</th>
		      					<td><input type="text" v-model.trim="myName" class="form-control popup-input" required/></td>
		      				</tr>
		      				<tr>
		      					<th>{{ $t("frontend.user.label.email") }}</th>
		      					<td><input type="email" v-model.trim="myEmail" class="form-control popup-input" required/></td>
		      				</tr>
		      				<tr>
			  					<th>{{ $t("frontend.user.label.mobile") }}</th>
			  					<td><input type="text" v-model.trim="myMobilePhone" class="form-control popup-input" required/></td>
			  				</tr>
		      			</table>
					</form>
          		</div>
			</div>
			
			<div class="row">
				<div class="col">
					<form id="pass" @submit.prevent="updatePassword()" class="col">
						<div class="sub-title">
					    	<span class="bold">{{ $t("user.change_password") }}</span>
			      			<button type="submit" class="round-btn blue-btn">{{$t("frontend.user.button.edit")}}</button>
		      			</div>
		      			<table class="table">
		      				<tr>
		      					<th>{{ $t("frontend.user.label.password") }}</th>
		      					<td><input type="password" v-model.trim="pw1" class="form-control popup-input" required /></td>
		      				</tr>
		      				<tr>
		      					<th>{{ $t("frontend.user.label.check_password") }}</th>
		      					<td><input type="password" class="form-control popup-input" v-model.trim="pw2" required/></td>
		      				</tr>
		      			</table>
					</form>
                </div>
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

