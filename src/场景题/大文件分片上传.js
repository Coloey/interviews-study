async function uploadFile(file) {
  const CHUNK_SIZE = 1 * 1024 * 1024;
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE); //总分片数
  // 生成唯一文件ID
  const fileId = Math.random().toString(36).substring(2);
  for (let currentChunk = 0; currentChunk < totalChunks; currentChunk++) {
    const start = currentChunk * CHUNK_SIZE;
    const end =
      start + CHUNK_SIZE >= file.size ? file.size : start + CHUNK_SIZE;
    const chunk = file.slice(start, end);
    // 构建FormData对象
    const formData = new FormData();
    formData.append("file", chunk);
    formData.append("file", fileId);
    formData.append("currentChunk", currentChunk);
    formData.append("totalChunks", totalChunks);
    await axios.post("/upload", formData);
  }
  //上传完成后 发送请求给服务器合并分片
  await axios.post("/merge", { file, fileName: file.name, totalChunks });
}
