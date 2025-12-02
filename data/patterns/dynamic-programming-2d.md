Dynamic Programming – 2D Pattern

Typical for:

Grid problems.

Two-string problems (LCS, edit distance).

Knapsack.

Template (grid):

vector<vector<int>> dp(m, vector<int>(n, 0));
for (int i = 0; i < m; i++) {
for (int j = 0; j < n; j++) {
// base + transition
}
}
