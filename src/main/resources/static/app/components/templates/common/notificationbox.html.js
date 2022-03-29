export {template as default};

const template = `
	<div id="notificationContainer" class="container nano-content" style="overflow-y: auto; position: static;">
	    <div class="row" v-for="(item, index) in notifications.slice().reverse()" v-bind:key="index">
	        <div class="col">
	            <div class="alert" v-bind:class="{ 'alert-success': item.success, 'alert-info': item.info, 'alert-warning': item.warning, 'alert-danger': item.danger }">
	                <button type="button" class="close" aria-hidden="true" @click="onClickDeleteItem(notifications.length-1-index)">×</button>
	               	<i class="fa" v-bind:class="{ 'fa-check': item.success, 'fa-info-circle': item.info, 'fa-dot-circle': item.warning, 'fa-hand-point-right': item.danger }"></i> <strong>{{ item.title }}</strong>
					<small class="text-muted mr-2" style="float: right;">{{ item.date | dateString }}</small>
	                <hr class="message-inner-separator">
	                <p>{{ item.message }}</p>
	            </div>
	        </div>
		</div>
	</div>
`;