module.exports = {
  data: {
    name: 'get-linkedin'
  },
  async execute(interection, _) {
    await interection.reply({
      content: 'https://www.linkedin.com/in/amr-alnas-64a4ab244/'
    });
  }
};
