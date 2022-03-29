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
	  			<h4 :style="mainTitleStyle()">{{ $t("notification.notification_title") }}</h4>
	  		</div>
	  		
	  		<img src="/static/images/title_bar.jpg" id="subPageTitleBar"/>
      		
	  		<div class="container-fluid">
				<div class="row" style="margin-top:30px; margin-bottom:30px;">
					<div class="col">
						<div class="d-inline-block sub-title bold" style="margin-right: 20px;">
							<span>{{ $t("notification.history.tab_history.search_range") }}</span>
						</div>
						<div class="d-inline-block searchBar">
							<div class="d-flex align-items-center">
								<div class="d-inline-block dateBox" style="margin-right: 60px;">
									<v-date-picker v-model="startDateTime" mode="dateTime" is24hr>
										<template v-slot="{ inputValue, inputEvents }">
											<input
												class="px-2 focus:outline-none focus:border-blue-300 dateInput"
												:value="inputValue"
												v-on="inputEvents"
											/>
										</template>
									</v-date-picker>
									&nbsp; ~ &nbsp;  
									<v-date-picker v-model="endDateTime" mode="dateTime" is24hr>
										<template v-slot="{ inputValue, inputEvents }">
											<input
												class="px-2 focus:outline-none focus:border-blue-300 dateInput"
												:value="inputValue"
												v-on="inputEvents"
											/>
										</template>
									</v-date-picker>
								</div>
								<div class="d-inline-block" style="margin-right: 60px;">
									<multiselect
										v-model="levelForSearch"
										:options="levelList"
										placeholder="All Levels"
										label="name"
										track-by="level"
										@select="onSelectLevelForSearch"
										@remove="removeLevelForSearch"
									></multiselect>
								</div>
								<div class="d-inline-block" style="margin-right: 30px;">
									<multiselect
										v-model="notiForSearch"
										:options="facilityList"
										placeholder="All Facilities"
										label="facilityName"
										track-by="id"
										@select="onSelectNotiForSearch"
										@remove="removeNotiForSearch"
									></multiselect>
								</div>
								<div class="d-inline-block">
									<button
										id="search"
										class="round-btn blue-btn"
										@click.prevent="getNotiHistoryWithPageNo(1)"
									>{{ $t("notification.history.tab_history.btn_search") }}</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="row">
				    		<div class="col sub-title">
						    	<span class="bold">{{ $t("notification.notification_history") }}</span>
			      			</div>
			  			</div>
	                    <table class="table table-hover">
	                        <thead>
	                            <tr>
									<th scope="col" class="align-middle" style="text-align: center;">No</th>
									<th scope="col" class="align-middle" style="text-align: center;">{{ $t("notification.history.tab_history.seq") }}</th>
									<th scope="col" style="text-align: center;">{{ $t("notification.history.tab_history.level") }}</th>
									<th scope="col" class="align-middle" style="text-align: center;">{{ $t("notification.history.tab_history.info") }}</th>
									<th scope="col" class="align-middle" style="text-align: center;">{{ $t("notification.history.tab_history.facil_name") }}</th>
									<th scope="col" class="align-middle" style="text-align: center;">{{ $t("notification.history.tab_history.facil_category") }}</th>
									<th scope="col" class="align-middle" style="text-align: center;">{{ $t("notification.history.tab_history.recv_date") }}</th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                        	
								<tr v-for="(item, index) in notiList" v-bind:key="item.seq">
									<td align="center">{{ item.no }}</td>
									<td align="center">{{ item.seq }}</td>
									
									<td style="text-align: center;"><span><img v-bind:src="transNotiLevelToIcon(item.level)" class="icons-s"></img></span>&nbsp;{{transNotiLevelToString(item.level)}}</td>
									<td align="center">{{ item.info }}</td>
									<td>{{ item.facility.facilityName }}</td>
									<td align="center"><img v-bind:src="getCategorySymbolPath(item)" class="symbolitem-s rounded" v-bind:title="item.facility.facilityCategory.categoryName"></img></td>
									<td align="center">{{ item.create_date | dateString }}
								</tr>
								
								<tr v-if="notiList.length === 0 && showNoData">
									<td colspan="7">{{ $t("label.no_data") }}</td>
								</tr>
								
	                        </tbody>
	                    </table>
	                </div>
				</div>
				<div class="row">
					<div class="col">
						<paginate
							v-model="page"
						 	:page-count="totalPage"
						 	:page-range="3"
						 	:margin-pages="2"
						 	:click-handler="getNotiHistoryWithPageNo"
						 	:container-class="{'pagination':isActivePage, 'pagination-none':!isActivePage }" 
						 	:prev-text="'Prev'"
						 	:next-text="'Next'"
						 	:page-class="'page-item'"
	                        :page-link-class="'page-link'"
	                        :next-class="'page-item'"
	                        :next-link-class="'page-link'"
	                        :prev-class="'page-item'"
	                        :prev-link-class="'page-link'">
						</paginate>
	                </div>
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

