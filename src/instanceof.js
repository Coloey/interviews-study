function myInstanceof(left,right) {
    let prototype = right.prototype
    left = left.__proto__
    while(true){
        if(!left)return false
        if(left == prototype)return true
        left = left.__proto__
    }
}