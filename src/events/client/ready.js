module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    // client.checkVideos();
    console.log(`${client.user.tag} logged into discord`);
  },
};
