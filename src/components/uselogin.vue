<template>
  <div class="uselogin">
    <div class="container">
      <div class="icon"></div>
      <br>
      <form action method="post" class="form">
        <ul>
          <p>小吃街用户登录</p>
          <br>
          <br>
          <li style="list-style-type:none;">
            <div class="text">
              <input type="text" class="uname" placeholder="请输入用户名" name="uname" v-model="ruleForm.username">
            </div>
          </li>

          <li style="list-style-type:none;">
            <div class="password">
              <input type="password" class="pword" placeholder="请输入密码" name="pword" v-model="ruleForm.password">
            </div>
          </li>

          <li style="list-style-type:none;">
            <div class="checkcode">
              <input type="text" class="ccode"  placeholder="请输入验证码" v-model="ruleForm.yanzheng">
            </div>
            <span
              class="checkCode"
              @click="createCode()"
              style="display:block;width:280px"
            >{{this.checkcode}}</span>
          </li>

          <li style="list-style-type:none;">
            <input type="button" value="登录" @click="confirmTheCode();denglu()">
          </li>
          <div class="zhuce">
            <li>
              <a href="#"  @click="zhuce()">立即注册</a>
            </li>
            <li>
              <span>|</span>
              <a href="#">忘记密码?</a>
            </li>
          </div>
        </ul>
      </form>

      <div>
        <meta charset="utf-8">
        <title></title>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
  var url = "http://localhost:8080/lanqiaoshop"
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        yanzheng: ""
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
    denglu() {
      if (this.ruleForm.username == "" || this.ruleForm.password == "") {
        this.$alert("用户名或密码不能为空");
      } else if (this.ruleForm.yanzheng == "") {
      } else {
        let params = this.$qs.stringify(this.ruleForm);
        //http://www.wxhwg.com:8080/mock/api/login
        this.$axios
          .post(url + "/api/login", params)
          .then(response => {
            let result = response.data;
            if (result.status == 200) {
              this.$store.dispatch("login", result.data.userId);
              this.$router.push({
                name: "home"
              });
            } else if (result.status == 404) {
              this.$alert("用户名或密码错误", "警告");
            }
          })
          .catch(error => {});
      }
    },
    confirmTheCode: function() {
      //验证函数
      var customerCode = this.ruleForm.yanzheng.toUpperCase(); //把你输入的小写转化为大写
      if (customerCode == 0) {
        this.createCode();
        this.ruleForm.yanzheng = "";
        alert("请输入验证码");
      } else if (customerCode != this.checkcode) {
        this.createCode();
        this.ruleForm.yanzheng = "";
        alert("验证码不正确，请重新输入");
      } else {
      }
    },
    //注册
      zhuce() {
       this.$router.push({ path:'/Yonghuzhuce'}) 
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

.uselogin {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-color: rgba(245, 245, 245, 0.973);
}
.container {
  width: 60%;
  height: 650px;
  margin: 0 auto;
  margin-top: 50px;
  
}
.icon {
  width: 100%;
  height: 80px;
  background-image: url("../img/log.jpg");
  background-repeat: no-repeat;
  background-size: 80px 80px;
  background-position: 400px 10px;
  margin-left: 20px;
}
.form p {
  font-size: 35px;
  text-align: center;
}

.uname {
  width: 320px;
  padding: 0 10px 0 35px;
  background-position: 10px 7px;
}
.pword {
  width: 320px;
  padding: 0 10px 0 35px;
  background-position: 10px 7px;
}
.ccode {
  width: 320px;
  padding: 0 10px 0 35px;
  background-repeat: no-repeat;
  background-position: 10px 7px;
  margin-right: 30px;
  margin-bottom: 5px;
}

.checkCode {
  background-image: url("../img/e.jpg");
  font-size: 30px;
  text-align: center;
  margin-left: 320px;
}
.zhuce {
  margin-bottom: 10px;
  margin-left: 510px;
}
.zhuce li {
  float: left;
  margin-right: 10px;
  list-style-type: none;
}
.zhuce li a {
  text-decoration: none;
  color: black;
}
.wangji {
  text-align: center;
  margin-left: 320px;
}
.container h1 {
  text-align: center;
  color: #ffffff;
  font-weight: 500;
}
.container input {
  display: block;
  height: 30px;
  border: 1px solid gainsboro;
  outline: 0;
  padding: 6px 35px;
  line-height: 24px;
  margin: 32px auto;
  -webkit-transition: all 0s ease-in 0.1ms;
  -moz-transition: all 0s ease-in 0.1ms;
  transition: all 0s ease-in 0.1ms;
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
  width: 320px;
  height: 50px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #ffffff;
  background: -moz-linear-gradient(top, #c6ceb4 0%, #b6c0a1 50%, #afbb9a);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#ff6700),
    color-stop(0.5, #ff6700),
    to(#ff6700)
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
</style>



