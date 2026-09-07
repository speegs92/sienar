import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@sienar/utils': resolve(__dirname, './src/Sienar.React/wwwsrc/utils/src/index.ts'),
			'@utils': resolve(__dirname, './src/Sienar.React/wwwsrc/utils/src'),
			'@sienar/ui': resolve(__dirname, './src/Sienar.React/wwwsrc/ui/src/index.ts'),
			'@ui': resolve(__dirname, './src/Sienar.React/wwwsrc/ui/src'),
			'@sienar/plugins-core': resolve(__dirname, './src/Sienar.React/wwwsrc/plugins-core/src/index.ts'),
			'@plugins-core': resolve(__dirname, './src/Sienar.React/wwwsrc/plugins-core/src'),
			'@sienar/plugins-identity': resolve(__dirname, './src/Sienar.Plugins.Identity/wwwsrc/src/index.ts'),
			'@plugins-identity': resolve(__dirname, './src/Sienar.Plugins.Identity/wwwsrc/src')
		}
	},
	server: {
		proxy: {
			'^/api': 'http://localhost:5000'
		}
	}
});
