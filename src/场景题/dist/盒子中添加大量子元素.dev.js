"use strict";

//在一个盒子中添加大量相同子元素，用以下优化策略提高性能

/*
DocumentFragment 是一个轻量级的文档片段，它可以作为临时的容器来存储 DOM 元素，而无需将它们直接添加到文档树中。它主要用于以下几个方面：

1. 提高性能：当需要频繁地向 DOM 树中添加大量元素时，直接操作文档树会引起多次的重排和重绘，从而影响性能。使用 DocumentFragment 可以先将要添加的元素放入其中，然后一次性地添加到文档树中，减少了 DOM 操作的次数，提高了性能。

2. 减少页面重绘和回流：当将多个元素添加到文档树中时，浏览器会根据元素的位置和样式，进行页面布局和绘制。使用 DocumentFragment 可以先将元素添加到 DocumentFragment 中，然后将 DocumentFragment 一次性添加到文档树中，从而减少了多次的页面重绘和回流，提升了性能。

3. 克隆和复制元素：DocumentFragment 提供了 cloneNode 方法，可以将其中的 DOM 元素进行复制和克隆，而无需复制整个文档树。这在需要复制大量相似元素时，可以提高效率。

4. 执行操作后不影响文档结构：使用 DocumentFragment 可以在其中进行一系列的 DOM 操作，而不会对文档树产生任何影响。只有在将 DocumentFragment 添加到文档树中时，其中的 DOM 元素才会真正地被渲染和显示。

总而言之，DocumentFragment 提供了一种轻量级的容器，可以临时存储 DOM 元素，提高性能，减少页面重绘和回流，并提供了方便的克隆和复制操作，同时不会直接影响文档结构。
*/
//使用DocumentFrament：将子元素先添加到一个DocumentFrament中，再将DocumentFrament添加到父元素，减少dom操作次数
var parentElement = document.getElementById('parent');
var fragment = document.createDocumentFragment();

for (var i = 0; i < 1000; i++) {
  var childElement = document.createElement('div');
  childElement.textContent = 'Child' + i;
  fragment.appendChild(childElement);
}

parentElement.appendChild(fragment); //使用 CSS3 transform：将子元素设置为绝对定位，并使用 CSS3 transform 属性进行变换。这样可以将所有子元素合成为一层，
//减少重绘和重排的次数，提高性能

/*.parent{
    position:relative;
}
.child{
    position: absolute;
    transform:translateZ(0)
}*/
//分批添加子元素，将大量子元素的添加操作分成多个小批次进行，通过setTimeout或requestAnimationFrame控制添加速度，避免过多DOM操作导致页面卡顿

var parent = document.getElementById('parent');
var totalCount = 1000;
var batchSize = 10;
var currIndex = 0;

function addBatch() {
  var fragment = document.createDocumentFragment();

  for (var _i = 0; _i < batchSize && currIndex < totalCount; _i++) {
    var _childElement = document.createElement('div');

    _childElement.textContent = 'Child' + currIndex;
    fragment.appendChild(_childElement);
    currIndex++;
  }

  parent.appendChild(fragment);

  if (currIndex < totalCount) {
    setTimeout(addBatch, 0); //requestAnimationFrame(addBatch)
  }
}

addBatch();