Arrays – Basics
Intuition

Arrays are the simplest linear data structure: contiguous memory, constant-time index access (O(1) for arr[i]), but fixed size.

Use arrays when:

You know the size (or can bound it reasonably).

You need fast random access.

You can afford shifting/overwriting elements occasionally.

Typical Operations

Access: O(1)

Update: O(1)

Insert at end (dynamic array): amortized O(1)

Insert/delete in middle: O(n) (shift elements)

Common Patterns Involving Arrays

Counting / frequency using a fixed-size array or hashmap.

Prefix sums to speed up range queries.

Two pointers for sorted or window-like problems.

Sliding window for contiguous subarray conditions.

Template – Iterate & Track Best
int best = INT_MIN;
for (int i = 0; i < n; i++) {
// process arr[i]
best = max(best, arr[i]);
}
return best;

Things to Watch

Index out of bounds (i < n, not <= n).

Off-by-one in loops and subarray lengths.

Mutating the array while iterating—be clear about direction.
