<template>
<div class="news-top">
    <div class="title-top">
        <span>新闻Top榜</span> 
        <i></i>
    </div>
    <div class="items-top">
        <div class="item-top">
            top1
        </div>
        <div class="item-top">
            top2
        </div>
        <div class="item-top">
            top3
        </div>
    </div>
</div>
    
</template>
<script>
export default {
    
}
</script>
<style lang="stylus">
.news-top
    height 49px
    border-top 2px solid rgb(131,131,131)
.news-top .title-top
    font-weight bold
    line-height 49px
.news-top .title-top span 
    padding-left 10px
.news-top .title-top i 
    position relative
    display inline-block
    width 5px
    height 25px
    background-color rgb(45,88,159)
    left -82px
    top 5px
.items-top .item-top
    padding 5px 0

</style>
