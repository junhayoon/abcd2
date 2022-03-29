/**
 * 풍향 / 풍속 Template(HTML)
 */
 
export {template as default};

const template = `
	<div class="windNavigatorContainer">
		<div id="navigator-bg">
			<div id="navigator-arrow" :style="{ transform: 'rotate('+ windDirection +'deg)'}"/>
		</div>
		<div id="wind-speed-info">{{windSpeed}} ㎧</div>
	</div>
`;