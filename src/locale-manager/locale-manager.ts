import deepmerge from 'deepmerge';

import { Path } from '../types';
import { get } from '../libs';
import { ILocaleManagerSettings } from '../types/locale-manager-settings';

const baseSettings: ILocaleManagerSettings = {
	findOutsideFallback: false,
	deepMergeWithFallback: true,
};

export class LocaleManager<
	MESSAGES,
	LOCALE extends string,
	FALLBACK extends LOCALE
> {
	protected static instance: LocaleManager<any, any, any> | null = null;

	locales: Record<LOCALE, MESSAGES>;
	protected readonly fallback: LOCALE;

	constructor(
		locales: Record<LOCALE, MESSAGES>,
		fallback?: FALLBACK,
		private readonly settings: ILocaleManagerSettings = baseSettings
	) {
		this.settings = deepmerge(baseSettings, settings);
		const fallbackKey = fallback
			? fallback
			: (Object.keys(locales)[0] as keyof typeof locales);
		const fallbackLocale = locales[fallbackKey];
		this.fallback = fallbackKey as FALLBACK;
		const currentLocales: Record<LOCALE, MESSAGES> = locales as Record<
			LOCALE,
			MESSAGES
		>;
		for (const key of Object.keys(locales)) {
			if (!this.settings.deepMergeWithFallback) {
				break;
			}
			currentLocales[key as keyof typeof locales] = deepmerge(
				fallbackLocale,
				locales[key as keyof typeof locales]
			);
		}
		this.locales = currentLocales;
	}

	public static getInstance<
		MESSAGES,
		LOCALE extends string,
		FALLBACK extends LOCALE
	>(
		locales: Record<LOCALE, MESSAGES>,
		fallback?: LOCALE
	): LocaleManager<MESSAGES, LOCALE, FALLBACK> {
		if (!LocaleManager.instance) {
			LocaleManager.instance = new LocaleManager(locales, fallback);
		}
		return LocaleManager.instance;
	}

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
		const currentLocale = locale
			? this.locales[locale]
			: this.locales[this.fallback];

		const currentLocaleMessages = currentLocale;
		const value = get(currentLocaleMessages, path);
		return value
			? value
			: this.settings.findOutsideFallback
			? this.findOutsideFallback(path)
			: undefined;
	}

	getCallbackWithLocale(locale: keyof typeof this.locales) {
		const getFn = <T extends Path<MESSAGES>>(path: T) =>
			this.get(path, locale);
		return getFn;
	}
}
