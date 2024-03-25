<template>
  <div class="slider">
    <transition-group name="slide" mode="out-in">
      <div v-for="(item, index) in images" :key="index" v-show="currentIndex === index" class="slide-item">
        <img :src="item" alt="Slide Image">
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg'
      ],
      currentIndex: 0
    };
  },
  created() {
    this.startSlideShow();
  },
  methods: {
    startSlideShow() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 3000);
    }
  }
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-item {
  position: absolute;
  top: 0;
  left: 0;
}
</style>


在上述示例中，我们使用了一个包含图片链接的数组 `images` 来定义轮播图的内容。`currentIndex` 变量用来追踪当前显示的轮播图编号。

通过 `transition-group` 组件和 `v-for` 指令，我们将每张轮播图包裹在 `slide-item` 类名的 `<div>` 元素中。`v-show` 指令用于根据 `currentIndex` 控制当前轮播图的显示。

在 `created` 钩子函数中，我们通过设置定时器来不断更新 `currentIndex`，实现轮播图的自动滚动效果。

最后，我们使用 CSS 来定义过渡效果和轮播图的样式。`slide` 是过渡效果的名称，`slide-item` 类名用于定位轮播图的位置。

要实现无缝滚动效果，可以在 `images` 数组的末尾添加一张与第一张相同的图片，这样在滚动到最后一张时，立即切换到第一张，实现无缝滚动的效果。

希望上述示例能帮助你实现 Vue.js 轮播图，并实现无缝滚动效果。