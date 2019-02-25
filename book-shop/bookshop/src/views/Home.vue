<template>
<div>
    <main>
        <div id="main_content">
            <img class="leafone" src="@/assets/images/页1/品牌模块叶子@2x.png" alt="leaf">
            <p>
                LingoAce品牌全新升级，感恩回馈活动!
                专业教师精选书目，经典读物直邮到家,
                让好书陪孩子过一个缤纷多彩的开学季,
                让书香飘满星城，飘进您温馨幸福的家!
            </p>
            <img class="leaftwo" src="@/assets/images/页1/活动细则叶子@2x.png" alt="leaftwo">
        </div>
        <div class="active_rules">
            <h3>活动细则</h3>
            <ul>
                <li> <span class="num">1</span><span>为答谢用户对LingoAce (原PPChinese) 的支持，凡在2019年1月份充值课程的用户，均可在本次团购活动中免除邮费。</span></li>
                <li> <span class="num">2</span><span>您最多可挑选9本进行团购，活动截止时间为2月3日24:00，请在此时间前确认订单，并仔细填写您的联系方式，用于收取快递。您的个人信息不会被泄露或用作其他途径。</span></li>
                <li> <span class="num">3</span><span>订单提交成功后请根据提示添加工作人员微信，在2月4日12:00前完成支付。到货时间预计为2019年3月，请注意查收。活动最终解释权归LingoAce所有，如遇问题请详询客服(客服电话：027-86952054)。</span></li>
                <li><img src="@/assets/images/页1/客服.png" alt=""></li>
            </ul>
            <img class="leafthree" src="@/assets/images/页1/总价叶子@2x.png" alt="leafthree">
        </div>
        <div :class="isFly">
            <div class="checked_left">
                <span>已选:</span>
                <span>{{ book.count }}</span>
                <span>本</span>
            </div>
            <div class="checked_right">
                <span>总价:</span>
                <span>${{ book.money| numFilter }}</span>
                <span>新元</span>
            </div>
        </div>
        <div class="greenhand">
            <div class="greenhand_desc">
                <span>萌新书单</span>
                <span>适宜小学一，二年纪水平孩子选读</span>
            </div>
            <swiper :options="swiperOption" class="booklist">
                <swiper-slide class="book_items" v-for="(item,index) in booklist.booklist1" :key="index">
                    <dt>
                        <img v-show="false" class="display" src="@/assets/images/页1/选择@2x.png" alt="">
                        <img :src="item.img" alt="book1">
                    </dt>
                    <dd class="nocolor" ref="foo" @click="buy(item,index,$event)">加入团购</dd>
                    <dd>{{item.intro}}</dd>
                    <dd>{{item.name}}</dd>
                    <dd>{{item.author}}/ {{item.press}}</dd>
                    <dd><span>$</span>{{item.price}}<span>新元</span></dd>
                </swiper-slide>
                <div class="swiper-pagination " slot="pagination"></div>
            </swiper>
        </div>
        <div class="advance">
            <div class="advance_desc">
                <span>进阶书单</span>
                <span>适宜小学一，二年纪水平孩子选读</span>
            </div>
            <swiper :options="swiperOption" class="booklist">
                <swiper-slide class="book_items" v-for="(item,index) in booklist.booklist2" :key="index">
                    <dt>
                        <img v-show="false" class="display" src="@/assets/images/页1/选择@2x.png" alt="">
                        <img :src="item.img" alt="book1">
                    </dt>
                    <dd class="nocolor" ref="foo" @click="buy(item,index+3,$event)">加入团购</dd>
                    <dd>{{item.intro}}</dd>
                    <dd>{{item.name}}</dd>
                    <dd>{{item.author}} / {{item.press}}</dd>
                    <dd><span>$</span>{{item.price}}<span>新元</span></dd>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="challenge">
            <div class="challenge_desc">
                <span>鹏程书单</span>
                <span>适宜小学一，二年纪水平孩子选读</span>
            </div>
            <swiper :options="swiperOption" class="booklist">
                <swiper-slide class="book_items" v-for="(item,index) in booklist.booklist3" :key="index">
                    <dt>
                        <img v-show="false" class="display" src="@/assets/images/页1/选择@2x.png" alt="">
                        <img :src="item.img" alt="book1">
                    </dt>
                    <dd class="nocolor" ref="foo" @click="buy(item,index+6,$event)">加入团购</dd>
                    <dd>{{item.intro}}</dd>
                    <dd>{{item.name}}</dd>
                    <dd>{{item.author}} / {{item.press}}</dd>
                    <dd><span>$</span>{{item.price}}<span>新元</span></dd>
                </swiper-slide>
                <div class="swiper-pagination " slot="pagination"></div>
            </swiper>
            <div class="commit">
                <div :class="useable" ref="point" @click="send()">我已选好,确认提交</div>
            </div>
        </div>
        <div class="dialogpanel" v-show="mask">
            <div class="mask"></div>
            <div id="DialogPanel">
                <p>订单提交后将不可修改，请确定您的团购书目及收货信息都已填写无误。</p>
                <div id="back" @click="back">返回修改</div>
                <div id="sure" @click="commit">确认提交</div>
            </div>
        </div>
    </main>
    </div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import 'swiper/dist/css/swiper.css' ////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper'
/* 这是一次尝试*/
let a = {
    booklist1: [{
        id: "01",
        name: "施罗德",
        author: "uncleding",
        press: "人民出版社",
        price: "4.9",
        intro: "四大名著之一西游记，此版本与教学完全同步，针对十二岁左右孩子的阅读特点，通过阅读建议、阅读规划等内容一步步激发阅读兴趣、培养阅读能力、引导完成整本书的阅读。",
        img: "images/页1/书1.png"

    }, {
        id: "02",
        name: "HelloWorld",
        author: "uncleding",
        press: "华夏出版社",
        price: "8.9",
        intro: "四大名著之一西游记，此版本与教学完全同步，针对十二岁左右孩子的阅读特点，通过阅读建议、阅读规划等内容一步步激发阅读兴趣、培养阅读能力、引导完成整本书的阅读。",
        img: "images/页1/书2.png"
    }, {
        id: "03",
        name: "aaaa",
        author: "uncleding",
        press: "嗯哪出版社",
        price: "9.9",
        intro: "文字简介laldadiahdjhajdhalallaalallala",
        img: "images/页3/书1@2x.png"
    }],
    booklist2: [{
        id: "04",
        name: "好的",
        author: "pp",
        press: "人民出版社",
        price: "4.9",
        intro: "“华人家教典范”刘墉的传家汉字学习法。一个字×一幅画×一个故事×一张生活照，中英双语对照，给孩子轻松有趣的汉字启蒙。",
        img: "images/页1/书2.png"
    }, {
        id: "05",
        name: "好的",
        author: "pp",
        press: "华夏出版社",
        price: "8.9",
        intro: "文字简介lallalalalalallaalallala",
        img: "images/页3/书1@2x.png"
    }, {
        id: "06",
        name: "好的",
        author: "pp",
        press: "嗯哪出版社",
        price: "9.9",
        intro: "文字简介lallalalalalallaalallala",
        img: "images/页3/书1@2x.png"
    }],
    booklist3: [{
        id: "07",
        name: "是的",
        author: "pp",
        press: "人民出版社",
        price: "4.9",
        intro: "“华人家教典范”刘墉的传家汉字学习法。一个字×一幅画×一个故事×一张生活照，中英双语对照，给孩子轻松有趣的汉字启蒙。",
        img: "images/页1/书3.png"

    }, {
        id: "08",
        name: "是的",
        author: "pp",
        press: "华夏出版社",
        price: "8.9",
        intro: "文字简介lallalalalalallaalallala",
        img: "images/页3/书1@2x.png"
    }, {
        id: "09",
        name: "是的",
        author: "pp",
        press: "嗯哪出版社",
        price: "9.9",
        intro: "文字简介lallalalalalallaalallala",
        img: "images/页3/书1@2x.png"
    }]
};
export default {
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            },
            book: {
                bookid: [],
                money: 0,
                count: 0,
            },
            isFly: "checked",
            useable: "disabled",
            mask: false,
            booklist: a,
        }
    },
    components: {
        swiper,
        swiperSlide,
    },
    watch: {
        'book.count': function (newval) {
            if (newval > 0) {
                this.useable = "able";
            } else {
                this.useable = "disabled";
            }
        }
    },
    /*filters起到的作用就是为了解决js在处理浮点型运算出现异常小数位数的情况 */
    filters: {
        numFilter(value) {
            let transformVal = Number(value).toFixed(2)
            let realVal = transformVal.substring(0, transformVal.length - 1)
            return Number(realVal)
        }

    },
    methods: {
        /*方法中传递三个参数,第一个是时间触发的booklist.booklist1,2...
        第二个参数传递的是当前事件源的下标,第三个传的事件源
        */
        buy(item, index, event) {
            /*原生写法获取dt中的img */
            let checkimg = document.getElementsByClassName("display");
            /*测试书籍是否被选中,选中保存在bookid这个数组里,经过删除,添加等操作 */
            if (this.book.bookid.includes(item.id)) {
                /*当前书籍id和数组里存放的比对,已有的话就相当于点击第二下,找到这个id的下标,splice删除通过$ref获取为该元素设定的ref属性,结合下标找到当前元素,实现文字更改功能,event是获取当前对的事件源给他一个类,去改变样式,上述两行为相当于操作dom*/
                let i = this.book.bookid.indexOf(item.id);
                this.book.bookid.splice(i, 1);
                checkimg[index].style.display = "none";
                this.$refs.foo[index].innerHTML = "加入团购";
                event.currentTarget.className = "nocolor";
                if (this.book.count > 0) {
                    this.book.count--;
                }
                if (this.book.money != 0) {
                    this.book.money -= item.price * 1; /*为防止意外出现NaN,做了个隐式转换*/
                }
            } else {
                /*接下来对的行为就是与之相反的了 */
                this.book.bookid.push(item.id);
                this.$refs.foo[index].innerHTML = "取消团购";
                checkimg[index].style.display = "block";
                event.currentTarget.className = "color";
                if (this.book.count < 9) {
                    this.book.count++;
                }
                this.book.money += item.price * 1;
            }
        },
        send() {
            if (this.useable == "able") {
                this.mask = true;
                
            }
        },
        /*dialog 两个小事件 */
        back(){
          this.mask = false;
        },
        commit(){
          this.$router.push({name:"shoplist",params:{book:this.book}})
        },
        /*banner悬置固定 */
        handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop > 800) {
                this.isFly = "fly";
            } else {
                this.isFly = "checked";
            }
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
        /*直接让书的总数量在挂载期绑定数组的长度 */
        this.book.count = this.book.bookid.length
        var swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
        })
    }
}
</script>
<style scoped>
main {
    overflow: hidden;
    width: 100%;
    height: 1900px;
    background-image: url(../assets/images/页1/底图副本.png);
    background-size: 100% 100%;
    z-index: -1;
}

main #main_content {
    position: relative;
    top: 21%;
}

main #main_content .leafone {
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 47px;
    height: 57px;
}

main #main_content .leaftwo {
    position: absolute;
    width: 75px;
    height: 54px;
    top: 70px;
    right: 0;
}

main #main_content p {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 16px 34px 15px 30px;
    width: 290px;
    height: 148px;
    transform: translate(-50%, -50%);
    font-size: 1.8rem;
    color: #ffffff;
    background-color: #1CAFA6;
    border-radius: 6px;
    opacity: 0.5;
}

main .active_rules {
    position: relative;
    margin: 510px auto 0;
    padding: 10px;
    width: 328px;
    height: 290px;
    font-size: 1.5rem;
    color: #464545;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0px 3px 5px #fff;
}

main .active_rules h3 {
    width: 90px;
    height: 25px;
    margin: 0 auto;
    background-color: #36A894;
    border-radius: 6px;
    font-size: 1.5rem;
    color: #FEFEFE;
    text-align: center;
}

main .active_rules ul {
    margin-top: 10px;
}

main .active_rules ul li {
    line-height: 15px;
    font-size: 1rem;
    margin: 8px auto;
    letter-spacing: 1px;
    font-weight: bold;
    color: #434343;
}

main .active_rules ul li .num {
    display: inline-block;
    width: 13px;
    height: 13px;
    text-align: center;
    line-height: 13px;
    color: #ffffff;
    background-color: #1CAFA6;
    border-radius: 50%;
}

main .active_rules ul li:nth-child(4) {
    text-align: center;
}

main .active_rules ul li img {
    width: 65px;
    height: 65px;
    margin: 11px auto;
}

main .active_rules .leafthree {
    position: absolute;
    bottom: -40px;
    right: -20px;
    width: 53px;
    height: 58px;
    z-index: 1;
}

.checked {
    position: relative;
    z-index: 3;
    width: 348px;
    height: 30px;
    margin: 20px auto 5px;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0px 3px 5px #fff;
}

.fly {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 348px;
    height: 30px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0px 3px 5px #fff;
    z-index: 3;
}

main .checked_right {
    float: right;
    line-height: 30px;
    margin-right: 10px;
}

main .checked_right span:nth-child(1) {
    font-size: 1.2rem;
    font-weight: normal;
    color: #3A3A3A;
}

main .checked_right span:not(:nth-child(1)) {
    color: #EE4910;
    font-size: 1.2rem;
    font-weight: normal;
    letter-spacing: 1px;
}

main .checked_left span:not(:nth-child(2)) {
    font-size: 1.2rem;
    font-weight: normal;
    color: #3A3A3A;
}

main .checked_left span:nth-child(2) {
    display: inline-block;
    width: 17px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    border-radius: 3px;
    background: #EEEFEF;
    color: #EE4910;
    font-size: 1.5rem;
    font-weight: normal;
}

main .checked_left {
    float: left;
    line-height: 30px;
    margin-left: 10px;
}

main .greenhand {
    width: 348px;
    height: 307px;
    background-color: #ffffff;
    border-radius: 6px;
    margin: 10px auto;
    box-shadow: 0px 3px 5px #fff;
}

main .greenhand .greenhand_desc {
    padding: 7px;
    width: 95%;
    height: 50px;
    border-bottom: 1px dashed #417673;
}

main .greenhand .greenhand_desc span:first-child {
    font-weight: bold;
    color: #198A82;
    line-height: 50px;
}

main .greenhand .greenhand_desc span:nth-child(2) {
    margin-left: 10px;
    font-size: 1rem;
    color: #767676;
    line-height: 50px;
}

main .greenhand .booklist {
    width: 100%;
    height: 250px;
}

main .greenhand .booklist .book_items dt {
    position: relative;
    float: left;
    width: 110px;
    height: 130px;
    margin-top: 20px;
    margin-left: 20px;
}

main .greenhand .booklist .book_items dt img:first-child {
    position: absolute;
    top: 0;
    right: -20px;
    width: 52px;
    height: 55px;
}

.nocolor {
    float: right;
    width: 63px;
    height: 20px;
    margin: 10px 10px 0 0;
    text-align: center;
    font-size: 1em;
    color: #FFFFFF;
    background-color: #EE8310;
    border-radius: 6px;
}

.color {
    float: right;
    width: 63px;
    height: 20px;
    margin: 10px 10px 0 0;
    text-align: center;
    font-size: 1em;
    color: #EE8310;
    border: 1px solid #EE8310;
    border-radius: 6px;
    background-color: #FFFFFF;
}

main .greenhand .booklist .book_items dd:nth-child(3) {
    float: left;
    width: 180px;
    height: 46px;
    margin: 10px 10px 0 15px;
    font-size: 1rem;
    color: #656565;
}

main .greenhand .booklist .book_items dd:nth-child(4) {
    width: 250px;
    height: 20px;
    margin-left: 20px;
    font-size: 1em;
    color: #1D7771;
    clear: both;
    text-align: left;
}

main .greenhand .booklist .book_items dd:nth-child(5) {
    float: left;
    margin-left: 20px;
    width: 250px;
    height: 20px;
    font-size: 1rem;
    color: #666666;

}

main .greenhand .booklist .book_items dd:nth-child(6) {
    font-size: 1rem;
    color: #EE8310;
}

main .greenhand .swiper-pagination {
    width: 350px;
    height: 20px;
    margin: 20px auto;

}

.circle {
    float: left;
    margin: 3px;
    width: 8px;
    height: 8px;
    background-color: #EE8310;
    border-radius: 50%;
}


/*second*/
main .advance {
    width: 348px;
    height: 307px;
    background-color: #ffffff;
    border-radius: 6px;
    margin: 10px auto;
    box-shadow: 0px 3px 5px #fff;
}

main .advance .advance_desc {
    padding: 7px;
    width: 95%;
    height: 50px;
    border-bottom: 1px dashed #417673;
}

main .advance .advance_desc span:first-child {
    font-weight: bold;
    color: #198A82;
    line-height: 50px;
}

main .advance .advance_desc span:nth-child(2) {
    margin-left: 10px;
    font-size: 1rem;
    color: #767676;
    line-height: 50px;
}

main .advance .booklist {
    width: 100%;
    height: 220px;
}

main .advance .booklist .book_items dt {
    position: relative;
    float: left;
    width: 110px;
    height: 130px;
    margin-top: 20px;
    margin-left: 20px;

}

main .advance .booklist .book_items dt img:first-child {
    position: absolute;
    top: 0;
    right: -20px;
    width: 52px;
    height: 55px;
}



main .advance .booklist .book_items dd:nth-child(3) {
    float: left;
    width: 180px;
    height: 46px;
    margin: 10px 10px 0 15px;
    font-size: 1rem;
    color: #656565;


}

main .advance .booklist .book_items dd:nth-child(4) {
    width: 250px;
    height: 20px;
    margin-left: 20px;
    font-size: 1em;
    color: #1D7771;
    clear: both;
    text-align: left;
}

main .advance .booklist .book_items dd:nth-child(5) {
    float: left;
    margin-left: 20px;
    width: 250px;
    height: 20px;
    font-size: 1rem;
    color: #666666;

}

main .advance .booklist .book_items dd:nth-child(6) {
    font-size: 1rem;
    color: #EE8310;
}

main .advance .booklist .book_items ul {
    width: 250px;
    height: 20px;
    margin: 10px 100px;

}

main .advance .booklist .book_items ul li {
    float: left;
    margin: 3px;
    width: 8px;
    height: 8px;
    background-color: #ccc;
    border-radius: 50%;
}

/*third*/
main .challenge {
    width: 348px;
    height: 350px;
    background-color: #ffffff;
    border-radius: 6px;
    margin: 10px auto;
    box-shadow: 0px 3px 5px #fff;
}

main .challenge .challenge_desc {
    padding: 7px;
    width: 95%;
    height: 50px;
    border-bottom: 1px dashed #417673;
}

main .challenge .challenge_desc span:first-child {
    font-weight: bold;
    color: #198A82;
    line-height: 50px;
}

main .challenge .challenge_desc span:nth-child(2) {
    margin-left: 10px;
    font-size: 1rem;
    color: #767676;
    line-height: 50px;
}

main .challenge .booklist {
    width: 100%;
    height: 220px;
}

main .challenge .booklist .book_items dt {
    position: relative;
    float: left;
    width: 110px;
    height: 130px;
    margin-top: 20px;
    margin-left: 20px;
}

main .challenge .booklist .book_items dt img:first-child {
    position: absolute;
    top: 0;
    right: -20px;
    width: 52px;
    height: 55px;
}


main .challenge .booklist .book_items dd:nth-child(3) {
    float: left;
    width: 180px;
    height: 46px;
    margin: 10px 10px 0 15px;
    font-size: 1rem;
    color: #656565;
}

main .challenge .booklist .book_items dd:nth-child(4) {
    width: 250px;
    height: 20px;
    margin-left: 20px;
    font-size: 1em;
    color: #1D7771;
    clear: both;
    text-align: left;
}

main .challenge .booklist .book_items dd:nth-child(5) {
    float: left;
    margin-left: 20px;
    width: 250px;
    height: 20px;
    font-size: 1rem;
    color: #666666;

}

main .challenge .booklist .book_items dd:nth-child(6) {
    font-size: 1rem;
    color: #EE8310;
}

main .challenge .booklist .book_items ul {
    width: 250px;
    height: 20px;
    margin: 10px 100px;
}

main .challenge .booklist .book_items ul li {
    float: left;
    margin: 3px;
    width: 8px;
    height: 8px;
    background-color: #ccc;
    border-radius: 50%;
}

main .challenge .commit {
    width: 100%;
    height: 200px;
    border-top: 1px dashed #1CAFA6;
}

.able {
    margin: 10px auto;
    width: 300px;
    background-color: #1CAFA6;
    text-align: center;
    font-size: 2rem;
    color: #ffffff;
    border-radius: 6px;

}

.disabled {
    margin: 10px auto;
    width: 300px;
    background-color: #778899;
    text-align: center;
    font-size: 2rem;
    color: #ffffff;
    border-radius: 6px;
}

#DialogPanel {
    position: relative;
    margin:-500px 0 0 30px;
    width: 328px;
    height: 323px;
    background-image: url(../assets/images/页2/重复弹窗背景@2x.png);
    background-size: 328px 323px;
    z-index: 6;
}

#DialogPanel p {
    position: absolute;
    top: 130px;
    left: 0;
    right: 0;
    width: 251px;
    height: 37px;
    margin: 0 auto;
    text-align: center;
    font-size: 14px;
    color: #333333;

}

#DialogPanel #back {
    position: absolute;
    top: 232px;
    left: 39px;
    width: 110px;
    height: 30px;
    background-color: #E5E5E5;
    border-radius: 6px;
    text-align: center;
    line-height: 30px;
}

#DialogPanel #sure {
    position: absolute;
    top: 232px;
    right: 39px;
    width: 110px;
    height: 30px;
    background-color: #45C5BC;
    border-radius: 6px;
    text-align: center;
    line-height: 30px;
}

.mask {
    position: absolute;
    top: 0;
    right: 0;
    width: 20000px;
    height: 1900px;
    background-color: #ccc;
    opacity: .7;
    z-index: 5;
}
</style>

