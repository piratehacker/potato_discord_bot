var Discord = require('discord.js');
var fs = require('fs');
var config = require('../config.json');
var auth = require('../auth.json');
var s = require('../strings.json');

//#region COMMANDS
var client = new Discord.Client();
client.commands = new Discord.Collection();

const dirs = fs.readdirSync(__dirname+'/commands');

for(var dir of dirs) {
    var categoryDir = fs.readdirSync(__dirname+'/commands/'+dir).filter(file=>file.endsWith('.js'));
    for(var file of categoryDir) {
        var command = require(__dirname+ '/commands/'+dir+'/'+file);
        command.category = dir;
        client.commands.set(command.name, command);
    }
}
//#endregion


//#region BOT
client.on('ready', ()=>{
    console.log('[D] Bot ready')
});

client.on('message', (msg)=>{
    if(!msg.content.toLowerCase().startsWith(config.prefix) || msg.author.bot) return;
    var args = msg.content.slice(config.prefix.length).split(/ +/);
    var cmd = args.shift().toLowerCase();

    var command = client.commands.get(cmd) || client.commands.find(thisCmd=>'aliases' in thisCmd && thisCmd.aliases.includes(cmd)   );

    if(!command) {
        return msg.channel.send(s.unknown_command);
    }
    
    command.execute({msg: msg, args: args, client: client, prefix: config.prefix});
});

client.login(auth.token);
//#endregion