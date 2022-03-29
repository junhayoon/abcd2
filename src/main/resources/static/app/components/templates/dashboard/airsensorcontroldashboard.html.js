export {template as default};

const template = `
	
	<div id="airSensorControlContainer" class="container-fluid nano-content" style="overflow-y: auto; position: static; padding-top: 10px;">
		
		<div class="row">
			<div class="col">
				<div id="airSensorControlSelector" style="width: 200px;"></div>
			</div>
			<div class="col">
				<div style="width: 320px;"></div>
			</div>
			<div class="col">
				<div style="width: 150px; text-align: left;color: white;">
					{{ $t("frontend.dashboard.airSensorControl.air_power") }} <!-- 전원 -->
					&nbsp;&nbsp;
					<a v-if="airSensor.unit == 0" style="color: gray;">OFF</a>
					<a v-else="" style="color: green">ON</a>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					{{ $t("frontend.dashboard.airSensorControl.air_motor_intensity") }} <!-- 강도 -->
					&nbsp;&nbsp;
					<a v-if="airSensor.unit == 1" style="color: green;">{{ $t("label.power_low") }}</a><!-- 약 -->
					<a v-if="airSensor.unit == 2" style="color: green;">{{ $t("label.power_middle") }}</a><!-- 약 -->
					<a v-if="airSensor.unit == 3" style="color: green;">{{ $t("label.power_high") }}</a><!-- 약 -->
				</div>
			</div>
		</div>
		<div style="width:100%; border: 0px dashed #bcbcbc; padding-top: 20px;">
			
			<table border=0 id="popupAirSensorControlTable" style="width: 100%; align: center;">
				<tr>
					<td style="width: 25%;" align="center">
						<table border=0 id="popupAirSensorWorkplaceControlTable" 
								style="width: 186px;align: center;background-image: url('/static/images/aircontrol_bg.png');background-repeat: no-repeat;">
							<tr align="center" style="height: 65px;">
								<td colspan="3" style="color:white;"> <!-- 사업장 자동운행 설정 -->
									{{ $t("frontend.dashboard.airSensorControl.air_auto_control_state") }}
								</td>
							</tr>
							<tr>
								<td style="width: 33%;" align="right">
									<a v-if="airSensor.cmd == 'AUTO'" style="color: white; cursor: pointer;" @click="toggleWorkplaceAutoControl">OFF</a>
									<a v-else="" style="color: red">OFF</a>
								</td>
								<td style="width: 33%;" align="center">
								</td>
								<td style="width: 33%;" align="left">
									<a v-if="airSensor.cmd == 'AUTO'" style="color: green">ON</a>
									<a v-else="" style="color: white; cursor: pointer;" @click="toggleWorkplaceAutoControl">ON</a>
								</td>
							</tr>
							<tr align="center" style="height: 65px;">
								<td colspan="3">
									<img v-if="airSensor.cmd == 'AUTO'" src="/static/images/btn_control_on.png">
									<img v-else="" src="/static/images/btn_control_off.png">
								</td>
							</tr>
							<tr align="center" style="height: 10px;">
								<td colspan="3"></td>
							</tr>
						</table>
					</td>
					<td style="width: 25%;" align="center">
						<table border=0 id="popupAirSensorControlTable" 
								style="width: 186px;align: center;background-image: url('/static/images/aircontrol_bg.png');background-repeat: no-repeat;">
							<tr align="center" style="height: 65px;">
								<td colspan="3" style="color:white;"> <!-- 센터 자동제어 설정 -->
									{{ $t("frontend.dashboard.airSensorControl.air_center_auto_control_state") }}
								</td>
							</tr>
							<tr>
								<td style="width: 33%;" align="right">
									<a v-if="selectedFacility.autoControl" style="color: white; cursor: pointer;" @click="toggleAutoControl">OFF</a>
									<a v-else="" style="color: red">OFF</a>
								</td>
								<td style="width: 33%;" align="center">
								</td>
								<td style="width: 33%;" align="left">
									<a v-if="selectedFacility.autoControl" style="color: green">ON</a>
									<a v-else="" style="color: white; cursor: pointer;" @click="toggleAutoControl">ON</a>
								</td>
							</tr>
							<tr align="center" style="height: 65px;">
								<td colspan="3">
									<img v-if="selectedFacility.autoControl" src="/static/images/btn_control_on.png">
									<img v-else="" src="/static/images/btn_control_off.png">
								</td>
							</tr>
							<tr align="center" style="height: 10px;">
								<td colspan="3"></td>
							</tr>
						</table>
					</td>
					<td style="width: 25%;color:white;" align="center">
						<table border=0 id="popupAirSensorControlTable" 
								style="width: 186px;align: center;background-image: url('/static/images/aircontrol_bg.png');background-repeat: no-repeat;">
							<tr align="center" style="height: 65px;">
								<td colspan="3" style="color:white;"> <!--메인전원 제어 -->
									{{ $t("frontend.dashboard.airSensorControl.air_sensor_control") }} 
									<br>{{ $t("frontend.dashboard.airSensorControl.air_power_control") }}
								</td>
							</tr>
							<tr>
								<td style="width: 33%;" align="right">
									<a v-if="airSensor.unit > 0" style="color: white; cursor: pointer;" @click="togglePowerOn">OFF</a>
									<a v-else-if="airSensor.unit === 0" style="color: red">OFF</a>
									<a v-else style="color: red">NO DATA</a>
								</td>
								<td style="width: 33%;" align="center">
								</td>
								<td style="width: 33%;" align="left">
									<a v-if="airSensor.unit > 0" style="color: green">ON</a>
									<a v-else-if="airSensor.unit === 0" style="color: white; cursor: pointer;" @click="togglePowerOn">ON</a>
								</td>
							</tr>
							<tr align="center">
								<td colspan="3" style="height: 65px;">
									<img v-if="airSensor.unit" src="/static/images/btn_control_on.png">
									<img v-else="" src="/static/images/btn_control_off.png">
								</td>
							</tr>
							<tr align="center" style="height: 10px;">
								<td colspan="3"></td>
							</tr>
						</table>
					</td>
					<td style="width: 25%;color:white;" align="center">
						<table border=0 id="popupAirSensorControlTable" 
								style="width: 186px;align: center;background-image: url('/static/images/aircontrol_bg.png');background-repeat: no-repeat;">
							<tr align="center" style="height: 65px;">
								<td colspan="3" style="color:white;"> <!-- 모터강도 제어 -->
									{{ $t("frontend.dashboard.airSensorControl.air_sensor_control") }} 
									<br>{{ $t("frontend.dashboard.airSensorControl.air_motor_control") }}
								</td>
							</tr>
							<tr>
								<td style="width: 33%;" align="right">
									<a v-if="1 === airSensor.unit" style="color: green">{{ $t("label.power_low") }}</a>
									<a v-else="" style="color: white; cursor: pointer;" @click="onMotorPowerIntensityChange(1)">{{ $t("label.power_low") }}</a>
								</td>
								<td style="width: 33%;" align="center">
									<a v-if="2 === airSensor.unit" style="color: green">{{ $t("label.power_middle") }}</a>
									<a v-else="" style="color: white; cursor: pointer;" @click="onMotorPowerIntensityChange(2)">{{ $t("label.power_middle") }}</a>
								</td>
								<td style="width: 33%;" align="left">
									<a v-if="3 === airSensor.unit" style="color: green">{{ $t("label.power_high") }}</a>
									<a v-else="" style="color: white; cursor: pointer;" @click="onMotorPowerIntensityChange(3)">{{ $t("label.power_high") }}</a>
								</td>
							</tr>
							<tr align="center">
								<td colspan="3" style="height: 65px;">
									<img v-if="1 === airSensor.unit" src="/static/images/btn_control_off.png">
									<img v-else-if="2 === airSensor.unit" src="/static/images/btn_control_medium.png">
									<img v-else-if="3 === airSensor.unit" src="/static/images/btn_control_on.png">
									<img v-else="" src="/static/images/btn_control_none.png">
								</td>
							</tr>
							<tr align="center" style="height: 10px;">
								<td colspan="3"></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr style="height: 10px;">
					<td colspan="4" style="color:white;">
						
					</td>
				</tr>
			</table>

		</div>
		
	</div>
`;
