const Discord = require('discord.js');
module.exports = {
    name: "help",
    description: "Help",
    execute(message, Settings){
        let Embed = new Discord.MessageEmbed()
        Embed.setColor('WHITE')
        Embed.setThumbnail(`https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
        Embed.setTitle(`\`Alt\``)
        Embed.setDescription(`

          \`Prefix: ${Settings.prefix}\`

          \`add: <IGN> <EMAIL> <PASSWORD> <MICROSOFT/MOJANG>\`
          \`remove: REMOVE ALT\`
          \`sudo:  <COMMAND>\`
          \`kill:  SHUT DOWN ALT\`
          \`relog: RELOG ALT\`
          \`force: IN GAME CMDS\`
          \`tpyes: ACCEPT TP & SET HOME\``)
          Embed.setFooter(`Alt`, `https://cdn.discordapp.com/attachments/749022112832028752/825701871096037417/at.png`)
          Embed.setTimestamp()
          message.channel.send(Embed)
          message.delete();
    }
}
