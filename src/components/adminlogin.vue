<template>
  <div class="wrap">
    <div class="container">
        <div class="icon"></div>
      <br>
      <h1>小吃街管理员登录</h1>
      <form>
        <input
          type="text"
          class="uname"
          v-model="ruleForm.username"
          placeholder="请输入用户名"
          name="uname"
        >
        <input
          type="password"
          class="pword"
          v-model="ruleForm.password"
          placeholder="请输入密码"
          name="pword"
        >
        <input type="text" class="ccode" v-model="seccode" placeholder="请输入验证码">
        <span
          class="checkCode"
          @click="createCode()"
          style="display:block;width:280px"
        >{{this.checkcode}}</span>
        <input type="button" value="登录" @click="login()">
      </form>
      <div class="sss"></div>
    </div>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>
<script>
  var url = "http://localhost:8080/lanqiaoshop";
export default {
  name: "adminlogin",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      seccode: "",
      checkcode: ""
    };
  },
  mounted() {
    this.createCode();
  },
  methods: {
    createCode() {
      let code = "";
      const codeLength = 4;
      const random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      for (let i = 0; i < codeLength; i++) {
        let index = Math.floor(Math.random() * 36);
        code += random[index];
      }
      this.checkcode = code;
    },
    login() {
       var customerCode = this.seccode.toUpperCase();
      if (customerCode != this.checkcode) {
        alert("验证码错误");
        this.createCode();
        return false;
      }
      let params = this.$qs.stringify(this.ruleForm);
      this.$axios
        .post(url + "/admin/login", params)
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.$store.dispatch("login", response.data.id);
            this.$router.push({
              path: "/admin"
            });
          } else {
            alert(result.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.wrap {
  opacity: 0.8;
  background: linear-gradient(to bottom right, #98f1f1, #3feeae);
  background: -webkit-linear-gradient(to bottom right, #6fe0e0, #16d38e);
  display: flex;
  margin: 0;
  padding: 0;
  background-size: cover;
}

.ss1 {
  height: 80px;
  width: 80px;
}
.sss {
  height: 130px;
}
.container {
  width: 60%;
  margin: 0 auto;
  margin-top: 130px;
}
.uname {
  width: 320px;
  padding: 0 10px 0 35px;
  background-image: url("../img/b.png");
  background-repeat: no-repeat;
  background-position: 10px 7px;
  background-size: 22px 22px;
}
.pword {
  width: 320px;
  padding: 0 10px 0 35px;
  background-image: url("../img/c.png");
  background-repeat: no-repeat;
  background-position: 10px 7px;
  background-size: 22px 22px;
}
.ccode {
  width: 320px;
  padding: 0 10px 0 35px;
  background-image: url("../img/d.png");
  background-repeat: no-repeat;
  background-position: 10px 7px;
  background-size: 22px 22px;
  margin-right: 30px;
  margin-bottom: 5px;
}
.checkCode {
  background-image: url("../img/e.jpg");
  font-size: 30px;
  text-align: center;
  margin-left: 320px;
}

.container h1 {
  text-align: center;
  color: #000000;
  font-weight: 500;
}
.container input {
  display: block;
  height: 30px;
  border: 0;
  outline: 0;
  padding: 6px 35px;
  line-height: 24px;
  margin: 32px auto;
  -webkit-transition: all 0s ease-in 0.1ms;
  -moz-transition: all 0s ease-in 0.1ms;
  transition: all 0s ease-in 0.1ms;
  border-radius: 5px;
}
.container input[type="text"],
.container input[type="password"] {
  background-color: #ffffff;
  font-size: 16px;
  color: #50a3a2;
}
.container input:focus {
  outline: none;
  background: #f5f2ef;
}
.container input[type*="button"]:focus {
  width: 320px;
}
.container input[type*="button"] {
  width: 285px;
  height: 40px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #ffffff;
  background: -moz-linear-gradient(top, #c6ceb4 0%, #b6c0a1 50%, #afbb9a);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#000000),
    color-stop(0.5, #000000),
    to(#000000)
  );
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  border: 1px solid #7e8a60;
  -moz-box-shadow: 0px 1px 0px rgba(170, 170, 170, 1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.7);
  -webkit-box-shadow: 0px 1px 0px rgba(170, 170, 170, 1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.7);
  box-shadow: 0px 1px 0px rgba(170, 170, 170, 1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.7);
  text-shadow: 0px -1px 0px rgba(000, 000, 000, 0.3),
    0px 0px 0px rgba(255, 255, 255, 0);
}
.container input[type*="button"]:hover {
  opacity: 0.8;
}

.wrap ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
}
.wrap ul li {
  list-style-type: none;
  display: block;
  position: absolute;
  bottom: 5px;
  width: 15px;
  height: 15px;
  z-index: -8;
  background-color: rgba(255, 255, 255, 0.15);
  animation: square 25s infinite;
  -webkit-animation: square 25s infinite;
}
.wrap ul li:nth-child(1) {
  left: 0;
  animation-duration: 10s;
  -moz-animation-duration: 10s;
  -o-animation-duration: 10s;
  -webkit-animation-duration: 10s;
}
.wrap ul li:nth-child(2) {
  width: 40px;
  height: 40px;
  left: 10%;
  animation-duration: 15s;
  -moz-animation-duration: 15s;
  -o-animation-duration: 15s;
  -webkit-animation-duration: 15s;
}
.wrap ul li:nth-child(3) {
  left: 20%;
  width: 25px;
  height: 25px;
  animation-duration: 12s;
  -moz-animation-duration: 12s;
  -o-animation-duration: 12s;
  -webkit-animation-duration: 12s;
}
.wrap ul li:nth-child(4) {
  width: 50px;
  height: 50px;
  left: 30%;
  -webkit-animation-delay: 3s;
  -moz-animation-delay: 3s;
  -o-animation-delay: 3s;
  animation-delay: 3s;
  animation-duration: 12s;
  -moz-animation-duration: 12s;
  -o-animation-duration: 12s;
  -webkit-animation-duration: 12s;
}
.wrap ul li:nth-child(5) {
  width: 60px;
  height: 60px;
  left: 40%;
  animation-duration: 10s;
  -moz-animation-duration: 10s;
  -o-animation-duration: 10s;
  -webkit-animation-duration: 10s;
}
.wrap ul li:nth-child(6) {
  width: 75px;
  height: 75px;
  left: 50%;
  -webkit-animation-delay: 7s;
  -moz-animation-delay: 7s;
  -o-animation-delay: 7s;
  animation-delay: 7s;
}
.wrap ul li:nth-child(7) {
  left: 60%;
  animation-duration: 8s;
  -moz-animation-duration: 8s;
  -o-animation-duration: 8s;
  -webkit-animation-duration: 8s;
}
.wrap ul li:nth-child(8) {
  width: 90px;
  height: 90px;
  left: 70%;
  -webkit-animation-delay: 4s;
  -moz-animation-delay: 4s;
  -o-animation-delay: 4s;
  animation-delay: 4s;
}
.wrap ul li:nth-child(9) {
  width: 100px;
  height: 100px;
  left: 80%;
  animation-duration: 20s;
  -moz-animation-duration: 20s;
  -o-animation-duration: 20s;
  -webkit-animation-duration: 20s;
}
.wrap ul li:nth-child(10) {
  width: 120px;
  height: 120px;
  left: 90%;
  -webkit-animation-delay: 6s;
  -moz-animation-delay: 6s;
  -o-animation-delay: 6s;
  animation-delay: 6s;
  animation-duration: 30s;
  -moz-animation-duration: 30s;
  -o-animation-duration: 30s;
  -webkit-animation-duration: 30s;
}

@keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    bottom: 400px;
    transform: rotate(600deg);
    -webit-transform: rotate(600deg);
    -webkit-transform: translateY(-500);
    transform: translateY(-500);
  }
}
@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    bottom: 400px;
    transform: rotate(600deg);
    -webit-transform: rotate(600deg);
    -webkit-transform: translateY(-500);
    transform: translateY(-500);
  }
}
</style>


