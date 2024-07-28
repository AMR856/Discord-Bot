const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { authUser } = require(`../../auth`);
const { channelId } = require("@gonetone/get-youtube-id-by-url");
const Parser = require("rss-parser");
const parser = new Parser();
const spawn = require("child_process").spawn;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Returns a video from youtube")
    .addStringOption((option) =>
      option
        .setName("ychannel")
        .setDescription("The name of the YouTube channel")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("dchannel")
        .setDescription("The name of the discord channel")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("videonumber")
        .setDescription("The number of the video")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (!(await authUser(interaction))) return;
    let channelURL = "";
    let message = await interaction.deferReply({ fetchReply: true });
    const uint8arrayToString = function (data) {
      return String.fromCharCode.apply(null, data);
    };
    const channelName = interaction.options._hoistedOptions[0]["value"];
    const pythonExecutable = "/home/ameralnas/discord_bot/venv/bin/python3";
    const myPythonScript =
      "/home/ameralnas/discord_bot/src/python-script/driver_script_2.py";
    const scriptExecution = spawn(pythonExecutable, [
      myPythonScript,
      channelName,
    ]);

    scriptExecution.stdout.on("data", (data) => {
      channelURL = uint8arrayToString(data);
      channelId(channelURL)
        .then(async (id) => {
          const discordChannelName =
            interaction.options._hoistedOptions[1]["value"];
          const guild = await client.guilds
            .fetch("997492093201166416")
            .catch(console.error);
          let channel = guild.channels.cache.find(
            (ch) => ch.name === discordChannelName
          );
          if (!channel) {
            channel = await interaction.guild.channels.create({
              name: discordChannelName,
            });
          }
          const youtubeData = await parser
            .parseURL(`https://youtube.com/feeds/videos.xml?channel_id=${id}`)
            .catch(console.error);
          const videoNumber =
            interaction.options._hoistedOptions[2]["value"];
          const { title, link, author } =
            youtubeData.items[videoNumber * 1];
          const videoId = youtubeData.items[videoNumber * 1]['id']
          console.log(title, link, videoId, author);
          const embed = new EmbedBuilder({
            title: title,
            url: link,
            timestamp: Date.now(),
            image: {
              url: `https://img.youtube.com/vi/${videoId.slice(
                9
              )}/maxresdefault.jpg`,
            },
            author: {
              name: author,
              iconURL: client.user.displayAvatarURL(),
              url: "https://github.com/AMR856",
            },
            footer: {
              text: client.user.tag,
              iconURL: client.user.displayAvatarURL(),
            },
          });
          await channel
            .send( { embeds: [embed] })
            .catch(console.error);
          message = "Hey I got the video";
          await interaction.editReply({ content: message });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    scriptExecution.stderr.on("data", async (data) => {
      console.log(uint8arrayToString(data));
      message = "Failed while getting the channel";
      await interaction.editReply({ content: message });
    });

    // scriptExecution.on("exit", (code) => {
    //   console.log("Process quit with code : " + code);
    // });
  },
};
