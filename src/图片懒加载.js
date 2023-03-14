//使用document.body.clientHeight获取可视区域高度，使用element.getBoundingClientRect()直接得到元素相对浏览器的top值
function lazyLoad() {
    let viewHeight = document.body.clientHeight;
    let imgs = document.querySelectorAll("img").dataset.src
    imgs.forEach(img => {
        let { top,bottom }=img.getBoundingClientRect()
        if(top<viewHeight&&bottom>0){
            img.src=img.dataset.src
            img.removeAttribute('data-src')
        }
    })
}
function throttle(fn,delay){
    let pre=new Date.now()
    return function(){
        let context = this
        let args = arguments
        let now = new Date.now()
        if(now-pre>=delay){
            fn.apply(context,args)
            pre=now
        }
    }
}
//InterSectionObserver
const imgs = document.querySelectorAll("img").dataset.src
let observer = new IntersectionObserver((entries,self) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            let img = entry.target
            let realSrc = img.dateset.src
            if(realSrc){
                img.src = img.dateset.src
                img.removeAttribute('data-src')
            }
            self.unobserve(entry.target)
        }
    })
},config)
imgs.forEach((img)=>{
    observer.observe(img)
})