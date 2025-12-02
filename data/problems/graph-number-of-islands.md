# Number of Islands

## Metadata

- ID: graph-number-of-islands
- Difficulty: Medium
- Category: Graph / Grid
- Patterns: [dfs, bfs, flood-fill]
- Similar: Flood Fill, Number of Enclaves

## Problem Summary

Given an m×n grid of '1's (land) and '0's (water), count the number of islands.

## Constraints

- 1 ≤ m, n ≤ 300

## Intuition

Each island is a connected component in a grid.  
Use DFS/BFS to mark visited cells.

## Approaches

### 1. DFS Flood Fill (Optimal)

Recursive or iterative.

### 2. BFS Flood Fill

Use queue.

## Algorithm

1. Loop through grid
2. When cell == '1':
   - increment count
   - run DFS/BFS to mark entire island as visited

## C++ Solution (DFS)

```cpp
void dfs(vector<vector<char>>& g, int i, int j) {
    int m = g.size(), n = g[0].size();
    if (i < 0 || j < 0 || i >= m || j >= n || g[i][j] == '0')
        return;
    g[i][j] = '0';
    dfs(g, i+1, j);
    dfs(g, i-1, j);
    dfs(g, i, j+1);
    dfs(g, i, j-1);
}

int numIslands(vector<vector<char>>& g) {
    int m = g.size(), n = g[0].size(), count = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (g[i][j] == '1') {
                count++;
                dfs(g, i, j);
            }
        }
    }
    return count;
}
```

Complexity

Time: O(m × n)

Space: O(m × n) recursion worst-case

Common Pitfalls

Not marking visited cells

Mis-handling boundaries
