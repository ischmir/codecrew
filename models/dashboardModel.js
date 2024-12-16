const db = require('../config/db');
const https = require('https');
// Import the Axios library for making HTTP requests
const axios = require('axios');
exports.mockData = async function () {
	// Corrected example data :)
	let data = {
		stack: [
			{
				id: 0,
				name: 'test-sandra-nginx',
				author: 'Sandra Storm',
				creationDate: '29.10.2024',
				status: 1,
				lastActive: '11:55:24 31.10.2024',
				subDomain: 'sast.kubelab.dk',
				team: 'CodeCrew',
				template: 'Wordpress',
			},
			{
				id: 1,
				name: 'test-timm-nginx',
				author: 'Timm Hinsch',
				creationDate: '20.10.2024',
				status: 0,
				lastActive: '14:34:11 02.11.2024',
				subDomain: 'tihi.kubelab.dk',
				team: 'CodeCrew',
				template: 'Umbraco',
			},
			{
				id: 3,
				name: 'test-timm-nginx',
				author: 'Timm Hinsch',
				creationDate: '20.10.2024',
				status: 0,
				lastActive: '14:34:11 02.11.2024',
				subDomain: 'tihi.kubelab.dk',
				team: 'CodeCrew',
				template: 'Umbraco',
			},
		],
		title: 'Dashboard',
		isAdmin: true,
		email: 'tihi66699@edu.ucl.dk',
		userName: 'Timm Hinsch',
	};

	return data;
};

const portainerBaseUrl = 'https://portainer.kubelab.dk/api';
const credentials = {
	username: 'codecrew',
	password: 'Ladida.12',
};

async function portainerCall(endpoint, body, token) {
	//! Remove me after portainer is working again
	const agent = new https.Agent({
		rejectUnauthorized: false,
	});

	const config = {
		httpsAgent: agent,
	};
	const url = `${portainerBaseUrl}/${endpoint}`;

	if (token) {
		config.headers = {
			Authorization: `Bearer ${token}`,
		};
	}

	if (body !== undefined) {
		return axios.post(url, body, config);
	} else {
		return axios.get(url, config);
	}
}

// Function to authenticate and get a JWT token
exports.portainerSystemAuth = async function () {
	try {
		const response = await portainerCall('auth', credentials);
		console.log('Authentication successful.', response.data);
		return response.data.jwt;
	} catch (error) {
		console.error('Error authenticating:', error.message);
	}
};

// Function to fetch system information
exports.portainerSystemInfo = async function (token) {
	try {
		const infoUrl = `${portainerBaseUrl}/system/info`;
		const response = await axios.get(infoUrl, {
			headers: { Authorization: `Bearer ${token}` },
		});
		console.log('System Info:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching system info:', error.message);
	}
};

// Function to fetch system status
exports.portainerSystemStatus = async function (token) {
	try {
		const statusUrl = `${portainerBaseUrl}/system/status`;
		const response = await axios.get(statusUrl, {
			headers: { Authorization: `Bearer ${token}` },
		});
		console.log('System Status:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching system status:', error.message);
	}
};

// Function to fetch Portainer stacks
exports.portainerStacks = async function (token) {
	try {
		const response = await portainerCall('stacks', undefined, token);
		//console.log("Portainer Stacks:", response.data);

		// find hvad vi skal bruge og læg lortet i en array
		// gem lortet i db
		// return den filteret array
		// win

		return response.data;
	} catch (error) {
		console.error('Error fetching Portainer stacks:', error.message);
		return error.cause;
	}
};

exports.addNewStackToDB = async function(res) {
    const [rows] = await db.execute("INSERT INTO Stacks (subDomain, FK_templateId, FK_userId, stackName, stackCreationDate, stackLastUpdate, stackLastActive, portainerStackId) VALUES (?,(SELECT templateId FROM Templates WHERE templateTitle = 'welp'),?,?,?,?,?,?)", 
        [res.subDomain/*, res.template*/, res.userId, res.name, res.creationDate, res.lastUpdate, res.lastActive, res.portainerStackId]
    )
    return rows;
}
// Function to fetch Portainer endpoints
exports.portainerEndpoints = async function (token) {
	try {
		const endpointsUrl = `${portainerBaseUrl}/endpoints`;
		const response = await axios.get(endpointsUrl, {
			headers: { Authorization: `Bearer ${token}` },
		});
		console.log('Portainer Endpoints:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching Portainer endpoints:', error.message);
	}
};

// Function to create a new stack in Portainer
exports.portainerCreateStack = async function (token, stackName, stackFileContent) {
	const url = `${portainerBaseUrl}/stacks/create/swarm/string?endpointId=5`;
	const payload = {
		fromTemplate: 'false',
		name: stackName,
		stackFileContent: stackFileContent,
		swarmId: 'v1pkdou24tzjtncewxhvpmjms', // i think its static and therefor we can just hardcode it.
	};

	try {
		const response = await axios.post(url, payload, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		console.log(`Stack "${stackName}" created successfully:`, response.data);
		return response.data;
	} catch (error) {
		console.error(`Error creating stack "${stackName}":`, error.message);
	}
};

//Function to stop stack by ID

async function portainerStopStack(token, stackId) {
	try {
		const stackUrl = `stacks/${stackId}/stop?endpointId=5`;
		const response = await portainerCall(stackUrl, '', token);
		console.log(`Stack ${stackId} stopped successfully`, response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		console.error(`Error stopping stack ${stackId}:`, error.response?.data || error.message);
	}
}
exports.portainerStopStack = portainerStopStack;

//Function to start stack by ID

async function portainerStartStack(token, stackId) {
	try {
		const stackUrl = `stacks/${stackId}/start?endpointId=5`;
		const response = await portainerCall(stackUrl, '', token);
		console.log(`Stack ${stackId} started successfully`, response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		console.error(`Error starting stack ${stackId}:`, error.response?.data || error.message);
	}
}
exports.portainerStartStack = portainerStartStack;

//Function to restart stack by ID

exports.portainerRestartStack = async function (token, stackId) {
	await portainerStopStack(token, stackId);

	await portainerStartStack(token, stackId);
};

// Function to delete a stack by ID
/*
exports.portainerDeleteStack = async function (token, stackId, portainerStackId) {
	try {
		const query = 'DELETE FROM stacks WHERE portainerStackId = ?';

		const stackUrl = `${portainerBaseUrl}/stacks/${stackId}?endpointId=5`;
		
		const [result] = await db.execute(query, [portainerStackId]);

		const response = await axios.delete(stackUrl, {
			headers: { Authorization: `Bearer ${token}` },
			params: { external: false },
		});

		console.log(`Stack with ID ${stackId} deleted successfully.`);
		return rows, response.data;
	} catch (error) {
		console.error(`Error deleting stack with ID ${stackId}:`, error.message);
	}
};
*/
exports.stackLimitForUser = async function (userAccess) {
	try {
		const [rows] = await db.query('SELECT stackLimit FROM Roles WHERE accessLevel = ?', [userAccess]);

		return rows[0].stackLimit;
	} catch (error) {
		console.error(error);
	}
};
exports.amountOfStacksByUser = async function (userId) {
	try {
		const [rows] = await db.query('SELECT COUNT(*) as amount FROM Stacks WHERE FK_userId = ?', [userId]);

        return rows[0].amount
    } catch (error) {
        console.error(error);
        
    }
}
exports.getAllStacksFromDB = async function () {
    try {
        const [rows] = await db.query("SELECT * FROM Stacks;")

        return rows;
    } catch (error) {
        console.log("error getting all stacks: " +error);
        
    }
}