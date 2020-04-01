<template>
  <div class="login">
    <div class="login-wrap">
      <el-card>

        <div slot="header">
          <span>登录后台</span>
        </div>

        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" size="medium" class="login-form" label-position="left">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="账号" autofocus>
              <svg-icon slot="prepend" icon-class="user" />
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="密码" type="password">
              <svg-icon slot="prepend" icon-class="password" />
            </el-input>
          </el-form-item>

          <el-form-item class="last-item">
            <el-button type="primary" :loading="loading" class="login-btn" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>

      </el-card>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      redirect: undefined
    }
  },
  computed: {
    appName() {
      return this.$store.getters.appName
    }
  },
  created() {
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-color:#f8f8f9;
}

.login-wrap {
  width: 350px;
  margin: auto;
  padding-top: 25vh;
}

.login-btn {
  width: 100%;
}

::v-deep {
  .el-card__header {
    text-align: center;
  }
}
::v-deep {
  .el-input-group__prepend {
    padding: 0 12px;
  }
}
.last-item{
  margin-bottom: 0px;
}
</style>
