module.exports = {
  data: {
    name: 'learn-coding'
  },
  async execute(interection, _) {
    await interection.reply({
      content: `You selected ${interection.values[0]}`
    });
  }
};
