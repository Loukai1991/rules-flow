import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import vueJsx from "@vitejs/plugin-vue-jsx";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  build: {  
    sourcemap: true
  },
  // 在codesandbox中需要用443来保证开发时不会重复刷新
  // server: {
  //   hmr: {
  //     port: 443
  //   }
  // },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      symbolId: "icon-[dir]-[name]"
    }),
  ]
})
