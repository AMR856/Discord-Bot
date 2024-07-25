const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { authUser } = require(`../../auth`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member from the server")
    .addUserOption((option) =>
      option
        .setName("target") // Changed from "TW" to "target"
        .setDescription("The member you would like to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for the ban")
    ),
  async execute(interaction, client) {
    if (!(await authUser(interaction))) return;

    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!member) {
      await interaction.reply({
        content: `Member is not here`,
      });
      return;
    }
    if (!reason) reason = "No reason provided";
    const embed = new EmbedBuilder()
      .setTitle("Banning Message")
      .setDescription(reason)
      .setColor(0x304adb)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
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
      .setURL("https://github.com/AMR856");

    let gotError = 0;
    await member
      .ban({
        deleteMessageDays: 1,
        reason: reason,
      })
      .catch(async (error) => {
        if (error.code === 50013) {
          await interaction.reply({
            content: "You can't kick someone higher in permissions",
          });
        }
        gotError = 1;
      });

    if (gotError) return;

    await user.send({ embeds: [embed] }).catch(async (error) => {
      if (error.code === 50007) {
        console.log("Can't send message to the user");
      }
    });
    await interaction.reply({
      content: `${user.tag} has been banned`,
    });
  },
};
