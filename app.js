const Koa = require("koa")
const app = new Koa()
const onerror = require("koa-onerror")
const bodyparser = require("koa-bodyparser")
const router = require("koa-router")()
const path = require("path")
const k2c = require("koa2-connect");
const { createProxyMiddleware } = require("http-proxy-middleware");
const static = require('koa-static');
const WebConf = require('./src/config/webConfig')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
onerror(app)

app.use(async (ctx, next) => {
    console.log(ctx.url)
    await next()
})

app.use(async (ctx, next) => {
    if (ctx.url.startsWith("/web")) {
        ctx.respond = false;
        await k2c(
            createProxyMiddleware({
                target: `http://localhost:${WebConf.webConf.port}`,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/web': ''
                }
            })
        )(ctx, next);
    }else if (ctx.url.startsWith("/oauth")) {
        ctx.respond = false;
        await k2c(
            createProxyMiddleware({
                target: `http://localhost:${WebConf.webConf.port}`,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/oauth': ''
                }
            })
        )(ctx, next);
    }else if (ctx.url.startsWith("/clickHouse")) {
        ctx.respond = false;
        await k2c(
            createProxyMiddleware({
                target: `${WebConf.webConf.clickHouse}`,
                changeOrigin: true,
                secure: false,
                onProxyReq(proxyReq){
                    proxyReq.setHeader("X-ClickHouse-User", "admin")
                    proxyReq.setHeader("X-ClickHouse-Key", "root@Pass!")
                }
            })
        )(ctx, next);
    } else if (ctx.url.startsWith("/json")) {
        ctx.respond = false;
        await k2c(
            createProxyMiddleware({
                target: `${WebConf.webConf.json}`,
                changeOrigin: true,
                secure: false,
            })
        )(ctx, next);
    }
    await next();
});

app.use(bodyparser())
const multer = require('@koa/multer')
const upload = multer( {dest: path.join(__dirname,'./files/') } )
app.use(upload.array('file',5))
const { apiRouter } = require("./src/middleware/index")
const url = require("url");
app.use(apiRouter.routes()).use(apiRouter.allowedMethods({throw: true}))
app.use(router.routes()).use(router.allowedMethods())
app.use(historyApiFallback())
app.use(static(path.join(__dirname, './client/standard'), {maxage: 7 * 24 * 60 * 60 * 1000}));
module.exports = app
