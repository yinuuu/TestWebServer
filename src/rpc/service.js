const client = require('@ksf/rpc').client
client.setProperty("timeout",30000);

const RPCClientPrx = (proxy, servantName, setInfo) => {
  let rpcClient = client.stringToProxy(proxy, servantName, setInfo)
  for (let p in rpcClient) {
    if (!rpcClient.hasOwnProperty(p) && p != 'getTimeout' && p != 'setTimeout') {
      ((p, fun) => {
        rpcClient[p] = (function (p) {
          let fnName = p
          return async function (...args) {
            try {
              let _args = args
              let rst = await (async () => {
                let result = await fun.apply(rpcClient, _args)
                // logger.info( 'method: ',fnName, ' request: ', _args, ' response: ', JSON.stringify(result.response));
                let args = result.response.arguments.rsp
                let rst = { __return: result.response.return }
                for (let p in args) {
                  if (typeof args[p] === 'object') {
                    rst[p] = args[p].toObject()
                  } else {
                    rst[p] = args[p]
                  }
                }
                logger.info('method: ', fnName, '| request: ', JSON.stringify(_args))
                return rst
              })()
              return rst
            } catch (e) {
              logger.error(e)
              if (e.response) {
                throw new Error(e.response && e.response.error && e.response.error.message)
              } else {
                throw e
              }
            }
          }
        })(p)
      })(p, rpcClient[p])
    }
  }
  return rpcClient
}

//生成rpc结构体
const RPCStruct = function (proxy, moduleName) {
  var module = proxy[moduleName]
  var rpcStruct = {}
  for (var p in module) {
    if (module.hasOwnProperty(p)) {
      if (typeof module[p] == 'function') {
        if (new module[p]()._classname) {
          rpcStruct[p] = module[p]
        }
      } else {
        rpcStruct[p] = module[p]
      }
    }
  }
  return rpcStruct
}

module.exports = { RPCClientPrx, RPCStruct }
