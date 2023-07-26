/*
[345],[4,6,2]=>[7,0,8]
[99999],[999]=>899001
由于输入的两个链表都是逆序存储数字的位数的，因此两个链表中同一位置的数字可以直接相加。

我们同时遍历两个链表，逐位计算它们的和，并与当前位置的进位值相加。具体而言，如果当前两个链表处相应位置的数字为 n1,n2n1,n2n1,n2，进位值为 carry\textit{carry}carry，则它们的和为 n1+n2+carryn1+n2+\textit{carry}n1+n2+carry；
*/
const addTwoNumbers = function(l1,l2){
    //记录新链表首尾节点
    let head=null,tail=null;
    let flag=0
    while(l1 || l2){
        const n1=l1 ? l1.val : 0;
        const n2=l2 ? l2.val : 0;
        const sum = n1+n2+flag
        if(!head){
            head=tail=new ListNode(sum%10)
        }else{
            tail.next=new ListNode(sum%10)
            tail=tail.next
        }
        flag=Math.floor(num/10)
        if(l1){
            l1=l1.next
        }
        if(l2){
            l2=l2.next
        }
    }
    if(flag>0){
        tail.next = new ListNode(flag)
    }
    return head;
}