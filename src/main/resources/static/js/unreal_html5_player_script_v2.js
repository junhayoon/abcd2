var global_players = [];

function RunPlayer(strVideoPlayerID, intVideoWidth, intVideoHeight, strServerIP, intServerPort, boolSecureWebsocket, strOrArrayLiveAlias, strSecureToken, boolAutoPlay, boolShowControls, intLocalSeekMinutes, strPosterURL, boolBigButtons, i18n)
{
    if (!("MediaSource" in window && "WebSocket" in window))
        return null;

    var mimeCodec;
    var mediaSrc = null;
    var ws = null;
    var sourceBuffer = null;
    var playerStarted = false;
    var latestTimestamp = 0;
    var firstTimestamp = 0;
    var segmentsQueue = [];
    var maxLocalBuffer = intLocalSeekMinutes * 60;
    var progressMouseDown = false;
    var stopPressed = false;
    var strLiveAlias;
    var videoDuration = 0;
    var mobileBrowser = false;
    var rendererStarted = false;
    var lastDeleteTimestamp = 0;
    var pausedTime = 0;
    var startupDone = false;
    var realTimeStream = false;
    var bufferingInProgress = false;
    var playOK = false;
    var timeUpdateInterval = null;
    var playingInRealTime = true;
    var lastPlayPosition = -1;

    //Variables for adaptive streaming
    var adaptiveInterval = null;
    var bufferFillingCounter = 0;
    var bufferEmptyCounter = 1;
    var curArrayIndex = 0;
    var switchCount = 0;
    var toSwitchHigherCount = 1;
    var switchedUp = false;

    //Variables for Timeshift
    var timeshiftedPlayback = false;
    var timeshiftSessionGlobalStartTime = 0;
    var timeshiftSessionCurrentTime = -1;
    var timeshiftPlaybackStartTime = 0;
    var timeshiftPlaybackStartTimeLocalClock = 0;
	var timeshiftBufferLimit = 0;
	var timeshiftPos = 0;
	var timeshiftInProgress = true;
	var timeshiftSeeking = false;
	var timeshiftStartingAfterSeek = false;
	var timeshiftLateStartAfterSeek = false;
	var timeshiftDurationAfterSeek = 0;
	var timeshiftFlowControlPaused = false;
	var timeshiftCurSec = 0;
	var timeshiftRightSec = 0;
	var timeshiftLeftSec = 0;

    if (strOrArrayLiveAlias.constructor === Array)
        strLiveAlias = strOrArrayLiveAlias[0];
    else
        strLiveAlias = strOrArrayLiveAlias;

    if (maxLocalBuffer < 0)
        maxLocalBuffer = 0;

    var liveEdgePoint = Math.min(0.99, intVideoWidth * 0.00004 + 0.95);

    var sURI = (boolSecureWebsocket) ? "wss://" : "ws://";
    sURI += strServerIP + ":" + intServerPort + "/" + strLiveAlias;
    if (strSecureToken != "")
        sURI += "/sid:" + strSecureToken;

    var videoContainer = document.getElementById(strVideoPlayerID);
    if (videoContainer == null)
        return null;

    videoContainer.style.width = intVideoWidth + "px";
    videoContainer.style.height = intVideoHeight + "px";
    videoContainer.style.position = "relative";

    var videoTagID = strVideoPlayerID + "_Video";
    var videoControlsTagID = strVideoPlayerID + "_videoControls";
    var volSliderTagID = strVideoPlayerID + "_volSlider";
    var showTimeTagID = strVideoPlayerID + "_showTime";
    var playpauseTagID = strVideoPlayerID + "_playpause";
    var stopTagID = strVideoPlayerID + "_stop";
    var volumeTagID = strVideoPlayerID + "_volume";
    var progressTagID = strVideoPlayerID + "_progress";
    var fullscreenTagID = strVideoPlayerID + "_fullscreen";
    var progressTipTagID = strVideoPlayerID + "_progressTip";
    var statusmessageTagID = strVideoPlayerID + "_statusmessage";

    // Create video element and controls
    videoContainer.innerHTML =  "<video id=\"" + videoTagID + "\" width=\"" + intVideoWidth + "\" height=\"" + intVideoHeight + "\" style=\"background-color: black\"></video>" +
                                "<div id=\"" + videoControlsTagID + "\" class=\"controls\" data-state=\"hidden\">" +
	                            "<button id=\"" + playpauseTagID + "\" type=\"button\" data-state=\"play\">Play/Pause</button>" +
	                            "<button id=\"" + stopTagID + "\" type=\"button\" data-state=\"stop\">Stop</button>" +
                                "<div id=\"" + showTimeTagID + "\" style=\"width:130px; text-align:center; margin-top: 11px; padding-left: 2px; color: #FFFFFF;\">0:00 / 0:00</div>" +
                                "<input type=\"range\" id=\"" + progressTagID + "\" min=\"0\" max=\"0\" step=\"0.1\" value=\"0\" style=\"cursor:pointer; margin-top: 14px;\"/>" +
	                            "<button id=\"" + volumeTagID + "\" type=\"button\" data-state=\"volume\">Volume</button>" +
	                            "<button id=\"" + fullscreenTagID + "\" type=\"button\" data-state=\"go-fullscreen\">Fullscreen</button></div>" +
                                "<div id=\"" + progressTipTagID + "\" style=\"z-index: 100; white-space: nowrap; position: absolute; display: none; color: #FFFFFF; \"></div>" +
                                "<input type=\"range\" id=\"" + volSliderTagID + "\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0.5\" style=\"cursor:pointer; z-index: 100; position: absolute; display: none; width: 100px; height: 12px; padding:20px; -webkit-transform:rotate(270deg); -moz-transform:rotate(270deg); -o-transform:rotate(270deg); -ms-transform:rotate(90deg); transform:rotate(270deg);\"/>" +
                                "<div id=\"" + statusmessageTagID + "\" style=\"z-index: 100; position: absolute; display: none; color: red; \"></div>";

    var video = document.getElementById(videoTagID);
    var videoControls = document.getElementById(videoControlsTagID);
    var volSlider = document.getElementById(volSliderTagID);
    var showTime = document.getElementById(showTimeTagID);
    var playpause = document.getElementById(playpauseTagID);
    var stop = document.getElementById(stopTagID);
    var volume = document.getElementById(volumeTagID);
    var progress = document.getElementById(progressTagID);
    var fullscreen = document.getElementById(fullscreenTagID);
    var progressTip = document.getElementById(progressTipTagID);
    var statusmessage = document.getElementById(statusmessageTagID);
    
    var errorMessage = false;

    video.autoplay = true;
    video.controls = false;
    video.poster = strPosterURL;

    if (detectmob()) 
    {
        boolAutoPlay = false;
        boolBigButtons = true;
        video.autoplay = false;
        mobileBrowser = true;
    }

    if (!boolAutoPlay)
        boolShowControls = true;

    //Activate controls
    AttachGUIControls();

    if (boolBigButtons && boolShowControls)
        EnlargeControls();

    if (boolAutoPlay) 
    {
        boolAutoPlay = false;
        PlayStream();
    }
    
    this.on = function(event, callback) {
    	$("#" + videoTagID).on(event, function(evt) {
    		callback(evt);
    	});
    };
    
    this.showControls = function(isShow) {
    	boolShowControls = isShow;
    	AttachGUIControls();
    };
    
    this.isShowControls = function() {
    	return boolShowControls;
    };
    
    this.resize = function(width, height) {
    	$("#" + videoTagID).attr('width', width+"px");
    	$("#" + videoTagID).attr('height', height+"px");
    	AttachGUIControls();
    	
    	ShowMessage(statusmessage.innerHTML, errorMessage);
    };
    
    this.play = function() {
    	video.play();
    };
    
    this.pause = function() {
    	video.pause();
    };
    
    this.stop = function() {
    	closePlayback();
    };
        
    this.stopEx = function(id) {
     	//console.log("unreal.js stopEx() 1..." + id);
    	//console.log("unreal.js stopEx() 2..." + global_players[id]);

		if (global_players[id] != undefined)
		{
	    	closePlaybackEx(global_players[id].ws, global_players[id].video);    	
	    	delete global_players[id];
		}
			    	
    	//console.log("unreal.js stopEx() end..." + id);
    	//console.log(global_players);    	
    };
        
    this.isFullScreen = function() {
    	return isFullScreen();
    };
    
    this.fullScreen = function() {
    	handleFullscreen();
    };

    function detectmob() 
    {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)) 
        {
            return true;
        }
        else 
        {
            return false;
        }
    }

    function secondsToHms(d) 
    {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    }

    function closePlayback() 
    {
        if (ws != null) 
        {
            ws.onmessage = null;
            ws.onclose = null;
            ws.onerror = null;
            ws.close();
            ws = null;
        }

        playerStarted = false;
        rendererStarted = false;
        startupDone = false;
        realTimeStream = false;
        bufferingInProgress = false;
        playingInRealTime = true;
        playOK = false;
        video.pause();
        progress.value = 0;
        progress.disabled = true;
        progress.max = 0;
        videoDuration = 0;
        volSlider.style.display = "none";
        showTime.innerHTML = '0:00 / 0:00';
        playpause.setAttribute('data-state', 'play');

        if (sourceBuffer != null) 
        {
            mediaSrc.removeSourceBuffer(sourceBuffer);
            sourceBuffer.onupdateend = null;
            sourceBuffer = null;
        }

        if (mediaSrc != null) 
        {
            mediaSrc.onsourceopen = null;
            mediaSrc = null;
        }

        latestTimestamp = 0;
        firstTimestamp = 0;
        lastDeleteTimestamp = 0;
        pausedTime = 0;
        segmentsQueue.length = 0;
        lastPlayPosition = -1;
        playpause.disabled = false;
        stop.disabled = false;
        video.src = "";
        video.load();

        if (adaptiveInterval != null)
        {
            clearInterval(adaptiveInterval);
            adaptiveInterval = null;
        }

        if (timeUpdateInterval != null) 
        {
            clearInterval(timeUpdateInterval);
            timeUpdateInterval = null;
        }

        bufferFillingCounter = 0;
        bufferEmptyCounter = 1;
        curArrayIndex = 0;
        switchCount = 0;
        toSwitchHigherCount = 1;
        switchedUp = false;

        timeshiftedPlayback = false;
        timeshiftSessionGlobalStartTime = 0;
        timeshiftSessionCurrentTime = -1;
        timeshiftPlaybackStartTime = 0;
        timeshiftPlaybackStartTimeLocalClock = 0;
        timeshiftBufferLimit = 0;
        timeshiftPos = 0;
        timeshiftInProgress = true;
        timeshiftSeeking = false;
        timeshiftStartingAfterSeek = false;
        timeshiftLateStartAfterSeek = false;
        timeshiftDurationAfterSeek = 0;
        timeshiftFlowControlPaused = false;
        timeshiftCurSec = 0;
        timeshiftRightSec = 0;
        timeshiftLeftSec = 0;
        
        //console.log("unreal.js closePlayback() end...");
        //console.log(video); 
    }
    
    function closePlaybackEx(ws1, video1) 
    {
        if (ws1 != null) 
        {
            ws1.onmessage = null;
            ws1.onclose = null;
            ws1.onerror = null;
            ws1.close();
            ws1 = null;
        }

        playerStarted = false;
        rendererStarted = false;
        startupDone = false;
        realTimeStream = false;
        bufferingInProgress = false;
        playingInRealTime = true;
        playOK = false;
        video1.pause();
        progress.value = 0;
        progress.disabled = true;
        progress.max = 0;
        videoDuration = 0;
        volSlider.style.display = "none";
        showTime.innerHTML = '0:00 / 0:00';
        playpause.setAttribute('data-state', 'play');

        if (sourceBuffer != null) 
        {
            mediaSrc.removeSourceBuffer(sourceBuffer);
            sourceBuffer.onupdateend = null;
            sourceBuffer = null;
        }

        if (mediaSrc != null) 
        {
            mediaSrc.onsourceopen = null;
            mediaSrc = null;
        }

        latestTimestamp = 0;
        firstTimestamp = 0;
        lastDeleteTimestamp = 0;
        pausedTime = 0;
        segmentsQueue.length = 0;
        lastPlayPosition = -1;
        playpause.disabled = false;
        stop.disabled = false;
        video1.src = "";
        video1.load();

        if (adaptiveInterval != null)
        {
            clearInterval(adaptiveInterval);
            adaptiveInterval = null;
        }

        if (timeUpdateInterval != null) 
        {
            clearInterval(timeUpdateInterval);
            timeUpdateInterval = null;
        }

        bufferFillingCounter = 0;
        bufferEmptyCounter = 1;
        curArrayIndex = 0;
        switchCount = 0;
        toSwitchHigherCount = 1;
        switchedUp = false;

        timeshiftedPlayback = false;
        timeshiftSessionGlobalStartTime = 0;
        timeshiftSessionCurrentTime = -1;
        timeshiftPlaybackStartTime = 0;
        timeshiftPlaybackStartTimeLocalClock = 0;
        timeshiftBufferLimit = 0;
        timeshiftPos = 0;
        timeshiftInProgress = true;
        timeshiftSeeking = false;
        timeshiftStartingAfterSeek = false;
        timeshiftLateStartAfterSeek = false;
        timeshiftDurationAfterSeek = 0;
        timeshiftFlowControlPaused = false;
        timeshiftCurSec = 0;
        timeshiftRightSec = 0;
        timeshiftLeftSec = 0;

    }
    
    function ContinueTimeshiftStreaming()
    {
        if (timeshiftedPlayback && timeshiftPos != 0) 
        {
            ws.send("continue");
            timeshiftFlowControlPaused = false;
        }
    }

    function SeekTimeshiftStreaming(seekSec)
    {
        playingInRealTime = (seekSec == 0);

        timeshiftSeeking = true;
        segmentsQueue.length = 0;

        playpause.disabled = false;
        bufferingInProgress = false;
        statusmessage.style.display = 'none';

        ws.send("seek:" + seekSec); 
    }
    
    // Check if video is currently in fullscreen mode
    var isFullScreen = function () 
    {
        return !!(video.fullScreen || video.webkitIsFullScreen || video.mozFullScreen || video.msFullscreenElement || video.fullscreenElement);
    }

    // Fullscreen
    var handleFullscreen = function () 
    {
        if (isFullScreen()) 
        {
            if (video.exitFullscreen) video.exitFullscreen();
            else if (video.mozCancelFullScreen) video.mozCancelFullScreen();
            else if (video.webkitCancelFullScreen) video.webkitCancelFullScreen();
            else if (video.msExitFullscreen) video.msExitFullscreen();
        }
        else 
        {
            if (video.requestFullscreen) video.requestFullscreen();
            else if (video.mozRequestFullScreen) video.mozRequestFullScreen();
            else if (video.webkitRequestFullScreen) video.webkitRequestFullScreen();
            else if (video.msRequestFullscreen) video.msRequestFullscreen();
        }
    }
    
    function OnTimeGUIUpdate()
    {
        if (playerStarted && !isNaN(video.duration)) 
        {
            if (timeshiftedPlayback && timeshiftPos != 0 && !timeshiftSeeking && !timeshiftStartingAfterSeek) 
            {
                if ((video.duration - video.currentTime < 10) && (!video.paused) && (timeshiftFlowControlPaused)) 
                    ContinueTimeshiftStreaming();
            }

            if (video.duration > 0)
                rendererStarted = true;

            if (!timeshiftedPlayback && (video.duration > videoDuration)) 
            {
                videoDuration = video.duration;

                if (maxLocalBuffer > 0 && !progressMouseDown) 
                {
                    progress.max = (videoDuration - firstTimestamp / 1000);

                    if (video.currentTime > firstTimestamp / 1000)
                        progress.value = video.currentTime - firstTimestamp / 1000;
                }

                showTime.innerHTML = secondsToHms(Math.floor(video.currentTime)) + ' / ' + secondsToHms(Math.floor(videoDuration));
            }
            else if (timeshiftedPlayback && (video.duration > 0) && !timeshiftSeeking && !timeshiftStartingAfterSeek) 
            {
                var d = new Date();
                var timeSubstr = (timeshiftPos == 0) ? timeshiftSessionGlobalStartTime : 0;

                timeshiftCurSec = video.currentTime - timeshiftPlaybackStartTime + timeshiftSessionCurrentTime - timeSubstr + 1;
                
                if (timeshiftInProgress)
                    timeshiftRightSec = d.getTime() / 1000 - timeshiftPlaybackStartTimeLocalClock / 1000 + timeshiftSessionCurrentTime + timeshiftPos - timeSubstr + 1;

                var curBufLen;
                if (timeshiftRightSec >= timeshiftBufferLimit)
                    curBufLen = timeshiftBufferLimit;
                else
                    curBufLen = timeshiftRightSec;

                timeshiftLeftSec = Math.max(0, timeshiftRightSec - curBufLen);

                showTime.innerHTML = secondsToHms(timeshiftCurSec) + ' / ' + secondsToHms(timeshiftRightSec);

                if (!progressMouseDown) 
                {
                    progress.max = curBufLen;
                    progress.value = timeshiftCurSec - timeshiftLeftSec;
                }
            }

            //Playback sometimes freezes in some browsers for no reason, try to fix it
            if (video.paused || timeshiftSeeking || timeshiftStartingAfterSeek)
            {
                lastPlayPosition = -1;
            }
            else
            {
                if ((lastPlayPosition != -1) && (lastPlayPosition == video.currentTime) && (video.duration - video.currentTime >= 5))
                {
                    //We are frozen, but should be playing!
                    var jumpOffset = (realTimeStream) ? 0.2 : 1.1;

                    if (playingInRealTime)
                    {
                        video.currentTime = video.duration - jumpOffset;
                    }
                    else
                    {
                        if (!timeshiftedPlayback)
                        {
                            if (video.currentTime < firstTimestamp / 1000)
                                video.currentTime = firstTimestamp / 1000 + 1;
                            else
                                video.currentTime += 2;
                        }
                        else
                        {
                            SeekTimeshiftStreaming(timeshiftCurSec + 2);
                        }
                    }

                    lastPlayPosition = -1;
                }
                else
                {
                    lastPlayPosition = video.currentTime;
                }
            }
        }
    }

    function AttachGUIControls() 
    {
        'use strict';

        // Initialize video controls
        videoControls.setAttribute('data-state', 'visible');
        var VidW = video.width + "px";
        videoControls.style.width = VidW;
        progress.disabled = true;
        progress.style.width = video.width - 280 + "px";
        volSlider.value = video.volume;

        // Disable context menu
        video.addEventListener('contextmenu', function (e) { e.preventDefault(); });

        // Change the button state of Play/Pause buttons so the correct visuals can be displayed with CSS
        var changePlayPauseState = function () 
        {
            if (video.paused) 
            {
                playpause.setAttribute('data-state', 'play');
            }
            else 
            {
                playpause.setAttribute('data-state', 'pause');
            }
        }
        
        var t_timeout;
        
        var onMouseOverOnVideo = function() {
        	if(boolShowControls)
        		videoControls.style.display = "block";
        }
        
        var onMouseOutOnVideo = function() {
        	if(boolShowControls)
        		videoControls.style.display = "none";
        }
        
        var onMouseMoveOnVideo = function() {
        	if(boolShowControls) {
        		videoControls.style.display = "block";
                clearTimeout(t_timeout);
                t_timeout = setTimeout(function() { videoControls.style.display = "none"; volSlider.style.display = "none"; }, 3000);
        	}
        }
        
        var onMouseOverOnControl = function() {
        	if(boolShowControls) {
        		clearTimeout(t_timeout);
        		videoControls.style.display = "block";
        	}
        }
        
        var onMouseLeaveOnControl = function (event) {
        	if(boolShowControls) {
	            if (event.relatedTarget != null)
	                videoControls.style.display = "none";
        	}
        }

        // Show/hide controls
        if (!boolShowControls) 
        {
            videoControls.style.display = "none";
            video.removeEventListener('mouseover', onMouseOverOnVideo);
            video.removeEventListener('mouseout', onMouseOutOnVideo);
            videoControls.removeEventListener('mouseover', onMouseOverOnControl);
            videoControls.removeEventListener('mouseleave', onMouseLeaveOnControl);
            video.removeEventListener('mousemove', onMouseMoveOnVideo);
            return;
        }
        else 
        {
            video.addEventListener('mouseover', onMouseOverOnVideo);
            video.addEventListener('mouseout', onMouseOutOnVideo);
            videoControls.addEventListener('mouseover', onMouseOverOnControl);
            videoControls.addEventListener('mouseleave', onMouseLeaveOnControl);
            video.addEventListener('mousemove', onMouseMoveOnVideo);
        }

        // Add event listeners for video specific events
        video.addEventListener('play', function () 
        {
            playOK = true;
            
            if (statusmessage.style.display != 'none' && !startupDone)
            {
                video.pause();
                ShowMessage(i18n.t("message.buffering"), false);
            }

            if (startupDone && playingInRealTime && (video.duration > 5))
            {
                var jumpOffset = (realTimeStream) ? 0.2 : 1.1;
                video.currentTime = video.duration - jumpOffset;
            }

            if (startupDone && timeshiftedPlayback && (video.duration > 5))
            {
                if (!playingInRealTime && !timeshiftSeeking)
                {
                    if (timeshiftCurSec <= timeshiftLeftSec)
                        SeekTimeshiftStreaming(Math.max(1, timeshiftLeftSec - 1));
                    else if (timeshiftPos == 0)
                        SeekTimeshiftStreaming(Math.max(1, timeshiftCurSec - 1));
                }

                ContinueTimeshiftStreaming();
            }

            changePlayPauseState();
        });

        video.addEventListener('pause', function () 
        {
            if (startupDone && timeshiftedPlayback && (video.duration > 5) && !timeshiftSeeking && !timeshiftStartingAfterSeek && !timeshiftLateStartAfterSeek && !bufferingInProgress)
            {
                ws.send("pause");
                timeshiftFlowControlPaused = true;
             }

            changePlayPauseState();
        });

        // Add events handlers for click events
        playpause.addEventListener('click', function (e) 
        {
            if (!playerStarted) 
            {
                PlayStream();
            }
            else 
            {
                if (video.paused)
                {
                    if (!timeshiftedPlayback)
                    {
                        if (pausedTime < firstTimestamp / 1000)
                            video.currentTime = firstTimestamp / 1000 + 1; 
                    }
                   
                    video.play();
                }
                else 
                {
                    if (!timeshiftedPlayback)
                    {
                        if (maxLocalBuffer > 0) 
                        {
                            playingInRealTime = false;
                            pausedTime = video.currentTime;
                            video.pause();
                        }
                    }
                    else
                    {
                        playingInRealTime = false;
                        video.pause();
                    }
                }
            }
        });

        stop.addEventListener('click', function (e) 
        {
            stopPressed = true;
            statusmessage.style.display = 'none';
            closePlayback();
        });

        volume.addEventListener('click', function (e) 
        {
            if (!video.paused)
                video.muted = false;

            if (volSlider.style.display == 'none') 
            {
                if (boolBigButtons)
                {
                    volSlider.style.left = this.offsetLeft - 50 + 'px';
                    volSlider.style.top = this.offsetTop - 150 + 'px';
                }
                else
                {
                    volSlider.style.left = this.offsetLeft - 60 + 'px';
                    volSlider.style.top = this.offsetTop - 120 + 'px';
                }

                volSlider.style.display = 'block';
            }
            else
                volSlider.style.display = 'none';
        });

        fullscreen.addEventListener('click', function (e) 
        {
            handleFullscreen();
        });

        // React to the user clicking within the slider
        progress.addEventListener('mouseup', function(e) 
        {
            progressMouseDown = false;
            lastPlayPosition = -1;
            
            var pos = (e.layerX - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
            if (pos < 0)
                pos = 0;

            var jumpOffset = (realTimeStream) ? 0.2 : 1.1;

            if (timeshiftedPlayback || (maxLocalBuffer > 0))
                playingInRealTime = (pos > liveEdgePoint);
                
            if (!timeshiftedPlayback)
            {
                if (maxLocalBuffer > 0) 
                {
                    if (pos > liveEdgePoint)
                        video.currentTime = video.duration - jumpOffset;
                    else
                        video.currentTime = firstTimestamp / 1000 + pos * (video.duration - firstTimestamp / 1000);

                    OnTimeGUIUpdate();
                    lastPlayPosition = -1;
                }
            }
            else
            {
                var seekSec;
                if (pos > liveEdgePoint)
                    seekSec = 0;
                else
                    seekSec = Math.max(1, timeshiftLeftSec + pos * (timeshiftRightSec - timeshiftLeftSec) - 1);

                if (!((seekSec == 0) && (!timeshiftInProgress))) 
                {
                    if ((timeshiftPos == 0) && (seekSec == 0))
                        video.currentTime = video.duration - jumpOffset;
                    else
                        SeekTimeshiftStreaming(seekSec);
                }
            }

            if (video.paused)
            {
                video.play();
                ContinueTimeshiftStreaming();
            }
        });

        progress.addEventListener('mousedown', function (e) { progressMouseDown = true; });

        // Tooltip
        var tooltipTimeout;
        progress.addEventListener('mousemove', function (e) 
        {
            if (!isNaN(video.duration) && !progress.disabled && this.offsetParent != null) 
            {
                progressTip.style.left = e.layerX - 15 + 'px';
                progressTip.style.top = this.offsetTop + this.offsetParent.offsetTop - 25 + 'px';
                progressTip.style.display = 'block';

                var pos = (e.layerX - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
                if (pos < 0)
                    pos = 0;
                    
                var showTipTime;
                if (!timeshiftedPlayback)
                    showTipTime = firstTimestamp / 1000 + pos * (video.duration - firstTimestamp / 1000);
                else
                    showTipTime = timeshiftLeftSec + pos * (timeshiftRightSec - timeshiftLeftSec);

                if (pos <= liveEdgePoint)
                {
                    progressTip.innerHTML = secondsToHms(Math.floor(showTipTime));
                    progressTip.style.color = "white";
                }
                else
                {
                    if (timeshiftedPlayback && !timeshiftInProgress)
                        progressTip.innerHTML = "Broadcast ended";
                    else
                        progressTip.innerHTML = "LIVE";
                        
                    progressTip.style.color = "red";
                }

                clearTimeout(tooltipTimeout);
                tooltipTimeout = setTimeout(function () { progressTip.style.display = "none"; }, 1000);
            }
        });

        progress.addEventListener('mouseout', function () 
        {
            progressTip.style.display = 'none';
        });

        // Volume slider
        volSlider.addEventListener('change', function (e) 
        {
            video.volume = this.value;
        });

        volSlider.addEventListener('mouseout', function () 
        {
            volSlider.style.display = 'none';
        });
    }

    function EnlargeControls()
    {
        videoControls.style.height = "70px";
        progress.style.width = video.width - 410 + "px";

        playpause.style.width = "64px";
        playpause.style.backgroundSize = "64px 64px";
        stop.style.width = "64px";
        stop.style.backgroundSize = "64px 64px";
        volume.style.width = "64px";
        volume.style.backgroundSize = "64px 64px";
        fullscreen.style.width = "64px";
        fullscreen.style.backgroundSize = "64px 64px";

        progress.style.marginTop = "30px";
        showTime.style.marginTop = "27px";
    }

    function sourceOpen(e) 
    {
        if (mediaSrc != null)
        {	        
	        mediaSrc.duration = 0;
	        stop.disabled = false;
	        RunWebSocket();
	    }
    }

    function ShowMessage(msg, err) 
    {
    	let top = -intVideoHeight/2 + 10;
    	if (err)
            statusmessage.style.top = top + 'px';
        else if (boolBigButtons)
            statusmessage.style.top = top + 'px';
        else
            statusmessage.style.top = top + 'px';

        statusmessage.style.left = video.offsetWidth - video.width + 5 + 'px';
        statusmessage.innerHTML = msg;
        statusmessage.style.display = 'block';
        
        errorMessage = err;
    }

    function PlayStream() 
    {
        segmentsQueue.length = 0;
        stopPressed = false;
        playpause.disabled = true;
        stop.disabled = true;

        if (maxLocalBuffer > 0)
            progress.disabled = false;

        mediaSrc = new window.MediaSource();
        video.src = window.URL.createObjectURL(mediaSrc);
        mediaSrc.addEventListener('sourceopen', sourceOpen, false);

        if (mobileBrowser)
            video.play();

        ShowMessage(i18n.t("message.connecting"), false);
    }

    function OnBufferUpdated(e) 
    {
        if ((sourceBuffer != null) && !sourceBuffer.updating) 
        {
            if (segmentsQueue.length > 0) 
            {
                sourceBuffer.appendBuffer(segmentsQueue.shift());
            }
            else if(!timeshiftedPlayback)
            {
                var timeDiff = (latestTimestamp - firstTimestamp) - maxLocalBuffer * 1000;

                if (timeDiff >= 1000)
                    firstTimestamp = firstTimestamp + timeDiff;

                var delTimeDiff = (latestTimestamp - lastDeleteTimestamp) - maxLocalBuffer * 1000;

                if ((delTimeDiff >= 10000) && (firstTimestamp / 1000 >= 30))
                {
                    sourceBuffer.remove(Math.max(0, firstTimestamp / 1000 - 35), firstTimestamp / 1000 - 20);
                    lastDeleteTimestamp = lastDeleteTimestamp + delTimeDiff;
                }
            }
            else
            {
                if (timeshiftSeeking && lastDeleteTimestamp < video.duration) 
                {
                    sourceBuffer.remove(lastDeleteTimestamp, video.duration);
                    lastDeleteTimestamp = video.duration;
                }
                else if ((!timeshiftSeeking) && (video.currentTime >= 30))
                {
                    var delTimeDiff = (video.currentTime - lastDeleteTimestamp - 20);

                    if (delTimeDiff >= 10) 
                    {
                        sourceBuffer.remove(lastDeleteTimestamp, video.currentTime - 20);
                        lastDeleteTimestamp = video.currentTime - 20;
                    }
                }
            }
        }
    }

    function AdaptiveProcess()
    {
        if (strOrArrayLiveAlias.constructor === Array) 
        {
            var ratio = bufferFillingCounter / bufferEmptyCounter;
            var sendSwitch = false;

            if (ratio > 0.05)   //switch to lower bitrate
            {
                if(curArrayIndex + 1 < strOrArrayLiveAlias.length)
                {
                    curArrayIndex++;
                    sendSwitch = true;
                    switchedUp = false;
                }
            }
            else
            {
                if (curArrayIndex - 1 >= 0)    //switch to higher bitrate
                {
                    if (switchedUp)
                    {
                        switchCount = 0;
                        toSwitchHigherCount = 0;
                    }
                    
                    if (toSwitchHigherCount == 0)
                    {
                        curArrayIndex--;
                        sendSwitch = true;
                        switchedUp = true;
                        switchCount++;
                        toSwitchHigherCount = switchCount;
                    }
                    else
                    {
                        toSwitchHigherCount--;
                    }
                }
            }

            if (sendSwitch)
            {
                switchCount++;
                ws.send("switch:" + strOrArrayLiveAlias[curArrayIndex]);
            }

            bufferFillingCounter = 0;
            bufferEmptyCounter = 1;
        }
    }
    
    function FlowControl()
    {
        if (playerStarted && !isNaN(video.duration)) 
        {
            if (timeshiftedPlayback && timeshiftPos != 0 && !timeshiftSeeking && !timeshiftStartingAfterSeek)
            {
                if ((video.duration - video.currentTime > 20) && (!timeshiftFlowControlPaused))
                {
                    ws.send("pause");
                    timeshiftFlowControlPaused = true;
                }
            }
        }
    }
    
    function InitTimeshiftedPlayback()
    {
        if (timeshiftSeeking)
        {
            var d = new Date();
            timeshiftPlaybackStartTimeLocalClock = d.getTime();
            timeshiftFlowControlPaused = false;
            timeshiftSeeking = false;
            timeshiftStartingAfterSeek = true;
            timeshiftDurationAfterSeek = video.duration;
        }
    }

    function RunWebSocket() 
    {
        ws = new WebSocket(sURI);
        ws.binaryType = "arraybuffer";
        
        global_players[strVideoPlayerID].ws = ws;
        
        ws.onmessage = function(evt) 
        {
            var byteView = new Uint8Array(evt.data);
            var segment;

            if (byteView[0] == 0)  //Error
            {
                var err = new Uint16Array(evt.data, 2, (evt.data.byteLength - 2) / 2);
                var str = String.fromCharCode.apply(null, err);

                console.log("Error: ", str);
                ShowMessage(i18n.t("message.buffer_error"), true);
                // ShowMessage("Error: " + str, true);

                closePlayback();
                return;
            }

            if (byteView[0] == 1)  //Init segment
            {
                realTimeStream = (byteView[1] == 4) || (byteView[1] == 8) || (byteView[1] == 12);

                var timeshiftArr = new Uint16Array(evt.data, 2, 8);
                if (!timeshiftedPlayback)
                {
                    timeshiftSessionGlobalStartTime = timeshiftArr[0];
                    timeshiftBufferLimit = timeshiftArr[2];
                    var d = new Date();
                    timeshiftPlaybackStartTimeLocalClock = d.getTime();
                    if (timeshiftSessionGlobalStartTime != 0)
                        timeshiftedPlayback = true;
                }

                if (timeshiftSeeking || (timeshiftSessionCurrentTime == -1))
                {
                    timeshiftPos = timeshiftArr[3];
                    playingInRealTime = (timeshiftPos == 0);
                }

                var metadatalenArr = new Uint16Array(evt.data, 18, 1);
                var metadatalen = metadatalenArr[0];

                if (!playerStarted) 
                {
                    playerStarted = true;
                    var metadataArr = new Uint16Array(evt.data, 20, metadatalen / 2);
                    var metadatastr = String.fromCharCode.apply(null, metadataArr);
                    var parser = new DOMParser();
                    var metadataXML = parser.parseFromString(metadatastr, "text/xml");

                    mimeCodec = metadataXML.getElementsByTagName("mimetypecodec")[0].childNodes[0].nodeValue;
                    sourceBuffer = mediaSrc.addSourceBuffer(mimeCodec);
                    sourceBuffer.addEventListener('updateend', OnBufferUpdated, false);
                }

                segment = new Uint8Array(evt.data, 20 + metadatalen, evt.data.byteLength - 20 - metadatalen);
            }
            else if (byteView[0] == 2)  //Media segment
            {
                if (byteView[1] == 1)
                    bufferFillingCounter++;
                else
                    bufferEmptyCounter++;

                latestTimestamp = new DataView(evt.data).getInt32(6, true);
                segment = new Uint8Array(evt.data, 10, evt.data.byteLength - 10);

                if (timeshiftedPlayback) 
                {
                    var timeshiftDataArr = new Uint16Array(evt.data, 2, 2);
                    var firstDataArrByte = timeshiftDataArr[0] & 0xFF;
                    var secondDataArrByte = timeshiftDataArr[0] & 0xFF00;
                    var lastThreeDataArrBytes = timeshiftDataArr[1] | (secondDataArrByte << 8);

                    timeshiftInProgress = (firstDataArrByte == 0);

                    if (lastThreeDataArrBytes != 0) 
                    {
                        if (timeshiftSeeking || (timeshiftSessionCurrentTime == -1))
                            timeshiftSessionCurrentTime = lastThreeDataArrBytes;
                        InitTimeshiftedPlayback();
                    }
                }
            }

            if (video.error != null)   //Stop playing on error
            {
            	ShowMessage(i18n.t("message.decode_error"), true);
            	console.log("Decoder error");
            	// ShowMessage("Decoder error", true);
                closePlayback();
                return;
            }

            if (playOK && startupDone && rendererStarted && !realTimeStream && !timeshiftSeeking && !timeshiftStartingAfterSeek)   //Perform buffering if needed
            {
                if ((video.duration - video.currentTime < 0.5) && !bufferingInProgress) 
                {
                    playpause.disabled = true;
                    bufferingInProgress = true;
                    ShowMessage(i18n.t("message.buffering"), false);
                    video.pause();
                }
                else if ((video.duration - video.currentTime >= 5) && bufferingInProgress) 
                {
                    playpause.disabled = false;
                    bufferingInProgress = false;
                    statusmessage.style.display = 'none';
                    video.play();
                }
            }

            if ((sourceBuffer != null) && ((!timeshiftSeeking) || (byteView[0] == 1)))  //Add segment to queue or sourceBuffer 
            {
                if (sourceBuffer.updating || segmentsQueue.length > 0)
                    segmentsQueue.push(segment);
                else
                    sourceBuffer.appendBuffer(segment);
            }      

            if (timeshiftStartingAfterSeek) //Buffer after seek and then start playing
            {
                var bufferAfterSeek = (timeshiftPos == 0) ? 1 : 2;
                var additionalBuffering = (realTimeStream) ? 0 : 0.5;
                bufferAfterSeek += additionalBuffering;

                if (video.duration - timeshiftDurationAfterSeek >= bufferAfterSeek)
                {
                    timeshiftStartingAfterSeek = false;
                    video.currentTime = video.duration - additionalBuffering;
                    timeshiftPlaybackStartTime = video.currentTime;

                    if ((!realTimeStream) && (timeshiftPos == 0))
                    {
                        timeshiftLateStartAfterSeek = true;
                        video.pause();
                        setTimeout(function () { timeshiftLateStartAfterSeek = false; if (!bufferingInProgress) video.play(); }, 1000);
                    }
                    
                    lastPlayPosition = -1;
                    OnTimeGUIUpdate();
                    lastPlayPosition = -1;
                }
            }

            FlowControl();  //Pause time-shifted delivery if it's too fast

            var minInitialBuffering = (realTimeStream)? 0 : 2000;
            if ((latestTimestamp > 100) && (latestTimestamp > minInitialBuffering) && playerStarted && (statusmessage.style.display != 'none') && !startupDone)   //Start playing 
            {
                statusmessage.style.display = 'none';
                playpause.disabled = false;
                startupDone = true;

                video.play();

                if ((strOrArrayLiveAlias.constructor === Array) && (adaptiveInterval == null))
                    adaptiveInterval = setInterval(AdaptiveProcess, 10000);

                if (timeUpdateInterval == null)
                    timeUpdateInterval = setInterval(OnTimeGUIUpdate, 1000);
            }
        };

        ws.onclose = function () 
        {
            closePlayback();
        };

        ws.onerror = function () 
        {
            if (!stopPressed) 
            {
            	console.log("Error: Websocket connection is closed or could not be established.");
            	ShowMessage(i18n.t("message.connection_error"), true);
            	// ShowMessage("Error: Websocket connection is closed or could not be established.", true);
                closePlayback();
            }
        };
    }
        
    global_players[strVideoPlayerID] = {video: video, ws: null};
        
    //console.log("unreal.js RunPlayer() end..." + strVideoPlayerID);
    //console.log(global_players);
    
    return this;
}