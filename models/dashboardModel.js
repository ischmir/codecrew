const db = require('../config/db');
const https = require('https');
const axios = require('axios');
// Importerer nødvendige moduler: database connection, https for sikker kommunikation, og axios for HTTP requests

const portainerBaseUrl = 'https://portainer.kubelab.dk/api';
// Base URL for Portainer API'et - alle requests til Portainer går gennem dette endpoint

const credentials = {
	username: 'codecrew',
	password: 'Ladida.12',
};
// Login oplysninger til Portainer (bør flyttes til .env fil af sikkerhedsmæssige årsager)

async function portainerCall(endpoint, body, token) {
	const agent = new https.Agent({
		rejectUnauthorized: false,
	});
	// Opretter en HTTPS agent der ignorerer SSL certifikat validering (kun til udvikling)

	const config = {
		httpsAgent: agent,
	};
	const url = `${portainerBaseUrl}/${endpoint}`;
	// Bygger den fulde URL til Portainer API'et

	if (token) {
		config.headers = {
			Authorization: `Bearer ${token}`,
		};
	}
	// Tilføjer authentication token til request hvis den er tilgængelig

	if (body !== undefined) {
		return axios.post(url, body, config);
	} else {
		return axios.get(url, config);
	}
	// Udfører enten en POST eller GET request baseret på om der er medsendt data
}

exports.portainerCreateStack = async function (token, stackName, stackFileContent) {
	const url = `${portainerBaseUrl}/stacks/create/swarm/string?endpointId=5`;
	const payload = {
		fromTemplate: 'false',
		name: stackName,
		stackFileContent: stackFileContent,
		swarmId: 'v1pkdou24tzjtncewxhvpmjms',
	};
	// Data der skal sendes til Portainer for at oprette en ny stack

	try {
		const response = await axios.post(url, payload, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
		// Sender request til Portainer om at oprette en ny stack

		console.log(`Stack "${stackName}" created successfully:`, response.data);
		return response.data;
	} catch (error) {
		console.error(`Error creating stack "${stackName}":`, error.message);
	}
};

exports.addNewStackToDB = async function (res) {
	try {
		const [rows] = await db.execute(
			`INSERT INTO Stacks 
             (subDomain, FK_templateId, FK_userId, stackName, stackCreationDate, stackLastUpdate, stackLastActive, portainerStackId) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				res.subDomain,
				res.template,
				res.userId,
				res.name,
				res.creationDate,
				res.lastUpdate,
				res.lastActive,
				res.portainerStackId,
			]
		);
		// Gemmer den nyoprettede stack i vores egen database med alle relevante informationer

		console.log('added new stack to the database. stack name: ' + res.name);
		return rows;
	} catch (error) {
		console.error('Error inserting into Stacks:', error);
	}
};

exports.stackLimitForUser = async function (userAccess) {
	try {
		const [rows] = await db.query('SELECT stackLimit FROM Roles WHERE accessLevel = ?', [userAccess]);
		// Henter det maksimale antal stacks en bruger må oprette baseret på deres rolle

		return rows[0].stackLimit;
	} catch (error) {
		console.error(error);
	}
};

exports.amountOfStacksByUser = async function (userId) {
	try {
		const [rows] = await db.query('SELECT COUNT(*) as amount FROM Stacks WHERE FK_userId = ?', [userId]);
		// Tæller hvor mange stacks en specifik bruger har oprettet

		return rows[0].amount;
	} catch (error) {
		console.error(error);
	}
};
