const Router = require("koa-router")
const { paramDealMiddleware } = require("./paramMiddleware")
const { tokenMiddleware } = require("./tokenMiddleware")

const getRouter = (router,routerConf) => {
    routerConf.forEach(conf => {
        const [method , url , controller , checkRule , validParams ] = conf
        //执行 router.post(url, async) 是干嘛的, 感觉像是注册回调函数的
        router[method](url, paramDealMiddleware())
        router[method](url, tokenMiddleware())
        router[method](url, async (ctx , next) => {
            await controller.call({},ctx);
            await next()
        })
    })
}

const apiRouter = new Router()

const { apiConf } = require("../index.js")
getRouter(apiRouter, apiConf)

module.exports = {
    apiRouter
}
