const User = require('./schemas/user');

const authUser = async function authUser(interaction) {
  const user = await User.findOne({ userId: interaction.user.id });
  if (!user) {
    await interaction.reply({
      content: "You're not registered idiota!!"
    });
  } else
  return true;
};

module.exports = {authUser};
