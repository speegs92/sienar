const registry: Plugin[] = [];

/**
 * Registers plugins
 *
 * @param plugins The plugins to register
 */
export function registerPlugins(...plugins: Plugin[]) {
	registry.push(...plugins);
}

/**
 * Executes all registered plugins
 */
export function executePlugins() {
	registry.forEach(p => p());
}

/**
 * A client-side Sienar plugin
 */
export interface Plugin {
	(): void;
}
