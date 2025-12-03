# Reverse Linked List

## Metadata

- ID: linked-list-reverse-linked-list
- Difficulty: Easy
- Category: Linked List
- Patterns: [iteration, pointer-manipulation]
- Similar: Reverse Linked List II, Reverse Nodes in K-Group

## Problem Summary

Reverse a singly linked list and return the new head.

## Constraints

- 0 ≤ n ≤ 10^5

## Intuition

Use three pointers: prev, curr, next.  
Rewire links one by one.

## Approaches

### 1. Iterative (Optimal)

Most common approach.

### 2. Recursive

Clean but can hit recursion depth for large lists.

## Algorithm (Iterative)

1. prev = NULL, curr = head
2. While curr:
   - next = curr->next
   - curr->next = prev
   - prev = curr
   - curr = next
3. Return prev

## C++ Solution

```cpp
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* cur = head;

    while (cur) {
        ListNode* nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}
Complexity
Time: O(n)

Space: O(1)

Common Pitfalls
Forgetting to save next before rewiring
```
