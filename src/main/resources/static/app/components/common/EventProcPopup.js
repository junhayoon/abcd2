/**
 * 
 */

import eventProcPopup from '../templates/common/EventProcPopup.html.js'

export default Vue.component('eventProcPopup', {
	template: eventProcPopup,
	computed: {
		
	},
	data: function () {
 		return {
			isPopupOpen: true,
			style: {
				background: {
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '500px',
					height: '500px',
					padding: '50px',
					backgroundColor: '#14182d',
					display: 'flex',
					flexDirection: 'column',
					borderTop: '12px solid rgba(143,17,17,0.83)',
					boxShadow: '5px 5px 6px 0 rgb(0 0 0 / 30%)'
				},
				titleWrap: {
					flex: 1,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					span: {
						fontSize: '25px',
						fontWeight: 'bold',
						color: '#FFFFFF',
					}
				},
				infoWrap: {
					flex: 8,
					borderTop: '1px solid rgba(255, 255, 255, 0.6)',
					borderBottom: '1px solid rgba(255, 255, 255, 0.6)',
					padding: '15px 0px',
					margin: '15px 0px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					container: {
						display: 'flex',
						flexDirection: 'row',
					},
					comp: {
						padding: '0px 10px',
						fontSize: '19px',
						margin: '10px 0px',
						title: {
							flex: 3,
							textAlign: 'right'
						},
						text: {
							flex: 7,
							textAlign: 'left'
						}
					}
				},
				buttonWrap: {
					flex: 1,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-around',
					button: {
						color: '#FFFFFF',
						fontSize: '20px',
						padding: '10px 20px'
					}
				}
			}
	  	};
	},
	methods: {
		close: function() {
			this.isPopupOpen = false;
		}
	},
	mounted: function () {
		
	}
});