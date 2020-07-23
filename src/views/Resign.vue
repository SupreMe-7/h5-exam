<template>
  <div class="resign">
    <nut-textinput
      class="phone"
      v-model="stuId"
      label="学号:"
      placeholder="请输入学号"
      :clearBtn="true"
      :disabled="false"
      :hasBorder="false"
    />
    <nut-textinput
      class="phone"
      v-model="phone"
      label="手机号:"
      placeholder="请输入手机号"
      :clearBtn="false"
      :disabled="true"
      :hasBorder="false"
    />
    <nut-textinput
      class="code-input"
      v-model="password"
      label="密码:"
      placeholder="请输入密码"
      :clearBtn="true"
      :disabled="false"
      :hasBorder="false"
    />
    <nut-textinput
      class="code-input"
      v-model="passwordConfirm"
      label="密码:"
      placeholder="请再次输入密码"
      :clearBtn="true"
      :disabled="false"
      :hasBorder="false"
    />
    <nut-button class="resign-btn" block @click="resign">
      完成
    </nut-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stuId: null,
      phone: null,
      password: null,
      passwordConfirm: null
    }
  },
  mounted() {
    document.title = '短信登陆/注册'
    this.phone = this.$route.query.phone;
  },
  methods: {
    resign() {
      if (this.passwordConfirm !== this.password) {
        this.$toast.text('两次输入密码不一致')
        return
      }
      let postData = {
        phone: this.phone,
        stuId: this.stuId,
        password: this.password
      }
      postData = JSON.stringify(postData)
      this.$ajax
        .post(`/hmu/user/registe?param=${encodeURIComponent(postData)}`)
        .then(res => {
          if (res.result === 0) {
            localStorage.setItem('TOKEN', res.data.token)
            localStorage.setItem('stuId', this.stuId)
            this.$router.push({ name: 'examlist' })
          } else {
            this.$toast.text(res.errMsg)
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
.resign {
  box-sizing: border-box;
  margin: 50px 0 0 0;
  padding: 20px;
  .phone {
    margin: 0 0 10px 0;
    border-bottom: 1px solid #eaeaea;
  }
  .code {
    margin: 0 0 10px 0;
    border-bottom: 1px solid #eaeaea;
  }
  .resign-btn {
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
