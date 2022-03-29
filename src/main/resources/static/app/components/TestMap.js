
const raster = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'https://icloud.incheon.go.kr/Basemap/Normal_kor/{z}/{x}/{y}.png'
    })
});

const source = new ol.source.Vector({
	WrapX: false
});

const vector = new ol.layer.Vector({
	source: source
});

export default Vue.component('TestMap', {
	template: '<div id="basemapArea" class="mainMap" style="height: 700px; width: 700px;">dd</div>',
	components: {

	},
	data: function () {
		return {
			map: null,
			draw: null,
			currentZoom: 15
		}
	},
	computed: {
		mapCenterLatLong: function() {
			return [126.695906, 37.405324];
		}
	},
	watch: {
		
	},
	methods: {
		createMap: function() {
			this.map = new ol.Map({
				layers: [raster, vector],
				target: 'basemapArea',
				view: new ol.View({
					center: ol.proj.transform(this.mapCenterLatLong, 'EPSG:4326', 'EPSG:900913'),
					zoom: this.currentZoom,
			        minZoom: 1,
			        maxZoom: 20,
			
				}),
			})
		},
		drawLine: function() {
			const value = 'LineString';
			this.draw = new ol.interaction.Draw({
				source: source,
				type: value
			});
			this.map.addInteraction(this.draw);
		}
	},
	created: function () {

	},
	mounted: function () {
		this.createMap();
		this.drawLine();
	}
});
