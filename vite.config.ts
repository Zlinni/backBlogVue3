import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  // css: {
	// 	preprocessorOptions: {
	// 		less: {
	// 			javascriptEnabled: true // 必须开启，不然ant的样式库引入时会报错
	// 		}
	// 	}
	// },
  // 配置别名
  resolve: {
    alias: {
      "~": pathResolve("src/components"),
      "utils": pathResolve("src/utils"),
    },
    extensions: [".js", ".json", ".ts"],
  },
  envDir:'./',
  base: "./",
  build: {
    target: "modules",
    outDir: "dist", //指定输出路径
    assetsDir: "assets", // 指定生成静态资源的存放路径
    minify: "terser", // 混淆器，terser构建后文件体积更小
  },
  optimizeDeps: {
    // ...
    exclude: ['lodash-es'],
  },
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    port: 3000,
    https: false,
    proxy: {
      //还没加载环境变量 这里要写只能写死 所以不太好用
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
