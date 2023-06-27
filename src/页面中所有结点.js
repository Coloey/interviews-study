function traverse(node) {
  let res = [];
  node = node || document.body;
  if (node.style) {
    let width = parseInt(node.style.width, 10) || 0;
    let height = parseInt(node.style.height, 10) || 0;
    if (width > 50 && height > 50) {
      res.push(node);
    }
  }
  let nodeChildren = node.childNodes() || [];
  for (let i = 0; i < nodeChildren.length; i++) {
    res.concat(traverse(nodeChildren[i]));
  }
  return res;
}
