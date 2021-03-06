import * as Http from "http";
import { HTTPMethod } from "http-method-enum";
import * as HTTPStatus from "http-status-codes";
import { Bot } from "./Bot";

/**
 * HTTP Server pro komunikaci s botem
 */
export class HttpServer{
	private static Server: Http.Server;
	
	/**
	 * 
	 * @param port TCP/IP Port na kterém server naslouchá
	 * @param host Host na kterém server naslouchá. Pokud není zadáno, naslouchá na všech rozhraních
	 */
	public static async Start(port: number, host?: string): Promise<void> {
		return new Promise<void>((resolve, reject): void => {
			try {
				this.Server = Http.createServer((req, res) => this.OnRequest(req, res));
				this.Server.listen(port, host);
				resolve();
			} catch (e) {
				reject(e);
			}

		});
	}

	/**
	 * Obsluha nového HTTP požadavku
	 * @param request Data požadavku
	 * @param response Data odpovědi
	 */
	private static OnRequest(request: Http.IncomingMessage, response: Http.ServerResponse): void {
		console.log(`[HTTP] Request: ${request.method} ${request.url}`);

		if (request.method != HTTPMethod.GET) {
			response.statusCode = HTTPStatus.METHOD_NOT_ALLOWED;
			response.end();
		}

		let match = request.url.match(/^\/verify\/(\d*)\/?$/);

		if (!match) {
			response.statusCode = HTTPStatus.NOT_FOUND;
			response.end();
		}

		try {
			response.setHeader(`Content-Type`, `application/json`);
			response.end(JSON.stringify({
				id: match[1],
				onServer: Bot.IsUserOnServer(match[1]),
				verified: Bot.IsUserVerified(match[1])
			}), `utf8`);
		} catch (error) {
			console.error(`[HTTP]`, `Error while generating response "${error.toString()}"`);
			response.statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
			response.end(error.toString(), `utf8`);
		}
	}
}