import { EN } from './en';
import { RU } from './ru';

const languages = ['en', 'ru'] as const;

export const LOCALES: Record<(typeof languages)[number], EN> = {
	ru: new RU(),
	en: new EN(),
} as const;
