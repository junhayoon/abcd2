export {template as default};

const template = `
    <div class="popup alarm" @click="close" v-show="isOpen">
        <div class="popup-cont">
            <h3 class="alarm-title">실시간 상황 알림</h3>
            <dl>
                <dt>발생 사업장</dt>
                <dd>{{modalData.facility_name}}</dd>
            </dl>
            <dl>
                <dt>센서정보</dt>
                <dd>{{modalData.sensor_type_str}}</dd>
            </dl>
            <dl>
                <dt>경보내용</dt>
                <dd>{{modalData.event_msg}}</dd>
            </dl>
            <dl>
                <dt>최초 감지시각</dt>
                <dd>{{ modalData.event_dt }}</dd>
            </dl>
        </div>
        <div class="pop-bg bg1 blink1"></div>
        <div class="pop-bg bg2 blink2"></div>
    </div>
`;

