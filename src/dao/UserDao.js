// const { user , sequelize } = require("./db/index.js")['futang_auth']
const Sequelize = require("sequelize")
const Op = Sequelize.Op

const UserDao = {
    getUser: async () => await global.Db['futang_auth']['user'].findOne(),
}
module.exports = UserDao
