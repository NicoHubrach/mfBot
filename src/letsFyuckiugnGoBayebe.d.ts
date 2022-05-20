import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';

export type SlashCommand = {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void>,
}
