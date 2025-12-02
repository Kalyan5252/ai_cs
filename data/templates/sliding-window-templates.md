Sliding Window Templates

// Fixed-size window
int l = 0;
long long windowSum = 0;
int best = INT_MIN;
for (int r = 0; r < n; r++) {
windowSum += nums[r];
if (r - l + 1 > k) {
windowSum -= nums[l];
l++;
}
if (r - l + 1 == k) {
best = max(best, (int)windowSum);
}
}
return best;

// Variable-size window
int l = 0;
unordered_map<char,int> freq;
int best = 0;
for (int r = 0; r < s.size(); r++) {
freq[s[r]]++;
while (/_ condition violated _/) {
freq[s[l]]--;
if (freq[s[l]] == 0) freq.erase(s[l]);
l++;
}
best = max(best, r - l + 1);
}
