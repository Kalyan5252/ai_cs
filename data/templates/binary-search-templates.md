Binary Search Templates

// Classic Search
int l = 0, r = n - 1;
while (l <= r) {
int mid = l + (r - l) / 2;
if (nums[mid] == target) return mid;
else if (nums[mid] < target) l = mid + 1;
else r = mid - 1;
}
return -1;

// Search on Answer
bool can(long long mid) {
// decide if mid is a valid answer
}
long long l = low, r = high, ans = high;
while (l <= r) {
long long mid = l + (r - l) / 2;
if (can(mid)) {
ans = mid;
r = mid - 1;
} else {
l = mid + 1;
}
}
return ans;
