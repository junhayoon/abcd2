export {template as default};

import headercomp from '../common/header.js'
import sidebarmenu from '../common/sidebarmenu.js'
import topbar from '../common/topbar.js'
import minimap from '../map/minimap.js'
import addfield from '../common/addfield.js'

const template = `
	
	<div class="wrapper" :style="subStyle()">
		<!--<headercomp></headercomp>-->
		
		<!-- Sidebar -->
	    <sidebarmenu></sidebarmenu>
	    <!-- /#sidebar-wrapper -->

	    <!-- Page Content -->
    	<div id="content">
      		
      		<div class="main-title">
      			<h4 :style="mainTitleStyle()">{{ $t("facility.facility_workplace") }}</h4>
      		</div>
      		
      		<img src="/static/images/title_bar.jpg" id="subPageTitleBar"/>
			
			<br><br>
	      	<div class="container-fluid">
				<div class="d-inline-block sub-title bold" style="margin-right: 20px;">
						<span style="color:white; font-size : 30px" > FILTER </span>
				</div>
				<br><br>
			<div class="d-flex align-items-center" id="dashboardManagementFlexbox">
				<div>
					<input type="checkbox" v-model="airSensorToggle.isOpen" id="dashboard_all"/>
					<label for="dashboard_all" class="pointer">
							<div class="d-inline-block sub-title bold" style="margin-right: 20px;">
								<span>{{ $t("facility.label.workplace.filter.as") }}</span>
							</div>
					</label>
				</div>
				<div>
					<input type="checkbox" v-model="airCleanerToggle.isOpen" id="dashboard_air"/>
					<label for="dashboard_air" class="pointer">
							<div class="d-inline-block sub-title bold" style="margin-right: 20px;">
								<span>{{ $t("facility.label.workplace.filter.ac") }}</span>
							</div>						
					</label>
				</div>
				<div>
					<input type="checkbox" v-model="fireSensorToggle.isOpen" id="dashboard_drone"/>
					<label for="dashboard_drone" class="pointer">
							<div class="d-inline-block sub-title bold" style="margin-right: 20px;">
								<span>{{ $t("facility.label.workplace.filter.fs") }}</span>
							</div>							
					</label>
				</div>
				<div>
					<input type="checkbox"  v-model="gasSensorToggle.isOpen" id="dashboard_aircontrol"/>
					<label for="dashboard_aircontrol" class="pointer">
							<div class="d-inline-block sub-title bold" style="margin-right: 20px;">
								<span>{{ $t("facility.label.workplace.filter.gs") }}</span>
							</div>							
					</label>
				</div>
				
				<div>
					<label for="dashboard_aircontrol" class="pointer">
						<button id="btnSerachWorkplace" class="round-btn blue-btn float-right" ref="btnSerachWorkplace" @click="getWorkplaceList()">{{ $t("button.search") }}</button>				
					</label>
				</div>
			</div>
			
			<!--
			<div class="d-flex align-items-center" id="dashboardManagementFlexbox">
				<div>
					<input type="checkbox" v-model="system1Toggle.isOpen" id="system1Toggle"/>
					<label for="system1Toggle" class="pointer">
							<div class="d-inline-block sub-title bold" style="margin-right: 20px;">
								<span>{{ $t("facility.label.workplace.filter.sys01") }}</span>
							</div>
					</label>
				</div>
				<div>
					<input type="checkbox" v-model="system2Toggle.isOpen" id="system2Toggle"/>
					<label for="system2Toggle" class="pointer">
							<div class="d-inline-block sub-title bold" style="margin-right: 20px;">
								<span>{{ $t("facility.label.workplace.filter.sys02") }}</span>
							</div>						
					</label>
				</div>
				<div>
					<input type="checkbox" v-model="system3Toggle.isOpen" id="system3Toggle"/>
					<label for="system3Toggle" class="pointer">
							<div class="d-inline-block sub-title bold" style="margin-right: 20px;">
								<span>{{ $t("facility.label.workplace.filter.sys03") }}</span>
							</div>							
					</label>
				</div>				
				<div>
					<label for="dashboard_aircontrol" class="pointer">
						<button id="btnSerachWorkplace" class="round-btn blue-btn float-right" ref="btnSerachWorkplace" @click="getWorkplaceList()">{{ $t("button.search") }}</button>				
					</label>
				</div>
			</div>
			-->
		</div>
				<div class="mt-5" id="facility">
					<div class="row">
					    <div class="col">
					    	<div class="row">
					    		<div class="col sub-title">
							    	<span class="bold">{{ $t("facility.facility_workplace_list") }}</span>
					      			<button id="btnAddWorkplace" class="round-btn blue-btn float-right" ref="btnAddWorkplace" @click="onOpenWorkplaceDialog(-1)">{{ $t("button.add") }}</button>
				      			</div>
			      			</div>
					    	<div class="row">
								<div class="col">
							    	<table class="table table-hover">
										<thead>
											<tr>
												<th scope="col" style="text-align: center;">{{ $t("facility.label.workplace.id") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("facility.label.workplace.name") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("facility.label.workplace.addr") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("facility.label.workplace.tel") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("facility.label.workplace.gateway") }}</th>
											 	<th scope="col" style="text-align: center;">{{ $t("facility.label.workplace.sys01") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("facility.label.workplace.sys02") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("facility.label.workplace.sys03") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("facility.label.workplace.havingFacility") }}</th>
												<th scope="col" style="text-align: center;">{{ $t("facility.label.workplace.createDate") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("label.del") }}</th>
										    </tr>
										</thead>
										<tbody>
											<tr v-for="(item, index) in workplaceItems" v-bind:key="index" @dblclick="onOpenWorkplaceDialog(index)" @click="onSelectFacility(index)" v-bind:id="'workplace_' + index" class="pointer">
												<td>{{ item.id }}</td>
												<td>{{ item.workplaceName}}</td>
												<td>{{ item.workplaceAddr }}</td>
												<td>{{ item.workplaceTel }}</td>
												<td>{{ item.workplaceGateway }}</td>
												<td>
													<div v-if="item.airSensor">{{ $t("facility.label.workplace.facility.as") }}</div>
													<div v-if="item.airCleaner">{{ $t("facility.label.workplace.facility.ac") }}</div>
												</td>
												<td><div v-if="item.fireSensor">{{ $t("facility.label.workplace.facility.fs") }}</div></td>
												<td><div v-if="item.gasSensor">{{ $t("facility.label.workplace.facility.gs") }}</div></td>
												<td>
													<span v-if="item.airSensor">{{ $t("facility.label.workplace.facility.as") }}</span>
													<span v-if="item.airCleaner">{{ $t("facility.label.workplace.facility.ac") }}</span>
													<span v-if="item.fireSensor">{{ $t("facility.label.workplace.facility.fs") }}</span>
													<span v-if="item.gasSensor">{{ $t("facility.label.workplace.facility.gs") }}</span>						
												</td>
												<td>{{ item.createDateTime | dateStringFormat('YYYY-MM-DD') }}</td>
												<td style="text-align: center;">
													<a href="#" v-on:click.prevent="onDeleteFacility(index)" class="text-secondary">
														<button type="button" class="round-btn yellow-btn">{{ $t("button.del") }}</button>
													</a>
												</td>
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
									 	:click-handler="getWorkplaceListWithPageNo"
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
						
						<!-- Facility Dialog -->
				        <form id="frmFacility" ref="frmFacility" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="FacilityTitle" aria-hidden="true" @submit.prevent="onWorkplaceSubmit()">
				        	<div class="modal-dialog modal-dialog-centered modal-xl" role="document">
				        		<div class="modal-content">
				        			<div class="modal-header">
										<div class="modal-title font-weight-bold" id="WorkplaceTitle" v-if="modeNew">
											{{ $t("facility.popup.workplace.title") }}
										</div>
										<div class="modal-title font-weight-bold" id="WorkplaceTitle" v-else><i class="fa fa-edit"></i>&nbsp;{{ $t("facility.popup.facility.edit_title") }}</div>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  							<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
										<div class="row no-margin">
											<div class="form-group col popup-contents-wrap">
												<fieldset class="popup-fieldset" style="padding-top:10px;">
				      								<div class="form-group row" style="margin-bottom:10px;">
										                <label for="facilityName" class="col-sm-4 col-form-label"></label>
										                <div class="col-sm-8 bold">
										                	{{ $t("facility.popup.workplace.legend") }}
										                </div>
													</div>
													<div class="form-group row">
										                <label for="workplaceId" class="col-sm-4 col-form-label">{{ $t("facility.label.workplace.id") }}</label>
										                <div class="col-sm-8" v-if="modeNew == true">
										                	<input id="workplaceId" ref="workplaceId" v-model="currentWorkplace.id" class="form-control popup-input" required pattern=".{1,}" v-bind:title='$t("facility.popup.facility.name_required")' />
										                </div>
										                <div class="col-sm-8" v-if="modeNew == false">
										                	<div class="col-sm-8 d-flex align-items-center">{{ currentWorkplace.id }}</div>
										                </div>
													</div>
											        <div class="form-group row">
										                <label for="workplaceName" class="col-sm-4 col-form-label">{{ $t("facility.label.workplace.name") }}</label>
										                <div class="col-sm-8">
										                	<input id="workplaceName" ref="workplaceName" v-model="currentWorkplace.workplaceName" class="form-control popup-input" required pattern=".{2,}" v-bind:title='$t("facility.popup.facility.name_required")' />
										                </div>
													</div>
													<div class="form-group row">
										                <label for="workplaceAddr" class="col-sm-4 col-form-label">{{ $t("facility.label.workplace.addr") }}</label>
										                <div class="col-sm-8">
										                	<input id="workplaceAddr" ref="workplaceAddr" v-model="currentWorkplace.workplaceAddr" class="form-control popup-input" required pattern=".{2,}" v-bind:title='$t("facility.popup.facility.name_required")' />
										                </div>
													</div>
													<div class="form-group row">
										                <label for="workplaceTel" class="col-sm-4 col-form-label">{{ $t("facility.label.workplace.tel") }}</label>
										                <div class="col-sm-8">
										                	<input id="workplaceTel" ref="workplaceTel" v-model="currentWorkplace.workplaceTel" class="form-control popup-input" />
										                </div>
													</div>
													<div class="form-group row">
										                <label for="workplaceGateway" class="col-sm-4 col-form-label">{{ $t("facility.label.workplace.gateway") }}</label>
										                <div class="col-sm-8">
										                	<input id="workplaceGateway" ref="workplaceGateway" v-model="currentWorkplace.workplaceGateway" class="form-control popup-input" />
										                </div>
													</div>
													<div class="form-group row" v-if="modeNew == false">
										                <label class="col-sm-4 col-form-label">{{ $t("facility.label.workplace.creator") }}</label>
										                <div class="col-sm-8 d-flex align-items-center">{{ currentWorkplace.createUserName }}</div>
													</div>
													<div class="form-group row" v-if="modeNew == false">
										                <label class="col-sm-4 col-form-label">{{ $t("facility.label.workplace.createDate") }}</label>
										                <div class="col-sm-8 d-flex align-items-center">{{ currentWorkplace.createDateTime | dateString }}</div>
													</div>
													<div class="form-group row" v-if="modeNew == false">
										                <label class="col-sm-4 col-form-label">{{ $t("facility.label.workplace.updater") }}</label>
										                <div class="col-sm-8 d-flex align-items-center">{{ currentWorkplace.updateUserName }}</div>
													</div>
													<div class="form-group row" v-if="modeNew == false">
										                <label class="col-sm-4 col-form-label">{{ $t("facility.label.workplace.updateDate") }}</label>
										                <div class="col-sm-8 d-flex align-items-center">{{ currentWorkplace.updateDateTime | dateString }}</div>
													</div>
												</fieldset>
												<div class="pt-2"></div>
												<fieldset class="popup-fieldset">
				      								<!-- <legend class="solid-border">{{ $t("facility.popup.facility.option") }}</legend> -->
				      								<div v-for="(item, index) in currentFacilityCategory.properties" v-bind:key="index">
										            	<div class="form-group row">
										                	<label class="col-sm-4 col-form-label">{{ item.valueName }}</label>
										                	<div class="col-sm-8">
										                		<input v-model="currentFacility.properties[item.valueId]" class="form-control popup-input" v-bind:required="item.valueRequired" />
										                	</div>
														</div>
										            </div>
				      							</fieldset>
											</div>
											<div class="form-group col popup-contents-wrap">
												
											</div>
										</div>
										<div class="alert alert-danger mt-2" role="alert" id="alertFacilityError">{{ error_message }}</div>
									</div>
									<div class="modal-footer">
					        			<button type="button" class="round-btn blue-btn" data-dismiss="modal">{{ $t("button.cancel") }}</button>
						                <button type="submit" class="round-btn blue-btn">{{ $t("button.ok") }}</button>
						            </div>
				        		</div>
				        	</div>
				        </form>
					</div>
				</div>
	      	</div>
	      	
    	</div>
		<!-- /#page-content-wrapper -->
	</div>
`;

