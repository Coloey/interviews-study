/*
下一个更大元素
输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
输出: [-1,3,-1]
*/
const nextMax = (nums1,nums2) => {
    // 根据nums2元素在nums1中找到对应索引
    let map=new Map()
    for(let x of nums2){
        let i = nums1.indexOf(x)
        if(i){
            map.set(x,i)
        }
    }
    let st=[]
    let res=new Array(nums.length).fill(-1)
    for(let i=0;i<nums2.length;i++){
        while(st.length && st[st.length-1]<nums2[i]) {
            let num=st.pop()//栈顶元素小于当前元素 则当前元素为栈顶元素的下一个最大值
            if(map.has(num))res[map.get(num)]=nums2[i]
        }
        st.push(nums2[i])
    }
    return res
}
// 下一个更大元素II
const nextMax2=(nums)=>{
    const n =nums.length
    let res=new Array(n).fill(-1)
    // 记录nums中每个数字的坐标 后面才能为res填充数据找到相对应的位置
    let st=[]
    for(let i=0;i<n*2;i++){
        while(st.length && nums[st[st.length-1]]<nums[i%n]) {
            res[st.pop()] = nums[i%n]
        }
        st.push(i%n)
    }
    return res
}
// 接雨水
/*
给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
*/
// 方法一：双指针
const trap = (height) =>{
    // 每一列雨水的高度取决于该列左侧最高和右侧最高柱子中最矮的柱子的高度，记录每列左边最高高度和右边最高高度
    //用数组记录左右最高高度，则下一次去的最高高度为max(maxLeft[i-1],height[i])
    let n=height.length
    let maxLeft=new Array(n).fill(0)
    let maxRight = new Array(n).fill(0)
    maxLeft[0]=height[0]
    maxRight[n-1]=height[n-1]
    for(let i=1;i<n;i++){
        maxLeft[i]=Math.max(maxLeft[i-1],height[i])
    }
    for(let i=n-2;i>=0;i--){
        maxRight[i]=Math.max(maxRight[i+1],height[i])
    }
    let res=0;
    let cnt;
    for(let i=0;i<n;i++){
        // 每根柱子课装水高度为最小那根减去自身高度
        cnt=Math.min(maxLeft[i],maxRight[i])-height[i]
        res+=cnt;
    }
    return res;
}
// 方法二：单调栈
const trap2 = (height) => {
   // 每个可装水的面积为w*h,w为左右柱子的宽度，也就是位置索引之差，高度为min(l,r),所以遇大一个凹槽，nums[i]>st.top(),nums[i]为
    // r,st.pop(),st.top()为l,h=min(l,r)-mid,并且遇到相同高度的要继续入栈，因为求宽度时最要拿到的r是最右边的
    let st=[]
    let res=0;
    for(let i=0;i<height.length;i++){
        while(st.length && height[st[st.length-1]]<height[i]){
            let mid=st.pop()
            if(st.length) {
                let h=Math.min(height[i],height[st[st.length-1]]) - height[mid];
                let w=i-st[st.length-1]-1
                res+=h*w
            }
        }
        st.push(i)
    }
    return res
}
// 有效括号
function isValid(str){
    let st=[]
    for(let i=0;i<str.length;i++){
        let c=s[i]
        switch (c){
            case '(':
                st.push(')');
                break;
            case '[':
                st.push(']');
                break;
            case '{':
                st.push('}');
                break;
            default:
                if(st[st.length-1]!==c){
                    return false;
                }
        }
    }
    return st.length===0
}
//队列实现栈
let MyStack = function(){
    this.que=[]
}
MyStack.prototype.push=function(x){
    this.que.push(x)
}
MyStack.prototype.pop = function(){
    let size=this.que.length
    while(size-- > 1){
        this.que.push(this.que.shift())
    }
    return this.que.shift()
}
MyStack.prototype.top=function(){
    //弹出的即是栈顶元素
    const x = this.pop()
    //补回弹出的元素
    this.que.push(x)
    return x
}
MyStack.prototype.empty=function(){
    return !this.que.length
}