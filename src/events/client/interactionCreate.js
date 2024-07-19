module.exports = {
  'name': 'interactionCreate',
  async execute(interection, client){
    if (interection.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interection;
      const command = commands.get(commandName);
      if (!command)
        return;
      try{
        await command.execute(interection, client);
      }catch(err){
        console.log(err);
        await interection.reply({
          content: 'Something went wrong while executing the command',
          ephemeral: true
        });
      }
    }
  }
}
