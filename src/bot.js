const dotenv = require("dotenv");
dotenv.config();
const token = process.env.token;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.buttons = new Collection();
client.commandsArray = [];
const mainPath = `${process.env.HOME}/${process.env.FOLDER_NAME}/src`;
const functionFolders = fs.readdirSync(`${mainPath}/functions`);
for (const folder of functionFolders) {
  const functionsFiles = fs
    .readdirSync(`${mainPath}/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionsFiles) {
    const functionName = require(`${mainPath}/functions/${folder}/${file}`);
    functionName(client, mainPath);
  }
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
