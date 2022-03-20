const Discord = require('discord.js');
const fs = require("fs")

module.exports = {
    name: "add",
    description: "This Command allows you to add an AFK ALT",
    execute(message, args, Settings, LoginQueue, AFKAlts, DB){

        function Embed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('GREEN')
            Embed.setTitle(`\`SUCCESS\``)
            Embed.setDescription(Message)
            Embed.setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
            Embed.setTimestamp()
            message.channel.send(Embed)
        }

        if(3 >= args.length){
            let NoArgs = new Discord.MessageEmbed()
            NoArgs.setColor('YELLOW')
            NoArgs.setTitle(`\`No Input\``)
            NoArgs.setDescription(`\`Usage: ${Settings.prefix}add <IGN> email password [mojang/microsoft]\``)
            NoArgs.setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
            NoArgs.setTimestamp()
              message.channel.send(NoArgs)
              message.delete()
        }
        else{
            if(args[3] == "mojang" || args[3] == "microsoft"){
                let found = false;
                let AFKkeys = Object.keys(AFKAlts);
                AFKkeys.forEach((element) =>{
                    if(AFKAlts[element].username == args[1]){
                        found = true;
                    }
                })
                if(!found){
                    message.guild.channels.create(args[0], {
                        type: "text",
                        permissionOverwrites: [
                            {
                              id: message.author.id,
                              allow: ['VIEW_CHANNEL'],
                           }
                        ]

                    }).then((newChannel) => {
                        AFKAlts[newChannel.id] = {
                            username: args[0],
                            email: args[1],
                            password: args[2],
                            AuthType: args[3],
                            discordID: newChannel.id
                        }
                        console.log("A new Console Client has been added to queue");
                        LoginQueue.push(AFKAlts[newChannel.id])
                        let Added = new Discord.MessageEmbed()
                        Added.setColor('GREEN')
                        Added.setTitle(`\`Success\``)
                        Added.setDescription(`\`${args[0]} Added\``)
                        Added.setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
                        Added.setTimestamp()
                          message.channel.send(Added)
                        console.log("Saving Changes");
                        let data = JSON.stringify(AFKAlts, null, 2);
                        fs.writeFileSync("AFKAlts.json", data, (err) =>{
                            if(err){
                                throw err;
                            }
                        })
                    });
                }
                else{
                    Embed(`\`Alt Already Added\``);
                }

            }
            else{
                Embed(`\`${Settings.prefix}add <IGN> email password [mojang/microsoft]\``);
            }
        }

    }
}
