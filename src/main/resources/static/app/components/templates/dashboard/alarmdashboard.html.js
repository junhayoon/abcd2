export {template as default};

const template = `
	
	<div id="alarmContainer" class="container-fluid nano-content" style="overflow-y: auto; position: static; padding-top: 10px; align: center;">
				
			<table border=0 id="popupAirSensorControlTable" style="width:100%;align:center">
				<tr style="height:1px"><td></td></tr>
				<tr style="height:45px">
					<td colspan="2" valign="center" align="center">
						<span class="blink1" style="font-size: 18px;">
							&nbsp;
							<span style="color: cyan;">{{facilityName}}  </span>
							<span style="color: white;">사업장에서 환경기준 이상의 </span>
							<span style="color: cyan;">{{riskType}}  </span>
							<span style="color: white;">수치 감지 <br>이벤트를 수신했습니다.</span>
						</span>	
					</td>
				</tr>
				<tr style="height:5px">
					<td>
						<span style="font-size: 16px;color: white;">&nbsp;{{moment(create_date).format('YYYY/MM/DD HH:mm:ss').toString()}}</span>
					</td>
				</tr>	
				<tr style="height:5px"><td></td></tr>
			</table>			
			
			<table border=0 id="popupAirSensorControlTable" style="width:100%;align:center">	
				<tr style="height:5px">
					<td align="center" colspan="2"></td>
				</tr>
				<tr style="height:37px">
					<td align="center" colspan="2" valign="center">
						<div class="col" 
							style="font-size: 24px;color: #ffc107;padding-top: 7px;text-align: center;
										background-image: url('/static/images/dashboard_alarm_title_bg.png');background-repeat: no-repeat;										
										width: 394px;height: 37px;"
							>{{riskType}}</div>
					</td>
				</tr>
				<tr style="height:5px">
					<td align="center" colspan="2"></td>
				</tr>
				<tr>
					<td align="center" colspan="2">
						<table border=0 id="popupAirSensorControlTable2" 
							style="width: 568px;height: 141px;align: center;background-image: url('/static/images/dashboard_alarm_content_bg.png');">
							<tr style="height:15px">
								<td align="center" colspan="2"></td>
							</tr>
							<tr style="height:35px">
								<td align="center" colspan="2">
									<span style="font-size: 38px;color: cyan;">{{riskValue}}&nbsp;</span> 
									<span style="font-size: 14px;color: white;">&nbsp;{{riskUnit}}</span>
								</td>
							</tr>
							<tr style="height:15px">
								<td align="center" colspan="2"></td>
							</tr>
							<tr style="height:25px">
								<td align="center" colspan="2">
									<span style="color: pink;">{{ $t("frontend.dashboard.alarm.standard") }}<!--환경기준--></span> 
									<span style="color: white;">{{standardValue}}</span> 
									<span style="color: pink;">{{riskUnit}}</span>
								</td>
							</tr>
							<tr style="height:10px">
								<td align="center" colspan="2">
								</td>
							</tr>
							<tr style="height:25px">
								<td width="33%" style="padding-left: 10px;">
									<button id="btnOpenAirSensorControl" class="round-btn yellow-btn" v-if="!autoControl" @click="openAirSensorControl()">{{ $t("frontend.dashboard.alarm.manual_control") }}</button>
									<span style="font-size: 22px;color: white;" v-if="autoControl">
										[{{ $t("frontend.dashboard.alarm.auto_control") }}] 
									</span>
								</td>
								<td>
									<!--
									<span style="font-size: 12px;color: #ffc107;">controlFacilityId:{{controlFacilityId}},airSensor:{{airSensor.seq}} </span>
									-->
									<span class="blink1" style="font-size: 22px;color: #ffc107;" v-if="alarmFacilityOnControlling">
										 {{ $t("frontend.dashboard.alarm.aircleaner_on") }}<!--공기청정기 가동 중...-->
									</span>
									<span style="font-size: 22px;color: #ffc107;" v-if="riskValue < standardValue">{{ $t("frontend.dashboard.alarm.air_cleaned") }}<!--공기청정이 완료되었습니다.--></span>
								</td>
							</tr>
							<tr style="height:15px">
								<td align="center" colspan="2">
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr style="height:15px">
					<td align="center" colspan="2"></td>
				</tr>
			</table>
		
	</div>
`;
