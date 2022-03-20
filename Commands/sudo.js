const Discord = require('discord.js');
module.exports = {
    name: "sudo",
    description: "Send desired message/command",
    execute(message, args, ALTProccessOBJ){
        function Embed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('GREEN')
            Embed.setTitle(`\`Sudo\``)
            Embed.setDescription(Message)
            .setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
            .setTimestamp()
            message.channel.send(Embed);
            message.delete()
        }
        if(args.length == 0){1
            let NoArgs = new Discord.MessageEmbed()
            NoArgs.setColor('YELLOW')
            NoArgs.setTitle(`\`Error\``)
            NoArgs.setDescription(`\`No input provided\``)
            NoArgs.setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
            NoArgs.setTimestamp()
            message.channel.send(NoArgs)
            message.delete()
        }
        else{
        let Keys = Object.keys(ALTProccessOBJ);

        Keys.forEach((elem) =>{
           ALTProccessOBJ[elem].send({message: args.join(" ")});
        })

        Embed(`\`Sent: ${args.join(" ")}\``)
        }
    }
}
