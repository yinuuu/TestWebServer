const UserController = require("./controller/user/UserController.js")
const BasicController = require("./controller/basic/BasicController");
const apiConf = [
    // 查询用户信息
    ['post', '/getUser', UserController.getUserById],
    ['post', '/getInstrumentHis', BasicController.getInstrumentHis],
    ['get', '/getConfigToken', BasicController.getConfigToken],
    ['post', '/initDB', BasicController.initDB],
    ['post', '/execShell', BasicController.execShell],
]

module.exports = {
    apiConf
}
