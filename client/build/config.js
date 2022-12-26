/*
 * @description: 部署配置
 * @author: shengchao.yuan
 * @Date: 2020-09-10 11:25:50
 * @LastEditTime: 2021-04-21 15:18:39
 * @LastEditors: shengchao.yuan
 */
/* eslint-disable */
const config = {
  // 线上环境
  pro: {
    host: "10.253.46.207", // 服务器ip地址或域名
    username: "root", // ssh登录用户
    password: "", // 密码，请勿将此密码上传至git服务器
    catalog: "/root/Kingstar/ks-cli/easy", // 前端文件压缩目录
    port: 22, // 服务器ssh连接端口号
    privateKey: null // 私钥，私钥与密码二选一
  }
};

module.exports = {
  // publishEnv: pro,
  publishEnv: config.pro, // 发布环境
  buildDist: "dist", // 前端文件打包之后的目录，默认dist
  buildCommand: "npm run build", // 打包前端文件的命令
  readyTimeout: 20000, // ssh连接超时时间
  deleteFile: true, // 是否删除线上上传的dist压缩包
  isNeedBuild: true // 是否需要打包
};
