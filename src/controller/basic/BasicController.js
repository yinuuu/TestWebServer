const BasicService = require('../../service/basic/basicService')
const {dbCtl} = require("../../dao/db")
const fs = require('fs-extra');
const shell = require('shelljs')
const basicKsf = require('../../rpc/proxy/BasicObjProxy').ksQuant

const BasicController = {
    getInstrumentHis: async ctx => {
        try {
            const {inst_ids} = ctx.params
            const stReq = new basicKsf.GetInstrumentsHisReq()
            stReq.readFromObject({
                inst_ids: inst_ids?.split(',') ?? []
            });
            const res = await BasicService.getInstrumentHis(stReq)
            ctx.makeResponse(20000, '', res)
        } catch (e) {
            logger.error(e)
            ctx.makeError()
        }
    },

    getConfigToken: async ctx => {
        try {
            let res = global.Db
            ctx.makeResponse(20000, '', {data: !!res})
        } catch (e) {
            logger.error(e)
            ctx.makeError()
        }
    },

    initDB: async ctx => {
        try {
            const {host, port, user, password} = ctx.params
            if (host && port && user && password) {
                let res = await dbCtl.initConnectDB({host, port, user, password})
                let {code, err_msg} = res
                if (code !== 20000) {
                    global.Db = null
                }
                ctx.makeResponse(code, err_msg, {})
            } else {
                ctx.makeResponse(20000, '请输入正确的参数！', {})
            }
        } catch (e) {
            logger.error(e)
            ctx.makeError()
        }
    },

    execShell: async ctx => {
        try {
            const {param} = ctx.params
            let res
            if (param) {
                shell.cd(`${shell.pwd()}`.endsWith('shell') ? `${shell.pwd()}` : `${shell.pwd()}/files/shell`)
                res = shell.exec(`${param}`);
                logger.info(res)
            } else {
                shell.cd(`${shell.pwd()}/src/rpc/ksf`)
                res = shell.exec(`bash ksf2js.sh`);
                logger.info(res)
            }
            ctx.makeResponse(res.code, res.stderr, res.stdout)
        } catch (e) {
            logger.error(e)
            ctx.makeError()
        }
    },
    uploadFile: async ctx => {
        try {
            const file = ctx.files[0]
            if (!file) {
                logger.error('[uploadPatchPackage]:', 'no files');
                return ctx.makeError('no files');
            }
            let baseUploadPath = `/data/programs/services/TestWebServer/files`;
            // 发布包上传目录
            let updateTgzPath = `${baseUploadPath}/shell`;
            // console.info('updateTgzPath:', updateTgzPath);
            await fs.ensureDirSync(updateTgzPath);
            let uploadTgzName = `${file.originalname}`;
            await fs.rename(`${baseUploadPath}/${file.filename}`, `${updateTgzPath}/${uploadTgzName}`);

            ctx.makeResponse(20000, '', '')
        } catch (e) {
            logger.error(e)
            ctx.makeError("文件解析失败")
        }
    },
}

module.exports = BasicController




