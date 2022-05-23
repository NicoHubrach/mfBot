import { CommandInteraction, TextChannel } from "discord.js";
import { SlashCommand } from "../letsFyuckiugnGoBayebe";
import { between } from "../utils";
import { SlashCommandBuilder } from "@discordjs/builders";

const azur: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("azur")
        .setDescription("Fetch Random Azur Lane Image from rule34"),
    async execute(interaction: CommandInteraction) {
        if (!(interaction.channel as TextChannel).nsfw) {
            interaction.reply({
                ephemeral: true,
                content: "Can only be used in nsfw Channels",
            });
        } else {
            const response = await fetch(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&id=${between(1, 5384795)}&json=1&tags=azur_lane`);
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

module.exports = azur;
