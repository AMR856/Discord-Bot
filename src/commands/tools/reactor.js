const { SlashCommandBuilder, ConnectionService } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reactor")
    .setDescription("Returns reactions.")
    .addStringOption(option => 
      option.setName("input")
        .setDescription("The input string")
        .setRequired(true)),
  async execute(interaction, _) {
    // userInput -> type:emoji    
    const userInput = interaction.options.getString("input");
    const message = await interaction.reply({
      content: "React here!",
      fetchReply: true,
    });

    if (userInput.includes(':')) {
      const splittedUserInput = userInput.split(':');
      const time = splittedUserInput[0] * 1 * 1000;
      const emoji = splittedUserInput[1];
      message.react(emoji);
  
      const filter = (reaction, user) => {
        return reaction.emoji.name == emoji && user.id == interaction.user.id;
      };
      const collector = message.createReactionCollector({ filter, time: time });
      collector.on('collect', (reaction, user) => {
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
      });
      collector.on("end", collected => {
        console.log(`Collected ${collected.size} items`);
      });
    } else {
      const splittedUserInput = userInput.split('.');
      const max = splittedUserInput[0] * 1; 
      const time = splittedUserInput[1] * 1 * 1000;
      const filter = (_, user) => {
        return user.id = interaction.user.id; // reaction.emoji.name == emoji
      }
      message
      .awaitReactions({filter, max : max, time: time, errors: ['time']})
      .then(() => console.log("We collected them all"))
      .catch((collected) => {
        console.log(`At the end of the times we only collected ${collected.size}`);
      })
    }
  },
};
