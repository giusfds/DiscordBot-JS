require("dotenv").config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

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

// auto role by a button
const roles = [
  {
    // r6
    id: '1263309461066612828',
    label: 'R6'
  },
  {
    // puc
    id: '1263309406297395253',
    label: 'puc'
  },
  {
    // da
    id: '1263309318137315339',
    label: 'DA'
  },
];

// enevt list onlie
client.on("ready", async (c) => {
  // create a message to give roles
  try {
    const channel = await client.channels.cache.get('1264030735833108560');
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(role.id) // Each button must have a unique custom ID
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: 'Escolha o seu cargo abaixo.',
      components: [row]
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
