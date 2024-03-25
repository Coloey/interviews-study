async function request(url,options){
    try{
        const res=await fetch(url,options)
        if(!res.ok){
            throw Error(res.statusText)
        }
        const data=await res.json()
        return data
    }catch(e){
        console.error(e)
        throw e
    }
}