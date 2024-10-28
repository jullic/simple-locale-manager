import { Path, PathValue } from '../types';

export function get<T, P extends Path<T> = Path<T>>(
	obj: T,
	path: P
): PathValue<T, P> {
	const keys = path.split('.') as string[];

	return keys.reduce((acc, key) => {
		if (acc === undefined || acc === null) {
			return undefined;
		}

		const index = Number(key);
		if (!isNaN(index) && Array.isArray(acc)) {
			return acc[index];
		}

		return acc[key as keyof T];
	}, obj) as PathValue<T, P>;
}
