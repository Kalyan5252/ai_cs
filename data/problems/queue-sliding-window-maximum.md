# Sliding Window Maximum

## Metadata

- ID: queue-sliding-window-maximum
- Difficulty: Hard
- Category: Queue / Deque
- Patterns: [monotonic-queue, sliding-window]
- Similar: Sliding Window Minimum, Stock Span

## Problem Summary

Given an array and window size k, return the max of each sliding window.

## Constraints

- 1 ≤ n ≤ 10^5
- 1 ≤ k ≤ n

## Intuition

Use a **monotonic deque** storing indices of elements in decreasing order.

## Approaches

### 1. Brute Force O(nk)

Slow.

### 2. Monotonic Deque (Optimal)

Maintain deque with decreasing values.

## Algorithm

1. For each index i:
   - Remove out-of-window indices from front
   - Remove smaller elements from back
   - Add current index
   - Window reached? push front element as max

## C++ Solution

```cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> res;

    for (int i = 0; i < nums.size(); i++) {
        if (!dq.empty() && dq.front() <= i - k)
            dq.pop_front();

        while (!dq.empty() && nums[dq.back()] <= nums[i])
            dq.pop_back();

        dq.push_back(i);

        if (i >= k - 1)
            res.push_back(nums[dq.front()]);
    }
    return res;
}
Complexity
Time: O(n)

Space: O(k)

Common Pitfalls
Forgetting to remove elements out of window
```
