class LRU{
    constructor(max){
        this.map=new Map();
        this.max=max;
    }
    get(key){
        //把最近一次访问的移动到最前面 重新set
        if(this.map.has(key)){
            const val=this.map.get(key)
            this.map.delete(key)
            this.map.set(key,val)
            return val
        }
        return -1;
    }
    set(key,val){
        // 判断该元素是否已经存在于对列中
        if(this.map.has(key)){
            this.map.set(key,val)
            return;
        }
        //判断当前队列是否已经超过容量，超过则要把最久未被使用的元素移出队列
        if(this.map.size>=this.max){
            this.map.delete(this.map.keys().next())
            this.map.set(key,val)
        }
    }
}