//Importing dependencies
const Discord = require("discord.js");
const fs = require("fs")
const cp = require("child_process")

//Creating Discord bot client
var DB = new Discord.Client();


//Setting up command handler
DB.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./Commands/${file}`);

    DB.commands.set(command.name, command);
}

//Importing Settings file, Creating a new one if it doesnt exsist.
var Settings;
try {
    if(fs.existsSync("./settings.json")){
        const settingsdata = fs.readFileSync("./settings.json");
        Settings = JSON.parse(settingsdata);
    }
    else{
        console.log("SettingsFile doesn't exsist creating one...")
        const createsettings = require("./CreateSettings.js");
        createsettings();
        console.log("New Settings file was created open it and change the defaults and re run the discord bot")
        process.exit();
    }
} catch(err) {
    console.error(err);
    process.exit();
}
var LoginQueue = []
var  ALTProccessOBJ = {}

setInterval(() => {
    if(LoginQueue.length != 0){

        let SpawnArgs = LoginQueue.shift()
        if(Object.keys(SpawnArgs).indexOf("LoginCommand") == -1){
            ALTProccessOBJ[SpawnArgs.discordID] = cp.fork("MinecraftClient.js", [SpawnArgs.email, SpawnArgs.password, SpawnArgs.AuthTypem],
            { stdio: ['inherit', 'inherit', 'inherit', 'ipc']})
            BindEvents(ALTProccessOBJ[SpawnArgs.discordID], SpawnArgs.discordID, DB);
        }
        else{
            ALTProccessOBJ[SpawnArgs.discordID] = cp.fork("MinecraftClient.js", [SpawnArgs.email, SpawnArgs.password, SpawnArgs.AuthTypem, SpawnArgs.LoginCommand],
            { stdio: ['inherit', 'inherit', 'inherit', 'ipc']})
            BindEvents(ALTProccessOBJ[SpawnArgs.discordID], SpawnArgs.discordID, DB);
        }
    }
}, Settings.LoginDelay * 1000);

var dontrelog = []

function BindEvents(ALTProccess, discordID, DB){
    let ALTchannel = DB.channels.cache.get(discordID)
    ALTProccess.on("exit", (code) =>{
        console.log(`exit code: ${code}`)
            if(dontrelog.indexOf(discordID) == -1){
                console.log(`Error: ${code} restarting bot...`)
                try{
                    if(Object.keys(AFKAlts).indexOf(discordID) == -1){
                        console.log("Error: Alt Non-Existant")
                    }
                    else{
                        LoginQueue.push(AFKAlts[discordID])
                    }

                }catch(err){console.error(err)};


            }
            else{
                dontrelog.splice(dontrelog.indexOf(discordID), 1);
                delete ALTProccessOBJ[discordID]
                console.log("Alt not relogging")
            }
    })
    ALTProccess.on("message", (data) =>{
        try{
            let keys = Object.keys(data)
            if(keys.indexOf("embed") != -1){
                let embed = new Discord.MessageEmbed();
                embed.setColor('GREEN')
                embed.setTitle(data.embed);
                ALTchannel.send(embed);

            }
            else if(keys.indexOf("text") != -1){
                ALTchannel.send(data.text)
            }
            if(keys.indexOf("relog") != -1){
                if(data.relog){
                    ALTProccess.kill();
                }
                else{
                    dontrelog.push(discordID);
                    ALTProccess.kill()
                }
            }
        }catch(err) {console.error(err)}

    })
}


var AFKAlts = {};
try{
    if(fs.existsSync("./AFKAlts.json")){
        AFKAlts = JSON.parse(fs.readFileSync("./AFKAlts.json"));
        let AFKkeys = Object.keys(AFKAlts);
        AFKkeys.forEach((element) =>{
            LoginQueue.push(AFKAlts[element])
        })
    }
    else{
        console.log("AFKAlts.json was not found!");
    }
}catch(err){
    console.error(err);
}


//Called when the discord bot is ready
DB.on("ready",() => {
    console.log(`
  ██░ ██  ▄▄▄     ▄▄▄█████▓▓█████
 ▓██░ ██▒▒████▄   ▓  ██▒ ▓▒▓█   ▀
▒██▀▀██░▒██  ▀█▄ ▒ ▓██░ ▒░▒███
░▓█ ░██ ░██▄▄▄▄██░ ▓██▓ ░ ▒▓█  ▄
░▓█▒░██▓ ▓█   ▓██▒ ▒██▒ ░ ░▒████▒
▒ ░░▒░▒ ▒▒   ▓▒█░ ▒ ░░   ░░ ▒░ ░
▒ ░▒░ ░  ▒   ▒▒ ░   ░     ░ ░  ░
░  ░░ ░  ░   ▒    ░         ░  ░
░  ░  ░      ░  ░           ░  ░`);
});

function NoAdminRole(message){
    let Embed = new Discord.MessageEmbed();
    Embed.setColor('YELLOW')
    Embed.setTitle(`\`NO PERMISSION\``)
    message.channel.send(Embed);
    message.delete()
}


DB.on("message", async function(message){

    if(!message.content.startsWith(Settings.prefix) || message.author.bot) {return};

    const args = message.content.slice(Settings.prefix.length).split(" ");
    const command = args.shift().toLocaleLowerCase();
    try{
        if(command === "add"){
            DB.commands.get("add").execute(message, args, Settings, LoginQueue, AFKAlts, DB);
        }
        else if(command === "remove"){
            DB.commands.get("remove").execute(message, ALTProccessOBJ, AFKAlts, dontrelog);
        }
        else if(command === "force"){
            if(Settings.EnableAdminRole){
                if(message.member.roles.cache.has(Settings.AdminRoleID)){
                    DB.commands.get("force").execute(message, ALTProccessOBJ, args);
                }
                else{
                    NoAdminRole(message)
                }

            }
            else{
                DB.commands.get("force").execute(message, ALTProccessOBJ, args);
            }

        }
        else if(command === "restart"){
            DB.commands.get("restart").execute(message, ALTProccessOBJ)
        }
        else if(command === "kill"){
            DB.commands.get("kill").execute(message, ALTProccessOBJ, Settings, dontrelog);
        }
        else if(command === "reload"){
            DB.commands.get("reload").execute(ALTProccessOBJ, message, args);
        }
        else if(command === "tpyes"){
            DB.commands.get("tpyes").execute(message, ALTProccessOBJ)
        }
        else if(command === "relog"){
            DB.commands.get("relog").execute(message, ALTProccessOBJ, AFKAlts, LoginQueue);
        }
        else if(command === "chat"){
            DB.commands.get("chat").execute(message, args, ALTProccessOBJ, Settings)
        }
        else if(command === "help"){
            DB.commands.get("help").execute(message, Settings);
        }
        else if(command === "sudo"){
            DB.commands.get("sudo").execute(message, args, ALTProccessOBJ);
        }
        else if(command === "drain"){
            if(Settings.EnableAdminRole){
                if(message.member.roles.cache.has(Settings.AdminRoleID)){
                    DB.commands.get("drain").execute(message, ALTProccessOBJ, args, Settings);
                }
                else{
                    NoAdminRole(message)
                }
            }
            else{
                DB.commands.get("drain").execute(message, ALTProccessOBJ, args, Settings);
            }

        }
        else if(command === "addlogin"){
            DB.commands.get("addlogin").execute(message, args, ALTProccessOBJ, AFKAlts)
        }
    }catch(err){console.error(err);};


});
DB.on("ready", () => {
    DB.user.setActivity(`${Settings.host}`, { type: 'STREAMING', url: 'https://www.twitch.tv/ALT' })
});

DB.login(Settings.token);
