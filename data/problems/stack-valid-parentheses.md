# Valid Parentheses

## Metadata

- ID: stack-valid-parentheses
- Difficulty: Easy
- Category: Stack
- Patterns: [stack]
- Similar: Remove Invalid Parentheses

## Problem Summary

Given a string containing only '(', ')', '{', '}', '[' and ']', determine if it’s valid.

## Constraints

- 1 ≤ |s| ≤ 10^5

## Intuition

Use stack:  
Push opening brackets.  
When closing appears → check top.

## Approaches

### 1. Stack (Optimal)

Direct simulation.

## Algorithm

1. Create empty stack
2. For each char:
   - If opening → push
   - If closing → if stack empty or mismatch → false
3. At end → stack must be empty

## C++ Solution

```cpp
bool isValid(string s) {
    stack<char> st;
    unordered_map<char,char> mp = {{')','('}, {']','['}, {'}','{'}};

    for (char c : s) {
        if (mp.count(c)) {
            if (st.empty() || st.top() != mp[c]) return false;
            st.pop();
        } else {
            st.push(c);
        }
    }
    return st.empty();
}
Complexity
Time: O(n)

Space: O(n)

Common Pitfalls
Not checking empty stack on closing bracket
```
