export {template as default};

const template = `
	<div v-bind:id="target" class="mapArea" v-bind:class="{ newMiniMap: newMode, viewMiniMap: viewMode }" v-resize="onResize">
`;

