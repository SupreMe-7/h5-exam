<template>
  <div class="exam-list">
    <div class="not-tested">
      <div class="title">待考科目</div>
      <div v-if="!notTestList.length" class="no-exam">
        暂无待考科目
      </div>
      <ul>
        <li>
          <span>考试名称</span>
          <span>考试时间</span>
          <span>操作</span>
        </li>
        <li v-for="(item, index) in notTestList" :key="index">
          <span>{{ item.examName }}</span>
          <span>{{ item.examTime }}</span>
          <nut-button small @click="startExam(item.examName)">
            开始考试
          </nut-button>
        </li>
      </ul>
    </div>
    <div class="tested">
      <div class="title">已考科目</div>
      <div v-if="!testedList.length" class="no-exam">
        暂无已考科目
      </div>
      <ul v-else>
        <li>
          <span>考试名称</span>
          <span>考试成绩</span>
          <span>考试时间</span>
        </li>
        <li v-for="(item, index) in testedList" :key="index">
          <span>{{ item.examName }}</span>
          <span>{{ item.score }}</span>
          <span>{{ item.examTime }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stuId: null,
      notTestList: [],
      testedList: []
    }
  },
  mounted() {
    document.title = '考试列表'
    this.stuId = localStorage.getItem('stuId')
    this.getExamList()
  },
  methods: {
    getExamList() {
      this.$ajax.get(`/hmu/getGradeByStuId/${this.stuId}`).then(res => {
        if (res.result === 0) {
          res.data.forEach(item => {
            if (item.isUpload) {
              this.testedList.push(item)
            } else {
              this.notTestList.push(item)
            }
          })
        } else {
          this.$toast.text(res.errMsg)
        }
      })
    },
    startExam(examName) {
      this.$ajax.get(`/hmu/getTime/${examName}/${this.stuId}`).then(res => {
        if (res.result === 0) {
          let time = res.data.during
          if (time > 0) {
            let str = parseInt(time / 60)
            str += '分'
            str += time % 60
            str += '秒'
            this.$toast.text('距离考试开始' + str)
            return;
          }
          if (time < -1800) {
            this.$toast.text('考试已结束')
            return;
          }
          this.$router.push({
            name: 'examdetails',
            query: { examName: examName }
          })
        } else {
          this.$toast.text(res.errMsg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.exam-list {
  box-sizing: border-box;
  padding: 12px;
  .not-tested {
    .title {
      margin: 0 0 10px 0;
    }
  }
  .tested {
    .title {
      margin: 20px 0 10px 0;
    }
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding: 10px 0;
  }
  .title {
    font-size: 20px;
  }
  .no-exam {
    text-align: center;
    font-size: 16px;
  }
}
</style>
