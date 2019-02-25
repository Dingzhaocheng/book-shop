<template>
  <div class="page">
    <div class="section bought">
      <div class="wrapper">
        <div class="head border-bottom">
          <h2>已选书单</h2>
        </div> 
        <div class="list">
          <div v-for="book in booklist" :key="book.id" class="item border-bottom">
            <div class="name">{{book.title}}</div>
            <div class="price">${{book.price.toFixed(2)}} 新元</div>
          </div>
        </div>
        <div class="tips">请确认所选图书的总价。2019年1月期间在LingoAce进行充值或帮助朋友参加活动的用户可免除邮费，免邮事宜请在支付环节向工作人员确认。</div>
        <div class="foot">
          <div class="express">
            运费：<span class="orange">$4.99 新元</span>
          </div>
          <div class="total">
            总价：<span class="orange">${{totalPrice.toFixed(2)}} 新元</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section customer">
      <div class="head">
        <h2>收货地址</h2>
      </div>
      <p>姓名:</p>
      <input v-model="customer.name" type="text" placeholder="名，姓（英文）">
      <p>电话:</p>
      <input v-model="customer.phone" type="tel" placeholder="可与您联系的电话">
      <p>地址:</p>
      <input v-model="customer.address" type="text" placeholder="英文详细地址">

      <div class="tips">请注意检查填写内容，真实联系地址才可以收到快递哦</div>

      <button class="btn primary" @click="complete">提交</button>
    </div>

    <div v-if="showConfirm || showRepeatError" class="mask"></div>
    <div v-if="showConfirm" class="modal">
      <p>订单提交后将不可修改，请确定您的团购<br>书目及收货信息都已填写无误。</p>
      <div class="foot">
        <button class="btn" @click="showConfirm = false">返回修改</button>
        <button class="btn primary" @click="submit">确定提交</button>
      </div>
    </div>

    <div v-if="showRepeatError" class="modal">
      <p>抱歉，您所填写的联系方式已经成功<br>提交过订单，请勿重复下单。</p>
      <div class="foot center">
        <button class="btn primary" @click="showRepeatError = false">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui'

export default {
  name: 'Detail',

  data() {
    return {
      totalPrice: 0,
      booklist: [],
      customer: {
        name: '',
        phone: '',
        address: ''
      },

      // 确认弹窗
      showConfirm: false,

      // 重复下单弹窗
      showRepeatError: false
    }
  },

  mounted() {
    const { booklist } = this.$route.query;
    let totalPrice = 0;

    for (let book of booklist) {
      totalPrice += book.price;
    }

    this.booklist.push(...booklist)
    this.totalPrice = totalPrice
  },

  methods: {
    complete() {
      const { customer } = this;

      if (customer.name == '' || customer.phone == '' || customer.address == '') {
        Toast('请先填好完整信息')
        return
      }

      this.showConfirm = true;
    },

    /* eslint-disable */
    submit() {
      const { name, address, phone } = this.customer;

      // todo post data
      axios.post('https://susuaddison.cn/api/v2/campaign/commitbooks/', {
        name, phone, address,
        openID: 'mock_openid',
        books: this.booklist.map(item => item.id)
      })
      .then((res) => {
        // handle success todo
        console.log('----')
        console.log(res);
        if (res.succss) {
          // to result page
          this.$router.push({
            path: '/result',
            query: { booklist: this.booklist }
          })
        }
      })
      .catch((err) => {
        // handle error todo
        console.log('err', err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$primary: #36a894;
$red: #ee4910;
$orange: #ee8310;

.page {
  padding: 48px 10px 34px;
  background: url('../assets/detail-bg.png') top no-repeat, url('../assets/detail-bg-bottom.png') bottom no-repeat;
  background-size: contain;
}

.orange {
  color: $orange;
}

.section {
  .tips {
    margin-top: 6px;
    color: $orange;
    font-size: 10px;
  }
}

.section.bought {
  padding-top: 12px;
  // background: url('../assets/detail-list-bg-top.png') no-repeat top / contain, url('../assets/detail-list-bg.png') repeat-y center / contain;
  background: url('../assets/detail-list-bg-top.png') no-repeat top / contain;
  
  .wrapper {
    padding: 10px 8px 0;
    margin: 0 15px;
    background-color: #fff;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .head {
    padding-bottom: 14px;
    margin-bottom: 0;
    background-color: #fff;
  }

  .list {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: #424242;
      height: 36px;

      .name {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .price {
        color: $red;
      }
    }
  }

  .foot {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 10px;
    padding-bottom: 16px;
  }

  .express {
    font-size: 13px;
    margin-right: 10px;
  }

  .total {
    font-weight: bold;
    font-size: 16px;
  }
}

.section.customer {
  background-color: #fff;
  border-radius: 6px;
  margin: 36px 14px 0;
  padding: 17px 25px;
  color: #333;
  font-size: 15px;

  p {
    line-height: 1;
  }

  input {
    box-sizing: border-box;
    height: 35px;
    line-height: 35px;
    background-color: #f6f6f6;
    appearance: none;
    border: 0;
    outline: none;
    border-radius: 4px;
    width: 100%;
    padding-left: 10px;
    margin: 10px 0;
  }

  .btn {
    margin-top: 10px;
    line-height: 35px;
    border-radius: 3px;
  }
}

.modal {
  z-index: 9;
  position: fixed;
  top: 50%;
  left: 25px;
  right: 25px;
  transform: translateY(-50%);
  border-radius: 6px;
  padding: 140px 35px 0;
  background: url('../assets/modal-bg.png') no-repeat top center / contain #fff;
  min-height: 300px;
  box-sizing: border-box;

  p {
    text-align: center;
    color: #333;
    font-size: 14px;
    margin-bottom: 35px;
  }

  .foot {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.center {
      justify-content: center;
    }

    button {
      width: 110px;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      color: #8c8c8d;
      background-color: #e5e5e5;

      &.primary {
        color: #fff;
        background-color: #45c5bc;
      }
    }
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, .4);
}
</style>

