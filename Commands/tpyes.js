const Discord = require('discord.js');
module.exports = {
    name: "tpyes",
    description: "This command will accept a tp request",
    execute(message, ALTProccessOBJ){
        function Embed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('GREEN')
            Embed.setTitle(`\`Success\``)
            Embed.setDescription(Message)
            Embed.setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
            Embed.setTimestamp()
            message.channel.send(Embed);
          }
        if(Object.keys(ALTProccessOBJ).indexOf(message.channel.id) != -1){
            ALTProccessOBJ[message.channel.id].send({message: "/tpyes"});
            Embed(`\`Request Accepted\``)
            setTimeout(() =>{
                try{
                    ALTProccessOBJ[message.channel.id].send({message: "/sethome afk"});
                }catch(err) {console.error(err)}
            }, 15000)
        }
        else{
            let NoID = new Discord.MessageEmbed()
            NoID.setColor('RED')
            NoID.setTitle(`\`Error\``)
            NoID.setDescription(`\`Use desired alt channel\``)
            NoID.setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
            NoID.setTimestamp()
            message.channel.send(NoID)}
        message.delete();
    }
}
