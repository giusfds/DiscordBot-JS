require('dotenv').config();
const { Client, IntentsBitField } = require("discord.js");

// bot instant
const client = new Client({
  intents: [
    // bot perms
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// enevt list onlie
client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online`)
})


client.on('messageCreate', (message) => {
// to verify is not a bot
  if (message.author.bot) return;

// if the message 'TINOCO' was send, the bot will respond with ...
  if (message.content === 'tinoco') {
    message.reply('Vai toma no cu piranha!');
  }

// if the message 'vamo gremio' was send, the bot will respond with ...
  if (message.content === 'vamo gremio') {
    message.reply('VAMO GREMIOOOOO!');
  }
})

// to know if was a / command
client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'tinoco') {
    interaction.reply('Vai toma no cu piranha!')
  }
})

client.login(process.env.TOKEN);
