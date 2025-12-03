# Binary Tree Level Order Traversal

## Metadata

- ID: tree-level-order-traversal
- Difficulty: Medium
- Category: Tree
- Patterns: [bfs]
- Similar: Zigzag Level Order, Right Side View

## Problem Summary

Return level-by-level (BFS) traversal of a binary tree.

## Constraints

- 1 ≤ nodes ≤ 10^5

## Intuition

Use a queue → BFS.

## Approaches

### 1. BFS (Optimal)

Push root, then process each level.

## Algorithm

1. Create queue with root
2. While not empty:
   - size = q.size
   - iterate size times to capture level
   - push children

## C++ Solution

```cpp
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;

    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            TreeNode* cur = q.front(); q.pop();
            level.push_back(cur->val);
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        res.push_back(level);
    }
    return res;
}
Complexity
Time: O(n)

Space: O(n)

Common Pitfalls
Forgetting to process exactly size nodes for each level
```
