const { BasicPrx } = require('../../rpc/index')

const BasicService = {
  getInstrumentHis: async data => {
    return await BasicPrx.GetInstrumentHis(data)
  },

}

module.exports = BasicService
