module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                logLevel: 'debug',
            },
            '/auth/client':{
                target: 'http://localhost:8080',
                changeOrigin: true,
                logLevel: 'debug',
            },
            '/chat/room':{
                target: 'http://localhost:8080',
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/ws':{
                target: 'http://localhost:8080',
                changeOrigin: true,
                logLevel: 'debug'
            }
        },
        port: 3000,
    },

    transpileDependencies: [
      'vuetify'
    ]
};
