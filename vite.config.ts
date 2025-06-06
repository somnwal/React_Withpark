import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';
import ogPlugin from 'vite-plugin-open-graph';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            {find: '@withpark/api/', replacement: '/src/api/'},
            {find: '@withpark/assets/', replacement: '/src/assets/'},
            {find: '@withpark/constants/', replacement: '/src/constants/'},
            {find: '@withpark/pages/', replacement: '/src/pages/'},
            {find: '@withpark/hooks/', replacement: '/src/hooks/'},
            {find: '@withpark/types/', replacement: '/src/types/'},
            {find: '@withpark/ui/', replacement: '/src/ui/'},
        ],
    },
    plugins: [
        react(),
        svgr(),
        ogPlugin({
            basic: {
                title: '위드파크',
                type: 'website',
                image: {
                    url: '',
                },
                url: 'https://withpark.vercel.app',
                description:
                    '위드파크',
                determiner: 'the',
                locale: 'ko_KR',
                siteName: '위드파크',
            },
        }),
    ],
    server: {
        proxy: {
            // 프록시 할 정보
        },
    },
});
