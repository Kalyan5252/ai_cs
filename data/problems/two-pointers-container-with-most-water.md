# Container With Most Water

## Metadata

- ID: two-pointers-container-with-most-water
- Difficulty: Medium
- Category: Two Pointers
- Patterns: [two-pointers, greedy]
- Similar: Trapping Rain Water

## Problem Summary

Given an array `height[]` representing vertical lines, find the maximum area of water a container can store.

## Constraints

- 2 ≤ n ≤ 10^5
- 0 ≤ height[i] ≤ 10^4

## Intuition

Area = width \* min(h[i], h[j])  
We want max area.  
Brute force checks all pairs → O(n²).

Optimal idea:
Move the pointer at the **shorter** line inward because:

- moving taller line never increases min(h[i], h[j]);
- only increasing the shorter boundary can help.

## Approaches

### 1. Brute Force

Check all i < j.  
O(n²) — too slow.

### 2. Two Pointers (Optimal)

Start at both ends, shrink inward.

## Algorithm

1. i = 0, j = n–1, best = 0
2. while i < j:
   - area = min(height[i], height[j]) \* (j – i)
   - best = max(best, area)
   - if height[i] < height[j] → i++
   - else → j--
3. return best

## C++ Solution

```cpp
int maxArea(vector<int>& h) {
    int i = 0, j = h.size() - 1;
    int best = 0;

    while (i < j) {
        int area = min(h[i], h[j]) * (j - i);
        best = max(best, area);

        if (h[i] < h[j]) i++;
        else j--;
    }
    return best;
}
```

Complexity

Time: O(n)

Space: O(1)

Common Pitfalls

Moving the wrong pointer

Forgetting to use min(height[i], height[j])
