<template>
  <div>
    <h1 class="top-title">第一次登录 -- 请设置[admin]用户相关的配置信息</h1>
    <ks-form
      ref="form"
      class="admin_pass_page"
      size="large"
      :model="formData"
      :rules="formRules"
      label-width="100px"
    >
      <ks-form-item label="主机" prop="host">
        <ks-input v-model="formData.host"></ks-input>
      </ks-form-item>
      <ks-form-item label="端口" prop="port">
        <ks-input v-model="formData.port"></ks-input>
      </ks-form-item>
      <ks-form-item label="用户" prop="user">
        <ks-input v-model="formData.user"></ks-input>
      </ks-form-item>
      <ks-form-item label="密码" prop="password">
        <ks-input v-model="formData.password"></ks-input>
      </ks-form-item>
      <ks-form-item>
        <ks-button type="primary" @click="initConfig">连接</ks-button>
        <ks-button @click="next" :disabled="isDisabled">下一步</ks-button>
      </ks-form-item>
    </ks-form>
  </div>
</template>

<script>
import {initDB} from "@/api/login";
import router from "@/router";
import {isValidHostPort} from "@/utils/tools/validate"

export default {
  name: 'admin_pass_page',
  data() {
    const checkPort = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error('请输入端口'));
      } else {
        if (!isValidHostPort(value, 2)) {
          callback();
        } else {
          return callback(new Error('端口格式不正确'));
        }
      }
    }
    const checkHost = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error('请输入IP'));
      } else {
        if (!isValidHostPort(value, 1)) {
          callback();
        } else {
          return callback(new Error('IP格式不正确'));
        }
      }
    };
    return {
      isDisabled: true,
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
    };
  },
  computed: {
    redirectUrl() {
      let key = 'redirect_url=';
      let idx = location.search.indexOf(key);
      if (idx > -1) {
        return decodeURIComponent(location.search.substring(idx + key.length));
      } else {
        return '/';
      }
    }
  },
  components: {},
  methods: {
    initConfig() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.formData))
          let ret = await initDB(params)
          if (ret.code === 20000) {
            this.isDisabled = false;
            this.$message.success(ret.err_msg)
            router.push('/login')
          } else {
            this.$message.error(ret.err_msg)
          }
        } else {
          return false;
        }
      });
    },
    next() {
      router.push('/login')
    }
  },
};
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
</style>
