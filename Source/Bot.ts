import * as Discord from "discord.js";
import { Config } from "./Config";

export class Bot{
	private Client: Discord.Client;
	private VerifyRoles: Discord.Role[] = [];
	
	public constructor(token: string) {
		this.Client = new Discord.Client();

		this.Client.once(`ready`, (): void => this.OnReady());
		this.Client.on(`message`, (msg): void => this.OnMessage(msg));

		this.Client.login(token);
	}

	private OnReady(): void {
		console.log(`Client Ready`);

		this.Client.guilds.forEach((guild) => {
			console.log(`Connected to ${guild.name}`);
			let role = guild.roles.find((role) => role.name == `Verify`)
			if (!role) return;

			this.VerifyRoles.push(role);
			console.log(`Registered verify role "${role.name}" (${role.id})`);
		});


		// Test kontroly verifikace
		console.log(this.IsUserVerified(`10`)); // Invalid
		console.log(this.IsUserVerified(`357238829075136512`)); // Janch
	}

	public IsUserVerified(id: string): boolean{
		let verified = false;

		this.VerifyRoles.forEach((role) => {
			if (role.members.has(id)) verified = true;
		});

		return verified;
	}

	private OnMessage(msg: Discord.Message): void {
		if (!(msg.channel instanceof Discord.TextChannel)) return;
		if (!(msg.channel instanceof Discord.TextChannel)) return;
		
		if (msg.content.indexOf(`!prestiz`) == 0)
			this.CreateNewPost(msg.channel, msg);
	}

	private CreateNewPost(channel: Discord.TextChannel, msg: Discord.Message) {
		let post = msg.content.split(`\n`);
		let title = post.shift().substring(8).trim();
		
		channel.send(`"Studijní materiál" úspěšně nahrán\nhttp://snizprestiz.eu/course/ios/post/10`);
		channel.send(new Discord.RichEmbed()
			.setColor(`#00a9e0`)
			.setURL(`http://snizprestiz.eu/course/ios/post/10`)
			.setAuthor(`Sniž prestiž`)
			.setTitle(title)
			.setDescription(post.join(`\n`))
			.setFooter(`IOS - Operační systémy`)
			.setTimestamp()
		);
	}
}