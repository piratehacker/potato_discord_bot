var Discord = require('discord.js');
var fs = require('fs');
var config = require('../config.json');
var auth = require('../auth.json');
var s = require('../strings.json');

//#region COMMANDS
var client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(__dirname+'/commands').filter(file=>file.endsWith('.js'));

for(var file of commandFiles) {
    var command = require(__dirname+ '/commands/'+file);
    client.commands.set(command.name, command);
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
    
    command.execute({msg: msg, args: args, client: client});
});

client.login(auth.token);
//#endregion