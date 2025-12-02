# 3Sum

## Metadata

- ID: two-pointers-3sum
- Difficulty: Medium
- Category: Two Pointers
- Patterns: [sorting, two-pointers]
- Similar: 4Sum, Two Sum

## Problem Summary

Return all unique triplets such that a + b + c = 0.

## Constraints

- 3 ≤ n ≤ 10^5

## Intuition

Sort → fix i → use two pointers on rest.

## Approaches

### 1. Sorting + Two Pointers (Optimal)

Avoid duplicates carefully.

## Algorithm

1. Sort nums
2. For i from 0..n−1:
   - Skip duplicates
   - l = i+1, r = n−1
   - While l < r:
     - if sum < 0 → l++
     - if sum > 0 → r--
     - else record & move both, skipping duplicates

## C++ Solution

```cpp
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    int n = nums.size();

    for (int i = 0; i < n; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;

        int l = i + 1, r = n - 1;
        while (l < r) {
            long long sum = (long long)nums[i] + nums[l] + nums[r];
            if (sum < 0) l++;
            else if (sum > 0) r--;
            else {
                res.push_back({nums[i], nums[l], nums[r]});
                l++; r--;
                while (l < r && nums[l] == nums[l-1]) l++;
                while (l < r && nums[r] == nums[r+1]) r--;
            }
        }
    }
    return res;
}
Complexity
Time: O(n²)

Space: O(1)

Common Pitfalls
Forgetting to skip duplicates
```
