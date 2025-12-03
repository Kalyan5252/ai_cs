Permutations
Metadata

ID: backtracking-permutations

Difficulty: Medium

Category: Backtracking

Patterns: [dfs, permutations]

Problem Summary

Return all permutations of the given array.

Constraints

1 ≤ n ≤ 8

Intuition

At each index, choose one of the unused elements.

Approaches

1. Backtracking

Use a used[] array to mark taken elements.

Algorithm

Maintain path, used[], res.

If path.size == n → push into result.

For each index i:

if not used:

mark used

push element

recurse

pop, unmark

C++ Solution
vector<vector<int>> res, ans;
vector<int> path;
vector<int> used;

void dfs(vector<int>& nums) {
if (path.size() == nums.size()) {
res.push_back(path);
return;
}
for (int i = 0; i < nums.size(); i++) {
if (used[i]) continue;
used[i] = 1;
path.push_back(nums[i]);
dfs(nums);
path.pop_back();
used[i] = 0;
}
}

vector<vector<int>> permute(vector<int>& nums) {
used.assign(nums.size(), 0);
dfs(nums);
return res;
}

Complexity

Time: O(n! \* n)

Space: O(n)

Common Pitfalls

Forgetting to unmark used

Using duplicates without handling repetition

Follow-Ups

How to handle duplicates?
