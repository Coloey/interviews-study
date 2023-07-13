// 转换为base64
function toBase64(img){
    const canvas = document.createElement('canvas')
    canvas.width=img.width
    canvas.height=img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img,0,0,canvas.width,canvas.height)
    const base64=canvas.toDataURL('image/png')
    return base64
}
// url转换为png格式
function getImage(url){
    const img = new Image()
    /*
    想跨域获取图片 服务端需要配合 Access-Control-Allow-Origin
    */
    img.crossOrigin = 'anonymous'
    img.src=url
    return new Promise((resolve,reject) => {
        img.onload = () => {
            const base64Data = toBase64(img)
            const blob = convertBase64ToBlob(base64Data, 'image/png')
            resolve(blob)
        }
    })
}