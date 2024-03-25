// 递归
function createObject(str) {
    let res = {};
    let keys = str.split('.')
    res[keys[0]] = {}
    //let curr = res[keys[0]]//res[keys[0]]={res[keys[1]]=res[keys[2]]}
    const dfs = (i, obj) => {
        if (!obj[keys[i]]) {
            obj[keys[i]] = {}
            if (i + 1 < keys.length) {
                dfs(i + 1, obj[keys[i]])
            }
        }
        return obj[keys[i]]
    }
    dfs(1, res[keys[0]])
    return res;
}
let res = createObject('aaa.bbb.ccc.ddd')
//数组
function process(input) {
    const chain = input.split('.')
    let temp = {}
    for (let i = 0; i < chain.length; i++) {
        const k = chain[i]
        temp[k] = temp[k] ? temp[k] : {}
        temp = temp[k]
    }
    return res
}
console.log(process('aaa.bbb.ccc.ddd'))
//返回结果
{
    aaa: {
        bbb: {
            ccc: {
                ddd: {}
            }
        }
    }
}
//多个字符
let input = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
}
// 递归
const fn2 = (obj) => {
    const keys = Object.keys(obj)
    const res = {}
    for (const key of keys) {
        const chain = key.split('.')
        let temp = res;
        for (let i = 0; i < chain.length; i++) {
            const k = chain[i]
            //temp[k]没有值,undefind或null就取后面的 到最后一个就取值
            temp[k] = temp[k] ?? (i === chain.length - 1 ? obj[key] : {})
            //console.log(temp[k])
            temp = temp[k]
        }
    }
    return res;
}
// 循环
const fn3 = (obj) => {
    const keys = Object.keys(obj)
    const res = {}
    const dfs = (i, temp, chain) => {
        if (obj[keys[i]]) {
            return obj[keys[i]];
        } else {
            temp[keys[i]] = {}
            if (i + 1 < chain.length) {
                dfs(i + 1, temp[keys[i]])
            }
        }
        return temp[keys[i]]
    }
    for (const key of keys) {
        const chain = key.split('.')
        for (let k of chain) {
            res[k] = {}
            dfs(0, res[k], chain)
        }
    }
    return res;
}
console.log(fn3(input))