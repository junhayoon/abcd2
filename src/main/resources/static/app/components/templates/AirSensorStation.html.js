export {template as default};

import headercomp from '../common/header.js'
import sidebarmenu from '../common/sidebarmenu.js'
import topbar from '../common/topbar.js'


const template = `
	<div class="wrapper">
		<!--<headercomp></headercomp>-->
		
		<!-- Sidebar -->
	    <sidebarmenu></sidebarmenu>
	    <!-- /#sidebar-wrapper -->
	    	
	    <!-- Page Content -->
    	<div id="content">
      		
      		<div class="container-fluid">
	      		<ul class="nav nav-tabs" id="userTab" role="tablist">
					<li class="nav-item"><a class="nav-link active" ref="user-info-tab" data-toggle="tab" href="#airStatus" role="tab" aria-controls="userInformation" aria-selected="true">{{ $t("airSensor.station.tab_status.title") }}</a></li>
					<li class="nav-item"><a class="nav-link" ref="change-password" data-toggle="tab" href="#airHistory" role="tab" aria-controls="changePassword" aria-selected="false">{{ $t("airSensor.station.tab_history.title") }}</a></li>					
				</ul>
	      	</div>
	     
	      	<div class="tab-content" id="airQualityTabContent">
	      		
	      		<div class="tab-pane fade show active mt-5" id="airStatus" role="tabpanel" aria-labelledby="home-tab">
					<div class="row">
					    <div class="col">
					    	<div class="row mb-2">
					    		<div class="col text-right">
									<button id="btnRefreshAirStation" ref="btnRefreshAirStation" class="btn btn-outline-primary" @click="onRefreshAirStation()"><i class="fas fa-redo"></i>&nbsp;{{ $t("airSensor.station.tab_status.btn_refresh") }}</button>
								</div>
					    	</div>
					    	<table class="table table-hover">
								<thead class="thead-dark">
									<tr>
										<th scope="col" style="text-align: center;">No</th>
										<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.station_id") }}</th>
								      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.station_name") }}</th>
								      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.air_status") }}</th>
								      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.pm25") }}<br/>(PM<sub>2.5</sub>)</th>
								      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.pm10") }}<br/>(PM<sub>10</sub>)</th>
								      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.no2") }}<br/>(NO<sub>2</sub>)</th>
								      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.co") }}<br/>(CO)</th>
								      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.o3") }}<br/>(O<sub>3</sub>)</th>
								      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.so2") }}<br/>(SO<sub>2</sub>)</th>
								      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.observ_date") }}</th>
								    </tr>
								</thead>
								<tbody>									
									<tr v-for="(item, index) in airStationToday" v-bind:key="index" @dblclick="onOpenAirStationDialog(index)" @click="onSelectAirStation(index)" >										
										<td align="center">{{ index+1 }}</td>										
										<td align="center">{{ item.id }}</td>
										<td>{{ item.facilityName }}</td>										
										<td align="center" v-if="item.airStatus!=undefined"><img v-bind:src="transAirStatusToIcon(item.airStatus.airQuality.airGrade)" class="icons-s" v-bind:title="transAirStatusToString(item.airStatus.airQuality.airGrade)"></img></td>
										<td align="center" v-else></td>										
										<td align="right" v-if="item.airStatus!=undefined"><img v-bind:src="transAirStatusToIcon(item.airStatus.airQuality.pm25Grade)" class="icons-xs"></img>&nbsp;{{ item.airStatus.pm25 }}&nbsp;㎍/㎥</td>
										<td align="right" v-else></td>
										<td align="right" v-if="item.airStatus!=undefined"><img v-bind:src="transAirStatusToIcon(item.airStatus.airQuality.pm10Grade)" class="icons-xs"></img>&nbsp;{{ item.airStatus.pm10 }}&nbsp;㎍/㎥</td>
										<td align="right" v-else></td>
								      	<td align="right" v-if="item.airStatus!=undefined"><img v-bind:src="transAirStatusToIcon(item.airStatus.airQuality.no2Grade)" class="icons-xs"></img>&nbsp;{{ item.airStatus.no2 }}&nbsp;ppm</td>
								      	<td align="right" v-else></td>
								      	<td align="right" v-if="item.airStatus!=undefined"><img v-bind:src="transAirStatusToIcon(item.airStatus.airQuality.coGrade)" class="icons-xs"></img>&nbsp;{{ item.airStatus.co }}&nbsp;ppm</td>	
								      	<td align="right" v-else></td>							      	
								      	<td align="right" v-if="item.airStatus!=undefined"><img v-bind:src="transAirStatusToIcon(item.airStatus.airQuality.o3Grade)" class="icons-xs"></img>&nbsp;{{ item.airStatus.o3 }}&nbsp;ppm</td>	
								      	<td align="right" v-else></td>									
								      	<td align="right" v-if="item.airStatus!=undefined"><img v-bind:src="transAirStatusToIcon(item.airStatus.airQuality.so2Grade)" class="icons-xs"></img>&nbsp;{{ item.airStatus.so2 }}&nbsp;ppm</td>
								      	<td align="right" v-else></td>
										<td align="center" v-if="item.airStatus!=undefined">{{ dateStringFromStation(item.airStatus.date) }}</td>
										<td align="center" v-else></td>
								    </tr>
								</tbody>
							</table>
						</div>
						<div class="col col-sm-5 padding-zero">
							<minimap mode="view" target="viewMiniMap" ref="viewMiniMap"></minimap>
						</div>
					</div>
				</div>				

				<!-- history -->
				<div class="tab-pane fade mt-5" id="airHistory" role="tabpanel" aria-labelledby="airHistory">
					<div class="row">
						<div class="col">							
							<fieldset class="solid-border bg-light">
								<div class="container m-2 justify-content-center">
									<table width="100%">
										<thead>
										<tr>
											<td style="min-width: 100px">{{ $t("airSensor.workplace.tab_history.search_range") }}</td>
											<td>
												<v-date-picker v-model="startDateTime" mode="dateTime" is24hr>
												  <template v-slot="{ inputValue, inputEvents }">
												    <input
												      class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
												      :value="inputValue"
												      v-on="inputEvents"
												    />
												  </template>
												</v-date-picker>
												&nbsp; ~ &nbsp;  
												<v-date-picker v-model="endDateTime" mode="dateTime" is24hr>
												  <template v-slot="{ inputValue, inputEvents }">
												    <input
												      class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
												      :value="inputValue"
												      v-on="inputEvents"
												    />
												  </template>
												</v-date-picker>
											</td>
											<td style="min-width: 100px">
												<multiselect v-model="airStationForSearch" :options="airStationList" placeholder="All Stations" label="facilityName" track-by="id" @select="onSelectAirStationForSearch" @remove="onRemoveAirStationForSearch"></multiselect>
											</td>
											<td><button id="search" class="btn btn-outline-primary" @click.prevent="getAirStationLogsyWithPageNo(1)">{{ $t("airSensor.workplace.tab_history.btn_search") }}</button></td>
										</tr>
										</thead>
									</table>
									
								</div>
							</fieldset>
						</div>
					</div>					
					<div class="row">
						<div class="col">			
	                        <table class="table table-hover">
	                            <thead class="thead-dark">
	                                <tr>
										<th scope="col" class="align-middle" style="text-align: center;">No</th>
										<th scope="col" class="align-middle" style="text-align: center;">{{ $t("airSensor.workplace.common.station_id") }}</th>
										<th scope="col" class="align-middle" style="text-align: center;">{{ $t("airSensor.workplace.common.station_name") }}</th>										
										<th scope="col" class="align-middle" style="text-align: center;">{{ $t("airSensor.workplace.common.observ_date") }}</th>
										<th scope="col" class="align-middle" style="text-align: center;">{{ $t("airSensor.workplace.common.air_grade") }}</th>
										<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.pm25") }}<br/>(PM<sub>2.5</sub>)</th>
										<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.pm10") }}<br/>(PM<sub>10</sub>)</th>
	                                    <th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.no2") }}<br/>(NO<sub>2</sub>)</th>
	                                    <th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.co") }}<br/>(CO)</th>
										<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.o3") }}<br/>(O<sub>3</sub>)</th>
										<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.so2") }}<br/>(SO<sub>2</sub>)</th>
	                                </tr>
	                            </thead>
	                            <tbody>	                            	
									<tr v-for="(item, index) in airStationLogs" v-bind:key="item.seq">
										<td align="center">{{ index+1 }}</td>
										<td align="center">{{ item.code }}</td>
										<td>{{ item.facility.facilityName }}</td>
										<td align="center">{{ dateStringFromStation(item.date) }}</td>
										<td align="center" ><img v-bind:src="transAirStatusToIcon(item.airQuality.airGrade)" class="icons-s" v-bind:title="transAirStatusToString(item.airQuality.airGrade)"></img></td>
								      	<td align="right"><img v-bind:src="transAirStatusToIcon(item.airQuality.pm25Grade)" class="icons-xs"></img>&nbsp;{{ item.pm25 }}&nbsp;㎍/㎥</td>
								      	<td align="right"><img v-bind:src="transAirStatusToIcon(item.airQuality.pm10Grade)" class="icons-xs"></img>&nbsp;{{ item.pm10 }}&nbsp;㎍/㎥</td>
								      	<td align="right"><img v-bind:src="transAirStatusToIcon(item.airQuality.no2Grade)" class="icons-xs"></img>&nbsp;{{ item.no2 }}&nbsp;ppm</td>
								      	<td align="right"><img v-bind:src="transAirStatusToIcon(item.airQuality.coGrade)" class="icons-xs"></img>&nbsp;{{ item.co }}&nbsp;ppm</td>								      	
								      	<td align="right"><img v-bind:src="transAirStatusToIcon(item.airQuality.o3Grade)" class="icons-xs"></img>&nbsp;{{ item.o3 }}&nbsp;ppm</td>										
								      	<td align="right"><img v-bind:src="transAirStatusToIcon(item.airQuality.so2Grade)" class="icons-xs"></img>&nbsp;{{ item.so2 }}&nbsp;ppm</td>
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
							 	:click-handler="getAirStationLogsyWithPageNo"
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

