# Find First and Last Position of Element in Sorted Array

## Metadata

- ID: binary-search-first-and-last-position
- Difficulty: Medium
- Category: Binary Search
- Patterns: [binary-search-boundaries]
- Similar: Search Insert Position, Count Occurrences

## Problem Summary

Given sorted array `nums` and a target, return `[firstIndex, lastIndex]`.  
If not found, return [-1, -1].

## Constraints

- 1 ≤ n ≤ 10^5

## Intuition

Use **binary search twice**:

- once to find first occurrence
- once to find last occurrence

## Approaches

### 1. Brute Force

Scan from left and right → O(n).

### 2. Binary Search (Optimal)

Use modified conditions.

## Algorithm

### Find First Occurrence

1. l = 0, r = n–1
2. while l ≤ r:
   - mid = (l+r)/2
   - if nums[mid] >= target → r = mid–1
   - else → l = mid+1
3. l is potential first index (check validity)

### Find Last Occurrence

1. l = 0, r = n–1
2. while l ≤ r:
   - mid
   - if nums[mid] <= target → l = mid+1
   - else → r = mid–1
3. r is potential last index

## C++ Solution

```cpp
vector<int> searchRange(vector<int>& nums, int target) {
    int n = nums.size();
    int l = 0, r = n - 1;
    int first = -1, last = -1;

    // first
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] >= target) r = mid - 1;
        else l = mid + 1;
    }
    if (l < n && nums[l] == target) first = l;
    else return {-1, -1}; // not found

    // last
    l = 0; r = n - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] <= target) l = mid + 1;
        else r = mid - 1;
    }
    last = r;

    return {first, last};
}
Complexity
Time: O(log n)

Space: O(1)

Common Pitfalls
Not validating boundary l < n correctly

Mixing conditions for first vs last occurrence
```
