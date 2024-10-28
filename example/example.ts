import { LocaleManager } from '../src/locale-manager/locale-manager';
import { LOCALES } from './locales/locales';

const localeManager = new LocaleManager(LOCALES, 'en');

console.log(localeManager.get('hello'), localeManager.get('world'));
console.log(localeManager.get('test', 'en'), localeManager.get('world', 'en'));
console.log(localeManager.get('hello', 'ru'), localeManager.get('world', 'ru'));
