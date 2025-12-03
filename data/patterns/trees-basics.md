Trees – Basics Pattern
Traversals

Preorder: root, left, right

Inorder: left, root, right

Postorder: left, right, root

Level-order (BFS by queue)

DFS Template
void dfs(TreeNode\* root) {
if (!root) return;
// preorder work
dfs(root->left);
// inorder work
dfs(root->right);
// postorder work
}
