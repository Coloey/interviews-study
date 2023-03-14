function Pagination(container, total, current) {
  // container: Node
  // total: num
  // current: num
  this.total = total;
  this.current = current;
  this.html = html;
  this.val = val;
  this.el = document.getElementsByClassName("pagination")[0]; //TODO: 创建分页组件根节点, 即页面中的ul标签,el是定死的
  if (!this.el) return; // 分页内容为空，直接返回
  // this.val();
  this.el.innerHTML = this.html();
  container.appendChild(this.el);
  // this.el.className = ''; //TODO: 判断是否需要隐藏当前元素
  if (this.total < 1) {
    this.el.className = "pagination hide";
  }

  // 生成ul的innerHTML
  function html() {
    //TODO: 生成组件的内部html字符串
    if (this.total <= 1) {
      return "";
    } else if (this.total <= 5) {
      var htmlText = "";
      // 生成li
      for (var i = 0; i < this.total; i++) {
        if (this.current - 1 === i) {
          htmlText += `<li class = "current">${i + 1}</li>`;
        } else {
          htmlText += `<li>${i + 1}</li>`;
        }
      }
      // 高亮显示current页
      return htmlText;
    } else {
      // total > 5
      var htmlText = "";
      if (this.current <= 3) {
        // 前面不够，向后补齐,不要首页
        for (var i = 0; i < 5; i++) {
          if (this.current - 1 === i) {
            htmlText += `<li class = "current">${i + 1}</li>`; // current项
          } else {
            htmlText += `<li>${i + 1}</li>`;
          }
        }
        htmlText += "<li>末页</li>";
      } else if (this.total - this.current <= 2) {
        // 右边不够，向左补齐，不要末页
        htmlText += "<li>首页</li>";
        for (
          var i = this.current - (5 - (this.total - this.current + 1)) - 1;
          i < this.total;
          i++
        ) {
          if (this.current - 1 === i) {
            htmlText += `<li class = "current">${i + 1}</li>`; // current项
          } else {
            htmlText += `<li>${i + 1}</li>`;
          }
        }
      } else {
        // 两边均足够
        htmlText += "<li>首页</li>";
        for (var i = this.current - 2 - 1; i < this.current + 2; i++) {
          if (this.current - 1 === i) {
            htmlText += `<li class = "current">${i + 1}</li>`; // current项
          } else {
            htmlText += `<li>${i + 1}</li>`;
          }
        }
        htmlText += "<li>末页</li>";
      }
      return htmlText;
    }
  }

  function val(current) {
    if (arguments.length === 0) return this.current;
    if (current < 1 || current > this.total || current === this.current) return;
    this.current = current;
    this.el.innerHTML = this.html();
  }
}