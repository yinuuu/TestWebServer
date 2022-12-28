const conf = {
    webConf: {
        host:'localhost',
        port:'4123',
        alter: true, // 从配置文件直接变更表结构
        clickHouse: 'http://10.253.50.202:8123',
        json: 'http://10.253.50.89:8200'
    },
    dbConf: {
        futang_auth: {
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'Kayak2021!',
            charset: 'utf8',
            pool: {
                max: 10, // 连接池中最大连接数量
                min: 0, // 连接池中最小连接数量
                idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
            }
        }
    }
}
if(process.env.NODE_ENV === 'dev') {
    conf.webConf = {
        host:'localhost',
        port:'4123',
        alter: true, //从配置文件直接变更表结构
        clickHouse: 'http://10.253.50.202:8123',
        json: 'http://10.253.50.89:8200'
    }
    conf.dbConf = {
        futang_auth: {
            host: '10.253.50.88',
            port: '3306',
            user: 'root',
            password: 'root@Pass!',
            charset: 'utf8',
            pool: {
                max: 10, // 连接池中最大连接数量
                min: 0, // 连接池中最小连接数量
                idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
            }
        }
    }
}

module.exports = conf
