const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { authUser } = require(`../../auth`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Returns the balance of a user")
    .addUserOption((option) =>
      option.setName("target").setDescription("The name of the user")
    ),
  async execute(interaction, client) {
    if (!(await authUser(interaction))) return;
    const selectedUser =
      interaction.options.getUser("target") || interaction.user;
    const storedBalance = await client.getBalance(
      selectedUser.id,
      interaction.guild.id
    );

    if (!storedBalance) {
      return await interaction.reply({
        content: `${selectedUser.username} doesn't have a balance yet`,
        ephemeral: true,
      });
    } else {
      const embed = new EmbedBuilder()
        .setTitle(`${selectedUser.username}'s balance`)
        .setDescription("Here all the info about the balance")
        .setColor(0x304adb)
        .setImage(client.user.displayAvatarURL())
        .setThumbnail(interaction.user.displayAvatarURL())
        .setTimestamp(Date.now())
        .setAuthor({
          url: "https://github.com/AMR856",
          iconURL: interaction.user.displayAvatarURL(),
          name: interaction.user.tag,
        })
        .setFooter({
          iconURL: interaction.user.displayAvatarURL(),
          text: interaction.user.tag,
        })
        .addFields([
          {
            name: `$${storedBalance.balance}`,
            value: "\u200b",
          },
        ]);
      await interaction.reply({
        embeds: [embed],
      });
    }
  },
};
