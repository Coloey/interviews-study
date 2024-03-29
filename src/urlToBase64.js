function imgLoaded(img){
  return new Promise((resolve,reject) => {
    if(!img.complete) {
      img.onload = () => {
        resolve()
      }
      img.onerror = reject;
    }else {
      resolve()
    }
  })
}
// img转换为base64
function toBase64(img) {
  return new Promise((resolve,reject) => {
    imgLoaded(img)
    .then(() => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/png"));
    })
    .catch(reject)
  })
}
// blob 转base64
const file2Base64 = (blob) => {
  return new Promise((resolve,reject) => {
    const fr = new FileReader()
    fr.onload = (e) => {
      resolve(e.target?.result)
    }
    fr.error = reject
    fr.readAsDataURL(blob)
  })
};

// 将base64编码的数据转换为URL时，可以使用URL.createObjectURL()方法
const base64Data = "data:image/png;base64,iVBORw0KG...";

const blob = URL.createObjectURL(Base64ToBlob(base64Data));
const imgElement = document.createElement("img");
imgElement.src = blob;
function Base64ToBlob(base64Data) {
  const parts = base64Data.split(",");
  const contentType = parts[0].split(":")[1].split(";")[0];
  const byteCharacters = atob(parts[1]);
  const byteArrays = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }
  //Uint8Array将元素转为8位无符号整数形式
  const blob = new Blob([new Uint8Array(byteArrays)], { type: contentType });
  return blob;
}
// base64转为
