const Discord = require("discord.js");
const { EmbedBuilder,MessageEmbed } = require("discord.js")
const fs = require("fs");
const db = require('croxydb')
const config = require("./config.json");
const functions = require('./function/functions');
const Rest = require("@discordjs/rest");
const DiscordApi = require("discord-api-types/v10");

const client = new Discord.Client({
	intents:  3276543,
    partials: Object.values(Discord.Partials),
	allowedMentions: {
		parse: ["users", "roles", "everyone"]
	},
	retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

//
console.log(`[-] ${fs.readdirSync("./commands").length} komut algılandı.`)

for(let commandName of fs.readdirSync("./commands")) {
	if(!commandName.endsWith(".js")) return;

	const command = require(`./commands/${commandName}`);	
	client.commands.push({
		name: command.name.toLowerCase(),
		description: command.description.toLowerCase(),
		options: command.options,
		dm_permission: false,
		type: 1
	});

	console.log(`[+] ${commandName} komutu başarıyla yüklendi.`)
}

client.on('messageCreate', msg => { 
	
	if (msg.content === `<@${config["bot-id"]}>`) {
        msg.reply('Birisi Beni Çağırdı Sanırım Komutlarıma `/yardım` ile bakabilirsin  💕');
    }
	
  });
  client.on('messageCreate', msg => {
    const content = msg.content.toLowerCase(); 

    const replies = {
        'sa': 'aleyküm selam değerli insan 😋',
        'naber': 'iyilik yuvarlanıp gidiyoruz senden naber 😃',
        'sea': 'aleyküm selam değerli insan 😋',
        'selam': 'aleyküm selam değerli insan 😋',
        'selamun aleyküm': 'aleyküm selam değerli insan 😋',
		'selamın aleyküm': 'aleyküm selam değerli insan 😋',
        'selamunaleyküm': 'aleyküm selam değerli insan 😋',
		'meriç abi': 'adamı bi salın bea şuan kendisi meşgul 😋',
		'meriç abı': 'adamı bi salın bea şuan kendisi meşgul 😋',
		'meric abı': 'adamı bi salın bea şuan kendisi meşgul 😋',
		'meriçabi': 'adamı bi salın bea şuan kendisi meşgul 😋',
		'Meriç abi': 'adamı bi salın bea şuan kendisi meşgul 😋',
		'meriç': 'adamı bi salın bea şuan kendisi meşgul 😋',
		'şükrü': 'jukrü jukrü adımı mı ezberlersiniz beya 😋',
		'sükrü': 'jukrü jukrü adımı mı ezberlersiniz beya 😋',
		'şukru': 'jukrü jukrü adımı mı ezberlersiniz beya 😋',
		'gel': 'nereye geleyim beya susak 😋',
		'acil': 'Acilse 112yi arasana beya 😋',
		'volkan abi': 'yine mi kavga ediyorsunuz? ',
		'nerdesin abi': 'dur rahatsız etme iş üzerindeyim 😋',
		'nerdesin': 'dur rahatsız etme iş üzerindeyim 😋',
		'gunaydın': 'günaydın değerli insan bu saatte mi kalkılır 😋',
		'günaydın': 'günaydın değerli insan bu saatte mi kalkılır 😋',
        'selamunaleykum': 'aleyküm selam değerli insan 😋'
    };
		if (replies[content]) {
			msg.reply(replies[content]);
		}
	});
// 

console.log(`[-] ${fs.readdirSync("./events").length} olay algılandı.`)

for(let eventName of fs.readdirSync("./events")) {
	if(!eventName.endsWith(".js")) return;

	const event = require(`./events/${eventName}`);	
	const evenet_name = eventName.split(".")[0];

	client.on(event.name, (...args) => {
		event.run(client, ...args)
	});

	console.log(`[+] ${eventName} olayı başarıyla yüklendi.`)
}



client.once("ready", async() => {
	const rest = new Rest.REST({ version: "10" }).setToken(process.env.token);
  try {
    await rest.put(DiscordApi.Routes.applicationCommands(client.user.id), {
      body: client.commands,  //
    });
	
	console.log(`${client.user.tag} Aktif! 💕`);
	db.set("botAcilis_", Date.now());

  } catch (error) {
    throw error;
  }
});

client.login(process.env.token).then(() => {
	console.log(`[-] Discord API'ye istek gönderiliyor.`);
	eval("console.clear()")
}).catch(() => {
	console.log(`[x] Discord API'ye istek gönderimi başarısız(token girmeyi unutmuşsun).`);
});    

//Aktiflik sağlama
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log('Sunucu ${port} numaralı bağlantı noktasında yürütülüyor.');
});
