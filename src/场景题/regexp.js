let re = new RegExp('html|css')
console.log(/(html|css)/.test('htmla'))//应该把方括号改成花括号就对了
console.log(/(html|css)/.test('cssa'))
console.log(/(html|css)/.test('js'))
//利用正则提取方法和参数，下面这个要求拿到SayHi和args
const str = 'obj.someMethod.sayHi(args)'
let re2 = /\.(\w+)\((\w+)\)/
console.log(str.match(re2))