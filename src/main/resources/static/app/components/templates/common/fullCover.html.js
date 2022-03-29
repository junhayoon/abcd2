/**
 * 
 */
 
export {template as default};

const template = `
    <div id="full-cover-comp" 
    	 style="position: absolute; width: 100%; height: calc(100% - 50px); background-color: rgba(128, 128, 128, 0.6); z-index: 1000;"
		 v-bind:style="{display: isOpen ? 'block' : 'none'}">
		<slot></slot>
	</div>
`;
