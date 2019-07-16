import * as SourceMapSupport from "source-map-support";
import { Config } from "./Config";
import { Bot } from "./Bot";

export class Main{
	private Bot: Bot;
	
	public constructor() {
		console.log(`Enabling source map support...`);
		SourceMapSupport.install();

		console.log(`Starting bot...`);
		this.Bot = new Bot(Config.BotToken);
	}
}

new Main();