import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    vue(),
    libInjectCss(),
    dts({
      // include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist/types',
      // rollupTypes: true,
      // insertTypesEntry: true
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'tailwind.config.js',
          dest: ''
        }
      ]
    })
  ],
  build: {
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'InkmagineGui',
      // formats: ['es', 'cjs'],
      fileName: (format) => `inkmagine-gui.${format}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-i18n',
        'dayjs',
        'js-cookie',
        'tailwindcss',
        '@headlessui/vue',
        'vue-router',
        'vee-validate'
      ],
      output: {
        dir: 'dist',
        // preserveModules: true,
        exports: 'named',
        globals: {
          vue: 'Vue',
          'vue-i18n': 'vue-i18n',
          dayjs: 'dayjs',
          'js-cookie': 'js-cookie',
          'tailwindcss': 'tailwindcss',
          '@headlessui/vue': '@headlessui/vue',
          'vue-router': 'vue-router',
          'vee-validate': 'vee-validate'
        },
        // Put chunk files at <output>/chunks
        chunkFileNames: 'chunks/[name].[hash].js',
        // Put chunk styles at <output>/assets
        assetFileNames: 'style/[name][extname]',
        // entryFileNames: (chunkInfo) => {
        //   return `${chunkInfo.name.replace('src/', '')}.js`
        // },
        // assetFileNames: (assetInfo) => {
        //   if (assetInfo.name && /\.css$/.test(assetInfo.name)) {
        //     return `styles/${name}`
        //   }
        //   return '[name][extname]'
        // }
      }
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
}) 