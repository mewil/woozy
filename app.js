process.on('unhandledRejection', (error) => {
    console.log('unhandledRejection', error);
});

process.on('warning', (warning) => {
    console.log('warning', warning);
});

process.on('uncaughtException', (exception) => {
    console.log('uncaughtException', exception);
});

process.on('rejectionHandled', (rejection) => {
    console.log('rejectionHandled', rejection);
});

const config = require('./config.js');
const http = require('http');
const {mongoose} = require('./server/db/index.js');
const morgan = require('morgan');
const express = require('express');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const csrf = require('csurf');
const csrfProtection = csrf(); // eslint-disable-line
const apiRouter = require('./server/routes');

// Force https
app.use((req, res, next) => {
    if (
        !req.secure &&
        req.get('x-forwarded-proto') !== 'https' &&
        app.get('env') !== 'development'
    ) {
        return res.redirect(config.host + req.url);
    }
    next();
});

// Logging
morgan.token('remote-addr', (req) => req.headers['x-forwarded-for'] || req.ip);
app.use(morgan('combined'));

// Request parsers
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '50mb'
    })
);
app.use(
    bodyParser.json({
        limit: '50mb'
    })
);

// Pretty API Responses
app.set('json spaces', 4);

// Disable x-powered-by
app.disable('x-powered-by');

// Set an xsrf-token for the session if it's enabled
app.use((req, res, next) => {
    if (req.csrfToken) {
        res.cookie('xsrf-token', req.csrfToken());
    }

    return next();
});

app.use('/api', apiRouter);

// Intiialize development webpack (hot reloading, etc);
if (app.get('env') !== 'production' && !config.api_work) {
        const webpack = require('webpack');
        const webpackDevMiddleware = require('webpack-dev-middleware');
        const webpackHotMiddleware = require('webpack-hot-middleware');
        const historyApiFallback = require('connect-history-api-fallback');
        const webpackConfig = require('./webpack.config');
        const webpackCompiler = webpack(webpackConfig);
        const webpackMiddlewareInstance = webpackDevMiddleware(webpackCompiler, {
            publicPath: webpackConfig.output.publicPath,
            stats: {
                colors: true
            }
        });

    app.use(webpackMiddlewareInstance);
    app.use(historyApiFallback());
    app.use(webpackMiddlewareInstance);

    app.use(
        webpackHotMiddleware(webpackCompiler, {
            log: console.log
        })
    );
} else {
    // Static files middleware
    app.use(express.static('build'));

    app.use((req, res) => {
        res.sendFile(`${__dirname  }/build/index.html`);
    });
}

server.listen(config.server_port);

module.exports = {
    mongoose,
    express,
    app,
    server
};
