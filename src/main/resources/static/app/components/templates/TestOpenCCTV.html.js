export {template as default};

import headercomp from '../common/header.js'
import sidebarmenu from '../common/sidebarmenu.js'
import topbar from '../common/topbar.js'


const template = `

	<div class="wrapper" :style="subStyle()">
		<headercomp></headercomp>

		<!-- Sidebar -->
	    <sidebarmenu></sidebarmenu>
	    <!-- /#sidebar-wrapper -->

	    <!-- Page Content -->
    	<div id="content">

      		<div class="main-title">
	  			<h4 :style="mainTitleStyle()">교통cctv 테스트</h4>
	  		</div>

	  		<img src="/static/images/title_bar.jpg" id="subPageTitleBar"/>


			<table id="cctvListTb">
				<tr>
					<td width="15" valign="top"><img src="./../../contents/images/kbsnews_dot.gif" width="11" height="11" align="absmiddle"/></td>
					<td width="2">&nbsp;</td>
					<td width="360"><a href="javascript:test('L280034')">1.가덕영업소</a></td>
					<td width="340" align="center">
						<a href="javascript:" onclick="window.open('http://its.geoje.go.kr')">거제교통정보센터</a>
					</td>
				</tr>
				<tr>
					<td width="15" valign="top"><img src="./../../contents/images/kbsnews_dot.gif" width="11" height="11" align="absmiddle"/></td>
					<td width="2">&nbsp;</td>
					<td width="360"><a href="javascript:test('L280005')">2.거가1교</a></td>
					<td width="340" align="center">
						<a href="javascript:" onclick="window.open('http://its.geoje.go.kr')">거제교통정보센터</a>
					</td>
				</tr>
			</table>


    	</div>
		<!-- /#page-content-wrapper -->
	</div>
`;

