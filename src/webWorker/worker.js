self.onmessage = function (event) {
    let data=event.data;
    //后台执行任务
    let result=doSomeWork(data)
    self.postMessage(result)
}
function doSomeWork(data){
    return data*2
}