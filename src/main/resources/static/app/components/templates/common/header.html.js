export {template as default};

const template = `
	<header>
		<a href="/#/" class="logo">인천스마트그린산단 통합관제센터T</a>
		<ul class="top-menu">
			<li>{{myInfo.name}} 님</li>
			<li><a href="/logout">{{ $t("button.logout") }}</a></li>
			<li><a href="/#/Facility">{{ $t("frontend.menu.management") }}</a></li>
		</ul>
	</header>
	
	<!--
	<div id="header">
		<img src="/static/images/header_profile_icon_bg.png"/>
		<div class="headerNameWrap" id="headerProfileNameWrap">
			<div>{{myInfo.name}} 님</div>
		</div>
		<img src="/static/images/header_setting_icon_bg.png"/>
		<div class="headerNameWrap" id="headerSettingNameWrap">
			<a href="/#/Facility"><div>{{ $t("frontend.menu.management") }}</div></a>
		</div>
		<img src="/static/images/header_logout_icon_bg.png"/>
		<div class="headerNameWrap" id="headerLogoutNameWrap">
			<a href="/logout"><div>{{ $t("button.logout") }}</div></a>
		</div>
	</div>
	-->
`;

