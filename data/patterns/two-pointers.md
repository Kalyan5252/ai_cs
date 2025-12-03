Two Pointers Pattern
Intuition

Two pointers = maintain two indices (often i and j) that move over the same array/string or two arrays.

When to use:

Sorted arrays (find pairs/triples).

When you want to avoid O(n^2) brute force.

When you’re shrinking a range from both ends.

Common Use Cases

Pair sum on sorted array.

Checking palindrome.

Merging two sorted arrays.

3-sum & 4-sum (inner two-pointers).

Basic Template (Opposite Ends)
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

Basic Template (Slow/Fast Pointer)
int slow = 0, fast = 0;
while (fast < n) {
// decide using nums[fast]
// maybe move slow conditionally
fast++;
}

Things to Watch

Loop condition (i < j vs i <= j).

Moving both pointers correctly to avoid infinite loops.

When array not sorted → often need a different pattern (or sort first).
