export {template as default};

const template = `
	<div class="main-sidebar no-drag" id="facility-sidebar">
		<template v-if="facilityShowType === 'list'">
			<div id="facilityTop">
				<img src="/static/images/facility_sidebar_top.png"/>
				<img class="iconBtn pointer" id="listView" src="/static/images/list_view_on.png" @click="changeFacilityShow('list')"/>
				<img class="iconBtn pointer" id="iconView" src="/static/images/icon_view_off.png" @click="changeFacilityShow('icon')"/>
			</div>
			
			<div id="facilityMenu">
				<template v-for="(item, i) in facilityItemsByCategory">
					<div class="position-relative">
						<img src="/static/images/facility_sidebar_title_menu_bg.png"/>
						<div class="position-absolute facilityAbsoluteWrap pointer" @click="facilityClick(i)">
							<div class="d-flex justify-content-between align-items-center facilityFlexWrap">
								<div class="d-flex align-items-center">
									<img :src="'/static/images/list_view_' + item.categorySymbol + '_icon.png'"/>
									<span>{{item.categoryName}}</span>
								</div>
								<img :src="arrowImagePath(item.isOpen)"/>
							</div>
						</div>
						<div class="facilitySubMenu" :ref="'facilitySubMenu' + i" :style="facilitySubMenuHeight(i)">
							<div style="font-size:0; line-height:0;">
								<img src="/static/images/facility_sidebar_menu_line.png"/>
							</div>
							<div :ref="'facilitySubMenuList' + i" :id="'facilitySubMenuList' + i">
								<div class="position-relative">
									<img src="/static/images/facility_sidebar_submenu_all_bg.png"/>
									<div class="position-absolute facilityAbsoluteWrap">
										<div class="d-flex justify-content-between align-items-center facilitySubFlexWrap">
											<div>
												<span>{{ $t("label.show_all") }}</span>
											</div>
											<div class="ckbx-style-1">
						                        <input type="checkbox" :id="item.ccode" v-model="item.isVisible" @change="toggleSybolVisibleByCategory">
						                        <label :for="item.ccode"></label>
						                    </div>
										</div>
									</div>
								</div>
								
								<template v-for="(subItem, index) in item.facilityItems" v-bind:key="index">
									<div class="position-relative">
										<div class="position-relative facilitySubRelativeWrap pointer" :class="{active: activeIndex === subItem.index}" @click="(e) => onFacility(e, subItem.index)">
											<div class="d-flex justify-content-between align-items-center facilitySubFlexWrap">
												<div>
													<span :title="subItem.facilityName">└ {{subItem.facilityName}}</span>
												</div>
												<div class="ckbx-style-1" @click.stop="{}">
													<input type="checkbox" :id="'facility-' + subItem.fcode" v-model="subItem.isVisible" @change="(e) => toggleSymbolVisible(e, subItem.index)">
							                        <label :for="'facility-' + subItem.fcode"></label>
							                    </div>
											</div>
										</div>
									</div>
								</template>
							</div>
						</div>
					</div>
					<div style="font-size:0; line-height:0;">
						<img src="/static/images/facility_sidebar_menu_line.png"/>
					</div>
				</template>
			</div>
			
			<div>
				<img src="/static/images/facility_sidebar_bottom.png"/>
			</div>
		</template>
		
		<template v-if="facilityShowType === 'icon'">
			<div id="facilityTop2">
				<img src="/static/images/facility_sidebar_top2.png"/>
				<img class="iconBtn pointer" id="listView" src="/static/images/list_view_off.png" @click="changeFacilityShow('list')"/>
				<img class="iconBtn pointer" id="iconView" src="/static/images/icon_view_on.png" @click="changeFacilityShow('icon')"/>
			</div>
			
			<div style="font-size:0; height: 20px;">
				<img src="/static/images/facility_sidebar_icon_top.png"/>
			</div>
			
			<div id="facilityIconCheck">
				<template v-for="(item, i) in facilityItemsByCategory">
					<div v-if="i > 0" style="line-height: 0;">
						<img src="/static/images/facility_sidebar_icon_between.png"/>
					</div>
					<div class="position-relative">
						<div>
							<img src="/static/images/facility_sidebar_icon_bg.png"/>
							<input type="checkbox" :id="item.ccode" v-model="item.isVisible" @change="toggleSybolVisibleByCategory"/>
							<label class="facilityIcon pointer" :for="item.ccode">
								<img :src="iconViewFacilityIconPath(item.categorySymbol, item.isVisible)"/>
							</label>
						</div>
					</div>
				</template>
			</div>
			
			<div>
				<img src="/static/images/facility_sidebar_bottom2.png"/>
			</div>
		</template>
		
	</div>
`;

