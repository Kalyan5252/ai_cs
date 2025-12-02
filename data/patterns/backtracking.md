Backtracking Pattern

Use when:

You generate all combinations/permutations/subsets.

You explore choices and revert.

Template:

vector<vector<int>> res;
vector<int> cur;

void backtrack(vector<int>& nums, int start) {
res.push_back(cur);
for (int i = start; i < nums.size(); i++) {
cur.push_back(nums[i]);
backtrack(nums, i + 1);
cur.pop_back();
}
}
