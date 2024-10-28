import { Path, PathValue } from '../types';

export function set<T, P extends Path<T>, V extends PathValue<T, P>>(
	obj: T,
	path: P,
	value: V
): void {
	const keys = path.split('.') as string[];
	let current: any = obj;

	keys.forEach((key, index) => {
		const isLastKey = index === keys.length - 1;
		const numKey = Number(key);

		if (!isNaN(numKey) && Array.isArray(current)) {
			if (isLastKey) {
				current[numKey] = value;
			} else {
				current[numKey] = current[numKey] || [];
				current = current[numKey];
			}
		} else {
			if (isLastKey) {
				current[key] = value;
			} else {
				current[key] = current[key] || {};
				current = current[key];
			}
		}
	});
}
