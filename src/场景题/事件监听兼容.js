function addEvent(obj, type, handle){
    try{
        // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        obj.addEventListener(type, handle, false);
    }catch(e){
        try{
            // IE8.0及其以下版本
            obj.attachEvent("on" + type, handle);
        }catch(e){
            obj["on" + type] = handle;
        }
    }
}