import { Path, PathValue } from '../types';
import { get } from '../libs';
import { LocaleManager } from './locale-manager';

export class LocaleManagerForUnionLocales<MESSAGES, LOCALE extends string, FALLBACK extends LOCALE> extends LocaleManager<
	MESSAGES,
	LOCALE,
	FALLBACK
> {
	// TS bad optimization
	protected findOutsideFallback<T extends Path<MESSAGES>>(path: T) {
		for (const locale in this.locales) {
			const value = get(this.locales[locale], path);
			if (value) {
				return value;
			}
		}
		return null;
	}

	get<T extends Path<MESSAGES>>(path: T, locale?: keyof typeof this.locales) {
		const currentLocale = locale ? this.locales[locale] : this.locales[this.fallback];

		const currentLocaleMessages = currentLocale;
		const value = get(currentLocaleMessages, path);
		return value ?? (this.findOutsideFallback(path) as PathValue<Record<LOCALE, MESSAGES>[LOCALE], T>);
	}
}
