import { createContext, useContext, useEffect } from 'react';
import { inject } from '@utils/di.ts';
import type { InjectionKey } from '@utils/di.ts';
import type { LinkDictionary } from '@utils/menus.ts';
import type { FormContext } from '@utils/validation.ts';

export const DOCUMENT_TITLE_SUFFIX = Symbol() as InjectionKey<string>;

export const infrastructureContext = createContext<InfrastructureContext>({
	activeMenu: Symbol(),
	activeUtilsMenu: Symbol(),
	setActiveMenu: () => {},
	setActiveUtilsMenu: () => {}
});
export const useInfrastructureContext = () => useContext(infrastructureContext);

/**
 * Sets the intended document title on initial render
 *
 * @param title The title to use
 * @param ignoreSuffix Whether to ignore the suffix supplied from DI, even if it exists
 */
export function useDocumentTitle(title: string, ignoreSuffix: boolean = false) {
	useEffect(() => {
		let calculatedTitle = title;
		if (!ignoreSuffix) {
			const suffix = inject(DOCUMENT_TITLE_SUFFIX, true);
			if (suffix) {
				calculatedTitle = `${title} ${suffix}`;
			}
		}

		document.title = calculatedTitle;
	}, []);
}

/**
 * Maps the initial form state
 *
 * @param initial The initial form values
 * @param formContext The form context
 */
export function mapInitialFormState(
	initial: Record<string, any>,
	formContext: FormContext
) {
	for (let [k, v] of Object.entries(initial)) {
		// Let's be nice and handle IDs and concurrency stamps for the devs
		if (k === 'id' || k === 'concurrencyStamp') {
			formContext.fields[k] = {
				displayName: k,
				validator: () => true,
				value: v,
				setValue: () => {},
				validationResults: [],
				setValidationResults: ([]) => {}
			}
			continue;
		}

		// If the element doesn't exist, there's nothing to do
		if (!formContext.fields[k]) {
			continue;
		}

		// Set the value
		formContext.fields[k].setValue(v)
	}
}

/**
 * The app's infrastructure-related state
 */
export type InfrastructureContext = {
	/**
	 * The name of the currently active menu
	 */
	activeMenu: InjectionKey<LinkDictionary>

	/**
	 * Changes the active menu that should be rendered in the dashboard
	 *
	 * @param key The injection key of the menu that should be rendered
	 */
	setActiveMenu: (key: InjectionKey<LinkDictionary>) => void

	/**
	 * The name of the currently active utility menu
	 */
	activeUtilsMenu: InjectionKey<LinkDictionary>

	/**
	 * Changes the active utility menu that should be rendered in the dashboard
	 *
	 * @param key The injection key of the menu that should be rendered
	 */
	setActiveUtilsMenu: (key: InjectionKey<LinkDictionary>) => void
}
