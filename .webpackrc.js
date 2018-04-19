export default {
    proxy: {
        "/api": {
            target: "http://localhost:3123/",
            changeOrigin: true,
            pathRewrite: { "^/api": "" }
        }
    }
}