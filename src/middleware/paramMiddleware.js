const _ = require("lodash")
const paramDealMiddleware = () => async (ctx, next) => {
    // 所有传参全部代理到 ctx.params
    ctx.params = _.extend(ctx.query || {}, ctx.request.body || {}, ctx.req.body || {})
    !ctx.params.currentPage ? ctx.params.currentPage = 1 : ''   // 设置列表查询翻页默认值
    !ctx.params.pageSize ? ctx.params.pageSize = 10 : ''
    if(ctx.headers && ctx.headers.authorization) {
        ctx.token = ctx.headers.authorization.split(' ')[1]
    }
    ctx.makeResponse = (code, err_msg, res = {}) => {
        ctx.body = {data: res, code, err_msg}
    }

    ctx.makeError = (err_msg = `系统错误`) => {
        ctx.body = {data: {}, code: 0, err_msg}
    }
    await next()
}

module.exports = {
    paramDealMiddleware
}
