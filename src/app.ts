import 'dotenv/config'
import { Client, CommandInteraction, Intents } from 'discord.js';
import * as fs from 'node:fs'
import * as path from 'node:path'
import { SlashCommandInfo } from './types';

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

/**
 * Require all files under './commands/
 * for each file
 *  set interaction.commandName and file.execute in commands map
 * 
 * Register all Executes with their respective CommandNames in the Commands Map
 */
let commands = new Map<string, (interaction: CommandInteraction) => Promise<void>>();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command: SlashCommandInfo = require(filePath);
    commands.set(command.data.name, command.execute);
}

/**
 * Run the Method provided for each Interaction
 */
client.on('interactionCreate', async e => {
    if (!e.isCommand()) return;
    const command = commands.get(e.commandName);
    if (!command) return;
    await command(e);
})

// Login to Discord with your client's token
client.login(process.env.token);
