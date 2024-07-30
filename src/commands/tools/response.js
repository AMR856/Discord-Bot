const { SlashCommandBuilder } = require("discord.js");
const { authUser } = require(`../../auth`);
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("response")
    .setDescription("Returns a random thing"),
  async execute(interaction, _) {
    if (!(await authUser(interaction))) return;

    /**
    Normal Reply
    await interaction.reply({
      content: 'Normal reply'
    });

    Only the user can see this one
    await interaction.reply({
      content: 'Only the user can see it',
      ephemeral: true
    });

    Edited Reply
    // await interaction.reply({
    //   content: 'Normal reply'
    // });
    // await wait(2000);
    // await interaction.editReply({
    //   content: 'edited reply',
    //   ephemeral: true
    // });

    Deferred Reply
    const message = await interaction.deferReply({ fetchReply: true });
    console.log(message);
    await wait(5000);
    await interaction.editReply({ content: 'Lol I got something'});

    Followed Up replies
    await interaction.reply({
      content: 'A reply here'
    });
    await wait(2000);
    await interaction.followUp({
      content: 'This is a follow up'
    });

    Deleting Replies
    await interaction.reply({
      content: 'A reply here'
    });
    await wait(2000);
    await interaction.deleteReply();


    await interaction.reply({
      content: 'A reply here'
    });
    const message = await interaction.fetchReply();
    console.log(message);
*/
    const locales = {
      pl: "Something",
      de: "Something else",
      "en-US": "Hello world!",
    };
    console.log(interaction.locale);
    await interaction.reply({
      content: locales[interaction.locale] ?? "Hello world!!",
    });
  },
};
