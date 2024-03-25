function iteratorGenerator(list) {
    let idx=0;
    let len=list.length;
    return {
        next:function(){
            // 索引没超过集合长度 done为false
            let done = idx >= len
            // done 为false继续取值
            let value = !done ? list[idx++] :undefined
            return {
                done,
                value
            }
        }
    }
}
let iterator = iteratorGenerator(['1','2','3'])
iterator.next()
iterator.next()
iterator.next()