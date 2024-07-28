const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const Parser = require("rss-parser");
const parser = new Parser();

module.exports = (client) => {
  client.checkVideos = async () => {
    const data = await parser
      .parseURL(process.env.CHANNEL_URL)
      .catch(console.error);
    // const rawData = fs.readFileSync(`${__dirname}/../../json/data.json`);
    // const jsonData = JSON.parse(rawData);
    // console.log(data);
    // if (jsonData.id !== data.items[0].id) {
    //   fs.writeFileSync(
    //     `${__dirname}/../../json/data.json`,
    //     JSON.stringify({
    //       id: data.items[0].id,
    //     })
    //   );
    // }
    const guild = await client.guilds.fetch('997492093201166416').catch(console.error);
    const channel = await guild.channels.fetch('1266915706448908329').catch(console.error);

    const {title, link, id, author} = data.items[0];
    const embed = new EmbedBuilder({
      title: title,
      url: link,
      timestamp: Date.now(),
      image: {
        url: `https://img.youtube.com/vi/${id.slice(9)}/maxresdefault.jpg`
      },
      author: {
        name: author,
        iconURL: client.user.displayAvatarURL(),
        url: 'https://github.com/AMR856'
      },
      footer: {
        text: client.user.tag,
        iconURL: client.user.displayAvatarURL()
      }
    });
    await channel.send({embeds: [embed], content: 'Hey I got a video'}).catch(console.error)
  };
};
