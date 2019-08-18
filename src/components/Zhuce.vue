<template>
  <div> 
    <div class="register-wrapper"> 

      <div id="register">
        <p class="title">注册</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm2"
        >
         <el-form-item prop="userUserName" label="用户名">
            <el-input v-model="ruleForm2.userUserName" auto-complete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="userTelphone" label="手机号">
            <el-input v-model="ruleForm2.userTelphone" auto-complete="off" placeholder="请输入手机号" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item prop="userPassword" label="密码">
            <el-input type="password" v-model="ruleForm2.userPassword" auto-complete="off" placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="userAddress" label="地址">
            <el-input v-model="ruleForm2.userAddress" auto-complete="off" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item prop="userShopName" label="商店名称">
            <el-input v-model="ruleForm2.userShopName" auto-complete="off" placeholder="请输入商店名称"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button @click="submitForm('ruleForm2')">注册</el-button>
              <p class="login" @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  var url = "http://localhost:8080/lanqiaoshop"
export default {
  name: "zhuce", 
  data() {
    // <!--验证手机号是否合法-->
    let checkTel = (rule, value, callback) => {
       var re = /^1[3|4|5|8][0-9]\d{8}$/
             if (value === "") { 
                 return callback(new Error("电话号码是必须的")); 
             } else if(!(re.test(value))){
                 return callback(new Error("不是完整的11位手机号，请以13，14，15，18开头"));
             }else{
                    callback(); 
               } 
    }
    //  <!--验证码是否为空-->
    let checkSmscode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机验证码'))
      } else {
        callback()
      }
    }
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback()
      }
    }
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {  
      ruleForm2: {
        userUserName:"",
        userPassword: "",
        checkPass: "",
        userTelphone: "",
        userAddress:"",
        userShopName:"",
        smscode: ""
      },
      rules2: {
        userPassword: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        userTelphone: [{ validator: checkTel, trigger: 'change' }],
        smscode: [{ validator: checkSmscode, trigger: 'change' }],
        userUserName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userAddress: [
          { required: true, message: "请输入地址", trigger: "blur" }
        ],
        userShopName: [
          { required: true, message: "请输入商店名称", trigger: "blur" }
        ]
      },
      flag: true
    }
  }, 
  methods: {
    // <!--发送验证码-->
    sendCode () {
      let tel = this.ruleForm2.tel
      if (this.checkMobile(tel)) {
        console.log(tel)
        let time = 60
        this.buttonText = '已发送'
        this.isDisabled = true
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + ' 秒'
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true;
            }
          }, 1000)
        }
      }
    },
    // <!--提交注册-->
    submitForm(ruleForm2) {
        this.$refs[ruleForm2].validate((valid) => {
          if (valid) { 
              let params = this.$qs.stringify(this.ruleForm2);
              //http://www.wxhwg.com:8080/mock/api/user/add
              this.$axios.post(url + "/api/user/add",params).then(response => {
                let result = response.data;
                if (result.status == '200') {
                  this.$alert("注册成功");
                  this.$router.push({
                    name: "Denlu"
                  });
                } else if (result.status == 404) {
                this.$alert("添加用户异常", "警告");
              }
          })
        .catch(error => {});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: "/uselogin"
      });
    },
  }
};
</script>

<style scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-wrapper img {
  position: absolute;
  z-index: 1;
}
.register-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
#register {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
.el-form-item {
  text-align: center;
}
.login {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
  text-align: left;
  text-indent: 8px;
  width: 160px;
}
.login:hover {
  color: #2c2fd6;
}
.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}
.el-button--primary:focus {
  background: #409EFF;
  border-color: #409EFF;
  color: #fff;
}
</style>
