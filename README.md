# simple-locale-manager

_small library for localizations with typing_

**Example**

```ts
import { LocaleManager } from 'simple-locale-manager';

export class EN {
	hello = 'hello';
	world = 'world';
	msgs = {
		message1: 'message1',
		message2: 'message2',
	};
	functions = {
		functionMsg: (value: string) => `Value: ${value}`,
	};
}

export class RU extends EN {
	world = 'мир';
	test = 'тест';
	msgs = {
		message1: 'сообщение1',
	} as EN['msgs'];
	functions = {
		functionMsg: (value: string) => `Значение: ${value}`,
	};
}

const languages = ['en', 'ru'] as const;

export const LOCALES: Record<(typeof languages)[number], EN> = {
	ru: new RU(),
	en: new EN(),
} as const;

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
```
