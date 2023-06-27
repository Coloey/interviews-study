// 前序遍历:中左右
const preorderTraversal = (root) => {
  let st = [];
  let res = [];
  if (!root) return res;
  st.push(root);
  while (st.length > 0) {
    let node = st.pop();
    res.push(node.val);
    if (node.right) st.push(node.right);
    if (node.left) st.push(node.left);
  }
  return res;
};
// 中序遍历：左中右
const inorderTraversal = (root) => {
  let st = [];
  let res = [];
  if (!root) return res;
  // curr指向要处理的节点
  let curr = root;
  while (curr !== null || st.length > 0) {
    // 指针访问结点到最底层
    if (curr !== null) {
      st.push(curr); // 将访问的结点进栈
      curr = curr.left;
    } else {
      curr = st.pop(); // 栈里弹出最左节点
      res.push(curr.val); // 左节点进栈
      curr = curr.right; // 继续访问curr的右结点
    }
  }
  return res;
};
// 后序遍历：左右中：前序遍历的中左右=>中右左=>反转即左右中
const postorderTraversal = (root) => {
  let res = [];
  if (!root) return res;
  let st = [];
  while (st.length > 0) {
    let node = st.pop();
    res.push(node.val);
    if (node.left) res.push(node.left);
    if (node.right) res.push(node.right);
  }
  return res.reverse();
};
// 层序遍历
const cengxvTraversal = (root) => {
  let que = [];
  let res = [];
  if (root === null) return res;
  que.push(root);
  while (que.length) {
    let len = que.length;
    // 存放每一层的结点
    let currLevel = [];
    for (let i = 0; i < len; i++) {
      let node = que.pop();
      currLevel.push(node.val);
      if (node.left) que.push(node.left);
      if (node.right) que.push(node.right);
    }
    res.push(currLevel);
  }
  return res;
};
// 反转二叉树
const reverseTree = (root) => {
  if (root === null) return;
  [root.left, root.right] = [root.right, root.left];
  reverseTree(root.left);
  reverseTree(root.right);
};
// 对称二叉树
const isSymmertric = (root) => {
  if (root === null) return true;
  const compare = (left, right) => {
    // 排除空节点
    if (!left && right) return false;
    else if (left && !right) return false;
    else if (!left && !right) return true;
    else if (left.val !== right.val) return false;
    //left right 不为空
    const leftSide = compare(left.left, right.right);
    const rightSide = compare(left.right, right.left);
    return leftSide && rightSide;
  };
  return compare(root.left, root.right);
};

// 相同的树:类似于对称二叉树
const isSameTree = (left, right) => {
  if ((!left && right) || (left && !right)) return false;
  else if (!left && !right) return true;
  else if (left.val !== right.val) return false;
  return (
    isSameTree(left.left, right.left) && isSameTree(left.right, right.right)
  );
};

// 二叉树最大深度
const getDepth = (root) => {
  if (!root) return 0;
  let leftDepth = getDepth(root.left);
  let rightDepth = getDepth(root.right);
  return Math.max(leftDepth, rightDepth) + 1;
};
// 平衡二叉树:二叉树左右两个子树的高度差绝对值不超过1:
// 和求高度差不多 不过只要判断出高度差大于1就会返回-1并接收-1 逐个返回-1
const getHeight = (root) => {
  if (!root) return 0;
  let left = getHeight(root.left);
  if (left === -1) return -1;
  let right = getHeight(root.right);
  if (right === -1) return -1;
  return Math.abs(left - right) > 1 ? Math.max(left, right) + 1 : -1;
};
// 二叉树所有路径
const traversal = (root) => {
  let res = [];
  let path = [];
  if (root) path.push(root.val);
  const find = (curr) => {
    // 到叶子结点
    if (curr.left === null && curr.right === null) {
      res.push(path.slice().join("->"));
      return;
    }
    if (curr.left) {
      path.push(curr.left.val);
      find(curr.left);
      path.pop();
    }
    if (curr.right) {
      path.push(curr.right.val);
      find(curr.right);
      path.pop();
    }
  };
  find(root);
};
// 左叶子之和
const findLetLeave = (root) => {
  let sum = 0;
  const findLeave = (node) => {
    if (!node) return 0;
    if (
      node.left !== null &&
      node.left.left === null &&
      node.left.right === null
    ) {
      sum += node.left.val;
    }
    findLeave(node.left);
    findLeave(node.right);
  };
  findLeave(root);
  return sum;
};
// 找树左下角的值:层序遍历
const findLeftLeave = (root) => {
  let que = [];
  que.push(root);
  let res = 0;
  while (que.length) {
    let len = que.length;
    for (let i = 0; i < len; i++) {
      let node = que.pop();
      if (i === 0) res = node.val;
      if (node.left) que.push(node.left);
      if (node.right) que.push(node.right);
    }
  }
  return res;
};
// 路径总和
const targetSum = (root, target) => {
  if (!root) return false;
  const dfs = (curr, count) => {
    let left = false,
      right = false;
    // 递归结束条件：到达叶子结点且和减为0，则找到，返回true
    // 否则返回false
    if (!curr.left && !curr.right && count === 0) return true;
    else if (!curr.left && !curr.right && count > 0) return false;
    if (curr.left) left = dfs(curr.left, count - curr.left.val);
    if (curr.right) right = dfs(curr.right, count - curr.right.val);
    return left || right;
  };
  return dfs(root, targetSum - root.val);
};
// 中序和后序遍历序列构造二叉树
const makeTree = (inorder, postorder) => {
  if (postorder.length === 0) return null;
  // 后序数组最后一个元素就是当前根结点，需要pop，因为最后递归的时候可以直接不用排除根结点
  let node = postorder.pop();
  // 找到根结点在中序遍历中的位置
  let index = inorder.indexOf(node);
  let root = new TreeNode(node.val);
  root.left = makeTree(inorder.slice(0, index), postorder.slice(0, index));
  root.right = makeTree(inorder.slice(index + 1), postorder.slice(index));
  return root;
};
/* 最大二叉树
给定一个不含重复元素的整数数组。一个以此数组构建的最大二叉树定义如下：
二叉树的根是数组中的最大元素。
左子树是通过数组中最大值左边部分构造出的最大二叉树。
右子树是通过数组中最大值右边部分构造出的最大二叉树。
*/
const makeBigTree = (nums) => {
  // 递归构建到空数组则返回null
  if (nums.length === 0) {
    return null;
  }
  let max = nums[0];
  let maxIndex = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
      maxIndex = i;
    }
  }
  let root = new TreeNode(max);
  root.left = makeBigTree(nums.slice(0, maxIndex));
  root.right = makeBigTree(nums.slice(maxIndex + 1));
  return root;
};
// 合并二叉树
const mergeTrees = (t1, t2) => {
  if (!t1 && !t2) {
    return null;
  }
  let val;
  if (t1 && !t2) {
    val = t1.val;
  } else if (!t1 && t2) {
    val = t2.val;
  } else {
    val = t1.val + t2.val;
  }
  let root = new TreeNode(val);
  root.left = mergeTrees(t1 ? t1.left : null, t2 ? t2.left : null);
  root.right = mergeTrees(t1 ? t1.right : null, t2 ? t2.right : null);
  return root;
};
// 二叉搜索树的搜索
const searchBST = (root, val) => {
  while (root) {
    if (val > root.val) {
      root = root.right;
    } else if (val < root.val) {
      root = root.left;
    } else {
      return root;
    }
  }
  return null;
};
// 验证二叉搜索树
const isValidBST = (root) => {
  let pre = Number.MIN_VALUE,
    curr;
  const dfs = (root) => {
    if (!root) return true;
    let left = dfs(root.left);
    curr = root.val;
    if (pre !== Number.MIN_VALUE && curr <= pre) {
      return false;
    }
    pre = curr;
    let right = dfs(root.right);
    return left && right;
  };
  return dfs(root);
};
// 二叉树的最近公共祖先
const lowestCommonAncestor = (root, p, q) => {
  if (root === p || root === q || root === null) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) {
    return root; //左右都有 此时根结点就是父结点
  } else if (left && !right) {
    return left;
  } else {
    return right;
  }
};
