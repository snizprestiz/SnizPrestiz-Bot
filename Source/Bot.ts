import * as Discord from "discord.js";

/**
 * Logika Discord bota
 */
export class Bot{
	private static Client: Discord.Client;
	private static VerifyRoles: Discord.Role[] = [];
	
	/**
	 * Inicializovat a připojit bota na server
	 * @param token Token pro ovládání bota
	 */
	public static Init(token: string): Promise<void> {
		this.Client = new Discord.Client();

		this.Client.on(`ready`, (): void => this.OnReady());
		this.Client.on(`guildCreate`, (): void => this.OnReady());
		this.Client.on(`guildDelete`, (): void => this.OnReady());
		this.Client.on(`roleCreate`, (): void => this.OnReady());
		this.Client.on(`roleDelete`, (): void => this.OnReady());
		this.Client.on(`roleUpdate`, (): void => this.OnReady());
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

	/**
	 * Bot se připojil na Discord a je připraven
	 */
	private static OnReady(): void {
		// Zobrazit stav v seznamu uživatelů
		this.Client.user.setPresence({
			game: {
				name: `snizprestiz.eu`,
				type: `WATCHING`,
				url: `https://snizprestiz.eu`
			}
		})
		
		// Uložit verifikační role pro pozdější použití
		// Návrh počítá s tím, že exisutje víc "verifikačních" serverů a rolí, proto je to v poli
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

	/**
	 * Vrátí zda je uživatel připojený alespoň na jeden server, kde je tento bot 
	 * @param userId ID uživatele na Discordu (jedná se o číselné ID, ne o jeho jméno)
	 */
	public static IsUserOnServer(userId: string): boolean{
		if (this.Client.status != 0)
			throw new Error(`Discord bot is not ready. Please try again later.`);
		
		return !!this.Client.guilds.find((guild) => guild.members.has(userId));
	}

	/**
	 * Vrátí zda má uživatel alepoň jednu verifikační roli na alespoň jednom serveru 
	 * @param userId ID uživatele na Discordu (jedná se o číselné ID, ne o jeho jméno)
	 */
	public static IsUserVerified(userId: string): boolean{
		if (this.Client.status != 0)
			throw new Error(`Discord bot is not ready. Please try again later.`);
		
		return !!this.VerifyRoles.find((role) => role.members.has(userId));
	}

	/**
	 * Reakce na novou zprávu na připojením serveru
	 * @param msg Objekt s informací o nové zprávě
	 */
	private static OnMessage(msg: Discord.Message): void {
		if (!(msg.channel instanceof Discord.TextChannel)) return;
		if (!(msg.channel instanceof Discord.TextChannel)) return;
		
		
		//if (msg.isMentioned(this.Client.user))
		//this.CreateNewPost(msg.channel, msg);
	}

	/*
	private static CreateNewPost(channel: Discord.TextChannel, msg: Discord.Message): void {
		// TODO
		let post = msg.content.split(`\n`);
		let title = post.shift().substring(8).trim();
		let url = `https://dev.janchaloupka.cz/discordTest8.html`;


		channel.send(`**Je to tam! ${url} **\nUdělal jsem něco špatně? Dej mi reakci:regional_indicator_f: a odstraním to.`);
	}
	*/
}