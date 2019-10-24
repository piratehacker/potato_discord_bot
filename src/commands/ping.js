function ping(o) {
    o.msg.channel.send('> Pong! :ping_pong:');
}

module.exports = {
    name: 'ping',
    execute: ping,
    description: 'Ping pong!',
    aliases: ['pingpong']
}