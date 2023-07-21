var TV = {
    open: function(){
        console.log('open')
    } ,
    close: function(){
        console.log('close')
    }

}
var createCommand = function(receiver){
    var excute = function(){
        return receiver.open()
    }
    var undo = function(){
        return receiver.close()
    }
    return {
        excute:excute,
        undo: undo
    }
}
var setCommand = function(command){
    document.getElementById('excute').onclick = function(){
        command.excute()//open
    }
    document.getElementById('undo').onclick = function(){
        command.undo()//close
    }

}
setCommand(createCommand(Tv))