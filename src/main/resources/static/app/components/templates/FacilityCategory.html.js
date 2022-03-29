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
	  			<h4 :style="mainTitleStyle()">{{ $t("facility.facility_category_title") }}</h4>
	  		</div>
	  		
	  		<img src="/static/images/title_bar.jpg" id="subPageTitleBar"/>

	      	<div class="container-fluid">
				<div class="mt-5" id="facilityCategory">
					<div class="row">
					    <div class="col">
					    	<fieldset>
								<div class="row">
						    		<div class="col sub-title">
								    	<span class="bold">{{ $t("facility.facility_category") }}</span>
						      			<button id="btnAddSymbol" ref="btnAddSymbol" class="round-btn blue-btn float-right" @click="onOpenCategoryDialog(-1)">{{ $t("button.add") }}</button>
					      			</div>
				      			</div>
  								<div class="overflow-auto">
									<table class="table table-hover">
										<thead>
											<tr>
												<th scope="col-sm" style="text-align: center;">{{ $t("facility.label.category.symbol") }}</th>
												<th scope="col-2" style="text-align: center;">{{ $t("facility.label.category.code") }}</th>
										      	<th scope="col-auto" style="text-align: center;">{{ $t("facility.label.category.name") }}</th>
										      	<th scope="col-2" style="text-align: center;">{{ $t("facility.label.category.enable") }}</th>
										      	<th scope="col-2" style="text-align: center;">{{ $t("facility.label.category.creator") }}</th>
										      	<th scope="col-2" style="text-align: center;">{{ $t("facility.label.category.createDate") }}</th>
										      	<th scope="col-2" style="text-align: center;">{{ $t("label.del") }}</th>
										    </tr>
										</thead>
										<tbody>
											<tr v-for="(item, index) in categoryItems" v-bind:key="index" @dblclick="onOpenCategoryDialog(index)" @click="onSelectCategory($event)" class="pointer">
												<td scope="row"><img v-bind:src="item.categorySymbolPath" class="symbolitem rounded" v-bind:title="item.categorySymbol"></img></td>
												<td>{{ item.ccode }}</td>
												<td>{{ item.categoryName }}</td>
										      	<td style="text-align: center;">
										      		<div>
														<input type="checkbox" class="form-check-input" :id="'isFacilityEnabled' + item.id" disabled :checked="item.enabled ? true : false">
														<label :for="'isFacilityEnabled' + item.id"></label>
													</div>
												</td>
												<td>{{ item.createUser.name }}</td>
												<td>{{ item.createDateTime | dateStringFormat('YYYY-MM-DD') }}</td>
												<td style="text-align: center;">
													<a href="#" v-on:click.prevent="onDeleteFacilityCategory(index)" class="text-secondary">
														<!-- <i class="fa fa-trash-alt"></i> -->
														<button type="button" class="round-btn yellow-btn">{{ $t("button.del") }}</button>
													</a>
												</td>
										    </tr>
										</tbody>
									</table>
								</div>
							</fieldset>	
							
							<!-- Category Dialog -->
					        <form id="frmCategory" ref="frmCategory"  class="modal fade" tabindex="-1" role="dialog" aria-labelledby="categoryTitle" aria-hidden="true" @submit.prevent="onCategorySubmit()">
					        	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
					        		<div class="modal-content">
					        			<div class="modal-header">
											<div class="modal-title font-weight-bold" id="categoryTitle" v-if="modeNew">
												{{ $t("facility.popup.category.title") }}
											</div>
											<div class="modal-title font-weight-bold" id="categoryTitle" v-else>
												{{ $t("facility.popup.category.edit_title") }}
											</div>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  							<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">
											<div class="row no-margin">
												<div class="form-group col popup-contents-wrap">
													<fieldset class="popup-fieldset" id="category-input-fieldset" style="padding-top:10px;">
					      								<div class="form-group row" style="margin-bottom:10px;">
											                <label for="ccode" class="col-sm-5 col-form-label"></label>
											                <div class="col-sm-7 bold">
											                	{{ $t("facility.popup.category.legend") }}
											                </div>
														</div>
					      								<div class="form-group row">
											                <label for="ccode" class="col-sm-5 col-form-label">{{ $t("facility.label.category.code") }}</label>
											                <div class="col-sm-7" v-if="modeNew == true">
											                	<input id="ccode" ref="categoryName" v-model="currentCategory.ccode" class="form-control popup-input" required pattern=".{2,}" v-bind:title='$t("facility.popup.category.code_required")' />
											                </div>
											                <div class="col-sm-7" v-if="modeNew == false">
											                	{{ currentCategory.ccode }}
											                </div>
														</div>
												        <div class="form-group row">
											                <label for="categoryName" class="col-sm-5 col-form-label">{{ $t("facility.label.category.name") }}</label>
											                <div class="col-sm-7">
											                	<input id="categoryName" ref="categoryName" v-model="currentCategory.categoryName" class="form-control popup-input" required pattern=".{2,}" v-bind:title='$t("facility.popup.category.name_required")' />
											                </div>
														</div>
														<div class="form-group row">
											                <label for="hasRuleSet" class="col-sm-5 col-form-label">{{ $t("facility.label.category.ruleset") }}</label>
											                <div class="col-sm-7 text-right d-flex justify-content-end align-items-center">
											                	<label class="checkbox-inline checkbox-label no-margin">
																	<input type="checkbox" id="categoryHasRuleSet">
																	<label for="categoryHasRuleSet"></label>
																</label>
											                </div>
														</div>
														<div class="form-group row">
											                <label for="categoryEnable" class="col-sm-5 col-form-label">{{ $t("facility.label.category.enable") }}</label>
											                <div class="col-sm-7">
											                	<div id="categoryEnable"></div>
											                </div>
														</div>
														<div class="form-group row" v-if="modeNew == false">
											                <label class="col-sm-5 col-form-label">{{ $t("facility.label.category.creator") }}</label>
											                <div class="col-sm-7">{{ currentCategory.createUserName }}</div>
														</div>
														<div class="form-group row" v-if="modeNew == false">
											                <label class="col-sm-5 col-form-label">{{ $t("facility.label.category.createDate") }}</label>
											                <div class="col-sm-7">{{ currentCategory.createDateTime | dateString }}</div>
														</div>
														<div class="form-group row" v-if="modeNew == false">
											                <label class="col-sm-5 col-form-label">{{ $t("facility.label.category.updater") }}</label>
											                <div class="col-sm-7">{{ currentCategory.updateUserName }}</div>
														</div>
														<div class="form-group row" v-if="modeNew == false">
											                <label class="col-sm-5 col-form-label">{{ $t("facility.label.category.updateDate") }}</label>
											                <div class="col-sm-7">{{ currentCategory.updateDateTime | dateString }}</div>
														</div>
													</fieldset>														
												</div>
												<div class="form-group col popup-contents-wrap">
													<fieldset class="popup-fieldset basicSymbolBox">
					      								<!-- <legend class="solid-border">{{ $t("facility.popup.category.symbol") }}</legend> -->
					      								<div class="overflow-auto">
					      									<div id="mdb-icons-wrapper" class="col-md-12 flex-wrap flex-row flex-wrap justify-start items-start">
													      		<ul class="font-list d-flex flex-wrap list-unstyled justify-content-between no-margin" id="mdb-ul-font-list">
													      			<!-- <li class="symbolItem smallSymbolItem" v-bind:class="{ active: data == index }" data-style="brands" data-search="" v-for="(item, index) in symbolItems" v-bind:key="index" @click="onSelectSymbol(index)">
													      				<img v-bind:src="item.path" class="symbolitem rounded" v-bind:title="item.title"></img>
													      			</li> -->
													      			<li class="symbolItem smallSymbolItem" v-bind:class="{ active: data == i }" data-style="brands" data-search="" v-for="(num, i) in symbolViewCount" v-bind:key="i" @click="onSelectSymbol(i)">
													      				<template v-if="symbolItems[i]">
														      				<img v-bind:src="symbolItems[i].path" class="symbolitem" v-bind:title="symbolItems[i].title"></img>
													      				</template>
													      			</li>
													      		</ul>
													      	</div>
					      								</div>
					      							</fieldset>
												</div>
											</div>
											<div class="row no-margin">
												<div class="form-group col popup-contents-wrap">
													<fieldset class="popup-fieldset" id="categoryOptionField">
						      							<!-- <legend class="solid-border">{{ $t("facility.popup.category.option") }}</legend> -->
														<div class="text-right mb-3">
					  										<button id="btnAddField" ref="btnAddField" class="btn btn-outline-secondary btn-sm" v-on:click.prevent='onAddCategoryField'><i class="fa fa-plus-circle"></i></button>
					  									</div>
					  									<div is="addfield" v-for="(item, index) in categoryFields" v-bind:index="index" v-bind:key="item.id" v-bind:paramValueType="item.valueType" v-bind:paramValueId="item.valueId" v-bind:paramValueName="item.valueName" v-bind:paramvalueRequired="item.valueRequired" v-bind:paramComponentId="item.id" v-on:fieldRemoved="categoryFields.splice(index, 1);" v-on:fieldChanged="onFieldChanged">
					  									</div>			  									
						      						</fieldset>
						      					</div>
					      					</div>
					      					<div class="alert alert-danger mt-2" role="alert" id="alertCategoryError">{{ error_message }}</div>
										</div>
										<div class="modal-footer">
						        			<button type="button" class="round-btn blue-btn" data-dismiss="modal">{{ $t("button.cancel") }}</button>
							                <button class="round-btn blue-btn" type="submit">{{ $t("button.ok") }}</button>
							            </div>
					        		</div>
					        	</div>
					        </form>
					    </div>
					    <div class="col">
					    	<fieldset>
  								<div class="row">
						    		<div class="col sub-title">
								    	<span class="bold">{{ $t("facility.label.symbol.basiclegend") }}</span>
								    	<span class="sub-title-info"> / {{ $t("facility.label.symbol.basic_legend_info") }}</span>
					      			</div>
				      			</div>
  								<div class="overflow-auto symbolBox basicSymbolBox">
  									<div id="mdb-icons-wrapper" class="col-md-12 flex-wrap flex-row flex-wrap justify-start items-start no-padding">
							      		<ul class="font-list d-flex flex-wrap list-unstyled justify-content-between no-margin" id="mdb-ul-font-list">
							      			<li class="symbolItem bigSymbolItem p-2" data-style="brands" data-search="" v-for="(num, i) in basicSymbolViewCount" v-bind:key="i">
							      				<template v-if="basicsymbolitems[i]">
								      				<img v-bind:src="basicsymbolitems[i].path" class="symbolitem" v-bind:title="basicsymbolitems[i].title"></img>
							      				</template>
							      			</li>
							      		</ul>
							      	</div>
								</div>
							</fieldset>
							<div class="pt-5"></div>
							<fieldset>
  								<div class="row">
						    		<div class="col sub-title">
								    	<span class="bold">{{ $t("facility.label.symbol.customlegend") }}</span>
								    	<span class="sub-title-info"> / {{ $t("facility.label.symbol.custom_legend_info") }}</span>
						      			<button id="btnAddSymbol" ref="btnAddSymbol" class="round-btn blue-btn float-right" @click="onOpenUploadDialog()">{{ $t("button.add") }}</button>
					      			</div>
				      			</div>
  								<div class="overflow-auto symbolBox" id="customSymbolBox">
  									<div id="mdb-icons-wrapper" class="col-md-12 flex-wrap flex-row flex-wrap justify-start items-start no-padding">
							      		<ul class="font-list d-flex flex-wrap list-unstyled justify-content-between no-margin" id="mdb-ul-font-list">
							      			<li class="symbolItem bigSymbolItem p-2" data-style="brands" data-search="" v-for="(num, i) in customSymbolViewCount" v-bind:key="i" @click="onRemoveSymbol(i)">
							      				<template v-if="customesymbolitems[i]">
								      				<img v-bind:src="customesymbolitems[i].path" class="symbolitem" v-bind:title="customesymbolitems[i].title"></img>
								      				<i class="fa fa-trash-alt"></i>
							      				</template>
							      			</li>
							      		</ul>
							      	</div>
								</div>
								<div class="alert alert-danger mt-2" role="alert" id="alertCustomSymbolDel">{{ error_message }}</div>
							</fieldset>
					    </div>
					    
					    <!-- Upload File Dialog -->
				        <form id="frmUploadSymbol" ref="frmUploadSymbol"  class="modal fade" tabindex="-1" role="dialog" aria-labelledby="uploadSymbolTitle" aria-hidden="true" @submit.prevent="onSymbolSubmit()">
				        	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
				        		<div class="modal-content">
				        			<div class="modal-header">
										<div class="modal-title font-weight-bold" id="uploadSymbolTitle"><i class="fa fa-arrow-alt-circle-up"></i>&nbsp;{{ $t("facility.popup.symbol.title") }}</div>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  							<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
										<div class="input-group mb-3">
											<div class="input-group-prepend">
												<span class="input-group-text" id="inputGroupFileSymbolAddon">{{ $t("facility.label.symbol.upload") }}</span>
											</div>
											<div class="custom-file">
												<input type="file" class="custom-file-input" id="inputGroupSymbolFile" ref="inputGroupSymbolFile" aria-describedby="inputGroupFileSymbolAddon" accept=".png" multiple required>
												<label class="custom-file-label" for="inputGroupSymbolFile">{{ $t("facility.label.symbol.select") }}</label>
											</div>
										</div>
										<div class="alert alert-danger mt-2" role="alert" id="alertCustomSymbol">{{ error_message }}</div>
									</div>
									<div class="modal-footer">
					        			<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">{{ $t("button.cancel") }}</button>
						                <button class="btn btn-outline-primary" type="submit">{{ $t("button.ok") }}</button>
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

