Stack & Queue Pattern
Stack Use Cases

Parentheses validation.

Next greater element.

Expression evaluation.

DFS iterative.

Queue Use Cases

BFS.

Sliding window max (with deque).

Level-order traversal.

Monotonic Stack Template
vector<int> res(n, -1);
stack<int> st; // store indices

for (int i = 0; i < n; i++) {
while (!st.empty() && nums[i] > nums[st.top()]) {
res[st.top()] = nums[i];
st.pop();
}
st.push(i);
}
