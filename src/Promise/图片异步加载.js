function loadImg(src){
    return new Promise((resolve,reject)=>{
        let img = new Image()
        img.onload=function(){
            console.log("图片加载成功")
            resolve(img)
        }
        img.error=function(){
            reject(new Error(`Can not load ${src}`))
        }
        img.src=src       
    })
}
function timeout(){
    return new Promise((reject)=>{
        setTimeout(()=>{
            reject("超时")
        },3000)
    })
}
//判断图片加载是否超时
Promise.race([loadImg,timeout])
.then((data)=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})