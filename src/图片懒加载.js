//使用document.body.clientHeight获取可视区域高度，使用element.getBoundingClientRect()直接得到元素相对浏览器的top值
function lazyLoad() {
  let viewHeight = document.body.clientHeight;
  let imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    let { top, bottom } = img.getBoundingClientRect();
    if (top < viewHeight && bottom > 0) {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    }
  });
}
function throttle(fn, delay) {
  let pre = new Date.now();
  return function () {
    let context = this;
    let args = arguments;
    let now = new Date.now();
    if (now - pre >= delay) {
      fn.apply(context, args);
      pre = now;
    }
  };
}
//InterSectionObserver
//交叉监视器：异步检测目标元素与祖先元素或 viewport 相交情况的变化，创建一个intersectionObserver对象
//当监听到目标元素的可见部分超过一个或多个阈值，会执行指定回调函数
const root = document.querySelector(".root");
const imgs = document.querySelectorAll("img");
const config = {
  root: root,
  rootMargin: "0px 0px 800px 0px", // 监视区向下拓展800px
};
let observer = new IntersectionObserver((entries, self) => {
  entries.forEach((image) => {
    if (image.isIntersecting) {
      let img = image.target;
      let realSrc = img.dataset.src;
      if (realSrc) {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      }
      self.unobserve(image.target);
    }
  });
}, config);
imgs.forEach((img) => {
  observer.observe(img);
});
