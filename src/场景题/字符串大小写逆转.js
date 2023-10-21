let strs = "AbCde";
strs.replace(/[a-zA-Z]/g, (content) => {
  return content.toUpperCase() === content
    ? content.toLowerCase()
    : content.toUpperCase();
});
