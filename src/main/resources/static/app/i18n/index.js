export {i18n as default};

import messages from './messages.js'

const i18n = new VueI18n({
	locale: 'ko-kr',
	fallbackLocale: 'en-us',
	messages
});