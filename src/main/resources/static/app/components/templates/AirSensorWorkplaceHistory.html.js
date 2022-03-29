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
	  			<h4 :style="mainTitleStyle()">{{ $t("airSensor.history.title") }}</h4>
	  		</div>
	  		
	  		<img src="/static/images/title_bar.jpg" id="subPageTitleBar"/>
	  		
	  		<!-- history -->
	  		<div class="container-fluid">
				<div class="row" style="margin-top:30px; margin-bottom:30px;">
					<div class="col">
						<div class="d-inline-block sub-title bold" style="margin-right: 20px;">
							<span>{{ $t("airSensor.workplace.tab_history.search_range") }}</span>
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
								<div class="d-inline-block" style="margin-right: 30px;">
									<multiselect
										v-model="airSensorForSearch"
										:options="facilityList"
										placeholder="All Facilities"
										label="facilityName"
										track-by="id"
										@select="onSelectAirSensorForSearch"
										@remove="removeAirSensorForSearch"
									></multiselect>
								</div>
								<div class="d-inline-block">
									<button
										id="search"
										class="round-btn blue-btn"
										@click.prevent="getAirSensorLogsyWithPageNo(1)"
									>{{ $t("airSensor.workplace.tab_history.btn_search") }}</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="row">
				    		<div class="col sub-title">
						    	<span class="bold">{{ $t("airSensor.history.title") }}</span>
			      			</div>
			  			</div>
	                    <table class="table table-hover">
	                        <thead>
	                            <tr>
									<th scope="col" class="align-middle" style="text-align: center;">No</th>
									<th scope="col" class="align-middle" style="text-align: center;">{{ $t("airSensor.workplace.common.seq") }}</th>
									<th scope="col" class="align-middle" style="text-align: center;">{{ $t("airSensor.workplace.common.facil_id") }}</th>
									<th scope="col" class="align-middle" style="text-align: center;">{{ $t("airSensor.workplace.common.facil_name") }}</th>										
									<th scope="col" class="align-middle" style="text-align: center;">{{ $t("airSensor.workplace.common.date") }}</th>
									<th scope="col" class="align-middle" style="text-align: center;">{{ $t("airSensor.workplace.common.air_grade") }}</th>
									<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.pm10") }}<br/>(PM<sub>10</sub>)</th>
									<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.pm25") }}<br/>(PM<sub>2.5</sub>)</th>
									<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.pm1") }}<br/>(PM<sub>1</sub>)</th>
	                                <th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.co2") }}<br/>(CO<sub>2</sub>)</th>
	                                <th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.tvoc") }}<br/>(TVOC)</th>
									<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.temp") }}<br/>(Temperature)</th>
									<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.humi") }}<br/>(Humidity)</th>
	                            </tr>
	                        </thead>
	                        <tbody>
								<tr v-for="(item, index) in airSensorLogs" v-bind:key="item.seq" class="pointer">
									<!--<td align="center">{{ index+1 }}</td>-->
									<td align="center">{{ item.no }}</td>
									<td align="center">{{ item.seq }}</td>
									<td align="center">{{ item.facility.fcode }}</td>
									<td>{{ item.facility.facilityName }}</td>
									<td align="center">{{ item.create_date | dateString }}</td>
									<td align="center" ><img v-bind:src="transAirStatusToIcon(item.airQuality.airGrade)" class="icons-s" v-bind:title="transAirStatusToString(item.airQuality.airGrade)"></img></td>
									<td align="right"><img v-bind:src="transAirStatusToIcon(item.airQuality.pm10Grade)" class="icons-xs"></img>&nbsp;{{ item.pm10 }}&nbsp;㎍/㎥</td>
							      	<td align="right"><img v-bind:src="transAirStatusToIcon(item.airQuality.pm25Grade)" class="icons-xs"></img>&nbsp;{{ item.pm25 }}&nbsp;㎍/㎥</td>
							      	<td align="right"><img v-bind:src="transAirStatusToIcon(item.airQuality.pm1Grade)" class="icons-xs"></img>&nbsp;{{ item.pm1 }}&nbsp;㎍/㎥</td>
							      	<td align="right"><img v-bind:src="transAirStatusToIcon(item.airQuality.co2Grade)" class="icons-xs"></img>&nbsp;{{ item.co2 }}&nbsp;ppm</td>
							      	<td align="right"><img v-bind:src="transAirStatusToIcon(item.airQuality.tvocGrade)" class="icons-xs"></img>&nbsp;{{ item.tvoc }}&nbsp;ppm</td>								      	
							      	<td align="right">&nbsp;{{ item.temp }}&nbsp;°C</td>										
							      	<td align="right">&nbsp;{{ item.humi }}&nbsp;%</td>
								</tr>
								
								<tr v-if="airSensorLogs.length === 0 && showNoData">
									<td colspan="13">{{ $t("label.no_data") }}</td>
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
						 	:click-handler="getAirSensorLogsyWithPageNo"
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
			<!-- history end -->
	      	
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

