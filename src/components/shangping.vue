<template>
  <div>
    <Daohang></Daohang>
    <Duotiaojian></Duotiaojian>
    <div class="dd">
      <div class="sj">
        <div class="sj1">
          <img style="height: 36px
width: 36px;" src="../img/sx.png" alt @click="sort1">
        </div>
        <div class="sj1">
          <img style="height: 36px
width: 36px;" src="../img/jx.png" alt @click="sort2">
        </div>
      </div>
      <div class="ss1">
        <div class="ss11" v-for="item in shoppingtypelist" :key="item.categoryId">
          <p @click="leibiechaxun(item.categoryId)">{{item.categoryName}}</p>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;width:1280px;margin-left:110px;">
        <div class="shangpin">
          <div class="shangpin1">
            <div class="tp" v-for="item in list1" :key="item.productId">
              <div class="tp2" @click="xiangqing(item.productId)">
                <div class="tp1">
                  <img style="width:180px;height:190px;" :src="web_static+item.productPhoto" alt>
                  <div>{{item.productName}}</div>
                  <div>￥{{item.productSmallPrice}}元</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="sum"
      ></el-pagination>
    </div>

    <Jiao></Jiao>
    <Cemian></Cemian>
  </div>
</template>

<script>
import Daohang from "@/components/Daohang.vue";
import Jiao from "@/components/Jiao.vue";
import Duotiaojian from "@/components/Duotiaojian.vue";
import Cemian from "@/components/Cemian.vue";
var url = "http://localhost:8080/lanqiaoshop"
export default {
  components: {
    Daohang,
    Jiao,
    Duotiaojian,
    Cemian
  },
  name: "shangping",
  data() {
    //alert(this.$store.state.loginUserId)
    return {
      all: "",
      list1: [],
      currentPage1: 1,
      web_static: "http://www.wxhwg.com:8080/mock/static/",
      value: "",
      shoppingtypelist: [],
      classid: "",
      count:0,
      sum:'',
    };
  },
  created() {
    this.handleCurrentChange();
    this.shoppingtype();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //全部商品分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$axios
      
        .get(url + "/api/product/list", {
          params: {
            pageNum: 2,
            pageSize: 12
          }
        })
        .then(response => {
          console.log(response);
        
          let result = response.data;
          if (result.status == 200) {
              this.sum = result.data.total;
            this.list1 = result.data.list;
            window.scrollTo(0, 0);
          }
        })
        .catch(error => {});
    },
    //总页数
    sum() {
      this.all = 454;
    },
    //查询商品类别（前端）
    shoppingtype() {
      //http://www.wxhwg.com:8080/mock/api/category/list
      this.$axios
        .get(url + "/api/category/list")
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.shoppingtypelist = result.data;
            console.log(this.shoppingtypelist);
          }
        })
        .catch(error => {});
    },
    //类别查询商品
    leibiechaxun(id) {
      
      this.$axios
        .get(url + "/api/product/selectByCatrgory", {
          params: {
            categoryId:id,
             pageNum:2,
             pageSize: 12
          }
        })
        .then(response => {
          console.log(response);
          let result = response.data;
          if (result.status == 200) {
            this.sum = result.data.total;
            this.list1 = result.data.list;
            console.log(result.data.list);
            console.log(this.list1);
            this.classid = id;
          }
        })
       
        this.currentPage1 = 1;
    },

    //升序按钮的实现
    sort1() {
      //alert(classid)
      this.$axios
        .get(url + "/api/product/searchList", {
          params: {
            orderStr: "asc",
            categoryId: this.classid
          }
        })
        .then(response => {
          console.log(response);
          let result = response.data;
          if (result.status == 200) {
            this.list1 = result.data;
            //console.log(result.data.list);
            //console.log(this.list1);
          }
        })
        .catch(error => {});
    },

    //降序按钮的实现
    sort2() {
      this.$axios
        .get(url + "/api/product/searchList", {
          params: {
            orderStr: "desc",
            //productIsLack:1,
            categoryId: this.classid
          }
        })
        .then(response => {
          console.log(response);
          let result = response.data;
          if (result.status == 200) {
            this.list1 = result.data;
            console.log(result.data.list);
            console.log(this.list1);
          }
        })
        .catch(error => {});
    },
    xiangqing(s) {
      this.$router.push({ path: "/tianjiagouwuche", query: { id: s } });
    }
  }
};
</script>

<style>
.dd {
  background-color: white;
  height: 865px;
}

.li1:hover {
  transition: 0.3s;
  transform: scale(1.05, 1.05);
}
.sj {
  height: 140px;
  width: 70px;
  background-color: aqua;
  float: right;
  margin-right: 35px;
  position: fixed;
  right: 0;
  top: 53%;
  margin-top: -100px;
}
.sj1 {
  height: 70px;
  width: 70px;
  background-color: rgb(253, 252, 252);
}
.sj1:hover {
  transition: 1s;
  transform: scale(1.01, 1.01);
  box-shadow: 0px 0px 10px rgb(143, 143, 143);
}
.sj1 img {
  margin-top: 20px;
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
</style>
