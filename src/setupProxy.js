const proxy = require('http-proxy-middleware')

module.exports = function(app) {

    require('dotenv').config()

    //sets url for DOAPI as endpoint
    const apiUrl = process.env.DO_API_URL

    //loads personal access token into proxy server
    const apiToken = process.env.DO_ACCESS_TOKEN
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiToken
    }

    //define http-proxy-middleware
    let DOProxy = proxy({
        target: apiUrl,
        changeOrigin: true,

        //mounts the proxy server to /api instead of /
        pathRewrite: {
            '^/api/' : '/'
        },
        headers: headers,
    })

    //define the route and map the proxy
    app.use('/api', DOProxy)
};