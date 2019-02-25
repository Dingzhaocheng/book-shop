<template>
    <div>
        <main>
            <div id="booklist">
                <ul>
                    <h3>已选书目</h3>
                    <li v-for="(item,index) in name" :key="index"><span>{{item}}</span><span>{{price[index]}}</span></li>
                </ul>
                <span class="notice">
                    请确认所选图书的总价。2019年1月期间在LingoAce进行充值或帮助朋<br>友参加活动的用户可免除邮费，免邮事宜请在支付环节向工作人员确认。
                    </span>
                <div class="ppay">
                    <span>总价:</span>
                    <span>{{book.money|numFilter}}</span>
                    <span>新元</span>
                </div>
                <img class="leafone" src="images/页2/收货地址叶子2@2x.png" alt="leaf1">
                <img class="leaftwo" src="images/页2/收货地址叶子@2x.png" alt="leaf1">
            </div>
            <div id="userinfo">
                <h3>收货地址</h3>
                <ul>
                    <li>
                        <h4>姓名: </h4> <input type="text" v-model="users.name" placeholder="名，姓（英文）">
                    </li>
                    <li>
                        <h4>电话: </h4> <input type="number" v-model="users.phone" placeholder="可与您联系的号码">
                    </li>
                    <li>
                        <h4>地址: </h4> <textarea name="" v-model="users.address" id="" cols="30" rows="10" placeholder="英文详细地址"></textarea>
                    </li>
                    <li> <span class="notice">请注意检查填写内容，真实联系地址才可以收到快递哦</span></li>
                    <li>
                        <div @click="usubmit">确认提交</div>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>
<script>
let a = {
    booklist1: [{
        id: "01",
        name: "施罗德",
        author: "uncleding",
        press: "人民出版社",
        price: "4.99",
        intro: "文字简介ldaydaidyaudaallaalallala",
        img: "images/页3/书1@2x.png"

    }, {
        id: "02",
        name: "HelloWorld",
        author: "uncleding",
        press: "华夏出版社",
        price: "8.99",
        intro: "文字简介ayiayydiaydailaalallala",
        img: "images/页3/书1@2x.png"
    }, {
        id: "03",
        name: "aaaa",
        author: "uncleding",
        press: "嗯哪出版社",
        price: "9.99",
        intro: "文字简介laldadiahdjhajdhalallaalallala",
        img: "images/页3/书1@2x.png"
    }],
    booklist2: [{
        id: "04",
        name: "好的",
        author: "pp",
        press: "人民出版社",
        price: "4.99",
        intro: "文字简介lallalalalalallaalallala",
        img: "images/页3/书1@2x.png"
    }, {
        id: "05",
        name: "好的",
        author: "pp",
        press: "华夏出版社",
        price: "8.99",
        intro: "文字简介lallalalalalallaalallala",
        img: "images/页3/书1@2x.png"
    }, {
        id: "06",
        name: "好的",
        author: "pp",
        press: "嗯哪出版社",
        price: "9.99",
        intro: "文字简介lallalalalalallaalallala",
        img: "images/页3/书1@2x.png"
    }],
    booklist3: [{
        id: "07",
        name: "是的",
        author: "pp",
        press: "人民出版社",
        price: "4.99",
        intro: "文字简介lallalalalalallaalallala",
        img: "images/页3/书1@2x.png"

    }, {
        id: "08",
        name: "是的",
        author: "pp",
        press: "华夏出版社",
        price: "8.99",
        intro: "文字简介lallalalalalallaalallala",
        img: "images/页3/书1@2x.png"
    }, {
        id: "09",
        name: "是的",
        author: "pp",
        press: "嗯哪出版社",
        price: "9.99",
        intro: "文字简介lallalalalalallaalallala",
        img: "images/页3/书1@2x.png"
    }]
};
export default {
    data() {
        return {
            count: 0,
            money: 0,
            book: {},
            price: [],
            name: [],
            users: {
                openID:"",
                name: "",
                phone: "",
                address: "",
                selected:[],
                profile:""
            },
            booklist: a
        }
    },
    filters: {
        numFilter(value) {
            let transformVal = Number(value).toFixed(3)
            let realVal = transformVal.substring(0, transformVal.length - 1)
            return Number(realVal)
        }
    },
    methods: {
        usubmit(){
             /* 用户表单 */
        if(this.users.name != "" && this.users.phone != "" && this.users.address != ""){
            this.book.bookid =this.users.selected;
         this.$axios.post("/api/orderBooks",this.users).then((res)=>{
             if(res.data == "success"){
                 this.$router.push({name:"success"})
             }else if(res.data == "faild"){
                 alert("服务器错误,请稍候重试");
             }
         })

         
        }else{
            alert("请完善您的信息");
        }

        }
        
    },
    mounted() {
        this.book = this.$route.params.book;
        let bookcon = this.booklist.booklist1.concat(this.booklist.booklist2, this.booklist.booklist3);
        let b = this.book.bookid;
        for (let i = 0; i < b.length; i++) {
            let iprice = this.price;
            let sname = this.name;
            bookcon.forEach(function (x) {
                if (x.id == b[i]) {
                    iprice.push(x.price);
                    sname.push(x.name);
                }
            })
        }
    }
}
</script>
<style scoped>
main {
    overflow: hidden;
    width: 100%;
    height: 1050px;
    margin-top: 40px;
    background-image: url(../assets/images/页2/页2底图@2x.png);
    background-repeat:no-repeat;
    background-size:100% 100%;
    z-index: -1;
}
main #booklist{
    position: relative;
    margin:60px auto;
    width:98%;
    height: 455px;
    background-image: url(../assets/images/页2/页1书单底图@2x.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
main #booklist ul{
  position: absolute;
  top:5%;
  left:4%;
  width:92%;
  height:90%;
}
main #booklist ul li:nth-child(2){
    margin-top:0.5%;
    border-top:1px dashed #417673;
}
main #booklist ul h3{
    width:90px;
    height: 25px;
    margin:0 auto;
    background-color:#36A894;
    border-radius:6px;
    font-size:1.5rem;
    color:#FEFEFE;
    text-align: center;
}
main #booklist ul li{
    width:100%;
    height:8%;
    border-bottom:1px dashed #417673;
    line-height:200%;
}
main #booklist ul li span:nth-of-type(odd){
    margin:0 15px 0 15px;
}
main #booklist ul li span:nth-of-type(even){
    clear:both;
    float:right;
    margin:0 15px 0 15px;
}
main #booklist .notice{
    position: absolute;
    top:80%;
    left:4%;
    font-size:1.1rem;
    font-weight:400;
    color:#EE8310;
}
main #booklist .ppay{
    position: absolute;
    top:90%;
    right:6%;
    font-size:1.5rem;
    font-weight:bold;
}
main #booklist .ppay span:not(:first-child){
    color:#EE8310;
}
main #booklist .leafone{
    position: absolute;
    top:104%;
    right:4%;
    width:76px;
    height:70px;
}
main #booklist .leaftwo{
    position: absolute;
    top:109%;
    right:2%;
    width:64px;
    height:64px;
}
main #userinfo{
    position: relative;
    z-index: 2;
    width:90%;
    height:400px;
    margin:0 auto;
    background-color:#ffffff;
    border-radius:4px;
    box-shadow: 0px 5px #ffffff;
}
main #userinfo h3{
    position: absolute;
    top:10px;
    left:0;
    right:0;
    margin:0 auto;
    width:90px;
    height: 25px;
    line-height: 25px;
    background-color:#36A894;
    border-radius:6px;
    font-size:1.5rem;
    color:#FEFEFE;
    text-align: center;
}
main #userinfo ul{
    position: absolute;
    top:40px;
    left:0;
    right:0;
    width:90%;
    height:75%;
    margin:0 auto;
}
main #userinfo ul li{
    width:80%;
    margin:0 auto;
}
main #userinfo ul li h4{
    font-size:1.5rem;
    font-weight: bold;
    color:#333333;
}
main #userinfo ul li input{
    width:100%;
    height:40px;
    border:none;
    border-radius:4px;
    background-color:#F6F6F6;
}
main #userinfo ul li textarea{
    width:100%;
    height: 80px;
    background-color:#F6F6F6;
    border:none;
    border-radius:4px;
}
main #userinfo .notice{
    text-align:center;
    font-size:5px;
    color:#EE8310;
}
main #userinfo ul li div{
    width:100%;
    height:40px;
    border:none;
    border-radius:4px;
    background-color:#36A894;
    font-size:1.5rem;
    color:#ffffff;
    text-align: center;
    line-height: 40px;
}

</style>

