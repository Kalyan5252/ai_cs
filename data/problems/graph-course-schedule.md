# Course Schedule

## Metadata

- ID: graph-course-schedule
- Difficulty: Medium
- Category: Graph
- Patterns: [topological-sort, bfs, indegree]
- Similar: Course Schedule II, Alien Dictionary

## Problem Summary

You are given `numCourses` and a list of prerequisite pairs `[a, b]` meaning to take course `a` you must complete `b`.  
Return true if it’s possible to finish all courses.

## Constraints

- 1 ≤ numCourses ≤ 10^5
- prerequisites length ≤ 10^5

## Intuition

It's a classic **cycle detection in a directed graph**.  
If cycle exists → impossible to complete all courses.  
Use **Topological Sort (Kahn’s Algorithm)**.

## Approaches

### 1. DFS Cycle Detection

Detect back edges → cycle → return false.

### 2. BFS Topological Sort (Optimal)

Count indegrees; process nodes whose indegree = 0.

## Algorithm (BFS)

1. Build adjacency list
2. Compute indegree for each node
3. Push all nodes with indegree = 0 into queue
4. Pop from queue, reduce indegree of its neighbors
5. If all nodes processed → no cycle

## C++ Solution

```cpp
bool canFinish(int n, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(n);
    vector<int> indeg(n, 0);

    for (auto& p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        indeg[p[0]]++;
    }

    queue<int> q;
    for (int i = 0; i < n; i++)
        if (indeg[i] == 0) q.push(i);

    int count = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        count++;
        for (int v : adj[u]) {
            if (--indeg[v] == 0)
                q.push(v);
        }
    }
    return count == n;
}
Complexity
Time: O(V + E)

Space: O(V + E)

Common Pitfalls
Forgetting to count how many nodes processed

Missing direction of edges
```
