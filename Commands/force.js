const Discord = require('discord.js');
module.exports = {
    name: "force",
    description: "This Command allows you to force the bot to tpye something",
    execute(message, ALTProccessOBJ, args){
        function Embed(Message){
            let Force = new Discord.MessageEmbed()
            Force.setColor('GREEN')
            Force.setTitle(`\`Success\``)
            Force.setDescription(Message)
            Force.setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
            message.channel.send(Force)
            message.delete()
        }
        if(args.length == 0){1
          let NoArgs = new Discord.MessageEmbed()
          NoArgs.setColor('YELLOW')
          NoArgs.setTitle(`\`Warning\``)
          NoArgs.setDescription(`\`No input provided\``)
          NoArgs.setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
          NoArgs.setTimestamp()
          message.channel.send(NoArgs)
          message.delete()
        }
        else{
            if(Object.keys(ALTProccessOBJ).indexOf(message.channel.id) != -1){
                ALTProccessOBJ[message.channel.id].send({message: args.join(" ")});
                Embed(`\`${args.join(" ")}\``)
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
    }
