module.exports = {
  data: {
    name: "learn-coding",
  },
  async execute(interection, _) {
    await interection.reply({
      content: `${interection.values[0]}`,
    });
  },
};
