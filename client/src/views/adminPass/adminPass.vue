<template>
  <div>
    <ks-steps class="ks-steps" :active="active" flow>
      <ks-step title="启动脚本" description="启动脚本运行" />
      <ks-step title="数据库创建" description="创建数据库，启动框架服务" />
      <ks-step title="数据库连接" description="第一次设置[admin]用户相关的配置信息" />
    </ks-steps>

    <div v-if="active === 1">
      <ks-form
        ref="form"
        class="pass_page"
        size="large"
        :model="firstData"
        :rules="formRules"
        label-width="100px"
      >
        <ks-form-item>
          <ks-input v-model="firstData.input" placeholder="执行命令" style="width: 300px;margin-right: 10px"></ks-input>
          <ks-button type="primary" @click="$refs.file.click()">上传文件</ks-button>
          <input v-show="false" ref="file" type="file" accept=".sh" @change="handleFileInput"></input>
          <ks-button type="primary" @click="exec" style="margin-left: 10px">执行脚本</ks-button>
          <ks-button @click="next" :disabled="isNext">下一步</ks-button>
        </ks-form-item>
        <ks-form-item>
          <div class="article_txt" v-html="firstData.textarea" />
        </ks-form-item>
      </ks-form>
    </div>

    <div v-if="active === 2">
      <ks-form
        ref="form"
        class="admin_pass_page"
        size="large"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <ks-form-item>
          <ks-button type="primary" @click="initConfig">连接</ks-button>
          <ks-button @click="previous">上一步</ks-button>
          <ks-button @click="next">下一步</ks-button>
        </ks-form-item>
      </ks-form>
    </div>

    <div v-if="active === 3">
      <ks-form
        ref="form"
        class="admin_pass_page"
        size="large"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <ks-form-item label="主机" prop="host">
          <ks-input v-model="formData.host" />
        </ks-form-item>
        <ks-form-item label="端口" prop="port">
          <ks-input v-model="formData.port" />
        </ks-form-item>
        <ks-form-item label="用户" prop="user">
          <ks-input v-model="formData.user" />
        </ks-form-item>
        <ks-form-item label="密码" prop="password">
          <ks-input v-model="formData.password" />
        </ks-form-item>
        <ks-form-item>
          <ks-button type="primary" @click="initConfig">连接</ks-button>
          <ks-button @click="previous">上一步</ks-button>
          <ks-button :disabled="isDisabled" @click="next">下一步</ks-button>
        </ks-form-item>
      </ks-form>
    </div>
  </div>
</template>

<script>
import {initDB, execShell, uploadFile} from '@/api/login'
import router from '@/router'
import { isValidHostPort } from '@/utils/tools/validate'

export default {
  name: 'AdminPassPage',
  components: {},
  data() {
    const checkPort = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error('请输入端口'))
      } else {
        if (!isValidHostPort(value, 2)) {
          callback()
        } else {
          return callback(new Error('端口格式不正确'))
        }
      }
    }
    const checkHost = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error('请输入IP'))
      } else {
        if (!isValidHostPort(value, 1)) {
          callback()
        } else {
          return callback(new Error('IP格式不正确'))
        }
      }
    }
    return {
      active: 1,
      isDisabled: true,
      isNext: true,
      firstData: {
        input: '',
        textarea: '脚本执行结果...'
      },
      formData: {
        host: '10.253.50.88',
        port: '3306',
        user: 'root',
        password: 'root@Pass!'
      },
      formRules: {
        host: [{ required: true, validator: checkHost, trigger: 'blur' }],
        port: [{ required: true, validator: checkPort, trigger: 'blur' }],
        user: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    redirectUrl() {
      const key = 'redirect_url='
      const idx = location.search.indexOf(key)
      if (idx > -1) {
        return decodeURIComponent(location.search.substring(idx + key.length))
      } else {
        return '/'
      }
    }
  },
  methods: {
    initConfig() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.formData))
          const ret = await initDB(params)
          if (ret.code === 20000) {
            this.isDisabled = false
            this.$message.success(ret.err_msg)
            router.push('/login')
          } else {
            this.$message.error(ret.err_msg)
          }
        } else {
          return false
        }
      })
    },
    async handleFileInput(e) {
      await this.$refs.form.validate()
      const file = e.target.files[0]
      this.firstData.input = file.name
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', this.firstData.input)
      await uploadFile(formData)
    },
    async exec() {
      let ret = await execShell({param: this.firstData.input})
      if (ret.code === 0) {
        this.firstData.textarea = ret.data?.replace(/\n/g, "<br>")
        this.$message.success('脚本执行成功！')
        this.isNext = false
      } else {
        this.firstData.textarea = ret.err_msg?.replace(/\n/g, "<br>")
        this.$message.error(`脚本执行失败，err_code: ${ret.code}`)
        this.isNext = true
      }
    },
    previous() {
      if (this.active === 2) {
        this.active = 1
      } else if (this.active === 3) {
        this.active = 2
      }
    },
    next() {
      if (this.active === 1) {
        this.active = 2
      } else if (this.active === 2) {
        this.active = 3
      }
      // router.push('/login')
    }
  }
}
</script>
<style>
.admin_pass_page {
  width: 450px;
  margin: 50px auto;
}
.top-title {
  line-height: 2.5;
  font-size: 24px;
  border-bottom: 1px solid #c5d9e8;
  display: flex;
  justify-content: center;
}
.ks-steps {
  margin: 60px auto;
  width: 70%;
}
.pass_page {
  margin: 50px;
}
.article_txt {
  border: 1px solid #dae3e8;
  width: auto;
  height: 540px;
  padding: 10px;
  overflow: auto;
}
</style>
