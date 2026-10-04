import '@mdi/font/fonts/materialdesignicons-webfont.eot';
import '@mdi/font/fonts/materialdesignicons-webfont.ttf';
import '@mdi/font/fonts/materialdesignicons-webfont.woff';
import '@mdi/font/fonts/materialdesignicons-webfont.woff2';
import '@mdi/font/css/materialdesignicons.min.css';

import { provide } from '@sienar/utils';
import { MAIN_LAYOUT } from '@sienar/plugins-core';

import MainLayout from './MainLayout.tsx';

export default function plugin() {
	provide(MAIN_LAYOUT, <MainLayout/>);
}
