const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const { token, prefix } = require('./config/config.json');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
      command.execute(message, args);
    }catch (error) {
        console.error(error);
        message.reply('There was an error while trying to execute that command!');
    }
});

client.once('ready', () => {
    console.log(`Logged in as ` + client.user.username + "#" + client.user.discriminator);
    client.user.setActivity(`${client.users.cache.size} users`, {type: "WATCHING"});
});

client.login(token);