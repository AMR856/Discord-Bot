const { SlashCommandBuilder } = require("discord.js");
const Guild = require("../../schemas/guild");
const { authUser } = require("../../auth");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("Database Command"),
  async execute(interaction, /*Amr_Alnas*/) {
    if (!(await authUser(interaction))) return;
    let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
    if (!guildProfile) {
      guildProfile = await new Guild({
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcon: interaction.guild.iconURL()
          ? interaction.guild.iconURL()
          : "None.",
      });
      await guildProfile.save().catch(console.error);
      await interaction.reply({
        content: `Server Name: ${interaction.guild.name}`
      });
    } else {
      await interaction.reply({
        content: `Server ID: ${interaction.guild.id}`
      });
    }
    // console.log(guildProfile);
  },
};
