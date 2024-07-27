/**
 * Load environment variables from a .env file into process.env.
 */
require("dotenv").config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

/**
 * Bot instance for interacting with Discord.
 * @type {Client}
 */
const client = new Client({
  intents: [
    // Bot permissions
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

/**
 * Array of role objects that can be assigned via a button.
 * Each object contains the role ID and label.
 * @type {Array<{id: string, label: string}>}
 */
const roles = [
  {
    id: '1263309461066612828',
    label: 'R6'
  },
  {
    id: '1263309406297395253',
    label: 'puc'
  },
  {
    id: '1263309318137315339',
    label: 'DA'
  },
];

/**
 * Event listener that triggers when the bot is ready.
 * Sends a message with buttons to assign roles.
 * @param {Client} c - The client instance.
 */
client.on('ready', async (c) => {
  try {
    const channel = await client.channels.cache.get('1264030735833108560');
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: 'Escolha o seu cargo abaixo.',
      components: [row],
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
});

/**
 * Log in to Discord with the provided bot token.
 */
client.login(process.env.TOKEN);
