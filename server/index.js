const express = require('express');
const application = express();
const _teams = require('./data/teams.json');
const _members = require('./data/members.json');

application.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

application.use(function(req, res, next) {
    // simulate some latency
    setTimeout(next, 500);
});

application.get('/api/teams', (request, response) => {
    response.send(_teams);
});

application.get('/api/teams/:teamId', (request, response) => {
    for (let i = 0; i < _teams.length; i++) {
        let team = _teams[i];

        if (team._id === request.params.teamId) {
            return response.send(team);
        }
    }
});

application.get('/api/teams/:teamId/members', (request, response) => {
    let members = [];

    for (let m = 0; m < _members.length; m++) {
        let member = _members[m];

        if(member.team === request.params.teamId) {
            members.push(member);
        }
    }

    response.send(members);
});

application.listen(3001, () => {
    console.log("Running: Launch Academy Demo");
});