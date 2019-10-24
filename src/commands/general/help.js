var Discord = require('discord.js');

function help(o) {
    /*
    var embeds = {};
    var categories = [];
    for(var cmd of o.client.commands.array()) {
        if(categories.indexOf(cmd.category) == -1) {
            categories.push(cmd.category);
            var categoryName = cmd.category.charAt(0).toUpperCase() + cmd.category.slice(1);
            var embed = new Discord.RichEmbed()
                .setTitle('**'+categoryName+'**')
                .setColor('#ecf241')
            embeds[cmd.category] = embed;
            console.log('Added category '+cmd.category);
        }

        
        var title = '`'+o.prefix+cmd.name+'`'
        if('aliases' in cmd) {
            title += ' (alias: `' + cmd.aliases.join('`, `') + '`)';
        }
        embeds[cmd.category].addField(title, cmd.description);
    }
    o.msg.channel.send('```List of commands: ```');
    Object.keys(embeds).forEach(function(key) {
        o.msg.channel.send(embeds[key]);
    });*/

    var embed = new Discord.RichEmbed()
        .setTitle('**Bot help**')
        .setDescription('*Coming soon...*')
        .setColor('#ecf241');
        o.msg.channel.send(embed);
}

module.exports = {
    name: 'help',
    execute: help,
    description: 'Shows help'
}