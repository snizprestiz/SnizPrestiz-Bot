import * as Discord from "discord.js";
import { Config } from "./Config";

export class Bot{
	private static Client: Discord.Client;
	private static VerifyRoles: Discord.Role[] = [];
	
	public static Init(token: string): Promise<void> {
		this.Client = new Discord.Client();

		this.Client.on(`ready`, (): void => this.OnReady());
		this.Client.on(`message`, (msg): void => this.OnMessage(msg));

		return new Promise<void>((resolve, reject): void => {
			this.Client.once(`ready`, () => resolve());
			try {
				this.Client.login(token);
			} catch (e) {
				reject(e);
			}
		});
	}

	private static OnReady(): void {
		this.Client.user.setPresence({
			game: {
				name: `snizprestiz.eu`,
				type: `WATCHING`,
				url: `https://snizprestiz.eu`
			}
		})
		
		this.VerifyRoles.splice(0, this.VerifyRoles.length);

		this.Client.guilds.forEach((guild) => {
			console.log(`[BOT ]`, `Connected to "${guild.name}"`);
			let role = guild.roles.find((role) => role.name == `Verify`)
			if (!role) return;
			
			this.VerifyRoles.push(role);
			console.log(`[BOT ]`, `Registered verify role "${role.name}" (${role.id})`);
		});
		
		console.log(`[BOT ]`, `Ready`);
	}

	public static IsUserOnServer(userId: string): boolean{
		if (this.Client.status != 0)
			throw new Error(`Discord bot is not ready. Please try again later.`);
		
		return !!this.Client.guilds.find((guild) => guild.members.has(userId));
	}

	public static IsUserVerified(userId: string): boolean{
		if (this.Client.status != 0)
			throw new Error(`Discord bot is not ready. Please try again later.`);
		
		return !!this.VerifyRoles.find((role) => role.members.has(userId));
	}

	private static OnMessage(msg: Discord.Message): void {
		if (!(msg.channel instanceof Discord.TextChannel)) return;
		if (!(msg.channel instanceof Discord.TextChannel)) return;
		
		
		//if (msg.isMentioned(this.Client.user))
		//this.CreateNewPost(msg.channel, msg);
	}

	private static CreateNewPost(channel: Discord.TextChannel, msg: Discord.Message): void {
		// TODO
		let post = msg.content.split(`\n`);
		let title = post.shift().substring(8).trim();
		let url = `https://dev.janchaloupka.cz/discordTest8.html`;


		channel.send(`**Je to tam! ${url} **\nUdělal jsem něco špatně? Dej mi reakci:regional_indicator_f: a odstraním to.`);
	}
}