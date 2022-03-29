//var min_x = 0;
//var max_x = 1600;
//var min_y = 0;
//var max_y = 920;
///************************************************************
// * 지도 이동시 보이는 영역에만 마커 뿌리기 (돌발, 교통안전, CCTV)
// ************************************************************/
//$(document).ready(function(){
//	/*
//	$("#aMap").mouseup(function() {
//		mapBound();
//	})*/
//})
//function NetworkCheck() {
//	this.type = "local";
//	this.mapurl;
//	this.linkmapurl;
//	this.linkmapurl2;
//	this.cctvpath;
//	this.mapurl;
//	this.init = function() {
//		var b = new String(window.location.host);
//		var a = b.substring(0, 3);
//		if (a == "192") {
//			this.mapdirurl = "http://192.168.11.20";
//			this.mapurl = "http://192.168.11.20:8900";
//			this.linkmapurl = "http://192.168.11.22";
//			this.linkmapurl2 = "http://192.168.11.20";
//			this.type = "inner";
//			this.cctvpath = "http://192.168.10.13/cctvimg/";
//		} else if (a == "127" || a == "loc") {
//			this.linkmapurl = this.mapdirurl;
//			this.mapdirurl = "http://192.168.11.20";
//			this.mapurl = "http://192.168.11.20:8900";
//			this.linkmapurl = "http://192.168.11.22";
//			this.linkmapurl2 = "http://192.168.11.20";
//			this.cctvpath = "http://192.168.10.13/cctvimg/";
//			this.type = "local";
//		} else {
//			this.mapurl = "http://61.108.209.20:8900";
//			this.mapdirurl = "http://61.108.209.20";
//			this.linkmapurl = "http://61.108.209.22";
//			this.linkmapurl2 = "http://61.108.209.20";
//			this.cctvpath = "http://61.108.201.13/cctvimg/";
//			this.type = "outer";
//		}
//	};
//	this.getMapUrl = function() {
//		return this.mapurl;
//	};
//	this.getDirectMapUrl = function() {
//		return this.mapdirurl;
//	};
//	this.getLinkMapUrl = function() {
//		return this.linkmapurl;
//	};
//	this.getLinkMapUrl2 = function() {
//		return this.linkmapurl2;
//	};
//	this.getType = function() {
//		return this.type;
//	};
//	this.getCctvPath = function() {
//		return this.cctvpath;
//	};
//}
function AreaCode() {
	this.code = "";
	this.changed = false;
	this.doname = "x";
	this.cityname = "x";
	this.area = [];
	this.twitercode = [];
	this.centerid = [];
	this.linkids = [];
	this.areambr = [];
	this.areaname = "";
	this.pageFirstLoad = false;
	this.init = function() {
		this.area["서울특별시"] = [ "서울" ];
		this.area["인천광역시"] = [ "인천" ];
		this.area["부천시원미구"] = [ "부천" ];
		this.area["부천시소사구"] = [ "부천" ];
		this.area["부천시오정구"] = [ "부천" ];
		this.area["광명시"] = [ "광명" ];
		this.area["안양시만안구"] = [ "안양" ];
		this.area["안양시동안구"] = [ "안양" ];
		this.area["과천시"] = [ "과천" ];
		this.area["안산시상록구"] = [ "안산" ];
		this.area["안산시단원구"] = [ "안산" ];
		this.area["용인시"] = [ "용인" ];
		this.area["시흥시"] = [ "시흥" ];
		this.area["고양시일산서구"] = [ "고양" ];
		this.area["고양시일산동구"] = [ "고양" ];
		this.area["김포시"] = [ "김포" ];
		this.area["남양주시"] = [ "남양주" ];
		this.area["의정부시"] = [ "의정부" ];
		this.area["의왕시"] = [ "의왕" ];
		this.area["군포시"] = [ "군포" ];
		this.area["양주시"] = [ "양주" ];
		this.area["파주시"] = [ "파주" ];
		this.area["수원시권선구"] = [ "수원" ];
		this.area["수원시영통구"] = [ "수원" ];
		this.area["수원시장안구"] = [ "수원" ];
		this.area["수원시팔달구"] = [ "수원" ];
		this.area["광주시a"] = [ "광주 " ];
		this.area["구리시"] = [ "구리" ];
		this.area["하남시"] = [ "하남" ];
		this.area["성남시분당구"] = [ "성남" ];
		this.area["성남시수정구"] = [ "성남" ];
		this.area["성남시중원구"] = [ "성남" ];
		this.area["울산광역시"] = [ "울산" ];
		this.area["원주시"] = [ "원주" ];
		this.area["천안시"] = [ "천안" ];
		this.area["광주광역시"] = [ "광주" ];
		this.area["부산광역시"] = [ "부산" ];
		this.area["군산시"] = [ "군산" ];
		this.area["대전광역시"] = [ "대전" ];
		this.area["전주시덕진구"] = [ "전주" ];
		this.area["전주시완산구"] = [ "전주" ];
		this.area["대구광역시"] = [ "대구" ];
		this.area["창원시"] = [ "창원" ];
		this.area["마산시"] = [ "창원" ];
		this.area["제주특별자치도"] = [ "제주" ];

		this.area["경기도"] = [ "경기" ];
		this.area["강원도"] = [ "강원도" ];
		this.area["충청남도"] = [ "충남" ];
		this.area["충청북도"] = [ "충북" ];
		this.area["전라남도"] = [ "전남" ];
		this.area["전라북도"] = [ "전북" ];
		this.area["경상북도"] = [ "경북" ];
		this.area["경상남도"] = [ "경남" ];


		this.twitercode["서울"] = "poltra02";
		this.twitercode["수원"] = "poltra031";
		this.twitercode["인천"] = "poltra032";
		this.twitercode["원주"] = "poltra033";
		this.twitercode["대전"] = "poltra042";
		this.twitercode["천안"] = "poltra041";
		this.twitercode["청주"] = "poltra043";
		this.twitercode["부산"] = "poltra051";
		this.twitercode["울산"] = "poltra052";
		this.twitercode["창원"] = "poltra055";
		this.twitercode["대구"] = "poltra053";
		this.twitercode["포항"] = "poltra054";
		this.twitercode["광주"] = "poltra062";
		this.twitercode["전주"] = "poltra063";
		this.twitercode["제주"] = "poltra064";
		this.centerid["거제"] = [ "L28" ];
		this.centerid["고양"] = [ "L10" ];
		this.centerid["과천"] = [ "L06" ];
		this.centerid["광명"] = [ "L04" ];
		this.centerid["광주"] = [ "L31" ];//전라도
		this.centerid["구리"] = [ "L21" ];
		this.centerid["군산"] = [ "E15" ];
		this.centerid["대구"] = [ "E10" ];
		this.centerid["대전"] = [ "E07", "E19" ];
		this.centerid["도로공사"] = [ "E05" ];
		this.centerid["부산"] = [ "L23" ];
		this.centerid["부천"] = [ "L03" ];
		this.centerid["서울"] = [ "L01" ];
		this.centerid["서울 내부순환"] = [ "E04" ];
		this.centerid["서울 외부순환"] = [ "E23" ];
		this.centerid["성남"] = [ "E25" ];
		this.centerid["수도권 국도"] = [ "E06" ];
		this.centerid["수원"] = [ "E03" ];
		this.centerid["시흥"] = [ "L11" ];
		this.centerid["안산"] = [ "L07" ];
		this.centerid["안양"] = [ "L05" ];
		this.centerid["용인"] = [ "L08" ];
		this.centerid["울산"] = [ "E12" ];
		this.centerid["원주"] = [ "E14" ];
		this.centerid["익산"] = [ "E20" ];
		this.centerid["인천"] = [ "L02" ];
		this.centerid["전주"] = [ "E08" ];
		this.centerid["제주"] = [ "E13" ];
		this.centerid["창원"] = [ "E17" ];
		this.centerid["천안"] = [ "E18" ];
		this.centerid["파주"] = [ "L12" ];
		//this.centerid["포항"] = [ "E16" ];
		this.centerid["포항"] = [ "L37" ];
		this.linkids["서울"] = [ "100", "130" ];
		this.linkids["인천"] = [ "161", "175" ];
		this.linkids["부천"] = [ "210", "213" ];
		this.linkids["광명"] = [ "213", "214" ];
		this.linkids["안양"] = [ "208", "210" ];
		this.linkids["과천"] = [ "220", "221" ];
		this.linkids["안산"] = [ "216", "218" ];
		this.linkids["용인"] = [ "228", "229" ];
		this.linkids["시흥"] = [ "224", "225" ];
		this.linkids["고양"] = [ "218", "220" ];
		this.linkids["김포"] = [ "232", "233" ];
		this.linkids["양주"] = [ "235", "236" ];
		this.linkids["의정부"] = [ "207", "208" ];
		this.linkids["의왕"] = [ "226", "227" ];
		this.linkids["군포"] = [ "225", "226" ];
		this.linkids["남양주"] = [ "222", "223" ];
		this.linkids["파주"] = [ "229", "230" ];
		this.linkids["수원"] = [ "200", "204" ];
		this.linkids["광주"] = [ "175", "183" ];
		this.linkids["구리"] = [ "221", "222" ];
		this.linkids["하남"] = [ "227", "228" ];
		this.linkids["성남"] = [ "204", "207" ];
		this.linkids["울산"] = [ "192", "200" ];
		this.linkids["원주"] = [ "251", "252" ];
		this.linkids["천안"] = [ "285", "286" ];
		this.linkids["광주 "] = [ "234", "235" ];
		this.linkids["부산"] = [ "130", "150" ];
		this.linkids["군산"] = [ "307", "308" ];
		this.linkids["대전"] = [ "183", "192" ];
		this.linkids["전주"] = [ "305", "307" ];
		this.linkids["대구"] = [ "155", "161" ];
		this.linkids["포항"] = [ "350", "352" ];
		this.linkids["창원"] = [ "379", "381" ];
		this.linkids["제주"] = [ "405", "413" ];

		this.areambr["서울"] = {
			x : 126.981591,
			y : 37.525559,
			level : 5
		};
		this.areambr["인천"] = {
			x : 126.653021,
			y : 37.468559,
			level : 7
		};
		this.areambr["부천"] = {
			x : 126.764187,
			y : 37.488759,
			level : 7
		};
		this.areambr["광명"] = {
			x : 126.864149,
			y : 37.480781,
			level : 7
		};
		this.areambr["안양"] = {
			x : 126.918209,
			y : 37.399442,
			level : 7
		};
		this.areambr["과천"] = {
			x : 126.997774,
			y : 37.431775,
			level : 7
		};
		this.areambr["안산"] = {
			x : 126.834371,
			y : 37.316461,
			level : 7
		};
		this.areambr["용인"] = {
			x : 127.218081,
			y : 37.24479,
			level : 7
		};
		this.areambr["시흥"] = {
			x : 126.807412,
			y : 37.370053,
			level : 6
		};
		this.areambr["고양"] = {
			x : 126.751752,
			y : 37.674421,
			level : 7
		};
		this.areambr["김포"] = {
			x : 126.710128,
			y : 37.627708,
			level : 7
		};
		this.areambr["양주"] = {
			x : 127.039019,
			y : 37.768178,
			level : 7
		};
		this.areambr["의정부"] = {
			x : 127.047065,
			y : 37.743929,
			level : 7
		};
		this.areambr["의왕"] = {
			x : 126.977247,
			y : 37.346386,
			level : 8
		};
		this.areambr["군포"] = {
			x : 126.94068,
			y : 37.328872,
			level : 7
		};
		this.areambr["남양주"] = {
			x : 127.181795,
			y : 37.618018,
			level : 6
		};
		this.areambr["파주"] = {
			x : 126.776259,
			y : 37.755517,
			level : 7
		};
		this.areambr["수원"] = {
			x : 127.030163,
			y : 37.264003,
			level : 7
		};
		this.areambr["광주 "] = {
			x : 127.251143,
			y : 37.404975,
			level : 7
		};
		this.areambr["구리"] = {
			x : 127.138536,
			y : 37.590826,
			level : 7
		};
		this.areambr["하남"] = {
			x : 127.201551,
			y : 37.531823,
			level : 7
		};
		this.areambr["성남"] = {
			x : 127.124379,
			y : 37.416791,
			level : 7
		};
		this.areambr["울산"] = {
			x : 129.327196,
			y : 35.54238,
			level : 7
		};
		this.areambr["원주"] = {
			x : 127.943506,
			y : 37.336279,
			level : 7
		};
		this.areambr["천안"] = {
			x : 127.134575,
			y : 36.814261,
			level : 7
		};
		this.areambr["광주"] = {
			x : 126.84947,
			y : 35.150481,
			level : 7
		};
		this.areambr["부산"] = {
			x : 129.061531,
			y : 35.141967,
			level : 7
		};
		this.areambr["군산"] = {
			x : 126.720778,
			y : 35.970014,
			level : 7
		};
		this.areambr["대전"] = {
			x : 127.400245,
			y : 36.32344,
			level : 7
		};
		this.areambr["전주"] = {
			x : 127.122351,
			y : 35.852179,
			level : 7
		};
		this.areambr["대구"] = {
			x : 128.553725,
			y : 35.857816,
			level : 7
		};
		this.areambr["포항"] = {
			x : 129.347841,
			y : 36.017513,
			level : 7
		};
		this.areambr["창원"] = {
			x : 128.668585,
			y : 35.226859,
			level : 7
		};
		this.areambr["제주"] = {
			x : 126.505827,
			y : 33.485941,
			level : 7
		};

		this.areambr["경기"] = {
			x : 127.00902538373,
			y : 37.275659431101,
			level : 7
		};

		this.areambr["강원도"] = {
			x : 127.73086099516,
			y : 37.885601740278,
			level : 7
		};

		this.areambr["충북"] = {
			x : 127.49105218627,
			y : 36.637312997861,
			level : 7
		};

		this.areambr["충남"] = {
			x : 126.67411395401,
			y : 36.659570099257,
			level : 7
		};

		this.areambr["전북"] = {
			x : 127.10927504818,
			y : 35.81950750705,
			level : 7
		};

		this.areambr["전남"] = {
			x : 126.46263351288,
			y : 34.815806774822,
			level : 7
		};

		this.areambr["경북"] = {
			x : 128.60095232104,
			y : 35.892894116833,
			level : 7
		};

		this.areambr["경남"] = {
			x : 128.69214844862,
			y : 35.237346903772,
			level : 7
		};
	};
	this.code = "";
	this.doname = "";
	this.cityname = "";
	this.getAreaMbr = function(locate) {
		var mbr = this.areambr[locate];
		if (mbr == undefined || mbr == "undefined") {
			mbr = "";
		}
		return mbr;
	};
	this.getTwiterCode = function() {
		var a = this.twitercode[this.getAreaName2()];
		if (a == undefined) {
			a = "";
		}
		return a;
	};
	this.isAreaName = function(doname, cityname) {
		var a = this.area[doname];
		var b = this.area[cityname];
		if (a == undefined) {
			a = "";
		}
		if (b == undefined) {
			b = "";
		}
		return a + b;
	};
	this.getAreaName2 = function() {
		var a = this.area[this.doname];
		var b = this.area[this.cityname];
		if (a == undefined) {
			a = "";
		}
		if (b == undefined) {
			b = "";
		}
		return a + b;
	};
	this.getCenterId = function() {
		var a = this.centerid[this.getAreaName2()];
		if (a == undefined) {
			a = "";
		}
		return a;
	};
	this.getLinkIds = function() {
		var a = this.linkids[this.getAreaName2()];
		if (a == undefined) {
			a = "";
		}
		return a;
	};
	this.getAreaName = function() {
		var len = this.area.length;
		for ( var i = 0; i < len; i++) {
			var item = this.area[i];
			if (item.indexOf(this.doname) > -1
					|| this.doname.indexOf(item) > -1) {
				return item;
			}
			if (item.indexOf(this.cityname) > -1
					|| this.cityname.indexOf(item) > -1) {
				return item;
			}
		}
		return "";
	};
	this.search = function(str) {
		var len = this.area.length;
		for ( var i = 0; i < len; i++) {
			var item = this.area[i];
			if ((item.indexOf(str) > -1) || (str.indexOf(item) > -1)) {
				return true;
			}
		}
		return false;
	};
	this.check = function(obj) {
		var a = this.isAreaName(obj.ADMINLOCAL, obj.ADMINCITY);
		var b = this.getAreaName2();
		if (a != b) {
			return false;
		} else {
			this.areaname = a;
			return true;
		}
	};
	this.setArea = function(obj) {
		if (obj.ADMINCODE == "234") {
			obj.ADMINCITY = "광주시a";
		}
		var a = this.isAreaName(obj.ADMINLOCAL, obj.ADMINCITY);
		if (a == "") {
			this.code = obj.ADMINCODE;
			this.doname = obj.ADMINLOCAL;
			this.cityname = obj.ADMINCITY;
			this.changed = true;
			return;
		}
		if (this.code == obj.ADMINCODE) {
			this.changed = false;
			return;
		} else {
			if (this.check(obj)) {
				this.changed = false;
				return;
			}
			this.changed = true;
		}
		this.code = obj.ADMINCODE;
		this.doname = obj.ADMINLOCAL;
		this.cityname = obj.ADMINCITY;
	};
	this.getAreaCode = function() {
		return this.code;
	};
	this.isChanged = function() {
		return this.changed;
	};
	this.getMapAreaCode = function(map, Mando, AreaChanged) {
		var lonlat = map.getCenter();
		var url = './../map/getproxy.do?url=http://61.108.209.20/getAreaCode?lonlat=' + lonlat.lon + ',' + lonlat.lat;
		var areaCode = this;
		$.get(url, function(data) {
			if (data == null || data == "") {
				return;
			}
			var elem = eval("(" + data + ")");
			areaCode.setArea(elem);
			if (areaCode.isChanged()) {
				var a = document.getElementById("mapAreaName");
				if (a) {
					a.innerHTML = "<h3><strong>" + areaCode.getAreaName2() + "</strong> 교통정보</h3>";
				}
				if (typeof AreaChanged == "function") {
					AreaChanged(areaCode);
				}
			}
		});
	};
	this.roadGoMap = function(x, y) {
		var c = Mando.wgs84ToMandoMap(x, y);
		gotoPOI(c.lon, c.lat, 8);
	};
}

function RotaCCTV() {
	this.cctvList = [];
	this.layer;
	this.minlevel = 5;
	this.maxlevel = 8;
	this.setLayer = function(a) {
		this.layer = a;
	};
	this.getCctv = function(c) {
		var a = this.cctvList.length;
		for ( var b = 0; b < a; b++) {
			if (this.cctvList[b].CCTVID == c) {
				return this.cctvList[b];
			}
		}
		return null;
	};
	this.displayCCTV = function() {
		if (!this.layer.visible) {
			this.layer.setVisibility(false);
			return;
		}
		if (this.cctvList.length == 0) {
			this.loadCCTV();
		}
		if (map.zoom <= this.minlevel) {
			this.layer.setVisibility(false);
			return;
		}
		this.layer.clearMarkers();
		var b = this.cctvList.length;
		var c = map.getExtent();
		for ( var e = 0; e < b; e++) {
			var d = this.cctvList[e];
			var a = d.XCOORD;
			var g = d.YCOORD;
			var f = Mando.wgs84ToMandoMap(a, g);
			if (!c.containsLonLat(f)) {
				continue;
			}
			addMarker(f.lon, f.lat, null, IconType.IconCCTV, d.CCTVNAME, d.CCTVID, true, this.layer);
		}
		this.layer.setVisibility(true);
		return;
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
		a = "./../map/mapcctv.do";
		var b = this;
		var param = "";
		var min_x = $("#min_x").val();
		var min_y = $("#min_y").val();
		var max_x = $("#max_x").val();
		var max_y = $("#max_y").val();

		param += "&MIN_X=" + min_x;
		param += "&MIN_Y=" + min_y;
		param += "&MAX_X=" + max_x;
		param += "&MAX_Y=" + max_y;

		$.ajax({
			url : a,
			dataType : "json",
			data : encodeURI(param),
			async : false,
			success : function(c) {
				try{
					b.cctvList = c;
					if (g_main && map.zoom > b.minlevel) {
						b.displayCCTV();
						return;
					}
					if (b.layer.visible && map.zoom > b.minlevel) {
						b.displayCCTV();
					} else {
						b.hideCCTV();
					}
				}catch(e){
					alert(e);
				}
			}
		});
	};
	this.cctvGoMap = function(x, y) {
		var c = Mando.wgs84ToMandoMap(x, y);
		gotoPOI(c.lon, c.lat, 8);
	};
	this.gotoMapCCTV = function(b) {
		var a = this.getCctv(b);
		if (!a) {
			return;
		}
		var c = Mando.wgs84ToMandoMap(a.XCOORD, a.YCOORD);
		gotoPOI(c.lon, c.lat, 8);
	};
	this.hideCCTV = function() {
		if (this.layer != null) {
			this.layer.setVisibility(false);
		}
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
	this.popupCctvStream = function(cctvid){
		var url = './../map/mapcctvonoff.do?cctvid=' + cctvid;
		var obj = this;
		$.getJSON(url, function(data) {
			if(data.length == 1){
				if(data[0] == '0'){
					var width = 322;

					var height = 239;

					var top = (window.screen.height - height) / 2;

					var left = (window.screen.width - width) / 2;

					var features = 'width='+ width +',height='+ height +',top='+ top +',left='+ left +',toolbar=no,scrollbars=no,status=no,resizable=no,location=no';
					var popCctv;
					popCctv = window.open('/view/map/cctvUgo.jsp', 'UTIC도시교통정보센터', features);
					popCctv.focus();
				}else{
					var streamCctv = new StreamCctv(cctvid);
					var width = 346;
					var height = 325;

					if(streamCctv.gKind == "H"){ // 대구
						width = 345;
					}else if(streamCctv.gKind == "I" && streamCctv.gCh != null){ //부산
						width = 365;
						height = 375;
					}else if(streamCctv.gKind == "M"){ //원주
						width = 345;
					}else if(streamCctv.gKind == "F"){ //전주
						width = 343;
					}else if(streamCctv.gKind == "Y"){ //창원
						//width = 375;
						width = 345;
					}
					else if(streamCctv.gKind == "C"){//수원
						width  = 322;
						height = 270;
					}else if(streamCctv.gKind == "J"){//울산
						width  = 340;
						height = 257;
					}else if(streamCctv.gKind == "T"){//안산
						width  = 380;
						height = 380;
					}

					var top = (window.screen.height - height) / 2;
					var left = (window.screen.width - width) / 2;

					var popCctv;

					var cctvGid;
					if( streamCctv.gId != null ) {
						cctvGid = streamCctv.gId.replace(/\+/g,"%2B");
					}else{
						cctvGid = streamCctv.gId;
					}

					popCctv = window.open('http://www.utic.go.kr/view/map/cctvStream.jsp?cctvid=' + cctvid+ '&cctvName=' + encodeURI(encodeURIComponent(streamCctv.gCctvName)) + '&kind=' + streamCctv.gKind + '&cctvip=' + streamCctv.gCctvIp + '&cctvch=' + streamCctv.gCh + '&id=' + cctvGid + '&cctvpasswd=' + streamCctv.gPasswd + '&cctvport=' + streamCctv.gPort, 'PopupCctv',"top=" + top + "px, left=" + left + "px, width=" + width + "px, height=" + height+ "px, menubar=no, location=no, toolbar=no, scrollbars=no, status=no, resizable=no");
					popCctv.focus();

					weblog(cctvid,'cctv');
				}
			}else{
				var streamCctv = new StreamCctv(cctvid);
				var width = 346;
				var height = 325;

				if(streamCctv.gKind == "H"){ // 대구
					width = 345;
				}
				else if(streamCctv.gKind == "I" && streamCctv.gCh != null){ //부산
					width = 365; height = 375;
				}
				else if(streamCctv.gKind == "M"){ //원주
					width = 345;
				}
				else if(streamCctv.gKind == "F"){ //전주
					width = 343;
				}
				else if(streamCctv.gKind == "Y"){ //창원
					//width = 375;
					width = 345;
				}
				else if(streamCctv.gKind == "C"){//수원
					width  = 322;
					height = 270;
				}else if(streamCctv.gKind == "J"){//울산
					width  = 340;
					height = 257;
				}else if(streamCctv.gKind == "T"){//안산
					width  = 380;
					height = 380;
				}

				var top = (window.screen.height-height)/2;
				var left = (window.screen.width-width)/2;
				var popCctv;

				var cctvGid;
				if( streamCctv.gId != null ) {
					cctvGid = streamCctv.gId.replace(/\+/g,"%2B");
				}else{
					cctvGid = streamCctv.gId;
				}
				popCctv = window.open('http://www.utic.go.kr/view/map/cctvStream.jsp?cctvid=' + cctvid+ '&cctvName=' + encodeURI(encodeURIComponent(streamCctv.gCctvName)) + '&kind=' + streamCctv.gKind + '&cctvip=' + streamCctv.gCctvIp + '&cctvch=' + streamCctv.gCh + '&id=' + cctvGid + '&cctvpasswd=' + streamCctv.gPasswd + '&cctvport=' + streamCctv.gPort, 'PopupCctv',"top=" + top + "px, left=" + left + "px, width=" + width + "px, height=" + height+ "px, menubar=no, location=no, toolbar=no, scrollbars=no, status=no, resizable=no");
				popCctv.focus();
				weblog(cctvid,'cctv');
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
		var b = '<video id="mov" width="500" height="224" src="' + d
				+ '" onclick="playCCTV()"/>';
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
};
//
//
//function RotaCCTV2() {
//	this.cctvList = [];
//	this.layer;
//	this.minlevel = 6;
//	this.maxlevel = 8;
////	this.setLayer = function(a) {
////		this.layer = a;
////	};
//	this.getCctv = function(c) {
//		var a = this.cctvList.length;
//		for ( var b = 0; b < a; b++) {
//			if (this.cctvList[b].CCTVID == c) {
//				return this.cctvList[b];
//			}
//		}
//		return null;
//	};
//	this.isLoad = function() {
//		if (this.cctvList.length == 0) {
//			return false;
//		} else {
//			return true;
//		}
//	};
//	this.loadCCTV = function() {
//		var a = "./../map/mapcctv.do";
//		var b = this;
//		$.ajax({
//			url : a,
//			dataType : "json",
//			async : false,
//			success : function(c) {
//				try{
//					b.cctvList = c;
//				}catch(e){
//					alert(e);
//				}
//			}
//		});
//	};
//	this.getCCTVTooltipInfo = function(b) {
//		var a = '<table border="0" cellspacing="0" cellpadding="0"><tr><td width="1" height="1"></td><td bgcolor="#1B4E99"></td><td width="1" height="1"></td></tr><tr><td bgcolor="#1B4E99"></td><td><table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td bgcolor="#1B4E99"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td height="20"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td style="padding:3px 3px 3px 3px;color:#ffffff;font-weight:bold;font-size:11px;">'
//				+ b
//				+ '</td></tr></table></td></tr></table></td></tr></table></td><td bgcolor="#1B4E99"></td></tr><tr><td width="1" height="1"></td><td bgcolor="#1B4E99"></td><td width="1" height="1"></td></tr></table>';
//		return a;
//	};
//	this.popupCctvImage = function(c) {
//		var b = this.getCctv(c);
//		if (b.LOCATE == null && b.MOVIE == "Y") {
//			this.popupCctvStream(c);
//			return;
//		}
//		var a = new StreamCctv(b);
//		var d = Mando.wgs84ToMandoMap(a.gDx, a.gDy);
//		cctvPopup.displayPopup(true, new UTISMap.LonLat(d.lon, d.lat), a.getImageHtml(), c);
//		weblog(c, "cctv");
//	};
//	this.popupCctvStream = function(cctvid, key, flag){
//		if(flag == "cctvOpen"){
//			$.ajax({
//		         type: "POST"
//		        ,url : '/guide/cctvOpenDataCheck.do'
//		        ,dataType : 'json'
//		        ,data: {key: key}
//		        ,success: function(data) {
//		        	var temp = data.split(",");
//		        	if(temp[0] == "FAIL"){
//		        		alert(temp[1]);
//		        	}else{
//		        		var url = './../map/mapcctvonoff.do?cctvid=' + cctvid;
//		    			var obj = this;
//		    			$.getJSON(url, function(data) {
//		    				if(data.length == 1){
//		    					if(data[0] == '0'){
//		    						var width = 322;
//
//		    						var height = 239;
//
//		    						var top = (window.screen.height - height) / 2;
//
//		    						var left = (window.screen.width - width) / 2;
//
//		    						var features = 'width='+ width +',height='+ height +',top='+ top +',left='+ left +',toolbar=no,scrollbars=no,status=no,resizable=no,location=no';
//		    						var popCctv;
//		    						popCctv = window.open('/view/map/cctvUgo.jsp', 'UTIS중앙교통정보센터', features);
//		    						popCctv.focus();
//		    					}else{
//		    						var streamCctv = new StreamCctv(cctvid);
//		    						var width = 346;
//		    						var height = 325;
//
//		    						if(streamCctv.gKind == "H"){ // 대구
//		    							width = 345;
//		    						}else if(streamCctv.gKind == "I" && streamCctv.gCh != null){ //부산
//		    							width = 365;
//		    							height = 375;
//		    						}else if(streamCctv.gKind == "M"){ //원주
//		    							width = 345;
//		    						}else if(streamCctv.gKind == "F"){ //전주
//		    							width = 343;
//		    						}else if(streamCctv.gKind == "Y"){ //창원
//		    							//width = 375;
//		    							width = 345;
//		    						}
//		    						else if(streamCctv.gKind == "C"){//수원
//		    							width  = 322;
//		    							height = 270;
//		    						}else if(streamCctv.gKind == "J"){//울산
//		    							width  = 340;
//		    							height = 257;
//		    						}else if(streamCctv.gKind == "T"){//안산
//			    						width  = 380;
//			    						height = 380;
//			    					}
//
//		    						var top = (window.screen.height - height) / 2;
//		    						var left = (window.screen.width - width) / 2;
//
//		    						var popCctv;
//
//			    					var cctvGid;
//										if( streamCctv.gId != null ) {
//											cctvGid = streamCctv.gId.replace(/\+/g,"%2B");
//										}else{
//											cctvGid = streamCctv.gId;
//										}
//
//		    						popCctv = window.open('./../view/map/openDataCctvStream.jsp?key=' + key+ '&cctvid=' + cctvid+ '&cctvName=' + encodeURI(encodeURIComponent(streamCctv.gCctvName)) + '&kind=' + streamCctv.gKind + '&cctvip=' + streamCctv.gCctvIp + '&cctvch=' + streamCctv.gCh + '&id=' + cctvGid + '&cctvpasswd=' + streamCctv.gPasswd + '&cctvport=' + streamCctv.gPort, 'PopupCctv',"top=" + top + "px, left=" + left + "px, width=" + width + "px, height=" + height+ "px, menubar=no, location=no, toolbar=no, scrollbars=no, status=no, resizable=no");
//		    						popCctv.focus();
//
//		    						weblog(cctvid,'cctv');
//		    					}
//		    				}else{
//		    					var streamCctv = new StreamCctv(cctvid);
//		    					var width = 346;
//		    					var height = 325;
//
//		    					if(streamCctv.gKind == "H"){ // 대구
//		    						width = 345;
//		    					}
//		    					else if(streamCctv.gKind == "I" && streamCctv.gCh != null){ //부산
//		    						width = 365; height = 375;
//		    					}
//		    					else if(streamCctv.gKind == "M"){ //원주
//		    						width = 345;
//		    					}
//		    					else if(streamCctv.gKind == "F"){ //전주
//		    						width = 343;
//		    					}
//		    					else if(streamCctv.gKind == "Y"){ //창원
//		    						//width = 375;
//		    						width = 345;
//		    					}
//		    					else if(streamCctv.gKind == "C"){//수원
//		    						width  = 322;
//		    						height = 270;
//		    					}else if(streamCctv.gKind == "J"){//울산
//		    						width  = 340;
//		    						height = 257;
//		    					}else if(streamCctv.gKind == "T"){//안산
//		    						width  = 380;
//		    						height = 380;
//		    					}
//
//		    					var top = (window.screen.height-height)/2;
//		    					var left = (window.screen.width-width)/2;
//		    					var popCctv;
//
//    							var cctvGid;
//									if( streamCctv.gId != null ) {
//										cctvGid = streamCctv.gId.replace(/\+/g,"%2B");
//									}else{
//										cctvGid = streamCctv.gId;
//									}
//
//		    					popCctv = window.open('./../view/map/openDataCctvStream.jsp?key=' + key+ '&cctvid=' + cctvid+ '&cctvName=' + encodeURI(encodeURIComponent(streamCctv.gCctvName)) + '&kind=' + streamCctv.gKind + '&cctvip=' + streamCctv.gCctvIp + '&cctvch=' + streamCctv.gCh + '&id=' + cctvGid + '&cctvpasswd=' + streamCctv.gPasswd + '&cctvport=' + streamCctv.gPort, 'PopupCctv',"top=" + top + "px, left=" + left + "px, width=" + width + "px, height=" + height+ "px, menubar=no, location=no, toolbar=no, scrollbars=no, status=no, resizable=no");
//		    					popCctv.focus();
//		    					weblog(cctvid,'cctv');
//		    				}
//		    		    });
//		        	}
//		        }
//				,error : function(xhr,status,error){
//					alert(error);
//				}
//	    	});
//		}else{
//			var url = './../map/mapcctvonoff.do?cctvid=' + cctvid;
//			var obj = this;
//			$.getJSON(url, function(data) {
//				if(data.length == 1){
//					if(data[0] == '0'){
//						var width = 322;
//
//						var height = 239;
//
//						var top = (window.screen.height - height) / 2;
//
//						var left = (window.screen.width - width) / 2;
//
//						var features = 'width='+ width +',height='+ height +',top='+ top +',left='+ left +',toolbar=no,scrollbars=no,status=no,resizable=no,location=no';
//						var popCctv;
//						popCctv = window.open('/view/map/cctvUgo.jsp', 'UTIS중앙교통정보센터', features);
//						popCctv.focus();
//					}else{
//						var streamCctv = new StreamCctv(cctvid);
//						var width = 346;
//						var height = 325;
//
//						if(streamCctv.gKind == "H"){ // 대구
//							width = 345;
//						}else if(streamCctv.gKind == "I" && streamCctv.gCh != null){ //부산
//							width = 365;
//							height = 375;
//						}else if(streamCctv.gKind == "M"){ //원주
//							width = 345;
//						}else if(streamCctv.gKind == "F"){ //전주
//							width = 343;
//						}else if(streamCctv.gKind == "Y"){ //창원
//							//width = 375;
//							width = 345;
//						}
//						else if(streamCctv.gKind == "C"){//수원
//							width  = 322;
//							height = 270;
//						}else if(streamCctv.gKind == "J"){//울산
//							width  = 340;
//							height = 257;
//						}else if(streamCctv.gKind == "T"){//안산
//							width  = 380;
//							height = 380;
//						}
//
//						var top = (window.screen.height - height) / 2;
//						var left = (window.screen.width - width) / 2;
//
//						var popCctv;
//						popCctv = window.open('./../view/map/openDataCctvStream.jsp?key=' + key+ '&cctvid=' + cctvid+ '&cctvName=' + encodeURI(encodeURIComponent(streamCctv.gCctvName)) + '&kind=' + streamCctv.gKind + '&cctvip=' + streamCctv.gCctvIp + '&cctvch=' + streamCctv.gCh + '&id=' + cctvGid + '&cctvpasswd=' + streamCctv.gPasswd + '&cctvport=' + streamCctv.gPort, 'PopupCctv',"top=" + top + "px, left=" + left + "px, width=" + width + "px, height=" + height+ "px, menubar=no, location=no, toolbar=no, scrollbars=no, status=no, resizable=no");
//						popCctv.focus();
//
//						weblog(cctvid,'cctv');
//					}
//				}else{
//					var streamCctv = new StreamCctv(cctvid);
//					var width = 346;
//					var height = 325;
//
//					if(streamCctv.gKind == "H"){ // 대구
//						width = 345;
//					}
//					else if(streamCctv.gKind == "I" && streamCctv.gCh != null){ //부산
//						width = 365; height = 375;
//					}
//					else if(streamCctv.gKind == "M"){ //원주
//						width = 345;
//					}
//					else if(streamCctv.gKind == "F"){ //전주
//						width = 343;
//					}
//					else if(streamCctv.gKind == "Y"){ //창원
//						//width = 375;
//						width = 345;
//					}
//					else if(streamCctv.gKind == "C"){//수원
//						width  = 322;
//						height = 270;
//					}else if(streamCctv.gKind == "J"){//울산
//						width  = 340;
//						height = 257;
//					}else if(streamCctv.gKind == "T"){//안산
//						width  = 380;
//						height = 380;
//					}
//
//					var top = (window.screen.height-height)/2;
//					var left = (window.screen.width-width)/2;
//					var popCctv;
//
//    			var cctvGid;
//					if( streamCctv.gId != null ) {
//						cctvGid = streamCctv.gId.replace(/\+/g,"%2B");
//					}else{
//						cctvGid = streamCctv.gId;
//					}
//
//					popCctv = window.open('./../view/map/openDataCctvStream.jsp?key=' + key+ '&cctvid=' + cctvid+ '&cctvName=' + encodeURI(encodeURIComponent(streamCctv.gCctvName)) + '&kind=' + streamCctv.gKind + '&cctvip=' + streamCctv.gCctvIp + '&cctvch=' + streamCctv.gCh + '&id=' + cctvGid + '&cctvpasswd=' + streamCctv.gPasswd + '&cctvport=' + streamCctv.gPort, 'PopupCctv',"top=" + top + "px, left=" + left + "px, width=" + width + "px, height=" + height+ "px, menubar=no, location=no, toolbar=no, scrollbars=no, status=no, resizable=no");
//					popCctv.focus();
//					weblog(cctvid,'cctv');
//				}
//		    });
//		}
//	};
//	this.popupCctvUgo = function(cctvid){
//		var width = 322;
//		var height = 239;
//		var top = (window.screen.height - height) / 2;
//		var left = (window.screen.width - width) / 2;
//		var features = 'width='+ width +',height='+ height +',top='+ top +',left='+ left +',toolbar=no,scrollbars=no,status=no,resizable=no,location=no';
//		window.open('/view/map/cctvUgo.jsp', 'UTIC도시교통정보센터', features);
//		weblog(cctvid, 'cctv');
//	};
//	this.popupLiveVideo = function(e, d) {
//		var b = this.getCctv(e);
//		var c = b.locate;
//		var a = getCctvSteamHTML(c, b.cctvname);
//		displayPopup(true, d, new UTISMap.Size(340, 298), new UTISMap.Size(0, -298 - IconType.IconCCTV.size.h), a);
//	};
//	this.getCctvFileName = function(b) {
//		var c = b;
//		if (c == undefined) {
//			return "";
//		}
//		var a = c.lastIndexOf("/");
//		if (a > -1) {
//			return c.substring(a + 1, c.length);
//		}
//		return "";
//	};
//	this.getRealtimeCctvPath = function(b, c) {
//		var e = networkCheck.getCctvPath();
//		var a = "./../map/mapcctvinfo.do?cctvid=" + b.cctvid;
//		var d = this;
//		$.getJSON(a, function(j) {
//			var k = null;
//			if (j.length == 1) {
//				k = j[0];
//			}
//			var h;
//			if (j.length == 0 || k == null || k.locate == undefined) {
//				h = "./../contents/images/map/cctv_no.gif";
//			} else {
//				var g = k.locate;
//				var i = d.getCctvFileName(g);
//				h = e + i;
//			}
//			var f = d.getCctvHTML(b, h, c);
//			cctvPopup.displayPopup(true, c, f);
//		});
//	};
//	this.playCCTV = function() {
//		if (!confirm("해당 컨텐츠는 지속적으로 인터넷 패킷을 사용합니다.\n\n 3G 망에서 시청시 과도한 요금이 부가될 수 있습니다.\n\n동영상을 재생하시겠습니까?")) {
//			return
//		}
//		document.getElementById("mov").play();
//	};
//	this.getCctvSteamHTML = function(c, e) {
//		var d = c.locate;
//		var b = '<video id="mov" width="500" height="224" src="' + d
//				+ '" onclick="playCCTV()"/>';
//		var a = '<div class="video shad cctv"><p>'
//				+ c.cctvname
//				+ "<span><a onclick=\"javascript:cctv.popupCctv2('"
//				+ c.cctvid
//				+ "',"
//				+ e.lon
//				+ ","
//				+ e.lat
//				+ ',\'stop\');" class="pdr"><img src="../../contents/images/map/btn_stop_video.gif" alt="정지영상보기" /></a><a href="javascript:cctvPopup.hidePopup(\''
//				+ c.cctvid
//				+ '\');"><img src="../../contents/images/map/btn_cctv_clse.gif" alt="닫기" /></a></span></p><div class="cctv_area player">'
//				+ b + "</div></div>";
//		return a;
//	};
//	this.getCctvHTML = function(c, b, d) {
//		var a = '<div class="screenshop shad cctv" unselectable="on" style="-webkit-user-select: none;" ><p unselectable="on" style="-webkit-user-select: none;" >'
//				+ c.cctvname
//				+ "<span><a onclick=\"javascript:cctv.popupLiveVideo('"
//				+ c.cctvid
//				+ "',"
//				+ d.lon
//				+ ","
//				+ d.lat
//				+ ');" class="pdr"><img src="./../contents/images/map/btn_live_video.gif" alt="동영상보기" /></a><a onclick="javascript:cctvPopup.hidePopup(\''
//				+ c.cctvid
//				+ '\');"><img src="./../contents/images/map/btn_cctv_clse.gif" alt="닫기" /></a></span></p><div class="screenshot_area player"><img src="'
//				+ b
//				+ '" alt="" width="100%" height="100%" /></div></div>';
//		return a;
//	};
//	this.popupCctv2 = function(b, e, d, a) {
//		var c = Mando.wgs84ToMandoMap(e, d);
//		this.popupCctv(b, new UTISMap.LonLat(c.lon, c.lat), a);
//	};
//	this.popupCctv = function(d, e, c) {
//		var b = this.getCctv(d);
//		var f = null;
//		if (b.type == "02") {
//			f = true;
//		}
//		if (!c && f) {
//			var a = this.getCctvSteamHTML(b, e);
//			cctvPopup.displayPopup(true, e, a);
//		} else {
//			this.getRealtimeCctvPath(b, e);
//			return;
//		}
//	};
//	this.openCctvIPhone = function(a) {
//		var b = document.getElementById("mov");
//		b.src = a;
//	};
//}
//
//
//
//
////도로위헝상황예보
//function roadDanger() {
//	this.dangerList = [];
//	this.layer;
//	this.minlevel = 6;
//	this.maxlevel = 8;
//	this.setLayer = function(a) {
//		this.layer = a;
//	};
//	this.popupRoadDan = function(c, e, d) {
//		mapViewRoadSafeToolTipGo(c, e, d);
//	};
//}
////도로위헝상황예보
//function mapViewRoadSafeToolTipGo(c, e, d){
//	var SAFEDATA_ID;
//	var L_CD;
//	var M_CD;
//	var S_CD;
//	var L_CD_NM;
//	var M_CD_NM;
//	var LOCATION_DATA;
//	var ADDRESS_JIBUN;
//	var ADDRESS_NEW;
//	var IMG;
//	var VIEW_YN;
//	var _VIEW_MARKERS_LAYER 	= new UTISMap.Layer.Markers("ViewMarkers");
//	var _VIEW_VECTOR_LAYER		= new UTISMap.Layer.Vector('ViewVectorLayer');
//
//	$.ajax({
//		type: "POST"
//		,url: '/tsdms/mapViewRoadSafeToolTip.do'
//		,dataType: "json"
//		,data: {SAFEDATA_ID:c}
//		,success: function tooltip(data) {
//			SAFEDATA_ID = data[0].SAFEDATA_ID;
//			L_CD = data[0].L_CD;
//			M_CD = data[0].M_CD;
//			S_CD = data[0].S_CD;
//			L_CD_NM = data[0].L_CD_NM;
//			M_CD_NM = data[0].M_CD_NM;
//			ADDRESS_JIBUN = data[0].ADDRESS_JIBUN;
//			ADDRESS_NEW = data[0].ADDRESS_NEW;
//			LOCATION_DATA = data[0].LOCATION_DATA;
//			IMG = data[0].IMG;
//			VIEW_YN = data[0].VIEW_YN;
//			var poi_rotate = '';
//			var location = LOCATION_DATA.split("(");
//			location = location[0];		// 좌표 타입(폴리건이냐, 라인이냐, 포인트냐)
//			var type = '';
//			var _M_OBJ = new Object();
//
//			_M_OBJ.SAFEDATA_ID = SAFEDATA_ID;
//			_M_OBJ.L_CD = L_CD;
//			_M_OBJ.M_CD = M_CD;
//			_M_OBJ.S_CD = S_CD;
//			_M_OBJ.L_CD_NM = L_CD_NM;
//			_M_OBJ.M_CD_NM = M_CD_NM;
//			_M_OBJ.VIEW_YN = VIEW_YN;
//
//			_M_OBJ.ADDRESS_JIBUN = ADDRESS_JIBUN;
//			if(_M_OBJ.ADDRESS_JIBUN == '' || _M_OBJ.ADDRESS_JIBUN == null)
//				_M_OBJ.ADDRESS_JIBUN = '';
//
//			_M_OBJ.ADDRESS_NEW = ADDRESS_NEW;
//			if(_M_OBJ.ADDRESS_NEW == '' || _M_OBJ.ADDRESS_NEW == null)
//				_M_OBJ.ADDRESS_NEW = '';
//			_M_OBJ.LOCATION_DATA = LOCATION_DATA;
//			_M_OBJ.IMG = IMG;
//
//			if(L_CD == 'SF1'){//사고다발
//				type = 'TASS';
//
//				_M_OBJ.OCCUR_YMD = data[0].OCCUR_YMD;
//				if(_M_OBJ.OCCUR_YMD != '' && _M_OBJ.OCCUR_YMD != null)
//					_M_OBJ.OCCUR_YMD = _M_OBJ.OCCUR_YMD.substr(0,4)+'-'+_M_OBJ.OCCUR_YMD.substr(4,2)+'-'+_M_OBJ.OCCUR_YMD.substr(6,2);
//				else _M_OBJ.OCCUR_YMD = '';
//
//				_M_OBJ.OCCUR_H24 = '';		//TAAS 시간 없음
//
//				_M_OBJ.DEATH_CNT = data[0].DEATH_CNT;
//				if (_M_OBJ.DEATH_CNT == '' || _M_OBJ.DEATH_CNT == null) _M_OBJ.DEATH_CNT = '';
//
//				_M_OBJ.SERIOUS_CNT = data[0].SERIOUS_CNT;
//				if(_M_OBJ.SERIOUS_CNT == '' || _M_OBJ.SERIOUS_CNT == null) _M_OBJ.SERIOUS_CNT = '';
//
//				_M_OBJ.DATA_DESC = M_CD_NM;		// 검색 리스트 클릭시 이동후 툴팁(사고내용)
//
//				_M_OBJ.MINIOR_CNT = data[0].MINIOR_CNT;
//				if(_M_OBJ.MINIOR_CNT == '' || _M_OBJ.MINIOR_CNT == null) _M_OBJ.MINIOR_CNT = '';
//
//				_M_OBJ.REPORT_CNT = data[0].REPORT_CNT;
//				if(_M_OBJ.REPORT_CNT == '' || _M_OBJ.REPORT_CNT == null) _M_OBJ.REPORT_CNT = '';
//
//			}else if(L_CD == 'SF2') {
//				if(M_CD == 'SF200' || M_CD == 'SF201' || M_CD == 'SF202') {
//					type = 'TP1';
//
//					_M_OBJ.OCCUR_YMD = data[0].OCCUR_YMD_TP1;
//					if(_M_OBJ.OCCUR_YMD != '' && _M_OBJ.OCCUR_YMD != null)
//						_M_OBJ.OCCUR_YMD = _M_OBJ.OCCUR_YMD.substr(0,4)+'-'+_M_OBJ.OCCUR_YMD.substr(4,2)+'-'+_M_OBJ.OCCUR_YMD.substr(6,2);
//					else _M_OBJ.OCCUR_YMD = '';
//
//					_M_OBJ.OCCUR_H24 = data[0].OCCUR_H24_TP1;
//					if(_M_OBJ.OCCUR_H24 != '' && _M_OBJ.OCCUR_H24 != null) _M_OBJ.OCCUR_H24 = _M_OBJ.OCCUR_H24 + '시';
//					else _M_OBJ.OCCUR_H24 = '';
//
//					_M_OBJ.DATA_DESC = data[0].DATA_DESC_TP1;
//					if(_M_OBJ.DATA_DESC == '' || _M_OBJ.DATA_DESC == null) _M_OBJ.DATA_DESC = '';
//
//					_M_OBJ.DEATH_CNT = data[0].DEATH_CNT_TP1;
//					if(_M_OBJ.DEATH_CNT == '' || _M_OBJ.DEATH_CNT == null) _M_OBJ.DEATH_CNT = '';
//
//					_M_OBJ.SERIOUS_CNT = data[0].SERIOUS_CNT_TP1;
//					if(_M_OBJ.SERIOUS_CNT == '' || _M_OBJ.SERIOUS_CNT == null) _M_OBJ.SERIOUS_CNT = '';
//
//					_M_OBJ.MINIOR_CNT = data[0].MINIOR_CNT_TP1;
//					if(_M_OBJ.MINIOR_CNT == '' || _M_OBJ.MINIOR_CNT == null) _M_OBJ.MINIOR_CNT = '';
//
//					_M_OBJ.REPORT_CNT = data[0].REPORT_CNT_TP1;
//					if(_M_OBJ.REPORT_CNT == '' || _M_OBJ.REPORT_CNT == null) _M_OBJ.REPORT_CNT = '';
//
//				}else if(M_CD == 'SF203'){//기상안전,위험요소
//					if(S_CD == 'SF20300' || S_CD == 'SF20301' || S_CD == 'SF20303' || S_CD == 'SF20305' || S_CD == 'SF20307' || S_CD == 'SF20308'){//위험요소
//						type = 'TP2';
//						_M_OBJ.DATA_DESC = data[0].DATA_DESC_TP2;
//						if(_M_OBJ.DATA_DESC == '' || _M_OBJ.DATA_DESC == null) _M_OBJ.DATA_DESC = '';
//					}else if(S_CD == 'SF20302' || S_CD == 'SF20304' || S_CD == 'SF20306' || S_CD == 'SF20309' || S_CD == 'SF20310' || S_CD == 'SF20311' || S_CD == 'SF20312' || S_CD == 'SF20313'){//기상안전
//						type = 'TP2';
//						_M_OBJ.DATA_DESC = data[0].DATA_DESC_TP2;
//						_M_OBJ.PRE_TIME = data[0].PRE_TIME; //예보시간
//						_M_OBJ.SKY = data[0].SKY; //하늘상태
//						_M_OBJ.POP = data[0].POP; //강수/강우확률
//						_M_OBJ.T3H = data[0].T3H; //현재기온
//						_M_OBJ.TMX = data[0].TMX; //최고기온
//						_M_OBJ.TMN = data[0].TMN; //최저기온
//						_M_OBJ.TMINMAX = _M_OBJ.TMN + "˚C / " + _M_OBJ.TMX + "˚C";
//						if(_M_OBJ.DATA_DESC == '' || _M_OBJ.DATA_DESC == null) _M_OBJ.DATA_DESC = '';
//
//						if(_M_OBJ.PRE_TIME == '' || _M_OBJ.PRE_TIME == null){
//							_M_OBJ.PRE_TIME = '';
//						}else{
//							var temp = _M_OBJ.PRE_TIME.substring(0, 4);
//							    temp += "-" + _M_OBJ.PRE_TIME.substring(4, 6);
//							    temp += "-" + _M_OBJ.PRE_TIME.substring(6, 8);
//							    temp += " " + _M_OBJ.PRE_TIME.substring(8, 10) + "시 예보";
//	 						_M_OBJ.PRE_TIME = temp;
//						}
//						if(_M_OBJ.SKY == '' || _M_OBJ.SKY == null) _M_OBJ.SKY = '';
//						if(_M_OBJ.POP == '' || _M_OBJ.POP == null){
//							_M_OBJ.POP = '';
//						}else{
//							_M_OBJ.POP = _M_OBJ.POP + "%";
//						}
//						if(_M_OBJ.T3H == '' || _M_OBJ.T3H == null){
//							_M_OBJ.T3H = '';
//						}else{
//							_M_OBJ.T3H = _M_OBJ.T3H + "˚C";
//						}
//						if(_M_OBJ.TMX == '' || _M_OBJ.TMX == null) _M_OBJ.TMINMAX = '';
//						if(_M_OBJ.TMN == '' || _M_OBJ.TMN == null) _M_OBJ.TMINMAX = '';
//					}
//				}
//			}else if(L_CD == 'SF3'){//보호구역
//				type = 'TP3';
//				_M_OBJ.START_YMD = data[0].START_YMD_TP3;
//				if (_M_OBJ.START_YMD != '' && _M_OBJ.START_YMD != null)
//					_M_OBJ.START_YMD = _M_OBJ.START_YMD.substr(0,4)+'-'+_M_OBJ.START_YMD.substr(4,2)+'-'+_M_OBJ.START_YMD.substr(6,2);
//				else _M_OBJ.START_YMD = '';
//
//				_M_OBJ.START_H24 = data[0].START_H24_TP3;
//				if(_M_OBJ.START_H24 != '' && _M_OBJ.START_H24 != null) _M_OBJ.START_H24 = _M_OBJ.START_H24 + '시';
//				else _M_OBJ.START_H24 = '';
//
//				_M_OBJ.UPDATE_YMD = data[0].UPDATE_YMD_TP3;
//				if (_M_OBJ.UPDATE_YMD != '' && _M_OBJ.UPDATE_YMD != null)
//					_M_OBJ.UPDATE_YMD = _M_OBJ.UPDATE_YMD.substr(0,4)+'-'+_M_OBJ.UPDATE_YMD.substr(4,2)+'-'+_M_OBJ.UPDATE_YMD.substr(6,2);
//				else _M_OBJ.UPDATE_YMD = '';
//
//				_M_OBJ.UPDATE_H24 = data[0].UPDATE_H24_TP3;
//				if(_M_OBJ.UPDATE_H24 != '' && _M_OBJ.UPDATE_H24 != null) _M_OBJ.UPDATE_H24 = _M_OBJ.UPDATE_H24 + '시';
//				else _M_OBJ.UPDATE_H24 = '';
//
//				_M_OBJ.END_YMD = data[0].END_YMD_TP3;
//				if (_M_OBJ.END_YMD != '' && _M_OBJ.END_YMD != null)
//					_M_OBJ.END_YMD = _M_OBJ.END_YMD.substr(0,4)+'-'+_M_OBJ.END_YMD.substr(4,2)+'-'+_M_OBJ.END_YMD.substr(6,2);
//				else
//					_M_OBJ.END_YMD = '';
//
//				_M_OBJ.END_H24 = data[0].END_H24_TP3;
//				if(_M_OBJ.END_H24 != '' && _M_OBJ.END_H24 != null) _M_OBJ.END_H24 = _M_OBJ.END_H24 + '시';
//				else _M_OBJ.END_H24 = '';
//
//				_M_OBJ.DATA_DESC = data[0].DATA_DESC_TP3;
//				if(_M_OBJ.DATA_DESC == '' || _M_OBJ.DATA_DESC == null) _M_OBJ.DATA_DESC = '';
//
//			}else if(L_CD == 'SF4'){
//				type = 'TP4';
//				_M_OBJ.START_YMD = data[0].START_YMD_TP4;
//				if (_M_OBJ.START_YMD != '' && _M_OBJ.START_YMD != null)
//					_M_OBJ.START_YMD = _M_OBJ.START_YMD.substr(0,4)+'-'+_M_OBJ.START_YMD.substr(4,2)+'-'+_M_OBJ.START_YMD.substr(6,2);
//				else _M_OBJ.START_YMD = '';
//
//				_M_OBJ.START_H24 = data[0].START_H24_TP4;
//				if(_M_OBJ.START_H24 != '' && _M_OBJ.START_H24 != null) _M_OBJ.START_H24 = _M_OBJ.START_H24 + '시';
//				else _M_OBJ.START_H24 = '';
//
//				_M_OBJ.UPDATE_YMD = data[0].UPDATE_YMD_TP4;
//				if (_M_OBJ.UPDATE_YMD != '' && _M_OBJ.UPDATE_YMD != null)
//					_M_OBJ.UPDATE_YMD = _M_OBJ.UPDATE_YMD.substr(0,4)+'-'+_M_OBJ.UPDATE_YMD.substr(4,2)+'-'+_M_OBJ.UPDATE_YMD.substr(6,2);
//				else _M_OBJ.UPDATE_YMD = '';
//
//				_M_OBJ.UPDATE_H24 = data[0].UPDATE_H24_TP4;
//				if(_M_OBJ.UPDATE_H24 != '' && _M_OBJ.UPDATE_H24 != null) _M_OBJ.UPDATE_H24 = _M_OBJ.UPDATE_H24 + '시';
//				else _M_OBJ.UPDATE_H24 = '';
//
//				_M_OBJ.END_YMD = data[0].END_YMD_TP4;
//				if (_M_OBJ.END_YMD != '' && _M_OBJ.END_YMD != null)
//					_M_OBJ.END_YMD = _M_OBJ.END_YMD.substr(0,4)+'-'+_M_OBJ.END_YMD.substr(4,2)+'-'+_M_OBJ.END_YMD.substr(6,2);
//				else _M_OBJ.END_YMD = '';
//
//				_M_OBJ.END_H24 = data[0].END_H24_TP4;
//				if(_M_OBJ.END_H24 != '' && _M_OBJ.END_H24 != null) _M_OBJ.END_H24 = _M_OBJ.END_H24 + '시';
//				else _M_OBJ.END_H24 = '';
//
//			}else if(L_CD == 'SF5'){//교통규제
//				type = 'TP5';
//				_M_OBJ.FROM_LINK_ID = data[0].FROM_LINK_ID_TP5;
//				if(_M_OBJ.FROM_LINK_ID == '' || _M_OBJ.FROM_LINK_ID == null) _M_OBJ.FROM_LINK_ID = '';
//
//				_M_OBJ.TO_LINK_ID = data[0].TO_LINK_ID_TP5;
//				if(_M_OBJ.TO_LINK_ID == '' || _M_OBJ.TO_LINK_ID == null) _M_OBJ.TO_LINK_ID = '';
//
//				_M_OBJ.NODE_ID = data[0].NODE_ID_TP5;
//				if(_M_OBJ.NODE_ID == '' || _M_OBJ.NODE_ID ==  null) _M_OBJ.NODE_ID = '';
//
//				_M_OBJ.LIMIT_DAY_TYPE = data[0].LIMIT_DAY_TYPE_TP5;
//				if(_M_OBJ.LIMIT_DAY_TYPE == 111){
//					_M_OBJ.LIMIT_DAY_TYPE = '전체';
//				}else if(_M_OBJ.LIMIT_DAY_TYPE == 100){
//					_M_OBJ.LIMIT_DAY_TYPE = '공휴일전체';
//				}else if(_M_OBJ.LIMIT_DAY_TYPE == 001){
//					_M_OBJ.LIMIT_DAY_TYPE = '평일';
//				}else if(_M_OBJ.LIMIT_DAY_TYPE == 010){
//					_M_OBJ.LIMIT_DAY_TYPE = '공휴일';
//				}
//				else _M_OBJ.LIMIT_DAY_TYPE = '';
//
//				_M_OBJ.LIMIT_TIME_TYPE = data[0].LIMIT_TIME_TYPE_TP5;
//				if(_M_OBJ.LIMIT_TIME_TYPE == 11){
//					_M_OBJ.LIMIT_TIME_TYPE = '계속';
//				}else if(_M_OBJ.LIMIT_TIME_TYPE == 10){
//					_M_OBJ.LIMIT_TIME_TYPE = '전일제';
//				}else if(_M_OBJ.LIMIT_TIME_TYPE == 01){
//					_M_OBJ.LIMIT_TIME_TYPE = '시간제';
//				}
//				else _M_OBJ.LIMIT_TIME_TYPE = '';
//
//				_M_OBJ.LIMIT_CAR_TYPE 	= data[0].LIMIT_CAR_TYPE_TP5;
//				if(_M_OBJ.LIMIT_CAR_TYPE == 111){
//					_M_OBJ.LIMIT_CAR_TYPE = '모두차단';
//				}else if(_M_OBJ.LIMIT_CAR_TYPE == 001){
//					_M_OBJ.LIMIT_CAR_TYPE = '승용차단';
//				}else if(_M_OBJ.LIMIT_CAR_TYPE == 010){
//					_M_OBJ.LIMIT_CAR_TYPE = '이륜차단';
//				}else if(_M_OBJ.LIMIT_CAR_TYPE == 100){
//					_M_OBJ.LIMIT_CAR_TYPE = '대형차단';
//				}
//				else _M_OBJ.LIMIT_CAR_TYPE = '';
//
//				_M_OBJ.LIMIT_START_YMD = data[0].LIMIT_START_YMD_TP5;
//				if (_M_OBJ.LIMIT_START_YMD != '' && _M_OBJ.LIMIT_START_YMD != null)
//					_M_OBJ.LIMIT_START_YMD = _M_OBJ.LIMIT_START_YMD.substr(0,4)+'-'+_M_OBJ.LIMIT_START_YMD.substr(4,2)+'-'+_M_OBJ.LIMIT_START_YMD.substr(6,2);
//				else _M_OBJ.LIMIT_START_YMD = '';
//
//				_M_OBJ.LIMIT_START_H24 = data[0].LIMIT_START_H24_TP5;
//				if(_M_OBJ.LIMIT_START_H24 != '' && _M_OBJ.LIMIT_START_H24 != null) _M_OBJ.LIMIT_START_H24 = _M_OBJ.LIMIT_START_H24 + '시';
//				else _M_OBJ.LIMIT_START_H24 = '';
//
//				_M_OBJ.LIMIT_END_YMD = data[0].LIMIT_END_YMD_TP5;
//				if (_M_OBJ.LIMIT_END_YMD != '' && _M_OBJ.LIMIT_END_YMD != null)
//					_M_OBJ.LIMIT_END_YMD = _M_OBJ.LIMIT_END_YMD.substr(0,4)+'-'+_M_OBJ.LIMIT_END_YMD.substr(4,2)+'-'+_M_OBJ.LIMIT_END_YMD.substr(6,2);
//				else _M_OBJ.LIMIT_END_YMD = '';
//
//				_M_OBJ.LIMIT_END_H24 = data[0].LIMIT_END_H24_TP5;
//				if(_M_OBJ.LIMIT_END_H24 != '' && _M_OBJ.LIMIT_END_H24 != null) _M_OBJ.LIMIT_END_H24 = _M_OBJ.LIMIT_END_H24 + '시';
//				else _M_OBJ.LIMIT_END_H24 = '';
//
//				_M_OBJ.POI_ROTATE_DEGREE = data[0].POI_ROTATE_DEGREE_TP5;
//				if(_M_OBJ.POI_ROTATE_DEGREE != '' && _M_OBJ.POI_ROTATE_DEGREE != null) _M_OBJ.POI_ROTATE_DEGREE = _M_OBJ.POI_ROTATE_DEGREE + '도';
//				else _M_OBJ.POI_ROTATE_DEGREE = '';
//
//				poi_rotate = data[0].POI_ROTATE_DEGREE_TP5;
//
//			}else if(L_CD == 'SF6'){
//				if(M_CD == 'SF600'){
//					type = 'TP6';
//					_M_OBJ.START_YMD = data[0].START_YMD_TP6;
//					if (_M_OBJ.START_YMD != '' && _M_OBJ.START_YMD != null)
//						_M_OBJ.START_YMD = _M_OBJ.START_YMD.substr(0,4)+'-'+_M_OBJ.START_YMD.substr(4,2)+'-'+_M_OBJ.START_YMD.substr(6,2);
//					else _M_OBJ.START_YMD = '';
//
//					_M_OBJ.START_H24 = data[0].START_H24_TP6;
//					if(_M_OBJ.START_H24 != '' && _M_OBJ.START_H24 != null) _M_OBJ.START_H24 = _M_OBJ.START_H24 + '시';
//					else _M_OBJ.START_H24 = '';
//
//					_M_OBJ.UPDATE_YMD = data[0].UPDATE_YMD_TP6;
//					if (_M_OBJ.UPDATE_YMD != '' && _M_OBJ.UPDATE_YMD != null)
//						_M_OBJ.UPDATE_YMD = _M_OBJ.UPDATE_YMD.substr(0,4)+'-'+_M_OBJ.UPDATE_YMD.substr(4,2)+'-'+_M_OBJ.UPDATE_YMD.substr(6,2);
//					else _M_OBJ.UPDATE_YMD = '';
//
//					_M_OBJ.UPDATE_H24 = data[0].UPDATE_H24_TP6;
//					if(_M_OBJ.UPDATE_H24 != '' && _M_OBJ.UPDATE_H24 != null) _M_OBJ.UPDATE_H24 = _M_OBJ.UPDATE_H24 + '시';
//					else _M_OBJ.UPDATE_H24 = '';
//
//					_M_OBJ.END_YMD = data[0].END_YMD_TP6;
//					if (_M_OBJ.END_YMD != '' && _M_OBJ.END_YMD != null)
//						_M_OBJ.END_YMD = _M_OBJ.END_YMD.substr(0,4)+'-'+_M_OBJ.END_YMD.substr(4,2)+'-'+_M_OBJ.END_YMD.substr(6,2);
//					else _M_OBJ.END_YMD = '';
//
//					_M_OBJ.END_H24 = data[0].END_H24_TP6;
//					if(_M_OBJ.END_H24 != '' && _M_OBJ.END_H24 != null) _M_OBJ.END_H24 = _M_OBJ.END_H24 + '시';
//					else _M_OBJ.END_H24 = '';
//
//					_M_OBJ.MGT_NUMBER  = data[0].MGT_NUMBER_TP6;
//					if(_M_OBJ.MGT_NUMBER == '' || _M_OBJ.MGT_NUMBER == null) _M_OBJ.MGT_NUMBER = '';
//
//					_M_OBJ.INSTALL_YMD = data[0].INSTALL_YMD_TP6;
//					if (_M_OBJ.INSTALL_YMD != '' && _M_OBJ.INSTALL_YMD != null)
//						_M_OBJ.INSTALL_YMD = _M_OBJ.INSTALL_YMD.substr(0,4)+'-'+_M_OBJ.INSTALL_YMD.substr(4,2)+'-'+_M_OBJ.INSTALL_YMD.substr(6,2);
//					else _M_OBJ.INSTALL_YMD = '';
//
//					_M_OBJ.SIGNAL_TYPE = data[0].SIGNAL_TYPE_TP6;
//					if(_M_OBJ.SIGNAL_TYPE == 1){
//						_M_OBJ.SIGNAL_TYPE = '차량';
//					}else if(_M_OBJ.SIGNAL_TYPE == 2){
//						_M_OBJ.SIGNAL_TYPE = '보행';
//					}else if(_M_OBJ.SIGNAL_TYPE == 3){
//						_M_OBJ.SIGNAL_TYPE = '경보';
//					}else if(_M_OBJ.SIGNAL_TYPE == 4){
//						_M_OBJ.SIGNAL_TYPE = '음향';
//					}
//					else _M_OBJ.SIGNAL_TYPE = '';
//
//					_M_OBJ.CONTROL_NUMBER = data[0].CONTROL_NUMBER_TP6;
//					if(_M_OBJ.CONTROL_NUMBER == '' || _M_OBJ.CONTROL_NUMBER == null) _M_OBJ.CONTROL_NUMBER = '';
//				}else if(M_CD == 'SF601'){
//					type = 'TP7';
//					_M_OBJ.MGT_NUMBER = data[0].MGT_NUMBER_TP7;
//					if(_M_OBJ.MGT_NUMBER == '' || _M_OBJ.MGT_NUMBER == null) _M_OBJ.MGT_NUMBER = '';
//
//					_M_OBJ.INSTALL_YMD = data[0].INSTALL_YMD_TP7;
//					if (_M_OBJ.INSTALL_YMD != '' && _M_OBJ.INSTALL_YMD != null)
//						_M_OBJ.INSTALL_YMD = _M_OBJ.INSTALL_YMD.substr(0,4)+'-'+_M_OBJ.INSTALL_YMD.substr(4,2)+'-'+_M_OBJ.INSTALL_YMD.substr(6,2);
//					else _M_OBJ.INSTALL_YMD = '';
//
//					_M_OBJ.COMPANY = data[0].COMPANY_TP7;
//					if(_M_OBJ.COMPANY == '' || _M_OBJ.COMPANY == null) _M_OBJ.COMPANY = '';
//
//					_M_OBJ.VMS_TYPE = data[0].VMS_TYPE_TP7;
//					if(_M_OBJ.VMS_TYPE == 1){
//						_M_OBJ.VMS_TYPE = '도형식';
//					}else if(_M_OBJ.VMS_TYPE == 2){
//						_M_OBJ.VMS_TYPE = '문자식';
//					}
//					else _M_OBJ.VMS_TYPE = '';
//
//					_M_OBJ.INSTALL_LOC = data[0].INSTALL_LOC_TP7;
//					if(_M_OBJ.INSTALL_LOC == '' || _M_OBJ.INSTALL_LOC == null) _M_OBJ.INSTALL_LOC = '';
//
//				}else if(M_CD == 'SF602'){
//					type = 'TP8';
//					_M_OBJ.CONTROL_NUMBER = data[0].CONTROL_NUMBER_TP8;
//					if(_M_OBJ.CONTROL_NUMBER == '' || _M_OBJ.CONTROL_NUMBER == null) _M_OBJ.CONTROL_NUMBER = '';
//
//					_M_OBJ.COMPANY = data[0].COMPANY_TP8;
//					if(_M_OBJ.COMPANY == '' || _M_OBJ.COMPANY == null) _M_OBJ.COMPANY = '';
//
//					_M_OBJ.CAMERA_FUNC_TYPE = data[0].CAMERA_FUNC_TYPE_TP8;
//					if(_M_OBJ.CAMERA_FUNC_TYPE == 1){
//						_M_OBJ.CAMERA_FUNC_TYPE = '과속';
//					}else if(_M_OBJ.CAMERA_FUNC_TYPE == 2){
//						_M_OBJ.CAMERA_FUNC_TYPE = '구간';
//					}else if(_M_OBJ.CAMERA_FUNC_TYPE == 3){
//						_M_OBJ.CAMERA_FUNC_TYPE = '다기능';
//					}
//					else _M_OBJ.CAMERA_FUNC_TYPE = '';
//
//					_M_OBJ.CAMERA_FUNC_DESC = data[0].CAMERA_FUNC_DESC_TP8;
//					if(_M_OBJ.CAMERA_FUNC_DESC == '' || _M_OBJ.CAMERA_FUNC_DESC == null) _M_OBJ.CAMERA_FUNC_DESC = '';
//
//					_M_OBJ.INSTALL_YMD = data[0].INSTALL_YMD_TP8;
//					if (_M_OBJ.INSTALL_YMD != '' && _M_OBJ.INSTALL_YMD != null)
//						_M_OBJ.INSTALL_YMD = _M_OBJ.INSTALL_YMD.substr(0,4)+'-'+_M_OBJ.INSTALL_YMD.substr(4,2)+'-'+_M_OBJ.INSTALL_YMD.substr(6,2);
//					else _M_OBJ.INSTALL_YMD = '';
//
//					_M_OBJ.OPER_YMD = data[0].OPER_YMD_TP8;
//					if (_M_OBJ.OPER_YMD != '' && _M_OBJ.OPER_YMD != null)
//						_M_OBJ.OPER_YMD = _M_OBJ.OPER_YMD.substr(0,4)+'-'+_M_OBJ.OPER_YMD.substr(4,2)+'-'+_M_OBJ.OPER_YMD.substr(6,2);
//					else _M_OBJ.OPER_YMD = '';
//
//					_M_OBJ.NETWORK_TYPE = data[0].NETWORK_TYPE_TP8;
//					if(_M_OBJ.NETWORK_TYPE == 1){
//						_M_OBJ.NETWORK_TYPE = '전용회선';
//					}else if(_M_OBJ.NETWORK_TYPE == 2){
//						_M_OBJ.NETWORK_TYPE = '무선통신';
//					}
//					else _M_OBJ.NETWORK_TYPE = '';
//
//					_M_OBJ.NETWORK_DESC = data[0].NETWORK_DESC_TP8;
//					if(_M_OBJ.NETWORK_DESC == '' || _M_OBJ.NETWORK_DESC == null) _M_OBJ.NETWORK_DESC = '';
//
//					_M_OBJ.INSTALL_ADDRESS = data[0].INSTALL_ADDRESS_TP8;
//					if(_M_OBJ.INSTALL_ADDRESS == '' || _M_OBJ.INSTALL_ADDRESS == null) _M_OBJ.INSTALL_ADDRESS ='';
//				}
//			}
//
//			_M_OBJ.type = type;
//
//			var poi_icon = '';
//			if(poi_rotate != ''){
//				poi_icon = IMG.substr(0,10) + poi_rotate;
//			}else{
//				poi_icon = IMG;
//			}
//			_GET_ICON = '/contents/images/poi/' + poi_icon.trim() + '.png';
//
//			if(d == 'POINT'){
//				var size = new UTISMap.Size(18, 18); // 마커 아이콘 크기
//				var offset = new UTISMap.Pixel(-(size.w / 2), -size.h);
//
//				var icon = new UTISMap.Icon(_GET_ICON, size, offset);
//
//				var ss = LOCATION_DATA.substring(6,LOCATION_DATA.length-2);
//				var sp = ss.split(' ');
//
//				var wgsLonLat = new UTISMap.LonLat(sp[0],sp[1]);
//				var lonlat = Mando.wgs84ToMandoMap(wgsLonLat.lon, wgsLonLat.lat);
//
//				var markerObj = new UTISMap.Marker(lonlat, icon);
//
//				_VIEW_POPUP.hidePopup(0);
//				var str = makeRoadTooltip(_M_OBJ);
//				_VIEW_POPUP.init(map, 0, 0, new UTISMap.Size(0, 0));
//				_VIEW_POPUP.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), str);
//				var height = $('#tooltip2').height()+ 14 + 19;
//				_VIEW_POPUP.destroy();
//				_VIEW_POPUP.init(map,450, height, new UTISMap.Size(-(450/2), -(height+24)));
//				_VIEW_POPUP.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), str);
//
//				map.setCenter(new UTISMap.LonLat(lonlat.lon, lonlat.lat));
//				map.addLayer(_VIEW_MARKERS_LAYER);
//				_VIEW_MARKERS_LAYER.addMarker(markerObj);
//			}
//			else if(d == 'POLYGON'){
//				var polygon_list = [];
//				var size = new UTISMap.Size(18, 18); // 마커 아이콘 크기
//				var offset = new UTISMap.Pixel(-(size.w / 2), -size.h);
//
//				var icon = new UTISMap.Icon(_GET_ICON, size, offset);
//
//				var ss = LOCATION_DATA.substring(9,LOCATION_DATA.length-2);
//				var sp = ss.split(',');
//				for (var i = 0; i < sp.length; i++){
//					var temp = sp[i].split(' ');
//					var plonlat = Mando.wgs84ToMandoMap(temp[0], temp[1]);
//					polygon_list.push( new UTISMap.Geometry.Point(plonlat.lon, plonlat.lat) );
//				}
//
//				var PolygonCollection = new UTISMap.Geometry.LinearRing(polygon_list);
//				var mLineFeature = new UTISMap.Feature.Vector(PolygonCollection);
//				var centerXY = mLineFeature.geometry.getCentroid();
//				//_VIEW_VECTOR_LAYER.addFeatures([mLineFeature]);
//
//				var lonlat = new Object();
//				if(centerXY != '' && centerXY != null){
//					lonlat.lon = centerXY.x;
//					lonlat.lat = centerXY.y;
//				}
//
//				var polygonObj = new UTISMap.Marker(lonlat, icon);
//
//				_VIEW_POPUP.hidePopup(0);
//
//				var str = makeRoadTooltip(_M_OBJ);
//
//				_VIEW_POPUP.init(map, 0, 0, new UTISMap.Size(0, 0));
//				_VIEW_POPUP.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), str);
//				var height = $('#tooltip2').height()+ 14 + 19;
//				_VIEW_POPUP.destroy();
//				_VIEW_POPUP.init(map,450, height, new UTISMap.Size(-(450/2), -(height+24)));
//				_VIEW_POPUP.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), str);
//
//				map.setCenter(new UTISMap.LonLat(lonlat.lon, lonlat.lat));
//				map.addLayer(_VIEW_MARKERS_LAYER);
//				_VIEW_MARKERS_LAYER.addMarker(polygonObj);
//			}else if(d == 'LINE'){
//				var line_list = [];
//				var size = new UTISMap.Size(18, 18); // 마커 아이콘 크기
//				var offset = new UTISMap.Pixel(-(size.w / 2), -size.h);
//
//				var icon = new UTISMap.Icon(_GET_ICON, size, offset);
//
//				var ss = LOCATION_DATA.substring(6,LOCATION_DATA.length-2);
//				var sp = ss.split(',');
//				for (var i = 0; i < sp.length; i++ ){
//					var temp = sp[i].split(' ');
//					var plonlat = Mando.wgs84ToMandoMap(temp[0], temp[1]);
//					line_list.push( new UTISMap.Geometry.Point(plonlat.lon, plonlat.lat) );
//				}
//
//				var LineCollection = new UTISMap.Geometry.LineString(line_list);
//				var lineFeature = new UTISMap.Feature.Vector(LineCollection, null, sketchSymbolizers["Line"]);
//				var centerXY = lineFeature.geometry.getCentroid();
//				//_VIEW_VECTOR_LAYER.addFeatures([lineFeature]);
//				var lonlat = new Object();
//				if(centerXY != '' && centerXY != null){
//					lonlat.lon = centerXY.x;
//					lonlat.lat = centerXY.y;
//				}
//				var lineObj = new UTISMap.Marker(lonlat, icon);
//				_VIEW_POPUP.hidePopup(0);
//				var str = makeRoadTooltip(_M_OBJ);
//				_VIEW_POPUP.init(map, 0, 0, new UTISMap.Size(0, 0));
//				_VIEW_POPUP.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), str);
//				var height = $('#tooltip2').height()+ 14 + 19;
//				_VIEW_POPUP.destroy();
//				_VIEW_POPUP.init(map,450, height, new UTISMap.Size(-(450/2), -(height+24)));
//				_VIEW_POPUP.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), str);
//				map.setCenter(new UTISMap.LonLat(lonlat.lon, lonlat.lat));
//				map.addLayer(_VIEW_MARKERS_LAYER);
//				_VIEW_MARKERS_LAYER.addMarker(lineObj);
//			}
//		}
//	});
//}
//function RotaDanger() {
//	this.dangerList = [];
//	this.layer;
//	this.minlevel = 6;
//	this.maxlevel = 8;
//	this.setLayer = function(a) {
//		this.layer = a;
//	};
//	this.popupDan = function(c, e, d) {
//		mapViewSafeToolTipGo(c, e, d);
//	};
//}
////교통안전데이터
//function mapViewSafeToolTipGo(c, e, d){
//	var SAFEDATA_ID;
//	var L_CD;
//	var M_CD;
//	var L_CD_NM;
//	var M_CD_NM;
//	var LOCATION_DATA;
//	var ADDRESS_JIBUN;
//	var ADDRESS_NEW;
//	var IMG;
//	var VIEW_YN;
//	var _VIEW_MARKERS_LAYER 	= new UTISMap.Layer.Markers("ViewMarkers");
//	var _VIEW_VECTOR_LAYER		= new UTISMap.Layer.Vector('ViewVectorLayer');
//
//	$.ajax({
//		type: "POST"
//		,url: '/tsdms/mapViewSafeToolTip.do'
//		,dataType: "json"
//		,data: {SAFEDATA_ID:c}
//		,success: function tooltip(data) {
//
//			SAFEDATA_ID = data[0].SAFEDATA_ID;
//			L_CD = data[0].L_CD;
//			M_CD = data[0].M_CD;
//			L_CD_NM = data[0].L_CD_NM;
//			M_CD_NM = data[0].M_CD_NM;
//			ADDRESS_JIBUN = data[0].ADDRESS_JIBUN;
//			ADDRESS_NEW = data[0].ADDRESS_NEW;
//			LOCATION_DATA = data[0].LOCATION_DATA;
//			IMG = data[0].IMG;
//			VIEW_YN = data[0].VIEW_YN;
//			var poi_rotate = '';
//			var location = LOCATION_DATA.split("(");
//			location = location[0];		// 좌표 타입(폴리건이냐, 라인이냐, 포인트냐)
//			var type = '';
//			var _M_OBJ = new Object();
//			_M_OBJ.SAFEDATA_ID = SAFEDATA_ID;
//			_M_OBJ.L_CD = L_CD;
//			_M_OBJ.M_CD = M_CD;
//			_M_OBJ.L_CD_NM = L_CD_NM;
//			_M_OBJ.M_CD_NM = M_CD_NM;
//			_M_OBJ.VIEW_YN = VIEW_YN;
//
//			_M_OBJ.ADDRESS_JIBUN = ADDRESS_JIBUN;
//			if(_M_OBJ.ADDRESS_JIBUN == '' || _M_OBJ.ADDRESS_JIBUN == null)
//				_M_OBJ.ADDRESS_JIBUN = '';
//
//			_M_OBJ.ADDRESS_NEW = ADDRESS_NEW;
//			if(_M_OBJ.ADDRESS_NEW == '' || _M_OBJ.ADDRESS_NEW == null)
//				_M_OBJ.ADDRESS_NEW = '';
//			_M_OBJ.LOCATION_DATA = LOCATION_DATA;
//			_M_OBJ.IMG = IMG;
//
//			if(L_CD == 'SF1'){
//				type = 'TASS';
//
//				_M_OBJ.OCCUR_YMD = data[0].OCCUR_YMD;
//				if(_M_OBJ.OCCUR_YMD != '' && _M_OBJ.OCCUR_YMD != null)
//					_M_OBJ.OCCUR_YMD = _M_OBJ.OCCUR_YMD.substr(0,4)+'-'+_M_OBJ.OCCUR_YMD.substr(4,2)+'-'+_M_OBJ.OCCUR_YMD.substr(6,2);
//				else _M_OBJ.OCCUR_YMD = '';
//
//				_M_OBJ.OCCUR_H24 = '';		//TAAS 시간 없음
//
//				_M_OBJ.DEATH_CNT = data[0].DEATH_CNT;
//				if (_M_OBJ.DEATH_CNT == '' || _M_OBJ.DEATH_CNT == null) _M_OBJ.DEATH_CNT = '';
//
//				_M_OBJ.SERIOUS_CNT = data[0].SERIOUS_CNT;
//				if(_M_OBJ.SERIOUS_CNT == '' || _M_OBJ.SERIOUS_CNT == null) _M_OBJ.SERIOUS_CNT = '';
//
//				_M_OBJ.DATA_DESC = M_CD_NM;		// 검색 리스트 클릭시 이동후 툴팁(사고내용)
//
//				_M_OBJ.MINIOR_CNT = data[0].MINIOR_CNT;
//				if(_M_OBJ.MINIOR_CNT == '' || _M_OBJ.MINIOR_CNT == null) _M_OBJ.MINIOR_CNT = '';
//
//				_M_OBJ.REPORT_CNT = data[0].REPORT_CNT;
//				if(_M_OBJ.REPORT_CNT == '' || _M_OBJ.REPORT_CNT == null) _M_OBJ.REPORT_CNT = '';
//
//			}else if(L_CD == 'SF2') {
//				if(M_CD == 'SF200' || M_CD == 'SF201' || M_CD == 'SF202') {
//					type = 'TP1';
//
//					_M_OBJ.OCCUR_YMD = data[0].OCCUR_YMD_TP1;
//					if(_M_OBJ.OCCUR_YMD != '' && _M_OBJ.OCCUR_YMD != null)
//						_M_OBJ.OCCUR_YMD = _M_OBJ.OCCUR_YMD.substr(0,4)+'-'+_M_OBJ.OCCUR_YMD.substr(4,2)+'-'+_M_OBJ.OCCUR_YMD.substr(6,2);
//					else _M_OBJ.OCCUR_YMD = '';
//
//					_M_OBJ.OCCUR_H24 = data[0].OCCUR_H24_TP1;
//					if(_M_OBJ.OCCUR_H24 != '' && _M_OBJ.OCCUR_H24 != null) _M_OBJ.OCCUR_H24 = _M_OBJ.OCCUR_H24 + '시';
//					else _M_OBJ.OCCUR_H24 = '';
//
//					_M_OBJ.DATA_DESC = data[0].DATA_DESC_TP1;
//					if(_M_OBJ.DATA_DESC == '' || _M_OBJ.DATA_DESC == null) _M_OBJ.DATA_DESC = '';
//
//					_M_OBJ.DEATH_CNT = data[0].DEATH_CNT_TP1;
//					if(_M_OBJ.DEATH_CNT == '' || _M_OBJ.DEATH_CNT == null) _M_OBJ.DEATH_CNT = '';
//
//					_M_OBJ.SERIOUS_CNT = data[0].SERIOUS_CNT_TP1;
//					if(_M_OBJ.SERIOUS_CNT == '' || _M_OBJ.SERIOUS_CNT == null) _M_OBJ.SERIOUS_CNT = '';
//
//					_M_OBJ.MINIOR_CNT = data[0].MINIOR_CNT_TP1;
//					if(_M_OBJ.MINIOR_CNT == '' || _M_OBJ.MINIOR_CNT == null) _M_OBJ.MINIOR_CNT = '';
//
//					_M_OBJ.REPORT_CNT = data[0].REPORT_CNT_TP1;
//					if(_M_OBJ.REPORT_CNT == '' || _M_OBJ.REPORT_CNT == null) _M_OBJ.REPORT_CNT = '';
//
//				}
//				else if(M_CD == 'SF203'){
//					type = 'TP2';
//					_M_OBJ.DATA_DESC = data[0].DATA_DESC_TP2;
//					if(_M_OBJ.DATA_DESC == '' || _M_OBJ.DATA_DESC == null) _M_OBJ.DATA_DESC = '';
//				}
//			}else if(L_CD == 'SF3'){
//				type = 'TP3';
//				_M_OBJ.START_YMD = data[0].START_YMD_TP3;
//				if (_M_OBJ.START_YMD != '' && _M_OBJ.START_YMD != null)
//					_M_OBJ.START_YMD = _M_OBJ.START_YMD.substr(0,4)+'-'+_M_OBJ.START_YMD.substr(4,2)+'-'+_M_OBJ.START_YMD.substr(6,2);
//				else _M_OBJ.START_YMD = '';
//
//				_M_OBJ.START_H24 = data[0].START_H24_TP3;
//				if(_M_OBJ.START_H24 != '' && _M_OBJ.START_H24 != null) _M_OBJ.START_H24 = _M_OBJ.START_H24 + '시';
//				else _M_OBJ.START_H24 = '';
//
//				_M_OBJ.UPDATE_YMD = data[0].UPDATE_YMD_TP3;
//				if (_M_OBJ.UPDATE_YMD != '' && _M_OBJ.UPDATE_YMD != null)
//					_M_OBJ.UPDATE_YMD = _M_OBJ.UPDATE_YMD.substr(0,4)+'-'+_M_OBJ.UPDATE_YMD.substr(4,2)+'-'+_M_OBJ.UPDATE_YMD.substr(6,2);
//				else _M_OBJ.UPDATE_YMD = '';
//
//				_M_OBJ.UPDATE_H24 = data[0].UPDATE_H24_TP3;
//				if(_M_OBJ.UPDATE_H24 != '' && _M_OBJ.UPDATE_H24 != null) _M_OBJ.UPDATE_H24 = _M_OBJ.UPDATE_H24 + '시';
//				else _M_OBJ.UPDATE_H24 = '';
//
//				_M_OBJ.END_YMD = data[0].END_YMD_TP3;
//				if (_M_OBJ.END_YMD != '' && _M_OBJ.END_YMD != null)
//					_M_OBJ.END_YMD = _M_OBJ.END_YMD.substr(0,4)+'-'+_M_OBJ.END_YMD.substr(4,2)+'-'+_M_OBJ.END_YMD.substr(6,2);
//				else
//					_M_OBJ.END_YMD = '';
//
//				_M_OBJ.END_H24 = data[0].END_H24_TP3;
//				if(_M_OBJ.END_H24 != '' && _M_OBJ.END_H24 != null) _M_OBJ.END_H24 = _M_OBJ.END_H24 + '시';
//				else _M_OBJ.END_H24 = '';
//
//				_M_OBJ.DATA_DESC = data[0].DATA_DESC_TP3;
//				if(_M_OBJ.DATA_DESC == '' || _M_OBJ.DATA_DESC == null) _M_OBJ.DATA_DESC = '';
//
//				_M_OBJ.SPEED_LIMIT = data[0].SPEED_LIMIT;
//
//			}else if(L_CD == 'SF4'){
//				type = 'TP4';
//				_M_OBJ.START_YMD = data[0].START_YMD_TP4;
//				if (_M_OBJ.START_YMD != '' && _M_OBJ.START_YMD != null)
//					_M_OBJ.START_YMD = _M_OBJ.START_YMD.substr(0,4)+'-'+_M_OBJ.START_YMD.substr(4,2)+'-'+_M_OBJ.START_YMD.substr(6,2);
//				else _M_OBJ.START_YMD = '';
//
//				_M_OBJ.START_H24 = data[0].START_H24_TP4;
//				if(_M_OBJ.START_H24 != '' && _M_OBJ.START_H24 != null) _M_OBJ.START_H24 = _M_OBJ.START_H24 + '시';
//				else _M_OBJ.START_H24 = '';
//
//				_M_OBJ.UPDATE_YMD = data[0].UPDATE_YMD_TP4;
//				if (_M_OBJ.UPDATE_YMD != '' && _M_OBJ.UPDATE_YMD != null)
//					_M_OBJ.UPDATE_YMD = _M_OBJ.UPDATE_YMD.substr(0,4)+'-'+_M_OBJ.UPDATE_YMD.substr(4,2)+'-'+_M_OBJ.UPDATE_YMD.substr(6,2);
//				else _M_OBJ.UPDATE_YMD = '';
//
//				_M_OBJ.UPDATE_H24 = data[0].UPDATE_H24_TP4;
//				if(_M_OBJ.UPDATE_H24 != '' && _M_OBJ.UPDATE_H24 != null) _M_OBJ.UPDATE_H24 = _M_OBJ.UPDATE_H24 + '시';
//				else _M_OBJ.UPDATE_H24 = '';
//
//				_M_OBJ.END_YMD = data[0].END_YMD_TP4;
//				if (_M_OBJ.END_YMD != '' && _M_OBJ.END_YMD != null)
//					_M_OBJ.END_YMD = _M_OBJ.END_YMD.substr(0,4)+'-'+_M_OBJ.END_YMD.substr(4,2)+'-'+_M_OBJ.END_YMD.substr(6,2);
//				else _M_OBJ.END_YMD = '';
//
//				_M_OBJ.END_H24 = data[0].END_H24_TP4;
//				if(_M_OBJ.END_H24 != '' && _M_OBJ.END_H24 != null) _M_OBJ.END_H24 = _M_OBJ.END_H24 + '시';
//				else _M_OBJ.END_H24 = '';
//
//			}else if(L_CD == 'SF5'){
//				type = 'TP5';
//				_M_OBJ.FROM_LINK_ID = data[0].FROM_LINK_ID_TP5;
//				if(_M_OBJ.FROM_LINK_ID == '' || _M_OBJ.FROM_LINK_ID == null) _M_OBJ.FROM_LINK_ID = '';
//
//				_M_OBJ.TO_LINK_ID = data[0].TO_LINK_ID_TP5;
//				if(_M_OBJ.TO_LINK_ID == '' || _M_OBJ.TO_LINK_ID == null) _M_OBJ.TO_LINK_ID = '';
//
//				_M_OBJ.NODE_ID = data[0].NODE_ID_TP5;
//				if(_M_OBJ.NODE_ID == '' || _M_OBJ.NODE_ID ==  null) _M_OBJ.NODE_ID = '';
//
//				_M_OBJ.LIMIT_DAY_TYPE = data[0].LIMIT_DAY_TYPE_TP5;
//				if(_M_OBJ.LIMIT_DAY_TYPE == 111){
//					_M_OBJ.LIMIT_DAY_TYPE = '전체';
//				}else if(_M_OBJ.LIMIT_DAY_TYPE == 100){
//					_M_OBJ.LIMIT_DAY_TYPE = '공휴일전체';
//				}else if(_M_OBJ.LIMIT_DAY_TYPE == 001){
//					_M_OBJ.LIMIT_DAY_TYPE = '평일';
//				}else if(_M_OBJ.LIMIT_DAY_TYPE == 010){
//					_M_OBJ.LIMIT_DAY_TYPE = '공휴일';
//				}
//				else _M_OBJ.LIMIT_DAY_TYPE = '';
//
//				_M_OBJ.LIMIT_TIME_TYPE = data[0].LIMIT_TIME_TYPE_TP5;
//				if(_M_OBJ.LIMIT_TIME_TYPE == 11){
//					_M_OBJ.LIMIT_TIME_TYPE = '계속';
//				}else if(_M_OBJ.LIMIT_TIME_TYPE == 10){
//					_M_OBJ.LIMIT_TIME_TYPE = '전일제';
//				}else if(_M_OBJ.LIMIT_TIME_TYPE == 01){
//					_M_OBJ.LIMIT_TIME_TYPE = '시간제';
//				}
//				else _M_OBJ.LIMIT_TIME_TYPE = '';
//
//				_M_OBJ.LIMIT_CAR_TYPE 	= data[0].LIMIT_CAR_TYPE_TP5;
//				if(_M_OBJ.LIMIT_CAR_TYPE == 111){
//					_M_OBJ.LIMIT_CAR_TYPE = '모두차단';
//				}else if(_M_OBJ.LIMIT_CAR_TYPE == 001){
//					_M_OBJ.LIMIT_CAR_TYPE = '승용차단';
//				}else if(_M_OBJ.LIMIT_CAR_TYPE == 010){
//					_M_OBJ.LIMIT_CAR_TYPE = '이륜차단';
//				}else if(_M_OBJ.LIMIT_CAR_TYPE == 100){
//					_M_OBJ.LIMIT_CAR_TYPE = '대형차단';
//				}
//				else _M_OBJ.LIMIT_CAR_TYPE = '';
//
//				_M_OBJ.LIMIT_START_YMD = data[0].LIMIT_START_YMD_TP5;
//				if (_M_OBJ.LIMIT_START_YMD != '' && _M_OBJ.LIMIT_START_YMD != null)
//					_M_OBJ.LIMIT_START_YMD = _M_OBJ.LIMIT_START_YMD.substr(0,4)+'-'+_M_OBJ.LIMIT_START_YMD.substr(4,2)+'-'+_M_OBJ.LIMIT_START_YMD.substr(6,2);
//				else _M_OBJ.LIMIT_START_YMD = '';
//
//				_M_OBJ.LIMIT_START_H24 = data[0].LIMIT_START_H24_TP5;
//				if(_M_OBJ.LIMIT_START_H24 != '' && _M_OBJ.LIMIT_START_H24 != null) _M_OBJ.LIMIT_START_H24 = _M_OBJ.LIMIT_START_H24 + '시';
//				else _M_OBJ.LIMIT_START_H24 = '';
//
//				_M_OBJ.LIMIT_END_YMD = data[0].LIMIT_END_YMD_TP5;
//				if (_M_OBJ.LIMIT_END_YMD != '' && _M_OBJ.LIMIT_END_YMD != null)
//					_M_OBJ.LIMIT_END_YMD = _M_OBJ.LIMIT_END_YMD.substr(0,4)+'-'+_M_OBJ.LIMIT_END_YMD.substr(4,2)+'-'+_M_OBJ.LIMIT_END_YMD.substr(6,2);
//				else _M_OBJ.LIMIT_END_YMD = '';
//
//				_M_OBJ.LIMIT_END_H24 = data[0].LIMIT_END_H24_TP5;
//				if(_M_OBJ.LIMIT_END_H24 != '' && _M_OBJ.LIMIT_END_H24 != null) _M_OBJ.LIMIT_END_H24 = _M_OBJ.LIMIT_END_H24 + '시';
//				else _M_OBJ.LIMIT_END_H24 = '';
//
//				_M_OBJ.POI_ROTATE_DEGREE = data[0].POI_ROTATE_DEGREE_TP5;
//				if(_M_OBJ.POI_ROTATE_DEGREE != '' && _M_OBJ.POI_ROTATE_DEGREE != null) _M_OBJ.POI_ROTATE_DEGREE = _M_OBJ.POI_ROTATE_DEGREE + '도';
//				else _M_OBJ.POI_ROTATE_DEGREE = '';
//
//				poi_rotate = data[0].POI_ROTATE_DEGREE_TP5;
//
//			}else if(L_CD == 'SF6'){
//				if(M_CD == 'SF600'){
//					type = 'TP6';
//					_M_OBJ.START_YMD = data[0].START_YMD_TP6;
//					if (_M_OBJ.START_YMD != '' && _M_OBJ.START_YMD != null)
//						_M_OBJ.START_YMD = _M_OBJ.START_YMD.substr(0,4)+'-'+_M_OBJ.START_YMD.substr(4,2)+'-'+_M_OBJ.START_YMD.substr(6,2);
//					else _M_OBJ.START_YMD = '';
//
//					_M_OBJ.START_H24 = data[0].START_H24_TP6;
//					if(_M_OBJ.START_H24 != '' && _M_OBJ.START_H24 != null) _M_OBJ.START_H24 = _M_OBJ.START_H24 + '시';
//					else _M_OBJ.START_H24 = '';
//
//					_M_OBJ.UPDATE_YMD = data[0].UPDATE_YMD_TP6;
//					if (_M_OBJ.UPDATE_YMD != '' && _M_OBJ.UPDATE_YMD != null)
//						_M_OBJ.UPDATE_YMD = _M_OBJ.UPDATE_YMD.substr(0,4)+'-'+_M_OBJ.UPDATE_YMD.substr(4,2)+'-'+_M_OBJ.UPDATE_YMD.substr(6,2);
//					else _M_OBJ.UPDATE_YMD = '';
//
//					_M_OBJ.UPDATE_H24 = data[0].UPDATE_H24_TP6;
//					if(_M_OBJ.UPDATE_H24 != '' && _M_OBJ.UPDATE_H24 != null) _M_OBJ.UPDATE_H24 = _M_OBJ.UPDATE_H24 + '시';
//					else _M_OBJ.UPDATE_H24 = '';
//
//					_M_OBJ.END_YMD = data[0].END_YMD_TP6;
//					if (_M_OBJ.END_YMD != '' && _M_OBJ.END_YMD != null)
//						_M_OBJ.END_YMD = _M_OBJ.END_YMD.substr(0,4)+'-'+_M_OBJ.END_YMD.substr(4,2)+'-'+_M_OBJ.END_YMD.substr(6,2);
//					else _M_OBJ.END_YMD = '';
//
//					_M_OBJ.END_H24 = data[0].END_H24_TP6;
//					if(_M_OBJ.END_H24 != '' && _M_OBJ.END_H24 != null) _M_OBJ.END_H24 = _M_OBJ.END_H24 + '시';
//					else _M_OBJ.END_H24 = '';
//
//					_M_OBJ.MGT_NUMBER  = data[0].MGT_NUMBER_TP6;
//					if(_M_OBJ.MGT_NUMBER == '' || _M_OBJ.MGT_NUMBER == null) _M_OBJ.MGT_NUMBER = '';
//
//					_M_OBJ.INSTALL_YMD = data[0].INSTALL_YMD_TP6;
//					if (_M_OBJ.INSTALL_YMD != '' && _M_OBJ.INSTALL_YMD != null)
//						_M_OBJ.INSTALL_YMD = _M_OBJ.INSTALL_YMD.substr(0,4)+'-'+_M_OBJ.INSTALL_YMD.substr(4,2)+'-'+_M_OBJ.INSTALL_YMD.substr(6,2);
//					else _M_OBJ.INSTALL_YMD = '';
//
//					_M_OBJ.SIGNAL_TYPE = data[0].SIGNAL_TYPE_TP6;
//					if(_M_OBJ.SIGNAL_TYPE == 1){
//						_M_OBJ.SIGNAL_TYPE = '차량';
//					}else if(_M_OBJ.SIGNAL_TYPE == 2){
//						_M_OBJ.SIGNAL_TYPE = '보행';
//					}else if(_M_OBJ.SIGNAL_TYPE == 3){
//						_M_OBJ.SIGNAL_TYPE = '경보';
//					}else if(_M_OBJ.SIGNAL_TYPE == 4){
//						_M_OBJ.SIGNAL_TYPE = '음향';
//					}
//					else _M_OBJ.SIGNAL_TYPE = '';
//
//					_M_OBJ.CONTROL_NUMBER = data[0].CONTROL_NUMBER_TP6;
//					if(_M_OBJ.CONTROL_NUMBER == '' || _M_OBJ.CONTROL_NUMBER == null) _M_OBJ.CONTROL_NUMBER = '';
//				}else if(M_CD == 'SF601'){
//					type = 'TP7';
//					_M_OBJ.MGT_NUMBER = data[0].MGT_NUMBER_TP7;
//					if(_M_OBJ.MGT_NUMBER == '' || _M_OBJ.MGT_NUMBER == null) _M_OBJ.MGT_NUMBER = '';
//
//					_M_OBJ.INSTALL_YMD = data[0].INSTALL_YMD_TP7;
//					if (_M_OBJ.INSTALL_YMD != '' && _M_OBJ.INSTALL_YMD != null)
//						_M_OBJ.INSTALL_YMD = _M_OBJ.INSTALL_YMD.substr(0,4)+'-'+_M_OBJ.INSTALL_YMD.substr(4,2)+'-'+_M_OBJ.INSTALL_YMD.substr(6,2);
//					else _M_OBJ.INSTALL_YMD = '';
//
//					_M_OBJ.COMPANY = data[0].COMPANY_TP7;
//					if(_M_OBJ.COMPANY == '' || _M_OBJ.COMPANY == null) _M_OBJ.COMPANY = '';
//
//					_M_OBJ.VMS_TYPE = data[0].VMS_TYPE_TP7;
//					if(_M_OBJ.VMS_TYPE == 1){
//						_M_OBJ.VMS_TYPE = '도형식';
//					}else if(_M_OBJ.VMS_TYPE == 2){
//						_M_OBJ.VMS_TYPE = '문자식';
//					}
//					else _M_OBJ.VMS_TYPE = '';
//
//					_M_OBJ.INSTALL_LOC = data[0].INSTALL_LOC_TP7;
//					if(_M_OBJ.INSTALL_LOC == '' || _M_OBJ.INSTALL_LOC == null) _M_OBJ.INSTALL_LOC = '';
//
//				}else if(M_CD == 'SF602'){
//					type = 'TP8';
//					_M_OBJ.CONTROL_NUMBER = data[0].CONTROL_NUMBER_TP8;
//					if(_M_OBJ.CONTROL_NUMBER == '' || _M_OBJ.CONTROL_NUMBER == null) _M_OBJ.CONTROL_NUMBER = '';
//
//					_M_OBJ.COMPANY = data[0].COMPANY_TP8;
//					if(_M_OBJ.COMPANY == '' || _M_OBJ.COMPANY == null) _M_OBJ.COMPANY = '';
//
//					_M_OBJ.CAMERA_FUNC_TYPE = data[0].CAMERA_FUNC_TYPE_TP8;
//					if(_M_OBJ.CAMERA_FUNC_TYPE == 1){
//						_M_OBJ.CAMERA_FUNC_TYPE = '과속';
//					}else if(_M_OBJ.CAMERA_FUNC_TYPE == 2){
//						_M_OBJ.CAMERA_FUNC_TYPE = '구간';
//					}else if(_M_OBJ.CAMERA_FUNC_TYPE == 3){
//						_M_OBJ.CAMERA_FUNC_TYPE = '다기능';
//					}
//					else _M_OBJ.CAMERA_FUNC_TYPE = '';
//
//					_M_OBJ.CAMERA_FUNC_DESC = data[0].CAMERA_FUNC_DESC_TP8;
//					if(_M_OBJ.CAMERA_FUNC_DESC == '' || _M_OBJ.CAMERA_FUNC_DESC == null) _M_OBJ.CAMERA_FUNC_DESC = '';
//
//					_M_OBJ.INSTALL_YMD = data[0].INSTALL_YMD_TP8;
//					if (_M_OBJ.INSTALL_YMD != '' && _M_OBJ.INSTALL_YMD != null)
//						_M_OBJ.INSTALL_YMD = _M_OBJ.INSTALL_YMD.substr(0,4)+'-'+_M_OBJ.INSTALL_YMD.substr(4,2)+'-'+_M_OBJ.INSTALL_YMD.substr(6,2);
//					else _M_OBJ.INSTALL_YMD = '';
//
//					_M_OBJ.OPER_YMD = data[0].OPER_YMD_TP8;
//					if (_M_OBJ.OPER_YMD != '' && _M_OBJ.OPER_YMD != null)
//						_M_OBJ.OPER_YMD = _M_OBJ.OPER_YMD.substr(0,4)+'-'+_M_OBJ.OPER_YMD.substr(4,2)+'-'+_M_OBJ.OPER_YMD.substr(6,2);
//					else _M_OBJ.OPER_YMD = '';
//
//					_M_OBJ.NETWORK_TYPE = data[0].NETWORK_TYPE_TP8;
//					if(_M_OBJ.NETWORK_TYPE == 1){
//						_M_OBJ.NETWORK_TYPE = '전용회선';
//					}else if(_M_OBJ.NETWORK_TYPE == 2){
//						_M_OBJ.NETWORK_TYPE = '무선통신';
//					}
//					else _M_OBJ.NETWORK_TYPE = '';
//
//					_M_OBJ.NETWORK_DESC = data[0].NETWORK_DESC_TP8;
//					if(_M_OBJ.NETWORK_DESC == '' || _M_OBJ.NETWORK_DESC == null) _M_OBJ.NETWORK_DESC = '';
//
//					_M_OBJ.INSTALL_ADDRESS = data[0].INSTALL_ADDRESS_TP8;
//					if(_M_OBJ.INSTALL_ADDRESS == '' || _M_OBJ.INSTALL_ADDRESS == null) _M_OBJ.INSTALL_ADDRESS ='';
//				}
//			}
//
//			_M_OBJ.type = type;
//
//			var poi_icon = '';
//			if(poi_rotate != ''){
//				poi_icon = IMG.substr(0,10) + poi_rotate;
//			}else{
//				poi_icon = IMG;
//			}
//			_GET_ICON = '/contents/images/poi/' + poi_icon.trim() + '.png';
//
//			if(d == 'POINT'){
//				var size = new UTISMap.Size(18, 18); // 마커 아이콘 크기
//				var offset = new UTISMap.Pixel(-(size.w / 2), -size.h);
//
//				var icon = new UTISMap.Icon(_GET_ICON, size, offset);
//
//				var ss = LOCATION_DATA.substring(6,LOCATION_DATA.length-2);
//				var sp = ss.split(' ');
//
//				var wgsLonLat = new UTISMap.LonLat(sp[0],sp[1]);
//				var lonlat = Mando.wgs84ToMandoMap(wgsLonLat.lon, wgsLonLat.lat);
//
//				var markerObj = new UTISMap.Marker(lonlat, icon);
//
//				_VIEW_POPUP.hidePopup(0);
//
//				var str = makeTooltip(_M_OBJ);
//
//				_VIEW_POPUP.init(map, 0, 0, new UTISMap.Size(0, 0));
//				_VIEW_POPUP.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), str);
//				var height = $('#tooltip2').height()+ 14 + 19;
//				_VIEW_POPUP.destroy();
//				_VIEW_POPUP.init(map,450, height, new UTISMap.Size(-(450/2), -(height+24)));
//				_VIEW_POPUP.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), str);
//
//				map.setCenter(new UTISMap.LonLat(lonlat.lon, lonlat.lat));
//
//				map.addLayer(_VIEW_MARKERS_LAYER);
//				_VIEW_MARKERS_LAYER.addMarker(markerObj);
//			}
//			else if(d == 'POLYGON'){
//				var polygon_list = [];
//				var size = new UTISMap.Size(18, 18); // 마커 아이콘 크기
//				var offset = new UTISMap.Pixel(-(size.w / 2), -size.h);
//
//				var icon = new UTISMap.Icon(_GET_ICON, size, offset);
//
//				var ss = LOCATION_DATA.substring(9,LOCATION_DATA.length-2);
//				var sp = ss.split(',');
//				for (var i = 0; i < sp.length; i++ ){
//					var temp = sp[i].split(' ');
//					var plonlat = Mando.wgs84ToMandoMap(temp[0], temp[1]);
//					polygon_list.push( new UTISMap.Geometry.Point(plonlat.lon, plonlat.lat) );
//				}
//
//				var PolygonCollection = new UTISMap.Geometry.LinearRing(polygon_list);
//				var mLineFeature = new UTISMap.Feature.Vector(PolygonCollection);
//				var centerXY = mLineFeature.geometry.getCentroid();
//				//_VIEW_VECTOR_LAYER.addFeatures([mLineFeature]);
//
//				var lonlat = new Object();
//				if(centerXY != '' && centerXY != null){
//					lonlat.lon = centerXY.x;
//					lonlat.lat = centerXY.y;
//				}
//
//				var polygonObj = new UTISMap.Marker(lonlat, icon);
//				_VIEW_POPUP.hidePopup(0);
//				var str = makeTooltip(_M_OBJ);
//
//				_VIEW_POPUP.init(map, 0, 0, new UTISMap.Size(0, 0));
//				_VIEW_POPUP.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), str);
//				var height = $('#tooltip2').height()+ 14 + 19;
//				_VIEW_POPUP.destroy();
//				_VIEW_POPUP.init(map,450, height, new UTISMap.Size(-(450/2), -(height+24)));
//				_VIEW_POPUP.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), str);
//
//				map.setCenter(new UTISMap.LonLat(lonlat.lon, lonlat.lat));
//				map.addLayer(_VIEW_MARKERS_LAYER);
//				_VIEW_MARKERS_LAYER.addMarker(polygonObj);
//			}
//			else if(d == 'LINE'){
//				var line_list = [];
//				var size = new UTISMap.Size(18, 18); // 마커 아이콘 크기
//				var offset = new UTISMap.Pixel(-(size.w / 2), -size.h);
//				var icon = new UTISMap.Icon(_GET_ICON, size, offset);
//
//				var ss = LOCATION_DATA.substring(6,LOCATION_DATA.length-2);
//				var sp = ss.split(',');
//				var spSize = sp.length;
//				for (var i = 0; i < spSize; i++ ){
//					var temp = sp[i].split(' ');
//					var plonlat = Mando.wgs84ToMandoMap(temp[0], temp[1]);
//					line_list.push( new UTISMap.Geometry.Point(plonlat.lon, plonlat.lat));
//				}
//
//				var LineCollection = new UTISMap.Geometry.LineString(line_list);
//				var lineFeature = new UTISMap.Feature.Vector(LineCollection, null, sketchSymbolizers["Line"]);
//				var centerXY = lineFeature.geometry.getCentroid();
//				//_VIEW_VECTOR_LAYER.addFeatures([lineFeature]);
//
//				var lonlat = new Object();
//				if(centerXY != '' && centerXY != null){
//					lonlat.lon = centerXY.x;
//					lonlat.lat = centerXY.y;
//				}
//
//				var lineObj = new UTISMap.Marker(lonlat, icon);
//
//				_VIEW_POPUP.hidePopup(0);
//
//				var str = makeTooltip(_M_OBJ);
//
//				_VIEW_POPUP.init(map, 0, 0, new UTISMap.Size(0, 0));
//				_VIEW_POPUP.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), str);
//				var height = $('#tooltip2').height()+ 14 + 19;
//				_VIEW_POPUP.destroy();
//				_VIEW_POPUP.init(map,450, height, new UTISMap.Size(-(450/2), -(height+24)));
//				_VIEW_POPUP.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), str);
//
//				map.setCenter(new UTISMap.LonLat(lonlat.lon, lonlat.lat));
//				map.addLayer(_VIEW_MARKERS_LAYER);
//				_VIEW_MARKERS_LAYER.addMarker(lineObj);
//			}
//		}
//	});
//}
//
//교통안전데이터
function makeTooltip(obj){
var str = '';

var safeTitle = '';

var safeTrArr = [];

if(obj.IMG == "images_06"){
	safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/화물차';
}else if(obj.IMG == "images_07"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/이륜차(원동기,자전거)';
}else if(obj.IMG == "images_08"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/기타';
}else if(obj.IMG == "images_09"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/어린이';
}else if(obj.IMG == "images_10"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/노인';
}else if(obj.IMG == "images_11"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/장애인';
}else if(obj.IMG == "images_12"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/기타(유흥밀집-주취자)';
}else if(obj.IMG == "images_13"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/중앙선침범';
}else if(obj.IMG == "images_14"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/신호위반';
}else if(obj.IMG == "images_15"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/안전거리미확보';
}else if(obj.IMG == "images_16"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/교차로운행방법위반';
}else if(obj.IMG == "images_17"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/과속';
}else if(obj.IMG == "images_18"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/기타';
}else if(obj.IMG == "images_19"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/합류도로(좌)';
}else if(obj.IMG == "images_20"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/합류도로(우)';
}else if(obj.IMG == "images_21"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/급커브(굽은도로)';
}else if(obj.IMG == "images_22"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/철길건널목';
}else if(obj.IMG == "images_23"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/급경사(내리막)';
}else if(obj.IMG == "images_24"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/도로폭좁아집';
}else if(obj.IMG == "images_25"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/미끄러운도로';
}else if(obj.IMG == "images_26"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/추락';
}else if(obj.IMG == "images_27"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/낙석도로';
}else if(obj.IMG == "images_28"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/침수';
}else if(obj.IMG == "images_61"){
	safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/적치장소';
}else if(obj.IMG == "images_62"){
	safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/자전거 위험 도로';
}else if(obj.IMG == "images_29"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/기상-비';
}else if(obj.IMG == "images_30"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/기상-눈';
}else if(obj.IMG == "images_31"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/기타';
}else if(obj.IMG == "images_59"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/기상-안개';
}else if(obj.IMG == "images_60"){
	safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/기상-결빙';
}else if(obj.IMG == "images_35"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/신호기';
}else if(obj.IMG == "images_36"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/제어기';
}else if(obj.IMG == "images_37"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/RSE';
}else if(obj.IMG == "images_38"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/CCTV';
}else if(obj.IMG == "images_39"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/VMS';
}else if(obj.IMG == "images_40"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/과속단속카메라';
}else if(obj.IMG == "images_41"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/구간단속카메라';
}else if(obj.IMG == "images_42"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/다기능카메라';
}else if(obj.IMG == "images_43"){
    safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM+'/주정차위반단속카메라';
}else{
	safeTitle = obj.L_CD_NM+'/'+obj.M_CD_NM;
}

if(obj.type == "TP2"){//기상안전

	var sCd = obj.S_CD
	var DATA_TYPE = obj.DATA_TYPE;
	console.log(DATA_TYPE);
	if(sCd == 'SF20302' || sCd == 'SF20304' || sCd == 'SF20306' || sCd == 'SF20309' || sCd == 'SF20310' || sCd == 'SF20311' || sCd == 'SF20312' || sCd == 'SF20313'){
		if(con_pty == "0"){
			safeTrArr[1] = "<tr><th>하늘상태</th><td>"+con_sky+"</td><tr>";
			safeTrArr[2] = "<tr><th>현재기온</th><td>"+con_tm1+"℃</td><tr>";
				safeTrArr[3] = "<tr><th>구분</th><td>"+DATA_TYPE+"</td><tr>";

		}else{
			safeTrArr[1] = "<tr><th>강수형태</th><td>"+con_sky+"</td><tr>";
			safeTrArr[2] = "<tr><th>강수량</th><td>"+con_rn1+"mm</td><tr>";
			safeTrArr[3] = "<tr><th>현재기온</th><td>"+con_tm1+"℃</td><tr>";
			if(sCd == 'SF20313'){
			safeTrArr[4] = "<tr><th>구분</th><td>"+DATA_TYPE+"</td><tr>";
			}
		}
	}
}
//상세
if(obj.type == "TASS"){
	safeTrArr[0] = "<tr><th>발생일시</th><td>"+obj.OCCUR_YMD+"</td><tr>";
	safeTrArr[1] = "<tr><th>사고유형</th><td>"+obj.M_CD_NM+"</td><tr>";
	safeTrArr[2] = "<tr><th>사망자수</th><td>"+obj.DEATH_CNT+"</td><tr>";
	safeTrArr[3] = "<tr><th>중상자수</th><td>"+obj.SERIOUS_CNT+"</td><tr>";
	safeTrArr[4] = "<tr><th>경상자수</th><td>"+obj.MINIOR_CNT+"</td><tr>";
	safeTrArr[5] = "<tr><th>부상신고자수</th><td>"+obj.REPORT_CNT+"</td><tr>";
	safeTrArr[6] = "<tr><th>공개여부</th><td>"+obj.VIEW_YN+"</td><tr>";
}else if(obj.type == "TP1"){

	safeTrArr[0] = "<tr><th>발생일시</th><td>"+obj.OCCUR_YMD+' '+obj.OCCUR_H24+"</td><tr>";
	safeTrArr[1] = "<tr><th>사고유형</th><td>"+obj.DATA_DESC+"</td><tr>";
	safeTrArr[2] = "<tr><th>사망자수</th><td>"+obj.DEATH_CNT+"</td><tr>";
	safeTrArr[3] = "<tr><th>경상자수</th><td>"+obj.MINIOR_CNT+"</td><tr>";
	safeTrArr[4] = "<tr><th>부상신고자수</th><td>"+obj.REPORT_CNT+"</td><tr>";
	safeTrArr[5] = "<tr><th>공개여부</th><td>"+obj.VIEW_YN+"</td><tr>";

}else if(obj.type == "TP2"){

	safeTrArr[0] = "<tr><th>내용</th><td>"+obj.DATA_DESC+"</td><tr>";

}else if(obj.type == "TP3"){

	safeTrArr[0] = "<tr><th>지정일</th><td>"+obj.START_YMD+' '+obj.START_H24+"</td><tr>";
	safeTrArr[1] = "<tr><th>변경일</th><td>"+obj.UPDATE_YMD+' '+obj.UPDATE_H24+"</td><tr>";
	safeTrArr[2] = "<tr><th>해제일</th><td>"+obj.END_YMD+' '+obj.END_H24+"</td><tr>";
	safeTrArr[3] = "<tr><th>제한속도</th><td>"+obj.SPEED_LIMIT+"</td><tr>";
	safeTrArr[4] = "<tr><th>내용</th><td>"+obj.DATA_DESC+"</td><tr>";

}else if(obj.type == "TP4"){

	safeTrArr[0] = "<tr><th>지정일</th><td>"+obj.START_YMD+' '+obj.START_H24+"</td><tr>";
	safeTrArr[1] = "<tr><th>변경일</th><td>"+obj.UPDATE_YMD+' '+obj.UPDATE_H24+"</td><tr>";
	safeTrArr[2] = "<tr><th>해제일</th><td>"+obj.END_YMD+' '+obj.END_H24+"</td><tr>";

}else if(obj.type == "TP5"){

	safeTrArr[0] = "<tr><th>진출 LINKID</th><td>"+obj.FROM_LINK_ID+"</td><tr>";
	safeTrArr[1] = "<tr><th>진입 LINKID</th><td>"+obj.TO_LINK_ID+"</td><tr>";
	safeTrArr[2] = "<tr><th>NODEID</th><td>"+obj.NODE_ID+"</td><tr>";
	safeTrArr[3] = "<tr><th>제한요일</th><td>"+obj.LIMIT_DAY_TYPE+"</td><tr>";
	safeTrArr[4] = "<tr><th>제한운영일</th><td>"+obj.LIMIT_TIME_TYPE+"</td><tr>";
	safeTrArr[5] = "<tr><th>제한시작시각</th><td>"+obj.LIMIT_START_YMD+' '+obj.LIMIT_START_H24+"</td><tr>";
	safeTrArr[6] = "<tr><th>제한종료시각</th><td>"+obj.LIMIT_END_YMD+' '+obj.LIMIT_END_H24+"</td><tr>";
	safeTrArr[7] = "<tr><th>제한차종</th><td>"+obj.LIMIT_CAR_TYPE+"</td><tr>";
	safeTrArr[8] = "<tr><th>POI회전</th><td>"+obj.POI_ROTATE_DEGREE+"</td><tr>";

}else if(obj.type == "TP6"){

	safeTrArr[0] = "<tr><th>관리번호</th><td>"+obj.MGT_NUMBER+"</td><tr>";
	safeTrArr[1] = "<tr><th>설치일자</th><td>"+obj.INSTALL_YMD+"</td><tr>";
	safeTrArr[2] = "<tr><th>구분</th><td>"+obj.SIGNAL_TYPE+"</td><tr>";
	safeTrArr[3] = "<tr><th>연관제어기</th><td>"+obj.CONTROL_NUMBER+"</td><tr>";
	safeTrArr[4] = "<tr><th>지정일</th><td>"+obj.START_YMD+' '+obj.START_H24+"</td><tr>";
	safeTrArr[5] = "<tr><th>변경일</th><td>"+obj.UPDATE_YMD+' '+obj.UPDATE_H24+"</td><tr>";
	safeTrArr[6] = "<tr><th>해제일</th><td>"+obj.END_YMD+' '+obj.END_H24+"</td><tr>";

}else if(obj.type == "TP7"){
	//교통시설-교통정보시설
	safeTrArr[0] = "<tr><th>관리번호</th><td>"+obj.MGT_NUMBER+"</td><tr>";
	safeTrArr[1] = "<tr><th>설치일자</th><td>"+obj.INSTALL_YMD+"</td><tr>";
	safeTrArr[2] = "<tr><th>설치위치</th><td>"+obj.INSTALL_LOC+"</td><tr>";
	safeTrArr[3] = "<tr><th>지정일</th><td>"+obj.START_YMD+' '+obj.START_H24+"</td><tr>";
	safeTrArr[4] = "<tr><th>변경일</th><td>"+obj.UPDATE_YMD+' '+obj.UPDATE_H24+"</td><tr>";
	safeTrArr[5] = "<tr><th>해제일</th><td>"+obj.END_YMD+' '+obj.END_H24+"</td><tr>";
	safeTrArr[6] = "<tr><th>VMS형식</th><td>"+obj.VMS_TYPE+"</td><tr>";
	safeTrArr[7] = "<tr><th>공개여부</th><td>"+obj.VIEW_YN+"</td><tr>";

}else if(obj.type == "TP8"){

	safeTrArr[0] = "<tr><th>제어기번호</th><td>"+obj.CONTROL_NUMBER+"</td><tr>";
	safeTrArr[1] = "<tr><th>제조사</th><td>"+obj.COMPANY+"</td><tr>";
	safeTrArr[2] = "<tr><th>기능</th><td>"+obj.CAMERA_FUNC_TYPE+"</td><tr>";
	safeTrArr[3] = "<tr><th>설치일자</th><td>"+obj.INSTALL_YMD+"</td><tr>";
	safeTrArr[4] = "<tr><th>정상운용일자</th><td>"+obj.OPER_YMD+"</td><tr>";
	safeTrArr[5] = "<tr><th>통신방식</th><td>"+obj.NETWORK_TYPE+"</td><tr>";
	safeTrArr[6] = "<tr><th>통신사명(속도)</th><td>"+obj.NETWORK_DESC+"</td><tr>";
	safeTrArr[7] = "<tr><th>설치주소</th><td>"+obj.INSTALL_ADDRESS+"</td><tr>";
	safeTrArr[8] = "<tr><th>지정일</th><td>"+obj.START_YMD+' '+obj.START_H24+"</td><tr>";
	safeTrArr[9] = "<tr><th>변경일</th><td>"+obj.UPDATE_YMD+' '+obj.UPDATE_H24+"</td><tr>";
	safeTrArr[10] = "<tr><th>해제일</th><td>"+obj.END_YMD+' '+obj.END_H24+"</td><tr>";

}else if (obj.type == "TP99") {
	safeTrArr[0] = "<tr><th>상세내용 </th><td>"+obj.DATA_DESC+"</td><tr>";

}

str += "<div class='map_popup_wrap roaddanger active' style='height: 300px; margin:-355px 0 0 -280px;'><div class='map_popup'>";
str += "<h3>"+safeTitle+"</h3>";
str += "<div class='popup_content_box'><div class='tb_basic'><table>";
str += "<caption>"+safeTitle+"</caption>";
str += "<colgroup><col style='width:25%'><col style='width:*'></colgroup>";
str += "<tbody><tr><th>위치</th>";
str += "<td>"+"<p>"+obj.ADDRESS_JIBUN+"</p>" +"</td>";
str += "</tr></tbody></table></div>";
str += "<h4>관리항목 (상세)</h4>";
str += "<div class='tb_basic'><table>";
str += "<caption>관리항목 (상세)</caption>";
str += "<colgroup><col style='width:25%'><col style='width:*'></colgroup><tbody>";
for (var i = 0; i < safeTrArr.length; i++) {
	str += safeTrArr[i];
}

//str += "<tr><th>지정일</th>";
//str += "<td>2018년 11월 11일 (09:00)</td>";
//str += "</tr><tr><th>해체일</th>";
//str += "<td>00시</td>";
//str += "</tr><tr><th>변경일</th>";
//str += "<td>2018년 11월 11일 (09:00)</td>";
//str += "</tr><tr><th>제한속도</th>";
//str += "<td>30km</td>";
//str += "</tr><tr><th>내용</th>";
//str += "<td>서울애화학교(특수학교)</td></tr>";


str += "</tbody></table></div>";
str += "<a href='#' onclick='closeSafeOverlay()' class='btn_popup_close'><span>닫기</span></a>";
str += "</div></div></div>";

//	str += '<div id="tooltip2" style="width:426px"><!-- tooltip : start -->';
//	str += '	<div id="tooltip2_header02"><!-- tooltip_header : start -->';
//	if(obj.IMG == "images_06"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/화물차</h1>';
//	}else if(obj.IMG == "images_07"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/이륜차(원동기,자전거)</h1>';
//	}else if(obj.IMG == "images_08"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/기타</h1>';
//	}else if(obj.IMG == "images_09"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/어린이</h1>';
//	}else if(obj.IMG == "images_10"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/노인</h1>';
//	}else if(obj.IMG == "images_11"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/장애인</h1>';
//	}else if(obj.IMG == "images_12"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/기타(유흥밀집-주취자)</h1>';
//	}else if(obj.IMG == "images_13"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/중앙선침범</h1>';
//	}else if(obj.IMG == "images_14"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/신호위반</h1>';
//	}else if(obj.IMG == "images_15"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/안전거리미확보</h1>';
//	}else if(obj.IMG == "images_16"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/교차로운행방법위반</h1>';
//	}else if(obj.IMG == "images_17"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/과속</h1>';
//	}else if(obj.IMG == "images_18"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/기타</h1>';
//	}else if(obj.IMG == "images_19"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/합류도로(좌)</h1>';
//	}else if(obj.IMG == "images_20"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/합류도로(우)</h1>';
//	}else if(obj.IMG == "images_21"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/급커브(굽은도로)</h1>';
//	}else if(obj.IMG == "images_22"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/철길건널목</h1>';
//	}else if(obj.IMG == "images_23"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/급경사(내리막)</h1>';
//	}else if(obj.IMG == "images_24"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/도로폭좁아집</h1>';
//	}else if(obj.IMG == "images_25"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/미끄러운도로</h1>';
//	}else if(obj.IMG == "images_26"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/추락</h1>';
//	}else if(obj.IMG == "images_27"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/낙석도로</h1>';
//	}else if(obj.IMG == "images_28"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/침수</h1>';
//	}else if(obj.IMG == "images_61"){
//		str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/적치장소</h1>';
//	}else if(obj.IMG == "images_62"){
//		str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/자전거 위험 도로</h1>';
//	}else if(obj.IMG == "images_29"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/기상-비</h1>';
//	}else if(obj.IMG == "images_30"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/기상-눈</h1>';
//	}else if(obj.IMG == "images_31"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/기타</h1>';
//	}else if(obj.IMG == "images_59"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/기상-안개</h1>';
//	}else if(obj.IMG == "images_60"){
//		str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/기상-결빙</h1>';
//	}else if(obj.IMG == "images_35"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/신호기</h1>';
//	}else if(obj.IMG == "images_36"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/제어기</h1>';
//	}else if(obj.IMG == "images_37"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/RSE</h1>';
//	}else if(obj.IMG == "images_38"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/CCTV</h1>';
//	}else if(obj.IMG == "images_39"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/VMS</h1>';
//	}else if(obj.IMG == "images_40"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/과속단속카메라</h1>';
//	}else if(obj.IMG == "images_41"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/구간단속카메라</h1>';
//	}else if(obj.IMG == "images_42"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/다기능카메라</h1>';
//	}else if(obj.IMG == "images_43"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/주정차위반단속카메라</h1>';
//	}else{
//	str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'</h1>';
//    }
//	str += '	</div><!-- //tooltip_header : end -->';
//	str += '	<div id="tooltip2_content02"><!-- tooltip_content : start -->';
//	str += '		<table width="100%" summary="선택된 링크의 위치정보입니다." class="table03 mb10">';
//	str += '		<caption><span class="hidden">위치정보</span></caption>';
//	str += '		<colgroup>';
//	str += '			<col width="73px" />';
//	str += '			<col width="*" />';
//	str += '		</colgroup>';
//	str += '		<tbody>';
//	str += '			<tr>';
//	str += '				<th scope="row">위치</th>';
//	str += '				<td>';
//	str += '					<p>'+obj.ADDRESS_JIBUN+'</p>';
//	str += '					<p>'+obj.ADDRESS_NEW+'</p>';
//	str += '				</td>';
//	str += '			</tr>';
//	str += '		</tbody>';
//	str += '		</table>';
//	if(obj.type == "TP2"){//기상안전
//		var sCd = obj.S_CD;
//		if(sCd == 'SF20302' || sCd == 'SF20304' || sCd == 'SF20306' || sCd == 'SF20309' || sCd == 'SF20310' || sCd == 'SF20311' || sCd == 'SF20312' || sCd == 'SF20313'){
//			str += '<h2 class="mb10">'+obj.ADDRESS_JIBUN+' ( '+ obj.PRE_TIME +' )</h2>';
//			str += '		<table width="100%" summary="선택된 링크의 위치정보입니다." class="table03 mb10">';
//			str += '		<caption><span class="hidden">위치정보</span></caption>';
//			str += '		<colgroup>';
//			str += '			<col width="100px" />';
//			str += '			<col width="*" />';
//			str += '		</colgroup>';
//			str += '		<tbody>';
//			str += '			<tr>';
//			str += '				<th scope="row">하늘상태</th>';
//			str += '				<td>';
//			str += '					<p>'+obj.SKY+'</p>';
//			str += '				</td>';
//			str += '			</tr>';
//			str += '			<tr>';
//			str += '				<th scope="row">강수/강우확률</th>';
//			str += '				<td>';
//			str += '					<p>'+obj.POP+'</p>';
//			str += '				</td>';
//			str += '			</tr>';
//			str += '			<tr>';
//			str += '				<th scope="row">현재기온</th>';
//			str += '				<td>';
//			str += '					<p>'+obj.T3H+'</p>';
//			str += '				</td>';
//			str += '			</tr>';
//			str += '			<tr>';
//			str += '				<th scope="row">일 최저/최고</th>';
//			str += '				<td>';
//			str += '					<p>'+obj.TMINMAX+'</p>';
//			str += '				</td>';
//			str += '			</tr>';
//			str += '		</tbody>';
//			str += '		</table>';
//		}
//	}
//	str += '	<h2 class="mb10">관리항목(상세)</h2>';
//	//상세
//	if(obj.type == "TASS"){
//
//		str += '	<!-- 관리항목(상세)① : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="95px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">발생일시</th>';
//		str += '			<td colspan="3">'+obj.OCCUR_YMD+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">사고유형</th>';
//		str += '			<td colspan="3">'+obj.M_CD_NM+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">사망자수</th>';
//		str += '			<td>'+obj.DEATH_CNT+'</td>';
//		str += '			<th scope="row" class="sec_th">중상자수</th>';
//		str += '			<td>'+obj.SERIOUS_CNT+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">경상자수</th>';
//		str += '			<td>'+obj.MINIOR_CNT+'</td>';
//		str += '			<th scope="row" class="sec_th">부상신고자수</th>';
//		str += '			<td>'+obj.REPORT_CNT+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">공개여부</th>';
//		str += '			<td colspan="3">'+obj.VIEW_YN+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)① : end -->';
//	}else if(obj.type == "TP1"){
//		str += '	<!-- 관리항목(상세)① : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="95px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">발생일시</th>';
//		str += '			<td colspan="3">'+obj.OCCUR_YMD+' '+obj.OCCUR_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">사고유형</th>';
//		str += '			<td colspan="3">'+obj.DATA_DESC+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">사망자수</th>';
//		str += '			<td>'+obj.DEATH_CNT+'</td>';
//		str += '			<th scope="row" class="sec_th">중상자수</th>';
//		str += '			<td>'+obj.SERIOUS_CNT+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">경상자수</th>';
//		str += '			<td>'+obj.MINIOR_CNT+'</td>';
//		str += '			<th scope="row" class="sec_th">부상신고자수</th>';
//		str += '			<td>'+obj.REPORT_CNT+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">공개여부</th>';
//		str += '			<td colspan="3">'+obj.VIEW_YN+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)① : end -->';
//	}else if(obj.type == "TP2"){
//		str += '	<!-- 관리항목(상세)② : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">내용</th>';
//		str += '			<td>'+obj.DATA_DESC+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)② : end -->';
//	}else if(obj.type == "TP3"){
//		str += '	<!-- 관리항목(상세)③ : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">지정일</th>';
//		str += '			<td>'+obj.START_YMD+' '+obj.START_H24+'</td>';
//		str += '			<th scope="row" class="sec_th">변경일</th>';
//		str += '			<td>'+obj.UPDATE_YMD+' '+obj.UPDATE_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">해제일</th>';
//		str += '			<td>'+obj.END_YMD+' '+obj.END_H24+'</td>';
//		str += '			<th scope="row" class="sec_th">제한속도</th>';
//		str += '			<td>'+obj.SPEED_LIMIT+' Km</td>';
//
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">내용</th>';
//		str += '			<td colspan="3">'+obj.DATA_DESC+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)③ : end -->';
//	}else if(obj.type == "TP4"){
//		str += '	<!-- 관리항목(상세)④ : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">지정일</th>';
//		str += '			<td>'+obj.START_YMD+' '+obj.START_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">변경일</th>';
//		str += '			<td>'+obj.UPDATE_YMD+' '+obj.UPDATE_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">해제일</th>';
//		str += '			<td>'+obj.END_YMD+' '+obj.END_H24+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)④ : end -->';
//	}else if(obj.type == "TP5"){
//		str += '	<!-- 관리항목(상세)⑤ : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="90px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="90px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">진출 LINKID</th>';
//		str += '			<td colspan="3">'+obj.FROM_LINK_ID+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">진입 LINKID</th>';
//		str += '			<td colspan="3">'+obj.TO_LINK_ID+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">NODEID</th>';
//		str += '			<td colspan="3">'+obj.NODE_ID+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">제한요일</th>';
//		str += '			<td>'+obj.LIMIT_DAY_TYPE+'</td>';
//		str += '			<th scope="row" class="sec_th">제한운영일</th>';
//		str += '			<td>'+obj.LIMIT_TIME_TYPE+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">제한시작시각</th>';
//		str += '			<td>'+obj.LIMIT_START_YMD+' '+obj.LIMIT_START_H24+'</td>';
//		str += '			<th scope="row" class="sec_th">제한종료시각</th>';
//		str += '			<td>'+obj.LIMIT_END_YMD+' '+obj.LIMIT_END_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">제한차종</th>';
//		str += '			<td>'+obj.LIMIT_CAR_TYPE+'</td>';
//		str += '			<th scope="row" class="sec_th">POI회전</th>';
//		str += '			<td>'+obj.POI_ROTATE_DEGREE+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)⑤ : end -->';
//	}else if(obj.type == "TP6"){
//		//교통시설-신호기
//		str += '	<!-- 관리항목(상세)⑥ : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="83px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">관리번호</th>';
//		str += '			<td>'+obj.MGT_NUMBER+'</td>';
//		str += '			<th scope="row" class="sec_th">설치일자</th>';
//		str += '			<td>'+obj.INSTALL_YMD+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">구분</th>';
//		str += '			<td>'+obj.SIGNAL_TYPE+'</td>';
//		str += '			<th scope="row" class="sec_th">연관제어기</th>';
//		str += '			<td>'+obj.CONTROL_NUMBER+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">지정일</th>';
//		str += '			<td colspan="3">'+obj.START_YMD+' '+obj.START_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">변경일</th>';
//		str += '			<td colspan="3">'+obj.UPDATE_YMD+' '+obj.UPDATE_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">해제일</th>';
//		str += '			<td colspan="3">'+obj.END_YMD+' '+obj.END_H24+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)⑥ : end -->';
//	}else if(obj.type == "TP7"){
//		//교통시설-교통정보시설
//		str += '	<!-- 관리항목(상세)⑦ : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="83px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">관리번호</th>';
//		str += '			<td>'+obj.MGT_NUMBER+'</td>';
//		str += '			<th scope="row" class="sec_th">설치일자</th>';
//		str += '			<td>'+obj.INSTALL_YMD+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">설치위치</th>';
//		str += '			<td>'+obj.INSTALL_LOC+'</td>';
//		str += '			<th scope="row" class="sec_th">제조사</th>';
//		str += '			<td>'+obj.COMPANY+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">지정일</th>';
//		str += '			<td colspan="3">'+obj.START_YMD+' '+obj.START_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">변경일</th>';
//		str += '			<td colspan="3">'+obj.UPDATE_YMD+' '+obj.UPDATE_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">해제일</th>';
//		str += '			<td colspan="3">'+obj.END_YMD+' '+obj.END_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">VMS형식</th>';
//		str += '			<td>'+obj.VMS_TYPE+'</td>';
//		str += '			<th scope="row" class="sec_th">공개여부</th>';
//		str += '			<td>'+obj.VIEW_YN+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)⑦ : end -->';
//	}else if(obj.type == "TP8"){
//		str += '	<!-- 관리항목(상세)⑧ : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="80px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="105px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">제어기번호</th>';
//		str += '			<td>'+obj.CONTROL_NUMBER+'</td>';
//		str += '			<th scope="row" class="sec_th">제조사</th>';
//		str += '			<td>'+obj.COMPANY+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">기능</th>';
//		str += '			<td colspan="3">'+obj.CAMERA_FUNC_TYPE+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">설치일자</th>';
//		str += '			<td>'+obj.INSTALL_YMD+'</td>';
//		str += '			<th scope="row" class="sec_th">정상운용일자</th>';
//		str += '			<td>'+obj.OPER_YMD+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">통신방식</th>';
//		str += '			<td>'+obj.NETWORK_TYPE+'</td>';
//		str += '			<th scope="row" class="sec_th">통신사명(속도)</th>';
//		str += '			<td>'+obj.NETWORK_DESC+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">설치주소</th>';
//		str += '			<td colspan="3">'+obj.INSTALL_ADDRESS+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">지정일</th>';
//		str += '			<td colspan="3">'+obj.START_YMD+' '+obj.START_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">변경일</th>';
//		str += '			<td colspan="3">'+obj.UPDATE_YMD+' '+obj.UPDATE_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">해제일</th>';
//		str += '			<td colspan="3">'+obj.END_YMD+' '+obj.END_H24+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)⑧ : end -->';
//	}
//	str += '</div><!-- //tooltip_content : end -->';
//	str += '<div class="tooltip2_close"><!-- tooltip_close : start -->';
//	str += '	<button type="button" onclick="javascript:_VIEW_POPUP.hidePopup(0);" ><img src="/contents/images/btn_tooltip_close.gif" alt="툴팁닫기" /></button>';
//	str += '</div><!-- //tooltip_close : end -->';
//	str += '</div><!-- //tooltip : end -->';
//	str += '<!-- //교통안전정보 : end -->';
//	str += '<div class="arrow_tsdms" style="text-align: center;"><img src="/contents/images/arrow_tooltip.png" alt="" /></div>';

	return str;
}

//function makeRoadTooltip(obj){
//	var str = '';
//	var imgTemp = obj.IMG.trim();
//	str += '<div id="tooltip2" style="width:426px"><!-- tooltip : start -->';
//	str += '	<div id="tooltip2_header02"><!-- tooltip_header : start -->';
//	if(imgTemp == "images_06"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/화물차</h1>';
//	}else if(imgTemp == "images_07"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/이륜차(원동기,자전거)</h1>';
//	}else if(imgTemp == "images_08"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/기타</h1>';
//	}else if(imgTemp == "images_09"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/어린이</h1>';
//	}else if(imgTemp == "images_10"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/노인</h1>';
//	}else if(imgTemp == "images_11"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/장애인</h1>';
//	}else if(imgTemp == "images_12"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/기타(유흥밀집-주취자)</h1>';
//	}else if(imgTemp == "images_13"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/중앙선침범</h1>';
//	}else if(imgTemp == "images_14"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/신호위반</h1>';
//	}else if(imgTemp == "images_15"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/안전거리미확보</h1>';
//	}else if(imgTemp == "images_16"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/교차로운행방법위반</h1>';
//	}else if(imgTemp == "images_17"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/과속</h1>';
//	}else if(imgTemp == "images_18"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/기타</h1>';
//	}else if(imgTemp == "images_19"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/합류도로(좌)</h1>';
//	}else if(imgTemp == "images_20"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/합류도로(우)</h1>';
//	}else if(imgTemp == "images_21"){
//	    str += '		<h1>기상안전/'+obj.M_CD_NM+'/급커브(굽은도로)</h1>';
//	}else if(imgTemp == "images_22"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/철길건널목</h1>';
//	}else if(imgTemp == "images_23"){
//	    str += '		<h1>기상안전/'+obj.M_CD_NM+'/급경사(내리막)</h1>';
//	}else if(imgTemp == "images_24"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/도로폭좁아집</h1>';
//	}else if(imgTemp == "images_25"){
//	    str += '		<h1>기상안전/'+obj.M_CD_NM+'/미끄러운도로</h1>';
//	}else if(imgTemp == "images_26"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/추락</h1>';
//	}else if(imgTemp == "images_27"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/낙석도로</h1>';
//	}else if(imgTemp == "images_28"){
//	    str += '		<h1>기상안전/'+obj.M_CD_NM+'/침수</h1>';
//	}else if(imgTemp == "images_29"){
//	    str += '		<h1>기상안전/'+obj.M_CD_NM+'/기상-비</h1>';
//	}else if(imgTemp == "images_30"){
//	    str += '		<h1>기상안전/'+obj.M_CD_NM+'/기상-눈</h1>';
//	}else if(imgTemp == "images_31"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/기타</h1>';
//	}else if(imgTemp == "images_59"){
//	    str += '		<h1>기상안전/'+obj.M_CD_NM+'/기상-안개</h1>';
//	}else if(imgTemp == "images_60"){
//		str += '		<h1>기상안전/'+obj.M_CD_NM+'/기상-결빙</h1>';
//	}else if(imgTemp == "images_35"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/신호기</h1>';
//	}else if(imgTemp == "images_36"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/제어기</h1>';
//	}else if(imgTemp == "images_37"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/RSE</h1>';
//	}else if(imgTemp == "images_38"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/CCTV</h1>';
//	}else if(imgTemp == "images_39"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/VMS</h1>';
//	}else if(imgTemp == "images_40"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/과속단속카메라</h1>';
//	}else if(imgTemp == "images_41"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/구간단속카메라</h1>';
//	}else if(imgTemp == "images_42"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/다기능카메라</h1>';
//	}else if(imgTemp == "images_43"){
//	    str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'/주정차위반단속카메라</h1>';
//	}else{
//		str += '		<h1>'+obj.L_CD_NM+'/'+obj.M_CD_NM+'</h1>';
//    }
//	str += '	</div><!-- //tooltip_header : end -->';
//	str += '	<div id="tooltip2_content02"><!-- tooltip_content : start -->';
//	str += '		<table width="100%" summary="선택된 링크의 위치정보입니다." class="table03 mb10">';
//	str += '		<caption><span class="hidden">위치정보</span></caption>';
//	str += '		<colgroup>';
//	str += '			<col width="73px" />';
//	str += '			<col width="*" />';
//	str += '		</colgroup>';
//	str += '		<tbody>';
//	str += '			<tr>';
//	str += '				<th scope="row">위치</th>';
//	str += '				<td>';
//	str += '					<p>'+obj.ADDRESS_JIBUN+'</p>';
//	str += '					<p>'+obj.ADDRESS_NEW+'</p>';
//	str += '				</td>';
//	str += '			</tr>';
//	str += '		</tbody>';
//	str += '		</table>';
//	if(obj.type == "TP2"){//기상안전
//		var sCd = obj.S_CD;
//		if(sCd == 'SF20302' || sCd == 'SF20304' || sCd == 'SF20306' || sCd == 'SF20309' || sCd == 'SF20310' || sCd == 'SF20311' || sCd == 'SF20312' || sCd == 'SF20313'){
//			str += '<h2 class="mb10">'+obj.ADDRESS_JIBUN+' ( '+ obj.PRE_TIME +' )</h2>';
//			str += '		<table width="100%" summary="선택된 링크의 위치정보입니다." class="table03 mb10">';
//			str += '		<caption><span class="hidden">위치정보</span></caption>';
//			str += '		<colgroup>';
//			str += '			<col width="100px" />';
//			str += '			<col width="*" />';
//			str += '		</colgroup>';
//			str += '		<tbody>';
//			str += '			<tr>';
//			str += '				<th scope="row">하늘상태</th>';
//			str += '				<td>';
//			str += '					<p>'+obj.SKY+'</p>';
//			str += '				</td>';
//			str += '			</tr>';
//			str += '			<tr>';
//			str += '				<th scope="row">강수/강우확률</th>';
//			str += '				<td>';
//			str += '					<p>'+obj.POP+'</p>';
//			str += '				</td>';
//			str += '			</tr>';
//			str += '			<tr>';
//			str += '				<th scope="row">현재기온</th>';
//			str += '				<td>';
//			str += '					<p>'+obj.T3H+'</p>';
//			str += '				</td>';
//			str += '			</tr>';
//			str += '			<tr>';
//			str += '				<th scope="row">일 최저/최고</th>';
//			str += '				<td>';
//			str += '					<p>'+obj.TMINMAX+'</p>';
//			str += '				</td>';
//			str += '			</tr>';
//			str += '		</tbody>';
//			str += '		</table>';
//		}
//	}
//	str += '	<h2 class="mb10">관리항목(상세)</h2>';
//	//상세
//	if(obj.type == "TASS"){
//
//		str += '	<!-- 관리항목(상세)① : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="95px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">발생일시</th>';
//		str += '			<td colspan="3">'+obj.OCCUR_YMD+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">사고유형</th>';
//		str += '			<td colspan="3">'+obj.M_CD_NM+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">사망자수</th>';
//		str += '			<td>'+obj.DEATH_CNT+'</td>';
//		str += '			<th scope="row" class="sec_th">중상자수</th>';
//		str += '			<td>'+obj.SERIOUS_CNT+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">경상자수</th>';
//		str += '			<td>'+obj.MINIOR_CNT+'</td>';
//		str += '			<th scope="row" class="sec_th">부상신고자수</th>';
//		str += '			<td>'+obj.REPORT_CNT+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">공개여부</th>';
//		str += '			<td colspan="3">'+obj.VIEW_YN+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)① : end -->';
//	}else if(obj.type == "TP1"){
//		str += '	<!-- 관리항목(상세)① : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="95px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">발생일시</th>';
//		str += '			<td colspan="3">'+obj.OCCUR_YMD+' '+obj.OCCUR_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">사고유형</th>';
//		str += '			<td colspan="3">'+obj.DATA_DESC+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">사망자수</th>';
//		str += '			<td>'+obj.DEATH_CNT+'</td>';
//		str += '			<th scope="row" class="sec_th">중상자수</th>';
//		str += '			<td>'+obj.SERIOUS_CNT+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">경상자수</th>';
//		str += '			<td>'+obj.MINIOR_CNT+'</td>';
//		str += '			<th scope="row" class="sec_th">부상신고자수</th>';
//		str += '			<td>'+obj.REPORT_CNT+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">공개여부</th>';
//		str += '			<td colspan="3">'+obj.VIEW_YN+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)① : end -->';
//	}else if(obj.type == "TP2"){
//		str += '	<!-- 관리항목(상세)② : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">내용</th>';
//		str += '			<td>'+obj.DATA_DESC+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)② : end -->';
//	}else if(obj.type == "TP3"){
//		str += '	<!-- 관리항목(상세)③ : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">지정일</th>';
//		str += '			<td>'+obj.START_YMD+' '+obj.START_H24+'</td>';
//		str += '			<th scope="row" class="sec_th">변경일</th>';
//		str += '			<td>'+obj.UPDATE_YMD+' '+obj.UPDATE_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">해제일</th>';
//		str += '			<td>'+obj.END_YMD+' '+obj.END_H24+'</td>';
//		str += '			<th scope="row" class="sec_th">제한속도</th>';
//		str += '			<td>'+obj.SPEED_LIMIT+' Km</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">내용</th>';
//		str += '			<td colspan="3">'+obj.DATA_DESC+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)③ : end -->';
//	}else if(obj.type == "TP4"){
//		str += '	<!-- 관리항목(상세)④ : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">지정일</th>';
//		str += '			<td>'+obj.START_YMD+' '+obj.START_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">변경일</th>';
//		str += '			<td>'+obj.UPDATE_YMD+' '+obj.UPDATE_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">해제일</th>';
//		str += '			<td>'+obj.END_YMD+' '+obj.END_H24+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)④ : end -->';
//	}else if(obj.type == "TP5"){
//		str += '	<!-- 관리항목(상세)⑤ : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="90px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="90px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">진출 LINKID</th>';
//		str += '			<td colspan="3">'+obj.FROM_LINK_ID+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">진입 LINKID</th>';
//		str += '			<td colspan="3">'+obj.TO_LINK_ID+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">NODEID</th>';
//		str += '			<td colspan="3">'+obj.NODE_ID+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">제한요일</th>';
//		str += '			<td>'+obj.LIMIT_DAY_TYPE+'</td>';
//		str += '			<th scope="row" class="sec_th">제한운영일</th>';
//		str += '			<td>'+obj.LIMIT_TIME_TYPE+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">제한시작시각</th>';
//		str += '			<td>'+obj.LIMIT_START_YMD+' '+obj.LIMIT_START_H24+'</td>';
//		str += '			<th scope="row" class="sec_th">제한종료시각</th>';
//		str += '			<td>'+obj.LIMIT_END_YMD+' '+obj.LIMIT_END_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">제한차종</th>';
//		str += '			<td>'+obj.LIMIT_CAR_TYPE+'</td>';
//		str += '			<th scope="row" class="sec_th">POI회전</th>';
//		str += '			<td>'+obj.POI_ROTATE_DEGREE+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)⑤ : end -->';
//	}else if(obj.type == "TP6"){
//		//교통시설-신호기
//		str += '	<!-- 관리항목(상세)⑥ : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="83px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">관리번호</th>';
//		str += '			<td>'+obj.MGT_NUMBER+'</td>';
//		str += '			<th scope="row" class="sec_th">설치일자</th>';
//		str += '			<td>'+obj.INSTALL_YMD+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">구분</th>';
//		str += '			<td>'+obj.SIGNAL_TYPE+'</td>';
//		str += '			<th scope="row" class="sec_th">연관제어기</th>';
//		str += '			<td>'+obj.CONTROL_NUMBER+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">지정일</th>';
//		str += '			<td colspan="3">'+obj.START_YMD+' '+obj.START_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">변경일</th>';
//		str += '			<td colspan="3">'+obj.UPDATE_YMD+' '+obj.UPDATE_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">해제일</th>';
//		str += '			<td colspan="3">'+obj.END_YMD+' '+obj.END_H24+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)⑥ : end -->';
//	}else if(obj.type == "TP7"){//교통시설-교통정보시설
//		str += '	<!-- 관리항목(상세)⑦ : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="73px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="83px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">관리번호</th>';
//		str += '			<td>'+obj.MGT_NUMBER+'</td>';
//		str += '			<th scope="row" class="sec_th">설치일자</th>';
//		str += '			<td>'+obj.INSTALL_YMD+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">설치위치</th>';
//		str += '			<td>'+obj.INSTALL_LOC+'</td>';
//		str += '			<th scope="row" class="sec_th">제조사</th>';
//		str += '			<td>'+obj.COMPANY+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">지정일</th>';
//		str += '			<td colspan="3">'+obj.START_YMD+' '+obj.START_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">변경일</th>';
//		str += '			<td colspan="3">'+obj.UPDATE_YMD+' '+obj.UPDATE_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">해제일</th>';
//		str += '			<td colspan="3">'+obj.END_YMD+' '+obj.END_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">VMS형식</th>';
//		str += '			<td>'+obj.VMS_TYPE+'</td>';
//		str += '			<th scope="row" class="sec_th">공개여부</th>';
//		str += '			<td>'+obj.VIEW_YN+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)⑦ : end -->';
//	}else if(obj.type == "TP8"){
//		str += '	<!-- 관리항목(상세)⑧ : start -->';
//		str += '	<table width="100%" summary="선택된 링크의 교통안전정보입니다." class="table03">';
//		str += '	<caption><span class="hidden">교통안전정보</span></caption>';
//		str += '	<colgroup>';
//		str += '		<col width="80px" />';
//		str += '		<col width="*" />';
//		str += '		<col width="105px" />';
//		str += '		<col width="*" />';
//		str += '	</colgroup>';
//		str += '	<tbody>';
//		str += '		<tr>';
//		str += '			<th scope="row">제어기번호</th>';
//		str += '			<td>'+obj.CONTROL_NUMBER+'</td>';
//		str += '			<th scope="row" class="sec_th">제조사</th>';
//		str += '			<td>'+obj.COMPANY+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">기능</th>';
//		str += '			<td colspan="3">'+obj.CAMERA_FUNC_TYPE+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">설치일자</th>';
//		str += '			<td>'+obj.INSTALL_YMD+'</td>';
//		str += '			<th scope="row" class="sec_th">정상운용일자</th>';
//		str += '			<td>'+obj.OPER_YMD+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">통신방식</th>';
//		str += '			<td>'+obj.NETWORK_TYPE+'</td>';
//		str += '			<th scope="row" class="sec_th">통신사명(속도)</th>';
//		str += '			<td>'+obj.NETWORK_DESC+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">설치주소</th>';
//		str += '			<td colspan="3">'+obj.INSTALL_ADDRESS+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">지정일</th>';
//		str += '			<td colspan="3">'+obj.START_YMD+' '+obj.START_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">변경일</th>';
//		str += '			<td colspan="3">'+obj.UPDATE_YMD+' '+obj.UPDATE_H24+'</td>';
//		str += '		</tr>';
//		str += '		<tr>';
//		str += '			<th scope="row">해제일</th>';
//		str += '			<td colspan="3">'+obj.END_YMD+' '+obj.END_H24+'</td>';
//		str += '		</tr>';
//		str += '	</tbody>';
//		str += '	</table>';
//		str += '	<!-- //관리항목(상세)⑧ : end -->';
//	}
//	str += '</div><!-- //tooltip_content : end -->';
//	str += '<div class="tooltip2_close"><!-- tooltip_close : start -->';
//	str += '	<button type="button" onclick="javascript:_VIEW_POPUP.hidePopup(0);" ><img src="/contents/images/btn_tooltip_close.gif" alt="툴팁닫기" /></button>';
//	str += '</div><!-- //tooltip_close : end -->';
//	str += '</div><!-- //tooltip : end -->';
//	str += '<!-- //교통안전정보 : end -->';
//	str += '<div class="arrow_tsdms" style="text-align: center;"><img src="/contents/images/arrow_tooltip.png" alt="" /></div>';
//	return str;
//}
//
//function RotaJayworking() {
//	this.jayworkingList = [];
//	this.layer;
//	this.minlevel = 6;
//	this.maxlevel = 8;
//	this.setLayer = function(a) {
//		this.layer = a;
//	};
//	this.popupJayworking = function(f, h, c) {
//		var b = null;
//		for ( var g = 0; g < this.jayworkingList.length; g++) {
//			var d = this.jayworkingList[g];
//			if (d.object_id == f) {
//				b = d;
//			}
//		}
//		if (b == null) {
//			return;
//		}
//		var e = b.jaytitle;
//		var a = "";
//		a = this.getJayworkingHTML(b, e, c);
//		jayworkingPopup.displayPopup(true, h, a);
//		return;
//	};
//	this.hideJayworking = function() {
//		if (this.layer != null) {
//			this.layer.setVisibility(false);
//		}
//	};
//	this.displayJayworking = function() {
//		if (!this.layer.visible) {
//			return;
//		}
//		if (map.zoom <= this.minlevel) {
//			return;
//		}
//		this.layer.clearMarkers();
//		var b = this.jayworkingList.length;
//		var c = map.getExtent();
//		var iconTypeLocal ;
//		for ( var d = 0; d < b; d++) {
//			var e = this.jayworkingList[d];
//			var a = e.coordx;
//			var g = e.coordy;
//			var f = Mando.wgs84ToMandoMap(a, g);
//			if (!c.containsLonLat(f)) {
//				continue;
//			}
//			if (e.type == "1") {
//				iconTypeLocal = IconType.IconDeathAccident_01;
//			} else  if (e.type == "2") {
//				iconTypeLocal = IconType.IconDeathAccident_02;
//			} else  if (e.type == "3") {
//				iconTypeLocal = IconType.IconDeathAccident_03;
//			} else  if (e.type == "4") {
//				iconTypeLocal = IconType.IconDeathAccident_04;
//			} else  if (e.type == "5") {
//				iconTypeLocal = IconType.IconDeathAccident_05;
//			} else {
//				iconTypeLocal = IconType.IconDeathAccident_01;
//			}
//			addMarker(f.lon, f.lat, null, iconTypeLocal, null, e.object_id, true, this.layer);
//		}
//		this.layer.setVisibility(true);
//	};
//
//	this.loadJayworking = function() {
//		this.loadJayworkingType( "" );
//	};
//
//	this.loadJayworkingType = function( acciType ) {
//		if (this.layer == null) {
//			return;
//		}
//		var a = "./../map/jayworkingdeathaccident.do?type=" + acciType ;
//		var b=this;
//		$.ajax({url:a, dataType:"json", async:false,
//			success:function(c){
//				b.jayworkingList=c;
//				b.displayJayworking();
//			},
//			error:function(e,c,d){
//				alert(e.status);
//				alert(d);
//			}
//		});
//	};
//	this.getJayworkingHTML=function(b,d,c){
//		var e="construction";
//		var f;
//		if(c==IconType.IconDeathIncident){
//			e="jaywork";
//			f="무단횡단사망 사고";
//		} else if(c==IconType.IconDeathAccident_01){
//			e="death_01";
//			f="무단횡단사망 사고";
//		} else if(c==IconType.IconDeathAccident_02){
//			e="death_02";
//			f="보행 노인 사고";
//		} else if(c==IconType.IconDeathAccident_03){
//			e="death_03";
//			f="보행 어린이 사고";
//		} else if(c==IconType.IconDeathAccident_04){
//			e="death_04";
//			f="스쿨존내 어린이 사고";
//		} else if(c==IconType.IconDeathAccident_05){
//			e="death_05";
//			f="자전거 사고";
//		} else if(c==IconType.IconJayworking){
//			e="jaywork";
//			f="무단횡단사고";
//		}
//
//		var spotNameDesc = b.spotname;
//		if( spotNameDesc.length > 16 ) {
//			spotNameDesc = spotNameDesc.substring(0, 15) + " ..." ;
//		}
//		var a='<div class="popState"> <div class="shad"><span class="close"><a onclick="javascript:jayworkingPopup.hidePopup();"><img src="./../contents/images/map/btn_clse01.gif" alt="닫기" /></a></span>';
//		a += '<dl class="'+e+'"> <dt title="' + b.spotname + '"><nobr>'+ spotNameDesc +'</nobr></dt> <dd class="nm">' + f + "</dd>";
//		a += "<dd>건수 : <strong>"+b.occurred_cnt + " 건 </strong></dd>";
//		a += '<dd>사망 : <strong class="rred">'+b.death_cnt+' 명 </strong> 중상 : <strong class="lblue">'+b.slander_cnt+' 명 </strong> 경상 : <strong class="rblue">'+b.injured_cnt+' 명 </strong></dd> </dl> </div> <p class="arrow"><img src="./../contents/images/map/bg_arrow_vi.png" alt="" /></p> </div>';
//		return a;
//	};
//}
//

function Traffic() {
	this.getTrafficGrade = function(grade) {
		if (grade == "01") {
			return '<strong class="traffic_green">원활</strong>';
		} else if (grade == "02") {
			return '<strong class="traffic_yellow">서행</strong>';
		} else if (grade == "03") {
			return '<strong class="traffic_red">지체</strong>';
		} else {
			return '<strong class="traffic_gray">없음</strong>' ;
		}
	};
	this.getSpeed = function(speed) {
		if (speed == 0) {
			return "";
		}
		//return "속도:" + speed + "Km/h"
		return speed + "Km/h";
	};
	this.getRoadLen = function(len) {
		if (len == 0) {
			return "";
		}
		if (len > 1000) {
			return (len / 1000).toFixed(2) + "km";
		} else {
			return len + "m";
		}
	};
	this.getLinkVertex = function(id, level) {
		if (!level) {
			level = map.zoom + 1;
		}
		var url = "./../map/getproxy.do";
		$.post(url, {
			url : "http://61.108.209.20:8900/rota",
			operation : "GetLinkVertex",
			level : level,
			linkid : id
		}, function(data) {
			if (data == null || data == "") {
				return;
			}
			var lay = getLayer("LinkVector");
			lay.destroyFeatures();
			var wktObj = eval("(" + data + ")");
			var wkt = new UTISMap.Format.WKT();
			var polyElem = [];
			for ( var i = 0; i < wktObj.length; i++) {
				var pol = wkt.read(wktObj[i].geometry);
				polyElem.push(pol.geometry);
			}
			var mPoly = new UTISMap.Geometry.MultiPolygon(polyElem);
			var bound = mPoly.getBounds();
			bound.left -= bound.getWidth() / 4;
			bound.right += bound.getWidth() / 4;
			bound.bottom -= bound.getHeight() / 4;
			bound.top += bound.getHeight() / 4;
			map.zoomToExtent(bound);
			if (map.zoom > 7) {
				map.zoomTo(7);
				level = map.zoom + 1;
			}
			$.post(url, {
				url : "http://61.108.209.20:8900/rota",
				operation : "GetLinkVertex",
				level : level,
				linkid : id
			}, function(data) {
				if (data == null || data == "") {
					return;
				}
				var wktObj = eval("(" + data + ")");
				var wkt = new UTISMap.Format.WKT();
				var polyElem = [];
				for ( var i = 0; i < wktObj.length; i++) {
					var pol = wkt.read(wktObj[i].geometry);
					polyElem.push(pol.geometry);
				}
				var mPoly = new UTISMap.Geometry.MultiPolygon(polyElem);
				var polygonFeature = new UTISMap.Feature.Vector(mPoly, null, sketchSymbolizers.Link);
				var lay = getLayer("LinkVector");
				lay.addFeatures([ polygonFeature ]);
				var center = polygonFeature.geometry.getCentroid();
				map.setCenter(new UTISMap.LonLat(center.x, center.y));
			});
		});
	};
	this.clearNode = function() {
		if (!map) {
			return;
		}
		var lay = getLayer("NodeIcon");
		if (lay) {
			lay.clearMarkers();
		}
	};
	this.displayNode = function(nodes, roadrank, viewlevel, mapfix) {
//		var lay = getLayer("NodeIcon");
//		if (lay) {
//			lay.clearMarkers();
//		}
		//var bound = new UTISMap.Bounds();

		var maxX = 0;
		var maxY = 0;

		var minX = 0;
		var minY = 0;


		var len = nodes.length;
		var downnode = [];
		for (var i = 0; i < len; i++) {
			var node = nodes[i];
			var x = node.x;
			var y = node.y;
//			var newpt = Mando.wgs84ToMandoMap(x, y);
//			bound.extend(new UTISMap.LonLat(newpt.lon, newpt.lat));
//			addMarker(newpt.lon, newpt.lat, null, IconType.IconNode, node.name, null, true, lay);

			if(maxX < x)
				maxX = x;
			if(maxY < y)
				maxY = y;

			if(minX == 0)
				minX = x;
			else if(minX > x)
				minX = x;

			if(minY == 0)
				minY = y;
			else if(minY > y)
				minY = y;
			addMarker(x, y, null, IconType.IconNode, node.name, null, true);
			if (node.dir == "1") {
				downnode.push(node);
			}
		}
		var node = downnode[0];
		if (!node) {
			return;
		}
		var x = node.x;
		var y = node.y;
//		var newpt = Mando.wgs84ToMandoMap(x, y);
//		addMarker(newpt.lon, newpt.lat, null, IconType.IconStartFlag.clone(), node.name, null, true, lay);
		addMarker(x, y, null, IconType.IconStartFlag, node.name, null, true);

		node = downnode[downnode.length - 1];
		x = node.x;
		y = node.y;
//		newpt = Mando.wgs84ToMandoMap(x, y);
//		addMarker(newpt.lon, newpt.lat, null, IconType.IconEndFlag.clone(),	node.name, null, true, lay);
		addMarker(x, y, null, IconType.IconEndFlag,	node.name, null, true);

		var buffer = 3;
//		bound.left -= bound.getWidth() / buffer;
//		bound.right += bound.getWidth() / buffer;
//		bound.bottom -= bound.getHeight() / buffer;
//		bound.top += bound.getHeight() / buffer;

//		if (mapfix) {
//			return;
//		}
//		map.zoomToExtent(bound, true);

		var sw = new daum.maps.LatLng(maxY, minX),
			ne = new daum.maps.LatLng(minY, maxX);

		var bound = new daum.maps.LatLngBounds(sw, ne);
		map.setBounds(bound);

		return;
	};
	this.findRouteNode = function(type, lonlat, netwrkRoute) {
		var wgs84Lonlat = Mando.mandoMapTowgs84(lonlat.lon, lonlat.lat);
		var url = "./../map/nearestnode.do?lon=" + wgs84Lonlat.lon + "&lat=" + wgs84Lonlat.lat;
		var obj = this;
		$.get(url, function(data) {
			if (data == null || data == "") {
				return;
			}
			var elem = eval("(" + data + ")");
			if (!elem || elem == "" || elem.length < 1) {
				return;
			}
			var nodename = elem[0].nodename;
			if (nodename.length > 7) {
				nodename = nodename.substring(0, 7) + "...";
			}
			if (type == "start") {
				$("#txtStartNode").val(elem[0].nodename);
				$("#hStartNode").val(elem[0].nodeid);
				$("#spanStartNode").html(nodename);
				netwrkRoute.startCoord = wgs84Lonlat;
				netwrkRoute.startNodeName = elem[0].nodename;
				$("#imgStartFlag").attr("src", "/contents/images/ico_departure.png");
			} else if (type == "end") {
				$("#txtEndNode").val(elem[0].nodename);
				$("#hEndNode").val(elem[0].nodeid);
				$("#spanEndNode").html(nodename);
				netwrkRoute.endCoord = wgs84Lonlat;
				netwrkRoute.endNodeName = elem[0].nodename;
				$("#imgEndFlag").attr("src", "/contents/images/ico_arrival.png");
			} else if (type == "via") {
				$("#txtViaNode").val(elem[0].nodename);
				$("#hViaNode").val(elem[0].nodeid);
				$("#spanViaNode").html(nodename);
				netwrkRoute.viaCoord = wgs84Lonlat;
				netwrkRoute.viaNodeName = elem[0].nodename;
				$("#imgViaFlag").attr("src", "/contents/images/ico_through.png");
			}
			if (isReadySearchNetwork()) {
				searchNetwork();
			} else {
				$("#ifrmNetwork").contents().find("#divNetworkList").show();
				$("#ifrmNetwork").contents().find("#divNetworkResult").hide();
			}
		});
	};
	this.showRoadInfo = function(area, roadname, viewlevel, linklevel, roadrank, adminlocal, admincity, admincode) {
		gotoTrafficMenu();
		var url;
		if (roadrank == "101" && roadname.indexOf("고속도로") > -1) {
			area = "";
			url = "./../traffic/traffichighway.do?roadName="
				+ encodeURIComponent(roadname) + "&area=" + admincode
				+ "&roadrank=" + roadrank;
		} else if (adminlocal.indexOf("특별시") > -1
					|| adminlocal.indexOf("광역시") > -1
					|| adminlocal.indexOf("자치도") > -1 || admincode == '100'
					|| admincode == '130' || admincode == '150'
					|| admincode == '161' || admincode == '175'
					|| admincode == '183' || admincode == '192'
					|| admincode == '405') {
			url = "./../traffic/traffic.do?roadName="
				+ encodeURIComponent(roadname) + "&area=" + admincode
				+ "&roadrank=" + roadrank;
		} else {
			url = "./../traffic/trafficlocal.do?roadName="
				+ encodeURIComponent(roadname) + "&area=" + admincode
				+ "&roadrank=" + roadrank;
		}
		parent.trafficPopup.hidePopup();
		toggleTrafficSubMenu(1);
		document.getElementById("ifrmTraffic").src = url;
	};
	this.getLinkInfo = function(evt) {
		var lay = getLayer("linkMap");
		if (lay.visibility == false) {
			return
		}
		var level = map.zoom + 1;
		var lonlat = map.getLonLatFromViewPortPx(evt.xy);
		var url = "./../map/getproxy.do?url=http://61.108.209.20:8900/rota&operation=GetTrafficInfo&level="
				+ level + "&lonlat=" + lonlat.lon + "," + lonlat.lat;
		if (level > 9) {
			evt.xy.x += 4;
			var lonlat2 = map.getLonLatFromViewPortPx(evt.xy);
			var distance = Math.abs(lonlat.lon - lonlat2.lon);
			url = "./../map/getproxy.do?url=http://61.108.209.20:8900/rota&operation=GetTrafficInfo&level="
					+ level
					+ "&lonlat="
					+ lonlat.lon
					+ ","
					+ lonlat.lat
					+ "&distance=" + distance;
		}
		var obj = this;
		var elem;
		$.get(url, function(data) {
			if (data == null || data == "") {
				return;
			}
			elem = eval("(" + data + ")");
			if (!elem || elem == "") {
				return;
			}
			if (g_main) {
				var popupScript = obj.getTrafficPopupScript(elem);
				trafficPopup.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), popupScript);
				return;
			}
			var url2 = "./../traffic/trafficRoadFromMap.do?linkid=" + elem.id;
			$.ajax({
				url : url2,
				dataType : "json",
				async : true,
				success : function(elem2) {
					var viewlevel = elem2[0].linklevel;
					var roadrank = elem2[0].roadrank;
					var linklevel = elem2[0].linklevel;
					var adminlocal = elem2[0].adminlocal;
					var admincity = elem2[0].admincity;
					var admincode = elem2[0].admincode;
					var popupScript = obj.getTrafficPopupScript(elem, viewlevel, linklevel, roadrank, adminlocal, admincity, admincode);
					trafficPopup.displayPopup(true, new UTISMap.LonLat(lonlat.lon, lonlat.lat), popupScript);
				}
			});
		});
	};
	this.getTrafficPopupScript = function(elem, viewlevel, linklevel, roadrank,	adminlocal, admincity, admincode) {
		var script = '<div id="tooltip" style="width:281px"><div id="tooltip_header"><h1>';
		script	+= elem.roadname;
		script += '<span style="color:#d21400; margin-left:2px;" >[제한'+ elem.maxSpeed +'Km/h]</span>';
		/*if (g_main || g_menu == 'telMap' || g_menu == 'trafficInsert') {
			script += elem.roadname;
		} else {
			script += elem.roadname
					+ ' <a href="javascript:traffic.showRoadInfo(\''
					+ elem.id + "','" + elem.roadname + "','" + viewlevel
					+ "','" + linklevel + "','" + elem.roadrank + "','" + adminlocal
					+ "','" + admincity + "','" + elem.admincode
					+ "')\"><span class='t_blue'>[자세히 보기]</span></a>";
		}*/
		script += '</h1></div><div id="tooltip_content"><ul><li style="height:15px;overflow:hidden"><strong class="label hidden">노드명</strong>'+ elem.fromnode + '~' + elem.tonode + '</li><li>'
			+ '<strong class="label">구간길이</strong> : ' + this.getRoadLen(elem.len) + ' |'
			+ '<strong class="label hidden">소통정보</strong> ' + this.getTrafficGrade(elem.grade) + ' | '
			+ '<strong class="label">속도</strong> : ' + this.getSpeed(elem.speed)
			+ '</li></ul></div>'
			+ '<div class="tooltip_close"><button type="button" onclick="javascript:trafficPopup.hidePopup()"><img src="/contents/images/btn_tooltip_close.gif" alt="툴팁닫기" /></button></div>'
			+ '<p class="arrow"><img src="/contents/images/arrow_tooltip.png" alt="" /></p></div>';
		return script;
	};

	this.getTooltipInfo = function(text) {
		var html = '<table border="0" cellspacing="0" cellpadding="0"><tr><td width="1" height="1"></td><td bgcolor="#960606"></td><td width="1" height="1"></td></tr><tr><td bgcolor="#960606"></td><td><table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td bgcolor="#960606"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td height="20"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td style="padding:3px 3px 3px 3px;color:#ffffff;font-weight:bold;font-size:11px;">'
				+ text
				+ '</td></tr></table></td></tr></table></td></tr></table></td><td bgcolor="#960606"></td></tr><tr><td width="1" height="1"></td><td bgcolor="#960606"></td><td width="1" height="1"></td></tr></table>';
		return html;
	};
}
//function RotaRouteSearch() {
//	this.mode = "off";
//	this.isStart;
//	this.isEnd;
//	this.iconW = window.IconType.IconStart.offset.x;
//	this.iconHMargin = 0;
//	this.iconH = window.IconType.IconEnd.offset.y;
//	this.left;
//	this.top;
//	this.startFlag;
//	this.viaFlag;
//	this.endFlag;
//	this.moving;
//	this.startNodeName;
//	this.viaNodeName;
//	this.endNodeName;
//	this.startCoord;
//	this.endCoord;
//	this.viaCoord;
//	this.result = null;
//	this.lay = getLayer("FastIcon");
//	this.RC = [];
//	this.RC.push("안내 없음");
//	this.RC.push("터널 지점");
//	this.RC.push("지하도 지점");
//	this.RC.push("고가도로 지점");
//	this.RC.push("좌측으로 고속도로 진출 지점");
//	this.RC.push("우측으로 고속도로 진출 지점");
//	this.RC.push("직진하여 고속도로 진출 지점");
//	this.RC.push("램프를 통하여 고속도로로 진입 지점");
//	this.RC.push("톨게이트를 이용하여 고속도로 진입 지점");
//	this.RC.push("회전교차로 진출 지점");
//	this.RC.push("회전교차로 진입 지점");
//	this.RC.push("Ferry 진입지점");
//	this.RC.push("Ferry 진출 지점");
//	this.RC.push("목적지 / 출발지 지점");
//	this.RC.push("경유지 지점");
//	this.DC = [];
//	this.DC[0] = "안내업음";
//	this.DC[11] = "직진";
//	this.DC[12] = "좌회전";
//	this.DC[13] = "우회전";
//	this.DC[14] = "U턴";
//	this.DC[15] = "P턴";
//	this.DC[16] = "8시방향좌회전";
//	this.DC[17] = "10시방향좌회전";
//	this.DC[18] = "2시방향우회전";
//	this.DC[19] = "4시방향우회전";
//	this.DC[20] = "7시방향좌회전";
//	this.DC[21] = "5시방향우회전";
//	this.DC[22] = "우측";
//	this.DC[23] = "좌측";
//	this.DC[24] = "지하차도로진입";
//	this.DC[25] = "고가도로로진입(오른쪽)";
//	this.DC[26] = "고가도로로진입";
//	this.DC[27] = "고가도로로진입(오른쪽)";
//	this.DC[28] = "고가도로로진입(가운데)";
//	this.DC[29] = "터널로진입";
//	this.DC[30] = "교량으로진입";
//	this.DC[34] = "지하차도옆길(오른쪽)";
//	this.DC[35] = "지하차도옆길(왼쪽)";
//	this.DC[36] = "고가차도옆길";
//	this.DC[37] = "왼쪽고가차도옆길";
//	this.DC[38] = "도시고속도로직진";
//	this.DC[39] = "고속도로직진";
//	this.DC[40] = "고속도로휴게소출현";
//	this.DC[41] = "고속도로터널출현";
//	this.DC[42] = "고속도로톨게이트출현";
//	this.DC[43] = "직진방향도시고속도로진입";
//	this.DC[44] = "왼쪽방향도시고속도로진입";
//	this.DC[45] = "오른쪽방향도시고속도로진출";
//	this.DC[46] = "직진방향도시고속도로진출";
//	this.DC[47] = "왼쪽방향도시고속도로진출";
//	this.DC[48] = "오른쪽방향도시고속도로진출";
//	this.DC[49] = "직진방향고속도로진입";
//	this.DC[50] = "왼쪽방향고속도로진입";
//	this.DC[51] = "오른쪽방향고속도로진입";
//	this.DC[52] = "직진방향고속도로진출";
//	this.DC[53] = "왼쪽방향고속도로진출";
//	this.DC[54] = "오른쪽빙행고속도로진출";
//	this.init = function() {
//		$("#imgStartFlag").bind("click", {
//			obj : this
//		}, this.setStartFlag);
//		$("#imgEndFlag").bind("click", {
//			obj : this
//		}, this.setEndFlag);
//		$("#imgViaFlag").bind("click", {
//			obj : this
//		}, this.setViaFlag);
//		$("#div_start_flag").bind("mouseup", {
//			obj : this
//		}, this.setStartFlag);
//		$("#div_end_flag").bind("mousedown", {
//			obj : this
//		}, this.setEndFlag);
//		$("#div_via_flag").bind("mousedown", {
//			obj : this
//		}, this.setViaFlag);
//		var obj = this;
//		$("#networkSearchIcon").bind("mouseup", function(evt) {
//			obj.mouseup(evt);
//		});
//		$("#networkSearchIcon").bind("mousemove", function(evt) {
//			obj.mousemove(evt);
//		});
//		$("#div_start_flag").bind("mouseup", function(evt) {
//			obj.mouseup(evt);
//		});
//		$("#div_start_flag").bind("mousemove", function(evt) {
//			obj.mousemove(evt);
//		});
//		$("#div_end_flag").bind("mouseup", function(evt) {
//			obj.mouseup(evt);
//		});
//		$("#div_end_flag").bind("mousemove", function(evt) {
//			obj.mousemove(evt);
//		});
//		$("#div_via_flag").bind("mouseup", function(evt) {
//			obj.mouseup(evt);
//		});
//		$("#div_via_flag").bind("mousemove", function(evt) {
//			obj.mousemove(evt);
//		});
//		$("#aMap").bind("mousemove", function(event) {
//			obj.mousemove(event);
//		});
//	};
//	this.setStartFlag = function(evt) {
//		var obj = evt.data.obj;
//		obj.left = window.mapLeft - obj.iconW;
//		obj.top = window.mapTop - obj.iconH;
//		obj.mode = "start";
//		obj.isStart = "off";
//		obj.x = evt.x;
//		obj.y = evt.y;
//		if (obj.startFlag) {
//			obj.lay.removeMarker(obj.startFlag);
//			obj.startFlag = null;
//		}
//		$("#div_start_flag").css({
//			left : (evt.clientX - obj.left) + "px",
//			top : evt.clientY - obj.top + "px"
//		});
//		$("#div_start_flag").show();
//	};
//	this.setViaFlag = function(evt) {
//		var obj = evt.data.obj;
//		obj.left = window.mapLeft - obj.iconW;
//		obj.top = window.mapTop - obj.iconH;
//		obj.mode = "via";
//		obj.isStart = "off";
//		if (obj.viaFlag) {
//			obj.lay.removeMarker(obj.viaFlag);
//			obj.viaFlag = null;
//		}
//		$("#div_via_flag").css({
//			left : (evt.clientX - obj.left) + "px",
//			top : evt.clientY - obj.top + "px"
//		});
//		$("#div_via_flag").show();
//	};
//	this.setEndFlag = function(evt) {
//		var obj = evt.data.obj;
//		obj.left = window.mapLeft - obj.iconW;
//		obj.top = window.mapTop - obj.iconH;
//		obj.mode = "end";
//		obj.isStart = "off";
//		if (obj.endFlag) {
//			obj.lay.removeMarker(obj.endFlag);
//			obj.endFlag = null;
//		}
//		$("#div_end_flag").css({
//			left : (evt.clientX - obj.left) + "px",
//			top : evt.clientY - obj.top + "px"
//		});
//		$("#div_end_flag").show();
//	};
//	this.mouseup = function(evt) {
//		$("#div_end_flag").hide();
//		$("#div_start_flag").hide();
//		$("#div_via_flag").hide();
//		this.moving = false;
//		if (this.mode == "start") {
//			this.mode = "off";
//			this.isStart = "on";
//			var x = evt.clientX - window.mapLeft;
//			var y = evt.clientY - window.mapTop - window.mapMenuH;
//			var lonlat = map.getLonLatFromViewPortPx(new UTISMap.Pixel(x, y));
//			if (this.startFlag) {
//				this.lay.removeMarker(this.startFlag);
//			}
//			var marker = new UTISMap.Marker(lonlat, IconType.IconStart.clone());
//			marker.icon.imageDiv.style.cursor = "hand";
//			this.startFlag = marker;
//			this.lay.addMarker(marker);
//			var obj = this;
//			marker.events.register("click", marker, function(evt) {
//				obj.moving = true;
//				obj.left = window.mapLeft - obj.iconW;
//				obj.top = window.mapTop - obj.iconH;
//				obj.mode = "start";
//				obj.isStart = "off";
//				if (obj.startFlag) {
//					obj.lay.removeMarker(obj.startFlag);
//					obj.startFlag = null;
//				}
//				$("#div_start_flag").css({
//					left : (evt.clientX - obj.left) + "px",
//					top : evt.clientY - obj.top + "px"
//				});
//				$("#div_start_flag").show();
//			});
//			traffic.findRouteNode("start", lonlat, this);
//		} else if (this.mode == "end") {
//			this.mode = "off";
//			this.isEnd = "on";
//			var x = evt.clientX - window.mapLeft;
//			var y = evt.clientY - window.mapTop - window.mapMenuH;
//			var lonlat = map.getLonLatFromViewPortPx(new UTISMap.Pixel(x, y));
//			if (this.endFlag) {
//				this.lay.removeMarker(this.endFlag);
//			}
//			var marker = new UTISMap.Marker(lonlat, IconType.IconEnd.clone());
//			marker.icon.imageDiv.style.cursor = "hand";
//			this.endFlag = marker;
//			this.lay.addMarker(marker);
//			var obj = this;
//			marker.events.register("click", marker, function(evt) {
//				obj.moving = true;
//				obj.left = window.mapLeft - obj.iconW;
//				obj.top = window.mapTop - obj.iconH;
//				obj.mode = "end";
//				obj.isStart = "off";
//				if (obj.endFlag) {
//					obj.lay.removeMarker(obj.endFlag);
//					obj.endFlag = null;
//				}
//				$("#div_end_flag").css({
//					left : (evt.clientX - obj.left) + "px",
//					top : evt.clientY - obj.top + "px"
//				});
//				$("#div_end_flag").show();
//			});
//			traffic.findRouteNode("end", lonlat, this);
//		} else if (this.mode == "via") {
//			this.mode = "off";
//			this.isVia = "on";
//			var x = evt.clientX - window.mapLeft;
//			var y = evt.clientY - window.mapTop - window.mapMenuH;
//			var lonlat = map.getLonLatFromViewPortPx(new UTISMap.Pixel(x, y));
//			if (this.viaFlag) {
//				this.lay.removeMarker(this.viaFlag);
//			}
//			var marker = new UTISMap.Marker(lonlat, IconType.IconVia.clone());
//			marker.icon.imageDiv.style.cursor = "hand";
//			this.viaFlag = marker;
//			this.lay.addMarker(marker);
//			var obj = this;
//			marker.events.register("click", marker, function(evt) {
//				obj.moving = true;
//				obj.left = window.mapLeft - obj.iconW;
//				obj.top = window.mapTop - obj.iconH;
//				obj.mode = "via";
//				obj.isStart = "off";
//				if (obj.viaFlag) {
//					obj.lay.removeMarker(obj.viaFlag);
//					obj.viaFlag = null;
//				}
//				$("#div_via_flag").css({
//					left : (evt.clientX - obj.left) + "px",
//					top : evt.clientY - obj.top + "px"
//				});
//				$("#div_via_flag").show();
//			});
//			traffic.findRouteNode("via", lonlat, this);
//		}
//	};
//	this.mousemove = function(evt) {
//		if (this.mode == "start") {
//			$("#div_start_flag").show();
//			$("#div_start_flag").css({
//				left : (evt.clientX - this.left) + "px",
//				top : evt.clientY - this.top + "px"
//			});
//		} else if (this.mode == "end") {
//			$("#div_end_flag").show();
//			$("#div_end_flag").css({
//				left : (evt.clientX - this.left) + "px",
//				top : evt.clientY - this.top + "px"
//			});
//		} else if (this.mode == "via") {
//			$("#div_via_flag").show();
//			$("#div_via_flag").css({
//				left : (evt.clientX - this.left) + "px",
//				top : evt.clientY - this.top + "px"
//			});
//		}
//	};
//	this.getSpeed = function(speed) {
//		if (speed == 0) {
//			return "";
//		}
//		return speed + "Km/h";
//	};
//	this.getTravelTime = function(time) {
//		if (time == 0) {
//			return "";
//		}
//		if (time >= 60 && time < 3600) {
//			return (time / 60).toFixed(0) + "분" + time % (60) + "초";
//		} else if(time > 3600){
//			var timeTemp = time % 3600;
//			if(timeTemp > 60){
//				return (time / 3600).toFixed(0) + "시간 " + (timeTemp / 60).toFixed(0) + "분 " + timeTemp % (60) + "초";
//			}else{
//				return (time / 3600).toFixed(0) + "시간 " + timeTemp + "분 ";
//			}
//		} else {
//			return (time).toFixed(0) + "초";
//		}
//	};
//	this.getTravelTime2 = function(time) {
//		if (time == 0) {
//			return "";
//		}
//		time = Math.round(time / 60);
//		if (time >= 60) {
//			return (time / 60).toFixed(0) + "시간" + time % (60) + "분";
//		} else {
//			return (time).toFixed(0) + "분";
//		}
//	};
//	this.setSearchResultNode = function(type, nodeid, nodename, x, y) {
//		var level = map.zoom;
//		var lonlat = Mando.wgs84ToMandoMap(x, y);
//		var x2 = lonlat.lon;
//		var y2 = lonlat.lat;
//		var lay = getLayer("FastIcon");
//		var spannodename = nodename;
//		if (spannodename.length > 7) {
//			spannodename = spannodename.substring(0, 7) + "...";
//		}
//		if (type == "start") {
//			this.startNodeId = nodeid;
//			$("#txtStartNode").val(nodename);
//			$("#hStartNode").val(nodeid);
//			$("#spanStartNode").html(spannodename);
//			this.startNodeName = nodename;
//			this.startCoord = {
//				lon : x,
//				lat : y
//			};
//			if (this.startFlag) {
//				lay.removeMarker(this.startFlag);
//			}
//			var marker = new UTISMap.Marker(lonlat, IconType.IconStart.clone());
//			this.startFlag = marker;
//			var obj = this;
//			marker.events.register("click", marker, function(evt) {
//				obj.moving = true;
//				obj.left = window.mapLeft - obj.iconW;
//				obj.top = window.mapTop - obj.iconH;
//				obj.mode = "start";
//				obj.isStart = "off";
//				if (obj.startFlag) {
//					obj.lay.removeMarker(obj.startFlag);
//					obj.startFlag = null;
//				}
//				$("#div_start_flag").css({
//					left : (evt.clientX - obj.left) + "px",
//					top : evt.clientY - obj.top + "px"
//				});
//				$("#div_start_flag").show();
//			});
//			lay.addMarker(marker);
//			$("#imgStartFlag").attr("src", "/contents/images/ico_departure.png");
//		} else if (type == "end") {
//			this.endNodeId = nodeid;
//			$("#txtEndNode").val(nodename);
//			$("#hEndNode").val(nodeid);
//			$("#spanEndNode").html(spannodename);
//			this.endNodeName = nodename;
//			this.endCoord = {
//				lon : x,
//				lat : y
//			};
//			if (this.endFlag) {
//				lay.removeMarker(this.endFlag);
//			}
//			var marker = new UTISMap.Marker(lonlat, IconType.IconEnd.clone());
//			this.endFlag = marker;
//			var obj = this;
//			marker.events.register("click", marker, function(evt) {
//				obj.moving = true;
//				obj.left = window.mapLeft - obj.iconW;
//				obj.top = window.mapTop - obj.iconH;
//				obj.mode = "end";
//				obj.isStart = "off";
//				if (obj.endFlag) {
//					obj.lay.removeMarker(obj.endFlag);
//					obj.endFlag = null;
//				}
//				$("#div_end_flag").css({
//					left : (evt.clientX - obj.left) + "px",
//					top : evt.clientY - obj.top + "px"
//				});
//				$("#div_end_flag").show();
//			});
//			lay.addMarker(marker);
//			$("#imgEndFlag").attr("src", "/contents/images/ico_arrival.png");
//		} else if (type == "via") {
//			this.viaNodeId = nodeid;
//			$("#txtViaNode").val(nodename);
//			$("#hViaNode").val(nodeid);
//			$("#spanViaNode").html(spannodename);
//			this.viaNodeName = nodename;
//			this.viaCoord = {
//				lon : x,
//				lat : y
//			};
//			if (this.viaFlag) {
//				lay.removeMarker(this.viaFlag);
//			}
//			var marker = new UTISMap.Marker(lonlat, IconType.IconVia.clone());
//			this.viaFlag = marker;
//			var obj = this;
//			marker.events.register("click", marker, function(evt) {
//				obj.moving = true;
//				obj.left = window.mapLeft - obj.iconW;
//				obj.top = window.mapTop - obj.iconH;
//				obj.mode = "via";
//				obj.isStart = "off";
//				if (obj.viaFlag) {
//					obj.lay.removeMarker(obj.viaFlag);
//					obj.viaFlag = null;
//				}
//				$("#div_via_flag").css({
//					left : (evt.clientX - obj.left) + "px",
//					top : evt.clientY - obj.top + "px"
//				});
//				$("#div_via_flag").show();
//			});
//			lay.addMarker(marker);
//			$("#imgViaFlag").attr("src", "/contents/images/ico_through.png");
//		}
//		gotoMap(x2, y2, level);
//	};
//	this.getTrafficGrade = function(grade) {
//		if (grade == 1) {
//			return '<b class="traffic_green">[원활]</b>';
//		} else if (grade == 2) {
//			return '<b class="traffic_yellow">[서행]</b>';
//		} else if (grade == 3) {
//			return '<b class="traffic_red">[정체]</b>';
//		} else {
//			return '<b class="traffic_gray">[정보없음]</b>';
//		}
//	};
//	this.getTrafficGradeStyle = function(grade) {
//		if (grade == 1) {
//			return TrafficGrade.TgHigh;
//		} else if (grade == 2) {
//			return TrafficGrade.TgMid;
//		} else if (grade == 3) {
//			return TrafficGrade.TgLow;
//		} else {
//			return TrafficGrade.TgNone;
//		}
//	};
//	this.getStartNodeHtml = function(elem, index) {
//		var x = elem.x;
//		var y = elem.y;
//		var nodename = this.startNodeName;
//		var html = '<ol class="route_detail"><li><div class="point"><div class="box">출발지</div>'
//			+ '<div class="title">'
//			+ '<span class="num1"><em>1</em></span>'
//			+ '<span class="name"><a href="javascript:parent.gotoNetwork('+ x + ","+ y+ ')">' + nodename + '</a></span>'
//			+ '</div></div></li>';
//		return html;
//	};
//	this.getCodeDescription = function(code) {
//		return this.DC[parseInt(code)];
//	};
//	this.getViaNodeHtml = function(elem, pelem, index) {
//
//		var x = elem.x;
//		var y = elem.y;
//		var nodename = elem.nodename;
//		var grade = elem.trafficgrade;
//		var time = elem.time;
//		var info = elem.info;
//
//		var dist = traffic.getRoadLen(pelem.dist);
//		var dc = elem.dircode;
//		var d = elem.dist - pelem.dist;
//		var speed = ((d / 1000) / (time / 60 / 60)).toFixed(0);
//		if (time == 0) {
//			speed = "-";
//		} else {
//			speed += "km/h ";
//		}
//		var desc = this.getCodeDescription(dc);
//
//		if (info == 15) {
//			desc = "경유";
//			$("#txtViaNode").val(nodename);
//			$("#hViaNode").val("a");
//			this.viaNodeName = nodename;
//			if (nodename.length > 7) {
//				nodename = nodename.substring(0, 7) + "...";
//			}
//			$("#spanViaNode").html(nodename);
//		}
//		var html = "";
//		if(dc == '207'){
//			html = '<li><div class="point"><div class="box">경유지</div>'
//				+ '<div class="title">'
//				+ '<span class="num1"><em>' + index + '</em></span>'
//				+ '<span class="name"><a href="javascript:parent.gotoNetwork('+ x + ","+ y+ ')">' + this.viaNodeName + '</a></span>'
//				+ '</div></div></li>';
//		}else{
//			html = '<li><div class="route">'
//				+ '<div class="num"><em>' + index + '</em></div>'
//				+ '<div class="title">'
//				+ '<img src="/contents/images/code_' + dc + '.gif" alt="" />'
//				+ '<span class="name"><a href="javascript:parent.gotoNetwork('+ x + ","+ y+ ')">' + dist + ' ' + this.getTrafficGrade(grade) + '<br />'+ nodename + "에서 " + desc +'</a></span>'
//				+ '</div></div></li>';
//		}
//		return html;
//	};
//	this.getEndNodeHtml = function(elem, pelem, index) {
//		var x = elem.x;
//		var y = elem.y;
//		var nodename = this.endNodeName;
//		var grade = elem.trafficgrade;
//		var time = elem.time - pelem.time;
//		var info = elem.info;
//		var dist = elem.dist - pelem.dist;
//		var dc = elem.dircode;
//		var speed = ((dist / 1000) / (time / 60)).toFixed(0);
//		if (time == 0) {
//			speed = "-";
//		} else {
//			speed += "km/h ";
//		}
//		var desc = this.getCodeDescription(dc);
//		var html = '<li><div class="point"><div class="box">도착지</div>'
//			+ '<div class="title">'
//			+ '<span class="num1"><em>' + index + '</em></span>'
//			+ '<span class="name"><a href="javascript:parent.gotoNetwork('+ x + ","+ y+ ')">' + nodename + '</a></span>'
//			+ '</div></div></li></ol>';
//		return html;
//	};
//	this.drawPath = function(traffic) {//교통정보
//		if (!this.result) {
//			return;
//		}
//		var lay = getLayer("NetworkRoute");
//		lay.destroyFeatures();
//		var objData = this.result;
//		var lineList = objData[0];
//		var nodeList = objData[1];
//		var len = lineList.length;
//		var routeList = [];
//		for(var i = 0; i < len; i++) {
//			var link = lineList[i];
//			var wkt = new UTISMap.Format.WKT();
//			var line = wkt.read(link.geometry);
//			var lineFeature;
//			if (traffic) {
//				var tgStyle = this.getTrafficGradeStyle(link.grade);
//				lineFeature = new UTISMap.Feature.Vector(line.geometry, null, tgStyle);
//			} else {
//				lineFeature = new UTISMap.Feature.Vector(line.geometry, null, sketchSymbolizers.NetworkRoute);
//			}
//			routeList.push(lineFeature);
//		}
//		var a = Mando.wgs84ToMandoMap(this.startCoord.lon, this.startCoord.lat);
//		var b = Mando.wgs84ToMandoMap(this.endCoord.lon, this.endCoord.lat);
//		var ptStart = new UTISMap.Geometry.Point(a.lon, a.lat);
//		var ptEnd = new UTISMap.Geometry.Point(b.lon, b.lat);
//		var ptStart2 = new UTISMap.Geometry.Point(nodeList[0].x, nodeList[0].y);
//		var ptEnd2 = new UTISMap.Geometry.Point(nodeList[nodeList.length - 1].x, nodeList[nodeList.length - 1].y);
//		var lineStart = new UTISMap.Feature.Vector(new UTISMap.Geometry.LineString([ptStart, ptStart2 ]), null, sketchSymbolizers.NetworkRouteDot);
//		var lineEnd = new UTISMap.Feature.Vector(new UTISMap.Geometry.LineString([ptEnd, ptEnd2 ]), null, sketchSymbolizers.NetworkRouteDot);
//		routeList.push(lineStart);
//		routeList.push(lineEnd);
//		lay.addFeatures(routeList, {
//			silent : true
//		});
//	};
//	//경로탐색 검색(신규RP)
//	this.search = function(optimizedSearch) {
//		var url = "./../map/networkroute.do";
//		var obj = this;
//		var ptStr = this.startCoord.lon + "," + this.startCoord.lat;
//		if (this.viaCoord) {
//			ptStr += "|" + this.viaCoord.lon + "," + this.viaCoord.lat;
//		}
//		ptStr += "|" + this.endCoord.lon + "," + this.endCoord.lat;
//		var route = "http://192.168.11.20/route";
//		$.post(url,{
//			url : route,
//			pts : ptStr,
//			optimizedSearch : optimizedSearch
//		},
//		function(data) {
//			if (data == null || data == "") {
//				return;
//			}
//			if (data.startsWith("error")) {
//				var error = data.split("|");
//				alert(error[1]);
//				return;
//			}
//			var lay = getLayer("NodeIcon");
//			lay.clearMarkers();
//			var lay = getLayer("NetworkRoute");
//			lay.destroyFeatures();
//			var objData = eval("(" + data + ")");
//			obj.result = objData;
//			var lineList = objData[0];
//			var nodeList = objData[1];
//			var len = lineList.length;
//			var routeList = [];
//			var tlay = getLayer("linkMap");
//			var isTrafficLayerVisible = tlay.visibility;
//			for ( var i = 0; i < len; i++) {
//				var link = lineList[i];
//				var wkt = new UTISMap.Format.WKT();
//				var line = wkt.read(link.geometry);
//				var lineFeature;
//				if (isTrafficLayerVisible == true) {
//					lineFeature = new UTISMap.Feature.Vector(line.geometry, null, sketchSymbolizers.NetworkRoute);
//				} else {
//					var tgStyle = obj.getTrafficGradeStyle(link.grade);
//					lineFeature = new UTISMap.Feature.Vector(line.geometry, null, tgStyle);
//				}
//				routeList.push(lineFeature);
//			}
//			var a = Mando.wgs84ToMandoMap(obj.startCoord.lon, obj.startCoord.lat);
//			var b = Mando.wgs84ToMandoMap(obj.endCoord.lon, obj.endCoord.lat);
//			var ptStart = new UTISMap.Geometry.Point(a.lon, a.lat);
//			var ptEnd = new UTISMap.Geometry.Point(b.lon, b.lat);
//			var ptStart2 = new UTISMap.Geometry.Point(nodeList[0].x, nodeList[0].y);
//			var ptEnd2 = new UTISMap.Geometry.Point(nodeList[nodeList.length - 1].x, nodeList[nodeList.length - 1].y);
//			var lineStart = new UTISMap.Feature.Vector(new UTISMap.Geometry.LineString([ ptStart, ptStart2 ]), null, sketchSymbolizers.NetworkRouteDot);
//			var lineEnd = new UTISMap.Feature.Vector(new UTISMap.Geometry.LineString([ ptEnd, ptEnd2 ]), null, sketchSymbolizers.NetworkRouteDot);
//			routeList.push(lineStart);
//			routeList.push(lineEnd);
//			lay.addFeatures(routeList, {
//				silent : true
//			});
//			var routeTotalLength = 0;
//			var travelTotalTime = 0;
//			var routeListHtml = [];
//			var layNode = getLayer("NodeIcon");
//			var len = nodeList.length;
//			var pelem = null;
//			for (var i = 0; i < len; i++) {
//				var elem = nodeList[i];
//				var n_name = elem.nodename;
//				if (i == 0) {
//					n_name = "출발지:" + obj.startNodeName;
//				}
//				if (i == len - 1) {
//					n_name = "도착지:" + obj.endNodeName;
//					routeTotalLength = elem.dist;
//					travelTotalTime = elem.time;
//				}
//				var lonlat = new UTISMap.LonLat(elem.x, elem.y);
//				var size = new UTISMap.Size(20, 20);
//				var offset = new UTISMap.Pixel(-size.w / 2,	-size.h / 2);
//				var icon = new UTISMap.Icon("./../contents/images/map/iconnumber/ico_num_" + (i + 1) + ".gif", size, offset);
//				addMarker(lonlat.lon, lonlat.lat, null, icon, n_name, i, false, layNode);
//				if (i == 0) {
//					routeListHtml.push(obj.getStartNodeHtml(elem, i + 1));
//				} else {
//					if (i == len - 1) {
//						routeListHtml.push(obj.getEndNodeHtml(elem, pelem, i + 1));
//					} else {
//						routeListHtml.push(obj.getViaNodeHtml(elem, pelem, i + 1));
//					}
//				}
//				pelem = elem;
//			}
//			$("#ifrmNetwork").contents().find("#root_description").html(routeListHtml.join(""));
//			var networkRouteInfoStr = "<span class='f_l data'>총 거리 : "
//				+ "<strong class='t_red'>" + traffic.getRoadLen(routeTotalLength) + "</strong></span>"
//				+ "<span class='f_r data'>소요 시간 : "
//				+ "<strong class='t_red'>" + obj.getTravelTime(travelTotalTime) + "</strong></span>"
//				+ "<div class='clear'></div>";
//
//			$("#ifrmNetwork").contents().find("#networkRouteInfo").html(networkRouteInfoStr);
//			$("#ifrmNetwork").contents().find("#divNetworkResult").show();
//			$("#ifrmNetwork").contents().find("#divNetworkList").hide();
//			var bound = lay.getDataExtent();
//			bound.left -= bound.getWidth() / 8;
//			bound.right += bound.getWidth() / 8;
//			bound.bottom -= bound.getHeight() / 8;
//			bound.top += bound.getHeight() / 8;
//			map.zoomToExtent(bound);
//		});
//	};
//};

/**************************************************************************************
 * 지도 바운더리 좌표 셋팅
 **************************************************************************************/
/*function boundPoint(){

	var min = map.getLonLatFromViewPortPx(new UTISMap.Pixel(min_x, min_y));
	var max = map.getLonLatFromViewPortPx(new UTISMap.Pixel(max_x, max_y));

	// 노드링크 정보 가져오기 시작
	var minWgs = Mando.mandoMapTowgs84(min.lon, min.lat);
	var maxWgs = Mando.mandoMapTowgs84(max.lon,  max.lat);

	$("#min_x").val(minWgs.lon - 0.01);
 	$("#min_y").val(maxWgs.lat - 0.01);
    $("#max_x").val(maxWgs.lon + 0.01);
    $("#max_y").val(minWgs.lat + 0.01);
}*/

/**************************************************************************************
 * 맵 끝좌표
 **************************************************************************************/
/*function mapBound(){

	var min = map.getLonLatFromViewPortPx(new UTISMap.Pixel(min_x, min_y));
	var max = map.getLonLatFromViewPortPx(new UTISMap.Pixel(max_x, max_y));

	// 노드링크 정보 가져오기 시작
	var minWgs = Mando.mandoMapTowgs84(min.lon, min.lat);
	var maxWgs = Mando.mandoMapTowgs84(max.lon, max.lat);
	var mapZoom = map.zoom;

	//지도이동시 바운더리 바뀔경우
	if(($("#min_x").val() > minWgs.lon) || ($("#min_y").val() > minWgs.lat) || ($("#max_x").val() < maxWgs.lon) || ($("#max_y").val() < maxWgs.lat || mapZoom <= 7)){

		boundPoint();

		a = getLayer("RSE");
		var cctvLayer = getLayer("CCTV");

		if(cctvLayer != null){

			cctvLayer.clearMarkers();
		}

		//돌발초기화
		if(incidentMarkerLayer != null){
			incidentMarkerLayer.clearMarkers();
			incidentVectorLayer.removeAllFeatures();
		}

		var onOff = $("#toggleInCident").attr("class");
		var safeOnOff = $("#btn_safe").attr("class");

		if(onOff == "btn_on"){
			mapViewIncidentList();
		}

		if(roadSafeMarkerLayer != null){
			roadSafeMarkerLayer.clearMarkers();
			roadSafeVectorLayer.removeAllFeatures();
		}

		mapViewRoadSafeList('MAIN');

		if(mapZoom >= 7){
			if(safeOnOff == "btn_on"){
				mapViewRoadSafeList();
			}
		}else{
			if(roadSafeMarkerLayer != null){
				roadSafeMarkerLayer.clearMarkers();
				roadSafeVectorLayer.removeAllFeatures();
			}
		}


		if(mapZoom >= 6){
			if (cctvLayer.visible == true){
				cctv.loadCCTV(true);
			}
		}
	}
}*/

/**************************************************************************************
 * 돌발정보 팝업창 닫기
 **************************************************************************************/
/*function incPopClose() {
	var list = nvl(getCookie("LayerIncidentViewList"), "");
	if(list != ""){
		$("#toggleInCident").attr("class", "btn_on");
		$("#toggleInCident").attr("src", "/contents/images/btn_unexpected_on.gif");
	}else {
		$("#toggleInCident").attr("class", "btn_off");
		$("#toggleInCident").attr("src", "/contents/images/btn_traffic_off.gif");
	}
}*/