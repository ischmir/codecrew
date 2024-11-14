
exports.userSettings = () => {
    const data = {
        title: "Settings"
    }

    return data;
}

exports.userSettingsPassword = (message) => {
    const data = {
    message,
    title: "Settings"    
    }

    return data;
}