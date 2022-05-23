/**
 * This File is straight ripped from discord.js Guide. Just do not question
 */
import 'dotenv/config'
import * as fs from "node:fs"
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as path from 'node:path';

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

(() => {
    if (!process.env.token || !process.env.clientId || !process.env.guildId) return;

    const rest = new REST({ version: '9' }).setToken(process.env.token);

    console.log(commands);

    rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
})()
