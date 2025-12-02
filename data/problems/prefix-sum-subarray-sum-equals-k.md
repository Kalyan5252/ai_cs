# Subarray Sum Equals K

## Metadata

- ID: prefix-sum-subarray-sum-equals-k
- Difficulty: Medium
- Category: Prefix Sum / Hashing
- Patterns: [prefix-sum, hashmap]
- Similar: Continuous Subarray Sum, Count Subarrays with Sum Divisible by K

## Problem Summary

Count the number of continuous subarrays whose sum equals k.

## Constraints

- 1 ≤ n ≤ 10^5
- -10^9 ≤ nums[i] ≤ 10^9

## Intuition

If prefixSum[j] - prefixSum[i] = k  
→ we found a subarray.

So for each prefix sum P, count how many previous (P - k) existed.

## Approaches

### 1. Prefix Sum + HashMap (Optimal)

Store frequency of each prefix sum.

## Algorithm

1. prefix = 0
2. mp[0] = 1
3. For each num:
   - prefix += num
   - count += mp[prefix - k]
   - mp[prefix]++

## C++ Solution

```cpp
int subarraySum(vector<int>& nums, int k) {
    unordered_map<long long, int> mp;
    mp[0] = 1;

    long long prefix = 0, count = 0;
    for (int x : nums) {
        prefix += x;
        if (mp.count(prefix - k))
            count += mp[prefix - k];
        mp[prefix]++;
    }
    return count;
}
Complexity
Time: O(n)

Space: O(n)

Common Pitfalls
Forgetting mp[0] = 1
```
