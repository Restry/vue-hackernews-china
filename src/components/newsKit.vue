<template>
  <div class="news-kit">
    <div class="title-kit">
      <a href="#" class="selected">
        <span>{{title}}</span>
        <i></i>
      </a>
    </div>
    <div class="items-kit">
      <div v-if="hasData===true">
        <div class="news-item" v-for="item in newsItems" :key="item._id">
          <div class="title">
            <a target="_blank" :href="getHostName()+'/item/'+item._id" v-bind:title="item.title">
              {{item.title}}
            </a>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="news-item">
          <div class="title">
            数据加载中...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "news-kit",
  props: ["title", "pinyin"],

  data() {
    // 缺少每个类型下新闻的接口
    return {
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
      return location.origin.replace("www", this.pinyin);
    }
  },
  beforeMount() {
    this.$store
      .dispatch("getCityData", {
        city: this.pinyin
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
.title-kit {
  height: 48px;
  border: 1px solid rgb(229, 229, 229);
  border-top: 2px solid rgb(92, 92, 92);
  background-color: rgb(238, 111, 45);
}

.title-kit a {
  display: inline-block;
  line-height: 48px;
  padding: 0 15px;
}

.title-kit a.selected {
  position: relative;
  top: -3px;
  left: -1px;
  border-top: 4px solid rgb(67, 144, 216);
  border-left: 1px solid rgb(216, 216, 216);
  border-right: 1px solid rgb(216, 216, 216);
  background-color: rgb(255, 255, 255);
}

.title-kit span {
  font-weight: bold;
}

.news-item {
  padding: 5px 0 5px 5px;
}

.items-kit .news-item:first-child {
  border-top: none;
}

.items-kit .news-item .title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>


