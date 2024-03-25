//查找对象指定路径
// const data = {
//   id: 1,
//   children: [{
//       id: 2,
//       children: [{
//         id: 3,
//         children: []
//       }]
//     },
//     {
//       id: 4,
//       children: [{
//           id: 5,
//           children: []
//         },
//         {
//           id: 6,
//           children: []
//         },
//       ],
//     },
//     {
//       id: 7,
//       children: []
//     },
//   ],
// };

// function findNode(obj, target) {
//   const res = [];
//   const dfs = (obj, currPath, target) => {
//     if (obj.id === target) {
//       currPath += obj.id;
//       res.push(currPath);
//       return;
//     }
//     currPath += obj.id;
//     obj.children &&
//       obj.children.forEach((child) => {
//         dfs(child, currPath, target);
//       });
//   };
//   dfs(obj, "", target);
//   return res;
// }
// console.log(findNode(data, 6));
var tree = {
  name: '中国',
  children: [{
      name: '北京',
      children: [{
          name: '朝阳群众'
        },
        {
          name: '海淀区'
        },
        {
          name: '昌平区'
        }
      ]
    },
    {
      name: '浙江省',
      children: [{
          name: '杭州市',
          code: '0571',
        },
        {
          name: '嘉兴市'
        },
        {
          name: '绍兴市'
        },
        {
          name: '宁波市'
        }
      ]
    }
  ]
};

function findNode2(tree, name) {
  let obj = {}
  const dfs = (tree) => {
    for (let key in tree) {
      if (tree.name === name) {
        obj[key] = name
      } else {
        tree.children && tree.children.forEach((item) => {
          dfs(item, name)
        })
      }
    }
  }
  dfs(tree)
  return obj
}
console.log(findNode2(tree, '宁波市')) //{name:'宁波市'}