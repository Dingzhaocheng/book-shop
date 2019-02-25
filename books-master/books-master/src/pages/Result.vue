<template>
  <div class="page">
    <img src="../assets/result-bg-top.png" alt="" class="bg-top">

    <div class="box">
      <div class="customer">
        <img src="" alt="" class="avatar">
        <p class="name">Tyler Choo</p>
      </div>
      <p>2019缤纷开学季，我给孩子选了</p>
      <div class="covers">
        <template v-for="b in booklist.slice(0, 4)">
          <img :src="'http://susuaddison.cn' + b.thumbnail" alt="封面" :key="b.id">
        </template>
      </div>
      <p>等<span class="linehight">{{booklist.length}}</span>本书，你也来看看专业教师推荐的精选书单，给孩子的书架上新添几本好书吧！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'result',

  data() {
    return {
      booklist: []
    }
  },

  mounted() {
    const { booklist } = this.$route.query;

    this.booklist.push(...booklist)
  }
}
</script>

<style lang="scss" scoped>

.page {
  padding-bottom: 45px;
}

.bg-top {
  width: 100%;
}

.box {
  margin: 20px;
  padding: 35px 14px 120px;
  border-radius: 6px;
  color: #fff;
  background: url('../assets/result-share-bg.png') no-repeat center / 100% 100%;

  .customer {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .avatar {
      display: block;
      width: 78px;
      height: 78px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 4px solid #8ad6cf;
    }

    .name {
      margin-left: 10px;
      font-size: 18px;
      color: #f3e00c;
      font-weight: bold;
    }
  }

  p {
    font-size: 14px;
    line-height: 1.5;

    &:first-of-type {
      margin-bottom: 4px;
    }
  }

  .covers {
    img {
      width: 68px;
      height: 84px;
      border-radius: 2px;
      margin-right: 8px;
    }
  }
}
</style>

