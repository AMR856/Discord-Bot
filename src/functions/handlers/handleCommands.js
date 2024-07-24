const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commandHandleAdder = function (client, mainPath) {
  client.handleCommands = async () => {
    const { commands, commandsArray } = client;
    const commandsFolders = fs.readdirSync(`${mainPath}/commands`);
    for (const folder of commandsFolders) {
      const commandsFiles = fs
        .readdirSync(`${mainPath}/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandsFiles) {
        const command = require(`${mainPath}/commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandsArray.push(command.data.toJSON());
        console.log(`Command ${command.data.name} was added to the bot`);
      }
    }
    const clientId = process.env.CLIENT_ID;
    const guildId = process.env.GUILD_ID;
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log("Started refereshing application (/) commands");
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commandsArray,
      });
      console.log("Succesfully refershed applicatoin (/) commands");
    } catch (err) {
      console.log(err);
    }
  };
};

module.exports = commandHandleAdder;
