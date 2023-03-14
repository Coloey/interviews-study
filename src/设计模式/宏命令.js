let quitCommand = {
    execute: function(){
        console.log('退出')
    }
}
let loginCommand ={
    execute: function(){
        console.log('登录')
    }
}
let MacroCommand = function(){
    return {
        commandList:[],
        add: function(command){
            this.commandList.push(command)
        },
        execute:function(){
            for(let i=0;command;command = this.commandList[i]){
                command.execute()
            }
            
        }
        
    }
}
let macroCommand = new MacroCommand()
macroCommand.add(quitCommand)
macroCommand.add(loginCommand)
macroCommand.execute()