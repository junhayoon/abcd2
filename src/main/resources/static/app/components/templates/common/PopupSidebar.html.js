export {template as default};

const template = `
<!--<div class="main-sidebar" id="popup-sidebar" style="display:none">
		<div >
            <div class="position-relative">
                <img src="/static/images/event_sidebar_top.png"  style="width:250px;"/>
            </div>
            
            <div class="position-relative">
                <div class="eventAbsoluteWrap eventDynamicBg popup-column" id="popupList">
                    <div id="mainAirSensorPopupWindow" class="container-fluid pt-1 shadow popupMain-window" style="display:none; cursor: pointer;">
                        <div class="row" @click="onToggle('airSensor')">
                            <div class="col text-left">
                                <img src="/api/facility/symbol/air-sensor.png?removable=0" class="symbolitem-s rounded"></img>
                                <span class="pl-2 col align-middle popupMain-window-title">
                                    <b>{{ $t("frontend.dashboard.airSensor.title") }}</b>
                                </span>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div id="mainDroneStationPopupWindow" class="container-fluid pt-1 shadow popupMain-window" style="display:none; cursor: pointer;">
                        <div class="row" @click="onToggle('droneStation')">
                            <div class="col text-left">
                                <img src="/api/facility/symbol/drone-camera.png?removable=0" class="symbolitem-s rounded"></img>
                                <span class="pl-2 col align-middle popupMain-window-title">
                                    <b>{{ $t("frontend.dashboard.droneStation.title") }}</b>
                                </span>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div id="mainAirSensorControlPopupWindow" class="container-fluid pt-1 shadow popupMain-window" style="display:none; cursor: pointer;">
                        <div class="row" @click="onToggle('airSensorControl')">
                            <div class="col text-left">
                                <img src="/api/facility/symbol/air-sensor-control.png?removable=0" class="symbolitem-s rounded"></img>
                                <span class="pl-2 col align-middle popupMain-window-title">
                                    <b>{{ $t("frontend.dashboard.airSensorControl.title") }}</b>
                                </span>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div id="mainWallFreeSetPopupWindow" class="container-fluid pt-1 shadow popupMain-window" style="display:none; cursor: pointer;">
                        <div class="row" @click="onToggle('wallFreeSet')">
                            <div class="col text-left">
                                <img src="/api/facility/symbol/wallFreeSet.png?removable=0" class="symbolitem-s rounded"></img>
                                <span class="pl-2 col align-middle popupMain-window-title">
                                    <b>{{ $t("frontend.dashboard.wallFreeSet.title") }}</b>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <img src="/static/images/event_sidebar_bottom.png" style="width:250px;"/>
            </div>
        </div>
	</div> -->

`;

