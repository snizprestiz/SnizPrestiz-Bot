# Sniž Prestiž Discord Bot
Discord Bot pro ověřování práv a rychlé posílání studijních materiálu na Sniž Prestiž (to teda ještě neumí, ale je to v plánu)

## Popis HTTP Api
Součástí bota je HTTP server pro komunikaci s botem. Port a rozhraní na kterém server naslouchá jde nastavit v konfiguračním souboru **Source/Config.ts**.

Je doporučeno toto API používat na interní komunikaci a nemít je přístupné z venku (není řešena autorizace ani žádný zabezpečený přenos).

### `GET /verify/{userId}`
Informace o tom, jestli je uživatel připojený na FIT Discord server a jestli je ověřený (verifikoval se loginem a má roli **Verify**). Uživatel je identifikovám podle vlastního Discord ID `{userId}`.

**Ukázková odpověď pro `/verify/370506820197810176`**
```js
{
	"id": "370506820197810176", // Discord ID uživatele
	"onServer": true, // Je připojený na VUT FIT Discord server
	"verified": false // Je ověřený (má roli Verify)
}
```


## Jak sestavit
### Co je potřeba
* [NodeJS](https://nodejs.org) v nějaké rozumně nové verzi
* NPM (bývá součástí instalace NodeJS)
* [Visual Studio Code](https://code.visualstudio.com) (není nutné, ale je to doporučeno)
* Odvahu

### Základní popis souborů v repozitáři
* Ve složce **Source/** jsou zdrojové kódy bota psané v TypeScriptu
* Projekt se kompiluje do **Build/**, hlavní spustitelný soubor je **Main.js**
* Ve složce **Source/** je šablona konfiguračního souboru **Config.ts.default**, po zklonování repozitáře soubor přejmenujte na **Config.ts** a upravte jej. Tento soubor obsahuje citlivé údaje jako například token bota, proto je v **.gitignote**

### Sestavení
* Před sestavením nainstalujte závislosti příkazem `npm install`
* Kompilace je řešena Gulpem,
	* Příkaz `gulp` zkompiluje projekt okamžitě
	* Příkaz `gulp watch` (nebo `Ctrl+Shift+B` ve VS Code) začne sledovat zdrojový kód a při změně projekt zkompiluje
* Po kompilaci se bot spustí přes node, např. příkazem `node ./Build/Main.js`
