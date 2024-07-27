/**
 * Load environment variables from a .env file into process.env.
 */
require("dotenv").config();
const { Client, IntentsBitField, ActivityType } = require("discord.js");

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
 * Normalizes a string by removing diacritical marks (accents).
 * This function uses Unicode normalization to decompose combined characters
 * and removes diacritical marks using a regular expression.
 *
 * @param {string} str - The string to be normalized.
 * @returns {string} The normalized string without diacritical marks.
 */
function normalizeContent(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Event handler for the 'ready' event.
 * This event is triggered when the client is successfully logged in
 * and ready to start interacting with the Discord API.
 *
 * @event Client#ready
 * @param {Client} c - The client instance that is ready.
 */
client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online`);

  client.user.setActivity({
    name: "Tola",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  })
});

/**
 * Event handler for the 'interactionCreate' event.
 * This event is triggered when an interaction is created, such as a button press
 * or a slash command.
 *
 * @event Client#interactionCreate
 * @param {Interaction} interaction - The interaction that was created.
 */
client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) {
      // Handle slash commands
      if (!interaction.isChatInputCommand()) return;

      // Handle 'add' slash command
      if (interaction.commandName === "add") {
        const num1 = interaction.options.get("first-number")?.value;
        const num2 = interaction.options.get("second-number")?.value;
        interaction.reply(`A soma é ${num1 + num2}`);
      }
    }

    // Handle button interactions
    await interaction.deferReply({ ephemeral: true });

    // Check if the role exists
    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "Eu não achei esse cargo",
      });
      return;
    }

    // Check if the member has the role
    const hasRole = interaction.member.roles.cache.has(role.id);
    if (hasRole) {
      await interaction.editReply(`Você já tem o cargo: ${role}`);
      return;
    }

    // Assign the role to the user
    await interaction.member.roles.add(role);
    await interaction.editReply(`Você agora possui o cargo: ${role}`);
  } catch (error) {
    console.log(error);
  }
});

/**
 * Handles incoming messages from the client.
 *
 * @param {Message} message - The message object from the Discord client.
 */
client.on("messageCreate", (message) => {
  // Verify the message is not from a bot
  if (message.author.bot) return;

  const normalizedContent = normalizeContent(message.content.toLowerCase());

  // Respond to specific messages
  if (normalizedContent === "tinoco") {
    message.reply("Vai toma no cu piranha!");
  }

  if (normalizedContent === "vamo gremio") {
    message.reply("VAMO GREMIOOOOO!");
  }
});

/**
 * Log in to Discord with the provided bot token.
 */
client.login(process.env.TOKEN);
