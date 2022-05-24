/**
 * Dummy Comment
 */
import { SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";
import { TextChannel } from "discord.js";
import { SlashCommandInfo } from "../types";
import { between, makeRequest } from "../utils";

const tag: SlashCommandInfo = {
    data: new SlashCommandBuilder()
        .setName("tag")
        .setDescription("Fetch Random Image from rule34 including the given Tag")
        .addStringOption(
            new SlashCommandStringOption()
                .setName("tag")
                .setDescription("Tag to be searched for")
                .setRequired(true)
        ),
    async execute(interaction) {

        if (!(interaction.channel as TextChannel).nsfw) {
            interaction.reply({
                ephemeral: true,
                content: "Can only be used in nsfw Channels",
            });
        } else {

            const pid = between(0, 10);
            const postId = between(0, 99);
            const tag = interaction.options.get("tag", true).value;

            makeRequest(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${tag}+&pid=${pid}`,
                response => {
                    interaction.reply(response[postId].file_url);
                },
                error => {
                    console.log(error);
                    interaction.reply({
                        ephemeral: true,
                        content: 'Something went wrong',
                    })
                }
            );
        }
    }
}

module.exports = tag;
