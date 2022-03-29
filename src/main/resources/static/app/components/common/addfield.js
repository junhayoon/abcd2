
import template from '../templates/common/addfield.html.js'
import i18n from '../../i18n/index.js'

export default Vue.component('addfield', {
	i18n,
	props: ['paramValueType', 'paramValueId', 'paramValueName', 'paramvalueRequired', 'paramComponentId', 'index'],
	template: template,
	data: function () {
		return {
			valueType: this.$i18n.t("label.variable_type"),
			valueId: '',
			valueName: '',
			valueRequired: false,
			id: ''
		}
	},
	computed: {
		
	},
	watch: {
		valueId: function() {
			this.$emit('fieldChanged', {
				valueType: this.valueType,
				valueId: this.valueId,
				valueName: this.valueName,
				valueRequired: this.valueRequired,
				id: this.id
			});
		},
		valueType: function() {
			this.$emit('fieldChanged', {
				valueType: this.valueType,
				valueId: this.valueId,
				valueName: this.valueName,
				valueRequired: this.valueRequired,
				id: this.id
			});
		},
		valueName: function() {
			this.$emit('fieldChanged', {
				valueType: this.valueType,
				valueId: this.valueId,
				valueName: this.valueName,
				valueRequired: this.valueRequired,
				id: this.id
			});
		},
		valueRequired: function() {
			this.$emit('fieldChanged', {
				valueType: this.valueType,
				valueId: this.valueId,
				valueName: this.valueName,
				valueRequired: this.valueRequired,
				id: this.id
			});
		}
	},
	methods: {
		selectString: function() {
			this.valueType = "String";
		},
		selectNumber: function() {
			this.valueType = "Number";
		},
		selectEmail: function() {
			this.valueType = "Email";
		},
		selectIp: function() {
			this.valueType = "IP";
		}
	},
	created: function () {
		this.valueType = this.paramValueType;
		this.valueId = this.paramValueId;
		this.valueName = this.paramValueName;
		this.valueRequired = this.paramvalueRequired;
		this.id = this.paramComponentId;
	},
	mounted: function () {
		
	}
});