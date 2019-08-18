<template>
    <div>
        <Daohang></Daohang>
        <div class="daohang">
            <div class="daohang1">
                <p class="daohangtu">商品参考图</p>
                <p style="margin:0 auto;text-align:center;margin-left:110px;">订单id</p>
                <p style="margin:0 auto;text-align:center;margin-left:100px;">商家名称</p>
                <p style="margin:0 auto;text-align:center;margin-left:90px;">商品名称</p>
                <p style="margin:0 auto;text-align:center;margin-left:90px;">商品数量</p>
                <p style="margin:0 auto;text-align:center;margin-left:90px;">商品总价</p>
            </div>

            <div class="product" v-for="item in dingdanlist" :key="item.detailOrderId">
            <img class="shangpintu" :src="web_static_img+item.product.productPhoto" alt="">
            
            <div class="shangpinid">
                <p class="shangpinp">{{item.detailOrderId}}</p>
            </div>

            <div class="shangpinid">
                <p class="shangpinp">{{item.product.productBrandId}}</p>
            </div>

            <div class="shangpinid">
                <p class="shangpinp">{{item.product.productName}}</p>
            </div>

            <div class="shangpinid">
                <p class="shangpinp">{{item.detailProductCount}}{{item.detailProductUnit}}</p>
            </div>

             <div class="shangpinid">
                <p class="shangpinp">￥{{item.detailTotalPrice}}元</p>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import Daohang from '@/components/Daohang'
export default {
    name:'dingdandetail',
    components:{
        Daohang
    },
    data(){
        return{
            dingdanlist:[],
            orderdetail:this.$route.query.id,
            web_static_img:"http://www.wxhwg.com:8080/mock/static/"
        }
    },
    created(){
        this.dingdan();
    },
    methods:{
        //订单详情
        dingdan(){
            this.$axios.get("http://www.wxhwg.com:8080/mock/api/order/detail",{
                params:{
                    orderId:this.orderdetail
                }
            }).then(response=>{
                let result=response.data;
                if(result.status==200){
                    this.dingdanlist=result.data;
                    console.log(result.data);
                }
            }).catch(error=>{

            })
        }
    }
}
</script>

<style>

.daohang{
    margin-top:25px;
    margin:0 auto;
    display:flex;
    flex-direction:column;
    width:1280px;
    height:140px;
    background-color:white;
}
.daohang1{
    margin:0 auto;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    width:1280px;
    height:140px;
    background-color:#ffea8f
}
.daohangtu{
    margin-left:20px;
    text-align:center
}
.daohangname{
    padding-left:45px;
    margin:0 auto;
    text-align:center
}
.product{
    border:1px solid black;
    margin-top:25px;
    margin:0 auto;
    display:flex;
    flex-direction:row;
    width:1280px;
    height:140px;
    background-color:#ffea8f;
}
.shangpintu{
    width:100px;
    height:130px;
    margin-top:5px;
    margin-left:5px;
}
.shangpinid{
    width:130px;
    height:30px;
    margin:0 auto;
    margin-top:50px;
    margin-left:45px;
}
.shangpinp{
    text-align:center;
    margin-top:15px;
}
</style>


