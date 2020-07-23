<template>
  <div class="exam-details">
    <div class="title">
      {{ examName }}
    </div>
    <div class="count-down">剩余时间: {{ endTimeShow }}</div>
    <div class="description">
      单项选择题，每题5分，多选，错选均不得分，20题，共计100分
    </div>
    <div class="content">
      <div class="exam-item" v-for="(item, index) in topicList" :key="index">
        <div class="topic">{{ index + 1 }}.{{ item.question }}</div>
        <nut-radiogroup v-model="item.stuAnswer">
          <div>
            <nut-radio label="A">A:{{ item.a }}</nut-radio>
          </div>
          <div>
            <nut-radio label="B">B.{{ item.b }}</nut-radio>
          </div>
          <div>
            <nut-radio label="C">C.{{ item.c }}</nut-radio>
          </div>
          <div>
            <nut-radio label="D">D.{{ item.d }}</nut-radio>
          </div>
        </nut-radiogroup>
      </div>
    </div>
    <div class="submit">
      <nut-button block shape="circle" @click="submit">
        提交试卷
      </nut-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stuId: null,
      examName: null,
      endTime: 30 * 60,
      endTimeShow: null,
      topicList: []
    }
  },
  mounted() {
    this.examName = this.$route.query.examName
    this.stuId = localStorage.getItem('stuId')
    document.title = this.examName
    this.countDown()
  },
  methods: {
    getExamList() {
      this.$ajax.get(`/hmu/getPaperByExam/${this.examName}`).then(res => {
        if (res.result === 0) {
          this.topicList = res.data.select.questions
        } else {
          this.$toast.text(res.errMsg)
        }
      })
    },
    startExam() {
      this.$ajax
        .get(`/hmu/getTime/${this.examName}/${this.stuId}`)
        .then(res => {
          if (res.result === 0) {
            let time = res.data.during
            if (time > 0) {
              this.$toast.text('考试未开始')
              location.href = '/#/examlist'
              return
            }
            if (time < -1800) {
              this.$toast.text('考试已结束')
              location.href = '/#/examlist'
              return
            }
            this.getExamList()
            this.endTime = this.endTime + time
          } else {
            this.$toast.text(res.errMsg)
          }
        })
    },
    submit() {
      let postData = {
        score: 0,
        answer: [],
        questionId: [],
        isRight: [],
        stuId: this.stuId,
        examName: this.examName
      }
      this.topicList.forEach(item => {
        postData.answer.push(item.stuAnswer)
        postData.questionId.push(item.questionId)
        if (item.rightAnswer === item.stuAnswer) {
          postData.score += 5
          postData.isRight.push(1)
        } else {
          postData.isRight.push(0)
        }
      })
      postData = JSON.stringify(postData)
      this.$ajax
        .post(`/hmu/upload?param=${encodeURIComponent(postData)}`)
        .then(res => {
          if (res.result === 0) {
            this.$toast.text('提交成功')
            this.$router.push({ name: 'examlist' })
          } else {
            this.$toast.text(res.errMsg)
          }
        })
    },
    countDown() {
      this.startExam()
      const that = this
      let timeInt = setInterval(() => {
        that.endTime = that.endTime - 1
        that.endTimeShow =
          Math.floor(that.endTime / 60) + '分' + (that.endTime % 60) + '秒'
        if (that.endTime === 0) {
          that.submit()
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.exam-details {
  .title {
    font-size: 18px;
    text-align: center;
  }
  .count-down {
    margin: 10px;
    text-align: right;
  }
  .description {
    margin: 0 0 20px 0;
    text-align: center;
  }
  .content {
    .topic {
      margin: 0 0 10px 0;
    }
    .exam-item {
      margin: 12px;
    }
  }
  .submit {
    margin: 50px 0 40px 0;
  }
}
</style>

<style lang="less">
.exam-details {
  .nut-radio-label {
    font-size: 16px !important;
  }
}
</style>
