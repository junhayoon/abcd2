import sidebartemplate from '../templates/common/PopupSidebar.html.js'

export default Vue.component('popupsidebar', {
	props: {},
	template: sidebartemplate,
	components: {},
	computed: {
		
	},
	watch: {
	},
	methods: {
        /*handler(e) {
          console.log('click', e);  
        },
        onToggle: function(key) {
            console.log("key : " + key);
        }*/
        onToggle: function(key) {
            this.$parent.onToggle(key);
        }
	},
	created: function () {
	},
	mounted: function () {
        
	},
	updated: function() {
        this.$on(['click', 'mainAirSensorWindow1'], e => { console.log('event', e) })		
	}
});