<template>
  <div>
    <div class="tou">
      <div class="sctx">
        <img style="width:60px;height:60px;" src="../img/log.jpg">
      </div>
      <div class="wenzi">
        <router-link :to="{path:'/'}">小吃街</router-link>
        <span class="sep">|</span>
        <router-link :to="{path:'/user/shangping'}">全部商品</router-link>
        <span class="sep">|</span>
      </div>
      <div class="sousuo">
        <input type="text" class="ss" v-model="inputtext" placeholder="请输入搜索商品的名称">
        <button type="button" class="an" @click="mohuquery()">
          <img style="width:23px;height:23px;" src="../img/sousuo.png" alt>
          <p>搜索</p>
        </button>
        <!-- </router-link> -->
      </div>
      <div class="xinxi">
        <div class="xinxi1" @click="tiaozhuan">
          <img
          style="width:25px;height:25px;"
          v-if="this.$store.state.loginUserId==null"
          src="../img/dengru1.png"
          alt
        >
        <img
          style="width:25px;height:25px;border-radius:50%"
          v-if="this.$store.state.loginUserId!=null"
          src="../img/ms.jpg"
          alt
        >
        <p v-if="this.$store.state.loginUserId==null">用户登录</p>
        <p v-if="this.$store.state.loginUserId!=null">{{this.list.userUserName}}</p>
        </div>

        <div class="xinxi1" @click="gerenxinxi">
          <img style="width:25px;height:25px;" src="../img/geren.png" alt>
          <p>个人信息</p>
        </div>

        <div class="xinxi1" @click="houtai">
          <img style="width:25px;height:25px;" src="../img/houtai1.png" alt>
          <p>后台登录</p>
        </div>

        <div class="xinxi1" @click="gouwuche">
          <img style="width:25px;height:25px;" src="../img/gouwuche.png" alt>
          <div class="yuan" @click="shulian">
          <span>{{ listdingdan.length}}</span>
        </div>
          <p>购物车</p>
        </div>
      </div>
    </div>
    <div class="dd">
      <div class="ss1">
        <div class="ss11" v-for="item in shoppingtypelist" :key="item.categoryId">
          <p>{{item.categoryName}}</p>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;width:1280px;margin-left:110px;">
        <div class="shangpin">
          <div class="shangpin1">
            <div class="tp" v-for="item in listmohu" :key="item.productId">
              <div class="tp2" @click="xiangqing(item.productId)">
                <div class="tp1">
                  <img
                    style="width:180px;height:190px;"
                    :src="web_static_img+item.productPhoto"
                    alt
                  >
                  <div>{{item.productName}}</div>
                  <div>￥{{item.productSmallPrice}}元</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   <Jiao></Jiao>
    <Cemian></Cemian>
    </div>
</template>
<script>
import Jiao from "@/components/Jiao.vue";
import Cemian from "@/components/Cemian.vue";
var url = "http://localhost:8080/lanqiaoshop"
export default {
  name: "search",
  components: {
    Jiao,
    Cemian
  },
  data() {
    return {
      listmohu: [],
      inputtext: "",
      web_static_img: "http://www.wxhwg.com:8080/mock/static/",
      shoppingtypelist: [],
       uid: this.$store.state.loginUserId,
       list: "",
         listdingdan: []
    };
  },
  created() {
    this.queryall();
    this.adminId();
  },
  methods: {
    //模糊搜索
    mohuquery() {
      console.log(this.shoppingname);
      this.$axios
        .get(url + "/api/product/search", {
          params: {
            name: this.inputtext.replace(/\s*/g,"")
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.listmohu = result.data;
            this.$alert(result.message);
          }
        })
        .catch();
    },
    //类别
    shoppingtype() {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/api/category/list")
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.shoppingtypelist = result.data;
          }
        })
        .catch(error => {});
    },
    //显示
    queryall() {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/api/product/list", {
          params: {
            pageNum: 15,
            pageSize: 12
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.listmohu = result.data.list;
          }
        })
        .catch();
    },
     adminId() {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/api/user/findById", {
          params: {
            userId: this.uid
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.list = result.data;
          }
        })
        .catch();
    },
    //详情
    xiangqing(s) {
      this.$router.push({ path: "/tianjiagouwuche", query: { id: s } });
    },
    //跳转
    tiaozhuan() {
      this.$router.push({ path: "/uselogin" });
    },
    houtai() {
      this.$router.push({ path: "/adminlogin" });
    },
    gouwuche() {
      this.$router.push({ path: "/Gouwuche" });
    },
    gerenxinxi() {
      this.$router.push({ path: "/Gerenxinxi" });
    },
    shulian(){
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/api/detail/qryCartList", {
          params: {
            uid: this.uid
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            let price = 0;
            this.listdingdan = result.data;
          };
        })
        .catch();
    },
  }
};
</script>

<style>
.dd {
  background-color: white;
  display: flex;
  min-height: 865px;
}

.li1:hover {
  transition: 0.3s;
  transform: scale(1.05, 1.05);
}
.head {
  margin: 0 auto;
  width: 1200px;
  background-color: white;
}
.block {
  margin: 25px auto;
}
.ss1 {
  height: 420px;
  width: 90px;
  background-color: white;
  float: left;
  margin-top: 26px;
  margin-left: 30px;
  position: fixed;
  display: flex;
  flex-wrap: wrap;
}
.ss11 {
  height: 32px;
  width: 90px;
  background-color: rgb(247, 244, 244);
  line-height: 32px;
}
.ss11 p {
  text-align: center;
  font-size: 14px;
}
.ss11:hover {
  transition: 1s;
  transform: scale(1.01, 1.01);
  box-shadow: 0px 0px 10px rgb(143, 143, 143);
}
.shangpin {
  width: 1280px;
  height: 600px;
  background-color: white;
  margin: 20px auto;
}
.shangpin .leibie {
  width: 100px;
  height: 50px;
  background-color: white;
  text-align: center;
  font-size: 30px;
}
.shangpin .shangpin1 {
  flex-wrap: wrap;
  display: flex;
  width: 1280px;
  height: 550px;
  background-color: white;
}
.shangpin .shangpin1 .tp {
  height: 265px;
  width: 310px;
  background-color: white;
  margin: 5px 5px;
}
.shangpin .shangpin1 .tp .tp2 {
  width: 260px;
  height: 265px;
  background-color: rgb(245, 248, 248);
  margin: 0 auto;
  display: flex;
}
.shangpin .shangpin1 .tp .tp1 {
  width: 180px;
  height: 190px;
  background-color: aliceblue;
  margin: 10px auto;
}
.shangpin .shangpin1 .tp .tp2:hover {
  transition: 0.8s;
  transform: scale(1.01, 1.01);
  box-shadow: 0px 0px 10px rgb(143, 143, 143);
}
.tou .xinxi .xinxi1 .yuan{
  background-color: red;
  width:14px;
  height: 14px;
  position:absolute;
  right: 158px;
  top: 12px;
  border-radius: 50%;  
}
.tou .xinxi .xinxi1 .yuan span{
  color: white;
}
.el-dropdown-link {
  color: rgb(172, 171, 171);
}
.el-icon-arrow-down {
  font-size: 12px;
}
.tou {
  background-color: black;
  height: 70px;
  display: flex;
}
.tou .sousuo {
  width: 400px;
  height: 50px;
  background-color: black;
  margin-top: 10px;
  margin-left: 24px;
}
.tou .sctx {
  width: 70px;
  height: 65px;
  background-color: black;
  margin-left: 120px;
  margin-top: 5px;
}
.tou .wenzi {
  width: 320px;
  height: 70px;
  background-color: black;
  font-size: 14px;
  line-height: 70px;
}

span {
  color: rgb(87, 87, 87);
}
a {
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: rgb(172, 171, 171);
  text-decoration: none;
}

.tou .wenzi a:hover {
  color: rgb(223, 219, 219);
}
.tou .xinxi {
  width: 300px;
  height: 50px;
  background-color: black;
  margin-top: 10px;
  margin-left: 167px;
  display: flex;
}
.tou .xinxi .xinxi1 {
  width: 50px;
  height: 50px;
  background-color: black;
  margin: 5px 10px;
  font-size: 12px;
  text-align: center;
  color: rgb(172, 171, 171);
}
.tou .xinxi .xinxi1:hover {
  color: rgb(223, 219, 219);
}
.tou .sousuo .ss {
  width: 300px;
  height: 50px;

  border: 1px;
  background-color: rgb(75, 74, 74);
  color: rgb(224, 224, 224);
  outline: none;
  float: left;
}
.tou .sousuo .an {
  width: 100px;
  height: 50px;
  border: 1px;

  background-color: rgb(3, 180, 3);
  color: rgb(255, 255, 255);
  outline: none;
  float: right;
}
.tou .sousuo .an img {
  float: left;
  margin-top: 12px;
  margin-left: 20px;
}
.tou .sousuo .an p {
  line-height: 50px;
  margin-right: 30px;
}
</style>


