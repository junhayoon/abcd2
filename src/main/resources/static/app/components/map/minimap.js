
import template from '../templates/map/minimap.html.js'

export default Vue.component('minimap', {
	template: template,
	components: {
		
	},
	props: ['mode', 'target'],
	data: function () {
		return {
			baseMap: 'http://xdworld.vworld.kr:8080/2d/Base/201908/{z}/{x}/{y}.png',
			//baseMap2: 'http://xdworld.vworld.kr:8080/2d/Base/201908/{z}/{x}/{y}.png', // vworld 기본지도
			baseMap2: 'https://icloud.incheon.go.kr/Basemap/Normal_kor/{z}/{x}/{y}.png', // 인천시 기본지도
			//satelliteMap: 'http://xdworld.vworld.kr:8080/2d/Satellite/201807/{z}/{x}/{y}.jpeg', // vworld 위성지도
			satelliteMap: 'https://icloudgis.incheon.go.kr/server/rest/services/Outer_image/BASEMAP_AIREX_WM/MapServer/tile/{z}/{y}/{x}', // 인천시 항공사진
			hybridMap: 'http://xdworld.vworld.kr:8080/2d/Hybrid/201812/{z}/{x}/{y}.png',
			mapArea: null,
			newMode: false,
			viewMode: false,
			currentCoordinate: [],
			newFacilityName: this.$i18n.t("label.new_facility"),
			newSymbolName: 'default.png',
			newSymbolRemovable: 0,
			symbolPath: '/api/facility/symbol/',
			symbolFeature: null,
			symbolVectorSource: null,
			symbolVectorLayer: null,
			facilityItems: []
		}
	},
	computed: {
		
	},
	watch: {
		
	},
	methods: {
		setNewSymbolProperties: function(symbol, removable) {
			this.newSymbolName = symbol + ".png";
			this.newSymbolRemovable = removable;
		},
		onResize: function(size) {
		      
		},
		updateSize: function() {
			this.mapArea.updateSize();
		},
		onMouseMove: function(event) {
			this.mapArea.getTargetElement().style.cursor = this.mapArea.hasFeatureAtPixel(event.pixel) ? 'pointer' : '';
		},
		onClick: function(event) {
			var me = this;
			
			this.currentCoordinate = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
			this.$emit('coordinate', this.currentCoordinate);
			
			if(this.mode == 'new') {
				this.addNewSymbolName(this.currentCoordinate, this.newFacilityName, this.newSymbolName, this.newSymbolRemovable);
			} else {
				this.mapArea.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
			        if(feature != null) {
			        	me.$emit('selectedSymbol', feature.getId());
			        }
			    });
			}
		},
		addNewSymbolName: function(coordinate, name, symbol, enable) {
			if(symbol.lastIndexOf(".png") == -1) {
				symbol += ".png";
			}
			if(this.symbolFeature == null) {
				this.symbolFeature = new ol.Feature({
					name: name,
					geometry: new ol.geom.Point(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:900913')),
				});
				
				var iconStyle = new ol.style.Style({
					image: new ol.style.Icon({
						anchor: [0.5, 40],
						size : [48, 48],
						anchorXUnits: 'fraction',
				        anchorYUnits: 'pixels',
					    src: this.symbolPath + symbol + "?removable=" + enable
					})
				});
				
				this.symbolFeature.setStyle(iconStyle);
			} else {
				this.symbolFeature.getGeometry().setCoordinates(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:900913'));
			}
			
			if(this.symbolVectorSource == null) {
				this.symbolVectorSource = new ol.source.Vector({
					  features: [this.symbolFeature]
				});
			}
			
			if(this.symbolVectorLayer == null) {
				this.symbolVectorLayer = new ol.layer.Vector({
					  source: this.symbolVectorSource
				});
				
				this.mapArea.addLayer(this.symbolVectorLayer);
			}
		},
		updateNewSymbolName: function(name, symbol, enable) {
			this.newFacilityName = name;
			this.newSymbolName = symbol;
			if(this.newSymbolName.indexOf(".png") == -1) {
				this.newSymbolName += ".png";
			}
			this.newSymbolRemovable = enable;
			
			if(this.symbolFeature != null) {
				var iconStyle = new ol.style.Style({
					image: new ol.style.Icon({
						anchor: [0.5, 40],
						size : [48, 48],
						anchorXUnits: 'fraction',
				        anchorYUnits: 'pixels',
					    src: this.symbolPath + this.newSymbolName + "?removable=" + this.newSymbolRemovable
					})
				});
				
				this.symbolFeature.setStyle(iconStyle);
			}
			
		},
		removeAllLayer: function() {
			/* new mode init */
			if(this.symbolVectorSource != null) {
				this.symbolVectorSource.clear(true);
				this.symbolVectorSource = null;
			}
			if(this.symbolVectorLayer != null) {
				this.mapArea.removeLayer(this.symbolVectorLayer);
				this.symbolVectorLayer = null;
			}		
			
			this.symbolFeature = null;
			this.newFacilityName = this.$i18n.t("label.new_facility");
			this.newSymbolName = 'default.png';
			this.newSymbolRemovable = 0;
			
			/* view mode init */
			this.facilityItems = [];
		},
		redraw : function() {
			var me = this;
			setTimeout( function() { me.mapArea.updateSize();}, 100);
		},
		addSymbol: function(id, facilityName, coordinate, symbolName, symbolRemovable) {
			var me = this;
			
			var symbolFeature = new ol.Feature({
				name: facilityName,
				geometry: new ol.geom.Point(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:900913')),
			});
			symbolFeature.setId(id);
			
			var iconStyle = new ol.style.Style({
				image: new ol.style.Icon({
					anchor: [0.5, 40],
					size : [48, 48],
					anchorXUnits: 'fraction',
			        anchorYUnits: 'pixels',
				    src: this.symbolPath + symbolName + ".png?removable=" + symbolRemovable
				})
			});
			
			symbolFeature.setStyle(iconStyle);

			if(this.symbolVectorSource == null) {
				this.symbolVectorSource = new ol.source.Vector({
					  features: [symbolFeature]
				});
			} else {
				this.symbolVectorSource.addFeature(symbolFeature);
			}
			
			if(this.symbolVectorLayer == null) {
				this.symbolVectorLayer = new ol.layer.Vector({
					  source: this.symbolVectorSource
				});
				
				this.mapArea.addLayer(this.symbolVectorLayer);				
			}
		},
		selectedSymbol: function(id) {
			if(this.symbolVectorSource != null) {
				this.symbolVectorSource.forEachFeature(function(feature) {
					if(feature != null) {
						if(feature.getId() == id) {
							feature.getStyle().getImage().setScale(1.2);
						} else {
							feature.getStyle().getImage().setScale(1.0);
						}
						feature.changed();
					}
				});
			}
		},
		setFacility: function(facilityItems) {
			this.facilityItems = facilityItems;
			
			if(this.symbolVectorSource != null) {
				this.symbolVectorSource.clear(true);
			}
			
			for(var i=0; i<this.facilityItems.length; i++) {
				var item = this.facilityItems[i];
				this.addSymbol(item.fcode, item.facilityName, [item.longitude, item.latitude], item.facilityCategory.categorySymbol, item.facilityCategory.categorySymbolRemovable == false ? 0 : 1);
			}
		},
		setCenter: function(coordinate) {
			this.mapArea.getView().setCenter(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:900913'));
		}
	},
	created: function () {
		if(this.mode == 'new') this.newMode = true;
		if(this.mode == 'view') this.viewMode = true;
	},
	mounted: function () {
		this.mapArea = new ol.Map({
			target: this.target,
			layers: [
				new ol.layer.Tile({
					source: new ol.source.XYZ({
						url: eval('this.baseMap2')
			        })
				})
			],
			view: new ol.View({
				center: ol.proj.transform([126.695906, 37.405324], 'EPSG:4326', 'EPSG:900913'),
				zoom: 15,
		        minZoom: 14,
		        maxZoom: 20
			}),
			controls: ol.control.defaults().extend([
			    new ol.control.ScaleLine()
			])
		});
		
		this.mapArea.on('click', this.onClick);
		this.mapArea.on('pointermove', this.onMouseMove);
	}
});