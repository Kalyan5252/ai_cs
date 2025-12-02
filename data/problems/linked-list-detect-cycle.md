# Linked List Cycle

## Metadata

- ID: linked-list-detect-cycle
- Difficulty: Easy/Medium
- Category: Linked List
- Patterns: [fast-slow-pointer]
- Similar: Linked List Cycle II

## Problem Summary

Given head of a linked list, return true if it has a cycle.

## Constraints

- 0 ≤ nodes ≤ 10^5

## Intuition

Use Floyd’s Cycle Detection:  
slow moves 1 step, fast moves 2.  
If they meet → cycle.

## Approaches

### 1. Hash Set

Store visited nodes.  
Too much memory.

### 2. Fast/Slow Pointer (Optimal)

If cycle exists, slow and fast meet.

## Algorithm

1. slow = head, fast = head
2. Move slow=slow->next, fast=fast->next->next
3. If equal → cycle
4. If fast hits NULL → no cycle

## C++ Solution

```cpp
bool hasCycle(ListNode *head) {
    if (!head || !head->next) return false;

    ListNode* slow = head;
    ListNode* fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
Complexity
Time: O(n)

Space: O(1)

Common Pitfalls
Not checking fast->next
```
