"use strict";

// 前序遍历:中左右
var preorderTraversal = function preorderTraversal(root) {
  var st = [];
  var res = [];
  if (!root) return res;
  st.push(root);

  while (st.length > 0) {
    var node = st.pop();
    res.push(node.val);
    if (node.right) st.push(node.right);
    if (node.left) st.push(node.left);
  }

  return res;
}; // 中序遍历：左中右


var inorderTraversal = function inorderTraversal(root) {
  var st = [];
  var res = [];
  if (!root) return res; // curr指向要处理的节点

  var curr = root;

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
}; // 后序遍历：左右中：前序遍历的中左右=>中右左=>反转即左右中


var postorderTraversal = function postorderTraversal(root) {
  var res = [];
  if (!root) return res;
  var st = [];
  st.push(root);

  while (st.length > 0) {
    var node = st.pop();
    res.push(node.val);
    if (node.left) res.push(node.left);
    if (node.right) res.push(node.right);
  }

  return res.reverse();
}; // 层序遍历


var cengxvTraversal = function cengxvTraversal(root) {
  var que = [];
  var res = [];
  if (root === null) return res;
  que.push(root);

  while (que.length) {
    var len = que.length; // 存放每一层的结点

    var currLevel = [];

    for (var i = 0; i < len; i++) {
      var node = que.pop();
      currLevel.push(node.val);
      if (node.left) que.push(node.left);
      if (node.right) que.push(node.right);
    }

    res.push(currLevel);
  }

  return res;
}; // 反转二叉树


var reverseTree = function reverseTree(root) {
  if (root === null) return;
  var _ref = [root.right, root.left];
  root.left = _ref[0];
  root.right = _ref[1];
  reverseTree(root.left);
  reverseTree(root.right);
}; // 对称二叉树


var isSymmertric = function isSymmertric(root) {
  if (root === null) return true;

  var compare = function compare(left, right) {
    // 排除空节点
    if (!left && right) return false;else if (left && !right) return false;else if (!left && !right) return true;else if (left.val !== right.val) return false; //left right 不为空

    var leftSide = compare(left.left, right.right);
    var rightSide = compare(left.right, right.left);
    return leftSide && rightSide;
  };

  return compare(root.left, root.right);
}; // 相同的树:类似于对称二叉树


var isSameTree = function isSameTree(left, right) {
  if (!left && right || left && !right) return false;else if (!left && !right) return true;else if (left.val !== right.val) return false;
  return isSameTree(left.left, right.left) && isSameTree(left.right, right.right);
}; // 二叉树最大深度


var getDepth = function getDepth(root) {
  if (!root) return 0;
  var leftDepth = getDepth(root.left);
  var rightDepth = getDepth(root.right);
  return Math.max(leftDepth, rightDepth) + 1;
}; // 平衡二叉树:二叉树左右两个子树的高度差绝对值不超过1:
// 和求高度差不多 不过只要判断出高度差大于1就会返回-1并接收-1 逐个返回-1


var getHeight = function getHeight(root) {
  if (!root) return 0;
  var left = getHeight(root.left);
  if (left === -1) return -1;
  var right = getHeight(root.right);
  if (right === -1) return -1;
  return Math.abs(left - right) > 1 ? Math.max(left, right) + 1 : -1;
}; // 二叉树所有路径


var traversal = function traversal(root) {
  var res = [];
  var path = [];
  if (root) path.push(root.val);

  var find = function find(curr) {
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
}; // 左叶子之和


var findLetLeave = function findLetLeave(root) {
  var sum = 0;

  var findLeave = function findLeave(node) {
    if (!node) return 0;

    if (node.left !== null && node.left.left === null && node.left.right === null) {
      sum += node.left.val;
    }

    findLeave(node.left);
    findLeave(node.right);
  };

  findLeave(root);
  return sum;
}; // 找树左下角的值:层序遍历


var findLeftLeave = function findLeftLeave(root) {
  var que = [];
  que.push(root);
  var res = 0;

  while (que.length) {
    var len = que.length;

    for (var i = 0; i < len; i++) {
      var node = que.pop();
      if (i === 0) res = node.val;
      if (node.left) que.push(node.left);
      if (node.right) que.push(node.right);
    }
  }

  return res;
}; // 路径总和


var targetSum = function targetSum(root, target) {
  if (!root) return false;

  var dfs = function dfs(curr, count) {
    var left = false,
        right = false; // 递归结束条件：到达叶子结点且和减为0，则找到，返回true
    // 否则返回false

    if (!curr.left && !curr.right && count === 0) return true;else if (!curr.left && !curr.right && count > 0) return false;
    if (curr.left) left = dfs(curr.left, count - curr.left.val);
    if (curr.right) right = dfs(curr.right, count - curr.right.val);
    return left || right;
  };

  return dfs(root, targetSum - root.val);
}; // 中序和后序遍历序列构造二叉树


var makeTree = function makeTree(inorder, postorder) {
  if (postorder.length === 0) return null; // 后序数组最后一个元素就是当前根结点，需要pop，因为最后递归的时候可以直接不用排除根结点

  var node = postorder.pop(); // 找到根结点在中序遍历中的位置

  var index = inorder.indexOf(node);
  var root = new TreeNode(node.val);
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


var makeBigTree = function makeBigTree(nums) {
  // 递归构建到空数组则返回null
  if (nums.length === 0) {
    return null;
  }

  var max = nums[0];
  var maxIndex = 0;

  for (var i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
      maxIndex = i;
    }
  }

  var root = new TreeNode(max);
  root.left = makeBigTree(nums.slice(0, maxIndex));
  root.right = makeBigTree(nums.slice(maxIndex + 1));
  return root;
}; // 合并二叉树


var mergeTrees = function mergeTrees(t1, t2) {
  if (!t1 && !t2) {
    return null;
  }

  var val;

  if (t1 && !t2) {
    val = t1.val;
  } else if (!t1 && t2) {
    val = t2.val;
  } else {
    val = t1.val + t2.val;
  }

  var root = new TreeNode(val);
  root.left = mergeTrees(t1 ? t1.left : null, t2 ? t2.left : null);
  root.right = mergeTrees(t1 ? t1.right : null, t2 ? t2.right : null);
  return root;
}; // 二叉搜索树的搜索


var searchBST = function searchBST(root, val) {
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
}; // 验证二叉搜索树


var isValidBST = function isValidBST(root) {
  var pre = Number.MIN_VALUE,
      curr;

  var dfs = function dfs(root) {
    if (!root) return true;
    var left = dfs(root.left);
    curr = root.val;

    if (pre !== Number.MIN_VALUE && curr <= pre) {
      return false;
    }

    pre = curr;
    var right = dfs(root.right);
    return left && right;
  };

  return dfs(root);
}; // 二叉树的最近公共祖先


var lowestCommonAncestor = function lowestCommonAncestor(root, p, q) {
  if (root === p || root === q || root === null) return root;
  var left = lowestCommonAncestor(root.left, p, q);
  var right = lowestCommonAncestor(root.right, p, q);

  if (left && right) {
    return root; //左右都有 此时根结点就是父结点
  } else if (left && !right) {
    return left;
  } else {
    return right;
  }
};