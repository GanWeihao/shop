<template>
  <div id="app">
    <Daohang></Daohang>
    <div class="ss2">
      <div class="ss21">
       
        <div class="xinxi1" @click="kefu">
          <img style="width:25px;height:25px;" src="../img/kefu.png" alt>
          <p>客服</p>
        </div>
      
      </div>
      <div class="ss21">
        <div class="xinxi1">
          <img style="width:25px;height:25px;" src="../img/shouhou.png" alt>
          <p>售后</p>
        </div>
      </div>
      <div class="ss21">
        <div class="xinxi1" @click=" showDetails(1)">
          <img style="width:25px;height:25px;" src="../img/rexiao.png" alt>
          <p>热销</p>
        </div>
      </div>
      <div class="ss21">
        <div class="xinxi1" @click="showDetails(2)">
          <img style="width:25px;height:25px;" src="../img/xinpin.png" alt>
          <p>新品</p>
        </div>
      </div>
      <div class="ss21">
        <div class="xinxi1" @click="showDetails(3)">
          <img style="width:25px;height:25px;" src="../img/cuxiao.png" alt>
          <p>促销</p>
        </div>
      </div>
      <div class="ss21">
        <div class="xinxi1" @click="showDetails(4)">
          <img style="width:25px;height:25px;" src="../img/jianmian.png" alt>
          <p>减免</p>
        </div>
      </div>
    </div>
   <div class="lunbo">
      <el-carousel :interval="4000" type="card" height="420px">
        <el-carousel-item > 
          <img src="../img/e.png" style="width:610px;height:420px;" >
        </el-carousel-item>
         <el-carousel-item >
          <img src="../img/w.png" style="weight:610px;height:420px;" >
        </el-carousel-item>
         <el-carousel-item >
          <img src="../img/q.png"  style="weight:610px;height:420px;" >
        </el-carousel-item>
         <el-carousel-item >
          <img src="../img/t.png" style="weight:610px;height:420px;" >
        </el-carousel-item>
         <el-carousel-item >
          <img src="../img/r.png" style="weight:610px;height:420px;" >
        </el-carousel-item>
         <el-carousel-item >
          <img src="../img/y.png" style="weight:610px;height:420px;" >
        </el-carousel-item>
      </el-carousel>
    </div>



    <div class="changtu">
      <img
        style="width:1220px;height:140px;"
        src="../img/1.png"
        alt
      >
    </div>
    <div class="shangpin">
      <div class="leibie" id="listshow1">热销</div>
      <div class="shangpin1">
        <div
          class="tp"
          v-for="item1 in listrexiao"
          :key="item1.productId"
          @click="xiangqing(item1.productId)"
        >
          <div class="tp2">
            <div class="tp1">
              <img style="width:180px;height:190px;" :src="web_static_img+item1.productPhoto" alt>
              <div>{{item1.productName}}</div>
              <div>￥{{item1.productSmallPrice}}元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="changtu">
      <img
        style="width:1220px;height:140px;"
        src="../img/2.png"
        alt
      >
    </div>
    <div class="shangpin">
      <div class="leibie" id="listshow2">新品</div>
      <div class="shangpin1">
        <div
          class="tp"
          v-for="item2 in listxinpin"
          :key="item2.productId"
          @click="xiangqing(item2.productId)"
        >
          <div class="tp2">
            <div class="tp1">
              <img style="width:180px;height:190px;" :src="web_static_img+item2.productPhoto" alt>
              <div>{{item2.productName}}</div>
              <div>￥{{item2.productSmallPrice}}元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="changtu">
      <img
        style="width:1220px;height:140px;"
        src="../img/3.png"
        alt
      >
    </div>
    <div class="shangpin">
      <div class="leibie" id="listshow3">促销</div>
      <div class="shangpin1">
        <div
          class="tp"
          v-for="item3 in listcuxiao"
          :key="item3.productId"
          @click="xiangqing(item3.productId)"
        >
          <div class="tp2">
            <div class="tp1">
              <img style="width:180px;height:190px;" :src="web_static_img+item3.productPhoto" alt>
              <div>{{item3.productName}}</div>
              <div>￥{{item3.productSmallPrice}}元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="changtu">
      <img
        style="width:1220px;height:140px;"
        src="../img/4.png"
        alt
      >
    </div>
    <div class="shangpin">
      <div class="leibie" id="listshow4">减免</div>
      <div class="shangpin1">
        <div
          class="tp"
          v-for="item4 in listjianmian"
          :key="item4.productId"
          @click="xiangqing(item4.productId)"
        >
          <div class="tp2">
            <div class="tp1">
              <img style="width:180px;height:190px;" :src="web_static_img+item4.productPhoto" alt>
              <div>{{item4.productName}}</div>
              <div>￥{{item4.productSmallPrice}}元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <Tuichu></Tuichu>
    <Jiao></Jiao>
    <Cemian></Cemian>
  </div>
</template>
<script>
// @ is an alias to /src
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
  data() {
    return {
      listrexiao: [],
      listxinpin: [],
      listcuxiao: [],
      listjianmian: [],
      web_static_img: url + "/img/",
      showIndex: null
    };
  },
  created() {
    this.rexiao();
    this.xinpin();
    this.cuxiao();
    this.jianmian();
  },
  methods: {
    //热销
    rexiao() {
      this.$axios
        .get(url+"/api/product/list", {
          params: {
            pageNum: 5,
            pageSize: 8
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.listrexiao = result.data.list;
          }
        })
        .catch();
    },
    //新品
    xinpin() {
      this.$axios
        .get(url + "/api/product/list", {
          params: {
            pageNum: 10,
            pageSize: 8
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.listxinpin = result.data.list;
          }
        })
        .catch();
    },
    //促销
    cuxiao() {
      this.$axios
        .get(url + "/api/product/list", {
          params: {
            pageNum: 15,
            pageSize: 8
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.listcuxiao = result.data.list;
          }
        })
        .catch();
    },
    //减免
    jianmian() {
      this.$axios
        .get(url + "/api/product/list", {
          params: {
            pageNum: 20,
            pageSize: 8
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.listjianmian = result.data.list;
          }
        })
        .catch();
    },
    //跳转事件
    xiangqing(s) {
      this.$router.push({ path: "/tianjiagouwuche", query: { id: s } });
    },
    showDetails(num) {
      var el = document.getElementById(`listshow${num}`);
      console.log(el.offsetTop);
      if (this.showIndex == num) {
        this.showIndex = null;
      } else {
        this.showIndex = num;
      }
      this.$nextTick(function() {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop });
      });
    },
    kefu(){
     window.location.href="http://wpa.qq.com/msgrd?v=3&uin=1173925872&site=http://localhost:8080/&menu=yes";
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  position: relative;
}

.ss2 {
  height: 420px;
  width: 80px;
  background-color: white;
  float: right;
  margin-top: 130px;
  margin-left: 30px;
  position: fixed;
  display: flex;
  flex-wrap: wrap;
}
.ss21 {
  height: 60px;
  width: 80px;
  background-color: rgb(255, 250, 250);

}
.ss21:hover {
  transition: 1s;
  transform: scale(1.01, 1.01);
  box-shadow: 0px 0px 10px rgb(143, 143, 143);
}
.lunbo {
  background-color: white;
  height: 440px;
  width: 1220px;
  margin: 50px auto;
}
.changtu {
  width: 1220px;
  height: 140px;
  background-color: blanchedalmond;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
