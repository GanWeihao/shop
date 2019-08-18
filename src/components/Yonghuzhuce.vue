<template>
  <div class="haha">
    <div class="img">
      <img style="height:75px;
    width: 80px;" src="../img/log.jpg" alt>
      <h1>小吃街用户注册</h1>
    </div>

    <div class="haha11">
        
      <input class="aa" type="text" name id placeholder="请输入用户名"  v-model="ruleForm2.userUserName">
    </div>
    <div class="haha11">
      
      <input class="aa" type="text" name id placeholder="请输入手机号" v-model="ruleForm2.userTelphone">
    </div>
    <div class="haha11">
       
      <input class="aa" type="text" name id placeholder="请输入密码" v-model="ruleForm2.userPassword">
    </div>
    <div class="haha11">
        
      <input class="aa" type="text" name id placeholder="请输入地址" v-model="ruleForm2.userAddress">
    </div>
    <div class="haha11">
        
      <input class="aa" type="text" name id placeholder="请输入商店名称" v-model="ruleForm2.userShopName">
    </div>
      <div class="haha11">
      <button @click="submitForm('ruleForm2')">立即注册</button>
    
    </div>
    <div class="haha11">
     <a @click="gotoLogin">已有密码？立即登入</a>
    
    </div>
    
  </div>
</template>
<script>
export default {
 
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
       
              let params = this.$qs.stringify(this.ruleForm2);
              this.$axios.post("http://www.wxhwg.com:8080/mock/api/user/add",params).then(response => {
                let result = response.data;
                if (result.status == '200') {
                  this.$alert("注册成功");
                  this.$router.push({
                    name: "uselogin"
                  });
                } else if (result.status == 404) {
                this.$alert("添加用户异常", "警告");
              }
          })
        .catch(error => {});
          } ,
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: "/uselogin"
      });
    },
  }
};

</script>

<style>
.haha {
  height: 500px;
  width: 800px;
  background-color: white;
  margin: 60px auto;
  display: flex;
  flex-wrap: wrap;
}
.img {
  height: 150px;
  width: 800px;
  background-color: white;
}
.img img {
  margin-top: 5px;
}

.haha11 {
  width: 450px;
  height: 50px;
  background-color: white;
  margin: 10px auto;
  display: flex;
}
.haha11 .aa{
    margin-top: 5px;
    margin-left: 30px;
    height: 42px;
    width:400px;
    border: 1px solid rgb(207, 207, 207);
    background-color: white;
    font-size: 18px;

}
.haha11 button{
 
width: 360px ;            
height:60px ;            
font-size:18px;           
color:rgb(248, 248, 248);             

margin-left:52px;                                       
background-color:rgb(245, 116, 10); 
outline:0;
border-radius: 13px;                                           
cursor:pointer; 
}
.haha11 a{
    font-size:15px;
    margin-left:280px; 
    color: black;
}
input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #bdbcbc;
    /* placeholder字体大小  */
    font-size: 15px;
    /* placeholder位置  */
    text-align: center;
}

</style>
