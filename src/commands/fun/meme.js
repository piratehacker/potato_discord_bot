var Discord = require('discord.js');
var fetch = require('node-fetch');

var categories = {
    'starwars': 'PrequelMemes',
    'history': 'HistoryMemes',
    'default': 'Memes',
    'animals': 'AdviceAnimals',
    'dank': 'DankMemes',
    'verticalcomics': 'vertical',
    'crappydesign': 'CrappyDesign'
}

function getUsage(prefix, wrongArgs=true) {
    var embed = new Discord.RichEmbed()
        .setTitle('Correct usage:')
        .addField('`'+prefix+'meme random`', 'Gives a meme from random category')
        .addField('`'+prefix+'meme [category]`', 'Gives a meme')
        .addField('Available categories:', '`'+Object.keys(categories).join('`/`')+'`');

    if(wrongArgs) {
        embed.setAuthor('Error: Wrong arguments')
    }
    return embed;
}

function getUrl(sort, category) {
    var url = `https://reddit.com/r/${category}/${sort}.json`;
    return url;
}

async function meme(o) {
    if(o.args[0] == 'help') {
        return o.msg.channel.send(getUsage(o.prefix, false));
    }
    

    var category, categoryText;
    if(o.args.length < 1) { // Default category
        category = 'Memes';
        categoryText = 'memic';
    } else if(o.args[0] == 'random') {  // Random category
        var categoriesArray = Object.keys(categories);
        var index = Math.floor(Math.random()*categoriesArray.length);
        category = categories[categoriesArray[index]];
        categoryText = 'random';
    } else if(Object.keys(categories).indexOf(o.args[0]) == -1) { // Wrong category
        return o.msg.channel.send(getUsage(o.prefix));
    } else { // Custom category
        category = categories[o.args[1]];
        categoryText = category;
    }

    var waiting = await o.msg.channel.send('> Please wait...');;
    console.log(category);

    fetch(getUrl('hot', category))
    .then(r=>r.json())
    .then(async r=>{
        var memes = r.data.children;
        var index = Math.floor(Math.random() * memes.length)
        var meme = memes[index].data;
        
        var embed = new Discord.RichEmbed()
            .setTitle(meme.title)
            .setAuthor(o.msg.author.username+'\'s '+categoryText+' meme', o.msg.author.avatarURL)
            .setFooter('Posted by '+meme.author + ' | `'+o.prefix+'meme help` for list of categories')
            .setColor('RANDOM')
            .setImage(meme.url);

        waiting.delete();
        var sent = await o.msg.channel.send(embed);
        sent.react('👍');
        sent.react('👎');
    });
}

module.exports = {
    name: 'meme',
    execute: meme,
    description: 'Shows a meme from reddit',
    aliases: ['memes'],
    usage: '<sort:hot/top/new> <optional:category> '
}