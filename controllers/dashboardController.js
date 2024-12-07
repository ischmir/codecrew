const dashboardM = require('../models/dashboardModel');
const userM = require('../models/userModel');
const templateM = require('../models/templateModel');

function convertingDateFormat(date) {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).replaceAll('/', '-').replaceAll(",", "")
}

exports.dashboard = async function (req, res) {
	try {
		if(!req.session.userDetails) {
		     throw new Error("You are not logged in")
		}
		const jwt = await userM.getJWTfromUser(req.session.userDetails.userId) || await dashboardM.portainerSystemAuth(); // last half shouldn't reaaaaly be there. but we dont have to login then
        
		let testo;
		// console.log(await dashboardM.portainerSystemAuth())
		//await dashboardM.portainerSystemInfo("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJjb2RlY3JldyIsInJvbGUiOjIsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE3MzIxMzYzNDMsImlhdCI6MTczMjEwNzU0MywianRpIjoiYzdhMGZlZGQtYTQ5Yy00YTA2LTllNTItYTU5YWRkMzZhNTNiIn0.tM-Bi6y7EBUagHcFRQ60FrHiT3amCGAtcvtikP5evno")
		//await dashboardM.portainerSystemStatus("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJjb2RlY3JldyIsInJvbGUiOjIsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE3MzIxMzYzNDMsImlhdCI6MTczMjEwNzU0MywianRpIjoiYzdhMGZlZGQtYTQ5Yy00YTA2LTllNTItYTU5YWRkMzZhNTNiIn0.tM-Bi6y7EBUagHcFRQ60FrHiT3amCGAtcvtikP5evno")
		const stacks = await dashboardM.portainerStacks(jwt);
		const reeeeee = [];

		for (let i = 0; i < stacks.length; i++) {
			reeeeee.push({
				userId: req.session.userDetails.userId || 8,
				name: stacks[i].Name,
				status: stacks[i].Status === 1,
				creationDate: convertingDateFormat(stacks[i].CreationDate * 1000),
				lastUpdate:
					stacks[i].UpdateDate == 0
						? convertingDateFormat(stacks[i].CreationDate * 1000)
						: convertingDateFormat(stacks[i].UpdateDate * 1000),
				createdBy: stacks[i].CreatedBy,
				template: stacks[i].EntryPoint,
				subDomain: 'ehhh, brain no work',
				lastActive: convertingDateFormat(new Date()),
				author: 'welp', // firstname lastname function based on userId
			});
			// filter reeeee baseret på userId
		}

		//console.log(await dashboardM.filterStackCall(reeeeee));
		await dashboardM.filterStackCall(reeeeee);

		const allTemplates = await templateM.getAllTemplatesIdAndTitle();
		
		testo = {
			stack: reeeeee,
			templates: allTemplates,
            title: "Dashboard"
		};

		//await dashboardM.portainerEndpoints("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJjb2RlY3JldyIsInJvbGUiOjIsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE3MzIxMzYzNDMsImlhdCI6MTczMjEwNzU0MywianRpIjoiYzdhMGZlZGQtYTQ5Yy00YTA2LTllNTItYTU5YWRkMzZhNTNiIn0.tM-Bi6y7EBUagHcFRQ60FrHiT3amCGAtcvtikP5evno")
		//console.log(await replacePlaceholder(4, 'domain_name'));

		//await dashboardM.portainerCreateStack("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJjb2RlY3JldyIsInJvbGUiOjIsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE3MzIxMzYzNDMsImlhdCI6MTczMjEwNzU0MywianRpIjoiYzdhMGZlZGQtYTQ5Yy00YTA2LTllNTItYTU5YWRkMzZhNTNiIn0.tM-Bi6y7EBUagHcFRQ60FrHiT3amCGAtcvtikP5evno", false, stack_name, "networks:\n  traefik-proxy:\n    external: true\n  wp-network:\n    driver: overlay\nservices:\n  wordpress:\n    image: wordpress:latest\n    environment:\n      WORDPRESS_DB_HOST: db\n      WORDPRESS_DB_USER: wpuser\n      WORDPRESS_DB_PASSWORD: wppassword\n      WORDPRESS_DB_NAME: wpdatabase\n    networks:\n      - traefik-proxy\n      - wp-network\n    deploy:\n      labels:\n        - traefik.enable=true\n        - traefik.http.routers.tihi.rule=Host(`tihi1.kubelab.dk`)\n        - traefik.http.routers.tihi.entrypoints=web,websecure\n        - traefik.http.routers.tihi.tls.certresolver=letsencrypt\n        - traefik.http.services.tihi.loadbalancer.server.port=80\n  db:\n    image: mariadb:latest\n    environment:\n      MYSQL_ROOT_PASSWORD: rootpassword\n      MYSQL_DATABASE: wpdatabase\n      MYSQL_USER: wpuser\n      MYSQL_PASSWORD: wppassword\n    networks:\n      - wp-network\n  phpmyadmin:\n    image: phpmyadmin:latest\n    environment:\n      PMA_HOST: db\n      PMA_USER: wpuser\n      PMA_PASSWORD: wppassword\n    networks:\n      - traefik-proxy\n      - wp-network\n    deploy:\n      labels:\n        - traefik.enable=true\n        - traefik.http.routers.tihi2.rule=Host(`tihi2.kubelab.dk`)\n        - traefik.http.routers.tihi2.entrypoints=web,websecure\n        - traefik.http.routers.tihi2.tls.certresolver=letsencrypt\n        - traefik.http.services.tihi2.loadbalancer.server.port=80", "v1pkdou24tzjtncewxhvpmjms")
		//await dashboardM.portainerDeleteStack("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJjb2RlY3JldyIsInJvbGUiOjIsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE3MzIxMzYzNDMsImlhdCI6MTczMjEwNzU0MywianRpIjoiYzdhMGZlZGQtYTQ5Yy00YTA2LTllNTItYTU5YWRkMzZhNTNiIn0.tM-Bi6y7EBUagHcFRQ60FrHiT3amCGAtcvtikP5evno", 64)

		//res.render('dashboard', JSON.stringify(await dashboardM.mockData()));

		res.render('dashboard', testo);
		//res.render('dashboard', await dashboardM.mockData());
	} catch (error) {
		console.log(error);
		res.render('dashboard', await dashboardM.mockData());
	}
};

exports.dashboardRedirect = function (req, res) {
	res.redirect('/dashboard');
};
exports.createStack = async function (req, res) {
	try {
		const { stack_name, domain_name, chosen_template } = req.body; // get content from form
		
		const jwt = await userM.getJWTfromUser(req.session.userDetails.userId) // gets the logged in user's JWT
		const template = await templateM.replacePlaceholder(chosen_template, domain_name) // if the choosen template has "CHANGEME" and/or "SUBDOMAIN" it will be replace with the subDomain and return the whole template.

		//const result = await dashboardM.portainerCreateStack(jwt, stack_name, template); // comment, so we dont create a new stack, on the live server by accident. 
		console.log(result);
		
		if(result) {
			let saveToDb = {
				userId: req.session.userDetails.userId || 8,
				name: result.Name,
				status: result.Status == 1,
				creationDate: new Date(result.CreationDate * 1000),
				lastUpdate:
					result.UpdateDate == 0
						? new Date(result.CreationDate * 1000)
						: new Date(result.UpdateDate * 1000),
				createdBy: result.CreatedBy,
				template: chosen_template,
				subDomain: domain_name,
				lastActive: Date.now(),
				author: `${req.session.userDetails.firstName} ${req.session.userDetails.lastName}`,
			}
			await dashboardM.portainerDeleteStack(jwt, result.Id); // just if we want to delete the stack right after creation, so we dont flod the live server. we still get whatever we log.
			await dashboardM.filterStackCall(saveToDb, saveToDb.userId); // save it to DB. runs twice??
			console.log(saveToDb);	
		}
		res.redirect('/dashboard');
	}
	catch(error) {
		console.warn("Dashboard : " + error);
		res.redirect('/dashboard');
	}
};
