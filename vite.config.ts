import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
        // target: "https://d.cess.cloud/",
        changeOrigin: true, //是否跨域
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    }
  }
})
