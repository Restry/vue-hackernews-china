<template>
  <div class="wrap">
    <!-- 主频道导航 -->
    <!-- <div class="main-nav">
        <main-nav></main-nav>
    </div> -->
    <div class="main-contain">
      <div class="left">
        <news-kit v-for="item in cities" :key="item.value" :title="item.title" :pinyin="item.value"></news-kit>
      </div>
      <div class="right">
        <news-top></news-top>
      </div>
    </div>
  </div>
</template>
<script>
import mainNav from "../components/mainNav.vue";
import newsKit from "../components/newsKit.vue";
import newsTop from "../components/newsTop.vue";
//import routes from "../../routes"

export default {
  name: "index",
  components: {
    mainNav,
    newsKit,
    newsTop
  },
  props: {
    title: String,
    pinyin: String
  },
  data() {
    //debugger
    return {
      cities: [
        { title: "北京", value: "beijing" },
        { title: "上海", value: "shanghai" },
        { title: "广州", value: "guangzhou" },
        { title: "武汉", value: "wuhan" }
      ]
      //displayedItems: this.$store.getters.activeItems
    };
  },

  beforeMount() {
    // 根据location来判断如果 是www 的直接跳转到 /top页面
    if (!location.hostname.startsWith("www")) {
      this.$router.push("/top");
    }
  }
};
</script>
<<style lang="stylus">
.wrap
  background-color rgb(255,255,255)
.main-nav 
  height 49px
  background-color RGB(40,65,130)
.main-contain
  margin-top 5px
  display flex
.main-contain .left
  flex 1
  padding-right 9px
  border-right 1px solid rgb(230,230,230)
  display flex
  flex-wrap: wrap;
.main-contain .left .news-kit
  width 50%

.main-contain .right
  width 200px
  padding-left 9px
  
</style>

