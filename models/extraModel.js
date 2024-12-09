const db = require("../config/db");

exports.updateJWTtoUser = async function (jwt, lastUpdate, userId) {
    const verifyNow = Date.now();
    const lastUpdateParse = Date.parse(lastUpdate)
    
    let seconds = Math.floor((verifyNow - (lastUpdateParse)) / 1000);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);    
    
    if(hours >= 8) {
        const [up] = await db.execute("UPDATE Options SET optionValue = ?, optionsLastUpdate = ? where optionsId = (select FK_options FROM Users WHERE userId = ? )", [jwt, new Date(), userId]);
        
        return up.affectedRows;
    }
    return false;
}
exports.convertingDateFormat = function (date) {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).replaceAll('/', '-').replaceAll(",", "")
}