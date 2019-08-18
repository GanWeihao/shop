<template>
  <div>
    <Daohang></Daohang>
    <div class="zhongjian">
      <div class="daohang">
        <div class="ss" @click=" select">
          <img style="width:35px;height:35px;" src="../img/geren.png" alt>
          <p>个人信息</p>
        </div>
        <div class="ss" @click=" daoru">
          <img style="width:35px;height:35px;" src="../img/geren.png" alt>
          <p>历史订单</p>
        </div>
      </div>
      <div class="xianshi">
        <div class="xinxi" v-if="xianshi==true">
          <div class="touxiang">
            <p>用户头像</p>
            <img style=" height: 180px;
    width:180px" :src="src" alt>
          </div>
          <div class="tt">
            <div class="tt1">
              <p>{{ "Id:"+this.userId}}</p>

              <p>{{"用户名:"+this.userUserName}}</p>

              <p>{{"手机号:"+this.userTelphone}}</p>

              <p>{{"密码:"+this.userPassword}}</p>

              <p>{{"地址:"+this.userAddress}}</p>

              <p>{{"商店名称:"+this.userShopName}}</p>
            </div>
          </div>
        </div>
        <div v-if="xianshi==false">
          <div
            v-for="item in tableData"
            @click="dingdandetail(item.orderId)"
            :key="item.orderId"
            style="margin:0 auto;margin-top:20px;font-size:1.2rem;display:flex;flex-direction:row;width:1100px;height:75px;background-color:gainsboro;  line-height: 75px;"
          >
            <p style="margin:0 auto;margin-left:70px;">订单编号:{{item.orderId}}</p>
            <p style="margin:0 auto;margin-left:50px;">创建时间:{{item.orderDateTime}}</p>
            <p style="margin:0 auto;margin-left:50px;">总价:{{item.orderTotalPrice}}元</p>
            <p style="margin:0 auto;margin-left:50px;" v-if="item.orderIsSend==0">是否发货:否</p>
            <p style="margin:0 auto;margin-left:50px;" v-if="item.orderIsSend==1">是否发货:是</p>
          </div>
        </div>
        <div v-if="xianshi=='false1'">
          <div
            v-for="item1 in dingdanlist"
            :key="item1.detailOrderId"
            style="margin:0 auto;margin-top:20px;font-size:1.2rem;display:flex;flex-direction:row;width:1100px;height:120px;background-color:gainsboro;  line-height: 75px;"
          >
            <img class="shangpintu" :src="web_static_img+item1.product.productPhoto" alt>
            <p
              style="margin:0 auto;margin-left:10px; line-height:120px"
            >{{"订单id:"+item1.detailOrderId}}</p>
            <p
              style="margin:0 auto;margin-left:20px; line-height:120px"
            >{{"商品名称:"+item1.product.productName}}</p>
            <p
              style="margin:0 auto;margin-left:20px; line-height:120px"
            >{{"商品数量:"+item1.detailProductCount}}{{item1.detailProductUnit}}</p>
            <p
              style="margin:0 auto;margin-left:20px; line-height:120px"
            >{{"商品总价￥:"+item1.detailTotalPrice+"元"}}</p>
          </div>
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
    inject: ["reload"],
    Daohang,
    Jiao,
    Cemian,
    Tuichu
  },
  data() {
    return {
      src: "",
      userId: "",
      userUserName: "",
      userPassword: "",
      userTelphone: "",
      userAddress: "",
      userShopName: "",
      table: [],
      list: [],
      tabPosition: "left",
      uid: window.sessionStorage.getItem("loginUserId"),
      tableData: [],
      xianshi: "",
      dingdanlist: [],
      orderdetail: this.$route.query.id,
      web_static_img: "http://www.wxhwg.com:8080/mock/static/"
    };
  },
  created() {
    //相当于创建之后 类似于Java构造函数中的作用
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    //查询个人详细信息
    select() {
      this.xianshi = true;
      this.$axios
        .get(url + "/api/user/find", {
          params: {
            userId: this.uid
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.userUserName = result.data.userUserName;
            this.userPassword = "******";
            this.userTelphone = result.data.userTelphone;
            this.userAddress = result.data.userAddress;
            this.userShopName = result.data.userShopName;
            this.userId = result.data.userId;
            this.src =
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560716862789&di=e4bcd0089cc3f62c412c26cd3eba461e&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F5c712bf648207dfc740081ba216371c6aaba3e289383-AHREH5_fw658";
          }
        })
        .catch(error => {});
    },
    exit() {
      this.$router.push({ name: "/home" });
    },

    //查询历史订单
    daoru() {
      this.xianshi = false;
      var self = this;
      this.$axios({
        method: "get",
        url: url + "/api/order/selectHistory",
        params: {
           userId: this.uid
           //userId:this.$store.state.loginUserId,
        }
      })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            //alert(result.message);
            self.tableData = result.data;
            console.log(result.data);
          } else {
            alert(result.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //订单详情
    dingdandetail(orderid) {
      this.xianshi = "false1";
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/api/order/detail", {
          params: {
            orderId: orderid
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.dingdanlist = result.data;
          }
        })
        .catch(error => {});
    },
    shuaxin() {
      $(xinxi)
        .parent()
        .remove();
    }
  }
};
</script>

<style>
.zhongjian {
  min-height: 525px;
  background-color: white;
  margin-top: 20px;
  display: flex;
}
.daohang {
  height: 150px;
  width: 150px;
  background-color: rgb(240, 239, 239);
  margin-top: 150px;
  margin-left: 45px;
}
.xianshi {
  min-height: 400px;
  width: 1100px;
  background-color: rgb(240, 239, 239);
  margin-left: 45px;
  margin-top: 25px;
  margin-bottom: 40px;
}
.xinxi {
  height: 350px;
  width: 900px;
  margin: 25px auto;
  background-color: rgb(240, 239, 239);
  display: flex;
}

.touxiang {
  height: 250px;
  width: 200px;
  background-color: rgb(240, 239, 239);
}
.tt {
  height: 350px;
  width: 600px;
  background-color: rgb(240, 239, 239);
}
.tt .tt1 {
  width: 400px;
  background-color: rgb(240, 239, 239);
  margin-left: 100px;
}
.tt p {
  width: 400px;
  margin-top: 25px;
  margin-right: 200px;
  font-size: 20px;
}

.ss {
  height: 75px;
  width: 150px;
  text-align: center;
  line-height: 75px;
  display: flex;
}
.ss img {
  margin-top: 15px;
  margin-left: 25px;
}
.ss:hover {
  transition: 1s;
  transform: scale(1.01, 1.01);
  box-shadow: 0px 0px 10px rgb(143, 143, 143);
}

.shangpintu {
  width: 120px;
  height: 120px;

  margin-left: 5px;
}
</style>
