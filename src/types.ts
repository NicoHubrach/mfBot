import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Interaction } from "discord.js"

export type SlashCommandInfo = {
    //Kan kein einfacher SlashCommandBuilder sein, sobald Options hinzugefügt werden geht alles Schief, idk
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
    execute: (interaction: CommandInteraction) => Promise<void>,
}
