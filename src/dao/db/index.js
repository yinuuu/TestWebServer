const Sequelize = require("sequelize")
const fs = require("fs")
const path = require("path")
const webConf = require("../../config/webConfig.js")
const _ = require("lodash")
const Db = {}, dbCtl = {}
const databases = ['futang_auth']

fs.readFile(path.join(__dirname, '/project.json'),function(err,data){
    let jsonData = data.toString(); //将二进制的数据转换为字符串
    if (jsonData) {
        jsonData = JSON.parse(jsonData); //将字符串转换为json对象
        dbCtl.initConnectDB(jsonData).then();
    }
})

dbCtl.initConnectDB = async (data) => {
    return await new Promise((resolve, reject) => {
        databases.forEach(database => {
            const {
                charset,
                pool
            } = webConf.dbConf[database]
            const { user, password, host, port} = data
            // 打印sql语句
            const logging = process.env.NODE_ENV === "dev" ? (sqlText) => {
                // console.log(sqlText);
                // logger.sql(sqlText)
            } : true
            // 初始化 sequelize
            const sequelize = new Sequelize(
                database,
                user,
                password,
                {
                    host,
                    port,
                    dialect: 'mysql',
                    dialectOptions: {
                        charset: charset
                    },
                    define: {
                        charset: charset
                    },
                    logging,
                    pool: {
                        max: pool.max || 10,
                        min: pool.min || 0,
                        idle: pool.idle || 10000
                    },
                    timezone: (() => {
                        let offset = 0 - new Date().getTimezoneOffset();
                        return (offset >= 0 ? '+' : '-') + (Math.abs(parseInt(offset / 60)) + '').padStart(2, '0') + ':' + (offset % 60 + '').padStart(2, '0');
                    })()  //获取当前时区并做转换
                }
            );
            // 测试数据库连接
            (async () => {
                try{
                    await sequelize.authenticate()
                    fs.writeFile(path.join(__dirname, '/project.json'), JSON.stringify(data),function(err){
                        if (err) {
                            resolve({code: -1, err_msg: '配置失败'})
                        }
                    })
                    logger.info(`${database} 连接成功`)
                    resolve({code: 20000, err_msg: `${database} 连接成功`})
                }catch (e) {
                    logger.error(`数据库 ${database} 链接失败：`, e)
                    resolve({code: -1, err_msg: `数据库 ${database} 链接失败`, e})
                }
            })();
            const dbModel = {
                sequelize
            }
            const tableModels = fs.readdirSync(path.join(__dirname,`./${database}_models`))
            tableModels.forEach(async (tableModel) => {
                const tableName = tableModel.replace(/\.js/g,'')
                dbModel[_.camelCase(tableName)] = require(path.join(__dirname,`./${database}_models/${tableName}`))(sequelize,Sequelize.DataTypes)
                if(webConf.webConf.alter){
                    try {
                        if(database === 'quota_test') return // quota_test do not change it
                        await dbModel[_.camelCase(tableName)].sync({alter:true})
                        logger.info(`${database}.${tableName} 表解构变更成功`)
                    }catch (e) {
                        logger.error(`${database}.${tableName} 表解构变更失败`)
                        resolve({code: -1, err_msg: `${database}.${tableName} 表解构变更失败`})
                    }
                }
            })
            Db[database] = dbModel
        })
        global.Db = Db
    })
}

module.exports = {
    dbCtl
}
