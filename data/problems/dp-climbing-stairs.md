# Climbing Stairs

## Metadata

- ID: dp-climbing-stairs
- Difficulty: Easy
- Category: Dynamic Programming
- Patterns: [dp-1d]
- Similar: Min Cost Climbing Stairs, Fibonacci variations

## Problem Summary

You can take 1 or 2 steps. Count total ways to reach step n.

## Constraints

- 1 ≤ n ≤ 45

## Intuition

Same as Fibonacci:  
ways[n] = ways[n-1] + ways[n-2]

## Approaches

### 1. DP Array

Straightforward Fibonacci DP.

### 2. Space Optimized

Just keep last two states.

## Algorithm

1. dp[1] = 1
2. dp[2] = 2
3. For i ≥ 3: dp[i] = dp[i-1] + dp[i-2]

## C++ Solution (Optimized)

```cpp
int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}
```

Complexity

Time: O(n)

Space: O(1)

Common Pitfalls

Overflow (though n ≤ 45 prevents it)
