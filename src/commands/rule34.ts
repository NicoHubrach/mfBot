import { SlashCommandBuilder } from "@discordjs/builders";
import { TextChannel } from "discord.js";
import { SlashCommandInfo } from "../types";
import { between } from "../utils";

const rule34: SlashCommandInfo = {
    data: new SlashCommandBuilder()
        .setName("rule34")
        .setDescription("Fetch Random Image from rule34"),
    async execute(interaction) {
        if (!(interaction.channel as TextChannel).nsfw) {
            interaction.reply({
                ephemeral: true,
                content: "Can only be used in nsfw Channels",
            });
        } else {
            const index = between(1, 5384795)
            const response = await fetch(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&id=${index}&json=1`);
            await response.json().then(e => {
                interaction.reply(e[0].file_url)
            }).catch(e => {
                interaction.reply({
                    ephemeral: true,
                    content: "Something went wrong",
                })
            });
        }
    }
}

module.exports = rule34;
