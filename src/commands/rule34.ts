import { SlashCommandBuilder } from "@discordjs/builders";
import { TextChannel } from "discord.js";
import { SlashCommandInfo } from "../types";
import { between } from "../utils";
import * as https from "node:https";

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

            https.get(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&id=${index}&json=1`, res => {

                let data: any[] = [];
                const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
                console.log('Status Code:', res.statusCode);
                console.log('Date in Response header:', headerDate);

                res.on('data', chunk => {
                    data.push(chunk);
                });

                res.on('end', () => {
                    const response = JSON.parse(Buffer.concat(data).toString());
                    const url = response[0].file_url;
                    interaction.reply({
                        ephemeral: false,
                        content: url,
                    })
                });

            }).on('error', err => {
                console.log('Error: ', err.message);
            });
        }
    }
}

module.exports = rule34;
