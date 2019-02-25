<template>
  <div class="page">
    <div class="desc">LingoAce品牌全新升级，感恩回馈活动!
专业教师精选书目，经典读物直邮到家,
让好书陪孩子过一个缤纷多彩的开学季,
让书香飘满星城，飘进您温馨幸福的家!</div>

    <img src="../assets/leaf1.png" alt="leaf" class="leaf1">
    <img src="../assets/leaf2.png" alt="leaf" class="leaf2">

    <div class="rule section">
      <div class="head">
        <h2>活动细则</h2>
      </div>
      <div class="item">
        <span class="index">1</span>为答谢用户对LingoAce (原PPChinese) 的支持，凡在2019年1月份充值课程或帮助朋友参与本次活动的用户，均可免除邮费。
      </div>
      <div class="item">
        <span class="index">2</span>您最多可挑选9本进行团购，活动截止时间为2月3日24:00，请在此时间前确认订单，并仔细填写您的联系方式，用于收取快递。您的个人信息不会被泄露或用作其他途径。
      </div>
      <div class="item">
        <span class="index">3</span>订单提交成功后请根据提示添加工作人员微信，在2月4日12:00前完成支付。到货时间预计为2019年3月，请注意查收。活动最终解释权归LingoAce所有，如遇问题请详询客服(客服电话：027-86952054)，或添加如下客服好友留言咨询。
      </div>
    </div>

    <div class="counter">
      <div>已选：<span class="count">{{hasBought}}</span>本</div>
      <div>总价：<span class="red">${{totalPrice.toFixed(2)}} 新元</span></div>
      <!-- <img src="../assets/leaf3.png" alt="leaf" class="leaf3"> -->
    </div>

    <div v-if="showFixedCounter" class="counter fixed">
      <div>已选：<span class="count">{{hasBought}}</span>本</div>
      <div>总价：<span class="red">${{totalPrice.toFixed(2)}} 新元</span></div>
    </div>

    <div v-for="(list, index) in lists" :key="index" class="book-list" :class="{last: index == lists.length - 1}">
      <div class="head">
        <h2 v-if="index == 0">萌新书单</h2>
        <h2 v-if="index == 1">进阶书单</h2>
        <h2 v-if="index == 2">鹏程书单</h2>
        <p>适宜学校一、二年级水平小孩选读</p>
      </div>
      <mt-swipe :auto="0" style="height: 290px;" :continuous="false">
        <mt-swipe-item v-for="book in list" :key="book.id">
          <div class="item">
            <div class="content">
              <img v-if="book.hasBought" src="../assets/selected.png" alt="" class="icon-selected">
              <div :style="{'background-image': 'url(http://susuaddison.cn' + book.thumbnail + ')'}" class="cover"></div>
              <div class="right">
                <button :class="{ plain: book.hasBought }" @click="handleBuy(book)">{{book.hasBought ? '取消团购' : '加入团购'}}</button>
                <p class="intro">{{book.intro}}</p>
              </div>
            </div>
            <div class="name">{{book.title}}</div>
            <div class="others">
              <div class="press">{{book.author}} / {{book.press}}</div>
              <div class="price">$ {{book.price.toFixed(2)}} 新元</div>
            </div>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <div class="controls">
      <button class="btn primary" @click="submit">我已选好，确认提交</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import { Toast } from 'mint-ui';

export default {
  name: 'app',

  data: function() {
    return {
      showFixedCounter: false,
      ids: [],
      lists: [],
      booklist: []
    }
  },

  computed: {
    hasBought() {
      let count = 0;
      for (let list of this.lists) {
        count += list.filter(item => item.hasBought).length;
      }
      return count;
    },

    totalPrice() {
      let total = 0;
      for (let list of this.lists) {
        for (let book of list) {
          if (book.hasBought) {
            total += book.price;
          }
        }
      }
      
      return total;
    }
  },

  mounted() {
    this.getBooks();
    // this.lists.push([...JSON.parse(JSON.stringify(this.booklist))])
    // this.lists.push([...JSON.parse(JSON.stringify(this.booklist))])
    // this.lists.push([...JSON.parse(JSON.stringify(this.booklist))])

    const $counter = document.querySelector('.counter');
    this.handleScroll = () => {
      this.showFixedCounter = $counter.getBoundingClientRect().top <= 0;
    }

    document.addEventListener('scroll', this.handleScroll)
  },

  destroyed() {
    document.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    /* eslint-disable */
    getBooks() {
      axios.get('https://susuaddison.cn/api/v2/campaign/booklists')
      .then((res) => {
        const { easy, normal, hard } = res.data;
        const initBooks = (books) => {
          books.forEach(book => {
            book.has
            Bought = false;
            book.price = parseFloat(book.price)
          })
        }

        initBooks(easy);
        initBooks(normal);
        initBooks(hard);
        this.lists.push(easy, normal, hard)
      });
    },

    handleBuy(target) {
      target.hasBought = !target.hasBought
    },

    submit() {
      let boughtList = []
      for (let list of this.lists) {
        console.log(list);
        boughtList.push(...list.filter(item => item.hasBought))
      }

      if (boughtList.length == 0) {
        Toast('你还没有选择任何书籍哦')
        return
      }

      if (boughtList.length < 3 || boughtList.length > 9) {
        Toast('抱歉，我们需要您选择3到9本书')
        return
      }

      this.$router.push({
        path: '/detail',
        query: { booklist: boughtList }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$primary: #36a894;
$red: #ee4910;

.page {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  padding: 16px 22px 30px;
  padding-top: 300px;
  background: url('../assets/head.png') no-repeat top, url('../assets/home-bg-bottom.png') no-repeat bottom;
  background-size: contain;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.page > .desc {
  position: relative;
  background: #29aea5;
  color: #fff;
  border-radius: 6px;
  padding: 10px 0;
  white-space: pre-wrap;
  text-align: center;
  font-size: 14px;
}

.leaf1 {
  display: block;
  position: absolute;
  top: 394px;
  right: 0;
  width: 75px;
  height: 54px;
}

.leaf2 {
  display: block;
  position: absolute;
  top: 262px;
  left: 0;
  width: 46px;
  height: 56px;
}

.rule, .counter, .book-list {
  margin-top: 14px;
  border-radius: 6px;
  background-color: #fff;
}

.rule {
  position: relative;
  padding: 16px;
  color: #434343;
  font-size: 10px;
  z-index: 9;

  .item {
    margin-bottom: 15px;

    .index {
      margin-right: 3px;
      display: inline-block;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      color: #fff;
      background-color: $primary;
      text-align: center;
      line-height: 14px;
      font-size: 11px;
    }
  }
}

.counter {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;
  font-size: 13px;
  padding: 0 15px;
  z-index: 11;

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    z-index: 19;
    box-shadow: 0 2px 10px rgba($color: #000000, $alpha: 0.3)
  }

  .leaf3 {
    display: block;
    position: absolute;
    top: 0;
    right: -15px;
    width: 67px;
    height: 57px;
    z-index: 10;
  }

  .count {
    margin-right: 4px;
    font-size: 15px;
    padding: 0 4px;
    border-radius: 3px;
    color: $red;
    background: #eeefef;
    font-weight: bold;
  }

  .red {
    color: $red;
    font-weight: bold;
  }
}

.book-list {
  padding-bottom: 8px;

  &.last {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .head {
    position: relative;
    display: flex;
    align-items: center;
    height: 45px;
    padding-left: 15px;

    h2 {
      font-size: 16px;
      color: #198a82;
    }

    p {
      margin-left: 12px;
      font-size: 12px;
      color: #767676;
    }

    &:after {
      position: absolute;
      bottom: 0;
      left: 0;
      content: '';
      display: block;
      height: 1px;
      width: 100%;
      border-bottom: 1px dashed #417673;
      transform: scaleY(.5);
    }
  }

  .item {
    padding: 20px;

    .content {
      position: relative;
      display: flex;

      .icon-selected {
        position: absolute;
        left: 80px;
        top: 0;
        width: 50px;
      }

      button {
        width: 63px;
        height: 20px;
        margin-bottom: 12px;
        background-color: #ee8130;
        color: #fff;
        border-radius: 4px;
        float: right;

        &.plain {
          color: #ee8130;
          border: 1px solid #ee8130;
          background-color: #fff;
        }
      }

      .intro {
        clear: both;
        font-size: 11px;
        line-height: 17px;
        color: #656565;
      }
    }

    .cover {
      margin-right: 25px;
      display: block;
      width: 108px;
      height: 130px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      border-radius: 4px;
    }

    .right {
      flex: 1;
    }

    .name {
      margin-top: 20px;
      line-height: 1;
      color: #198a82;
      font-size: 16px;
      font-weight: bold;
    }

    .others {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 10px;
      color: #666;
      font-size: 11px;
      line-height: 1;
      margin-top: 12px;

      .press {
        flex: 1;
        margin-right: 10px;
        line-height: 1.2;
      }

      .price {
        font-size: 13px;
        color: #ee8319;
        font-weight: bold;
      }
    }
  }
}

.controls {
  position: relative;
  height: 60px;
  padding-top: 13px;
  box-sizing: border-box;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: #fff;
  padding-left: 18px;
  padding-right: 18px;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    border-bottom: 1px dashed #417673;
    transform: scaleY(.5);
  }

  button {
    display: block;
    width: 100%;
    background-color: $primary;
    color: #fff;
    height: 35px;
    line-height: 35px;
    font-size: 13px;
    border-radius: 4px;
  }
}


// .btn {
//   display: block;
//   width: 100%;

//   &.primary {
//     background-color: #29aea5;
//     color: #fff;
//   }
// }
</style>
