// const TokenService = require("../service/token/TokenService")
const tokenMiddleware = () => async (ctx, next) => {
    // 所有传参全部代理到 ctx.params
    if(1!==1){
        await next()
        return
    }
    if(ctx.url.includes('token')){ // /token 接口不鉴权
        logger.info(ctx)
        await next()
    }else {
        // if(!ctx.token){
        //     logger.error(ctx,"request headers need token")
        //     ctx.throw(401,"no authorization")
        // }else {
        //     const user = await TokenService.validateAccessToken(ctx.token)
        //     if(!user){
        //         logger.error(ctx,"token is not valid")
        //         ctx.throw(401,"forbidden, not a valid token")
        //     }else {
        //         ctx.user = user
        //         logger.info(ctx , user.nick_name , ctx.params)
        //         await next()
        //     }
        // }
        logger.info(ctx)
        await next()
    }
}

module.exports = {
    tokenMiddleware
}
