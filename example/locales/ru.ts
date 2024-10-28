import { EN } from './en';

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
