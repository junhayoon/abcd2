export {template as default};

const template = `
	<div id="airsensorStationContainer" class="container-fluid nano-content" style="overflow-y: auto; position: static; padding-top: 10px;">
		<div class="row">
			<div class="col">
				<div id="stationSelector" style="width:150px;"></div>
			</div>
			<div class="col">
				<div style="width:150px; color: orange; padding-top: 10px;">{{stationLogs.date}}</div>
			</div>
		</div>
		<div class="row justify-content-center">
			<table v-if="stationLogsSuccess">
				<tr height="25px"><td colspan="3"></td></tr>
				<tr height="30px">
					<td><div v-bind:style="stationLogStyle.pm10">{{$i18n.t("frontend.dashboard.airSensor.pm10")+"(PM10)"}}</div></td>
					<td width="50px"><img v-bind:src="transAirStatusToIcon(grade.pm10)" class="icons-s" v-bind:title="grade.pm10"></img></td>
					<td><div v-bind:style="stationLogStyle.pm10">{{stationLogs.pm10}} ug/m3</div></td>
				</tr>
				<tr height="30px">
					<td><div v-bind:style="stationLogStyle.pm25">{{$i18n.t("frontend.dashboard.airSensor.pm25")+"(PM25)"}}</div></td>
					<td><img v-bind:src="transAirStatusToIcon(grade.pm25)" class="icons-s" v-bind:title="grade.pm25"></img></td>
					<td><div v-bind:style="stationLogStyle.pm25">{{stationLogs.pm25}} ug/m3</div></td>
				</tr>
				<tr height="30px">
					<td><div v-bind:style="stationLogStyle.o3">{{$i18n.t("frontend.dashboard.airSensor.o3")+"(O3)"}}</div></td>
					<td><img v-bind:src="transAirStatusToIcon(grade.o3)" class="icons-s" v-bind:title="grade.o3"></img></td>
					<td><div v-bind:style="stationLogStyle.o3">{{stationLogs.o3}} ppm</div></td>
				</tr>
				<tr height="30px">
					<td><div v-bind:style="stationLogStyle.no2">{{$i18n.t("frontend.dashboard.airSensor.no2")+"(NO2)"}}</div></td>
					<td><img v-bind:src="transAirStatusToIcon(grade.no2)" class="icons-s" v-bind:title="grade.no2"></img></td>
					<td><div v-bind:style="stationLogStyle.no2">{{stationLogs.no2}} ppm</div></td>
				</tr>
				<tr height="30px">
					<td><div v-bind:style="stationLogStyle.co">{{$i18n.t("frontend.dashboard.airSensor.co")+"(CO)"}}</div></td>
					<td><img v-bind:src="transAirStatusToIcon(grade.co)" class="icons-s" v-bind:title="grade.co"></img></td>
					<td><div v-bind:style="stationLogStyle.co">{{stationLogs.co}} ppm</div></td>
				</tr>
				<tr height="30px">
					<td><div v-bind:style="stationLogStyle.so2">{{$i18n.t("frontend.dashboard.airSensor.so2")+"(SO2)"}}</div></td>
					<td><img v-bind:src="transAirStatusToIcon(grade.so2)" class="icons-s" v-bind:title="grade.so2"></img></td>
					<td><div v-bind:style="stationLogStyle.so2">{{stationLogs.so2}} ppm</div></td>
				</tr>
				<tr height="25px"><td colspan="3"></td></tr>
				<tr height="30px">
					<td colspan="3">
						<span style='color: white;'>
						<img src="/static/icons/icons8-blue-circle-48.png" class="icons-s"></img>{{ $t("airSensor.grade_1") }}
						<img src="/static/icons/icons8-green-circle-48.png" class="icons-s"></img>{{ $t("airSensor.grade_2") }}
						<img src="/static/icons/icons8-yellow-circle-48.png" class="icons-s"></img>{{ $t("airSensor.grade_3") }}
						<img src="/static/icons/icons8-red-circle-48.png" class="icons-s"></img>{{ $t("airSensor.grade_4") }}
						</span>
					</td>
				</tr>
			</table>
			<table v-if="!stationLogsSuccess">
				<tr height="25px"><td colspan="3"></td></tr>
				<tr height="210px" valign="center">
					<td colspan="3">
						<div style="font: 26px; color: #76d5e4; font-weight: bold">{{$i18n.t("frontend.dashboard.airSensorStation.station_logs_fail")}}</div>
					</td>
				</tr>
				<tr height="25px"><td colspan="3"></td></tr>
			</table>
		</div>
	</div>
`;
