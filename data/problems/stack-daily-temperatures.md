# Daily Temperatures

## Metadata

- ID: stack-daily-temperatures
- Difficulty: Medium
- Category: Stack
- Patterns: [monotonic-stack]
- Similar: Next Greater Element, Stock Span

## Problem Summary

Given temperatures array, return for each day how many days until a warmer temperature.

## Constraints

- 1 ≤ n ≤ 10^5

## Intuition

For each day, find next warmer day.  
Use a **monotonic decreasing stack** storing indices.

## Approaches

### 1. Brute Force

Check next warmer day for each index → O(n²).

### 2. Monotonic Stack (Optimal)

Keep stack of decreasing temperatures.

## Algorithm

1. Traverse array from left
2. While stack not empty and current temp > temp[stack.top]:
   - res[stack.top] = i - stack.top
   - pop stack
3. Push current index

## C++ Solution

```cpp
vector<int> dailyTemperatures(vector<int>& T) {
    int n = T.size();
    vector<int> res(n, 0);
    stack<int> st; // store indices

    for (int i = 0; i < n; i++) {
        while (!st.empty() && T[i] > T[st.top()]) {
            int idx = st.top(); st.pop();
            res[idx] = i - idx;
        }
        st.push(i);
    }
    return res;
}
Complexity
Time: O(n)

Space: O(n)

Common Pitfalls
Comparing temperatures incorrectly
```
