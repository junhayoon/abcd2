export {template as default};

const template = `
	
	<div>
		<div class="pr-4 align-middle" id="popupFacilityTitle">
			<span class="d-flex align-items-center">
				<b>{{ facility.facilityCategory.categoryName }}</b>
				<span class="badge badge-pill badge-danger" v-if="facility.status == 'ERROR'">{{ statusName }}</span>
				<span class="badge badge-pill badge-success" v-else>{{ statusName }}</span>
				<span v-if="isFireCCTV" style="display: inline-block; width: 60%; text-align: right;">
					<label class="pointer" id="CCTVPopup" style="margin:0;">
						<img src="/static/images/list_view_cctv_icon.png" @click="onCCTVPopup();"/>
					</label>
				</span>
			</span>
		</div>
		<table id="popupFacilityTable">
			
			<tr>
				<th>{{ $t("frontend.popup2.facil_cate_name") }}</th>
				<td>{{ facility.facilityCategory.categoryName }}</td>
			</tr>
			
			<tr>
				<th>{{ $t("frontend.popup2.fireCCTV.facil_name") }}</th>
				<td>{{ facility.facilityName }}</td>
			</tr>
			
			<template v-if="isFireCCTV || isParkingLot || isStreetLight">
				<tr>
					<th>{{ $t("frontend.popup2.facil_addr") }}</th>
					<td>{{ facility.addr }}</td>
				</tr>
			</template>
			
			<template v-if="isAirSensor">
				<tr>
					<th>{{ $t("frontend.popup2.workplace_name") }}</th>
					<td>{{ facility.facilityName }}</td>
				</tr>
				<tr>
					<th>{{ $t("frontend.popup2.workplace_addr") }}</th>
					<td>{{ facility.addr }}</td>
				</tr>
			</template>
			
			<template v-if="isUticCctv">
			<tr>
					<th>{{ $t("frontend.popup2.workplace_addr") }}</th>
					<td>{{ facility.addr }}</td>
				</tr>
			<tr>
				<th>{{ $t("frontend.popup2.facil_lat_lng") }}</th>
				<td>{{ facility.latitude }}, {{ facility.longitude }}</td>
			</tr>
			</template>
			

			
			<template v-if="isFireCCTV || isDroneStation">
				<tr>
					<th>{{ $t("frontend.popup2.facil_ip") }}</th>
					<td>{{ facility.properties.mediaDevIp }}</td>
				</tr>
			</template>
			
			<template v-if="isAirSensor">
				<tr>
					<th>{{ $t("frontend.dashboard.airSensor.create_date") }}</th>
					<td>{{ airSensor.create_date | dateString }}</td>
				</tr>
			</template>
			
			<template v-if="isParkingLot">
				<tr>
					<th>{{ $t("frontend.popup2.parking_space") }}</th>
					<td>{{ facility.properties.parkingSpace }}</td>
				</tr>
			</template>
			
		</table>
		
		<div v-if="isAirSensor">
			<div v-if="airSensor.airQuality">
				<div id="airStatusTitle">
					<span>{{ $t("frontend.dashboard.airSensor.title") }}</span>
				</div>
				
				<div class="airStatusContents smallContents">
					<div class="airStatusItem">
						<span>{{ $t("frontend.dashboard.airSensor.temp") }}</span>
						<div class="airStatusTextWrap">
							<span class="bold airStatusBigText">{{ airSensor.temp }}</span><span>°C</span>
						</div>
					</div>
					
					<div class="airStatusSeparator"></div>
					
					<div class="airStatusItem">
						<span>{{ $t("frontend.dashboard.airSensor.humi") }}</span>
						<div class="airStatusTextWrap">
							<span class="bold airStatusBigText">{{ airSensor.humi }}</span><span>%</span>
						</div>
					</div>
				</div>
				
				<div class="airStatusContents">
					<div class="airStatusItem">
						<span>{{ $t("frontend.dashboard.airSensor.pm10") }}</span>
						<div>
							<img v-bind:src="transAirStatusToIcon(airSensor.airQuality.pm10Grade)"/>
						</div>
					</div>
					
					<div class="airStatusSeparator"></div>
					
					<div class="airStatusItem">
						<span>{{ $t("frontend.dashboard.airSensor.pm25") }}</span>
						<div>
							<img v-bind:src="transAirStatusToIcon(airSensor.airQuality.pm25Grade)"/>
						</div>
					</div>
					
					<div class="airStatusSeparator"></div>
					
					<div class="airStatusItem">
						<span>{{ $t("frontend.dashboard.airSensor.co") }}</span>
						<div>
							<img v-bind:src="transAirStatusToIcon(airSensor.airQuality.co2Grade)"/>
						</div>
					</div>
					
					<div class="airStatusSeparator"></div>
					
					<div class="airStatusItem">
						<span v-html="$t('frontend.dashboard.airSensor.tvocBr')"></span>
						<div>
							<img v-bind:src="transAirStatusToIcon(airSensor.airQuality.tvocGrade)"/>
						</div>
					</div>
				</div>
				
				<div class="airStatusContents">
					<div class="airStatusItem">
						<span v-html="$t('frontend.dashboard.airSensor.furifier_power')"></span>
						<div class="airStatusTextWrap airStatusBadgeWrap">
							<span class="badge badge-pill badge-danger" v-if="0 === airSensor.unit">{{ $t("label.power_off") }}</span>
							<span class="badge badge-pill badge-success" v-else>{{ $t("label.power_on") }}</span>
							
							<span class="badge badge-pill badge-warning" v-if="1 === airSensor.unit">{{ $t("label.power_low") }}</span>
							<span class="badge badge-pill badge-info" v-else-if="2 === airSensor.unit">{{ $t("label.power_middle") }}</span>
							<span class="badge badge-pill badge-success" v-else-if="3 === airSensor.unit">{{ $t("label.power_high") }}</span>
							<span class="badge badge-pill badge-danger" v-else>{{ $t("label.power_off") }}</span>
						</div>
					</div>
					
					<div class="airStatusSeparator"></div>
					
					<div class="airStatusItem">
						<span v-html="$t('frontend.dashboard.airSensor.measuring_instrument')"></span>
						<div class="airStatusTextWrap airStatusBadgeWrap">
							<span class="badge badge-pill badge-danger" v-if="parseInt(airSensor.alarm % 100 / 10) !== 0">{{ $t("label.error") }}</span>
							<span class="badge badge-pill badge-success" v-else>{{ $t("label.normal") }}</span>
						</div>
					</div>
					
					<div class="airStatusSeparator"></div>
					
					<div class="airStatusItem">
						<span v-html="$t('frontend.dashboard.airSensor.filter')"></span>
						<div class="airStatusTextWrap airStatusBadgeWrap">
							<span class="badge badge-pill badge-danger" v-if="10 > airSensor.alarm && airSensor.alarm > 0">{{ $t("label.filter_error") }}</span>
							<span class="badge badge-pill badge-success" v-else>{{ $t("label.normal") }}</span>
						</div>
					</div>
					
					<div class="airStatusSeparator"></div>
					
					<div class="airStatusItem">
						<span v-html="$t('frontend.dashboard.airSensor.motor')"></span>
						<div class="airStatusTextWrap airStatusBadgeWrap">
							<span class="badge badge-pill badge-danger" v-if="airSensor.alarm > 99">{{ $t("label.error") }}</span>
							<span class="badge badge-pill badge-success" v-else>{{ $t("label.normal") }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
`;

