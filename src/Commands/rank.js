import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";
export default {
    name: "rank",
    description: "Get info on a character",
    options: [
        {
            type: 3,
            name: "character",
            description: "The name of the character you want info on.",
            required: true,
        },
    ],
    async execute(interaction) {
        interaction.deferReply();
        let username = interaction.options.get("character").value;
        fetch("https://api.mir4.gq/v1/search/" + username)
            .then((req) => req.json())
            .then((req) => {
            if (req.error) {
                interaction.reply("An error occurred this normally happens when you enter an invalid username.");
            }
            else {
                let character = req.characters[0];
                let data = req.characters[0].data;
                let embed = new EmbedBuilder();
                embed.setTitle(character.name);
                embed.setDescription(`${data.class.name} ${Number(data.power).toLocaleString()} PS\nClan: ${data.clan.name}\nClan Rank: ${data.clan.rank.toLocaleString()}\nServer: ${data.server.name}\nServer Rank: ${Number(data.server.rank).toLocaleString()}\nRegion: ${data.region.name}\nRegion Rank: ${Number(data.region.rank).toLocaleString()}\nGlobal Rank: ${Number(data.global_rank).toLocaleString()}`);
                embed.setColor("#0000FF");
                interaction.editReply({ embeds: [embed] });
            }
        });
    },
};
