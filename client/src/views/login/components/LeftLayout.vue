<!--
 * @Author: yiwen.wu
 * @Date: 2021-07-22 14:28:43
 * @LastEditTime: 2022-01-05 17:02:55
 * @LastEditors: xin.chen
 * @Description: 居左风格的登录页面
 * @FilePath: /ks-vue-template/src/views/Login/components/LeftLayout.vue
-->
<template>
  <div class="login-wrapper" :style="{paddingTop: screenRate}">
    <div class="login__background-image" :style="imageBgStyle()">
      <div class="login__form-container">
        <div class="login__form">
          <div class="form-head">
            <div class="form-title">欢迎登录</div>
          </div>
          <div class="form-main">
            <ks-form ref="form" labks-width="0px" :rules="ruleForm" :model="form">
              <ks-form-item label="" class="form-main__username" prop="username">
                <ks-input
                  ref="username"
                  v-model.trim="form.username"
                  placeholder="请输入用户名..."
                  prefix-icon="ks-icon-person-user"
                  :class="{ userIcon: isUserBlur }"
                  border-bottom
                  clearable
                  @blur="userBlur"
                />
              </ks-form-item>
              <ks-form-item label="" class="form-main__password" prop="password">
                <ks-input
                  ref="password"
                  v-model.trim="form.password"
                  placeholder="请输入密码..."
                  :prefix-icon="psd === 'password' ? 'ks-icon-status-lock' :'ks-icon-status-unlock'"
                  :class="{ codeIcon: isCodeBlur }"
                  :type="psd"
                  border-bottom
                  @blur="codeBlur"
                  @keyup.enter.native="login"
                >
                  <i
                    v-if="form.password"
                    slot="suffix"
                    class="ks-icon-status-visible"
                    :class="{ eyeClick: psd == 'text' }"
                    @click="switchPsd"
                  />
                </ks-input>
              </ks-form-item>
            </ks-form>
          </div>
          <div class="form-foot">
            <ks-button
              class="button"
              type="primary"
              :disabled="btnState"
              :class="{ btnBg: !btnState }"
              :loading="isLoad"
              @click="login"
            >登录</ks-button>
            <p :class="{ errMsg: isLogin }">账号或密码输入错误，您还有5次机会</p>
          </div>
          <div class="form-logo">
            <img src="@assets/image/login/kingstarlogo.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginMixin from '@/mixins/loginMixin'

export default {
  name: 'LeftLayoutComponent',
  mixins: [loginMixin],
  data() {
    return {
      backgroundImage: require(`@assets/image/login/bgL${Math.round(Math.random() * 3 + 1)}.png`)
    }
  },
  methods: {
    imageBgStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@assets/styles/common/mixin.scss";

.login-wrapper {
  position: relative;
  overflow: hidden;
}

.login__background-image{
  width: 100%;
  position: absolute;
  background-size:100% 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.login__form-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 45%;
  height: 100%;
}

.login__form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 450px;
  min-height: 640px;
}

.form-head {
  position: relative;
  margin-bottom: 60px;
  text-align: center;
  height: 80px;
  .form-title {
    position: relative;
    font-size: 30px;
    font-weight: 500;
    color: $--color-primary;
  }
  &::after {
    content: '';
    position: absolute;
    top: 52px;
    width: 50px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 8px;
    background-color: $--color-primary;
    border: solid 1.5px $--color-primary;
  }
}

.form-main {
  margin-bottom: 90px;
  .ks-form-item {
    margin-bottom: 40px;
  }
}

// 表单脚部：按钮和提示
.form-foot {
  margin-bottom: 100px;
  .button {
    width: 100%;
    height: 40px;
    margin: 0 auto;
    border-radius: 5px;
    font-size: $--font-16;
  }

  p {
    font-size: $--font-12;
    width: 100%;
    margin: 0 auto;
    text-align: left;
    color: $--color-f03b2c;
    visibility: hidden;
    margin-top: 10px;
  }

  .errMsg {
    visibility: visible;
  }
}

.form-logo {
  text-align: center;
  img {
    height: 39px;
    width: auto;
  }
}

@media screen and (max-width: 1090px) {
  .login__form {
    min-width: 300px;
    min-height: 440px;
    padding: 20px 50px;
  }

  .form-foot {
    margin-bottom: 40px;
  }
}

</style>
