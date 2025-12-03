Two Pointers Templates

// Opposite Ends
int i = 0, j = n - 1;
while (i < j) {
int sum = nums[i] + nums[j];
if (sum == target) {
// handle
break;
} else if (sum < target) {
i++;
} else {
j--;
}
}

// Slow/Fast Pointer
int slow = 0, fast = 0;
while (fast < n) {
// decide using nums[fast]
// maybe move slow conditionally
fast++;
}
