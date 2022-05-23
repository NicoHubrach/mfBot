import { TextChannel } from "discord.js";
import { between } from "../utils";
import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommandInfo } from "../types";


const azur: SlashCommandInfo = {
    data: new SlashCommandBuilder()
        .setName("azur")
        .setDescription("Fetch Random Azur Lane Image from rule34"),
    async execute(interaction) {

        if (!(interaction.channel as TextChannel).nsfw) {
            interaction.reply({
                ephemeral: true,
                content: "Can only be used in nsfw Channels",
            });
        } else {
            const pid = between(0, 534);
            const postId = between(0, 99);

            const response = await fetch(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=azur_lane+&pid=${pid}`);

            await response.json()
                .then(e => {
                    interaction.reply(e[postId].file_url)
                })
                .catch(e => {
                    interaction.reply({
                        ephemeral: true,
                        content: 'Something went wrong',
                    })
                });
        }
    }
}

module.exports = azur;
