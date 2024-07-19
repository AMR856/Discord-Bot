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
      } catch(err) {
        console.log(err);
        await interection.reply({
          content: 'Something went wrong while executing the command',
          ephemeral: true
        });
      }
    } else if(interection.isButton()) {
      const { buttons } = client;
      const { customId } = interection;
      const button = buttons.get(customId);
      if (!button) {
        return new Error('There is no code for this button');
      }
      try {
        await button.execute(interection, client);
      } catch(err) {
        console.log(err);
      }
    }
  }
}
