import { EN } from './en';
import { RU } from './ru';

export const LOCALES: Record<string, EN> = {
	ru: new RU(),
	en: new EN(),
};
