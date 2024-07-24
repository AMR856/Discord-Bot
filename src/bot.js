const dotenv = require("dotenv");
dotenv.config();
const token = process.env.token;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const mongoose = require('mongoose');
const { Guilds, GuildMessages, GuildMessageReactions } = GatewayIntentBits;
const intentsArray = [Guilds, GuildMessages, GuildMessageReactions];
// 32767 -> Allowing all intents
const client = new Client({ intents: intentsArray });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandsArray = [];
client.objectArray = new Array;
client.charsArray = new Array;
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
client.getChars();
(async () => {
  await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).catch(console.error);
})();