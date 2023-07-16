// 类型判断 要求能判断正则 Date等
let Common = {
  getType: function (obj) {
    // null判断
    if (obj === null) {
      return "null";
    }
    // 除了基本类型外的类型判断
    // 比如 [object Number]  => number
    const get_type = (obj) => {
      return Object.prototype.toString
        .call(obj)
        .replace("[object", "")
        .replace("]")
        .toLowerCase();
    };
    // 基本数据类型用typeof判断
    return typeof obj === "object" ? get_type(obj) : typeof obj;
  },
};
