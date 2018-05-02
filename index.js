const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
var db = JSON.parse(fs.readFileSync('dreamTeam.json', 'utf8'));
var players = db.players;

const app = express();
app.use(bodyParser.json());

// Load routes
app.post('/player-stats', getPlayerStatistics);
app.post('/player-info', getPlayerInformations);
app.post('/errors', HandleError);

var name = "Chris Mullin";
console.log(getPlayerByName(name));


function getPlayerByName (name) {
	var player = null
	players.forEach((element) => {
		if(element.name == name) {
			player = element;
		}
	});
	return player;
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));


function HandleError(req, res) {
	console.log("-------------")
	console.log("/error called");
	console.error(req.body);
	res.sendStatus(200);
}

function getPlayerStatistics(req, res) {

	console.log("-------------")
	console.log("/player-stats called");
	console.log(req.body);

	var player = getPlayerByName(req.body.nlp.entities.nbaplayer[0]);
	var replyMessage = "Here are the statistics about " + player.name + ".";


	var replies = {
		replies : [{
			type: 'picture',
			content: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Michael_Jordan_in_2014.jpg/250px-Michael_Jordan_in_2014.jpg',
		},
		{
			type: "text",
			content: "- " + player.experience + " years of experience."
		},
		{
			type: "text",
			content: "- " + player.shotPercent + "% of shot scoring."
		},		
		{
			type: "text",
			content: "- " + player.PER + " PER."
		}]
	}

	res.send(replies);
}

function getPlayerInformations(req, res) {
	console.log("-------------")
	console.log("/player-infos called");	
	console.log(req.body);
}