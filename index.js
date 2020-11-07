const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const message = require('./events/message');

global.prefix = config.prefix;
// Lavalink
const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
/* FireBase - Database
const firebase = require('firebase');
const database = firebase.database();
var firebaseConfig = {
    apiKey: "AIzaSyCvybuC7XxWorj_Bt2v4AmrLFGkFgJ4t3s",
    authDomain: "rprojectdb.firebaseapp.com",
    databaseURL: "https://rprojectdb.firebaseio.com",
    projectId: "rprojectdb",
    storageBucket: "rprojectdb.appspot.com",
    messagingSenderId: "11819992157",
    appId: "1:11819992157:web:9161c520c2b5904edeb9b4",
    measurementId: "G-2YRREPJV3C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
*/
// Imagens
global.bosses = ['https://i.imgur.com/nxJc5UE.gif'];
// Embed
global.paleta = { cor: '#ff4500' };
// CLasse
global.player = message.author;
global.personagem = {
    classe: "",
    tipo: "",
    range: "",
    numero: 0,
    img: ""
}
global.assassino = { classe: "Assassino", tipo: "Físico", range: "Corpo a Corpo", numero: 1, img: 'https://i.imgur.com/NayjnL0.gif' };
global.guerreiro = { classe: "Guerreiro", tipo: "Físico", range: "Curta Distância", numero: 2, img: 'https://i.imgur.com/yw2dI8u.gif' };
global.mago = { classe: "Mago", tipo: "Mágico", range: "Média Distância", numero: 3, img: 'https://i.imgur.com/YNkReOx.gif' };
global.arqueiro = { classe: "Arqueiro", tipo: "Físico e Mágico", range: "Longa Distância", numero: 4, img: 'https://i.imgur.com/WCvNM4h.gif' };

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
const numero = getRandomInt(1, 20)
global.dado = { valor: numero }
    // Consts gerais
client.on("ready", () => { // Iniciando o Bot
    let activities = [
            `D&D`
        ],
        i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "PLAYING"
    }), 1000 * 60);
    client.user
        .setStatus("dnd")
        .catch(console.error);
    console.log("RProjectG Ativo")
});
client.on("message", message => { // Handler
    if (message.author.bot) return; // Se a mensagem vier de um bot, ele ignora (return;)
    if (message.author.id === "732754811950465095") return; // XXXXX
    if (message.author == client) return; // Verificando se o comando vem de um bot
    if (message.channel.type == 'dm') return; // Verificando se a mensagem foi feita na DM, ele ignora
    if (!message.content.toLowerCase().startsWith(config.prefix)) return; // Se a mensagem tiver CAPSLOCK troca pra minuscúla e verifica o prefixo
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return; // Se for mensagem do próprio Bot, ele ignora

    const args = message.content.slice(prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command == 'iniciar') { client.commands.get('iniciar').execute(message, Discord); return }
    if (command == 'status') { client.commands.get('status').execute(message, Discord); return }
    if (command == 'resumo') { client.commands.get('resumo').execute(message, Discord, args); return }
    if (command == 'finalizar') { client.commands.get('finalizar').execute(message, Discord); return }
    if (command == 'classe') { client.commands.get('classe').execute(message); return }
    if (command == 'dado') { client.commands.get('dado').execute(message); return }
});
client.on("message", async message => {
    if (message.content === "adiciona essa bagaça ai") {
        global.class = '';
        database.ref(`servidor/${message.guild.id}/${message.author.id}`)
            .once('value').then(async function(snap) {
                if (snap.val() == null) {
                    database.ref(`servidor/${message.guild.id}/${message.author.id}`)
                        .set({
                            class: "none"
                        })

                }
            })
    }
});
client.login(config.token);