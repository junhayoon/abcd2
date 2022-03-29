/**
 * 
 */
 
export {template as default};

import fullCover from '../../common/fullCover.js';

const template = `
    <fullCover v-bind:is-open="isPopupOpen">
    	<div v-bind:style="style.background">
    		<div v-bind:style="style.titleWrap">
    			<span v-bind:style="style.titleWrap.span">이벤트 확인</span>
    		</div>
    		<div v-bind:style="style.infoWrap">
    			<div v-bind:style="style.infoWrap.container">
    				<span v-bind:style="[style.infoWrap.comp, style.infoWrap.comp.title]">사업장</span>
    				<span v-bind:style="[style.infoWrap.comp, style.infoWrap.comp.text]">인천스마트시티</span>
    			</div>
    			<div v-bind:style="style.infoWrap.container">
    				<span v-bind:style="[style.infoWrap.comp, style.infoWrap.comp.title]">센서종류</span>
    				<span v-bind:style="[style.infoWrap.comp, style.infoWrap.comp.text]">IoT전기화재</span>
    			</div>
    			<div v-bind:style="style.infoWrap.container">
    				<span v-bind:style="[style.infoWrap.comp, style.infoWrap.comp.title]">발생일시</span>
    				<span v-bind:style="[style.infoWrap.comp, style.infoWrap.comp.text]">2022-03-04 12:00:00</span>
    			</div>
    			<div v-bind:style="style.infoWrap.container">
    				<span v-bind:style="[style.infoWrap.comp, style.infoWrap.comp.title]">등급</span>
    				<span v-bind:style="[style.infoWrap.comp, style.infoWrap.comp.text]">CRITICAL</span>
    			</div>
    			<div v-bind:style="style.infoWrap.container">
    				<span v-bind:style="[style.infoWrap.comp, style.infoWrap.comp.title]">내용</span>
    				<span v-bind:style="[style.infoWrap.comp, style.infoWrap.comp.text]">짜라란</span>
    			</div>
    		</div>
    		<div v-bind:style="style.buttonWrap">
    			<button v-bind:style="[style.buttonWrap.button, {backgroundColor: 'red'}]" @click="close">취소</button>
    			<button v-bind:style="[style.buttonWrap.button, {backgroundColor: 'black'}]">확인</button>
    			<button v-bind:style="[style.buttonWrap.button, {backgroundColor: 'blue'}]">다음</button>
    		</div>
    	<div>
    </fullCover>
`;