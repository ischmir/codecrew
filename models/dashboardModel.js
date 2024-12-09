const db = require("../config/db");
// Import the Axios library for making HTTP requests
const axios = require('axios'); 
exports.mockData = async function() {   
    // Corrected example data :)
    let data = {
        stack: [
            {
                id: 0,
                name: "sandra-nginx",
                author: "Sandra Storm",
                creationDate: "29.10.2024",
                status: 1,
                lastActive: "11:55:24 31.10.2024",
                subDomain: "sast.kubelab.dk",
                team: "CodeCrew",
                template: "Wordpress"
            },
            {
                id: 1,
                name: "timm-nginx",
                author: "Timm Hinsch",
                creationDate: "20.10.2024",
                status: 0,
                lastActive: "14:34:11 02.11.2024",
                subDomain: "tihi.kubelab.dk",
                team: "CodeCrew",
                template: "Umbraco"
            },
            {
                id: 3,
                name: "timm-nginx",
                author: "Timm Hinsch",
                creationDate: "20.10.2024",
                status: 0,
                lastActive: "14:34:11 02.11.2024",
                subDomain: "tihi.kubelab.dk",
                team: "CodeCrew",
                template: "Umbraco"
            }
        ],
        title: "Dashboard",
        isAdmin: true,
        email: "tihi66699@edu.ucl.dk",
        userName:"Timm Hinsch"
    };
    
    
    return data;
};

const portainerBaseUrl = "https://portainer.kubelab.dk/api"; 
const credentials = {
    username: "codecrew",
    password: "Ladida.12"
};

// Function to authenticate and get a JWT token
exports.portainerSystemAuth = async function () {
    try {
        const authUrl = `${portainerBaseUrl}/auth`;
        const response = await axios.post(authUrl, credentials); 
        console.log("Authentication successful."); 
        return response.data.jwt;
    } catch (error) {
        console.error("Error authenticating:", error.message);
    }
}

// Function to fetch system information
exports.portainerSystemInfo = async function (token) {
    try {
        const infoUrl = `${portainerBaseUrl}/system/info`; 
        const response = await axios.get(infoUrl, {
            headers: { Authorization: `Bearer ${token}` }, 
        });
        console.log("System Info:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching system info:", error.message);
    }
}

// Function to fetch system status
exports.portainerSystemStatus = async function (token) {
    try {
        const statusUrl = `${portainerBaseUrl}/system/status`;
        const response = await axios.get(statusUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("System Status:", response.data); 
        return response.data;
    } catch (error) {
        console.error("Error fetching system status:", error.message);
    }
}

// Function to fetch Portainer stacks
exports.portainerStacks = async function (token) {
    try {
        const stacksUrl = `${portainerBaseUrl}/stacks`;
        const response = await axios.get(stacksUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });
        //console.log("Portainer Stacks:", response.data);



        // find hvad vi skal bruge og læg lortet i en array
        // gem lortet i db 
        // return den filteret array
        // win

        return response.data;
    } catch (error) {
        console.error("Error fetching Portainer stacks:", error.message);
    }
}

exports.filterStackCall = async function(res) { // rename should happen
    let data = {
        
        res
    };

    // data.res.creationDate = new Date(data.res.creationDate * 1000);
    // data.res.lastUpdate = data.res.lastUpdate == 0 ? data.res.creationDate : new Date(data.res.lastUpdate * 1000);
     // why sql error (ncorrect datetime value: '56858-07-16 07:03:20.000' for column 'stackCreationDate' at row 2)
     // but it executes the query correctly 
    await db.query("INSERT INTO Stacks (subDomain, FK_templateId, FK_userId, stackName, stackCreationDate, stackLastUpdate, stackLastActive) VALUES (?,(SELECT templateId FROM Templates WHERE templateTitle = 'welp'),?,?,?,?,?)", 
        [data.res.subDomain/*, data.res.template*/, res.userId, data.res.name, data.res.creationDate, data.res.lastUpdate, data.lastActive]
    )
    return data;
}
// Function to fetch Portainer endpoints
exports.portainerEndpoints = async function (token) {
    try {
        const endpointsUrl = `${portainerBaseUrl}/endpoints`;
        const response = await axios.get(endpointsUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Portainer Endpoints:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching Portainer endpoints:", error.message);
    }
}

// Function to create a new stack in Portainer
exports.portainerCreateStack = async function (token, stackName, stackFileContent) {
    const url = `${portainerBaseUrl}/stacks/create/swarm/string?endpointId=5`;
    const payload = {
        "fromTemplate": "false",
        "name": stackName,
        "stackFileContent": stackFileContent,
        "swarmId": "v1pkdou24tzjtncewxhvpmjms" // i think its static and therefor we can just hardcode it.
        }

    try {
        const response = await axios.post(url, payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log(`Stack "${stackName}" created successfully:`, response.data);
        return response.data;


    } catch (error) {
        console.error(`Error creating stack "${stackName}":`, error.message);
    }
}

// Function to delete a stack by ID
exports.portainerDeleteStack = async function (token, stackId) {
    try {
        const stackUrl = `${portainerBaseUrl}/stacks/${stackId}?endpointId=5`;
        const response = await axios.delete(stackUrl, {
            headers: { Authorization: `Bearer ${token}` },
            params: { external: false }
        });
        console.log(`Stack with ID ${stackId} deleted successfully.`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting stack with ID ${stackId}:`, error.message);
    }
}

exports.stackLimitForUser = async function (userAccess) {
    try {
        const [rows] = await db.query("SELECT stackLimit FROM Roles WHERE accessLevel = ?", [userAccess]);

        return rows[0].stackLimit;
    } catch (error) {
        console.error(error);   
    }
}
exports.amountOfStacksByUser = async function (userId) {
    try {
        const [rows] = await db.query("SELECT COUNT(*) as amount FROM Stacks WHERE FK_userId = ?", [userId]);

        return rows[0].amount
    } catch (error) {
        console.error(error);
        
    }
}