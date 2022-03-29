import modalTemplate from '../templates/common/modal.html.js'

export default Vue.component('modal', {
	template: modalTemplate,
	computed: {
		...Vuex.mapGetters({
			isOpen: 'basic/getEventAlertShow',
			modalData: 'basic/getEventAlertData'
		})
	},
	data: function () {
 		return {
			loading: true,
			dashboardEvent: {},
			timer: '',
	  	};
	},
	methods: {
	  	close() {
			this.$store.commit('basic/setEventAlertShow', false);
		}
	},
	mounted: function () {
		
	},
	beforeDestroy: function() {
	
	}
});