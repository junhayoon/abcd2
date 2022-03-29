export {template as default};

const template = `
	<nav id="sidebar">
		<img src="/static/images/sub_menu_box_top.png"/>
  		<ul class="list-unstyled components">
  			<li>
  				<img :src="activeMenuBgPath('Home')"/>
  				<a href="/#/" class="bold">Home</a>
  				<img src="/static/images/sub_menu_menu_between.png"/>
  			</li>
  			<li v-if="hasRole('ADMIN, USER')">
  				<img :src="activeMenuBgPath('Facility')"/>
  				<a href="/#/Facility" class="bold">{{ $t("frontend.menu.facility_management") }}</a>
  				<img src="/static/images/sub_menu_menu_between.png"/>
  			</li>
  			<li v-if="hasRole('ADMIN, USER')">
  				<img :src="activeMenuBgPath('FacilityCategory')"/>
  				<a href="/#/FacilityCategory" class="bold">{{ $t("frontend.menu.facility_category_management") }}</a>
  				<img src="/static/images/sub_menu_menu_between.png"/>
  			</li>
  			<li v-if="hasRole('ADMIN, USER')">
  				<img :src="activeMenuBgPath('Workplace')"/>
  				<a href="/#/Workplace" class="bold">{{ $t("frontend.menu.workplace_management") }}</a>
  				<img src="/static/images/sub_menu_menu_between.png"/>
  			</li>
        	<li v-if="hasRole('ADMIN, USER')">
        		<img :src="activeMenuBgPath('NotiHistory')"/>
	        	<a href="/#/NotiHistory" class="bold">{{ $t("frontend.menu.submenu.media_management_noti_his") }}</a>
	        	<img src="/static/images/sub_menu_menu_between.png"/>
			</li>
        	<li v-if="hasRole('ADMIN, PILOT, USER')">
        		<img :src="activeMenuBgPath('AirWorkplace')"/>
        		<a href="/#/AirWorkplace" class="bold">{{ $t("frontend.menu.submenu.airquality_workplace") }}</a>
        		<img src="/static/images/sub_menu_menu_between.png"/>
	    	</li>
	    	<li v-if="hasRole('ADMIN, PILOT, USER')">
	    		<img :src="activeMenuBgPath('AirWorkplaceHistory')"/>
	    		<a href="/#/AirWorkplaceHistory" class="bold">{{ $t("frontend.menu.submenu.airquality_workplace_history") }}</a>
	    		<img src="/static/images/sub_menu_menu_between.png"/>
	    	</li>
        	<li>
        		<img :src="activeMenuBgPath('User')"/>
				<a href="/#/User" class="bold">{{ $t("frontend.menu.submenu.user_management_myinfo") }}</a>
				<img src="/static/images/sub_menu_menu_between.png"/>
			</li>
			<li v-if="hasRole('ADMIN')">
				<img :src="activeMenuBgPath('UserReg')"/>
				<a href="/#/UserReg" class="bold">{{ $t("frontend.menu.submenu.user_management_reg") }}</a>
			</li>


			<li v-if="hasRole('ADMIN')">
				<img :src="activeMenuBgPath('UserReg')"/>
				<a href="/#/TestOpenCCTV" class="bold">개방데이터 cctv</a>
			</li>

  		</ul>
  		<img src="/static/images/sub_menu_box_bottom.png"/>
	</nav>
`;
