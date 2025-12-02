Heap / Priority Queue Pattern

Use when:

Need k-largest / k-smallest.

Streaming median.

Always want best/worst element quickly.

Min-Heap & Max-Heap
priority_queue<int> maxHeap; // default
priority_queue<int, vector<int>, greater<int>> minHeap;
