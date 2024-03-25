/*
主线程 postMessage 通知 worker 线程
worker 线程 onMessage 方法接收到消息，去安排工作，完成工作后，用 postMessage 方法通知主线程
主线程 onMessage 方法就受到消息执行下一步操作
*/
let worker=new Worker('worker.js')
worker.onmessage=function(event){
    let result = event.data;
    console.log(result)
}
worker.postMessage(10);//向worker发送消息