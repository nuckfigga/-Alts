const Discord = require('discord.js');
module.exports = {
    name: "relog",
    description: "This command will relog your alt",
    execute(message, ALTProccessOBJ, AFKAlts, LoginQueue){
        function Embed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('GREEN')
            Embed.setTitle(`\`RELOG\``)
            Embed.setDescription(Message)
            message.channel.send(Embed);
        }
        let inqueue = false;
        if(LoginQueue.length != 0){
            LoginQueue.forEach(element => {
                if(element.discordID == message.channel.id){
                  let Login1 = new Discord.MessageEmbed()
                  Login1.setColor('GREEN')
                  Login1.setTitle(`\`Success\``)
                  Login1.setDescription(`\`Relogging alt\``)
                  Login1.setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
                  Login1.setTimestamp()
                    message.channel.send(Login1)
                    message.delete();
                    inqueue = true;
                }
            });
        }
        if(!inqueue){
            if(Object.keys(AFKAlts).indexOf(message.channel.id) == -1){
              let NoID = new Discord.MessageEmbed()
              NoID.setColor('RED')
              NoID.setTitle(`\`Error\``)
              NoID.setDescription(`\`Use desired alt channel\``)
              NoID.setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
              NoID.setTimestamp()
              message.channel.send(NoID)
              message.delete();
            }
            else{
                if(Object.keys(ALTProccessOBJ).indexOf(message.channel.id) == -1){
                    LoginQueue.push(AFKAlts[message.channel.id]);
                    let Login = new Discord.MessageEmbed()
                    Login.setColor('GREEN')
                    Login.setTitle(`\`Success\``)
                    Login.setDescription(`\`Relogging alt\``)
                    Login.setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
                    Login.setTimestamp()
                      message.channel.send(Login)
                      message.delete();
                }
                else{
                    Embed(`\`ALREADY LOGGED IN\``)
                }
            }
        }
        message.delete();
    }
}
