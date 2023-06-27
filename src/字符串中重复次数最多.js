function findMaxStr(str) {
  let res = {};
  let maxCnt = 0,
    maxStr = "";
  for (let i = 0; i < str.length; i++) {
    if (!res[str[i]]) {
      res[str[i]] = 1;
    } else {
      res[str[i]]++;
      if (res[str[i]] > maxCnt) {
        maxStr = str[i];
        maxCnt = res[str[i]];
      }
    }
  }
  console.log(maxStr, maxCnt);
}
findMaxStr("isisodcpcjckclc");
