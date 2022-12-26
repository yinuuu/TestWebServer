/*
 * @Author: yiwen.wu
 * @Date: 2021-07-22 14:25:10
 * @LastEditTime: 2022-01-10 09:51:10
 * @LastEditors: xin.chen
 * @Description: 登录页mixin
 * @FilePath: /ks-vue-template/src/mixins/loginMixin.js
 */
import { validUsername } from '@utils/tools/validate'
import { mapActions } from 'vuex'

const mixin = {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      resizeTimer: undefined,
      screenRate: '56.25%',
      btnState: false,
      form: {
        username: 'admin',
        password: '123456'
      },
      ruleForm: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      },
      psd: 'password',
      isUserBlur: false,
      isCodeBlur: false,
      isLogin: false,
      iconShow: true,
      redirect: undefined,
      isLoad: false,
      otherQuery: {}
    }
  },
  watch: {
    // 监测输入框变化，改变按钮状态
    form: {
      handler() {
        this.btnState = this.form.username === '' || this.form.password === ''
      },
      deep: true
    },
    // 监测路由变化
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
        }
      },
      immediate: true
    }
  },
  // 用户名输入框聚焦
  mounted() {
    this.resizeWindow()
    window.addEventListener('resize', this.resizeWindow)
    this.$nextTick(() => {
      this.$refs.username.focus()
    })
    if (!this.form.username || !this.form.password) {
      this.btnState = true
    }
  },
  methods: {
    ...mapActions('user', {
      loginAction: 'login'
    }),
    // window自适应
    resizeWindow() {
      if (this.resizeTimer) clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        this.screenRate = ((document.body.clientHeight / document.body.clientWidth) * 100).toFixed(2) + '%'
      }, 300)
    },
    // 切换显示密码
    switchPsd() {
      this.psd === 'password' ? (this.psd = 'text') : (this.psd = 'password')
    },
    // 点击登录或者输完密码点回车，判断是否登录成功
    login() {
      this.isLoad = true
      if (this.form.username && this.form.password) {
        // 用户名密码正确则跳转到主页
        if (
          validUsername(this.form.username) &&
          this.form.password.length >= 6
        ) {
          // 调用登录
          this.loginAction({ username: this.form.username })
          this.$router.push('/')
        } else {
          // 用户名密码错误显示登陆失败
          console.log('登录失败')
          this.isLoad = false
          this.isLogin = true
        }
      }
    },
    // 是否记住密码
    codeiconShow() {
      this.iconShow = !this.iconShow
    },
    userBlur() {
      if (!this.form.username) {
        this.isUserBlur = true
      } else {
        this.isUserBlur = false
      }
    },
    codeBlur() {
      if (!this.form.password) {
        this.isCodeBlur = true
      } else {
        this.isCodeBlur = false
      }
    }
  }
}

export default mixin
