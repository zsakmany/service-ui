'use strict';

var path = require('path');

var publicPath = path.resolve('../../../../build/resources/main/public');
var proxyConfig = require('./config-proxy');

if(proxyConfig.path == '') {
    console.log('========== Specify the path for the proxy in the config-proxy.js file =========')
}

module.exports = {
    devServer: {
        contentBase: publicPath,
        // https: true,
        host: '0.0.0.0',
        headers: { "Access-Control-Allow-Origin": "*" },
        proxy: [
            {
                path: /^\/documentation\/documentation.html/,
                // target: 'http://reportportal.io/documentation/documentation.html',
                "target": {
                    "host": "reportportal.io",
                    "protocol": 'http:',
                    "port": 80
                },
                secure: false,
                changeOrigin: true,
                ignorePath: false,
                bypass: function (req, res, options) {
                    console.log('proxy url: ' + req.url);
                }
            },{
                path: /^(?!\/(documentation)).*/,
                target: 'http:localhost:8080',
                bypass: function (req, res, options) {
                    console.log('resource url: ' + req.url);
                    if (!req.url.match(/\./)) {
                        return '/index.html';
                    }
                    return req.url;
                }
            }
        ]
    }
};
