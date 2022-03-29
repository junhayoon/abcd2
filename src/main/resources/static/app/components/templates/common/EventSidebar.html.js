export {template as default};

const template = `
	<div class="main-sidebar" id="event-sidebar">
		<div>
			<div class="position-relative">
				<img src="/static/images/event_sidebar_top.png"/>
				<div class="eventSidebarTitle d-flex align-items-center">
					<img src="/static/images/event_count_title_icon.png"/>
					<span>{{ $t("notification.sidebar.count_title") }}</span>
				</div>
			</div>
			
			<div class="position-relative">
				<img src="/static/images/event_sidebar_bg.png"/>
				<div class="position-absolute eventAbsoluteWrap">
					<div class="d-flex justify-content-between align-items-center flex-wrap eventFlexWrap">
						<div v-for="item in levelList" class="eventIcon">
							<img :src="'/static/images/event_' + item.key + '_icon.png'">
							<span class="bold">{{ item.count | fillZero(2) }}</span>
						</div>
					</div>
				</div>
			</div>
			
			<div>
				<img src="/static/images/event_sidebar_bottom.png"/>
			</div>
		</div>
		
		<div style="margin-top:20px;" >
            <div class="position-relative">
                <img src="/static/images/event_sidebar_top.png"  style="width:350px;"/>
                <div class="eventSidebarTitle d-flex align-items-center">
                    <img src="/static/images/event_msg_title_icon.png"/>
                    <span>{{ $t("notification.sidebar.notification_title") }}</span>
                </div>
            </div>
            
            <div class="position-relative">
                <div class="eventAbsoluteWrap eventDynamicBg">
                    <div class="eventDynamicScrollWrap">
                        <div v-for="item in notiList" class="d-flex justify-content-between align-items-center eventMsgWrap">
                            <span>{{ item.create_date | dateStringFormat("MM/DD HH:mm") }}</span> <!-- YYYY-MM-DD -->
                            <span style="text-align:left;" v-if="item.facility != null && item.facility != undefined" :title="'['+item.facility.facilityName+'] '+item.info+' '+item.data">{{ item.info }}</span>
                            <span style="text-align:left;" v-else :title="item.info+' '+item.data">{{ item.info }}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <img src="/static/images/event_sidebar_bottom.png" style="width:350px;"/>
            </div>
        </div>
	</div>
`;

