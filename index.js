import { Client, GatewayIntentBits, Collection, Events } from 'discord.js';
import { config } from './config.js';
import { commands } from './commands/index.js';

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

// Create commands collection
client.commands = new Collection();

// Register all commands
for (const command of commands) {
  client.commands.set(command.data.name, command);
}

// When bot is ready
client.once(Events.ClientReady, async (readyClient) => {
  console.log(`✅ Bot is ready! Logged in as ${readyClient.user.tag}`);
  
  // Register slash commands
  try {
    console.log('📝 Registering slash commands...');
    const commandData = commands.map(cmd => cmd.data.toJSON());
    
    // Register commands globally (can take up to 1 hour to propagate)
    // For faster testing, use guild commands instead
    if (process.env.GUILD_ID) {
      const guild = readyClient.guilds.cache.get(process.env.GUILD_ID);
      if (guild) {
        await guild.commands.set(commandData);
        console.log(`✅ Commands registered to guild: ${guild.name}`);
      } else {
        console.log('⚠️  GUILD_ID specified but guild not found. Registering globally...');
        await readyClient.application.commands.set(commandData);
        console.log('✅ Commands registered globally (may take up to 1 hour)');
      }
    } else {
      await readyClient.application.commands.set(commandData);
      console.log('✅ Commands registered globally (may take up to 1 hour)');
      console.log('💡 Tip: Set GUILD_ID in .env for instant command updates during development');
    }
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
});

// Handle slash command interactions
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  
  const command = client.commands.get(interaction.commandName);
  
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing ${interaction.commandName}:`, error);
    
    const errorMessage = {
      content: '❌ There was an error while executing this command!',
      ephemeral: true,
    };
    
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

// Handle errors
client.on(Events.Error, (error) => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Login to Discord
client.login(config.discordToken).catch((error) => {
  console.error('❌ Failed to login:', error);
  process.exit(1);
});

