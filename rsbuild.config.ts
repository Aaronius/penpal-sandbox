import { defineConfig } from '@rsbuild/core';

export default defineConfig({
    source: {
        entry: {
            main: './src/index.ts',
            iframe: './src/iframe.ts',
        }
    },
    // html: {
    //     pages: [
    //         {
    //             template: './src/index.html', // Ensure you have a main HTML file
    //             filename: 'index.html',
    //             chunks: ['main'],
    //         },
    //         {
    //             template: './src/iframe.html',
    //             filename: 'iframe.html',
    //             chunks: ['iframe'],
    //         },
    //     ],
    // },
});
