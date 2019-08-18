<template>
  <div class="tc1" v-if="haha==true">
    <div class="tc11">
      <img style="height: 36px
width: 36px;" src="../img/zhuxiao.png" alt @click="tuichu">
    </div>
    <div class="tc11">
      <img style="height: 36px
width: 36px;" src="../img/qiehuan.png" alt @click="qiehuan">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uid: this.$store.state.loginUserId,
      haha: ""
    };
  },
  created() {
    this.xianshi()
  },
  methods: {
    xianshi(){
      if(this.uid!=null){
           this.haha=true;
      }else{
        this.haha=false;
      }
    },
    tuichu() {
      window.sessionStorage.removeItem("loginUserId");
      window.location.href=" http://localhost:8080/";
      this.$alert("退出登入");
    },
    qiehuan(){
       window.location.href="http://localhost:8080/uselogin"
    }
  }
};
</script>
<style>
.tc1 {
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
.tc11 {
  height: 70px;
  width: 70px;
  background-color: rgb(252, 253, 253);
}
.tc11:hover {
  transition: 1s;
  transform: scale(1.01, 1.01);
  box-shadow: 0px 0px 10px rgb(143, 143, 143);
}
.tc11 img {
  margin-top: 20px;
}
</style>

