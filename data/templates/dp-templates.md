Dynamic Programming Templates

// 1D DP
vector<long long> dp(n, 0);
// base case
for (int i = 0; i < n; i++) {
// transition using dp[..i-1..]
}

// 2D DP (Grid)
vector<vector<int>> dp(m, vector<int>(n, 0));
for (int i = 0; i < m; i++) {
for (int j = 0; j < n; j++) {
// base + transition
}
}
