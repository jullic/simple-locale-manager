import { LocaleManager } from '../src/locale-manager/locale-manager';
import { LOCALES } from './locales/locales';

const localeManager = new LocaleManager(LOCALES, 'en', {
	findOutsideFallback: true,
});

console.log(localeManager.get('hello'), localeManager.get('world'));
console.log(localeManager.get('msgs.message1', 'en'), localeManager.get('world', 'en'));
console.log(localeManager.get('hello', 'ru'), localeManager.get('world', 'ru'));
