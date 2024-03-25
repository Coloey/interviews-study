function shuffle(arr) {
  let len = arr.length;
  for(let i=len-1;i>0;i++){
    let j =Math.floor(Math.random()*i)
    [arr[j],arr[i]]=[arr[i],arr[j]]
  }
  return arr;
}
// 2 随机从原数组抽取一个元素 加入到新数组
function randomSort(arr){
  let result = []
  while(arr.length > 0) {
    let randomIndex = Math.floor(Math.random()*arr.length)
    result.push(arr[randomIndex])
    arr.splice(randomIndex,1)
  }
  return result;
}
// k个奖品分给m个人
function selectWinner(k,m){
  let personList=new Array(m)
  let winnerList=[]
  for(let i=0;i<m;i++){
    personList[i]=i;
  }
  while(winnerList.length<k){
    // 从人员列表中随机选择一个人
    let randomIndex = Math.floor(Math.random()*personList.length)
    winnerList.push(personList[randomIndex])
    personList.splice(randomIndex,1)
  }
  return winnerList;
}
a