const { SlashCommandBuilder, ConnectionService } = require("discord.js");
const { authUser } = require("../../auth");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("reactor")
    .setDescription(
      `number_of_seconds:your_reaction
      maximum_number_of_reactions.number_of_seconds`
    )
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input string")
        .setRequired(true)
    ),
  async execute(interaction, _) {
    // userInput -> type:emoji
    if (!(await authUser(interaction))) return;
    const userInput = interaction.options.getString("input");
    const message = await interaction.reply({
      content: "React here!",
      fetchReply: true,
    });

    if (userInput.includes(":")) {
      const splittedUserInput = userInput.split(":");
      const time = splittedUserInput[0] * 1 * 1000;
      console.log(time);
      const emoji = splittedUserInput[1];
      message.react(emoji);
      let counter = -1;
      const filter = (reaction, user) => {
        // return reaction.emoji.name == emoji && user.id == interaction.user.id;
        return true;
      };
      const collector = message.createReactionCollector({ filter, time: time });
      collector.on("collect", (reaction, user) => {
        counter++;
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
      });
      collector.on("end", (collected) => {
        console.log(
          `Collected ${collected.size} items\nAnd the number of put reactions is ${counter}`
        );
      });
    } else if (userInput.includes(".")) {
      const splittedUserInput = userInput.split(".");
      const max = splittedUserInput[0] * 1;
      const time = splittedUserInput[1] * 1 * 1000;
      const filter = (_, user) => {
        return (user.id = interaction.user.id); // reaction.emoji.name == emoji
      };
      message
        .awaitReactions({ filter, max: max, time: time, errors: ["time"] })
        .then(() => console.log("We collected them all"))
        .catch((collected) => {
          console.log(
            `At the end of the times we only collected ${collected.size}`
          );
        });
    }
  },
};
