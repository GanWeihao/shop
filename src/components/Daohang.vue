<template>
  <div class="tou">
    <div class="sctx">
      <img style="width:60px;height:60px;" src="../img/log.jpg">
    </div>
    <div class="wenzi">
      <router-link :to="{path:'/'}">小吃街</router-link>
      <span class="sep">|</span>
      <router-link :to="{path:'/user/shangping'}">全部商品</router-link>
    </div>
    <div class="sousuo">
      <input type="text" class="ss" placeholder="请输入搜索商品的名称" @click="mohu">
      <router-link :to="{path:'/search'}">
        <button type="button" class="an">
          <img style="width:23px;height:23px;" src="../img/sousuo.png" alt>
          <p>搜索</p>
        </button>
      </router-link>
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
</template>

<script>
export default {
  data() {
    return {
      //ss:window.sessionStorage.getItem("loginUserId"),
      //ss1:''
      uid: this.$store.state.loginUserId,
      list: "",
       listdingdan: [],
    };
  },
  created() {
    this.adminId();
    this.shulian();
  },
  methods: {
    mohu() {
      this.$router.push({ path: "/search" });
    },
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
.tou .sousuo .ss {
  width: 300px;
  height: 50px;

  border: 1px;
  background-color: rgb(75, 74, 74);
  color: rgb(224, 224, 224);
  outline: none;
  float: left;
  font-size: 15px;
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

