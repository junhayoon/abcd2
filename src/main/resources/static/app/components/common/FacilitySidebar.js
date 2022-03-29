import sidebartemplate from '../templates/common/FacilitySidebar.html.js'

export default Vue.component('facilitysidebar', {
	props: {
		facilityItems: Array,
		facilityItemsByCategory: Array,
		symbolVectorSource: Array,
		currentScale: Number,
		setCenter: Function
	},
	template: sidebartemplate,
	components: {},
	data: function () {
		return {
			facilityShowType: "list",
			allChk: true,
			activeIndex: -1
		}
	},
	computed: {
		
	},
	watch: {
		
	},
	methods: {
		toggleAllSymbolVisible: function(e) {
			var checked = e.target.checked;
			this.facilityItemsByCategory.forEach(function(item) {
				item.isVisible = checked;
				item.facilityItems.forEach(function(facility) {
					facility.isVisible = checked;
				});
			});
			
			var opacity = e.target.checked ? 1 : 0;
			this.symbolVectorSource.getFeatures().forEach(function(feature) {
				feature.getStyle().getImage().setOpacity(opacity);
				feature.changed();
			});
		},
		toggleSymbolVisible: function(e, index) {
			var opacity = e.target.checked ? 1 : 0;
			
			var feature = this.symbolVectorSource.getFeatureById(index);
			feature.getStyle().getImage().setOpacity(opacity);
			feature.changed();
			
			var allChecked = this.facilityItems.every(function(facility) {
				return facility.isVisible;
			});
			this.allChk = allChecked;
			
			var ccode = this.facilityItems[index].facilityCategory.ccode;
			this.facilityItemsByCategory.some(function(item) {
				if(item.ccode === ccode) {
					var categoryChecked = item.facilityItems.every(function(facility) {
						return facility.isVisible;
					});
					item.isVisible = categoryChecked;
					
					return true;
				}
				return false;
			});
		},
		toggleSybolVisibleByCategory: function(e) {
			var me = this;
			
			var id = e.target.id;
			var checked = e.target.checked
			var opacity = checked ? 1 : 0;
			
			me.facilityItemsByCategory.some(function(item) {
				if(item.ccode === id) {
					item.facilityItems.forEach(function(facility) {
						facility.isVisible = checked;
						
						var feature = me.symbolVectorSource.getFeatureById(facility.index);
						feature.getStyle().getImage().setOpacity(opacity);
						feature.changed();
					});
					return true;
				}
				return false;
			});
			
			var allChecked = this.facilityItems.every(function(facility) {
				return facility.isVisible;
			});
			this.allChk = allChecked;
		},
		getCategorySymbolPath: function(item) {
			return this.apiFacilitySymbol + '/' + item.facility.facilityCategory.categorySymbol + '.png';
		},
		changeFacilityShow: function(type) {
			this.facilityShowType = type;
		},
		facilityClick: function(i) {
			var nextIsOpen = !this.facilityItemsByCategory[i].isOpen;
			this.facilityItemsByCategory[i].isOpen = nextIsOpen;
			
			this.toggleSubMenu(nextIsOpen, i);
		},
		toggleSubMenu(isOpen, i) {
			var subMenuRef = this.$refs["facilitySubMenu" + i][0];
			if(isOpen) {
				var subMenuListRef = this.$refs["facilitySubMenuList" + i][0];
				var height = subMenuListRef.clientHeight + 2;
				subMenuRef.style.maxHeight = height + "px";
			} else {
				subMenuRef.style.maxHeight = "0px";
			}
		},
		arrowImagePath: function(isOpen) {
			if(isOpen) {
				return "/static/images/menu_s_open.png";
			} else {
				return "/static/images/menu_s_close.png";
			}
		},
		facilitySubMenuHeight: function(i) {
			// 슬라이드 애니메이션을 위해 하위메뉴에 max-height 값을 지정해줘야 함
			// 하위 메뉴 한개의 항목 세로 길이가 31px이기 때문에 서브메뉴 갯수만큼 31을 곱해준다.
			// 서브메뉴에 전체보기도 들어가야해서 facilityItems의 length에 +1을 해준다.
			// 서브메뉴 상단 border가 이미지로 되어있는데 height가 2px이기 때문에 마지막에 2를 더해준다.
			var height = (this.facilityItemsByCategory[i].facilityItems.length + 1) * 31 + 2;
			return "max-height:" + height + "px;";
		},
		iconViewFacilityIconPath: function(symbol, isVisible) {
			var onoff = isVisible ? "on" : "off";
			return "/static/images/" + symbol + "-" + onoff + "-icon.png";
		},
		onFacility: function(e, index) {
			var me = this;
			
			// 현재 선택된 시설물 아이콘의 scale을 0.2 증가, 그 외의 시설물 아이콘들은 기존 크기로 변경
			this.symbolVectorSource.forEachFeature(function(feature) {
				if(feature != null) {
					var style = feature.getStyle();
					var image = style.getImage();
					if(feature.getId() === index) {
						style.setZIndex(20);
						image.setScale(me.currentScale + 0.5);
					} else {
						style.setZIndex(10);
						image.setScale(me.currentScale);
					}
					feature.changed();
				}
			});
			
			// 현재 선택된 index 저장 (하위메뉴 백그라운드 하이라이트를 위해)
			me.activeIndex = index;
			
			// 지도 중앙으로 심볼 이동
			var pt = [this.facilityItems[index].longitude, this.facilityItems[index].latitude];
			this.setCenter(pt);
		}
	},
	created: function () {
		
	},
	mounted: function () {
		
	},
	updated: function() {
		
	}
});