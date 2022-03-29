
import menutemplate from '../templates/common/sidebarmenu.html.js'

export default Vue.component('sidebarmenu', {
	template: menutemplate,
	components: {
		
	},
	data: function () {
		return {
			sidebar: true
		}
	},
	computed: {
		...Vuex.mapGetters({
			linkUrl: 'basic/getLinkUrl'
		}),
	    activeFacilityMenu: function() {
	        return this.$router.currentRoute.name == 'Facility' ? true : false;
	    },
	    activeFlightMenu: function() {
	        return this.$router.currentRoute.name == 'Flight' ? true : false;
	    },
	    activeMediaMenu: function() {
	        return this.$router.currentRoute.name == 'Media' ? true : false;
	    },
	    activeNotiHistoryMenu: function() {
	        return this.$router.currentRoute.name == 'NotiHistory' ? true : false;
	    },
	    activeAirWorkplaceMenu: function() {
	        return this.$router.currentRoute.name == 'AirWorkplace' ? true : false;
	    },
	    activeAirStationMenu: function() {
	        return this.$router.currentRoute.name == 'AirStation' ? true : false;
	    },
	    activeUserMenu: function() {
	        return this.$router.currentRoute.name == 'User' ? true : false;
	    },
	    activeUserRegMenu: function() {
	        return this.$router.currentRoute.name == 'UserReg' ? true : false;
	    },
//	    activeMenu: function(activeMenu) {
//	    	return this.$router.currentRoute.name === activeMenu ? "active" : "";
//	    }
	},
	watch: {
		
	},
	methods: {
		onClickMediaManagementMenu: function(e) {
			e.stopPropagation();
			$("#mediaManagementSubmenu").collapse('toggle');
		},
		onClickAirManagementMenu: function(e) {
			e.stopPropagation();
			$("#airManagementSubmenu").collapse('toggle');
		},
		//onClickUserManagementMenu: function(e) {
		//	e.stopPropagation();
		//	$("#userManagementSubmenu").collapse('toggle');
		//}
		activeMenu: function(activeMenu) {
	    	return this.$router.currentRoute.name === activeMenu ? "active" : "";
	    },
	    activeIconPath: function(activeMenu, imageName) {
	    	var imageName = "";
	    	switch(activeMenu) {
	    		case "Facility": {imageName = "facility"; break;}
	    		case "FacilityCategory": {imageName = "facility_category"; break;}
	    		case "NotiHistory": {imageName = "facility"; break;}
	    		case "AirWorkplace": {imageName = "facility"; break;}
	    		case "AirStation": {imageName = "facility"; break;}
	    		case "User": {imageName = "profile"; break;}
	    		case "UserReg": {imageName = "user"; break;}
	    	}
	    	var onOff = this.$router.currentRoute.name === activeMenu ? "on" : "off"
	    	return "/static/images/" + imageName + "_" + onOff + "_icon.png";
	    },
	    activeMenuBgPath: function(menu) {
	    	var onoff = this.$router.currentRoute.name === menu ? "on" : "off";
	    	return "/static/images/sub_menu_" + menu + "_bg_" + onoff + ".png";
	    }
	},
	created: function () {
		
	},
	mounted: function () {
		
	},
	updated: function () {
		var me = this;
		
		//console.log("sidebarmenu.js updated 1..." + JSON.stringify(me.linkUrl));	
	},
	
});