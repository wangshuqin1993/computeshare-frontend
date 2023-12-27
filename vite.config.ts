import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "node:url";
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // 配置文件扩展名
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    host: '0.0.0.0', //ip地址
    port: 5177, //端口号
    open: false, //启动后是否自动打开浏览器
    proxy: {
      "/api": {
        target: "https://api.computeshare.newtouch.com/",
        // target: "http://127.0.0.1:8000/",
        changeOrigin: true, //是否跨域
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    }
  }
})
