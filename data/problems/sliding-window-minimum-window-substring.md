# Minimum Window Substring

## Metadata

- ID: sliding-window-minimum-window-substring
- Difficulty: Hard
- Category: Sliding Window / String
- Patterns: [sliding-window, hashmap]
- Similar: Smallest Substring with All Characters

## Problem Summary

Given strings s and t, return minimum substring of s containing all chars of t.

## Constraints

- 1 ≤ |s|, |t| ≤ 10^5

## Intuition

Use a shrinking and expanding window:  
Expand until all required chars met, then shrink to narrow.

## Approaches

### 1. Sliding Window (Optimal)

Maintain two maps: required and window count.

## Algorithm

1. Count chars in t
2. Iterate r over s:
   - add s[r] to window
   - if character satisfies requirement → increment "formed"
3. When all needed formed:
   - try shrinking from left
   - update best window
   - remove left char

## C++ Solution

```cpp
string minWindow(string s, string t) {
    if (t.size() > s.size()) return "";

    vector<int> need(128, 0), have(128, 0);
    int required = 0;

    for (char c : t) {
        if (need[c] == 0) required++;
        need[c]++;
    }

    int formed = 0, l = 0, bestLen = INT_MAX, bestL = 0;

    for (int r = 0; r < s.size(); r++) {
        have[s[r]]++;
        if (have[s[r]] == need[s[r]] && need[s[r]] != 0)
            formed++;

        while (formed == required) {
            if (r - l + 1 < bestLen) {
                bestLen = r - l + 1;
                bestL = l;
            }
            have[s[l]]--;
            if (have[s[l]] < need[s[l]] && need[s[l]] != 0)
                formed--;
            l++;
        }
    }
    return bestLen == INT_MAX ? "" : s.substr(bestL, bestLen);
}
Complexity
Time: O(n)

Space: O(1)

Common Pitfalls
Forgetting to track "formed" properly
```
