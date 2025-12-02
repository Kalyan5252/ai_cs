Prefix Sum Pattern
Intuition

Prefix sums trade extra memory for constant-time range queries.

prefix[i] = sum of nums[0..i-1] (length n+1).

Then sum of [l..r] = prefix[r+1] - prefix[l].

Template
vector<long long> prefix(n + 1, 0);
for (int i = 0; i < n; i++) {
prefix[i + 1] = prefix[i] + nums[i];
}

Use Cases

Range sum queries.

Subarray sum equals K (with hashmap).

Difference arrays for range updates.
