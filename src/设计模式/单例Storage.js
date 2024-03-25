function StorageBase(){}
StorageBase.prototype.getItem = function(key) {
    return localStorage.getItem(key)
}
StorageBase.prototype.setItem = function(key, value) {
    return localStorage.setItem(key, value)
}
const Storage = (function(){
    let instance = null;
    return function(){
        if(!instance) {
            instance = new StorageBase()
        }
        return instance
    }
})()
const storage1 = new Storage()
const storage2 = new Storage()
// true
console.log(storage1 === storage2)