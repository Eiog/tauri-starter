import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'
import Markdown from 'vite-plugin-vue-markdown'
import LinkAttributes from 'markdown-it-link-attributes'
import Shiki from 'markdown-it-shiki'
import Icons from 'unplugin-icons/vite'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue(),
    Icons({ compiler: 'vue3' }),
    AutoImport({
      /* options */
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: [
        'vue',
        '@vueuse/core',
        '@vueuse/head',
        'pinia',
        'vue-router',
        'vue-i18n',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
      dirs: ['src/hooks', 'src/composables', 'src/stores', 'src/utils'],
      dts: 'src/typings/auto-import.d.ts',
      vueTemplate: true,
    }),
    Components({
      dirs: ['src/components', 'src/layouts'],
      extensions: ['vue', 'md'],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/typings/components.d.ts',
      resolvers: [NaiveUiResolver()],
    }),
    Unocss(),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: resolve(__dirname, './src/i18n/**'),
    }),
    Markdown({
      wrapperClasses: 'prose prose-sm m-auto text-left',
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Shiki, {
          theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
        })
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'vue3-starter',
        short_name: 'vue3-starter',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    host: true, // host?????????true???????????????network???????????????ip????????????
    open: false, // ?????????????????????
    cors: true, // ??????????????????
    strictPort: true, // ?????????????????????????????????
    proxy: {
      '/api': {
        target: 'https://mock.apifox.cn/m1/476417-0-default',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // Tauri supports es2021
    target: ['es2021', 'chrome100', 'safari13'],
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
    brotliSize: false,
    // ????????????????????????500kb??????
    chunkSizeWarningLimit: 2000,
    // ?????????????????????console.log
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    assetsDir: 'static/assets',
    // ?????????????????????dist??????????????????
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'), // ????????????
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
})
