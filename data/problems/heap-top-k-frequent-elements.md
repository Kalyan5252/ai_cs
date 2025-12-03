# Top K Frequent Elements

## Metadata

- ID: heap-top-k-frequent-elements
- Difficulty: Medium
- Category: Heap / Hashmap
- Patterns: [min-heap, bucket-sort]
- Similar: K Closest Points, Sort Characters by Frequency

## Problem Summary

Return the k most frequent elements of an array.

## Constraints

- 1 ≤ n ≤ 10^5

## Intuition

Use hashmap for counts.  
Use:

- Min heap of size k **OR**
- Bucket sort of frequencies.

## Approaches

### 1. Min-Heap (Optimal)

Keep heap of top k frequencies.

### 2. Bucket Sort (Also Optimal)

freq range ≤ n → buckets of size n+1.

## Algorithm (Heap Version)

1. Count frequencies
2. Push (freq, value) into min-heap
3. If heap size > k → pop
4. Extract values

## C++ Solution

```cpp
vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int,int> freq;
    for (int x : nums) freq[x]++;

    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;

    for (auto& p : freq) {
        pq.push({p.second, p.first});
        if (pq.size() > k) pq.pop();
    }

    vector<int> res;
    while (!pq.empty()) {
        res.push_back(pq.top().second);
        pq.pop();
    }
    return res;
}
Complexity
Time: O(n log k)

Space: O(n)

Common Pitfalls
Using max-heap incorrectly

Forgetting to push value+frequency correctly
```
