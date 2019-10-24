var Discord = require('discord.js');


function info(o) {
    var embed = new Discord.RichEmbed()
        .setTitle('**Bot info**')
        .setColor('#ecf241')
        .setFooter('© Jakub')
        .addField('About', '*Potato* is a special Discord bot pwned by Potatos')
        .addField('Features', 'Moderation, Music, Memes, Jokes, Games, Global Emoji and many more!')
        .addField('If you need help', 'Type `>help` and you\'ll get a list of commands!');
    o.msg.channel.send(embed);
}

module.exports = {
    name: 'info',
    execute: info,
    description: 'About the bot',
    aliases: ['about']
}