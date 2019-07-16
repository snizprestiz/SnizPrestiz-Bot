import * as SourceMapSupport from "source-map-support";
import { Config } from "./Config";
import { Bot } from "./Bot";
import { HttpServer } from "./HttpServer";

export class Main{
	public constructor() {
		console.log(`[NODE]`, `Enabling source map support...`);
		SourceMapSupport.install();

		console.log(`[BOT ]`, `Starting bot..`);
		Bot.Init(Config.BotToken).then(() => {
			console.log(`[HTTP]`, `Starting HTTP server...`)
			return HttpServer.Start(Config.HttpPort, Config.HttpHost);
		}).then(() => {
			console.log(`[HTTP]`, `Server is OK and listening on ${Config.HttpHost?Config.HttpHost:`*`}:${Config.HttpPort}`);
		}).catch((e) => {
			console.error(`[NODE]`, `Failed to start`, e);
		});
	}
}

new Main();