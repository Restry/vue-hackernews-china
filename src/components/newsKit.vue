<template>
    <div class="news-kit">
        <div class="title-kit">
            <a href="#" class="selected">
                <span>{{title}}</span>
                <i></i>
            </a>
        </div>
        <div class="items-kit">
            <!-- <div class="news-item" :v-for="item in newsItems">
                <div class="title">{{item.title}}</div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
  name: "news-kit",
  props: ["title", "type"],

  data() {
      debugger
    // 缺少每个类型下新闻的接口
    return {
      //newsItems:this.$store.getters.activeItems
    }
  },


};
</script>
<style lang="stylus">
.title-kit {
    height: 48px;
    border: 1px solid rgb(229, 229, 229);
    border-top: 2px solid rgb(92, 92, 92);
    background-color: rgb(251, 251, 251);
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
</style>


