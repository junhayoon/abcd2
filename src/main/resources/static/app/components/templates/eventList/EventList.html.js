/**
 * 상황발생현황 Template
 */
 
export {template as default};

const template = `
	<!--event-list start-->
	<div class="event-list-wrap" v-bind:class="{open: isOpen}" id="warn-event-list">
		<div id="title-wrap">
			<div id="title" @click="handleCollapse">상황발생현황</div>
			<div id="count"><span>{{todayDashboardEventsNoChecking}}</span></div>
		</div>
		<div id="list-wrap">
			<div id="list-total">
				<div class="wrap-header"/>
				<div id="list-total-info">
					<div id="total-text">TODAY TOTAL</div>
					<div id="total-count">{{todayTotalDashboardEventCnt}}</div>
				</div>
			</div>
			<div class="table-wrap" id="list">
				<table>
					<colgroup>
						<col width="10%">
						<col width="20%">
						<col width="25%">
						<col width="25%">
						<col width="25%">
						<col width="20%">
					</colgroup>
					<thead>
						<tr>
							<th>이벤트등급</th>
							<th>사업장</th>
							<th>센서</th>
							<th>발생시간</th>
							<th>메세지</th>
							<th>관리자확인</th>
						</tr>
					</thead>
				</table>
				<div class="scroll-wrap">
					<table>
						<colgroup>
							<col width="10%">
							<col width="20%">
							<col width="25%">
							<col width="25%">
							<col width="25%">
							<col width="20%">
						</colgroup>
						<tbody>
							<tr v-for="(item, index) in todayDashboardEvents" v-bind:key="index">
								<td class="center" style="cursor:pointer;">
									<div 
										class="item-grade-box" 
										v-bind:style="{backgroundColor: gradeInfo[item.grade.cd] ? gradeInfo[item.grade.cd].color : 'gray'}">
										{{ item.grade.cd }}
									</div>
								</td>
								<td class="center" style="cursor:pointer;">{{ item.dashFacility }}</td>
								<td class="center" style="cursor:pointer;">{{ item.category.cdNm }}</td>
								<td class="center" style="cursor:pointer;">{{ item.createDateTime | dateStringFormat('YYYY-MM-DD / HH:mm:ss') }}</td>
								<td class="center" style="cursor:pointer;">{{ item.confirmMessage }}</td>
								<td class="center" style="cursor:pointer;" v-if="item.checking">완료</td>
								<td class="center" style="cursor:pointer;" v-else>확인</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>  
	<!--event-list end-->
`;