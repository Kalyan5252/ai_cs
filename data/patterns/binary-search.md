Binary Search Pattern
Intuition

Binary search is not just for finding a target in a sorted array.
General form: search on a monotonic space (value, index, or answer).

Use when:

There is an ordered (monotonic) decision: check(mid) is true/false.

You want O(log n) over a range [low, high].

Standard Template (Classic Search)
int l = 0, r = n - 1;
while (l <= r) {
int mid = l + (r - l) / 2;
if (nums[mid] == target) return mid;
else if (nums[mid] < target) l = mid + 1;
else r = mid - 1;
}
return -1;

“Search on Answer” Template
bool can(long long mid) {
// decide if mid is a valid answer
}

long long l = low, r = high, ans = high;
while (l <= r) {
long long mid = l + (r - l) / 2;
if (can(mid)) {
ans = mid;
r = mid - 1; // search for smaller valid answer
} else {
l = mid + 1;
}
}
return ans;

Common Mistakes

Overflow: use mid = l + (r - l) / 2.

Infinite loop by updating l/r incorrectly.

Wrong inclusive/exclusive boundaries.
