Dynamic Programming – 1D Pattern

Use when:

Overlapping subproblems.

Optimal substructure.

Template:

vector<long long> dp(n, 0);
// base case
for (int i = 0; i < n; i++) {
// transition using dp[..i-1..]
}
