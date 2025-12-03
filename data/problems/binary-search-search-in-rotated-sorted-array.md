# Search in Rotated Sorted Array

## Metadata

- ID: binary-search-search-in-rotated-sorted-array
- Difficulty: Medium
- Category: Binary Search
- Patterns: [binary-search, modified-binary-search]
- Similar: Search in Rotated Sorted Array II, Find Minimum in Rotated Sorted Array

## Problem Summary

Given a rotated sorted array and a target, return its index or -1.

## Constraints

- 1 ≤ n ≤ 10^5
- Values can be duplicates only in variant II

## Intuition

At any point, one half is always sorted.  
Use that property to decide where to continue the search.

## Approaches

### 1. Brute Force

Scan entire array → O(n).

### 2. Modified Binary Search (Optimal)

Determine which half is sorted.  
Check if target lies inside that half.  
Move accordingly.

## Algorithm (Steps)

1. l = 0, r = n−1
2. While l ≤ r:
   - mid = (l+r)/2
   - If nums[mid] == target → return mid
   - If left half sorted:
     - if nums[l] ≤ target < nums[mid] → move r
     - else → move l
   - Else right half sorted:
     - if nums[mid] < target ≤ nums[r] → move l
     - else → move r
3. If not found → return -1

## C++ Solution

```cpp
int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return mid;

        if (nums[l] <= nums[mid]) {                 // left sorted
            if (nums[l] <= target && target < nums[mid])
                r = mid - 1;
            else
                l = mid + 1;
        } else {                                    // right sorted
            if (nums[mid] < target && target <= nums[r])
                l = mid + 1;
            else
                r = mid - 1;
        }
    }
    return -1;
}
```

## Complexity

Time: O(log n)

Space: O(1)

## Common Pitfalls

Not handling sorted half correctly

Forgetting boundaries in comparisons
