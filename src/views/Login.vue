<template>
  <div class="login">
    <nut-textinput
      class="phone"
      v-model="phone"
      label="手机号:"
      placeholder="请输入手机号"
      :clearBtn="true"
      :disabled="false"
      :hasBorder="false"
    />
    <div class="code">
      <nut-textinput
        class="code-input"
        v-model="code"
        label="验证码:"
        placeholder="请输入验证码"
        :clearBtn="true"
        :disabled="false"
        :hasBorder="false"
      />
      <nut-button
        @click="sendCode"
        small
        :disabled="sendDisable"
        class="send-code"
      >
        {{ sendText }}
      </nut-button>
    </div>
    <nut-button class="login-btn" block @click="login">
      登录
    </nut-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: null,
      code: null,
      sendText: '发送验证码',
      sendDisable: false
    }
  },
  mounted() {
    document.title = '短信登陆/注册'
  },
  methods: {
    sendCode() {
      let reg = new RegExp(/^1\d{10}$/)
      if (!reg.test(this.phone)) {
        this.$toast.text('手机号格式错误')
        return
      }
      this.$ajax.post(`/hmu/user/sendsms?phone=${this.phone}`).then(res => {
        if (res.result === 0) {
          this.$toast.text('发送验证码成功')
          this.changeSendText()
        } else {
          this.$toast.text(res.errMsg);
        }
      })
    },
    changeSendText() {
      const that = this
      let time = 60
      this.sendDisable = true
      let timeInt = setInterval(() => {
        that.sendText = time-- + '秒后重发'
        if (time === -1) {
          that.sendText = '发送验证码'
          that.sendDisable = false
          window.clearInterval(timeInt)
        }
      }, 1000)
    },
    login() {
      let postData = {
        phone: this.phone,
        code: this.code,
        mode: 'sms'
      }
      postData = JSON.stringify(postData);
      this.$ajax
        .post(`/hmu/user/login?param=${encodeURIComponent(postData)}`)
        .then(res => {
          if (res.result === 0) {
            if (res.data.isNew) {
              this.$router.push({ name: 'resign', query: {phone: this.phone}});
              return;
            }
            localStorage.setItem('TOKEN', res.data.token)
            localStorage.setItem('stuId', res.data.stuId)
            this.$router.push({ name: 'examlist'})
          } else {
            this.$toast.text(res.errMsg);
          }
        })
        .catch(err => {
          this.$toast.text(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  box-sizing: border-box;
  margin: 50px 0 0 0;
  padding: 20px;
  .phone {
    margin: 0 0 10px 0;
    border-bottom: 1px solid #eaeaea;
  }
  .code {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px 0;
    border-bottom: 1px solid #eaeaea;
  }
  .login-btn {
    margin: 50px 0 0 0;
  }
}
</style>

<style lang="less">
.code-input {
  input {
    width: 140px;
  }
}
</style>
