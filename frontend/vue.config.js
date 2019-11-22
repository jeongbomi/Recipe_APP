module.exports = {
  devServer: {
    pwa: {
      workboxPluginMode: "InjectManifest",
      workboxOptions: {
          swSrc: "public/service-worker.js"
      }
    },
    proxy: {
      "/api": {
        target: "http://54.180.151.135:3000/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  outputDir: "../backend/public"
};
