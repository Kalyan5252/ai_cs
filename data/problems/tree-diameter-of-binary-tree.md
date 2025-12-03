# Diameter of Binary Tree

## Metadata

- ID: tree-diameter-of-binary-tree
- Difficulty: Medium
- Category: Tree
- Patterns: [dfs, tree-depth]
- Similar: Max Path Sum

## Problem Summary

Return the length of the longest path between any two nodes (edges count).

## Constraints

- 1 ≤ nodes ≤ 10^5

## Intuition

Diameter = max(left_height + right_height).  
Compute heights using DFS.

## Approaches

### 1. DFS (Optimal)

Track max diameter as global variable.

## Algorithm

1. DFS → returns height
2. At each node:
   - compute left height, right height
   - update diameter = max(diameter, left+right)
3. Return height = 1 + max(left,right)

## C++ Solution

```cpp
int ans = 0;

int dfs(TreeNode* root) {
    if (!root) return 0;
    int L = dfs(root->left);
    int R = dfs(root->right);
    ans = max(ans, L + R);
    return 1 + max(L, R);
}

int diameterOfBinaryTree(TreeNode* root) {
    dfs(root);
    return ans;
}
Complexity
Time: O(n)

Space: O(h)

Common Pitfalls
Returning diameter instead of height
```
