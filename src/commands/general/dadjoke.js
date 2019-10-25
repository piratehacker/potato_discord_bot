var Discord = require('discord.js');
var fetch = require('node-fetch');

async function dadjoke(o) {
    var waiting = await o.msg.channel.send('> Please wait...');
    fetch(`https://reddit.com/r/DadJokes/hot.json`)
    .then(r=>r.json())
    .then(async r=>{
        var memes = r.data.children;
        var index = Math.floor(Math.random() * memes.length)
        var joke = memes[index].data;
        
        console.log(joke);

        var embed = new Discord.RichEmbed()
            .setTitle(joke.title)
            .setDescription(joke.selftext)
            .setAuthor(o.msg.author.username+'\'s dadjoke', o.msg.author.avatarURL)
            .setFooter('Posted by '+joke.author)
            .setColor('RANDOM');

        waiting.delete();
        var sent = await o.msg.channel.send(embed);
        sent.react('👍');
        sent.react('👎');
    });
}

module.exports = {
    name: 'dadjoke',
    execute: dadjoke,
    description: 'Gives a random dadjoke',
    aliases: ['pun']
}