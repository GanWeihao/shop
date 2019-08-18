<template>
<div>
  <Daohang></Daohang>
    <div class="css">
        <div class="li2">
          <img style="width:350px;height:320px;line-height:400px;margin-top:150px;" :src="web_static_img+listdetail.productPhoto" alt="">
          <div style="width:350px;height:400px;line-height:400px;display:flex;flex-direction:row;margin:0 auto;margin-top:10px;">
            <img style="width:60px;height:60px;line-height:60px;margin:0 auto" :src="web_static_img+listdetail.productPhoto" alt="">
            <img style="width:60px;height:60px;line-height:60px;margin:0 auto" :src="web_static_img+listdetail.productPhoto" alt="">
            <img style="width:60px;height:60px;line-height:60px;margin:0 auto" :src="web_static_img+listdetail.productPhoto" alt="">
            <img style="width:60px;height:60px;line-height:60px;margin:0 auto" :src="web_static_img+listdetail.productPhoto" alt="">
          </div>
        </div>
        <div class="li3">
            <div style="width:800px;height:300px;margin-left:100px;padding-top:40px;">
               <h3 style="padding-top:25px;width:350px;height:30px;;padding-left:8px;font-size:1.2rem;text-align:left">{{this.listdetail.productBrandId}}{{this.listdetail.productName}}</h3>
               <div style="width:500px;height:40px;margin-top:30px;padding-top:20px;display:flex;flex-direction:row;justify-content:space-between">
                 <p style="padding-left:8px">价格</p>
                 <h3 style="color:red;font-size:1.8rem;padding-right:8px">￥{{this.listdetail.productSmallPrice}}元</h3>
               </div>
               <div style="width:500px;height:40px;margin-top:20px;padding-top:20px;display:flex;flex-direction:row;justify-content:space-between">
                 <p style="padding-left:8px">规格</p>
                 <h3 style="padding-right:8px">{{this.listdetail.productStandard}}{{this.listdetail.productSmallUnit}}</h3>
               </div>
               
               <div style="width:500px;height:40px;margin-top:20px;padding-top:20px;display:flex;flex-direction:row;justify-content:space-between">
                 <p style="padding-left:8px">货物状态</p>
                 <p style="padding-right:8px" v-if="this.listdetail.productIsLack=='1'">有货</p>
                 <p style="padding-right:8px" v-if="this.listdetail.productIsLack=='0'">无货</p>
               </div>

               <div style="width:500px;height:40px;margin-top:20px;padding-top:20px;display:flex;flex-direction:row;justify-content:space-between">
                 <p style="padding-left:8px;padding-top:20px;">数量</p>
                 <div>
                   <el-input-number  v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                 </div>
               </div>
               
               <div style="width:500px;height:100px;margin-top:20px;padding-top:20px;display:flex;flex-direction:column;">
                 <el-input type="textarea" :rows="3" placeholder="备注" v-model="textarea"></el-input>
               </div>
               <div style="width:500px;display:flex;flex-direction:row;justify-content:space-between">
                 <el-button type="danger" @click="back()" style="margin-top:20px;">继续购物</el-button>
                 <el-button type="danger" @click="addcar()" style="margin-top:20px;">加入购物车</el-button>
               </div>
            </div>
        </div>

       
  </div>
  <Jiao></Jiao>
</div>
</template>

<script>
import Daohang from "@/components/Daohang.vue"
import Jiao from "@/components/Jiao.vue"
var url = "http://localhost:8080/lanqiaoshop"
export default {
    name:"tianjiagouwuche",
    components:{
      Daohang,
      Jiao
    },
    data() {
      return {
        productid:this.$route.query.id,
        listtuijian:[],
        textarea:'',
        pro_duct_status:"",
        num: 1,
        listdetail:"",
        web_static_img:'http://www.wxhwg.com:8080/mock/static/',
        uid:this.$store.state.loginUserId
      };
    },
    created(){
      this.shoppingdetail();
      this.rexiao();
    },
    methods: {
      //继续购物
      back(){
        this.$router.go(-1);//返回上一层
    },
      handleChange(value) {
        console.log(value);
      },
      //猜你喜欢
      rexiao(){
      this.$axios.get("http://www.wxhwg.com:8080/mock/api/product/list",{
        params:{
          pageNum:12,
          pageSize:6
        }
      }).then(response=>{
        let result=response.data;
        if(result.status==200){
          this.listtuijian=result.data.list
        }
      }).catch()
    },
      //商品详情
      shoppingdetail(){
        //http://www.wxhwg.com:8080/mock/api/product/find
        this.$axios.get(url + "/api/product/find/id",{
          params:{
            productId:this.productid
          }
        }).then(response=>{
            let result=response.data;
            if(result.status==200){
                this.listdetail=result.data;
            }
        }).catch(error=>{

        })
      },
      //添加购物车
      addcar(){
        if(this.$store.state.loginUserId!=null){
        if(this.listdetail.productIsLack==1){
            let params=this.$qs.stringify({
            detailProductId:this.productid,
            detailProductCount:this.num,
            detailProductUnit:this.listdetail.productSmallUnit,
            detailProductPrice:this.listdetail.productSmallPrice,
            detailComment:this.textarea,
            detailUserId:this.uid
          })
          this.$axios.post(url + "/api/detail/join",params).then(response=>{
            let result=response.data;
            if(result.status==200){
              this.$alert(result.message)
            }
          }).catch();
        }else{
          this.$alert("对不起，该货物已售空!!!");
        }
        }else{
          this.$alert("请登录");
        }
        
      }
    }
}
</script>

<style>
    
 .css{
        display: flex;
        flex-direction:row;
        width:1280px;
        height:800px;
        margin:0 auto ;
        line-height:0px;
        margin-top:10px;
        background-color: white;
    }
    .li2{
        background-color: white;
        width:560px;
        height:800px;
    }
    .li3{
        background-color: white;
        float:right;
        width:730px;
        height:800px;
    }
    .li4{
      margin-left:20px;
      width:350px;
      height:800px;
    }
</style>


