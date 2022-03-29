$(document).ready(function(){
	cctv.loadCCTV();
});

var popCctv;
function RotaCCTV2() {
	this.cctvList = [];
	this.layer;
	this.minlevel = 6;
	this.maxlevel = 8;
	this.getCctv = function(c) {
		var a = this.cctvList.length;
		for(var b = 0; b < a; b++) {
			if(this.cctvList[b].CCTVID == c){
				return this.cctvList[b];
			}
		}
		return null;
	};
	this.isLoad = function() {
		if (this.cctvList.length == 0) {
			return false;
		} else {
			return true;
		}
	};
	this.loadCCTV = function() {
		var a = "./../cctv.htm";
		a = "/map/mapcctv.do";
		var b = this;
		$.ajax({
			url : a,
			dataType : "json",
			async : false,
			success : function(c) {
				try{
					b.cctvList = c;
				}catch(e){

				}
			}
		});
	};
	this.getCCTVTooltipInfo = function(b) {
		var a = '<table border="0" cellspacing="0" cellpadding="0"><tr><td width="1" height="1"></td><td bgcolor="#1B4E99"></td><td width="1" height="1"></td></tr><tr><td bgcolor="#1B4E99"></td><td><table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td bgcolor="#1B4E99"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td height="20"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td style="padding:3px 3px 3px 3px;color:#ffffff;font-weight:bold;font-size:11px;">'
				+ b
				+ '</td></tr></table></td></tr></table></td></tr></table></td><td bgcolor="#1B4E99"></td></tr><tr><td width="1" height="1"></td><td bgcolor="#1B4E99"></td><td width="1" height="1"></td></tr></table>';
		return a;
	};
	this.popupCctvImage = function(c) {
		var b = this.getCctv(c);
		if (b.LOCATE == null && b.MOVIE == "Y") {
			this.popupCctvStream(c);
			return;
		}
		var a = new StreamCctv(b);
		var d = Mando.wgs84ToMandoMap(a.gDx, a.gDy);
		cctvPopup.displayPopup(true, new UTISMap.LonLat(d.lon, d.lat), a.getImageHtml(), c);
		weblog(c, "cctv");
	};
	this.popupCctvStream = function(cctvid, key){
		if(popCctv) {
			//popCctv.close();
		}
		//var url = '/map/mapcctvonoff.do?cctvid=' + cctvid;
		var url = 'http://www.utic.go.kr/view/map/mapcctvonoff.do?cctvid=' + cctvid;

		//http://www.utic.go.kr/view/map/openDataCctvStream.jsp?key=89m6Hz1zkJDw6NC76srCmg18SY9KBMt1OFjdBHLcE2jvRTVfmrP3xCojNVILjtk5
		var obj = this;
		$.getJSON(url, function(data) {

			//console.log(data);
			if(data.length == 1){
				if(data[0] == '0'){
					var width = 322;
					var height = 239;
					//var top = (window.screen.height - height) / 2;
					//var left = (window.screen.width - width) / 2;
					var features = 'width='+ width +',height='+ height +',top='+ top +',left='+ left +',toolbar=no,scrollbars=no,status=no,resizable=no,location=no';

					popCctv = window.open('/view/map/cctvUgo.jsp', 'UTIC도시교통정보센터', features);
					popCctv.focus();
				}else{

					var streamCctv = new StreamCctv(cctvid);
					//console.log(streamCctv + "  = streamCctv ");
					var width = 346;
					var height = 325;

					var strWidth = '350';
					var strHeight = '300';
					/* if(streamCctv.gKind == "H"){ // 대구
						width = 345;
					}else if(streamCctv.gCh != null){
						width = 346;
						height = 325;
					}else if(streamCctv.gKind == "M"){ //원주
						width = 346;
					}else if(streamCctv.gKind == "F"){ //전주
						width = 343;
					}else if(streamCctv.gKind == "Y"){ //창원
						width = 346;
					}else if(streamCctv.gKind == "J"){ //울산
						width  = 340;
						height = 257;
					}else if(streamCctv.gKind == "V"){ //군산
						width  = 390;
						height = 390;
					} */

					var top = (window.screen.height - height) / 2;
					var left = (window.screen.width - width) / 2;

					popCctv = window.open('http://www.utic.go.kr/view/map/openDataCctvStream.jsp?key=' + key+ '&cctvid=' + cctvid+ '&cctvName=' + encodeURI(encodeURIComponent(streamCctv.gCctvName)) + '&kind=' + streamCctv.gKind + '&cctvip=' + streamCctv.gCctvIp + '&cctvch=' + streamCctv.gCh + '&id=' + streamCctv.gId + '&cctvpasswd=' + streamCctv.gPasswd + '&cctvport=' + streamCctv.gPort, 'PopupCctv',"top=" + top + "px, left=" + left + "px, width=" + strWidth + "px, height=" + strHeight+ "px, menubar=no, location=no, toolbar=no, scrollbars=no, status=no, resizable=yes");
					popCctv.focus();
					//resize
					//popCctv.resizeTo(strWidth, strHeight);
					weblog(cctvid, 'cctv');
				}
			}else{
				var streamCctv = new StreamCctv(cctvid, null, function(streamCctv){
					console.log(streamCctv + "streamCctv2");
					var width = 346;
					var height = 325;

					/* if(streamCctv.gKind == "H"){ // 대구
						width = 345;
					}
					else if(streamCctv.gCh != null){
						width = 346; height = 325;
					}
					else if(streamCctv.gKind == "M"){ //원주
						width = 325;
					}
					else if(streamCctv.gKind == "F"){ //전주
						width = 343;
					}
					else if(streamCctv.gKind == "Y"){ //창원
						width = 345;
					}else if(streamCctv.gKind == "J"){ //울산
						width  = 340;
						height = 257;
					}else if(streamCctv.gKind == "V"){ //군산
						width  = 390;
						height = 390;
					} */
					//var top = (window.screen.height-height)/2;
					//var left = (window.screen.width-width)/2;


					//0831 TEST

						var strWidth = '350';
						var strHeight = '300';

						/* //innerWidth / innerHeight / outerWidth / outerHeight 지원 브라우저
						if (window.innerWidth && window.innerHeight	&& window.outerWidth && window.outerHeight) {
							strWidth = $('#popup').outerWidth()	+ (window.outerWidth - window.innerWidth);
							//strHeight = $('#popup').outerHeight() + (window.outerHeight - window.innerHeight);
							strHeight = $('#popup').innerHeight();
							console.log("if ### strWidth ###");
									console.log(strWidth);
									console.log(strHeight);
						} else if (window.innerWidth && window.innerHeight	&& window.outerWidth && window.outerHeight) {
							strWidth =  window.innerWidth + 30;
							strHeight =  window.innerHeight + 60;

							console.log(" else if ### strWidth ###");
									console.log(strWidth);
									console.log(strHeight);

						} else {

							var strDocumentWidth = $(document).outerWidth();
							var strDocumentHeight = $(document).outerHeight();

							console.log("### strDocumentWidth ###");
							console.log(strDocumentWidth);
							console.log(strDocumentHeight);

							window.resizeTo(strDocumentWidth, strDocumentHeight);

							var strMenuWidth = strDocumentWidth - $(window).width();
							var strMenuHeight = strDocumentHeight - $(window).height();

							console.log("### strMenuWidth ###");
									console.log(strMenuWidth);
									console.log(strMenuHeight);

							strWidth = $('#popup').outerWidth() + strMenuWidth;
							strHeight = $('#popup').outerHeight() + strMenuHeight;

							console.log("### strWidth ###");
									console.log(strWidth);
									console.log(strHeight);
						} */


					popCctv = window.open('http://www.utic.go.kr/view/map/openDataCctvStream.jsp?key=' + key+ '&cctvid=' + cctvid+ '&cctvName=' + encodeURI(encodeURIComponent(streamCctv.gCctvName)) + '&kind=' + streamCctv.gKind + '&cctvip=' + streamCctv.gCctvIp + '&cctvch=' + streamCctv.gCh + '&id=' + streamCctv.gId + '&cctvpasswd=' + streamCctv.gPasswd + '&cctvport=' + streamCctv.gPort, 'PopupCctv',"top=" + top + "px, left=" + left + "px, width=" + strWidth + "px, height=" + strHeight+ "px, menubar=no, location=no, toolbar=no, scrollbars=no, status=no, resizable=yes");
					popCctv.focus();
					//resize
					//popCctv.resizeTo(strWidth, strHeight);
					weblog(cctvid, 'cctv');
				});
			}
	    });
	};
	this.popupCctvUgo = function(cctvid){
		var width = 322;
		var height = 239;
		var top = (window.screen.height - height) / 2;
		var left = (window.screen.width - width) / 2;
		var features = 'width='+ width +',height='+ height +',top='+ top +',left='+ left +',toolbar=no,scrollbars=no,status=no,resizable=no,location=no';
		window.open('/view/map/cctvUgo.jsp', 'UTIC도시교통정보센터', features);
		weblog(cctvid, 'cctv');
	};
	this.popupLiveVideo = function(e, d) {
		var b = this.getCctv(e);
		var c = b.locate;
		var a = getCctvSteamHTML(c, b.cctvname);
		displayPopup(true, d, new UTISMap.Size(340, 298), new UTISMap.Size(0, -298 - IconType.IconCCTV.size.h), a);
	};
	this.getCctvFileName = function(b) {
		var c = b;
		if (c == undefined) {
			return "";
		}
		var a = c.lastIndexOf("/");
		if (a > -1) {
			return c.substring(a + 1, c.length);
		}
		return "";
	};
	this.getRealtimeCctvPath = function(b, c) {
		var e = networkCheck.getCctvPath();
		var a = "./../map/mapcctvinfo.do?cctvid=" + b.cctvid;
		var d = this;
		$.getJSON(a, function(j) {
			var k = null;
			if (j.length == 1) {
				k = j[0];
			}
			var h;
			if (j.length == 0 || k == null || k.locate == undefined) {
				h = "./../contents/images/map/cctv_no.gif";
			} else {
				var g = k.locate;
				var i = d.getCctvFileName(g);
				h = e + i;
			}
			var f = d.getCctvHTML(b, h, c);
			cctvPopup.displayPopup(true, c, f);
		});
	};
	this.playCCTV = function() {
		if (!confirm("해당 컨텐츠는 지속적으로 인터넷 패킷을 사용합니다.\n\n 3G 망에서 시청시 과도한 요금이 부가될 수 있습니다.\n\n동영상을 재생하시겠습니까?")) {
			return
		}
		document.getElementById("mov").play();
	};
	this.getCctvSteamHTML = function(c, e) {
		var d = c.locate;
		var b = '<video id="mov" width="500" height="224" src="' + d + '" onclick="playCCTV()"/>';
		var a = '<div class="video shad cctv"><p>'
				+ c.cctvname
				+ "<span><a onclick=\"javascript:cctv.popupCctv2('"
				+ c.cctvid
				+ "',"
				+ e.lon
				+ ","
				+ e.lat
				+ ',\'stop\');" class="pdr"><img src="../../contents/images/map/btn_stop_video.gif" alt="정지영상보기" /></a><a href="javascript:cctvPopup.hidePopup(\''
				+ c.cctvid
				+ '\');"><img src="../../contents/images/map/btn_cctv_clse.gif" alt="닫기" /></a></span></p><div class="cctv_area player">'
				+ b + "</div></div>";
		return a;
	};
	this.getCctvHTML = function(c, b, d) {
		var a = '<div class="screenshop shad cctv" unselectable="on" style="-webkit-user-select: none;" ><p unselectable="on" style="-webkit-user-select: none;" >'
				+ c.cctvname
				+ "<span><a onclick=\"javascript:cctv.popupLiveVideo('"
				+ c.cctvid
				+ "',"
				+ d.lon
				+ ","
				+ d.lat
				+ ');" class="pdr"><img src="./../contents/images/map/btn_live_video.gif" alt="동영상보기" /></a><a onclick="javascript:cctvPopup.hidePopup(\''
				+ c.cctvid
				+ '\');"><img src="./../contents/images/map/btn_cctv_clse.gif" alt="닫기" /></a></span></p><div class="screenshot_area player"><img src="'
				+ b
				+ '" alt="" width="100%" height="100%" /></div></div>';
		return a;
	};
	this.popupCctv2 = function(b, e, d, a) {
		var c = Mando.wgs84ToMandoMap(e, d);
		this.popupCctv(b, new UTISMap.LonLat(c.lon, c.lat), a);
	};
	this.popupCctv = function(d, e, c) {
		var b = this.getCctv(d);
		var f = null;
		if (b.type == "02") {
			f = true;
		}
		if (!c && f) {
			var a = this.getCctvSteamHTML(b, e);
			cctvPopup.displayPopup(true, e, a);
		} else {
			this.getRealtimeCctvPath(b, e);
			return;
		}
	};
	this.openCctvIPhone = function(a) {
		var b = document.getElementById("mov");
		b.src = a;
	};
}
var cctv = new RotaCCTV2();
var params = getUrlParams();
var key = params.key;

function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
} ;

function test(cctvId){
	console.log("@@@@@@@@@@@@@@@@@@@ test : " + cctvId)
	cctv.popupCctvStream(cctvId, key, "cctvOpen");
}

/* function test(cctvId){
	cctv.popupCctvStream(cctvId, key, "cctvOpen");
} */
