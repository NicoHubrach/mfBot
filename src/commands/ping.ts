/**
 * Dummy Comment
 */
import { SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";
import { SlashCommandInfo } from "../types";

const ping: SlashCommandInfo = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("ping pong test"),
    async execute(e) {
        await e.reply({
            ephemeral: true,
            content: "Pong!",
        })
    }
}

module.exports = ping;
