import { inject } from '@sienar/utils';
import type { InjectionKey } from '@sienar/utils';

export function getHref(to: string|InjectionKey<string>): string {
	return typeof to === 'string'
		? to
		: inject(to);
}

export type LinkPropsBase = {
	to: string|InjectionKey<string>
}