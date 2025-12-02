Linked List Pattern
Intuition

Linked lists are good when:

Frequent insertions/deletions in the middle.

Size is dynamic.

Order matters.

Cost:

Access is O(n).

No random indexing.

Common Patterns

Reverse a list (iterative/recursive).

Find middle node (slow/fast pointer).

Detect cycle (Floyd’s algorithm).

Merge two sorted lists.

Template – Reverse
ListNode* reverseList(ListNode* head) {
ListNode* prev = nullptr;
ListNode* cur = head;
while (cur) {
ListNode\* nxt = cur->next;
cur->next = prev;
prev = cur;
cur = nxt;
}
return prev;
}
