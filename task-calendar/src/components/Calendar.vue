<template>
  <div class="wrap">
    <div class="calendar-wrap">
      <div class="calender-header">
        <!-- 用户信息 -->
        <div>
          <ul>
            <li class="user-info"
                v-for="(user,index) in userList"
                :key=index>
              <img class="user-avatar"
                   :src=user.avatar
                   :alt=user.name>
              {{user.name}}
            </li>
          </ul>
        </div>
        <!-- 操作按钮 -->
        <div class="">
          <p>{{year}}年{{month+1}}月</p>
          <ul class="btnList">
            <li v-on:click="getLastMonth">上个月</li>
            <li v-on:click="getCurDay">今天</li>
            <li v-on:click="getNextMonth">下个月</li>
          </ul>
        </div>
      </div>
      <!-- 日历表格 -->
      <div class="calender-body">
        <ul class="week">
          <li v-for="(week,index) in weekList"
              :key=index>
            {{week}}
          </li>
        </ul>
        <ul class="day">
          <li v-for="(canlendar,index) in calendarList"
              :key=index
              :class="{notCurrMonth:!isCurrMonth(canlendar.month)}">{{canlendar.day}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      userList: [], //用户列表
      taskList: [], //任务列表
      weekList: ['一', '二', '三', '四', '五', '六', '日'],//星期列表
    }
  },
  created () {
    //获取json数据
    this.$axios.get('data.json'
    ).then(res => {
      // console.log(res.data[0]);
      let data = res.data[0]
      this.userList = data.coUserEntity
      this.taskList = data.coTaskEntityList

    }).catch(err => {
      console.log(err);
    })
  },
  computed: {
    time: function () {
      return { year: this.year, month: this.month, day: this.day }
    },
    calendarList: function () {
      let calendarList = []
      let { year, month, day } = this.getYearMonthDay(this.getDate(this.time.year, this.time.month, 1))  //1.当前年月日
      console.log(day);
      let firstDay = this.getDate(year, month, 1)//2.当月的第一天
      let week = firstDay.getDay()//2.当月第一天星期几
      if (week == 0) week = 7
      // console.log('星期' + week);
      let startTime = firstDay - (week - 1) * 24 * 60 * 60 * 1000
      //6*7
      for (let i = 0; i < 42; i++) {
        calendarList.push({
          date: new Date(startTime + i * 24 * 60 * 60 * 1000),
          year: new Date(startTime + i * 24 * 60 * 60 * 1000).getFullYear(),
          month: new Date(startTime + i * 24 * 60 * 60 * 1000).getMonth() + 1,
          day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate()
        })
      }
      return calendarList
    }
  },
  methods: {
    //上个月
    getLastMonth () {
      let date = this.getDate(this.time.year, this.time.month, 1)  //
      date.setMonth(date.getMonth() - 1) //上个月
      let temp = this.getYearMonthDay(date)//把上个月赋给当前月
      this.year = temp.year
      this.month = temp.month
      this.day = temp.day
    },
    //下个月
    getNextMonth () {
      let date = this.getDate(this.time.year, this.time.month, 1)  //
      date.setMonth(date.getMonth() + 1) //上个月
      let temp = this.getYearMonthDay(date)//把上个月赋给当前月
      this.year = temp.year
      this.month = temp.month
      this.day = temp.day
    },
    //当天
    getCurDay () {
      this.year = new Date().getFullYear()
      this.month = new Date().getMonth()
      this.day = new Date().getDate()
    },
    //判断是否为当月
    isCurrMonth (month) {
      return month == this.month + 1
    },
    //求出任务开始到结束的所有日期
    getTaskAllTime () {

    },
    getYearMonthDay (date) {
      let year = date.getFullYear()
      let month = date.getMonth()
      let day = date.getDate()
      return { year, month, day }
    },
    getDate (year, month, day) {
      return new Date(year, month, day)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
  width: 530px;
  margin: 0 auto;
}
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
}

.calender-header {
  display: flex;
}
.calender-header div {
  width: 50%;
  text-align: center;
}
.user-info {
  display: flex;
  align-items: center;
}
.user-avatar {
  width: 50px;
  border-radius: 50%;
}
.btnList {
  display: flex;
  margin: 0 auto;
  width: 160px;
  border-radius: 20px;
  border: 1px solid #eaeaec;
  overflow: hidden;
}
.btnList li {
  width: 34%;
  padding: 2px;
  font-size: 14px;
  cursor: pointer;
}

.btnList li:nth-child(2) {
  border-left: 1px solid #eaeaec;
  border-right: 1px solid #eaeaec;
}

.btnList li:hover {
  background-color: rgba(74, 132, 255, 0.1);
}

.calender-body .week li {
  width: 70px;
  text-align: center;
}
.calender-body .day {
  display: flex;
  flex-wrap: wrap;
  width: 530px;
}

.calender-body .day li {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 70px;
  height: 70px;
  border: 1px solid #eaeaec;
  margin-right: -1px;
  margin-bottom: -1px;
}

.calender-body .day li:hover {
  background-color: rgba(74, 132, 255, 0.1);
  color: #4a84ff;
}

.calender-body .day li span {
  border: 4px solid red;
  margin-top: 10px;
}

.notCurrMonth {
  color: #eaeaec;
}
</style>
