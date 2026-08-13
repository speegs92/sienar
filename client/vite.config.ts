import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'@utils': resolve(__dirname, './packages/utils/src'),
			'@sienar/utils': resolve(__dirname, './packages/utils/src/index.ts'),
			'@ui': resolve(__dirname, './packages/ui/src'),
			'@sienar/ui': resolve(__dirname, './packages/ui/src/index.ts'),
			'@plugins-core': resolve(__dirname, './packages/plugins-core/src'),
			'@sienar/plugins-core': resolve(__dirname, './packages/plugins-core/src/index.ts'),
			'@plugins-identity': resolve(__dirname, './packages/plugins-identity/src'),
			'@sienar/plugins-identity': resolve(__dirname, './packages/plugins-identity/src/index.ts')
		}
	},
	server: {
		proxy: {
			'^/api': 'http://localhost:5000'
		}
	}
});
