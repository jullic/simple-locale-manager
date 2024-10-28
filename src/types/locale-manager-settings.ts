export interface ILocaleManagerSettings {
	deepMergeWithFallback?: boolean;
	/**  FOR UNION LOCALES TYPE */
	findOutsideFallback?: boolean;
}

const b: ILocaleManagerSettings = {
	findOutsideFallback: false,
};
