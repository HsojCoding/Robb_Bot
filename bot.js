const { REST, Routes, SlashCommandBuilder, ChannelType } = require('discord.js');
const { joinVoiceChannel } =  require('@discordjs/voice');

const commands = [
  {
    name: 'ping',
    description: 'Ping Pong!'
  },
  {
    name: 'racist',
    description: 'Is Robb a racist'
  },
  {
    name: 'join',
    description: 'Joins a channel'
  },
  {
    name: 'id',
    description: 'Your current ids'
  },
  {
  name: 'leave',
  description: 'Leaves the current channel'
  }
];

const rest = new REST({ version: '10' }).setToken("TOKEN");

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands("1046556614137753670"), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('interactionCreate', async interaction => {

  const user_id = interaction.member.id
  const user_text_channel_id = interaction.member.channelId
  const user_voice_channel_id = interaction.member.voice.channelId
  const user_text_guild_id = interaction.member.guild.id
  const user_voice_guild_id = interaction.member.voice.guild.id

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
  if (interaction.commandName === 'racist') {
    await interaction.reply("I can't drive");
  }
  if (interaction.commandName === 'join') {
    const connection = joinVoiceChannel({
      channelId: user_voice_channel_id,
      guildId: user_voice_guild_id,
      adapterCreator: interaction.member.voice.guild.voiceAdapterCreator,
    });
    await connection
    await interaction.reply('Joined')
  }
  if (interaction.commandName === 'id') {
    console.log(user_id)
    console.log(user_channel_id)
    console.log(user_guild_id)
    const user_id_Reply = 'Your id is ' + user_id
    var user_channel_reply = "\nYour channel id is " + user_channel_id
    if (user_channel_id === null) {
      user_channel_reply = "\nYou aren't connected to a channel in this server"
    }
    const user_guild_reply = '\nYour guild id is ' + user_guild_id
    await interaction.reply(user_id_Reply + user_channel_reply + user_guild_reply)
  }
});

client.on('messageCreate', async message => {

  console.log(message.content);

  if (message.author.bot) return;
  if (message.author.id == "308192035469262848") {
    const robReply = ["u look mature and breedable", "wanna bang"]
    const robResponse = robReply[Math.floor(Math.random() * robReply.length)]
    await message.reply(robResponse)
  }

  if (message.content.toLowerCase().includes("robb")) {
    const responses = ["ya ma looks like a toothbrush handle", "thats me", "ya look like a wet crumpet", "ur dads a wetty", 'tiny willy energy'];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await message.reply(randomResponse);
  }

  if (message.mentions.everyone) {
    const everyone_Responses = ['cringe', 'sad', 'congrats neek', 'ur mum sucks fat cock'];
    const everyone_Reply = responses[Math.floor(Math.random() * everyone_Responses.length)];
    await message.reply(everyone_Reply);
  }

  if (message.content.toLowerCase().includes("CLIENT_ID")){
    await message.reply("im makin piss")
  }
  if (message.author.id == "1046926888372818070") {
    await message.reply("sus")
  }
})
client.login('TOKEN');
