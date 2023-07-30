const Task = (result, isSuccess = true) => {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isSuccess) {
          console.log(`success: ${result}`);
          resolve(result);
        } else {
          console.log(`error: ${result}`);
          reject(result);
        }
      }, 1000);
    });
};

execute([Task("A"), Task("B"), Task("X", false), Task("C")]).then(
  (resultList) => {
    // 这里期望打印 ["A", "B", null, "C"]
    console.log(resultList);
  }
);
async function execute(tasks = []) {
  const resultList = [];
  for (let task of tasks) {
    try {
      resultList.push(await task());
    } catch (e) {
      resultList.push(null);
    }
  }
  return resultList;
}
//或者用reduce
const execute = (tasks) => {
  return tasks.reduce(
    (pre, curr) =>
      pre.then((resultList) => {
        return new Promise((resolve) => {
          curr()
            .then((res) => {
              resolve(resultList.concat(res));
            })
            .catch(() => {
              resolve(resultList.concat(null));
            });
        });
      }),
    Promise.resolve([])
  );
};
