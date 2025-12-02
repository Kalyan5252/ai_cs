Graph Templates

// DFS Traversal
void dfs(int u, vector<vector<int>>& adj, vector<int>& vis) {
vis[u] = 1;
for (int v : adj[u]) {
if (!vis[v]) dfs(v, adj, vis);
}
}

// BFS Traversal
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

// Topological Sort (Kahn’s Algorithm)
vector<int> indeg(n);
for (int u = 0; u < n; u++) {
for (int v : adj[u]) indeg[v]++;
}
queue<int> q;
for (int i = 0; i < n; i++) if (indeg[i] == 0) q.push(i);
vector<int> order;
while (!q.empty()) {
int u = q.front(); q.pop();
order.push_back(u);
for (int v : adj[u]) {
if (--indeg[v] == 0) q.push(v);
}
}
