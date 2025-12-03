Two Sum
Metadata

ID: arrays-two-sum

Difficulty: Easy

Category: Array

Patterns: [hashing]

Similar: 3Sum, 4Sum, Two Sum II

Problem Summary

Given an array of integers and a target value, return the indices of two numbers that add up to the target. Assume exactly one solution.

Constraints

2 ≤ n ≤ 10^5

-10^9 ≤ nums[i] ≤ 10^9

Intuition

Brute force checks all pairs → O(n²).
Better idea: use a hashmap while scanning.

Approaches

1. Brute Force

Check every pair (i, j).
Time: O(n²)
Space: O(1)

2. Hashmap (Optimized)

Store value → index.
For each element, check if (target − nums[i]) is already seen.

Algorithm

Create empty hashmap mp.

Loop through array:

need = target – nums[i]

if need exists in mp → return indices

otherwise store nums[i] → i

Guaranteed solution.

C++ Solution
vector<int> twoSum(vector<int>& nums, int target) {
unordered_map<int,int> mp;
for (int i = 0; i < nums.size(); i++) {
int need = target - nums[i];
if (mp.count(need)) return {mp[need], i};
mp[nums[i]] = i;
}
return {};
}

Complexity

Time: O(n)

Space: O(n)

Common Pitfalls

Forgetting that values can repeat

Using two loops unnecessarily

Follow-Ups

What if array is sorted?

What if multiple answers exist?
