const Balance = require("../../schemas/balance");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if(message.author.bot) return;
    const randomAmount = Math.random() * 0.4 + 0.3;
    const storedBalance = await client.fetchBalance(
      message.author.id,
      message.guildId
    );
    await Balance.findOneAndUpdate(
      { _id: storedBalance._id },
      {
        balance: await client.toFixedNumber(
          storedBalance.balance + randomAmount
        ),
      }
    );
  },
};
