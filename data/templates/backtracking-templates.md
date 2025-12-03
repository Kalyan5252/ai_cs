Backtracking Templates

// Subsets / Combinations
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

// Permutations
vector<vector<int>> res;
vector<int> path;
vector<bool> used;
void permute(vector<int>& nums) {
if (path.size() == nums.size()) {
res.push_back(path);
return;
}
for (int i = 0; i < nums.size(); i++) {
if (used[i]) continue;
used[i] = true;
path.push_back(nums[i]);
permute(nums);
path.pop_back();
used[i] = false;
}
}
