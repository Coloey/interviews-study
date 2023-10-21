//判断能不能拖动
let canDragged = false;
let initPosition = [];
var demo = document.querySelector(".demo");
demo.addEventListener("mousedown", function (e) {
  canDragged = true;
  initPosition = [e.clientX, e.clientY];
});
demo.addEventListener("mousemove", function (e) {
  //停掉
  if (!canDragged) {
    return;
  }
  let x = e.clientX,
    y = e.clientY;
  // console.log(x, y);
  //移动的位置
  let tranX = x - initPosition[0],
    tranY = y - initPosition[1];
  //原先的位置
  let initLeft = demo.style.left == 0 ? 0 : demo.style.left;
  let initRight = demo.style.top == 0 ? 0 : demo.style.top;
  console.log(initLeft, initRight);
  // 无论物品放在哪 移动的距离都是鼠标移动的距离，所以加上初始位置
  demo.style.left = tranX + parseInt(initLeft) + "px";
  demo.style.top = tranY + parseInt(initRight) + "px";
  // console.log(demo.style.left, demo.style.right);
  //初始位置不停在变
  initPosition = [x, y];
});
demo.addEventListener("mouseup", function (e) {
  canDragged = false;
});
