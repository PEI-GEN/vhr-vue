const proxyObj = {
    '/': {
        ws: false,
        target: 'http://127.0.0.1:8081',
        // target: 'http://139.159.149.164:8081',
        changeOrigin: true,
        pathRewrite: {
            '^/': ''
        }
    },
    '/ws': {
        ws: true,
        target: 'ws://127.0.0.1:8081'
        // target: 'ws://139.159.149.164:8081'
    }
}
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}
