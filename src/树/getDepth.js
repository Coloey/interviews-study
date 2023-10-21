const tree = {
  name: "root",
  children: [
    { name: "叶子1-1" },
    { name: "叶子1-2" },
    {
      name: "叶子2-1",
      children: [
        {
          name: "叶子3-1",
          children: [
            {
              name: "叶子4-1",
            },
          ],
        },
      ],
    },
  ],
};
function getDepth(tree) {
  if (tree === null) return 0;
  const queue = [tree];
  let dep = 0;
  while (queue.length) {
    dep++;
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      if (node.children) {
        for (let child of node.children) {
          queue.push(child);
        }
      }
    }
  }
  return dep;
}
