const app = require("../app.js")
const http = require("http")
const cluster = require("cluster")
const os = require("os")
const webConf = require("../src/config/webConfig.js")
require("../src/logger/index.js")
const port = webConf.webConf.port
const enableMultiProcess = false; //是否开启多进程

try {
    const cpuCores = os.cpus().length
    if(cluster.isMaster && enableMultiProcess){

    }else if(cluster.isWorker || !enableMultiProcess){  // 正常启动竟然不是 cluster.isWorker是false
        const server = http.createServer(app.callback())
        server.listen(port,'0.0.0.0',() => {
            logger.info(`服务成功启动 http://127.0.0.1:${port}`)
        })
        server.on('error',error => {
            logger.error(error)
            process.exit(1)
        })
    }
}catch (e) {
    logger.error("服务启动失败:",e)
}

