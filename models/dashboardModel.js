const axios = require('axios'); // Import the Axios library for making HTTP requests
exports.mockData = function() {
    // Corrected example data :)
    const data = {
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
                status: 1,
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
    // data.stack.sort((k) => k.author).reverse();
    return data;
};

// Defines the base URL for the Portainer API
const portainerBaseUrl = "https://portainer.kubelab.dk/api"; 
// Defines the credentials for authentication
const credentials = {
    username: "codecrew",
    password: "Ladida.12"
};

// Function to authenticate and get a JWT token
exports.portainerSystemAuth = async function () {
    try {
        const authUrl = `${portainerBaseUrl}/auth`; // Defines the URL for the authentication endpoint
        const response = await axios.post(authUrl, credentials); // Sends a POST request with the credentials
        console.log("Authentication successful."); // Logs success message
        return response.data.jwt; // Returns the token from the response
    } catch (error) {
        console.error("Error authenticating:", error.message); // Logs any errors
    }
}

// Function to fetch system information
exports.portainerSystemInfo = async function (token) {
    try {
        const infoUrl = `${portainerBaseUrl}/system/info`; // Defines the URL for the system info endpoint
        const response = await axios.get(infoUrl, {
            headers: { Authorization: `Bearer ${token}` }, // Includes the token in the Authorization header
        });
        console.log("System Info:", response.data); // Logs the fetched system information
        return response.data; // Returns the system info data
    } catch (error) {
        console.error("Error fetching system info:", error.message); // Logs any errors
    }
}

// Function to fetch system status
exports.portainerSystemStatus = async function (token) {
    try {
        const statusUrl = `${portainerBaseUrl}/system/status`; // Defines the URL for the system status endpoint
        const response = await axios.get(statusUrl, {
            headers: { Authorization: `Bearer ${token}` }, // Includes the token in the Authorization header
        });
        console.log("System Status:", response.data); // Logs the fetched system status
        return response.data; // Returns the system status data
    } catch (error) {
        console.error("Error fetching system status:", error.message); // Logs any errors
    }
}

// Function to fetch Portainer stacks
exports.portainerStacks = async function (token) {
    try {
        const stacksUrl = `${portainerBaseUrl}/stacks`; // Defines the URL for the stacks endpoint
        const response = await axios.get(stacksUrl, {
            headers: { Authorization: `Bearer ${token}` }, // Includes the token in the Authorization header
        });
        console.log("Portainer Stacks:", response.data); // Logs the fetched stacks
        return response.data; // Returns the stacks data
    } catch (error) {
        console.error("Error fetching Portainer stacks:", error.message); // Logs any errors
    }
}

// Function to fetch Portainer endpoints
exports.portainerEndpoints = async function (token) {
    try {
        const endpointsUrl = `${portainerBaseUrl}/endpoints`; // Defines the URL for the endpoints endpoint
        const response = await axios.get(endpointsUrl, {
            headers: { Authorization: `Bearer ${token}` }, // Includes the token in the Authorization header
        });
        console.log("Portainer Endpoints:", response.data); // Logs the fetched endpoints
        return response.data; // Returns the endpoints data
    } catch (error) {
        console.error("Error fetching Portainer endpoints:", error.message); // Logs any errors
    }
}

// Function to create a new stack in Portainer
exports.portainerCreateStack = async function (token, fromTemplate, stackName, stackFileContent, swarmId) {
    const url = `${portainerBaseUrl}/stacks/create/swarm/string?endpointId=5`;
    const payload = {
        "fromTemplate": fromTemplate,
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

        console.log(`Stack "${stackName}" created successfully:`, response.data); // Logs success message with stack details
        return response.data; // Returns the response data


    } catch (error) {
        console.error(`Error creating stack "${stackName}":`, error.message); // Logs any errors
    }







    // const payload = {
    //     "fromTemplate": false,
    //     "name": "testoBestoPesto",
    //     "stackFileContent": "{\"networks\":{\"traefik-proxy\":{\"external\":true}},\"services\":{\"test\":{\"image\":\"nginx:latest\",\"networks\":[\"traefik-proxy\"],\"deploy\":{\"labels\":[\"traefik.enable=true\",\"traefik.http.routers.marcus.rule=Host(`marcus.kubelab.dk`)\",\"traefik.http.routers.marcus.entrypoints=web,websecure\",\"traefik.http.routers.marcus.tls.certresolver=letsencrypt\",\"traefik.http.services.marcus.loadbalancer.server.port=80\"]}}}}",
    //     "swarmId": "v1pkdou24tzjtncewxhvpmjms"
    //     }

    // try {
    //     const response = await axios.post(url, payload, {
    //         headers: {
    //             'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJjb2RlY3JldyIsInJvbGUiOjIsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE3MzIxNDQwMTYsImlhdCI6MTczMjExNTIxNiwianRpIjoiOTdjNDcwNGUtMDlkNy00NzZiLThkY2MtZDNkYjU2YjI0MmUzIn0.aTjjPNa1JDbQMD44Ud-ErFKIu8AVLRNgRWrEyshqIAA`,
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     console.log(response.data);
    // }
    // catch(err) {
    //     console.log(err);
        
    // }




}

// Function to delete a stack by ID
exports.portainerDeleteStack = async function (token, stackId) {
    try {
        const stackUrl = `${portainerBaseUrl}/stacks/${stackId}?endpointId=5`; // Defines the URL for the specific stack
        const response = await axios.delete(stackUrl, {
            headers: { Authorization: `Bearer ${token}` }, // Includes the token in the Authorization header
            params: { external: false }, // Set `external` to `false` unless deleting an external stack
        });
        console.log(`Stack with ID ${stackId} deleted successfully.`); // Logs success message
        return response.data; // Returns the response data
    } catch (error) {
        console.error(`Error deleting stack with ID ${stackId}:`, error.message); // Logs any errors
    }
}


/*
exports.portainerSystemAuth = async function () {
    const url = "https://portainer.kubelab.dk/api/auth";
    const body = {
        username: "codecrew",
        password: "Ladida.12"
    };

    axios.post(url, body)
    .then(response => {
        console.log(response.data)
    })
    .catch(error => console.error(error))

};

exports.portainerSystemInfo = function () {
    
};

exports.portainerSystemStatus = function () {
    
};
exports.portainerStacks = async function () {
};

exports.portainerEndpoints = function () {
    
};

exports.portainerCreateStack = function () {
    
};

exports.portainerDeleteStack = function () {
    
};
*/