Tree DFS & BFS Templates

// DFS Traversal
void dfs(TreeNode\* root) {
if (!root) return;
// preorder work
dfs(root->left);
// inorder work
dfs(root->right);
// postorder work
}

// BFS Level Order Traversal
vector<vector<int>> levelOrder(TreeNode* root) {
vector<vector<int>> res;
if (!root) return res;
queue<TreeNode*> q;
q.push(root);
while (!q.empty()) {
int sz = q.size();
vector<int> level;
while (sz--) {
TreeNode\* node = q.front(); q.pop();
level.push_back(node->val);
if (node->left) q.push(node->left);
if (node->right) q.push(node->right);
}
res.push_back(level);
}
return res;
}
