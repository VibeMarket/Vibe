const { ownerID } = require('./config/config.json');
module.exports = {
	name: 'testing',
	description: 'testing',
	execute(message, args) {
        if 
		message.channel.send('This is a test!');
	},
};