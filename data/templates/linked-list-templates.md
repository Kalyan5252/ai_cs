Linked List Templates

// Reverse a Linked List
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

// Detect Cycle (Floyd’s Algorithm)
bool hasCycle(ListNode _head) {
if (!head || !head->next) return false;
ListNode_ slow = head;
ListNode\* fast = head;
while (fast && fast->next) {
slow = slow->next;
fast = fast->next->next;
if (slow == fast) return true;
}
return false;
}
