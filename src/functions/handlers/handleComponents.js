const fs = require("fs");

const componentsHandler = function (client, mainPath) {
  client.handleComponents = () => {
    const componentsFolder = fs.readdirSync(`${mainPath}/components`);
    for (const folder of componentsFolder) {
      const componentsFiles = fs
        .readdirSync(`${mainPath}/components/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const { buttons } = client;
      switch (folder) {
        case "buttons":
          for (const file of componentsFiles) {
            const button = require(`${mainPath}/components/${folder}/${file}`);
            buttons.set(button.data.name, button);
          }
        default:
          break;
      }
    }
  };
};

module.exports = componentsHandler;
