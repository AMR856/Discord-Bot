module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // client.checkVideos();
    console.log(`${client.user.tag} logged into discord`);
  },
};
