Sliding Window Pattern
Intuition

Use sliding window when:

You’re dealing with subarrays / substrings.

The requirement is over a contiguous range.

You want better than O(n^2).

The “window” is [l, r] that expands and shrinks.

Types

Fixed-size window: length k.

Variable-size window: maintain a condition (e.g., sum ≤ K, at most K distinct chars).

Fixed-Size Template
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

Variable-Size Template
int l = 0;
unordered_map<char,int> freq;
int best = 0;

for (int r = 0; r < s.size(); r++) {
freq[s[r]]++;

    while (/* condition violated, e.g., too many distinct */) {
        freq[s[l]]--;
        if (freq[s[l]] == 0) freq.erase(s[l]);
        l++;
    }

    // here condition is satisfied
    best = max(best, r - l + 1);

}

Common Mistakes

Forgetting to shrink window when condition breaks.

Wrong order: update answer before/after shrinking.

Poorly defined condition → confusion in code.
