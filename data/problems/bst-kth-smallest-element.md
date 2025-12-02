# Kth Smallest Element in a BST

## Metadata

- ID: bst-kth-smallest-element
- Difficulty: Medium
- Category: BST / Tree
- Patterns: [inorder-traversal]
- Similar: Kth Largest in Stream, Validate BST

## Problem Summary

Given the root of a BST and integer k, return the kth smallest value.

## Constraints

- 1 ≤ nodes ≤ 10^5
- BST property always holds

## Intuition

Inorder traversal of BST → sorted sequence.

## Approaches

### 1. Inorder Traversal (Optimal)

Perform inorder and count nodes.

### 2. Iterative Stack

Better control + avoids recursion limits.

## Algorithm

1. Create stack
2. Push all left nodes until null
3. Pop one: decrement k
4. If k == 0 → answer
5. Move to right subtree
6. Continue

## C++ Solution

````cpp
int kthSmallest(TreeNode* root, int k) {
    stack<TreeNode*> st;
    TreeNode* cur = root;

    while (cur || !st.empty()) {
        while (cur) {
            st.push(cur);
            cur = cur->left;
        }
        cur = st.top(); st.pop();
        if (--k == 0) return cur->val;
        cur = cur->right;
    }
    return -1;
}```
````

Complexity

Time: O(k)

Space: O(h)

Common Pitfalls

Forgetting to decrement k at correct moment

Doing full traversal unnecessarily
