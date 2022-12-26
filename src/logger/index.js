const winston = require('winston');
const format = winston.format
require('winston-daily-rotate-file');
const path = require("path")
const stack = require("callsite")
const logPath = path.join(__dirname, '../logs')
const consoleTransport = new winston.transports.Console({level: 'info'})
const infoTransport = new winston.transports.DailyRotateFile({
    level: 'info',
    dirname: logPath,
    auditFile: path.join(logPath,'access.audit.json'),
    filename: 'access.log.%DATE%',
    datePattern: 'YYYYMMDD',
    maxSize: '20m',
    maxFiles: '14d'
});
const errorTransport = new winston.transports.DailyRotateFile({
    level: 'error',
    dirname: logPath,
    auditFile: path.join(logPath,'error.audit.json'),
    filename: 'error.log.%DATE%',
    datePattern: 'YYYYMMDD',
    maxSize: '20m',
    maxFiles: '14d'
})

const innerLogger = winston.createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
    ),
    transports: [
        consoleTransport,
        infoTransport,
        errorTransport
    ]
});
const logArr2Str = arr => {
    const stackList = stack() || []
    const caller = stackList[2]
    let preStr = ''
    if(caller.getFileName){
        const filename = caller.getFileName()
        preStr += filename.substring(filename.lastIndexOf('/') + 1) + ' : '
        preStr += caller.getLineNumber() + ' | '
    }
    let content = ''
    arr.forEach(log => {
        if(log instanceof Error){
            content += log.stack + ' ';
        }else if(['Object', 'Array'].includes(Object.prototype.toString.call(log).slice(8,-1))){
            if(log.request && log.response){
                // 传的是ctx
                preStr = `${log.method || ''} | ${log.ip || ''} ${log.url} | ${preStr}`
            }else {
                content += JSON.stringify(log, null ,2) + ' '
            }
        }else {
            content += log + ' '
        }
    })
    return preStr + content
}
const logger = {
    info:(...args) => {
        innerLogger.info(logArr2Str(args))
    },
    error: (...args) => {
        innerLogger.error(logArr2Str(args))
    }
}
global.logger = logger
