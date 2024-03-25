var entry = {
    a: {
        b: {
            c: {
                dd: 'abcdd'
            }
        },
        d: {
            xx: 'adxx'
        },
        e: 'ae'
    }
}

// 要求转换成如下对象
var output = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
}
const fn = (obj, parentKey, result) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            let keyName = parentKey ? parentKey + '.' + key : key;
            if (typeof obj[key] === 'object') {
                fn(obj[key], keyName, result)
            } else {
                result[keyName] = obj[key]
            }
        }
    }
    return result;
}
console.log(fn(entry, '', {}))
// 扁平对象嵌套
let input = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
}
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
console.log(fn2(input))