const UserDao = require("../../dao/UserDao.js")
const { v4: uuid4 } = require("uuid")
const crypto = require('crypto')
// const SECRET_KEY = 'KICKSTART' 暂时不用密钥了 可以拼接到密码后面
const encrypt = content => crypto.createHash('md5').update(content).digest('hex')
const UserService = {
    getUser: async () => UserDao.getUser()
}
module.exports = UserService
