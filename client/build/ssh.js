/* eslint-disable */
const {exec} = require("child_process");
const path = require('path');
const JSZIP = require('jszip');
const fs = require('fs');
const Client = require('ssh2').Client;
const Config = require('./config.js');
const chalk = require('chalk');
const zip = new JSZIP();
// 前端打包文件的目录
const rootDir = path.resolve(__dirname, '..');
/**
 * ssh连接
 */
class SSH {
  constructor ({ host, port, username, password, privateKey }) {
    this.server = {
      host,
      port,
      username,
      password,
      privateKey
    }
    this.conn = new Client()
  };

  // 连接服务器
  connectServer () {
    return new Promise((resolve, reject) => {
      const conn = this.conn
      conn
        .on('ready', () => {
          resolve({
            success: true
          })
        })
        .on('error', (err) => {
          reject(err)
        })
        .on('end', () => {
          const desc =
            '*******************************************\n' +
            '***           SSH连接已结束        ***\n' +
            '*******************************************\n'
          console.log(chalk.green(desc))
        })
        .on('close', () => {
          const desc =
            '*******************************************\n' +
            '***           SSH连接已关闭        ***\n' +
            '*******************************************\n'
          console.log(chalk.green(desc))
        })
        .connect(this.server)
    })
};
  // 上传文件
  uploadFile ({ localPath, remotePath }) {
    return new Promise((resolve, reject) => {
      return this.conn.sftp((err, sftp) => {
        if (err) {
          reject(err)
        } else {
          sftp.fastPut(localPath, remotePath, (err, result) => {
            if (err) {
              reject(err)
            }
            resolve({
              success: true,
              result
            })
          })
        }
      })
    })
  }

  // 执行ssh命令
  execSsh (command) {
    return new Promise((resolve, reject) => {
      return this.conn.exec(command, (err, stream) => {
        if (err || !stream) {
          reject(err)
        } else {
          stream
            .on('close', (code, signal) => {
              resolve({
                success: true
              })
            })
            .on('data', function (data) {

            })
            .stderr.on('data', function (data) {
              resolve({
                success: false,
                error: data.toString()
              })
            })
        }
      })
    })
  }

  // 结束连接
  endConn () {
    this.conn.end()
    if (this.connAgent) {
      this.connAgent.end()
    }
  }
}

/*
 * 本地操作
 * */
class File {
  constructor () {
    this.fileName = this.formateName()
  }

  // 删除本地文件
  deleteLocalFile () {
    return new Promise((resolve, reject) => {
      fs.unlink(path.join(rootDir, '/', this.fileName), function (error) {
        if (error) {
          const desc =
            '*******************************************\n' +
            '***            本地文件删除失败          ***\n' +
            '*******************************************\n'
          console.log(chalk.yellow(desc))
          reject(error)
        } else {
          const desc =
            '*******************************************\n' +
            '***              删除成功               ***\n' +
            '*******************************************\n'
          console.log(chalk.blue(desc))
          resolve({
            success: true
          })
        }
      })
    })
  }

  // 读取文件
  readDir (obj, nowPath) {
    const files = fs.readdirSync(nowPath) // 读取目录中的所有文件及文件夹（同步操作）
    files.forEach((fileName, index) => {
      // 遍历检测目录中的文件
      // console.log(fileName, index) // 打印当前读取的文件名
      const fillPath = nowPath + '/' + fileName
      const file = fs.statSync(fillPath) // 获取一个文件的属性
      if (file.isDirectory()) {
        // 如果是目录的话，继续查询
        const dirlist = obj.folder(fileName) // 压缩对象中生成该目录
        this.readDir(dirlist, fillPath) // 重新检索目录文件
      } else {
        obj.file(fileName, fs.readFileSync(fillPath)) // 压缩目录添加文件
      }
    })
  }

  // 压缩文件夹下的所有文件
  zipFile (filePath) {
    return new Promise((resolve, reject) => {
      let desc =
         '*******************************************\n' +
         '***                正在压缩              ***\n' +
         '*******************************************\n'
      console.log(chalk.blue(desc))
      this.readDir(zip, filePath)
      zip
        .generateAsync({
          // 设置压缩格式，开始打包
          type: 'nodebuffer', // nodejs用
          compression: 'DEFLATE', // 压缩算法
          compressionOptions: {
            // 压缩级别
            level: 9
          }
        })
        .then(content => {
          fs.writeFileSync(
            path.join(rootDir, '/', this.fileName),
            content,
            'utf-8'
          )
          desc =
            '*******************************************\n' +
            '***                压缩成功              ***\n' +
            '*******************************************\n'
          console.log(chalk.green(desc))
          resolve({
            success: true
          })
        }).catch(err => {
          console.log(chalk.red(err))
          reject(err)
        })
    })
  }

  // 打包本地前端文件
  buildProject () {
    return new Promise((resolve, reject) => {
      exec(Config.buildCommand, async (error, stdout, stderr) => {
        if (error) {
          console.error(error)
          reject(error)
        } else if (stdout) {
          resolve({
            stdout,
            success: true
          })
        } else {
          console.error(stderr)
          reject(stderr)
        }
      })
    })
  }

  // 停止程序之前需删除本地压缩包文件
  stopProgress () {
    this.deleteLocalFile()
      .catch((e) => {
        console.log(chalk.red('----删除本地文件失败，请手动删除----'))
        console.log(chalk.red(e))
        process.exit(1)
      })
      .then(() => {
        const desc =
           '*******************************************\n' +
           '***          已删除本地压缩包文件        ***\n' +
           '*******************************************\n'
        console.log(chalk.green(desc))
        process.exitCode = 0
      })
  }

  // 格式化命名文件名称
  formateName () {
    // 压缩包的名字
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const timeStr = `${year}_${month}_${day}`
    return `${Config.buildDist}-${timeStr}-${Math.random()
      .toString(16)
      .slice(2)}.zip`
  }
}

// SSH连接，上传，解压，删除等相关操作
async function sshUpload (sshConfig, fileName) {
  const sshCon = new SSH(sshConfig)
  const sshRes = await sshCon.connectServer().catch((e) => {
    console.error(e)
  })
  if (!sshRes || !sshRes.success) {
    const desc =
       '*******************************************\n' +
       '*** ssh连接失败 ***\n' +
       '*******************************************\n'
    console.log(chalk.red(desc))
    return false
  }
  let desc =
   '*******************************************\n' +
   '***      连接服务器成功，开始上传文件     ***\n' +
   '*******************************************\n'
  console.log(chalk.green(desc))
  // 判断文件是否存在，如果不存在则进行创建文件夹
  await sshCon.execSsh(
    `
    if [[ ! -d ${sshConfig.catalog} ]]; then
     mkdir -p ${sshConfig.catalog}
    fi
    `
  )
  const uploadRes = await sshCon
    .uploadFile({
      localPath: path.join(rootDir, '/', fileName),
      remotePath: sshConfig.catalog + '/' + fileName
    })
    .catch((e) => {
      console.error(e)
    })

  if (!uploadRes || !uploadRes.success) {
    console.error('----上传文件失败，请重新上传----')
    return false
  }
  desc =
   '*******************************************\n' +
   '***       上传文件成功，开始解压文件      ***\n' +
   '*******************************************\n'
  console.log(chalk.green(desc))
  const zipRes = await sshCon
    .execSsh(
      `unzip -o ${sshConfig.catalog + '/' + fileName} -d ${sshConfig.catalog}`
    )
    .catch((e) => {})
  if (!zipRes || !zipRes.success) {
    console.error('----解压文件失败，请手动解压zip文件----')
    console.error(`----错误原因：${zipRes.error}----`)
    return false
  } else if (Config.deleteFile) {
    desc =
       '*******************************************\n' +
       '***   解压文件成功，开始删除上传的压缩包   ***\n' +
       '*******************************************\n'
    console.log(chalk.green(desc))
    // 注意：rm -rf为危险操作，请勿对此段代码做其他非必须更改
    const deleteZipRes = await sshCon
      .execSsh(`rm -rf ${sshConfig.catalog + '/' + fileName}`)
      .catch((e) => {})
    if (!deleteZipRes || !deleteZipRes.success) {
      console.log(chalk.pink('----删除文件失败，请手动删除zip文件----'))
      console.log(chalk.red(`----错误原因：${deleteZipRes.error}----`))
      return false
    }
  }
  // 结束ssh连接
  sshCon.endConn()
  return true
}
// 执行前端部署
;(async () => {
  const file = new File()
  let desc =
    '*******************************************\n' +
    '***              开始编译               ***\n' +
    '*******************************************\n'
  if (Config.isNeedBuild) {
    console.log(chalk.green(desc))
    // 打包文件
    const buildRes = await file
      .buildProject()
      .catch((e) => {
        console.error(e)
      })
    if (!buildRes || !buildRes.success) {
      desc =
            '*******************************************\n' +
            '***          打包出错，请检查错误         ***\n' +
            '*******************************************\n'
      console.log(chalk.red(desc))
      return false
    }
    console.log(chalk.blue(buildRes.stdout))
    desc =
          '*******************************************\n' +
          '***              编译成功               ***\n' +
          '*******************************************\n'
    console.log(chalk.green(desc))
  }
  // 压缩文件
  const res = await file
    .zipFile(path.join(rootDir, '/', Config.buildDist))
    .catch(() => {})
  if (!res || !res.success) return false
  desc =
   '*******************************************\n' +
   '***              开始部署               ***\n' +
   '*******************************************\n'
  console.log(chalk.green(desc))

  const bol = await sshUpload(Config.publishEnv, file.fileName)
  if (bol) {
    desc =
     '\n******************************************\n' +
     '***              部署成功              ***\n' +
     '******************************************\n'
    console.log(chalk.green(desc))
    file.stopProgress()
  } else {
    process.exit(1)
  }
})()
