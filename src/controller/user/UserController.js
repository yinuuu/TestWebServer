const UserService = require("../../service/user/UserService.js")
const _ = require("lodash")
const UserController = {
    getUserById: async ctx => {
        const res = await UserService.getUser()
        ctx.makeResponse(20000, '', res)
    }
}
module.exports = UserController
