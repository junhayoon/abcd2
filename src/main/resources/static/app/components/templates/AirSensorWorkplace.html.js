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
	  			<h4 :style="mainTitleStyle()">{{ $t("airSensor.workplace.title") }}</h4>
	  		</div>
	  		
	  		<img src="/static/images/title_bar.jpg" id="subPageTitleBar"/>
      		
	  		<div class="container-fluid">
				<div class="row mt-5">
				    <div class="col col-sm-9">
				    	<div class="row">
				    		<div class="col sub-title">
						    	<span class="bold">{{ $t("airSensor.workplace.title") }}</span>
						    	<button id="btnRefreshAirStatus" ref="btnRefreshAirStatus" class="round-btn blue-btn" @click="onRefreshAirSensor(true)"><i class="fas fa-redo"></i>&nbsp;{{ $t("airSensor.workplace.tab_status.btn_refresh") }}</button>
			      			</div>
		      			</div>
				    	<table class="table table-hover">
							<thead>
								<tr>
									<th scope="col" style="text-align: center;">No</th>
									<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.facil_id") }}</th>
							      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.facil_name") }}</th>
							      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.air_status") }}</th>
							      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.pm10") }}<br/>(PM<sub>10</sub>)</th>
							      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.pm25") }}<br/>(PM<sub>2.5</sub>)</th>
							      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.pm1") }}<br/>(PM<sub>1.0</sub>)</th>
							      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.co2") }}<br/>(CO<sub>2</sub>)</th>
							      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.tvoc") }}<br/>(TVOC)</th>
							      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.temp") }}<br/>(Temperature)</th>
							      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.humi") }}<br/>(Humidity)</th>
							      	<th scope="col" style="text-align: center;">{{ $t("airSensor.workplace.common.date") }}</th>
							    </tr>
							</thead>
							<tbody>									
								<tr v-for="(item, index) in airSensorStatusList" v-bind:key="index" @dblclick="onOpenAirSensorDialog(index)" @click="onSelectAirSensor(index)" class="pointer">										
									<td align="center">{{ index+1 }}</td>										
									<td align="center">{{ item.id }}</td>
									<td>{{ item.facilityName }}</td>										
									<td align="center" v-if="item.airStatus!=undefined"><img v-bind:src="transAirStatusToIcon(item.airStatus.airQuality.airGrade)" class="icons-s" v-bind:title="transAirStatusToString(item.airStatus.airQuality.airGrade)"></img></td>
									<td align="center" v-else></td>
									<td align="right" v-if="item.airStatus!=undefined"><img v-bind:src="transAirStatusToIcon(item.airStatus.airQuality.pm10Grade)" class="icons-xs"></img>&nbsp;{{ item.airStatus.pm10 }}&nbsp;㎍/㎥</td>
									<td align="right" v-else></td>										
									<td align="right" v-if="item.airStatus!=undefined"><img v-bind:src="transAirStatusToIcon(item.airStatus.airQuality.pm25Grade)" class="icons-xs"></img>&nbsp;{{ item.airStatus.pm25 }}&nbsp;㎍/㎥</td>
									<td align="right" v-else></td>
									<td align="right" v-if="item.airStatus!=undefined">&nbsp;{{ item.airStatus.pm1 }}&nbsp;㎍/㎥</td>
									<td align="right" v-else></td>
							      	<td align="right" v-if="item.airStatus!=undefined"><img v-bind:src="transAirStatusToIcon(item.airStatus.airQuality.co2Grade)" class="icons-xs"></img>&nbsp;{{ item.airStatus.co2 }}&nbsp;ppm</td>
							      	<td align="right" v-else></td>
							      	<td align="right" v-if="item.airStatus!=undefined"><img v-bind:src="transAirStatusToIcon(item.airStatus.airQuality.tvocGrade)" class="icons-xs"></img>&nbsp;{{ item.airStatus.tvoc }}&nbsp;</td>	
							      	<td align="right" v-else></td>							      	
							      	<td align="right" v-if="item.airStatus!=undefined">&nbsp;{{ item.airStatus.temp }}&nbsp;°C</td>	
							      	<td align="right" v-else></td>									
							      	<td align="right" v-if="item.airStatus!=undefined">&nbsp;{{ item.airStatus.humi }}&nbsp;%</td>
							      	<td align="right" v-else></td>
									<td align="center" v-if="item.airStatus!=undefined">{{ item.airStatus.create_date | dateString }}</td>
									<td align="center" v-else></td>
							    </tr>
							</tbody>
						</table>
					</div>
					<div class="col col-sm-3 padding-zero">
						<minimap mode="view" target="viewMiniMap" ref="viewMiniMap" style="height: 55vh;"></minimap>
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

