const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");
const { authUser } = require("../../auth");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("permissons")
    .setDescription("This command require a permission")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("new_role_name:channel_name")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, _) {
    if (!(await authUser(interaction))) return;
    const adminRoleId = "1264711942501564517";
    const userInput = interaction.options.getString("input");
    const splittedInput = userInput.split(":");
    const roleName = splittedInput[0];
    const channelName = splittedInput[1];
    if (channelName === undefined) {
      await interaction.reply({
        content: process.env.SECRET_MESSAGE,
      });
      return;
    }

    const { roles } = interaction.member;
    const role = await interaction.guild.roles
      .fetch(adminRoleId)
      .catch(console.error);
    const newRole = await interaction.guild.roles
      .create({
        name: roleName,
        permissions: [
          PermissionsBitField.Flags.KickMembers,
          PermissionsBitField.Flags.BanMembers,
        ],
      })
      .catch(console.error);

    if (roles.cache.has(adminRoleId)) {
      await interaction.deferReply({
        fetchReply: true,
      });
      await roles.remove(role).catch(console.error);
      await interaction.editReply({
        content: `Remove ${role.name} role from you`,
      });
    } else {
      await interaction.reply({
        content: `You don't have the role ${role.name}`,
      });
    }
    await roles.add(newRole).catch(console.error);
    // await newRole.setPermissions([PermissionsBitField.Flags.BanMembers]).catch(console.error);

    const channel = await interaction.guild.channels.create({
      name: channelName,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: newRole.id,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    });
    await channel.permissionOverwrites
      .edit(newRole.id, { SendMessages: false })
      .catch(console.error);
  },
};
