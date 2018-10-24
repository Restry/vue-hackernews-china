<template>
<div class="wrap">
    <!-- 主频道导航 -->
    <!-- <div class="main-nav">
        <main-nav></main-nav>
    </div> -->
    <div class="main-contain">
      <div class="left">
        <news-kit title="北京" pinyin="beijing"></news-kit>
        <news-kit title="上海" pinyin="shanghai"></news-kit>
        <!-- <news-kit title="广州" pinyin="guangzhou"></news-kit> -->
        <!-- <news-kit title="新闻标题1" type="新闻类型"></news-kit>
        <news-kit title="新闻标题2" type="新闻类型"></news-kit> -->
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
      //displayedItems: this.$store.getters.activeItems
    };
  },
  
  beforeMount() {}
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
  
.main-contain .right
  width 200px
  padding-left 9px
  
</style>

