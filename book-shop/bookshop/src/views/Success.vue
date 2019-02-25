<template>
    <div>
    <main>
        <div id="success_content">
            <div>
                <img src="images/页3/对号@2x.png" alt="success">
                <h3>恭喜您，您挑选的书单已提交成功！</h3>
                <p>
                    请扫描下方二维码，添加LingoAce工作人员
                    微信进行支付，完成团购订单
                </p>
            </div>
            <img class="hillside_leaf" src="images/页3/土坡叶子@2x.png" alt="hillside_leaf">
        </div>
        <div class="QRCode">
            <img src="images/页3/QRCode.png" alt="QRCode">
        </div>
        <p class="save">
            长按下方图片可保存，
            请邀请您的朋友，一同让书香飘满星城
        </p>
    </main>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    background-color: #000;
    z-index: 1000;
}

header img {
    margin: 14px 10px;
    float: left;
    width: 11px;
    height: 19px;
}

header h3 {
    line-height: 44px;
    text-align: center;
    font-size: 1.5em;
    color: #ffffff;
}
main {
    overflow: hidden;
    width: 100%;
    height: 700px;
    background-image: url(../assets/images/页2/页2底图@2x.png);
    background-repeat:no-repeat;
    background-size:100% 100%;
    z-index: -1;
}
main #success_content {
    position: relative;
    width:100%;
    height:auto;
    top: 3%;
}
main #success_content div {
    position: absolute;
    top: 40px;
    right: 15px;
    padding: 16px 34px 15px 30px;
    width: 280px;
    height: 148px;
    text-align: center;
    background-color: #1CAFA6;
    border-radius: 6px;
    opacity: 0.5;
}
main #success_content div img{
    width:32px;
    height:32px;
}
main #success_content div h3{
    font-size: 1.7rem;
    color: #ffffff;
    margin-top:10px;
}
main #success_content div p{
    font-size: 1rem;
    color: #ffffff;
    margin-top:10px;
}
main #success_content .hillside_leaf{
    position: absolute;
    z-index:1;
    top:180px;
    right:0;
    width:131px;
    height:86px;
}
main .QRCode{
    position: absolute;
    top:48%;
    z-index: 2;
    width:100%;
    height:316px;
    text-align: center;
}
main .QRCode img{
    width:328px;
    height:100%;
}
main .save{
    position: absolute;
    top:100%;
    left:25%;
    width:200px;
    height: 20px;
    margin:0 auto;
    font-size: 1.4rem;
    color:#494949;
    text-align: center;
    line-height: 20px;
}
</style>

