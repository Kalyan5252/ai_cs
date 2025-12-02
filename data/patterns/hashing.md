Hashing / HashMap Pattern
Intuition

Use a hashmap when you need:

Fast existence checks: “have I seen this before?”

Fast counting: “how many times did it appear?”

Fast mapping: element → info.

Typical complexity:

Average O(1) insertion, lookup, delete

Worst O(n) (rare in practice)

When to Use

“Find pair/tuple with given sum/condition.”

“Find first non-repeating / repeating element.”

“Check if two arrays/strings are anagrams.”

“Group equivalent items (e.g., anagrams, same pattern).”

Template – Frequency Map
unordered_map<int,int> freq;
for (int x : nums) {
freq[x]++;
}

Template – First Seen Index
unordered_map<int,int> firstIndex;
for (int i = 0; i < nums.size(); i++) {
if (!firstIndex.count(nums[i])) {
firstIndex[nums[i]] = i;
}
}

Common Mistakes

Using map (tree) when unordered_map is enough → unnecessary O(log n).

Not considering collisions / worst-case in theory questions.

Forgetting to reset or clear the map between test cases.
