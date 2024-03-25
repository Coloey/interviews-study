// //计算二进制数中1的个数
// const countBinary = (num) => {
//   let res = 0;
//   while (num > 0) {
//     if (num & 1) {
//       res++;
//     }
//     num = num >> 1;
//   }
//   return res;
// };
// var findLongestSubstring = function(s) {
//   var cnt={};
//      var res=0;
//      var j=0;
//  for(let i=0;i<s.length;i++)
//      {
//          if(s[i] in cnt) cnt[s[i]]++;//存在重复 值加1
//          else cnt[s[i]]=1;
//          while (cnt[s[i]]>=2)
//              {
//                  cnt[s[j]]--;//相当于删除窗口之外的元素
//                  j++; //右移
//                  //cnt[s[j++]]--;
//              }
//          res=Math.max(res,i-j+1);
//      }
//      return res;
//  };
// console.log(findLongestSubstring("abcabcbb")); // 输出 3，最长不重复子串为 "abc"
// console.log(findLongestSubstring("bbbbb")); // 输出 1，最长不重复子串为 "b"
// console.log(findLongestSubstring("pwwkew")); // 输出 3，最长不重复子串为 "wke"
// // 合并有序数组
// function mergeArray(num1,num2){
//   let m=num1.length,n=num2.length;
//   let i=m-1,j=n-1,k=m+n-1;
//   while(i>=0&&j>=0){
//     if(i<0)num1[k--]=num2[j--]
//     else if(j<0)num1[k--]=num1[i--]
//     else if(num1[i]>num2[j])num1[k--]=num1[i--]
//     else num1[k--]=num2[j--]
//   }
//   return num1
// }
function sort(arr){
  // let i=0,j=arr.length-1;
  // while(i<j){
  //   if(arr[i]==='b'&& arr[j]==='a'){
  //     [arr[i],arr[j]]=[arr[j],arr[i]]
  //   }
  //   i++;
  //   j--;
  // }
  //arr.sort((a,b)=>(a.charCodeAt()-'a'.charCodeAt())-(b.charCodeAt()-'a'.charCodeAt()))
  return arr;
}
console.log(sort(['a','b','b','a','b']))