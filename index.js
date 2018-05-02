const express = require('express');
const bodyParser = require('body-parser');
//const db = require('./pokedex.json');

const app = express();
app.use(bodyParser.json());

// Load routes
app.post('/player-stats', getPlayerStatistics);
app.post('/player-info', getPlayerInformations);
app.post('/errors', HandleError);

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
}

function getPlayerInformations(req, res) {
	console.log("-------------")
	console.log("/player-infos called");	
	console.log(req.body);
}