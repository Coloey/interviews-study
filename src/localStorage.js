class Storage {
  constructor(time) {
    this.time = maxAge;
  }
  set(key, val, maxAge) {
    let obj = {
      data: val,
      cTime: Date.now(),
      maxAge: maxAge || this.maxAge,
    };
    localStorage.setItem(key, JSON.stringify(obj));
  }
  get(key) {
    let item = localStorage.getItem(key);
    if (!item) {
      return null;
    }
    item = JSON.parse(item);
    let nowTime = Dat.now();
    if (item.maxAge && item.maxAge < nowTime - item.cTime) {
      this.remove(key);
      return null;
    } else {
      return item.data;
    }
  }
  remove(key) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}
