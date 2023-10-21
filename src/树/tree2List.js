const data = [
  {
    id: 1,
    text: "节点1",
    parentId: 0,
    children: [
      {
        id: 2,
        text: "节点1_1",
        parentId: 1,
      },
      {
        id: 3,
        children: [
          {
            id: 4,
            text: "节点1_2_1",
            parentId: 1,
          },
        ],
        text: "节点1_2",
        parentId: 1,
      },
    ],
  },
];
function treeToList(data) {
  let res = [];
  const dfs = (tree) => {
    tree.forEach((item) => {
      if (item.children) {
        dfs(item.children);
        delete item.children; //children已经被上一层push进去了，递归返回上一层的时候需要删除children,才能得到扁平化的list
      }
      res.push(item);
    });
  };
  dfs(data);
  return res;
}
// console.log(treeToList(data));
const data1 = [
  {
    name: "arrayObject",
    type: "array",
    children: [
      {
        name: "item",
        type: "object",
        children: [
          {
            name: "params1",
            type: "array",
            children: [
              {
                name: "item",
                type: "string",
                value: "4",
              },
              {
                name: "item",
                type: "string",
                value: "5",
              },
            ],
          },
          {
            name: "params2",
            type: "string",
            value: "2",
          },
        ],
      },
    ],
  },
];
//结果
// {
//   arrayObject: [
//     {
//       params1: ["4", "5"],
//       params2: "2",
//     },
//   ],
// };

const convert = ({ type, children, value }) => {
  switch (type) {
    case "string":
      return value;
    case "number":
      return Number(value);
    case "array":
      return children.map((item) => dfs(item));
    case "object":
      return children.reduce((res, item) => {
        res[item.name] = dfs(item);
        return res;
      }, {});
    default:
      return null;
  }
};
console.log(convert(data1));
