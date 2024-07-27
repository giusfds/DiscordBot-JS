/**
 * Load environment variables from a .env file into process.env.
 */
require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

/**
 * Array of command objects to be registered on the server.
 * These commands will appear in the / menu.
 * @type {Array<Object>}
 */
const commands = [
  {
    name: "add",
    description: "Soma de números",
    options: [
      {
        name: "first-number",
        description: "O primeiro número",
        type: ApplicationCommandOptionType.Number,
        require: false,
        autocomplete: true
      },
      {
        name: "second-number",
        description: "O segundo número",
        type: ApplicationCommandOptionType.Number,
        require: false,
        autocomplete: true
      },
    ],
  },
];

/**
 * REST API instance for making requests to Discord's API.
 * @type {REST}
 */
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

/**
 * Registers slash commands to the Discord server.
 * This is an immediately invoked function expression (IIFE) to asynchronously register commands.
 */
(async () => {
  try {
    console.log("Registering slash commands");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
})();
