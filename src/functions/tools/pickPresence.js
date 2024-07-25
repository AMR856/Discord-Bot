const { ActivityType } = require('discord.js');
module.exports = (client) => {
  client.pickPresence = async() => {
    const options = [
      {
        type: ActivityType.Watching,
        text: 'Watching YouTube',
        status: 'online'
      },
      {
        type: ActivityType.Listening,
        text: 'Listening to Spotify and Commands',
        status: 'idle'
      },
      {
        type: ActivityType.Playing,
        text: 'Lemme play',
        status: 'dnd'
      }
    ];
    const option = Math.floor(Math.random() * options.length);
    client.user.setPresence({
      activities: [
        {
          name: options[option].text,
          type: options[option].type
        },
      ],
      status: options[option].status
    });
  }
}