# Longest Substring Without Repeating Characters

## Metadata

- ID: sliding-window-longest-substring-without-repeating
- Difficulty: Medium
- Category: String / Sliding Window
- Patterns: [sliding-window, hashmap]
- Similar: Longest Substring with At Most K Distinct

## Problem Summary

Given a string s, find the length of the longest substring without repeating characters.

## Constraints

- 1 ≤ |s| ≤ 10^5

## Intuition

Maintain a window [l, r] with unique chars.  
Use last-seen index map.

## Approaches

### 1. Sliding Window + Index Map (Optimal)

## Algorithm

1. last[256] = -1
2. For r in 0..n-1:
   - If last[s[r]] >= l → move l
   - Update last[s[r]]
   - Update best

## C++ Solution

```cpp
int lengthOfLongestSubstring(string s) {
    vector<int> last(256, -1);
    int l = 0, res = 0;

    for (int r = 0; r < s.size(); r++) {
        if (last[s[r]] >= l)
            l = last[s[r]] + 1;

        last[s[r]] = r;
        res = max(res, r - l + 1);
    }
    return res;
}
Complexity
Time: O(n)

Space: O(1) fixed array

Common Pitfalls
Using unordered_map → slower
```
