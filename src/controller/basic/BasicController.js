const BasicService = require('../../service/basic/basicService')
const {dbCtl} = require("../../dao/db");
const fs = require("fs");
const path = require("path");
const basicKsf = require('../../rpc/proxy/BasicObjProxy').ksQuant

const BasicController = {
  getInstrumentHis: async ctx => {
    try {
      const { inst_ids } = ctx.params
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

  initDB: async ctx =>{
    try {
      const { host, port, user, password } = ctx.params
      if (host && port && user && password) {
        let res = await dbCtl.initConnectDB({host, port, user, password})
        let { code, err_msg } = res
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
  }
}

module.exports = BasicController
