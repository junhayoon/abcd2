
import template from '../templates/dashboard/cctvdashboard.html.js'
import i18n from '../../i18n/index.js'

export default Vue.component('cctvdashboard', {
	i18n,
	props: { cctvs: Array, selectedFacility: Object, isOpenCCTV: Boolean, videoContainerId: String, parentContainerId: String, isFullScreen: Boolean },
	template: template,
	data: function () {
		return {
			error_message: '',
			displayBlockSize: 9,
			displayColSize: 3,
			displayNextBlock: 0,
			currentDisplayItems: [],
			timer: null,
			isSingleVideoMode: false,
			resizeTimer: null
		}
	},
	computed: {
		activeCctvs: function() {
			return this.cctvs.filter((item) => {
				return (item.properties != null && item.properties.mediaIp != null 
						&& item.properties.mediaPort != null && item.properties.mediaChannel != null
						&& item.properties.mediaIp.length > 0 && item.properties.mediaChannel.length > 0);
			});
		}
	},
	watch: {
		cctvs: function() {
			let me = this;
			me.clearVideo();
			setTimeout(() => {
				me.init();
			}, 500);
		},
		selectedFacility: function() {
			this.activeSelectFacility();
		},
		isFullScreen: function() {
			let me = this;
			me.clearVideo();
			setTimeout(() => {
				me.init();
			}, 500);
		}
	},
	methods: {
		activeSelectFacility: function() {
			$("#" + this.videoContainerId).find("li").removeClass("border border-warning bg-dark text-white");
			$("#" + this.videoContainerId).find("li").css("margin", "1px");
			if(this.selectedFacility.id != null) {
				$("#li_"+this.selectedFacility.id).css("margin", "0px");
				$("#li_"+this.selectedFacility.id).addClass("border border-warning bg-dark text-white");
			}
		},
		handleTimer: function() {
			var me = this;
			this.clearVideo();
			
			if(this.activeCctvs.length > (this.displayNextBlock + 1)*this.displayBlockSize) {
				this.displayNextBlock += 1;
			} else {
				this.displayNextBlock = 0;
			}
			this.currentDisplayItems.splice(0, this.currentDisplayItems.length);
			setTimeout(() => {
				me.currentDisplayItems = me.activeCctvs.slice(me.displayNextBlock*me.displayBlockSize, me.displayNextBlock*me.displayBlockSize + me.displayBlockSize);
				while(me.currentDisplayItems.length < me.displayBlockSize) {
					me.currentDisplayItems.push({
						id: 'dummy_' + me.currentDisplayItems.length
					});
				}
				me.playVideo();
			}, 500);
		},
		playVideo: function() {
			var me = this;
			setTimeout(() => {
				me.currentDisplayItems.forEach((item, index) => {
					
					let v = null;
					
					let labelHeight = 25 ;
					let margin = 1;
					let spaceHeight = labelHeight + margin*2;
					let spaceWidth = margin*2;
					
					let width = Number.parseInt($("#" + me.videoContainerId).css("width")) - margin*2;
					let height = Number.parseInt($("#" + me.videoContainerId).css("height")) - margin*2;
					let cols = 1;
					let rows = 1;
					let totalCnt = me.activeCctvs.length;
					
					if(!this.isSingleVideoMode) {
						cols = this.activeCctvs.length < me.displayColSize ? this.activeCctvs.length : me.displayColSize;
						rows = Math.min(Math.ceil(this.activeCctvs.length/me.displayColSize), me.displayBlockSize/me.displayColSize);
					}
					
					let w = Math.floor(width/cols)-spaceWidth;
					let h = Math.floor(height/rows)-spaceHeight;
					
					let step = 5;
					let i = 0;
					while(Math.floor((w-i*step)*45/80) > h) {
						i++;
					}
					w = w - step*i;
					
					let videoWidth = w;
					let videoHeight = Math.floor(w*45/80);

					if(item.properties != null && item.properties["mediaIp"] != null && item.properties["mediaPort"] != null && item.properties["mediaChannel"] != null) {
						v = RunPlayer(item.id + '' + index, videoWidth, videoHeight, item.properties["mediaIp"], item.properties["mediaPort"], false, 
								[item.properties["mediaChannel"]], "", true, false, 0, "", false, me.$i18n);
						
						v.on("click", function(evt) {
							me.$emit('selectChangedFacility', item);
						});
						
						if(totalCnt > 1) {
							v.on("dblclick", function(evt) {
								if(me.isSingleVideoMode) {
									me.isSingleVideoMode = false;
									me.clearVideo();
									me.init();
								} else {
									me.isSingleVideoMode = true;
									me.clearVideo();
									me.single();
								}
							});
						}
					} else {
						$('#li_' + item.id).empty();
						$('#li_' + item.id).html("<div class='bg-transparent' style='width:"+videoWidth+"px; height:"+videoHeight+"px;'></div><div class='overflow-hidden text-center' style='color:transparent;'><small>Dummy</small></div>");
					}
				})
			}, 500);
		},
		clearVideo: function() {
			this.currentDisplayItems = [];
		},
		init: function() {
			let me = this;
			if(this.timer != null) {
				clearInterval(this.timer);
				this.timer = null;
			}
			
			me.clearVideo();
			this.currentDisplayItems = this.activeCctvs.slice(this.displayNextBlock, this.displayBlockSize);
			
			this.displayNextBlock = 0;
			this.playVideo();
			
			if(this.activeCctvs.length > this.displayBlockSize) {
				this.timer = setInterval(this.handleTimer, 1000*10);
			}
			
			this.$emit('selectChangedFacility', {});
		},
		single: function() {
			let me = this;
			
			if(me.timer != null) {
				clearInterval(me.timer);
				me.timer = null;
			}
			
			me.currentDisplayItems = [];
			
			me.currentDisplayItems.push(me.selectedFacility);
			
			this.displayNextBlock = 0;
			me.playVideo();
		},
		onResize: function(ev) {
			let me = this;
			me.clearVideo();
			
			if(me.resizeTimer != null) {
				clearTimeout(me.resizeTimer);
				me.resizeTimer = null;
			}
			
			me.resizeTimer = setTimeout(() => {
				me.init();
			}, 500);
		}
	},
	created: function () {
		
	},
	mounted: function () {
		let me = this;
		if(this.isOpenCCTV) {
			me.clearVideo();
			setTimeout(() => {
				me.init();
			}, 500);
		}
		
		setTimeout(() => {
			$("#" + me.parentContainerId).on('resize', me.onResize);
		}, 500);
	},
	updated: function() {
		
	}
});