/**
 * Created by yiguo on 3/13/2017.
 */
function ListNode(val) {
     this.val = val;
     this.next = null;
}
function LList(head){
    let _self = this;
    _self.find = find;
    _self.findPrevious = findPrevious;
    _self.insert = insert;
    _self.remove = remove;
    _self.display = display;
    _self.reverse = reverse;
    _self.reverseFromMtoN = reverseMtoN;

    _self.head = new ListNode(head);
    let arg = arguments;
    if (arg && arg.length>1){
        for(let i=1;i<arg.length;i++){
            _self.insert(arg[i],arg[i-1]);
        }
    }

}
function find(item) {
    let _self = this;
    let curNode = _self.head;
    while(curNode.val != item){
        curNode = curNode.next;
    }
    return curNode;
}

function findPrevious(item) {
    let _self = this;
    let curNode = _self.head;
    while(!(curNode.next == null) && (curNode.next.val != item)){
        curNode = curNode.next;
    }
    return curNode;
}

function insert(newEle, item) {
    let _self = this;
    let newNode = new ListNode(newEle);
    let curNode = _self.find(item);
    newNode.next = curNode.next;
    curNode.next = newNode;
    return _self.head;
}
function remove(item) {
    let _self = this;
    let preNode = _self.findPrevious(item);
    let curNode = _self.find(item);
    preNode.next = curNode.next;
    curNode.next = null;
    return _self.head;
}
function display(){
    let _self = this;
    let curNode = _self.head;
    while (curNode != null){
        console.log(curNode.val);
        curNode = curNode.next;
    }
}
function reverse(){
    let _self = this;
    let preNode = _self.head;
    if(preNode == null) return null;
    let curNode = preNode.next;
    let temp;
    while (curNode != null){
        temp = curNode.next;
        curNode.next = preNode;
        preNode = curNode;
        curNode = temp;
    }
    _self.head.next = null;
    _self.head = preNode;
    return this;
}
function reverseMtoN(m,n){
    let _self = this;
    let curNode = _self.head;
}
