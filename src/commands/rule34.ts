import { CommandInteraction } from "discord.js";
import { SlashCommand } from "../letsFyuckiugnGoBayebe";
import { between } from "../utils";
import { SlashCommandBuilder } from "@discordjs/builders";

const rule34: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("rule34")
        .setDescription("Fetch Random Image from rule34"),
    async execute(interaction: CommandInteraction) {
        const response = await fetch(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&id=${between(1, 5384795)}&json=1`);
        await response.json().then(e => interaction.reply(e[0].file_url)).catch(e => interaction.reply("Something went wrong"));
    }
}

module.exports = rule34;