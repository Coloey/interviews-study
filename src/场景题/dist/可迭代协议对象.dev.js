"use strict";

function iteratorGenerator(list) {
  var idx = 0;
  var len = list.length;
  return {
    next: function next() {
      // 索引没超过集合长度 done为false
      var done = idx >= len; // done 为false继续取值

      var value = !done ? list[idx++] : undefined;
      return {
        done: done,
        value: value
      };
    }
  };
}

var iterator = iteratorGenerator(['1', '2', '3']);
iterator.next();
iterator.next();
iterator.next();