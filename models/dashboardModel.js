const axios = require('axios');
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

exports.portainerSystemInfo = function () {
    
};

exports.portainerSystemStatus = function () {
    
};
exports.portainerStacks = async function () {
};

exports.portainerEndpoints = function () {
    
};
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

exports.portainerCreateStack = function () {
    
};

exports.portainerDeleteStack = function () {
    
};