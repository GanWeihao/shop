<template>
  <div class="hh">
    
  </div>
</template>
<script>
import Daohang from "@/components/Daohang.vue";
import Jiao from "@/components/Jiao.vue";
export default {
  components: {
    Daohang,
    Jiao
  },
  name: "shangping",
  data() {
    return {
      all: "",
      list1: [],
      currentPage1: 1,
      web_static: "http://www.wxhwg.com:8080/mock/static/",
      options: [
        {
          id: 1,
          name: "升序",
          vac: "asc"
        },
        {
          id: 2,
          name: "降序",
          vac: "desc"
        }
      ],
      value:" ee2a929f-2e49-458f-a389-d344586e2691",
      value1: null
    };
  },
  created() {},
  methods: {
   
  }
};
</script>
<style>
.hh {
  width: 1220px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 20px;
  background-color: #ffffff;
}
.hh1 {
  margin-left: 250px;
}
.hh2 {
  margin-left: 100px;
}
.hh3 {
  margin-left: 50px;
}
</style>
