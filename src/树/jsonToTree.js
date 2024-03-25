let arr = [
{id:1,name:'部门A',parentId:0},
{id:2,name:'部门B',parentId:0},
{id:3,name:'部门C',parentId:1},
{id:4,name:'部门D',parentId:1},
{id:5,name:'部门E',parentId:2},
{id:6,name:'部门F',parentId:3},
{id:7,name:'部门G',parentId:2},
{id:8,name:'部门H',parentId:4}
]
res=[
{
    id:1,
    children:[
        {id:2},
        {
            id:3,
            children:[
                {
                    id:4,
                    children:[
                        {
                            id:5
                        }
                    ]
                },
            ]
        }
    ]
},
{
    id:6
}
]
function js2Tree(data){
    let res=[]
    if(!Array.isArray(data)){
        return res
    }
    const map=new Map()
    data.forEach(item=>{
        map.set(item.id,item)
    })
    data.forEach(item=>{
        const parent=map.get(item.parentId)
        if(parent){
            (parent.children || []).push(item)
        }else{
            res.push(item)
        }
    })
    return res
}
console.log(js2Tree(arr))