Graph Traversal Pattern
DFS Template
void dfs(int u, vector<vector<int>>& adj, vector<int>& vis) {
vis[u] = 1;
for (int v : adj[u]) {
if (!vis[v]) dfs(v, adj, vis);
}
}

BFS Template
queue<int> q;
q.push(start);
vis[start] = 1;
while (!q.empty()) {
int u = q.front(); q.pop();
for (int v : adj[u]) {
if (!vis[v]) {
vis[v] = 1;
q.push(v);
}
}
}
