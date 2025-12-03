Maximum Subarray (Kadane’s Algorithm)
Metadata

ID: arrays-maximum-subarray

Difficulty: Medium

Category: Array

Patterns: [kadane, dp]

Problem Summary

Find the maximum sum of a contiguous subarray.

Constraints

1 ≤ n ≤ 10^5

Intuition

At each position, either start new or extend previous.
Classic DP.

Approaches

1. DP/Kadane (Optimal)

dp[i] = max(nums[i], nums[i] + dp[i-1])

Algorithm

cur = nums[0], best = nums[0]

For i from 1..n-1:

cur = max(nums[i], cur + nums[i])

best = max(best, cur)

C++ Solution
int maxSubArray(vector<int>& nums) {
long long cur = nums[0], best = nums[0];
for (int i = 1; i < nums.size(); i++) {
cur = max<long long>(nums[i], cur + nums[i]);
best = max(best, cur);
}
return best;
}

Complexity

Time: O(n)

Space: O(1)

Common Pitfalls

Using 0 initialization (wrong for all-negative arrays)

Follow-Ups

Return subarray itself
