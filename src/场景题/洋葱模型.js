async function middleware1(ctx, next) {
  console.log("middleware1 before");
  await next();
  console.log("middleware1 after");
}
async function middleware2(ctx, next) {
  console.log("middleware2 before");
  await next();
  console.log("middleware2 after");
}
async function middleware3(ctx, next) {
  console.log("middleware3 before");
  await next();
  console.log("middleware3 after");
}
async function onionModel(ctx, middlewares) {
  const dispatch = async (i) => {
    const middleware = middlewares[i];
    if (middleware) {
      await middleware(ctx, async () => {
        // 在函数中继续执行next()
        await dispatch(i + 1);
      });
    }
  };
  await dispatch(0);
}
const runMiddleWares = async () => {
  const middlewares = [middleware1, middleware2, middleware3];
  await onionModel({}, middlewares);
};
runMiddleWares();
