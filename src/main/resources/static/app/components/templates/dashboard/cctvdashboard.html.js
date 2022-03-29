export {template as default};

const template = `
	<div v-bind:id="videoContainerId" class="overflow-hidden rounded border border-gray flex-wrap flex-row flex-wrap justify-start items-start" style="height: fit-content; widht:fit-content;">
		<transition-group name="list" class="d-flex flex-wrap list-unstyled justify-content-center" tag="ul" style="height: fit-content; margin-bottom:0px;">	
			<li v-for="(item, index) in currentDisplayItems" v-bind:key="index" v-bind:id="'li_' + item.id" style="width: fit-content; height: fit-content; margin:1px;">
    			<UnrealHTML5VideoPlayer v-bind:id="item.id + '' + '' + index"></UnrealHTML5VideoPlayer>
    			<div class="overflow-hidden text-center"><strong style="color:white">{{ item.facilityName }}</strong></div>
    		</li>
		</transition-group>
	</div>
`;
