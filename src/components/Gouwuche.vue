<template>
  <!-- 购物车界面 -->

  <div class="cencer">
    <Daohang></Daohang>
    <div class="sss1">
      <div class="sss11">
        <div class="sss111">
          <img style="width:60px;height:60px;" src="../img/zongjia.png" alt>
          <label style="font-size:1.4rem;color:black">总价</label>
        </div>
        <div class="sss112">
          <p style="font-size:1.5rem;color:red">￥{{sum}}元</p>
        </div>
      </div>
      <div class="sss12">
        <el-button type="success" @click="mai()">提交订单</el-button>
      </div>
    </div>
    <div class="kb">
      <div class="cencer-part" v-for="item in listdingdan" :key="item.detailId">
        <div class="list">
          <img style="width:100px;height:100px;" :src="web_static+item.product.productPhoto" alt>
        </div>
        <div class="detail">
          <div class="pname">
            <p>商品名称：{{item.product.productName}}</p>
          </div>

          <div class="pro_detail">
            <p>数量：{{item.detailProductCount}}{{item.detailProductUnit}}</p>
            <p class="p1">价格：￥{{item.detailTotalPrice}}元</p>
            <p class="p1">订单时间：{{item.product.productDateTime}}</p>
          </div>
        </div>
        <div class="button">
          <!-- <el-button type="success" @click="mai()">删除购物车</el-button>  -->
          <el-button type="danger" icon="el-icon-delete"  @click="del(item.detailId)" circle></el-button>
        </div>
      </div>
    </div>
    <Jiao></Jiao>
    <Cemian></Cemian>
     <Tuichu></Tuichu>
  </div>
</template>

<script>
import Daohang from "@/components/Daohang.vue";
import Jiao from "@/components/Jiao.vue";
import Cemian from "@/components/Cemian.vue";
import Tuichu from "@/components/Tuichu.vue";

var url = "http://localhost:8080/lanqiaoshop"
export default {
  components: {
    Daohang,
    Jiao,
    Cemian,
    Tuichu
  },

  name: "zhujiemian",
  data() {
    return {
      listdingdan:[],
      uid: this.$store.state.loginUserId,
      checked: true,
      list:[],
      allprice: "",
      //list1:"",
      web_static: "http://www.wxhwg.com:8080/mock/static/"
    };
  },
  created() {
    this.queryhistory();
    //this.sum();
  },

  computed: {
    sum() {
      let price = 0;
      for (let i = 0; i < this.listdingdan.length; i++) {
        price += this.listdingdan[i].detailTotalPrice;
      }
      return price;
    }
  },
  methods: {
    //查询购物车
    queryhistory() {
      console.log(this.uid);
      this.$axios
        .get(url + "/api/query/shopcar", {
          params: {
            uid: this.uid
          }
        })
        .then(response => {
          let result = response.data;
          console.log(result);
          console.log("这是用户id"+this.uid);
          if (result.status == 200) {
            let price = 0;
            this.listdingdan = result.data;
            for (let i = 0; i < this.listdingdan.length; i++) {
              price += this.listdingdan[i].detailTotalPrice;
              this.allprice = parseFloat(price);
            }
          };
          if(this.allprice==0){
               this.$alert("购物车内无商品，请加购你喜欢的商品！！！")
             }
        })
        .catch();
    },

    //提交订单
    mai() {
      let params = this.$qs.stringify({
        orderUserId: this.uid,
        orderTotalPrice: this.allprice,
        orderComment: ""
      });
      this.$axios.post(url + "/api/order/commit", params)
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.$alert("提交订单成功");
             this.queryhistory();
          } else {
            this.$alert("未知异常!!!");
          }
        })
        .catch(error => {});
    },
    //清除购物车商品
    del(id) {
      this.$axios
        .get(url + "/api/detail/cartDel", {
          params: {
            detailId:id
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.list = result.data;
            this.queryhistory();
          }else{
          }
        })
        .catch(error => {});
    },

  }
};
</script>

<style>
.kb {
  margin-top: 50px;
  min-height: 600px;
}
.cencer-part {
  display: flex;
  flex-direction: row;
  background-color: rgb(245, 245, 245);
  width: 750px;
  height: 130px;
  margin: 5px auto;
  padding: 10px;
  margin-top: 15px;
}
.list {
  background-color: aliceblue;
  height: 100px;
  width: 100px;
  margin: 15px;
  float: left;
}
.button {
  float: right;
  margin-right: 0px;
  margin-top: 45px;
}
all {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.4rem;
  color: red;
  width: 200px;
  height: 50px;
}
.foot {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  width: 750px;
  height: 100px;
  margin: 5px auto;
  padding: 10px;
  margin-top: 15px;
  color: black;
}
.detail {
  width: 550px;
  height: 140px;
}
.pname {
  margin-top: 30px;
  text-align: left;
  margin-left: 130px;
  font-size: 1.3rem;
}
.pro_detail {
  display: flex;
  flex-direction: row;
  padding-top: 50px;
}
.p1 {
  margin-left: 40px;
  text-align: left;
}
.sss1 {
  height: 180px;
  width: 150px;
  background-color: white;
  line-height: 32px;
  float: right;
  margin-top: 250px;
  margin-left: 100px;
  position: fixed;
}
.sss11 {
  width: 180px;
  height: 100px;
  text-align: center;
  font-size: 14px;
  background-color: white;
  display: flex;
}
.sss111 {
  height: 100px;
  width: 60px;
  display: flex;
  background-color: white;
  flex-wrap: wrap;
  margin: 0 auto;
}
.sss111 label {
  margin-left: 7px;
}
.sss112 {
  background-color: white;
  width: 120px;
  text-align: center;
  line-height: 100px;
}
.sss12 {
  width: 100px;
  height: 35px;
  text-align: center;
  font-size: 14px;
  background-color: white;
  margin-top: 20px;
  margin-left: 40px;
}
.sss11:hover {
  transition: 1s;
  transform: scale(1.01, 1.01);
  box-shadow: 0px 0px 10px rgb(206, 206, 206);
}
.sss12:hover {
  transition: 1s;
  transform: scale(1.01, 1.01);
  box-shadow: 0px 0px 10px rgb(206, 206, 206);
}

</style>
