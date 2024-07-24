const fs = require("fs");

const commandEventsHandler = function (client, mainPath) {
  client.handleEvents = () => {
    const eventFolders = fs.readdirSync(`${mainPath}/events`);
    for (const folder of eventFolders) {
      const eventFiles = fs
        .readdirSync(`${mainPath}/events/${folder}`)
        .filter((file) => file.endsWith(".js"));
      switch (folder) {
        case "client":
          for (const file of eventFiles) {
            const event = require(`${mainPath}/events/${folder}/${file}`);
            if (event.once) {
              client.once(event.name, (...args) => {
                event.execute(...args, client);
              });
            } else {
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
            }
          }
        default:
          break;
      }
    }
  };
};

module.exports = commandEventsHandler;
