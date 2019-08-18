<template>
  <div class="back">
    <div class="zhuti1">
    <div class="zhuti">
       <p class="title">登录</p>
       <el-row justify="center">
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>

          <el-form-item label="验证码" >
            <el-input v-model="ruleForm.yanzheng"></el-input>
            <span class="code-style" @click="createCode">{{verificationCode}}</span>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="confirmTheCode();denglu()">登录</el-button>
            <el-button @click="zhuce()">注册</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      </div>
      </div>
  </div>
  
</template>
<script>
  var url = "http://localhost:8080/lanqiaoshop"

export default {
  name: "denglu",
  data() {
    return {
      verificationCode:'' ,  //生成的验证码
      ruleForm: {
        username: "",
        password: "",
        yanzheng:''

      }
    };
  },

  methods: {
    denglu() {
      if (this.ruleForm.username == "" || this.ruleForm.password == "") {
        this.$alert("用户名或密码不能为空");
      }else if(this.ruleForm.yanzheng==""){
          
      } else {
        let params =this.$qs.stringify(this.ruleForm);
        //http://www.wxhwg.com:8080/mock/api/login
        this.$axios.post(url + "/api/login",params).then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.$store.dispatch("login",result.data.userId);
            this.$router.push({
              name:'home'
            })
          }else if(result.status == 404){
            this.$alert('用户名或密码错误','警告')
          }
        }).catch(error=>{

        });
      }
    },

     createCode:function () {    //通过随机数生成验证码
            this.verificationCode = '';
            var code = '';
            var codeLength = 4;     //验证码长度
            var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
            for(var i = 0;i<codeLength;i++){
                var index = Math.floor(Math.random()*36);
                code += random[index];
            }
            this.verificationCode = code
        },
        confirmTheCode:function () {      //验证函数
            var customerCode = this.ruleForm.yanzheng.toUpperCase();   //把你输入的小写转化为大写
            if(customerCode == 0){
                this.createCode();
                this.ruleForm.yanzheng = ''
                alert('请输入验证码')
            }else if(customerCode != this.verificationCode){
                this.createCode();
                this.ruleForm.yanzheng = ''
                alert('验证码不正确，请重新输入');
            }else {
                alert('输入正确')
            }
        },

    zhuce() {
       this.$router.push({ path:'/Zhuce'  }) 
    }
  },
    mounted(){
        this.createCode()
    }
};
</script>
<style>
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
.back{
  background-size: cover;
  background-image: url("");
 
}
.zhuti{
  height: 400px;
  width: 400px;
  background-color: white;
  margin: 180px 550px;
  text-align: center;
}


</style>
