import { Collection, Interaction } from "discord.js";
import { Client, Intents } from 'discord.js';
import * as fs from "fs";
import { SlashCommand } from "./letsFyuckiugnGoBayebe";

require("dotenv").config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//Einsammeln aller Slash Commands
let commands = new Collection<string, SlashCommand>();
const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command: SlashCommand = require(`${__dirname}/commands/${file}`);
    commands.set(command.data.name, command);
}

client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    const command = commands.get(interaction.commandName);
    console.log(`Just got ${command.data.name} as the command`);
    if (!command) return;
    await command.execute(interaction);
});

client.login(process.env.D_TOKEN);
