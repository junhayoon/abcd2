import Home from '../components/Home.js';
import Facility from '../components/Facility.js';
import FacilityCategory from '../components/FacilityCategory.js';
import Workplace from '../components/Workplace.js';
import NotiHistory from '../components/NotiHistory.js';
import AirWorkplace from '../components/AirSensorWorkplace.js';
import AirWorkplaceHistory from '../components/AirSensorWorkplaceHistory.js';
import AirStation from '../components/AirSensorStation.js';
import User from '../components/User.js';
import UserReg from '../components/UserReg.js';
import TestOpenCCTV from '../components/TestOpenCCTV.js';

//Test
import TestMap from '../components/TestMap.js';

export default new VueRouter({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/Facility',
			name: 'Facility',
			component: Facility
		},
		{
			path: '/FacilityCategory',
			name: 'FacilityCategory',
			component: FacilityCategory
		},
		{
			path: '/Workplace',
			name: 'Workplace',
			component: Workplace
		},
		{
			path: '/NotiHistory',
			name: 'NotiHistory',
			component: NotiHistory
		},
		{
			path: '/AirWorkplace',
			name: 'AirWorkplace',
			component: AirWorkplace
		},
		{
			path: '/AirWorkplaceHistory',
			name: 'AirWorkplaceHistory',
			component: AirWorkplaceHistory
		},
		{
			path: '/user',
			name: 'User',
			component: User
		},
		{
			path: '/UserReg',
			name: 'UserReg',
			component: UserReg
		}
		,
		{
			path: '/TestOpenCCTV',
			name: 'TestOpenCCTV',
			component: TestOpenCCTV
		},
		{
			path: '/TestMap',
			name: 'TestMap',
			component: TestMap
		}
	]
});
