"use strict";

function shuffle(arr) {
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    // [i,len-1]
    var j = Math.floor(Math.random() * (len - i))[(this.nums[i], this.nums[j])] = [this.nums[j], this.nums[i]];
  }

  return arr;
} // k个奖品分给m个人


function selectWinner(k, m) {
  var personList = new Array(m);
  var winnerList = [];

  for (var i = 0; i < m; i++) {
    personList[i] = i;
  }

  while (winnerList.length < k) {
    // 从人员列表中随机选择一个人
    var randomIndex = Math.floor(Math.random() * personList.length);
    winnerList.push(personList[randomIndex]);
    personList.splice(randomIndex, 1);
  }

  return winnerList;
}