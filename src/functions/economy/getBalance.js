const Balance = require("../../schemas/balance");

const balanceFetcher = function (client, mainPath) {
  client.getBalance = async (userId, guildId) => {
    const storedBalance = await Balance.findOne({
      userId: userId,
      guildId: guildId,
    });
    if (!storedBalance) return false;
    else return storedBalance;
  };
};

module.exports = balanceFetcher;
