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
      			<h4 :style="mainTitleStyle()">{{ $t("facility.facility_title") }}</h4>
      		</div>
      		
      		<img src="/static/images/title_bar.jpg" id="subPageTitleBar"/>

	      	<div class="container-fluid">
				<div class="mt-5" id="facility">
					<div class="row">
					    <div class="col">
					    	<div class="row">
					    		<div class="col sub-title">
							    	<span class="bold">{{ $t("facility.facility_list") }}</span>
					      			<button id="btnAddFacility" class="round-btn blue-btn float-right" ref="btnAddFacility" @click="onOpenFacilityDialog(-1)">{{ $t("button.add") }}</button>
				      			</div>
			      			</div>
					    	<div class="row">
								<div class="col">
							    	<table class="table table-hover">
										<thead>
											<tr>
												<th scope="col" class="align-middle" style="text-align: center;">No</th>
												<th scope="col" style="text-align: center;">{{ $t("facility.label.category.symbol") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("facility.label.facility.category") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("facility.label.facility.fcode") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("facility.label.facility.name") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("facility.label.facility.status") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("facility.label.facility.enable") }}</th>
										      	<!-- <th scope="col" style="text-align: center;">IP</th> -->
										      	<!-- <th scope="col" style="text-align: center;">{{ $t("facility.label.facility.mobius") }}</th>-->
										      	<th scope="col" style="text-align: center;">{{ $t("facility.label.facility.createDate") }}</th>
										      	<th scope="col" style="text-align: center;">{{ $t("label.del") }}</th>
										    </tr>
										</thead>
										<tbody>
											<tr v-for="(item, index) in filteredFacilityItems" v-bind:key="index" @dblclick="onOpenFacilityDialog(index)" @click="onSelectFacility(index)" v-bind:id="'facility_' + index" class="pointer">
												<td align="center">{{ item.no }}</td>
												<td scope="row"><img v-bind:src="item.facilityCategory.categorySymbolPath" class="symbolitem-m rounded" v-bind:title="item.facilityCategory.categorySymbol"></img></td>
												<td>{{ item.facilityCategory.categoryName }}</td>
												<td>{{ item.fcode}}</td>
												<td>{{ item.facilityName }}</td>
												<td>{{ getStatusName(item.status) }}</td>
										      	<td style="text-align: center;">
										      		<div>
														<input type="checkbox" class="form-check-input" :id="'isFacilityEnabled' + item.id" disabled :checked="item.enabled ? true : false">
														<label :for="'isFacilityEnabled' + item.id"></label>
													</div>
												</td>
												<!-- <td>{{ item.properties.mediaDevIp }}</td> -->
												<!-- <td>{{ item.mobiusId }}</td> -->
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
									 	:click-handler="getFacilityListWithPageNo"
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
						<div class="col col-sm-4">
							<minimap mode="view" target="viewMiniMap" ref="viewMiniMap"></minimap>
						</div>
						
						<!-- Facility Dialog -->
				        <form id="frmFacility" ref="frmFacility" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="FacilityTitle" aria-hidden="true" @submit.prevent="onFacilitySubmit()">
				        	<div class="modal-dialog modal-dialog-centered modal-xl" role="document">
				        		<div class="modal-content">
				        			<div class="modal-header">
										<div class="modal-title font-weight-bold" id="FacilityTitle" v-if="modeNew">
											{{ $t("facility.popup.facility.title") }}
										</div>
										<div class="modal-title font-weight-bold" id="FacilityTitle" v-else><i class="fa fa-edit"></i>&nbsp;{{ $t("facility.popup.facility.edit_title") }}</div>
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
										                	{{ $t("facility.popup.facility.legend") }}
										                </div>
													</div>
													<div class="form-group row">
										                <label for="facilityName" class="col-sm-4 col-form-label">{{ $t("facility.label.facility.fcode") }}</label>
										                <div class="col-sm-8" v-if="modeNew == true">
										                	<input id="facilityFcode" ref="facilityFcode" v-model="currentFacility.fcode" class="form-control popup-input" required pattern=".{2,}" v-bind:title='$t("facility.popup.facility.name_required")' />
										                </div>
										                <div class="col-sm-8" v-if="modeNew == false">
										                	<div class="col-sm-8 d-flex align-items-center">{{ currentFacility.fcode }}</div>
										                </div>
													</div>
											        <div class="form-group row">
										                <label for="facilityName" class="col-sm-4 col-form-label">{{ $t("facility.label.facility.name") }}</label>
										                <div class="col-sm-8">
										                	<input id="facilityName" ref="facilityName" v-model="currentFacility.facilityName" class="form-control popup-input" required pattern=".{2,}" v-bind:title='$t("facility.popup.facility.name_required")' />
										                </div>
													</div>
													<div class="form-group row">
										                <label for="facilityCategorySelector" class="col-sm-4 col-form-label">{{ $t("facility.label.facility.category") }}</label>
										                <div class="col-sm-8">
										                	<div id="facilityCategorySelector"></div>
										                </div>
													</div>
													<div class="form-group row">
										                <label for="mobiusId" class="col-sm-4 col-form-label">{{ $t("facility.label.facility.mobius") }}</label>
										                <div class="col-sm-8">
										                	<input id="mobiusId" ref="mobiusId" v-model="currentFacility.mobiusId" class="form-control popup-input" />
										                </div>
													</div>
													<div class="form-group row">
										                <label for="facilityStatus" class="col-sm-4 col-form-label">{{ $t("facility.label.facility.status") }}</label>
										                <div class="col-sm-8">
										                	<div id="facilityStatus"></div>
										                </div>
													</div>
													<div class="form-group row">
										                <label for="facilityLatitude" class="col-sm-4 col-form-label">{{ $t("facility.label.facility.latitude") }}</label>
										                <div class="col-sm-8">
										                	<input id="facilityLatitude" ref="facilityLatitude" v-model="currentFacility.latitude" class="form-control popup-input" />
										                </div>
													</div>
													<div class="form-group row">
										                <label for="facilityLongitude" class="col-sm-4 col-form-label">{{ $t("facility.label.facility.longitude") }}</label>
										                <div class="col-sm-8">
										                	<input id="facilityLongitude" ref="facilityLatitude" v-model="currentFacility.longitude" class="form-control popup-input" />
										                </div>
													</div>
													<div class="form-group row">
										                <label for="facilityAddress" class="col-sm-4 col-form-label">{{ $t("facility.label.facility.addr") }}</label>
										                <div class="col-sm-8">
										                	<input id="facilityAddress" ref="facilityAddress" v-model="currentFacility.addr" class="form-control popup-input" />
										                </div>
													</div>
													<div class="form-group row">
										                <label for="facilityEnable" class="col-sm-4 col-form-label">{{ $t("facility.label.facility.enable") }}</label>
										                <div class="col-sm-8">
										                	<div id="facilityEnable"></div>
										                </div>
													</div>
													<div class="form-group row" v-if="modeNew == false">
										                <label class="col-sm-4 col-form-label">{{ $t("facility.label.facility.creator") }}</label>
										                <div class="col-sm-8 d-flex align-items-center">{{ currentFacility.createUserName }}</div>
													</div>
													<div class="form-group row" v-if="modeNew == false">
										                <label class="col-sm-4 col-form-label">{{ $t("facility.label.facility.createDate") }}</label>
										                <div class="col-sm-8 d-flex align-items-center">{{ currentFacility.createDateTime | dateString }}</div>
													</div>
													<div class="form-group row" v-if="modeNew == false">
										                <label class="col-sm-4 col-form-label">{{ $t("facility.label.facility.updater") }}</label>
										                <div class="col-sm-8 d-flex align-items-center">{{ currentFacility.updateUserName }}</div>
													</div>
													<div class="form-group row" v-if="modeNew == false">
										                <label class="col-sm-4 col-form-label">{{ $t("facility.label.facility.updateDate") }}</label>
										                <div class="col-sm-8 d-flex align-items-center">{{ currentFacility.updateDateTime | dateString }}</div>
													</div>
													<template v-if="currentAirSensorInfo">
														<div class="form-group row" v-if="modeNew == false">
											                <label class="col-sm-4 col-form-label">{{ $t("facility.label.facility.purifierPower") }}</label>
											                <div class="col-sm-8 d-flex align-items-center">{{ currentAirSensorInfo.unit === 0 ? $t("label.power_off") : $t("label.power_on") }}</div>
														</div>
														<div class="form-group row" v-if="modeNew == false">
											                <label class="col-sm-4 col-form-label">{{ $t("facility.label.facility.purifierMotorPower") }}</label>
											                <div class="col-sm-8 d-flex align-items-center">
											                	{{ currentAirSensorInfo.unit === 1 ? $t("label.power_low")
											                	: currentAirSensorInfo.unit === 2 ? $t("label.power_middle")
											                	: currentAirSensorInfo.unit === 3 ? $t("label.power_high") : $t("label.power_off") }}
											                </div>
														</div>
														<div class="form-group row" v-if="modeNew == false">
											                <label class="col-sm-4 col-form-label">{{ $t("facility.label.facility.filter") }}</label>
											                <div class="col-sm-8 d-flex align-items-center">{{ currentAirSensorInfo.alarm > 99 ? $t("label.filter_error") : $t("label.normal") }}</div>
														</div>
														<div class="form-group row" v-if="modeNew == false">
											                <label class="col-sm-4 col-form-label">{{ $t("facility.label.facility.motor") }}</label>
											                <div class="col-sm-8 d-flex align-items-center">
											                	{{ 10 > currentAirSensorInfo.alarm && currentAirSensorInfo.alarm > 0 ? $t("label.error") : $t("label.normal") }}
											                </div>
														</div>
													</template>
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
												<minimap mode="new" target="newMiniMap" ref="newMiniMap"></minimap>
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

