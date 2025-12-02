# Longest Increasing Subsequence (LIS)

## Metadata

- ID: dp-longest-increasing-subsequence
- Difficulty: Medium
- Category: Dynamic Programming
- Patterns: [dp, binary-search]
- Similar: Maximum Length of Pair Chain, Russian Doll Envelopes

## Problem Summary

Find length of longest strictly increasing subsequence.

## Constraints

- 1 ≤ n ≤ 2500

## Intuition

Two classic approaches:

- DP O(n²)
- Patience Sorting / Binary Search O(n log n)

## Approaches

### 1. DP O(n²)

dp[i] = LIS ending at i.

### 2. Binary Search (Optimal)

Maintain array `tails` where tails[k] = smallest ending value of LIS of length k+1.

## Algorithm (Binary Search)

1. Create empty vector tails
2. For x in nums:
   - find lower_bound in tails
   - replace or push_back
3. Answer = tails.size()

## C++ Solution

```cpp
int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}
Complexity
Time: O(n log n)

Space: O(n)

Common Pitfalls
Using upper_bound (wrong)

Confusing subsequence vs subarray
```
