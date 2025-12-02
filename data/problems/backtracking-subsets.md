## Subsets

## Metadata

- ID: backtracking-subsets
- Difficulty: Medium
- Category: Backtracking
- Patterns: [dfs, subsets]

## Problem Summary

Generate all subsets (the power set) of nums.

## Constraints

- 1 ≤ n ≤ 15

## Intuition

At each index: either take element or skip.

## Approach

### Standard DFS.

## Algorithm

Push current path to result.

For i from start..n-1:

push

recurse

pop

````cpp
C++ Solution
vector<vector<int>> res, ans;
vector<int> path;

void dfs(vector<int>& nums, int start) {
res.push_back(path);
for (int i = start; i < nums.size(); i++) {
path.push_back(nums[i]);
dfs(nums, i + 1);
path.pop_back();
}
}```

vector<vector<int>> subsets(vector<int>& nums) {
dfs(nums, 0);
return res;
}

Complexity

Time: O(2^n)

Space: O(n)
````
