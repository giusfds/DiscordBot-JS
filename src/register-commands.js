require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

// All the functions to be registered on the server
// is gonna to appear on / menu, need to chenge on index function
const commands = [
  {
    name: 'add',
    description: 'soma de numeros',
    options: [
      {
        name: 'primeiro-number',
        description: 'the primeiro number',
        type: ApplicationCommandOptionType.Number,
        require: true
      },
      {
        name: 'segundo-number',
        description: 'the segundo number',
        type: ApplicationCommandOptionType.Number,
        require: true
      }
    ],
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Function to register the commands as slash commands
(async () => {
  try {
    console.log('Registering slash commands');

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
})();
