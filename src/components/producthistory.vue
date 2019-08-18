<template>
    <div>
      <div style="margin:0 auto;width:1280px;height:40px;display:flex;flex-direction:row;background-color:#ffea8f">
        <p style="margin-left:28px;text-align:center;margin-top:10px">商品参考图</p>
        <p style="margin:0 auto;margin-top:10px;margin-left:280px">商品名称</p>
        <p style="margin:0 auto;margin-top:10px;margin-right:265px">商品价格</p>
      </div>
      <div style="border:1px solid black;margin:0 auto;width:1280px;height:140px;display:flex;flex-direction:row;background-color:#ffea8f" v-for="item in producthistory" :key='item.productId'>
        <img style="width:100px;height:130px;margin-left:10px;margin-top:5px;" :src="web_static_img+item.productPhoto" alt="">
        <div style="width:200px;height:30px;margin:0 auto;"><p style="text-align:center;padding-top:55px;">{{item.productName}}</p></div>
        <div style="width:200px;height:30px;margin:0 auto;"><p style="text-align:center;padding-top:55px;">￥{{item.productSmallPrice}}元</p></div>
      </div>
      <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="6"
        layout="total, prev, pager, next, jumper"
        :total="sum"
      ></el-pagination>
    </div>
    </div>
    
</template>

<script>
export default {
  name:'producthistory',
  data(){
      return{
        uid:this.$store.state.loginUserId,
        producthistory:[],
        web_static_img:'http://www.wxhwg.com:8080/mock/static/',
        list1:[],
        count:0,
        sum:''
      }
  },
  created(){
    //this.queryprohistory();
    this.handleCurrentChange();
  },
  methods:{
    //查询历史购物
    
     handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    //购买过的商品
   
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$axios.get("http://www.wxhwg.com:8080/mock/api/product/selectHistoryProducts",{
        params:{
          userId:this.uid,
          pageNum: val,
        pageSize: 6,
        }
      }).then(response=>{
          let result=response.data;
          if(result.status==200){
            this.sum = result.data.total;
            this.producthistory=result.data.list;
            window.scrollTo(0, 0);
          }
      }).catch(error=>{

      });
    }
    
  }
}
</script>

<style>

</style>


