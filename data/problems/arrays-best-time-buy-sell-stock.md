Best Time to Buy and Sell Stock (Single Transaction)
Metadata

ID: arrays-best-time-buy-sell-stock

Difficulty: Easy

Category: Array

Patterns: [one-pass]

Similar: Best Time to Buy & Sell II, III, IV

Problem Summary

Given prices[i] for day i, find max profit with one buy + one sell.

Constraints

1 ≤ n ≤ 10^5

0 ≤ prices[i] ≤ 10^4

Intuition

Keep track of lowest price so far.
For each day, consider selling today → compute profit.

Approach

Single pass.

Algorithm

minPrice = +∞

best = 0

For each p:

minPrice = min(minPrice, p)

best = max(best, p - minPrice)

C++ Solution
int maxProfit(vector<int>& prices) {
int minPrice = INT_MAX, best = 0;
for (int p : prices) {
minPrice = min(minPrice, p);
best = max(best, p - minPrice);
}
return best;
}

Complexity

Time: O(n)

Space: O(1)

Common Pitfalls

Buying after selling

Resetting min unnecessarily

Follow-Ups

Multiple transactions allowed?
