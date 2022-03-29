export {template as default};

const template = `
	<div class="form-group row">
		<div class="col-sm-2">
			<div class="dropdown">
				<button class="btn btn-secondary dropdown-toggle" type="button" v-bind:id="'dropdownMenuButton_' + index" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ valueType }}</button>
				<div class="dropdown-menu" v-bind:aria-labelledby="'dropdownMenuButton_' + index">
					<a class="dropdown-item" href="#" v-on:click.prevent="selectString">String</a>
					<a class="dropdown-item" href="#" v-on:click.prevent="selectNumber">Number</a>
					<a class="dropdown-item" href="#" v-on:click.prevent="selectEmail">Email</a>
					<a class="dropdown-item" href="#" v-on:click.prevent="selectIp">IP</a>
				</div>
			</div>
		</div>
		<label v-bind:for="'categoryOptionFieldSetId_' + index" class="col-sm-2 col-form-label">{{ $t("label.variable_id") }}</label>
		<div class="col-sm-2">
			<input v-bind:id="'categoryOptionFieldSetId_' + index" ref="categoryOptionFieldSetId" class="form-control popup-input" v-model="valueId" />
		</div>
		<label v-bind:for="'categoryOptionFieldSetName_' + index" class="col-sm-2 col-form-label">{{ $t("label.variable_label") }}</label>
		<div class="col-sm-2">
			<input v-bind:id="'categoryOptionFieldSetName_' + index" ref="categoryOptionFieldSetName" class="form-control popup-input" v-model="valueName" />
		</div>
		<div class="col-sm-1 pt-2">
			<input type="checkbox" v-bind:id="'isRequired_' + index" class="form-check-input" v-model="valueRequired">{{ $t("label.required_acronym") }}
		</div>
		<div class="col-sm-1 text-right">
			<a v-bind:id="'btnRemoveField_' + index" class="btn btn-outline-secondary btn-sm" v-on:click.prevent="$emit('fieldRemoved')"><i class="fa fa-minus-circle"></i></a>
		</div>
	</div>
`;
