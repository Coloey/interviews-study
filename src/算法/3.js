// (function (words) {
//   let set = [];
//   let path = [];
//   //words.sort((a,b)=>a-b)
//   let n = words.join("").length;
//   console.log(words.join(""), "words");
//   let used = new Array(words.length).fill(false);
//   const dfs = () => {
//     if (path.length === words.length) {
//       console.log(path);
//       set.push(path.slice().join(""));
//       return;
//     }
//     for (let i = 0; i < words.length; i++) {
//       if (!used[i]) {
//         used[i] = true;
//         path.push(words[i]);
//         dfs();
//         path.pop();
//         used[i] = false;
//       }
//     }
//   };
//   dfs();
//   let res = [];
//   let i = 0,
//     j = n;
//   s = "foobarbarfoo";
//   while (j <= s.length) {
//     console.log(s.slice(i, j));
//     if (set.includes(s.slice(i, j))) {
//       res.push(i);
//     }
//     i++;
//     j++;
//   }
//   console.log(res);
//   return res;
// })(["foo", "bar"]);
let x=10
let obj = {
  x:20,
  f: function () {
    console.log(this.x)
  },
  s:function(){
    console.log(this.x)
    function fn(){
      console.log(this.x)
    }
    return fn;
  }
}
obj.s()()