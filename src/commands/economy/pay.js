const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { authUser } = require(`../../auth`);
const Balance = require("../../schemas/balance");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("Pays the user an amount of money")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The name of the user")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of money you want to pay")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (!(await authUser(interaction))) return;
    const userStoredBalance = await client.fetchBalance(
      interaction.user.id,
      interaction.guild.id
    );
    const selectedUser = interaction.options.getUser("target");
    let amount = interaction.options.getNumber("amount");

    if (selectedUser.bot || selectedUser.id === interaction.user.id) {
      return interaction.reply({
        content: "You can't send a balance to yourself or a bot",
        ephemeral: true,
      });
    } else if (amount < 1.0) {
      return interaction.reply({
        content: "You can't send money this low 😂😂!!",
        ephemeral: true,
      });
    } else if (amount > userStoredBalance.balance) {
      return interaction.reply({
        content: "You don't have this amount of money, you're broke lol 🐳",
        ephemeral: true,
      });
    }
    const selectedUserBalance = await client.fetchBalance(
      selectedUser.id,
      interaction.guild.id
    );
    amount = await client.toFixedNumber(amount);

    await Balance.findOneAndUpdate(
      {
        _id: userStoredBalance._id,
      },
      {
        balance: await client.toFixedNumber(userStoredBalance.balance - amount),
      }
    );
    await Balance.findOneAndUpdate(
      {
        _id: selectedUserBalance._id,
      },
      {
        balance: await client.toFixedNumber(
          selectedUserBalance.balance + amount
        ),
      }
    );
    await interaction.reply({
      content: `${interaction.user.username} sent ${amount} to ${selectedUser.username}`,     
    });
  },
};
