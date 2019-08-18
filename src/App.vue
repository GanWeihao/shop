<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    mounted(){
      /**
       * 解决 css 引入图片在 github pages 无法获取的问题
       */
      const { NODE_ENV } = process.env;
      document.documentElement.className = NODE_ENV;
    },
  }
</script>

<style>
  *{
    font-family:"黑体"
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
