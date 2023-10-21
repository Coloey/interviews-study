//查找对象指定路径
const data = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 3, children: [] }] },
    {
      id: 4,
      children: [
        { id: 5, children: [] },
        { id: 6, children: [] },
      ],
    },
    { id: 7, children: [] },
  ],
};

function findNode(obj, target) {
  const res = [];
  const dfs = (obj, currPath, target) => {
    if (obj.id === target) {
      currPath += obj.id;
      res.push(currPath);
      return;
    }
    currPath += obj.id;
    obj.children &&
      obj.children.forEach((child) => {
        dfs(child, currPath, target);
      });
  };
  dfs(obj, "", target);
  return res;
}
console.log(findNode(data, 6));
