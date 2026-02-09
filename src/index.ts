//import { token } from "../configs/config.json";
import {Client, GatewayIntentBits} from "discord.js";
import { Interactions } from "./utils/interactions";
import {Commands} from "./utils/commands";
import process from "node:process";
import fs from "node:fs";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages] });
const interactions = new Interactions(client);
const commands = new Commands();
const getCommands = () => commands;
const getInteractions = () => interactions;

function getDiscordToken(): string {
    // 1) Prefer environment variable
    if (process.env.DISCORD_TOKEN) {
        return process.env.DISCORD_TOKEN;
    }

    // 2) Fall back to Docker secret file
    const secretPath = process.env.DISCORD_TOKEN_FILE || "/run/secrets/discord_token";

    if (fs.existsSync(secretPath)) {
        return fs.readFileSync(secretPath, "utf8").trim();
    }

    // 3) Nothing found → hard fail
    throw new Error(
        "Discord token not found. Set DISCORD_TOKEN env var or mount a Docker secret at /run/secrets/discord_token"
    );
}

const token = getDiscordToken();
client.login(token);

export { getInteractions }
export { getCommands }


process.on('uncaughtException', err => {
    console.error(err.stack);
});
