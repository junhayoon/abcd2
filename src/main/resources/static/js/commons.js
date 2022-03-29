function showFlashObject(id, width, height, movie, flashvars, style, wmode,	bDisplay) {
	if (wmode == undefined){
		wmode = "transparent";
	}
	var s = '<object id="'
			+ id
			+ '" classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,22,87" width="'
			+ width
			+ '" height="'
			+ height
			+ '" style="'
			+ style
			+ '"><param name="wmode" value="'
			+ wmode
			+ '"/><param name="movie" value="'
			+ movie
			+ '"/><param name="menu" value="false"/><param name="quality" value="high"/><param name="allowfullscreen" value="true"/><param name="allowScriptAccess" value="always"/><param name="play" value="true"/><param name="flashvars" value="'
			+ flashvars
			+ '"/><param name="base" value="."><embed base="." swLiveConnect="true" flashvars="'
			+ flashvars
			+ '" src="'
			+ movie
			+ '" quality="high" bgcolor="" width="'
			+ width
			+ '" height="'
			+ height
			+ '" name="'
			+ id
			+ '" align="left" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" allowfullscreen="true"></embed></object>';
	if (bDisplay == undefined || bDisplay) {
		document.write(s);
	}else{
		return s;
	}
}

function getSubMenuIndex(idx) {
	left.getSubMenuIndex(idx);
}

function getSubMenuPageIndex() {
	return idx;
}

function getCurrentIndex() {
	return subIdx;
}

// 메인로고 클릭시
function onClickTitle() {
	window.location.href = "./../";
}

// 주, 서브메뉴 클릭시
function onClickMenu(url) {
	var current_locate = window.location.href;

	if (current_locate.indexOf('map/map.do') != -1
			&& url.indexOf('map/map.do') != -1) {
		var n = url.indexOf('=');
		showTrafficMenu(url.substr(n + 1, url.length - n));
	} else {
		window.location.href = url;
	}
}

// 메인 지도 펼치기
function wideMap() {
	var d = document.getElementById('contents');
	if (d.style.width == '' || d.style.width == '575px') {
		d.style.width = '760px';
		document.getElementById('leftarea').style.display = 'none';
		document.getElementById('map_area').style.width = '713px';
		document.getElementById('aMap').style.width = '713px';
		document.getElementById('slider_maplist').style.width = '743px';
		document.getElementById('sw').style.width = '713px';
		document.getElementById('btn_viewmap').src = './../contents/images/map/btn_viewmap_on.png';

		map.size.w = 713;
		map.updateSize();
	} else {
		d.style.width = '575px';
		document.getElementById('leftarea').style.display = 'block';
		document.getElementById('map_area').style.width = '533px';
		document.getElementById('aMap').style.width = '533px';
		document.getElementById('slider_maplist').style.width = '563px';
		document.getElementById('sw').style.width = '536px';
		document.getElementById('btn_viewmap').src = './../contents/images/map/btn_viewmap.png';

		map.size.w = 533;
		map.updateSize();
	}
}

function openLeftArea() {
	var wWindow = $(window).width();
	var leftareaW = $('#left_area').width();

	var s = document.getElementById('contents');
	s.style.marginLeft = '350px';
	document.getElementById('left_area').style.display = 'block';
	document.getElementById('btn_viewbig').style.left = '-29px';
	document.getElementById('btn_viewmap').src = './../contents/images/map/btn_viewmap.gif';

	$('#map_area').width(wWindow - leftareaW);
	$('#aMap').width(wWindow - leftareaW);
	map.updateSize();

	map.size.w = parseFloat(wWindow - leftareaW);
}

function closeLeftArea() {
	var wWindow = $(window).width();
	var leftareaW = 0;

	var s = document.getElementById('contents');
	s.style.marginLeft = '0';
	document.getElementById('left_area').style.display = 'none';
	document.getElementById('btn_viewbig').style.left = '0';
	document.getElementById('btn_viewmap').src = './../contents/images/map/btn_viewmap_on.png';

	$('#map_area').width(wWindow);
	$('#aMap').width(wWindow);
	map.updateSize();

	map.size.w = parseFloat(wWindow - leftareaW);
}

function imgOver(imgs) {
	imgs.src = imgs.src.replace("off.gif", "on.gif");
}
function imgOut(imgs) {
	imgs.src = imgs.src.replace("on.gif", "off.gif");
}

function imgOverPng(imgs) {
	imgs.src = imgs.src.replace("off.png", "on.png");
}
function imgOutPng(imgs) {
	imgs.src = imgs.src.replace("on.png", "off.png");
}

function imgOveMap(imgs) {
	imgs.src = imgs.src.replace("_off.gif", "_over.gif");
}
function imgOutMap(imgs) {
	imgs.src = imgs.src.replace("_over.gif", "_off.gif");
}

function setPng24(obj) {
	obj.width = obj.height = 1;
	obj.className = obj.className.replace(/\bpng24\b/i, '');
	obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
			+ obj.src + "',sizingMethod='image')";
	obj.src = '';
	return '';
}

function clearinput(obj) {
	obj.style.backgroundImage = 'none';
}

function MM_showHideLayers() { // v9.0
	var i, p, v, obj, args = MM_showHideLayers.arguments;
	for (i = 0; i < (args.length - 2); i += 3)
		with (document)
			if (getElementById && ((obj = getElementById(args[i])) != null)) {
				v = args[i + 2];
				if (obj.style) {
					obj = obj.style;
					v = (v == 'show') ? 'visible' : (v == 'hide') ? 'hidden'
							: v;
				}
				obj.visibility = v;
			}
}

function flash(fid, fnm, wid, hei, fvs, bgc, wmd) {
	var flash_tag = "";
	flash_tag = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'
			+ wid + '" height="' + hei + '" id="' + fid + '" align="middle">';
	flash_tag += '<param name="allowScriptAccess" value="always" />';
	flash_tag += '<param name="allowFullScreen" value="false" />';
	flash_tag += '<param name="movie" value="' + fnm + '" />';
	flash_tag += '<param name="FlashVars" value="' + fvs + '" />';
	flash_tag += '<param name="quality" value="high" />';
	flash_tag += '<param name="bgcolor" value="' + bgc + '" />';
	flash_tag += '<param name="wmode" value="' + wmd + '" />';
	flash_tag += '<embed src="'
			+ fnm
			+ '" quality="high" bgcolor="'
			+ bgc
			+ '" FlashVars="'
			+ fvs
			+ '" wmode="'
			+ wmd
			+ '" width="'
			+ wid
			+ '" height="'
			+ hei
			+ '" name="'
			+ fid
			+ '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
	flash_tag += '</object>';

	document.write(flash_tag);
}

function initTabMenu(tabContainerID) {
	var tabContainer = document.getElementById(tabContainerID);
	var tabAnchor = tabContainer.getElementsByTagName("a");
	var tabAnchorSize = tabAnchor.length;
	for (var i = 0; i < tabAnchorSize; i++) {
		if (tabAnchor.item(i).className == "tab"){
			thismenu = tabAnchor.item(i);
		}else{
			continue;
		}

		thismenu.container = tabContainer;
		thismenu.targetEl = document.getElementById(tabAnchor.item(i).href.split("#")[1]);
		thismenu.targetEl.style.display = "none";
		thismenu.imgEl = thismenu.getElementsByTagName("img").item(0);
		thismenu.onclick = function tabMenuClick() {
			currentmenu = this.container.current;
			if (currentmenu == this){
				return false;
			}

			if (currentmenu) {
				currentmenu.targetEl.style.display = "none";
				if (currentmenu.imgEl) {
					currentmenu.imgEl.src = currentmenu.imgEl.src.replace("_on.gif", "_off.gif");
					currentmenu.imgEl.alt = currentmenu.imgEl.alt.replace(" 선택", "");
				} else {
					currentmenu.className = currentmenu.className.replace(" on", "");
				}
			}
			this.targetEl.style.display = "";
			if (this.imgEl) {
				this.imgEl.src = this.imgEl.src.replace("_off.gif", "_on.gif");
				this.imgEl.alt += " 선택";
			} else {
				this.className += " on";
			}
			this.container.current = this;
			return false;
		};

		if (!thismenu.container.first){
			thismenu.container.first = thismenu;
		}
	}
	if (tabContainer.first){
		tabContainer.first.onclick();
	}
}
function loadPopup(add, wid, hei) {
	window.open(add, 'Admin', 'width='
							+ wid
							+ 'px, height='
							+ hei
							+ 'px ,resizalbe=no, menubar=no, toolbar=no, directories=1, scrollbars=no');
}

// 로딩중 이미지
function getLoadingHTML(height) {
	if (height == undefined){
		return "<li height='100px' style='text-align:center; line-height:100px;'><img src='./../contents/images/pre-loader.gif' /></li>";
	}else{
		return "<table><tr height="
		+ height
		+ "><td style='text-align:center'><img src='./../contents/images/pre-loader.gif' /></td></tr></table>";
	}
}

// calander
function initCalendar(tagName, yyyymmdd) {
	$.datepicker.setDefaults({
		monthNames : [ '년 1월', '년 2월', '년 3월', '년 4월', '년 5월', '년 6월', '년 7월', '년 8월', '년 9월', '년 10월', '년 11월', '년 12월' ],
		dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
		showMonthAfterYear : true,
		dateFormat : 'yy-mm-dd',
		showOn : 'both',
		buttonText : '달력',
		buttonImage : './../contents/images/common/ico_calendar.gif',
		buttonImageOnly : false
	});

	var date = new Date();
	var mm = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	var dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	$(document).ready(function() {
		$(tagName).datepicker({
			inline : false,
			defaultDate : new Date(date.getFullYear(), mm - 1, dd),
			onSelect : function(date) {
				$(tagName).val(date);
			}
		});
	});

	if (yyyymmdd == undefined){
		$(tagName).val(date.getFullYear() + "-" + mm + "-" + dd);
	}else{
		$(tagName).val(yyyymmdd.substring(0, 4) + '-' + yyyymmdd.substring(4, 6) + '-' + yyyymmdd.substring(6, 8));
	}
}

function dateCheck(date, bLimit) {
	if (date == "") {
		alert("날짜를 입력해주세요.");
		return false;
	}

	if (date.match(/^\d+$/ig) == null) {
		alert("숫자만 입력하세요.");
		return false;
	}

	if (date.length != 8) {
		alert("자릿수가 맞지 않습니다. (yyyymmdd 또는 yyyy-mm-dd 형식으로 입력해주세요)");
		return false;
	}

	var m = date.substring(4, 6);
	if (m < 1 || m > 12) {
		alert("월이 잘못됐습니다.");
		return false;
	}

	var d = date.substring(6, 8);
	var lastday = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	var y = date.substring(0, 4);
	if (y % 1000 != 0 && y % 4 == 0)
		lastday[1] = 29; // 윤달

	if (d < 1 || d > lastday[m - 1]) {
		alert("일이 잘못됐습니다.");
		return false;
	}

	if (bLimit) {
		var nowDate = new Date();
		var setDate = new Date(y, m - 1, parseInt(d) + 1);
		if (setDate > nowDate) {
			alert("데이터가 없습니다. 금일 이전으로 조회해 주세요.");
			return false;
		}
	}
	return true;
}

// 콤마 삽입
function commify(n) {
	var reg = /(^[+-]?\d+)(\d{3})/; // 정규식
	n += ''; // 숫자를 문자열로 변환

	while (reg.test(n)) {
		n = n.replace(reg, '$1' + ',' + '$2');
	}

	return n;
}

/**
 * 페이지 및 CCTV 뷰 로그 기록
 * 
 * @param menu :
 *            메뉴
 * @param subtype :
 *            page or cctv
 * @param type :
 *            web or mob
 */
function weblog(menu, subtype, type) {
	if (!menu) {
		return;
	}

	if (!type) {
		type = 'web';
	}

	var url = './../log/sessionlog.do';
	if (subtype && subtype != 'page')
		$.get(url, {
			'type' : type,
			'subtype' : subtype,
			'cctvid' : menu
		});
	else if (type == 'web')
		$.get(url, {
			'type' : type,
			'subtype' : 'page',
			'menu' : 'w' + menu
		});
	else if (type == 'mob')
		$.get(url, {
			'type' : type,
			'subtype' : 'page',
			'menu' : 'm' + menu
		});
	else
		return;
}
function Cookie() {
	this.setCookie = function(name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = "";
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	};
	this.getCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		var caSize = ca.length;
		for (var i = 0; i < caSize; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0)
				return c.substring(nameEQ.length, c.length);
		}
		return null;
	};
	this.deleteCookie = function(name) {
		this.setCookie(name, "", -1);
	};
};

function getSidoCodeList() {
	// 도시의 센터 코드들을 반환한다.
	// 센터 코드들이 여기 저기 흩여져 있어서 , 이쪽으로 모두 통일한다.
	// center code list
	var sido = [];
	sido.push([ "거제", "L28" ]);
	sido.push([ "건교부", "E06" ]);
	sido.push([ "고양", "L10" ]);
	sido.push([ "과천", "L06" ]);
	sido.push([ "광명", "L04" ]);
	sido.push([ "광주(경기)", "L20" ]);
	sido.push([ "광주(전라도)", "L31" ]);
	sido.push([ "구리", "L21" ]);
	sido.push([ "군산", "E15" ]);
	sido.push([ "군포", "L17" ]);
	sido.push([ "김포", "L15" ]);
	sido.push([ "김해", "L26" ]);
	sido.push([ "남양주", "L18" ]);
	sido.push([ "대구", "E10" ]);
	sido.push([ "대전", "E07" ]);
	sido.push([ "대전국토", "E19" ]);
	sido.push([ "부산", "L23" ]);
	sido.push([ "부산국토", "E21" ]);
	sido.push([ "부천", "L03" ]);
	sido.push([ "서울", "L01" ]);
	sido.push([ "서울국토", "E06" ]);
	sido.push([ "서울 내부순환", "E04" ]);
	sido.push([ "서울 외곽순환", "E23" ]);
	sido.push([ "성남", "L09" ]);
	sido.push([ "수원", "L19" ]);
	sido.push([ "시흥", "L11" ]);
	sido.push([ "안산", "L07" ]);
	sido.push([ "안양", "L05" ]);
	sido.push([ "양산", "L24" ]);
	sido.push([ "양주", "L13" ]);
	sido.push([ "용인", "L08" ]);
	sido.push([ "울산", "E12" ]);
	sido.push([ "원주", "E14" ]);
	sido.push([ "원주국토", "E30" ]);
	sido.push([ "의왕", "L16" ]);
	sido.push([ "의정부", "L14" ]);
	sido.push([ "익산국토", "E20" ]);
	sido.push([ "인천", "L02" ]);
	sido.push([ "전주", "E08" ]);
	sido.push([ "제주", "E13" ]);
	sido.push([ "창원", "L25" ]);
	sido.push([ "천안", "E18" ]);
	sido.push([ "청주", "E31" ]);
	sido.push([ "파주", "L12" ]);
	//sido.push([ "포항", "E16" ]);
	sido.push([ "포항", "L37" ]);
	sido.push([ "하남", "L22" ]);
	return sido;
}
