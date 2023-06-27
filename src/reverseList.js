const reverseList = (node) => {
  const pre = null,
    curr = node;
  while (curr) {
    let temp = curr.next;
    curr.next = pre;
    pre = curr;
    curr = temp;
  }
  return pre;
};
