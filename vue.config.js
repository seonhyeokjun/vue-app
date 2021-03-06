module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                logLevel: 'debug',
            },
            '/login':{
                target: 'http://localhost:8080',
                changeOrigin: true,
                logLevel: 'debug',
            }
        },
        port: 3000,
    },

    transpileDependencies: [
      'vuetify'
    ]
};
