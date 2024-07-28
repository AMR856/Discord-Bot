const Balance = require("../../schemas/balance");

const balanceFetcher = function (client, mainPath) {
  client.fetchBalance = async (userId, guildId) => {
    let storedBalance = await Balance.findOne({
      userId: userId,
      guildId: guildId,
    });
    if (!storedBalance) {
      storedBalance = await new Balance({
        userId: userId,
        guildId: guildId,
      });
      await storedBalance
        .save()
        .then(async (balance) => {
          console.log(
            `Balance created for the user ${balance.userId}\nin the server ${balance.guildId}`
          );
        })
        .catch(console.error);
      return storedBalance;
    } else return storedBalance;
  };
};

module.exports = balanceFetcher;
