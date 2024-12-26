# Discord Bot

<p align="center">
  <img src="./imgs/discord-logo-icon-editorial-free-vector.jpg" alt="Discord Logo" />
</p>

This is a Discord bot built using **Node.js**, **Discord.js**, **MongoDB**, and **Mongoose**.

The bot provides various functionalities for managing server members, tracking their activity, and executing fun and interactive commands.

## Features

### User Commands
- **getAvatar**: Retrieve a user's avatar.
- **youtube**: Get video's link from Youtube.
- **balance**: Check your balance.
- **pay**: Transfer balance to another user.
- **ban**: Ban a user from the server.
- **kick**: Kick a user from the server.
- **timeout**: Temporarily timeout a user.
- **random-joke**: Get a random joke.
- **reactor**: Make a message that will count the reactions on it.
- **embed**: Send an embed message contains all the information about a user.

### Server Status Commands
- **dnd**: Set Do Not Disturb status to the bot.
- **listening**: Set the bot's listening status.
- **online**: Set the bot's status to online.
- **idle**: Set the bot's status to idle.
- **ping**: Check the bot's ping.

### Registration Commands
- **register**: Register a user.

## Getting Started

### Prerequisites

Before running the bot, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- A valid Discord bot token (you need to handle this yourself)
- MongoDB instance for database operations

### Setup

1. Clone the repository to your local machine.
2. Navigate to the bot's directory.

   ```bash
   cd src
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

### Running the Bot

To run the bot, use the following command inside the `src` directory:

```bash
node .
```

**Note:** The bot will not run without a valid Discord bot token. Please make sure to add your bot token to the appropriate configuration file or environment variable.

## Acknowledgement

Thank [`FusionTerror`](https://www.youtube.com/@FusionTerror) for his tutorials on Discord bots.