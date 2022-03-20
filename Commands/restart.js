const Discord = require('discord.js');
module.exports = {
    name: "restart",
    description: "This command will restart the bot!",
    execute(message, ALTProccessOBJ){
        function Embed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('#49F477')
            Embed.setTitle(`\`RESTART\``)
            Embed.setDescription(Message)
            message.channel.send(Embed);
        }

        if(Object.keys(ALTProccessOBJ).indexOf(message.channel.id) == -1){
            Embed(`\`NO CHANNEL LINKED\``);
        }
        else{
            ALTProccessOBJ[message.channel.id].kill();
            Embed(`\`RESTARTING\``)
        }
    message.delete();
    }
}
