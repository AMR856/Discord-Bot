module.exports = {
  data: {
    name: 'get-github'
  },
  async execute(interection, _) {
    await interection.reply({
      content: 'https://github.com/AMR856'
    });
  }
};
