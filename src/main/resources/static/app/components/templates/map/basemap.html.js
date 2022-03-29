export {template as default};

import headercomp from '../../common/header.js'
import facilitysidebar from '../../common/FacilitySidebar.js'
import eventsidebar from '../../common/EventSidebar.js'
import popupsidebar from '../../common/PopupSidebar.js'
import notificationbox from '../../common/notificationbox.js'
import modal from '../../common/modal.js'
import cctvdashboard from '../../dashboard/firecctvdashboard.js'
import dronedashboard from '../../dashboard/dronedashboard.js'
import airsensordashboard from '../../dashboard/airsensordashboard.js'
import airsensorcontroldashboard from '../../dashboard/airsensorcontroldashboard.js'
import airsensorstationdashboard from '../../dashboard/airsensorstationdashboard.js'
import airsensorstationpredictdashboard from '../../dashboard/airsensorstationpredictdashboard.js'
import alarmdashboard from '../../dashboard/alarmdashboard.js'
import WindNavigator from '../../windNavigator/WindNavigator.js'
import EventList from '../../eventList/EventList.js';
import eventProcPopup from '../../common/EventProcPopup.js';

const template = `
	<div class="flex">
		<headercomp></headercomp>
	<div class="index-wrap">
		<div class="quick-menu">
			<ul class="link">
				<li>
					<div class="map">
						<a href="#" v-on:click="onChangeMapSelector" class="active" value="baseMap2"><span>{{ $t("map.base") }}</span></a>
						<a href="#" v-on:click="onChangeMapSelector" value="satelliteMap"><span>{{ $t("map.satellite") }}</span></a>
					</div>
				</li>
				<!--<li>
					<a href="#"><span>3D</span></a>
				</li>
				<li>
					<a href="#"><span>주제도</span></a>
					<ul>
							<li><a href="#" data-target="#M21"><span>사업장안전</span></a></li>
							<li><a href="#" data-target="#M22"><span>통근버스</span></a></li>
							<li><a href="#" data-target="#M23"><span>열화상카메라</span></a></li>
							<li><a href="#" data-target="#M24"><span>LED 가로등</span></a></li>
							<li><a href="#" data-target="#M25"><span>교통 CCTV</span></a></li>
					</ul>
				</li>
				<li>
					<a href="#"><span>레이어</span></a>
					<ul>
							<li><a href="#" data-target="#M31"><span>산단환경지도</span></a></li>
							<li><a href="#" data-target="#M32"><span>실내지도</span></a></li>
							<li><a href="#" data-target="#M33"><span>도로명도로</span></a></li>
							<li><a href="#" data-target="#M34"><span>건물명</span></a></li>
					</ul>
				</li>-->
			</ul>
			<div class="control">
				<a id="test"  class="btn">관제메뉴</a>
					<ul>
						<li>
							<a href="#"><span>프리셋</span></a>
							<ul>
								<li>
									<div class="checkbox">
										<input type="checkbox" v-model="dashboardManage.onCctv1.isOpen" id="chk1"/><label for="chk1">1번</label>
									</div>
									
								</li>
								<li>
									<div class="checkbox">
										<input type="checkbox" v-model="dashboardManage.onCctv2.isOpen" id="chk2"/><label for="chk2">2번</label>
									</div><!--//checkbox-->
								</li>
							</ul>
						</li>
						<li>
							<a href="#"><span>프리셋</span></a>
							<ul>
								<li>
									<div class="checkbox">
										<input type="checkbox" v-model="dashboardManage.cctvGrade1.isOpen" id="chk3" @click="toggleCctvAreaPreset" value="838"/><label for="chk3">A-1</label>
									</div>
									
								</li>
								<li>
									<div class="checkbox">
										<input type="checkbox" v-model="dashboardManage.cctvGrade2.isOpen" id="chk4" @click="toggleCctvAreaPreset" value="843"/><label for="chk4">A-2</label>
									</div><!--//checkbox-->
								</li>
							</ul>
						</li>
						<li>
							<a href="#"><span>교통소통</span></a>
							<ul>
								<li>
									<div class="checkbox">
										<input type="checkbox" v-model="dashboardManage.traffic.isOpen" id="chk5"/><label for="chk5">교통소통정보</label>
									</div>
									
								</li>
								<li>
									<div class="checkbox">
										<input type="checkbox"  id="chk6"/><label for="chk6">교통돌발정보</label>
									</div><!--//checkbox-->
								</li>
							</ul>
						</li>
						<li>
							<a href="#"><span>드론</span></a>
						</li>
						<li>
							<a href="#"><span>청정기일괄제어</span></a>
							<ul>
								<li>
									<div class="radio">
										<input type="radio" name="radio" v-on:click="airControl(1)" id="chk7"/><label for="chk7">POWER - 1</label>
									</div>
								</li>
								<li>
									<div class="radio">
										<input type="radio" name="radio" v-on:click="airControl(2)" id="chk8"/><label for="chk8">POWER - 2</label>
									</div>
								</li>
								<li>
									<div class="radio">
										<input type="radio" name="radio" v-on:click="airControl(3)" id="chk9"/><label for="chk9">POWER - 3</label>
									</div>
								</li>
							</ul>
						</li>
						<li><a href="#"><span>유관기관전송</span></a></li>
					</ul>
			</div>
		</div> 
		<!-- quick menu end -->
		
		<!-- 프리셋 스티커 -->
		<div class="ly-preset" v-if="dashboardManage.onCctv1.isOpen || dashboardManage.onCctv2.isOpen">
				<dl>
					<dt>LEVEL. A (30초)</dt>
					<dd><div class="bg-red"></div></dd>
				</dl>
				<dl>
					<dt>LEVEL. B (20초)</dt>
					<dd><div class="bg-blue"></div></dd>
				</dl>
				<dl>
					<dt>LEVEL. C (5초)</dt>
					<dd><div class="bg-gray"></div></dd>
				</dl>
		</div>
		
		<!-- 교통 스티커 -->
		<div class="ly-topis" v-if="dashboardManage.traffic.isOpen">
				<ul>
					<li class="lv1">원활</li>
					<li class="lv2">서행</li>
					<li class="lv3">정체</li>
					<li class="lv4">정보없음</li>
				</ul>
		</div>		
		
		<!-- 상황발생 현황 목록 -->
		<!-- <EventList ref="eventListRef"/> -->
		
		<!-- 풍향/풍속 -->
		<windNavigator/>
		
		<!-- <eventProcPopup/> -->
		
		<div class="event-wrap">
			<h2>
				<a href="javascript:void(0);" class="btn-toggle">상황발생현황</a>
				<span class="num">{{ todayDashboardEventsNoChecking }}</span>
			</h2>
			<div class="cont">
				<div class="total">
					<h3>TODAY TOTAL</h3>
					<strong>{{ todayDashboardEvents.length }}</strong>
				</div>
				<div class="table-wrap">
					<table>
						<colgroup>
							<col width="10%" />
							<col width="20%" />
							<col width="30%" />
							<col width="25%" />
							<col width="15%" />
						</colgroup>
						<thead>
							<tr>
									<th scope="col">No.</th>
									<th scope="col">사업장</th>
									<th scope="col">발생시간</th>
									<th scope="col">메세지</th>
									<th scope="col">관리자확인</th>
							</tr>
						</thead>
					</table>
					<div class="scroll-wrap">
						<table>
							<colgroup>
								<col width="10%" />
								<col width="20%" />
								<col width="30%" />
								<col width="25%" />
								<col width="15%" />
							</colgroup>
							<tbody>
								<tr v-for="(item, index) in todayDashboardEvents" v-bind:key="index"
									 v-on:click="firePopEventId = item.id;getFirePopStep('EVENT_START', item);">
									<td class="center" style="cursor:pointer;">{{ item.id }}</td>
									<td class="center" style="cursor:pointer;"><!--[{{ item.grade.cdNm }}]--> {{ item.dashFacility }}</td>
									<td class="center" style="cursor:pointer;">{{ item.createDateTime | dateStringFormat('YYYY-MM-DD / HH:mm:ss') }}</td>
									<td class="center" style="cursor:pointer;">{{ item.confirmMessage }}</td>
									<td class="center" style="cursor:pointer;" v-if="item.checking">완료</td>
									<td class="center" style="cursor:pointer;" v-else>확인</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>  
		<!--event-wrap end-->
		
	</div>  
	<!--index-wrap end-->
	
	<div class="ly-warning" v-if="!fireMessagePop && firePopStep == 'EVENT_ALERT'">
		<div class="ly-box">
			<div class="bg">
				<div class="text">
					<h1>WARNING</h1>
					<p>상황이 발생하였습니다.</p>
				</div>
			</div>
		</div>
	</div>
	
	<div class="ly-fireside" v-if="firePopEventId != '' && firePopStep != ''">
		<div class="list-box">
            <ul class="list">
				<li v-bind:class="classEventStart"><a href="#" v-on:click="getFirePopStep('EVENT_START');">화재발생이벤트분석</a></li>
                <li v-bind:class="classFreesetManualStop"><a href="#" v-on:click="getFirePopStep('FREESET_MANUAL_STOP');">관리자확인(프리셋 수동 중지)</a></li>
                <li v-bind:class="classGetCoodinate"><a href="#" v-on:click="getFirePopStep('GET_COORDINATE');">좌표확인</a></li>
                <li v-bind:class="classSendCoordiDron"><a href="#" v-on:click="getFirePopStep('SEND_COORDI_DRON');">드론좌표전송</a></li>
                <li v-bind:class="classSendInfoRelated"><a href="#" v-on:click="getFirePopStep('SEND_INFO_RELATED');">유관기관 전송</a></li>
                <li v-bind:class="classSendSmsCompany"><a href="#" v-on:click="getFirePopStep('SEND_SMS_COMPANY');">산단기업SMS발송</a></li>
                <li v-bind:class="classEventFinish"><a href="#" v-on:click="getFirePopStep('EVENT_FINISH');">관리자 확인(상황종료)</a></li>
            </ul>
         </div>
	</div>

	<div class="ly-dark-alert event" v-if="!fireMessagePop && firePopStep == 'EVENT_START'">
		<h1>화재발생 이벤트 분석</h1>
		<ul class="list">
			<li>
					<label>불꽃 감지 이벤트</label><strong>이상 무</strong>
				</li>
				<li>
					<label>연기 감지 이벤트</label><strong class="red">발생</strong>
				</li>
				<li>
					<label>온도 감지 이벤트</label><strong class="red">발생</strong>
				</li>
		</ul>
		<div class="next-step">
			<h3>다음으로 진행 하시겠습니까?</h3>
			<div class="btn-group">
				<button type="button" class="btn on" v-on:click="fireNextPop();">다음</button>
				<button type="button" class="btn" v-on:click="getFirePopStep('EVENT_FINISH')">종료</button>
				<button type="button" class="btn" v-on:click="getFirePopStep('SEND_INFO_RELATED')">유관기관 전송</button>
			</div>
		</div>
		<button type="button" class="btn-closed" v-on:click="firePopStep = ''">창닫기</button>
	</div>
	
	<div class="ly-dark-alert" v-if="!fireMessagePop && firePopStep == 'FREESET_MANUAL_STOP'">
		<h1>프리셋 중지</h1>
        <div class="v-middle">
            <p class="text">프리셋 투어링을 중지합니다.(VMS)</p>
        </div>
        <div class="btn-group">
            <button type="button" class="btn" v-on:click="fireNextPop();">다음</button>
        </div>
			 
		<button type="button" class="btn-closed" v-on:click="firePopStep = ''">창닫기</button>
	</div>

	<div class="layer position on" style="top:350px; left:460px;" v-if="!fireMessagePop && firePopStep == 'GET_COORDINATE'">
        <div class="ly-cont">
            <h2 class="ly-title">좌표 확인</h2>
            <p class="sub-text">사업장 또는 지도를 클릭 해 주세요.</p>
            <ul class="list">
                <li>
                    <label>위도</label>
                    <span id="fireLatitude" v-bind="fireLatitude" >{{ fireLatitude }}</span>
                </li>
                <li>
                    <label>경도</label>
                    <span id="fireLongitude" v-bind="fireLongitude">{{ fireLongitude }}</span>
                </li>
            </ul>
            <div class="btn-group">
				<button type="button" class="btn on" v-on:click="fireNextPop();">다음</button>
            </div>
            <button type="button" class="btn-closed" v-on:click="firePopStep = ''">창닫기</button>
        </div>
	</div>
    
	<div class="ly-dark-alert location" v-if="!fireMessagePop && !commonConfirmPop && firePopStep == 'SEND_COORDI_DRON'" v-on="pointErase()">
           <h1>드론 좌표전송</h1>
           <ul class="list">
               <li>
                   <label>좌표</label>
                   <span>{{ fireLatitude }}</span>
                   <span>{{ fireLongitude }}</span>
               </li>
           </ul>
           <div class="btn-group">
			<button type="button" class="btn on" v-on:click="commonConfirmPop=true;">전송</button>
               <button type="button" class="btn" v-on:click="fireNextPop();">다음</button>
           </div>
		
		<button type="button" class="btn-closed" v-on:click="firePopStep = ''">창닫기</button>
	</div>

	<div class="ly-dark-alert" v-if="commonConfirmPop">
		<h1>{{ firePopStepNm }}</h1>
        <div class="v-middle">
            <p class="text">{{ firePopStepNm }}을 하시겠습니까?</p>
        </div>
        <div class="btn-group">
            <button type="button" class="btn" v-on:click="commonFireAction();">확인</button>
            <button type="button" class="btn" v-on:click="commonConfirmPop=false;">취소</button>
        </div>			
		<button type="button" class="btn-closed" v-on:click="commonConfirmPop=false;">창닫기</button>
	</div>

	<div class="ly-dark-alert location" v-if="!fireMessagePop && !commonConfirmPop && firePopStep == 'SEND_INFO_RELATED'">
           <h1>유관기관 전송</h1>
           <ul class="list">
               <li>
                   <label>좌표</label>
                   <span>{{ fireLatitude }}</span>
                   <span>{{ fireLongitude }}</span>
               </li>
               <li>
                   <label>드론영상</label>
                   <div class="switch">
                       <label class="switch-button">
                           <input type="checkbox"/><span class="onoff-switch"></span> 
                       </label>
                   </div>
               </li>
               <li>
                   <label>센터영상</label>
                   <div class="switch">
                       <label class="switch-button">
                           <input type="checkbox"/><span class="onoff-switch"></span> 
                       </label>
                   </div>
               </li>

           </ul>
           <div class="btn-group">
			<button type="button" class="btn on" v-on:click="commonConfirmPop=true;">전송</button>
               <button type="button" class="btn" v-on:click="fireNextPop();">다음</button>
           </div>
		
		<button type="button" class="btn-closed" v-on:click="firePopStep = ''">창닫기</button>
	</div>

	<div class="ly-dark-alert" v-if="fireMessagePop">
		<h1>{{ commonPopTitle }}</h1>
        <div class="v-middle">
            <p class="text">{{ commonPopMessage }}</p>
        </div>
        <div class="btn-group">
            <button type="button" class="btn" v-on:click="fireNextPop();">확인</button>
        </div>
			
		<button type="button" class="btn-closed" v-on:click="firePopStep = ''; fireMessagePop=false;">창닫기</button>
	</div>

	<div class="ly-dark-alert" v-if="!fireMessagePop && !commonConfirmPop && firePopStep == 'SEND_SMS_COMPANY'">
           <div class="v-middle">
               <p class="text">재난정보 SMS를 발송하시겠습니까?</p>
           </div>
           <div class="btn-group">
			<button type="button" class="btn on" v-on:click="commonConfirmPop=true;">발송</button>
               <button type="button" class="btn" v-on:click="fireNextPop();">다음</button>
           </div>
		
		<button type="button" class="btn-closed" v-on:click="firePopStep = ''">창닫기</button>
	</div>

	<div class="ly-dark-alert admin" v-if="!fireMessagePop && !commonConfirmPop && firePopStep == 'EVENT_FINISH'">
        <h1>관리자 확인</h1>
        <textarea placeholder="관리자 입력" rows="5" v-model="confirm_message"></textarea>
        <div class="btn-group">
            <button type="button" class="btn" v-on:click="commonConfirmPop=true;">확인</button>
        </div>
		
		<button type="button" class="btn-closed" v-on:click="firePopStep = ''">창닫기</button>
	</div>
	
	<div class="ly-mask" v-if="this.firePopStep != 'EVENT_ALERT' && firePopStep != 'GET_COORDINATE' && (fireMessagePop || firePopStep != '')"></div>
		
	<div style="display: flex; height: 100%; position: fixed; width: 100%; align-items: stretch;">
			<div style="width: 100%;">
				<div id="basemapArea" class="mainMap" v-resize="onResize">
				</div>
			</div>
	</div>
		
		<!--
		<div id="dashboardManagement">
			<div class="d-flex align-items-center" id="dashboardManagementFlexbox">
				<div class="dashboardManagementIconbox">
					<label for="dashboard_all" class="pointer">
						<img :src="dashboardIconPath(isOpenAllDashboard, 'all')"/>
					</label>
					<input type="checkbox" />
				</div>
				<div class="dashboardManagementIconbox">
                    <label for="dashboard_onCctv1" class="pointer">
                        <img :src="dashboardIconPath(dashboardManage.onCctv1.isOpen, 'onCctv1')"/>
                    </label>
                    <input type="checkbox" v-model="dashboardManage.onCctv1.isOpen" id="dashboard_onCctv1"/>
                </div>
                <div class="dashboardManagementIconbox">
                    <label for="dashboard_onCctv2" class="pointer">
                        <img :src="dashboardIconPath(dashboardManage.onCctv2.isOpen, 'onCctv2')"/>
                    </label>
                    <input type="checkbox" v-model="dashboardManage.onCctv2.isOpen" id="dashboard_onCctv2"/>
                </div>
                <div class="dashboardManagementIconbox">
                    <label for="dashboard_cctvGrade1" class="pointer">
                        <img :src="dashboardIconPath(dashboardManage.cctvGrade1.isOpen, 'cctvGrade1')"/>
                    </label>
                    <input type="checkbox" v-model="dashboardManage.cctvGrade1.isOpen" id="dashboard_cctvGrade1"/>
                </div>
                <div class="dashboardManagementIconbox">
                    <label for="dashboard_cctvGrade2" class="pointer">
                        <img :src="dashboardIconPath(dashboardManage.cctvGrade2.isOpen, 'cctvGrade2')"/>
                    </label>
                    <input type="checkbox" v-model="dashboardManage.cctvGrade2.isOpen" id="dashboard_cctvGrade2"/>
                </div>
                <div class="dashboardManagementIconbox">
                    <label for="dashboard_traffic" class="pointer">
                        <img :src="dashboardIconPath(dashboardManage.traffic.isOpen, 'traffic')"/>
                    </label>
                    <input type="checkbox" v-model="dashboardManage.traffic.isOpen" id="dashboard_traffic"/>
                </div>
				<div class="dashboardManagementIconbox">
					<label for="dashboard_air" class="pointer">
						<img :src="dashboardIconPath(dashboardManage.airSensor.isOpen, 'air')"/>
					</label>
					<input type="checkbox" v-model="dashboardManage.airSensor.isOpen" id="dashboard_air"/>
				</div>
				<div class="dashboardManagementIconbox">
					<label for="dashboard_drone" class="pointer">
						<img :src="dashboardIconPath(dashboardManage.droneStation.isOpen, 'drone')"/>
					</label>
					<input type="checkbox" v-model="dashboardManage.droneStation.isOpen" id="dashboard_drone"/>
				</div>
				<div class="dashboardManagementIconbox">
					<label for="dashboard_aircontrol" class="pointer">
						<img :src="dashboardIconPath(dashboardManage.airSensorControl.isOpen, 'aircontrol')"/>
					</label>
					<input type="checkbox" v-model="dashboardManage.airSensorControl.isOpen" id="dashboard_aircontrol"/>
				</div>
				<div class="dashboardManagementIconbox">
					<label for="dashboard_wallFreeSet" class="pointer">
						<img :src="dashboardIconPath(dashboardManage.wallFreeSet.isOpen, 'wallFreeSet')"/>
					</label>
					<input type="checkbox" v-model="dashboardManage.wallFreeSet.isOpen" id="dashboard_wallFreeSet"/>
				</div>
			</div>
		</div>
		-->
		
		<!-- 
		<div class="btn-group btn-group-toggle" data-toggle="buttons" id="mapSelector" v-bind:style="mapSelectorStyle()" ref="mapButtons">
			<label class="btn btn-info map-btn active">
    			<input type="radio" name="options" value="baseMap2" autocomplete="off" v-on:click="onChangeMapSelector" checked> {{ $t("map.base") }}
			</label>
			<label class="btn btn-info map-btn">
    			<input type="radio" name="options" value="satelliteMap" autocomplete="off" v-on:click="onChangeMapSelector"> {{ $t("map.satellite") }}
			</label>
			<button type="button" @click="wsTest">이벤트 알림</button>
	    </div>
		<div class="btn-group btn-group-toggle" data-toggle="buttons" id="mapSelector2" v-bind:style="mapSelectorStyle2()" ref="mapButtons">
			<label class="btn btn-info map-btn">
    			<input type="checkbox" name="options" value="" v-model="pointerOpen">점찍기
			</label>
			<button type="button" @click="drawComplete">그리기 완료</button>
			<button type="button" @click="drawErase">그림지우기</button>
			<button type="button" @click="saveDraw">그림 저장</button>

			<button type="button" @click="mapTest2">테스트</button>
			<button type="button" @click="wizTest">화재위치전송</button>

			<button type="button" @click="wizTest11">센서제어</button>
			<button type="button" @click="wizTest22">공기청정기제어</button>
			<label class="btn btn-info map-btn">
    			<input type="checkbox" name="getSpeed" value="" v-model="speedOpen">속도표출
			</label>
	    </div>



    	<div id="bottomLogo">
    		<img src="/static/images/bottom_logo.png"/>
    	</div>
		-->
		
		<div id="facilityPopup" ref="facilityPopup" class="ol-popup">
      		<a href="#" id="popup-closer" class="ol-popup-closer"></a>
      		<div id="olpopup-content" ref="olpopup-content">
      		</div>
    	</div>

    	<!-- 열화상카메라 영상 팝업 -->
    	<template v-for="item in fireCCTVFacility">
	        <div :id="'mainFireCCTVWindow' + item.fcode" class="container-fluid pt-1 shadow d-flex flex-column main-window mainFireCCTVWindow" :data-id="item.id" v-bind:style="fireCCTVStyle(item)" v-if="item.isOpen && hasRole('ADMIN, SECURITY')">
	        	<div class="row">
	        		<div class="col text-left">
	        			<img src="/api/facility/symbol/cctv.png" id="fireCctvIcon" class="symbolitem-s rounded"></img>
	        			<span class="pl-2 col align-middle main-window-title">
	        				<b>{{ $t("frontend.dashboard.fireCCTV.title") }}</b>
	        			</span>
	        		</div>
	        		<div class="col text-right">
	        			<button type="button" style="padding: 0; background-color: transparent; border: 0; outline: none;" @click="onShowPtzCtrl()">
	        				<img src="/static/icons/icons8-ptg-ctroller.svg" class="symbolitem-s rounded"></img>
	      				</button>
	        			<button type="button" class="window-maximaze-btn" style="padding: 0; background-color: transparent; border: 0; outline: none;" @click="onFullFireCCTV(item)">
	        				<i class="fa fa-window-restore" v-if="item.isFull"></i>
	        				<img src="/static/images/window_max_icon.png" v-else/>
	      				</button>
	        			<button type="button" class="ml-2 close" aria-label="Close" @click="onToggleFireCCTV(false, item)">
	        				<img src="/static/images/close_icon.png"/>
	      				</button>
	        		</div>
	        	</div>
	        	<div class="row flex-grow-1 window-contents-wrap">
	        		<div class="window-contents window-contents-padding" style="background-color:#3d4b62">
				    	<firecctvdashboard style="width:100%; height:100%;"
				    		v-bind:parentContainerId="'mainFireCCTVWindow' + item.fcode"
				    		v-bind:isFullScreen="item.isFull"
				    		v-bind:selectedFacility="selectedFacility"
				    		v-bind:isOpenFireCCTV="item.isOpen"
				    		v-bind:isShowPtzCtrl="isShowPtzCtrl"
				    		v-bind:fireCCTVContainerId="'videoContainer' + item.fcode"
				    		:fireCctvStreamingFacility="item"
				    		v-on:selectChangedFacility="onSelectChangedFacility">
				    	</firecctvdashboard>
					</div>
	        	</div>
	        </div>
        </template>

        <!-- 사업장 대기정보 팝업 -->
        <div id="mainAirSensorWindow" class="container-fluid pt-1 shadow main-window" v-bind:style="airSensorStyle()" v-if="dashboardManage.airSensor.isOpen">
        	<div class="row">
        		<div class="col text-left">
        			<img src="/api/facility/symbol/air-sensor.png?removable=0" id="airSensorIcon" class="symbolitem-s rounded"></img>
        			<span class="pl-2 col align-middle main-window-title">
        				<b>{{ $t("frontend.dashboard.airSensor.title") }}</b>
        			</span>
        		</div>
        		<div class="col text-right">
        			<button type="button" class="window-maximaze-btn" style="padding: 0; background-color: transparent; border: 0; outline: none;" @click="onFullAirSensor()">
        				<i class="fa fa-window-restore" v-if="dashboardManage.airSensor.isFull"></i>
        				<img src="/static/images/window_max_icon.png" v-else/>
        				<!-- <i class="fa fa-window-maximize" v-else></i> -->
      				</button>
        			<button type="button" class="ml-2 close" aria-label="Close" @click="onToggleAirSensor(false)">
        				<!-- <span aria-hidden="true">&times;</span> -->
        				<img src="/static/images/close_icon.png"/>
      				</button>
        		</div>
        	</div>
        	<div class="row flex-grow-1 window-contents-wrap">
        		<div class="window-contents" style="background-color:#3d4b62">
        			<airsensordashboard ref="airsensordashboardComp"
						v-bind:isFullScreen="dashboardManage.airSensor.isFull"
						v-bind:parentContainerId="'mainAirSensorWindow'"
						v-bind:isOpenAirSensor="dashboardManage.airSensor.isOpen"
						v-bind:airSensors="airSensorFacility"
						v-bind:selectedFacility="selectedFacility"
						></airsensordashboard>
        		</div>
        	</div>
        </div>

        <!-- 사업장 공기청정기 제어 팝업 -->
        <div id="mainAirSensorControlWindow" class="container-fluid pt-1 shadow main-window" v-bind:style="airSensorControlStyle()"
        	v-if="dashboardManage.airSensorControl.isOpen" style="opacity: 0.85;">
        	<div class="row">
        		<div class="col text-left">
        			<img src="/api/facility/symbol/air-sensor-control.png?removable=0" id="airSensorIcon" class="symbolitem-s rounded"></img>
        			<span class="pl-2 col align-middle main-window-title">
        				<b>{{ $t("frontend.dashboard.airSensorControl.title") }}</b>
        			</span>
        		</div>
        		<div class="col text-right">
        			<button type="button" class="window-maximaze-btn" style="padding: 0; background-color: transparent; border: 0; outline: none;" @click="onFullAirSensorControl()">
        				<i class="fa fa-window-restore" v-if="dashboardManage.airSensorControl.isFull"></i>
        				<img src="/static/images/window_max_icon.png" v-else/>
        				<!-- <i class="fa fa-window-maximize" v-else></i> -->
      				</button>
        			<button type="button" class="ml-2 close" aria-label="Close" @click="onToggleAirSensorControl(false)">
        				<!-- <span aria-hidden="true">&times;</span> -->
        				<img src="/static/images/close_icon.png"/>
      				</button>
        		</div>
        	</div>
        	<div class="row flex-grow-1 window-contents-wrap">
        		<div class="window-contents" style="background-color:#3d4b62">
        			<airsensorcontroldashboard ref="airsensorcontroldashboardComp"
        				v-bind:isFullScreen="dashboardManage.airSensorControl.isFull"
        				v-bind:parentContainerId="'mainAirSensorControlWindow'"
        				v-bind:isOpenAirSensorControl="dashboardManage.airSensorControl.isOpen"
        				v-bind:airSensors="airSensorFacility"
        				v-bind:alarmAirSensor="alarmAirSensor"
        				></airsensorcontroldashboard>
        		</div>
        	</div>
        </div>

        <!-- alarm 팝업 -->
        <div id="mainAlarmWindow" class="container-fluid pt-1 shadow main-window" v-bind:style="alarmStyle()" v-if="this.dashboardManage.alarm.isOpen" style="opacity: 0.85;">
        	<div class="row">
        		<div class="col text-left">
        			<!-- <img src="/api/facility/symbol/air-sensor.png?removable=0" id="airSensorIcon" class="symbolitem-s rounded"></img> -->
        			<span class="pl-2 col align-middle main-window-title">
        				<b>{{ $t("frontend.dashboard.alarm.title") }}</b>
        			</span>
        		</div>
        		<div class="col text-right">
        			<button type="button" class="window-maximaze-btn" style="padding: 0; background-color: transparent; border: 0; outline: none;" @click="onFullAlarm()">
        				<i class="fa fa-window-restore" v-if="this.dashboardManage.alarm.isFull"></i>
        				<img src="/static/images/window_max_icon.png" v-else/>
        				<!-- <i class="fa fa-window-maximize" v-else></i> -->
      				</button>
        			<button type="button" class="ml-2 close" aria-label="Close" @click="onToggleAlarm(false)">
        				<!-- <span aria-hidden="true">&times;</span> -->
        				<img src="/static/images/close_icon.png"/>
      				</button>
        		</div>
        	</div>
        	<div class="row flex-grow-1 window-contents-wrap">
        		<div class="window-contents" style="background-color: rgb(0, 0, 0, 0.2);">
        			<alarmdashboard ref="alarmdashboardComp"
						v-bind:isFullScreen="dashboardManage.alarm.isFull"
						v-bind:parentContainerId="'mainAlarmWindow'"
						v-bind:airSensor="airSensor"
						v-bind:pollutionStandard="pollutionStandard"
						v-bind:controlFacilityId="control_alarm_facility_id"
						></alarmdashboard>
        		</div>
        	</div>
        </div>

        <!-- 관측소 대기정보 팝업 -->
        <div id="mainAirSensorStationWindow" class="container-fluid pt-1 shadow d-flex flex-column main-window" style="opacity: 0.85;"
        		v-bind:style="airSensorStationStyle()" v-if="this.dashboardManage.airSensorStation.isOpen && hasRole('ADMIN, SECURITY')">
        	<div class="row">
        		<div class="col text-left">
        			<img src="/api/airsensor/symbol/weather-station.png" id="airSensorStationIcon" class="symbolitem-s rounded"></img>
        			<span class="pl-2 col align-middle main-window-title">
        				<b>{{ $t("frontend.dashboard.airSensorStation.title") }}</b>
        			</span>
        		</div>
        		<div class="col text-right">
        			<button type="button" class="window-maximaze-btn" style="padding: 0; background-color: transparent; border: 0; outline: none;" @click="onFullAirSensorStation()">
        				<i class="fa fa-window-restore" v-if="this.dashboardManage.airSensorStation.isFull"></i>
        				<img src="/static/images/window_max_icon.png" v-else/>
      				</button>
        			<button type="button" class="ml-2 close" aria-label="Close" @click="onToggleAirSensorStation(false)">
        				<img src="/static/images/close_icon.png"/>
      				</button>
        		</div>
        	</div>
        	<div class="row flex-grow-1 window-contents-wrap">
        		<div class="window-contents" style="background-color:#3d4b62">
        			<airsensorstationdashboard
        				v-bind:isFullScreen="this.dashboardManage.airSensorStation.isFull"
        				v-bind:parentContainerId="'mainAirSensorStationWindow'"
        				v-bind:isOpenAirSensorStation="this.dashboardManage.airSensorStation.isOpen"
        				v-bind:alarmAirSensor="alarmAirSensor"
        				></airsensorstationdashboard>
        		</div>
        	</div>
        </div>

        <!-- 관측소 대기예측 팝업 -->
        <div id="mainAirSensorStationPredictWindow" class="container-fluid pt-1 shadow d-flex flex-column main-window" style="opacity: 0.95;"
        		v-bind:style="airSensorStationPredictStyle()" v-if="this.dashboardManage.airSensorStationPredict.isOpen && hasRole('ADMIN, SECURITY')">
        	<div class="row">
        		<div class="col text-left">
        			<img src="/api/airsensor/symbol/weather-station.png" id="airSensorStationIcon" class="symbolitem-s rounded"></img>
        			<span class="pl-2 col align-middle main-window-title">
        				<b>{{ $t("frontend.dashboard.airSensorStationPredict.title") }}</b>
        			</span>
        		</div>
        		<div class="col text-right">
        			<button type="button" class="window-maximaze-btn" style="padding: 0; background-color: transparent; border: 0; outline: none;" @click="onFullAirSensorStationPredict()">
        				<i class="fa fa-window-restore" v-if="this.dashboardManage.airSensorStationPredict.isFull"></i>
        				<img src="/static/images/window_max_icon.png" v-else/>
      				</button>
        			<button type="button" class="ml-2 close" aria-label="Close" @click="onToggleAirSensorStationPredict(false)">
        				<img src="/static/images/close_icon.png"/>
      				</button>
        		</div>
        	</div>
        	<div class="row flex-grow-1 window-contents-wrap">
        		<div class="window-contents">
        			<airsensorstationpredictdashboard
        				v-bind:isFullScreen="this.dashboardManage.airSensorStationPredict.isFull"
        				v-bind:parentContainerId="'mainAirSensorStationPredictWindow'"
        				v-bind:isOpenAirSensorStationPredict="this.dashboardManage.airSensorStationPredict.isOpen"
        				v-bind:airsensorStations="airsensorStations"
        				>
        			</airsensorstationpredictdashboard>
        		</div>
        	</div>
        </div>

        <!-- 드론 영상 팝업 -->
        <div id="mainDroneStationWindow" class="container-fluid pt-1 shadow d-flex flex-column main-window mainDroneStationWindow" v-bind:style="droneStationStyle()" v-if="dashboardManage.droneStation.isOpen && hasRole('ADMIN, SECURITY')">
        	<div class="row">
        		<div class="col text-left">
        			<img src="/api/facility/symbol/drone-camera.png" id="droneStationIcon" class="symbolitem-s rounded"></img>
        			<span class="pl-2 col align-middle main-window-title">
        				<b>{{ $t("frontend.dashboard.droneStation.title") }}</b>
        			</span>
        		</div>
        		<div class="col text-right">
        			<button type="button" style="padding: 0; background-color: transparent; border: 0; outline: none;" @click="onShowDronePtzCtrl()">
        				<img src="/static/icons/icons8-ptg-ctroller.svg" class="symbolitem-s rounded"></img>
      				</button>
        			<button type="button" class="window-maximaze-btn" style="padding: 0; background-color: transparent; border: 0; outline: none;" @click="onFullDroneStation()">
        				<i class="fa fa-window-restore" v-if="dashboardManage.droneStation.isFull"></i>
        				<img src="/static/images/window_max_icon.png" v-else/>
        				<!-- <i class="fa fa-window-maximize" v-else></i> -->
      				</button>
        			<button type="button" class="ml-2 close" aria-label="Close" @click="onToggleDroneStation(false)">
        				<!-- <span aria-hidden="true">&times;</span> -->
        				<img src="/static/images/close_icon.png"/>
      				</button>
        		</div>
        	</div>
        	<div class="row flex-grow-1 window-contents-wrap">
        		<div class="window-contents window-contents-padding" style="background-color:#3d4b62">
 			        <dronedashboard style="width:100%; height:100%;"
                        v-bind:parentContainerId="'mainDroneStationWindow'"
                        v-bind:isFullScreen="dashboardManage.droneStation.isFull"
                        v-bind:droneStationFacility="droneStationFacility"
                        v-bind:selectedFacility="selectedFacility"
                        v-bind:isOpenDroneStation="dashboardManage.droneStation.isOpen"
                        v-bind:isShowPtzCtrl="isShowDronePtzCtrl"
                        v-bind:droneStationContainerId="'droneStationContainer'"
                        v-on:selectChangedFacility="onSelectChangedFacility">
                    </dronedashboard>
				</div>
        	</div>
        </div>

        <!-- 알림 팝업 -->
        <!-- <div id="mainNotificationWindow" class="container-fluid pt-1 shadow main-window" v-bind:style="notificationWindowStyle()" v-if="isOpenNotification">
        	<div class="row">
        		<div class="col text-left">
        			<img src="/api/facility/symbol/notification.png?removable=0" id="notificationIcon" class="symbolitem-s rounded"></img>
        			<span class="pl-2 col align-middle main-window-title">
        				<b>{{ $t("frontend.dashboard.notification.title") }}</b>
        			</span>
        		</div>
        		<div class="col text-right">
        			<button type="button" class="window-maximaze-btn" style="padding: 0; background-color: transparent; border: 0; outline: none;" @click="onFullNotification()">
        				<i class="fa fa-window-restore" v-if="isFullNotification"></i>
        				<img src="/static/images/window_max_icon.png" v-else/>
      				</button>
        			<button type="button" class="ml-2 close" aria-label="Close" @click="onToggleNotification(false)">
        				<img src="/static/images/close_icon.png"/>
      				</button>
        		</div>
	        </div>
	       	<div class="row flex-grow-1 window-contents-wrap">
        		<div class="nano window-contents">
        			<notificationbox v-bind:parentContainerId="'mainNotificationWindow'" v-bind:notifications="notificationItems" v-bind:isOpenNotification="isOpenNotification"></notificationbox>
        		</div>
        	</div>
        </div> -->

        <div id="mainWallFreeSetWindow" class="container-fluid pt-1 shadow main-window" v-bind:style="wallFreeSetWindowStyle()" v-if="dashboardManage.wallFreeSet.isOpen && hasRole('ADMIN, SECURITY')">
        	<div class="row">
        		<div class="col text-left">
        			<img src="/api/facility/symbol/wallFreeSet.png?removable=0" id="wallFreeSetIcon" class="symbolitem-s rounded"></img>
        			<span class="pl-2 col align-middle main-window-title">
        				<b>{{ $t("frontend.dashboard.wallFreeSet.title") }}</b>
        			</span>
        		</div>
        		<div class="col text-right">
        			<button type="button" class="ml-2 close" aria-label="Close" @click="onToggleWallFreeSet(false)">
        				<img src="/static/images/close_icon.png"/>
      				</button>
        		</div>
	        </div>
	       	<div class="row flex-grow-1 window-contents-wrap">
        	</div>
            <div style="text-align: center;top:10%" class="col">
                <div id="wallControlSelector" style="width:380px;"></div>
            </div>
            <div class="col sub-title" style="text-align:center;margin-top:23px;">
                <button id="btnAcceptWallControl" class="round-btn blue-btn" @click="wallControlConfirmCommon()">{{ $t("button.accept") }}</button>
            </div>
        </div>

        <div id="sirenWindow" class="container-fluid pt-1 shadow sirenMain-window" v-bind:style="sirenWindowStyle()" v-if="dashboardManage.siren.isOpen && hasRole('ADMIN, SECURITY')">
            <div class="row flex-grow-1 window-contents-wrap">
            </div>
            <div style="text-align: center; height:100px; top:35%; font-weight:900;" class="col">
                <label style="top:10%; color:white; font-size:90px; font-weight:900;"><strong>화재 이벤트 감지</strong></label>
            </div>
        </div>

        <!-- <div id="trafficWindow" class="container-fluid pt-1 shadow" v-if="dashboardManage.traffic.isOpen && hasRole('ADMIN, SECURITY')" >
            <div style="text-align: right; height:0px; top:200px; font-weight:100;" class="col">
                <img src="/static/images/traffic.png"/>
            </div>
        </div> -->

        <!--<div id="freeSetWindow" class="container-fluid pt-1 shadow" v-if="dashboardManage.onCctv1.isOpen || dashboardManage.onCctv2.isOpen" style="z-index:100" >
            <div style="text-align: right; height:0px; top:300px; font-weight:100;" class="col">
                <img src="/static/images/fire_level.png"/>
            </div>
        </div>-->
		
		<!--
        <div id="alarmDashBordWindow" class="container-fluid pt-1 shadow main-window" v-bind:style="alarmDashBordWindowStyle()" v-if="dashboardManage.alarmDashBord.isOpen && hasRole('ADMIN, SECURITY')">
            <div class="row flex-grow-1 window-contents-wrap">
                <div class="col text-left">
                    <span class="pl-2 col align-middle main-window-title">
                        <b>{{ $t("frontend.dashboard.alarmDashBord.title") }}</b>
                    </span>
                    <button type="button" class="ml-2 close" aria-label="Close" @click="onToggleAlarmDashBord(false)">
                        <img src="/static/images/close_icon.png"/>
                    </button>
                </div>
            </div>
            <div style="height:100px; top:7%; color:white; font-size:20px;" class="col">
                <table>
                    <tr style="text-align: center; font-size:30px;" width="300">
                        <td colspan="3" style="text-align: center;" width="200"><strong>화재발생 이벤트</strong></td>
                        <td></td>
                    </tr>
                    <br/><br/>
                    <tr>
                        <td width="160px">
                            <strong><span style="color:red;">불꽃</span> 감지 이벤트 :</strong>
                        </td>
                        <td>
                            <span id="fieryEvent"><strong>{{fiery}}</strong></span>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td width="160px">
                            <strong><span style="color:gray;">연기</span> 감지 이벤트 :</strong>
                        </td>
                        <td>
                            <span id="smokeEvent"><strong>{{smoke}}</strong></span>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td width="160px">
                            <strong><span style="color:blue;">온도</span> 감지 이벤트 :</strong>
                        </td>
                        <td>
                            <span id="temperatureEvent"><strong>{{temperature}}</strong></span>
                        </td>
                    </tr>
					<br/>
                    <tr>
                        <td width="160px">
                            <strong> 프리셋 위치 :</strong>
                        </td>
                        <td>
                            <span id="temperatureEvent"><strong>{{cctv}}-{{preSet}}</strong></span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
		-->
		
		<!-- 화재 경보시 -->
	    <div class="popup alarm" @click="dashboardManage.alarmDashBord.isOpen=false" v-if="dashboardManage.alarmDashBord.isOpen && hasRole('ADMIN, SECURITY')">
	        <div class="popup-cont">
	            <h3 class="alarm-title">화재 감시 알림</h3>
	            <dl>
	                <dt>불꽃 감지 이벤트</dt>
	                <dd>{{fiery}}</dd>
	            </dl>
	       
	            <dl>
	                <dt>연기 감지 이벤트</dt>
	     			<dd>{{smoke}}</dd>
	            </dl>
	            
	            <dl>
	                <dt>온도 감지 이벤트</dt>
	            	<dd>{{temperature}}</dd>
	            </dl>
	            <dl>
	                <dt>프리셋 위치</dt>
					<dd v-if="cctv!=0">{{cctv}}-{{preSet}}</dd>
	            </dl>

	        </div>
	        <div class="pop-bg bg1 blink1"></div>
	        <div class="pop-bg bg2 blink2"></div>
	    </div>
	    
	    <!-- Modal -->
	    <modal></modal>
	    
	</div>
`;

