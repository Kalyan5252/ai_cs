# Coin Change

## Metadata

- ID: dp-coin-change
- Difficulty: Medium
- Category: Dynamic Programming
- Patterns: [dp-1d, unbounded-knapsack]
- Similar: Coin Change II

## Problem Summary

Given coin denominations and amount, return fewest coins needed to make amount.

## Constraints

- 1 ≤ amount ≤ 10^4
- 1 ≤ coins.size ≤ 100

## Intuition

Classic unbounded knapsack:  
dp[x] = min coins to make amount x.

## Approaches

### 1. DP Bottom-Up (Optimal)

dp[0] = 0  
dp[x] = min(dp[x], dp[x - coin] + 1)

## Algorithm

1. Initialize dp with INF
2. dp[0] = 0
3. For each coin
4. Update dp from coin → amount

## C++ Solution

```cpp
int coinChange(vector<int>& coins, int amount) {
    const int INF = 1e9;
    vector<int> dp(amount + 1, INF);
    dp[0] = 0;

    for (int c : coins) {
        for (int x = c; x <= amount; x++) {
            dp[x] = min(dp[x], dp[x - c] + 1);
        }
    }
    return dp[amount] == INF ? -1 : dp[amount];
}
Complexity
Time: O(n * amount)

Space: O(amount)

Common Pitfalls
Wrong DP initialization

Using int INF too small
```
