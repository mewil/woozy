module.exports = {
    app_name: process.env.APP_NAME || 'Woozy',
    env: process.env.NODE_ENV || 'development',
    development: process.env.NODE_ENV !== 'production',
    production: process.env.NODE_ENV === 'production',
    host: process.env.HOST || 'https://dev.mewil.io',
    mongo_hostname: process.env.MONGO_HOSTNAME || 'woozy_db',
    backend_db: process.env.BACKEND_DB || 'woozy_backend',
    server_port: process.env.PORT || 3000,
};