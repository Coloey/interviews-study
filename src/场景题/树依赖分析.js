var tree1 = {
  name: "main.js",
  require: [
    {
      name: "A.js",
    },
    {
      name: "B.js",
    },
  ],
};
// ['A.js', 'B.js', 'main.js']

var tree2 = {
  name: "page.js",
  require: [
    {
      name: "A.js",
      require: [
        {
          name: "B.js",
          require: [
            {
              name: "C.js",
            },
          ],
        },
      ],
    },
    {
      name: "D.js",
      require: [
        {
          name: "C.js",
        },
        {
          name: "E.js",
        },
      ],
    },
  ],
};
// ['C.js', 'E.js', 'D.js', 'B.js', 'A.js', 'page.js']
const resolve = (tree) => {
  const res = [];
  const dfs = (tree) => {
    if (tree.require) {
      const arr = tree.require;
      for (let leave of arr) {
        dfs(leave);
      }
    }
    if (!res.includes(tree.name)) res.push(tree.name);
  };
  dfs(tree);
  return res;
};
console.log(resolve(tree2));
console.log(resolve(tree1));
