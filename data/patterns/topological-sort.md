Topological Sort Pattern

Use when:

Directed acyclic graph (DAG).

Precedence / dependency resolution.

Kahn’s Algorithm Template (BFS):

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
