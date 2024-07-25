module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    // console.log('Again');
    console.log(`${client.user.tag} logged into discord`);
  },
};
