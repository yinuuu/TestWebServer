const { BasicPrx } = require('../../rpc/index')
const path = require("path");

const BasicService = {
  getInstrumentHis: async ctx => {
    return await BasicPrx.GetInstrumentHis(ctx)
  }
}

module.exports = BasicService
