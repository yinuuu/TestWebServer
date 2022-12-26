const { RPCClientPrx } = require('./service')

const BasicObjProxy = require("./proxy/BasicObjProxy").ksQuant

module.exports = {
  // RPCClientPrx,
  BasicPrx: RPCClientPrx(BasicObjProxy.BasicObjProxy, 'Data.KSBasicServer.BasicObj@tcp -h 10.253.50.89 -t 60000 -p 9002 -e 0'),
}
