const fs = require("fs");

module.exports = function createsettings() {
    var settings = {
        token: "",
        prefix: "",
        host: "",
        version: "1.8.9",
        hub_command: "",
        anti_afk_command: "",
        Chat_anti_AFK: false,
        Chat_anti_AFK_delay: false,
        LoginDelay: 100,
        BankBot: false,
        EnableAdminRole: true,
        AdminRoleID: ""
    }
    
    
    const data = JSON.stringify(settings, null, 2);
    fs.writeFileSync("./settings.json", data, "utf-8", (err) => {
        if (err) {
            console.log(`Error Creating Settings File: ${err}`)
        }
    })
};