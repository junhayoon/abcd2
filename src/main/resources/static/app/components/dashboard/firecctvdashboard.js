
import template from '../templates/dashboard/firecctvdashboard.html.js'
import i18n from '../../i18n/index.js'

export default Vue.component('firecctvdashboard', {
	i18n,
	props: {
		selectedFacility: Object,
		isOpenFireCCTV: Boolean,
		isShowPtzCtrl: Boolean,
		fireCCTVContainerId: String,
		parentContainerId: String,
		isFullScreen: Boolean,
		fireCctvStreamingFacility: Object
	},
	template: template,
	data: function () {
		return {
			apiPtzMoveCamera: '/api/camera/moveContinuously',
			apiPtzZoomCamera: '/api/camera/zoomContinuously',
			apiPtzStopCamera: '/api/camera/stop',
			error_message: '',
			resizeTimer: null,
			
			vmsPlayer: null,
			isPlayingCctv: false,
			ptzSpeed: 10,
		}
	},
	computed: {
		
	},
	watch: {
		selectedFacility: function() {
			this.activeSelectFacility();
		},
		isFullScreen: function() {
			let me = this;
			me.init();
		},
		isShowPtzCtrl: function() {
			//console.log("firecctvdashboard.js watch: isShowPtzCtrl 1..." + this.isShowPtzCtrl);
			//this.onResize();
		},
		fireCctvStreamingFacility: function() {
			this.init();
		}
	},
	methods: {
		activeSelectFacility: function() {
			$("#" + this.fireCCTVContainerId).find("li").removeClass("border border-warning bg-dark text-white");
			$("#" + this.fireCCTVContainerId).find("li").css("margin", "1px");
			if(this.selectedFacility.id != null) {
				$("#li_"+this.selectedFacility.id).css("margin", "0px");
				$("#li_"+this.selectedFacility.id).addClass("border border-warning bg-dark text-white");
			}
		},
		init: function() {
			//console.log("firecctvdashboard.js init() 1...");
			
			let me = this;
			
			// 현재 열린 열화상카메라의 영상관련 정보가 있다면 영상 재생
			var fireCctvStreamingFacility = me.fireCctvStreamingFacility;
			if(fireCctvStreamingFacility.properties != null && fireCctvStreamingFacility.properties.mediaIp != null 
				&& fireCctvStreamingFacility.properties.mediaPort != null && fireCctvStreamingFacility.properties.mediaVurixUrl != null
				&& fireCctvStreamingFacility.properties.mediaIp.length > 0 && fireCctvStreamingFacility.properties.mediaVurixUrl.length > 0) {
				
				me.playVmsVideo();
			}

			this.$emit('selectChangedFacility', {});
			
			//console.log("firecctvdashboard.js init() end...");
		},
		playVmsVideo: function () {
			//console.log("firecctvdashboard.js playVmsVideo() 1...");
			
			var me = this;
			me.clearVmsPlayer();

			setTimeout(() => {
				var playFacility = me.fireCctvStreamingFacility;
				let elementId = "fire_streaming" + playFacility.fcode;
				let elementPlayer = document.getElementById(elementId);
				
	            if (elementPlayer != null) {
	            	let player = me.createVmsPlayer(elementId, playFacility.properties.mediaIp, playFacility.properties.mediaPort, playFacility.properties.mediaVurixUrl);
	            	if (player != null) {
	            		elementPlayer.appendChild(player);		            		
	            		me.vmsPlayer = player;
	            		dmsVideoPlayer.streamPlay(player);
	            	}
			    }
			}, 500);
        	//this.$parent.getFreeSetInfo();
        	//console.log("firecctvdashboard.js playVmsVideo() end...");
		},
        stopVmsVideo: function (player) {
		   	if (player != null) {
            	dmsVideoPlayer.streamStop(player);
            	dmsVideoPlayer.playerClose(player);
            }
        },
        clearVmsPlayer: function() {
        	let me = this;
        	
        	me.stopVmsVideo(me.vmsPlayer);        		
    		if(me.vmsPlayer != null) me.vmsPlayer.parentNode.removeChild(me.vmsPlayer);
        	me.vmsPlayer = null;
        },
        createVmsPlayer: function (elementId, mediaIp, mediaPort, mediaVurixUrl) {
        	console.log("createVmsPlayer() 1..." + elementId + ", " + mediaIp + ", " + mediaPort + ", " + mediaVurixUrl);
        	
			let me = this;

		    let mediaUrl = "vurix:///" + mediaVurixUrl;
		    let proto = "vurix";
		    let stream = "ws://" + mediaIp + ":" + mediaPort + "/media/api/v1/stream";	//"ws://112.219.69.210:16852/media/api/v1/stream";
		    let videoOptions = {
		    	'id': elementId,                           
		        'url':  mediaUrl,      
		        'srcType' : proto,                           
		        'stream': stream,                  
		        'errorMsgFunc': me.vmsMsgCallback,
		        'transcode': 0              
		    };
		    
		    let player = dmsVideoPlayer.createVideo(videoOptions);
		    
		    return player;		    	
		},
		vmsMsgCallback: function(err) {
			const errStr = JSON.stringify(err, null, 4);	        
	        console.log("firecctvdashboard.js vmsMsgCallback() end..." + errStr);
	    },
		onResize: function(ev) {
			let me = this;
			
			if(me.resizeTimer != null) {
				clearTimeout(me.resizeTimer);
				me.resizeTimer = null;
			}
			
			me.resizeTimer = setTimeout(() => {
				me.init();
			}, 500);
		},
		initPtz: function() {
			var me = this;
			
			if (me.isShowPtzCtrl) {			
				var ptzUp = document.getElementById("ptzUp");
				var ptzDown = document.getElementById("ptzDown");
				var ptzLeft = document.getElementById("ptzLeft");
				var ptzRight = document.getElementById("ptzRight");
				
				var ptzLeftUp = document.getElementById("ptzLeftUp");
				var ptzLeftDown = document.getElementById("ptzLeftDown");
				var ptzRightUp = document.getElementById("ptzRightUp");		
				var ptzRightDown = document.getElementById("ptzRightDown");
				
				var ptzZoomIn = document.getElementById("ptzZoomIn");
				var ptzZoomOut = document.getElementById("ptzZoomOut");
				var ptzHome = document.getElementById("ptzHome");						 
				
				//ptzUp.addEventListener("click", this.handlePtzUpClick);
				//ptzUp.addEventListener("mousemove", this.handlePtzUpMouseMove);
				
				ptzUp.addEventListener("mousedown", this.handlePtzUp);			
				ptzDown.addEventListener("mousedown", this.handlePtzDown);			
				ptzLeft.addEventListener("mousedown", this.handlePtzLeft);
				ptzRight.addEventListener("mousedown", this.handlePtzRight);
				
				ptzLeftUp.addEventListener("mousedown", this.handlePtzLeftUp);
				ptzLeftDown.addEventListener("mousedown", this.handlePtzLeftDown);
				ptzRightUp.addEventListener("mousedown", this.handlePtzRightUp);
				ptzRightDown.addEventListener("mousedown", this.handlePtzRightDown);
				
				ptzZoomIn.addEventListener("mousedown", this.handlePtzZoomIn);
				ptzZoomOut.addEventListener("mousedown", this.handlePtzZoomOut);
				
				ptzUp.addEventListener("mouseup", this.handlePtzStop);
				ptzDown.addEventListener("mouseup", this.handlePtzStop);
				ptzLeft.addEventListener("mouseup", this.handlePtzStop);
				ptzRight.addEventListener("mouseup", this.handlePtzStop);
				
				ptzLeftUp.addEventListener("mouseup", this.handlePtzStop);
				ptzLeftDown.addEventListener("mouseup", this.handlePtzStop);
				ptzRightUp.addEventListener("mouseup", this.handlePtzStop);
				ptzRightDown.addEventListener("mouseup", this.handlePtzStop);
				
				ptzZoomIn.addEventListener("mouseup", this.handlePtzStop);
				ptzZoomOut.addEventListener("mouseup", this.handlePtzStop);
				
				ptzHome.addEventListener("click", this.handlePtzHome);
			}			
		},
		moveCamera: function(ip, up, down, left, right) {
			var me = this;	
			
			axios.get(me.apiPtzMoveCamera, {params: {
									ip: ip,
									up: up,
									down: down,
									left: left,
									right: right
									}})		
    		.then(res => {
    		})
    		.catch(err => {
    		});
		},
		zoomCamera: function(ip, zoomIn) {
			var me = this;			
			axios.get(me.apiPtzZoomCamera, {params: {
									ip: ip,
									zoomIn: zoomIn
									}})		
    		.then(res => {
    		})
    		.catch(err => {
    		});
		},
		stopCamera: function(ip) {
			var me = this;			
			axios.get(me.apiPtzStopCamera, {params: {
									ip: ip
									}})		
    		.then(res => {
    		})
    		.catch(err => {
    		});
		},
	    handlePtzUp: function (event) {
	    	let me = this;
	    	//me.moveCamera("223.171.53.193", true, false, false, false);	    	
	    	dmsVideoPlayer.ptzUp(me.vmsPlayer, me.ptzSpeed);	    	
		},
		handlePtzDown: function (event) {
			let me = this;
	    	dmsVideoPlayer.ptzDown(me.vmsPlayer, me.ptzSpeed);
		},
		handlePtzLeft: function (event) {
			let me = this;
	    	dmsVideoPlayer.ptzLeft(me.vmsPlayer, me.ptzSpeed);
			
		},
		handlePtzRight: function (event) {
			let me = this;
			dmsVideoPlayer.ptzRight(me.vmsPlayer, me.ptzSpeed);
		},
		handlePtzLeftUp: function (event) {
			let me = this;
			dmsVideoPlayer.ptzUpLeft(me.vmsPlayer, me.ptzSpeed);
		},
		handlePtzLeftDown: function (event) {
			let me = this;
			dmsVideoPlayer.ptzDownLeft(me.vmsPlayer, me.ptzSpeed);
		},
		handlePtzRightUp: function (event) {
			let me = this;
			dmsVideoPlayer.ptzUpRight(me.vmsPlayer, me.ptzSpeed);
		},
		handlePtzRightDown: function (event) {
			let me = this;
			dmsVideoPlayer.ptzDownRight(me.vmsPlayer, me.ptzSpeed);
		},
		handlePtzZoomIn: function (event) {
			let me = this;			
			//me.zoomCamera("223.171.53.193", true);
			dmsVideoPlayer.ptzZoomIn(me.vmsPlayer);
		},
		handlePtzZoomOut: function (event) {
			let me = this;
			dmsVideoPlayer.ptzZoomOut(me.vmsPlayer);
		},
		handlePtzStop: function (event) {
			let me = this;
			//me.stopCamera("223.171.53.193");
			dmsVideoPlayer.ptzStop(me.vmsPlayer);
		},
		handlePtzHome: function (event) {
		    console.log("handlePtzHome() 1...");	
		},
	},
	created: function () {
		
	},
	beforeMounted: function() {
		//console.log("firecctvdashboard.js beforeMounted: end...");
	},
	mounted: function () {
		let me = this;
		
		if(this.isOpenFireCCTV) {
			me.init();
		}

		$("#" + me.parentContainerId).on('resize', me.onResize);
	},
	beforeUpdated: function() {

	},
	updated: function() {
		this.initPtz();	
		
		//console.log("firecctvdashboard.js updated end...");									
	},
	beforeDestroy: function() {
		this.clearVmsPlayer();
		//console.log("firecctvdashboard.js beforeDestroy end...");
	},
});