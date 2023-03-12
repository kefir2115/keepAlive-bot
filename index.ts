const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const PORT = 8080;

var servers = [];

keepalive();
setInterval(() => {
    keepalive();
}, 60000);

function keepalive() {
    servers.forEach(e => {
        let bot = mineflayer.createBot({
            host: e,
            username: 'ALIVE_BOT_'+Math.round(Math.random()*999)
        });
        bot.on('connect', () => {
            setTimeout(() => {
                bot.chat("Keeping server alive!");
                bot.quit();
            }, 10000);
        });
    });
}
app.get("/keepAlive/:serverId", (req, res) => {
    let serverId = req.params.serverId;
    
    if(servers.includes(serverId)) {
        servers.splice(servers.indexOf(serverId), 1);
    } else {
        servers.push(serverId);
    }
    res.send(""+servers.includes(serverId));
});
app.listen(PORT);