const loader = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      console.log("success");
      resolve(url);
    };
    image.onerror = () => {
      reject();
    };
    image.src = url;
  });
};
const preLoad = () => {
  const preLoaderArray = [];
  imgs.forEach((url) => {
    preLoaderArray.push(loader(url));
  });
  return Promise.allSettled(preLoaderArray);
};
