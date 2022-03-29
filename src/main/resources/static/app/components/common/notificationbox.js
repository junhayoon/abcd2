
import template from '../templates/common/notificationbox.html.js'
import i18n from '../../i18n/index.js'

export default Vue.component('notificationbox', {
	i18n,
	props: { parentContainerId: String, notifications: Array, isOpenNotification: Boolean, isFullScreen: Boolean },
	template: template,
	data: function () {
		return {
			itemCnt: 0,
			maxCnt: 50
		}
	},
	computed: {
		
	},
	watch: {
		notifications: function() {
			let me = this;
			let oldCnt = this.itemCnt;
			me.itemCnt = me.notifications.length;
			if(oldCnt < me.itemCnt) {
				setTimeout(() => function() {
					me.updateNonoScrollbar({ scroll: 'top' });
				}, 200);
			} else {
				setTimeout(() => function() {
					me.updateNonoScrollbar();
				}, 200);
			}
			
			if(me.maxCnt < me.notifications.length) {
				me.notifications.shift();
			}
		}
	},
	methods: {
		updateNonoScrollbar: function(option) {
			let me = this;
			
			// top과 bottom의 padding 2px만큼 더 빼기 위해 4를 추가로 뺌
			let h = $("#" + me.parentContainerId).height() - $("#" + me.parentContainerId).children().first().height() - 4;
			$("#notificationContainer").css("height", h + "px");
			
			$(".nano").nanoScroller(option);
			$(".nano-content").css("margin-right", "0px");
		},
		onResize: function() {
			let me = this;
			me.updateNonoScrollbar();
		},
		onClickDeleteItem: function(index) {
			let me = this;
			me.notifications.splice(index, 1);
		}
	},
	created: function () {
	
	},
	mounted: function () {
		let me = this;
		setTimeout(() => {
			$("#" + me.parentContainerId).on('resize', me.onResize);
			me.updateNonoScrollbar({ scroll: 'top' });
		}, 300);
	}
});