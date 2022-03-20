const Discord = require('discord.js');
const fs = require("fs")
module.exports = {
    name: "remove",
    description: "This Command allows you to remove an AFK ALT",
    execute(message, ALTProccessOBJ, AFKAlts, dontrelog){
        if(Object.keys(AFKAlts).indexOf(message.channel.id) == -1){
            let embed = new Discord.MessageEmbed();
            embed.setColor('#49F477')
            embed.setTitle(`\`REMOVE\``)
            embed.setDescription(`\`NO CHANNEL LINKED\``)
            message.channel.send(embed);
        }
        else{
            if(Object.keys(ALTProccessOBJ).indexOf(message.channel.id) != -1){
                console.log("killing alt")
                dontrelog.push(message.channel.id);
                ALTProccessOBJ[message.channel.id].kill();
                delete ALTProccessOBJ[message.channel.id];
            }
            console.log("deleting alt off of AFK List")
            delete AFKAlts[message.channel.id];
            console.log("Saving Changes");
            let data = JSON.stringify(AFKAlts, null, 2);
            fs.writeFile("AFKAlts.json", data, (err) =>{
                if(err){
                    throw err;
                }
            })
        }
        message.channel.delete();
    }
}
