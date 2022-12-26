<!--
 * @Author: yiwen.wu
 * @Date: 2021-07-22 14:29:29
 * @LastEditTime: 2022-01-05 17:04:33
 * @LastEditors: xin.chen
 * @Description: 居右风格的登录页面
 * @FilePath: /ks-vue-template/src/views/login/components/RightLayoutComponent.vue
-->
<template>
  <div class="login-wrapper" :style="{paddingTop: screenRate}">
    <div class="login__background-image" :style="imageBgStyle()">
      <div class="login__form-container">
        <div class="login__form">
          <div class="form-head">
            <i class="ks-icon-kslogo" />
          </div>
          <div class="form-main">
            <ks-form ref="form" labks-width="100px" label-position="top" :rules="ruleForm" :model="form">
              <ks-form-item label="账号" class="form-main__username" prop="username">
                <ks-input
                  ref="username"
                  v-model.trim="form.username"
                  placeholder="请输入用户名..."
                  :class="{ userIcon: isUserBlur }"
                  border-bottom
                  clearable
                  @blur="userBlur"
                />
              </ks-form-item>
              <ks-form-item label="密码" class="form-main__password" prop="password">
                <ks-input
                  ref="password"
                  v-model.trim="form.password"
                  placeholder="请输入密码..."
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginMixin from '@/mixins/loginMixin'

export default {
  name: 'RightLayoutComponent',
  mixins: [loginMixin],
  data() {
    return {
      backgroundImage: require(`@assets/image/login/bgR${Math.round(Math.random() * 2 + 1)}.png`)
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
  right: 0;
  top: 0;
  width: 33%;
  height: 100%;
  background-color: rgb($--color-000, 0.3);
}

.login__form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 350px;
  min-height: 640px;
  ::v-deep .ks-form-item__label {
    padding-left: 10px;
    font-weight: bold;
    text-align: left;
    color: $--color-fff;
    line-height: 22px;
  }
  ::v-deep .ks-input__inner {
    color: $--color-fff;
    border-radius: 25px;
    background: rgba($--color-fff,0.10);
    border: 1px solid rgba($--color-fff,0.90);
  }
  ::v-deep .ks-input__suffix {
    right: 15px;
  }
  ::v-deep .ks-form-item__error {
    top: 110%;
    left: 13px;
  }
}

.form-head {
  position: relative;
  margin: 120px 0 10px 0;
  text-align: center;
  height: 80px;

  color: $--color-fff;
  i {
    font-size: 38px;
  }
}

.form-main {
  margin-bottom: 70px;
  .ks-form-item {
    margin-bottom: 40px;
  }
}

.form-foot {
  margin-bottom: 100px;
  .button {
    width: 100%;
    height: 40px;
    margin: 0 auto;
    font-size: $--font-16;
    border: $--color-3262aa;
    background: $--color-3262aa;
    border-radius: 20px;
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

</style>
