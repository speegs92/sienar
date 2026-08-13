import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const external = [
	'react',
	'react-dom',
	'react-router',
	'react-router-dom',
	'@sienar/utils'
];

// https://vite.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: {
				'plugins-core': './src/index.ts'
			},
			formats: [ 'es' ]
		},
		rollupOptions: {
			external
		}
	},
	esbuild: {
		minifyIdentifiers: false
	},
	optimizeDeps: {
		exclude: external
	},
	resolve: {
		alias: {
			'@plugins-core': resolve(__dirname, './src')
		}
	},
	plugins: [react()]
});
