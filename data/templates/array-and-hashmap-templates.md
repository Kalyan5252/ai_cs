Array & HashMap Templates

// Iterate & Track Best
int best = INT_MIN;
for (int i = 0; i < n; i++) {
// process arr[i]
best = max(best, arr[i]);
}
return best;

// Frequency Map
unordered_map<int,int> freq;
for (int x : nums) {
freq[x]++;
}

// First Seen Index
unordered_map<int,int> firstIndex;
for (int i = 0; i < nums.size(); i++) {
if (!firstIndex.count(nums[i])) {
firstIndex[nums[i]] = i;
}
}
