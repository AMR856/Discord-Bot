const { SlashCommandBuilder } = require("discord.js");
const { authUser } = require(`../../auth`);
const axios = require("axios");

let videoArray = [];
module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube-2")
    .setDescription("Returns a video from the channel providing the channel id")
    .addStringOption((option) =>
      option
        .setName("ychannel")
        .setDescription("The name of the YouTube channel")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("maxlimit")
        .setDescription("The number of the videos to be retrieved")
        .setRequired(true)
    ),
  async execute(interaction, _) {
    if (!(await authUser(interaction))) return;
    const message = await interaction.deferReply({ fetchReply: true });
    let requiredChannel, channelId;
    const channelName = interaction.options._hoistedOptions[0]["value"];
    const currentChannel = message.channel;
    const videosLimit = interaction.options._hoistedOptions[1]["value"];
    const channelNameSearch = channelName.replace(/ /g, "%20");
    const apiUrlRequiredChannel = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY_2}&q=${channelNameSearch}&type=channel&part=snippet`;
    axios
      .get(apiUrlRequiredChannel)
      .then((response) => {
        const objects = response["data"]["items"];
        for (const obj of objects) {
          if (obj["snippet"]["title"] === channelName) {
            requiredChannel = obj;
            break;
          }
        }
        let videosMessage = "";
        channelId = requiredChannel["snippet"]["channelId"];
        const apiUrlRequiredVideos = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY_2}&channelId=${channelId}&order=date&part=snippet&type=video&maxResults=${videosLimit}`;
        axios
          .get(apiUrlRequiredVideos)
          .then(async (response) => {
            const videos = response["data"]["items"];
            let videosNamesAndUrl = {};
            let counter = 1;
            for (const video of videos) {
              videoName = video["snippet"]["title"];
              videoArray.push(videoName);
              videosMessage =
                videosMessage +
                counter +
                " - " +
                videoName +
                " - " +
                video["snippet"]["thumbnails"]["medium"]["url"] +
                "\n";
              videosNamesAndUrl[`${counter}___` + videoName] =
                video["id"]["videoId"];
              counter += 1;
            }
            await currentChannel.send(videosMessage);
            try {
              const filter = (_) => true;
              const collected = await currentChannel.awaitMessages({
                filter,
                max: 1,
                time: 8000,
                errors: ["time"],
              });
              const reply = collected.first();
              const key = Object.keys(videosNamesAndUrl).filter((k) =>
                k.includes(`${reply.content}___`)
              );
              await message.channel.send(
                `https://www.youtube.com/watch?v=${videosNamesAndUrl[key]}`
              );
            } catch (err) {
              console.log(err);
              await message.channel.send(`Couldn't do it for some reason`);
            }
            await interaction.editReply({ content: "Choice which video:" });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
