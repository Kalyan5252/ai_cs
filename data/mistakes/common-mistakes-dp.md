Common Mistakes in Dynamic Programming (DP)

1. Not identifying overlapping subproblems or optimal substructure.
2. Forgetting to initialize base cases (e.g., dp[0], dp[1]).
3. Using incorrect transition relations (e.g., off-by-one errors in indices).
4. Not considering space optimization (can often reduce to O(1) or O(n)).
5. Recomputing subproblems instead of storing results (missing memoization).
6. Using the wrong loop order for knapsack-type problems (forward vs backward).
7. Not handling constraints properly (e.g., negative values, large n).
8. Overflow in sum or product calculations (use long long/int64).
9. Forgetting to update the answer at the right place (before/after loop).
10. Not resetting DP array between test cases in multi-test problems.
