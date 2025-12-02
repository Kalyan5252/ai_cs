# Non-overlapping Intervals

## Metadata

- ID: greedy-non-overlapping-intervals
- Difficulty: Medium
- Category: Greedy
- Patterns: [interval-scheduling]
- Similar: Merge Intervals, Meeting Rooms II

## Problem Summary

Given intervals, return minimum number to remove so remaining intervals don’t overlap.

## Constraints

- 1 ≤ intervals ≤ 10^5

## Intuition

Classic interval scheduling.  
Sort by end time → greedily select earliest finishing intervals.

## Approaches

### 1. Sort by End Time (Optimal)

Keep track of the end of the last selected interval.

## Algorithm

1. Sort intervals by their end
2. lastEnd = -inf
3. For each interval:
   - If start ≥ lastEnd → keep it, update lastEnd
   - Else → must remove it → increment removals

## C++ Solution

```cpp
int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end(),
         [](auto& a, auto& b){ return a[1] < b[1]; });

    int count = 0;
    int lastEnd = INT_MIN;

    for (auto& in : intervals) {
        if (in[0] >= lastEnd) {
            lastEnd = in[1];
        } else {
            count++;    // remove this interval
        }
    }
    return count;
}
Complexity
Time: O(n log n)

Space: O(1)

Common Pitfalls
Sorting by start instead of end

Counting selected instead of removed
```
