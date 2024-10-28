import { LocaleManager } from '../src/locale-manager/locale-manager';
import { LOCALES } from './locales/locales';

const localeManager = LocaleManager.getInstance(LOCALES, 'en');

// STRINGS
console.log(localeManager.get('hello'), localeManager.get('world'));
console.log(localeManager.get('hello', 'en'), localeManager.get('world', 'en'));
console.log(localeManager.get('hello', 'ru'), localeManager.get('world', 'ru'));

// FUNCTIONS
console.log(localeManager.get('functions.functionMsg', 'en')('value'));
console.log(localeManager.get('functions.functionMsg', 'ru')('value'));

// INSTANCE
const instanceWithLocale = localeManager.getCallbackWithLocale('ru');

console.log(instanceWithLocale('hello'), instanceWithLocale('world'));
