const dashboardM = require('../models/dashboardModel');
const userM = require('../models/userModel');
const { replacePlaceholder } = require('../models/templateModel');

exports.dashboard = async function (req, res) {
    try {
        
        const {stack_name, domain_name, chosen_template} = req.body;
        // if(!req.session.userDetails) {
        //     throw new Error("You are not logged in")
        // }
        //const jwt = await userM.getJWTfromUser(req.session.userDetails.userId);

        //await dashboardM.portainerSystemAuth()
        //await dashboardM.portainerSystemInfo("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJjb2RlY3JldyIsInJvbGUiOjIsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE3MzIxMzYzNDMsImlhdCI6MTczMjEwNzU0MywianRpIjoiYzdhMGZlZGQtYTQ5Yy00YTA2LTllNTItYTU5YWRkMzZhNTNiIn0.tM-Bi6y7EBUagHcFRQ60FrHiT3amCGAtcvtikP5evno")
        //await dashboardM.portainerSystemStatus("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJjb2RlY3JldyIsInJvbGUiOjIsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE3MzIxMzYzNDMsImlhdCI6MTczMjEwNzU0MywianRpIjoiYzdhMGZlZGQtYTQ5Yy00YTA2LTllNTItYTU5YWRkMzZhNTNiIn0.tM-Bi6y7EBUagHcFRQ60FrHiT3amCGAtcvtikP5evno")
        //await dashboardM.portainerStacks("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJjb2RlY3JldyIsInJvbGUiOjIsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE3MzIxMzYzNDMsImlhdCI6MTczMjEwNzU0MywianRpIjoiYzdhMGZlZGQtYTQ5Yy00YTA2LTllNTItYTU5YWRkMzZhNTNiIn0.tM-Bi6y7EBUagHcFRQ60FrHiT3amCGAtcvtikP5evno").then((k) => {console.log(k[0].Status);})
        //await dashboardM.portainerEndpoints("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJjb2RlY3JldyIsInJvbGUiOjIsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE3MzIxMzYzNDMsImlhdCI6MTczMjEwNzU0MywianRpIjoiYzdhMGZlZGQtYTQ5Yy00YTA2LTllNTItYTU5YWRkMzZhNTNiIn0.tM-Bi6y7EBUagHcFRQ60FrHiT3amCGAtcvtikP5evno")
        //console.log(await replacePlaceholder(4, 'domain_name'));
    
        //await dashboardM.portainerCreateStack("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJjb2RlY3JldyIsInJvbGUiOjIsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE3MzIxMzYzNDMsImlhdCI6MTczMjEwNzU0MywianRpIjoiYzdhMGZlZGQtYTQ5Yy00YTA2LTllNTItYTU5YWRkMzZhNTNiIn0.tM-Bi6y7EBUagHcFRQ60FrHiT3amCGAtcvtikP5evno", false, stack_name, "networks:\n  traefik-proxy:\n    external: true\n  wp-network:\n    driver: overlay\nservices:\n  wordpress:\n    image: wordpress:latest\n    environment:\n      WORDPRESS_DB_HOST: db\n      WORDPRESS_DB_USER: wpuser\n      WORDPRESS_DB_PASSWORD: wppassword\n      WORDPRESS_DB_NAME: wpdatabase\n    networks:\n      - traefik-proxy\n      - wp-network\n    deploy:\n      labels:\n        - traefik.enable=true\n        - traefik.http.routers.tihi.rule=Host(`tihi1.kubelab.dk`)\n        - traefik.http.routers.tihi.entrypoints=web,websecure\n        - traefik.http.routers.tihi.tls.certresolver=letsencrypt\n        - traefik.http.services.tihi.loadbalancer.server.port=80\n  db:\n    image: mariadb:latest\n    environment:\n      MYSQL_ROOT_PASSWORD: rootpassword\n      MYSQL_DATABASE: wpdatabase\n      MYSQL_USER: wpuser\n      MYSQL_PASSWORD: wppassword\n    networks:\n      - wp-network\n  phpmyadmin:\n    image: phpmyadmin:latest\n    environment:\n      PMA_HOST: db\n      PMA_USER: wpuser\n      PMA_PASSWORD: wppassword\n    networks:\n      - traefik-proxy\n      - wp-network\n    deploy:\n      labels:\n        - traefik.enable=true\n        - traefik.http.routers.tihi2.rule=Host(`tihi2.kubelab.dk`)\n        - traefik.http.routers.tihi2.entrypoints=web,websecure\n        - traefik.http.routers.tihi2.tls.certresolver=letsencrypt\n        - traefik.http.services.tihi2.loadbalancer.server.port=80", "v1pkdou24tzjtncewxhvpmjms")
        //await dashboardM.portainerDeleteStack("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJjb2RlY3JldyIsInJvbGUiOjIsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE3MzIxMzYzNDMsImlhdCI6MTczMjEwNzU0MywianRpIjoiYzdhMGZlZGQtYTQ5Yy00YTA2LTllNTItYTU5YWRkMzZhNTNiIn0.tM-Bi6y7EBUagHcFRQ60FrHiT3amCGAtcvtikP5evno", 64)
        
        res.render('dashboard', {datas: JSON.stringify(await dashboardM.mockData())});

        //res.render('dashboard', await dashboardM.mockData());    
    }catch (error) {
        console.log(error);
        res.render("dashboard", await dashboardM.mockData());
    }
}
exports.dashboardRedirect = function (req, res) {
    res.redirect("/dashboard")
};
exports.createStack = function (req, res) {
    res.redirect("/dashboard")
};