//使用document.body.clientHeight获取可视区域高度，使用element.getBoundingClientRect()直接得到元素相对浏览器的top值
/*window.innerHeight：表示当前浏览器窗口的视口（viewport）高度，即可见区域的高度，不包括浏览器工具栏和滚动条的高度。
 */
//document.documentElement.clientHeight：表示当前文档在浏览器窗口中可见区域的高度，也是可见区域的高度，不包括浏览器工具栏和滚动条的高度。
//document.documentElement.scrollHeight：表示整个文档的高度，包括超出可见区域的部分。
function lazyLoad() {
  let viewHeight = document.body.clientHeight;
  let imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    let {
      top,
      bottom
    } = img.getBoundingClientRect();
    if (top < viewHeight && bottom > 0) {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    }
  });
}

function throttle(fn, delay) {
  let pre = Date.now();
  return function () {
    let context = this;
    let args = arguments;
    let now = Date.now();
    if (now - pre >= delay) {
      fn.apply(context, args);
      pre = now;
    }
  };
}
//InterSectionObserver
//交叉监视器：异步检测目标元素与祖先元素或 viewport 相交情况的变化，创建一个intersectionObserver对象
//当监听到目标元素的可见部分超过一个或多个阈值，会执行指定回调函数
/*
IntersectionObserver 本身不会引起回流。IntersectionObserver 是一个用于异步观察元素与其祖先元素或视口交叉状态的 API。
它会在元素交叉状态发生改变时触发回调函数，但不会直接引起回流。
*/
const root = document.querySelector(".root");
const imgs = document.querySelectorAll("img");
let observer = new IntersectionObserver((entries) => {
  entries.forEach((image) => {
    let oImg = image.target;
    if (image.intersectionRatio > 0 && image.intersectionRatio) {
      oImg.setAttribute('src', oImg)
    }
  });
});
imgs.forEach((img) => {
  observer.observe(img);
});