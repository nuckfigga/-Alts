const Discord = require('discord.js');
module.exports = {
    name: "kill",
    description: "This will turn off any AFKing alt",
    execute(message, ALTProccessOBJ, Settings, dontrelog){
        function Embed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('GREEN')
            Embed.setTitle(`\`KILL\``)
            Embed.setDescription(Message)
            Embed.setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
            Embed.setTimestamp()
            message.channel.send(Embed);
        }

        if(Object.keys(ALTProccessOBJ).indexOf(message.channel.id) != -1){
            dontrelog.push(message.channel.id)
            ALTProccessOBJ[message.channel.id].kill()
            Embed(`\`ALT KILLED\``)
        }
        else{Embed(`\`NO CHANNEL LINKED\``)}
        message.delete();
    }
}
