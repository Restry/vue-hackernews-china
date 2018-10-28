<template>
<div class="news-top">
    <div class="title-top">
        <span>新闻Top榜</span> 
        <i></i>
    </div>
    <div class="items-top" v-if="hasData===true">
        <div class="item-top" v-for="item in newsItems" :key="item._id">
        <div class="title">
          <a target="_blabk" :href="getHostName()+'/item/'+item._id" v-bind:title="item.title">
            {{item.title}}
          </a>
        </div>
      </div>
    </div>
    <div class="items-top" v-else>
         <div class="title">
            数据加载中...
          </div>
    </div>
</div>
    
</template>
<script>
export default {
  name: "news-top",

  data() {
    // 缺少每个类型下新闻的接口
    return {
      top: "beijing",
      hasData: false,
      newsItems: [] //this.$store.getters.activeItems
    };
  },
  created() {
    // this.$store
    //   .dispatch("getCityData", {
    //     city: "shanghai"
    //   })
    //   .then(() => {
    //     this.newsItems = this.$store.getters.activeItems;
    //   });
  },
  methods: {
    getHostName(item) {
      return location.origin.replace("www", this.top);
    }
  },
  beforeMount() {
    this.$store
      .dispatch("getCityData", {
        city: this.top
      })
      .then(() => {
        this.newsItems = this.$store.state.cityData;
        if (this.newsItems.length > 0) {
          this.hasData = true;
        }
        // TODO 后台返回为空时会自动抓数据 , 到这个组件中提示 "数据正在获取中" .  下一次刷新数据可能就过来了
      });
  }
};
</script>
<style lang="stylus">
.news-top {
    height: 49px;
    border-top: 2px solid rgb(131, 131, 131);
}

.news-top .title-top {
    font-weight: bold;
    line-height: 49px;
}

.news-top .title-top span {
    padding-left: 10px;
}

.news-top .title-top i {
    position: relative;
    display: inline-block;
    width: 5px;
    height: 25px;
    background-color: rgb(45, 88, 159);
    left: -82px;
    top: 5px;
}

.items-top .item-top {
    padding: 5px 0;
}

.items-top .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
