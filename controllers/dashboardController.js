const dashboardM = require('../models/dashboardModel');
const userM = require('../models/userModel');
const templateM = require('../models/templateModel');
const extraM = require('../models/extraModel');

async function getJWT(userId) {
	return (await userM.getJWTfromUser(userId)) || (await dashboardM.portainerSystemAuth());
	// Henter enten brugerens eksisterende JWT token eller genererer en ny via Portainer auth
}
exports.dashboard = async function (req, res) {
	try {
		if (!req.session.userDetails) {
			throw new Error('You are not logged in');
		}
		// Sikrer at kun indloggede brugere kan tilgå dashboard

		let response;

		const stacks = await dashboardM.portainerStacks(await getJWT(req.session.userDetails.userId));
		// Henter alle stacks fra Portainer med brugerens JWT

		const allStacksDB = await dashboardM.getAllStacksFromDB();
		// Henter alle stacks fra vores lokale database

		const allStacks = [];

		for (let i = 0; i < stacks.length; i++) {
			const stack = stacks[i];

			if (!allStacksDB.some(k => k.portainerStackId == stack.Id)) {
				// Tjekker om Portainer stack findes i vores database - hvis ikke, tilføjes den

				const newStack = {
					userId: req.session.userDetails.userId || 8,
					name: stack.Name,
					status: stack.Status === 1,
					creationDate: new Date(stack.CreationDate * 1000),
					lastUpdate: stack.UpdateDate == 0 ? new Date(stack.CreationDate * 1000) : new Date(stack.UpdateDate * 1000),
					createdBy: stack.CreatedBy,
					template: stack.EntryPoint,
					subDomain: 'ehhh, brain no work',
					lastActive: new Date(),
					author: 'welp',
					portainerStackId: stack.Id,
				};
				// Opretter nyt stack objekt med data fra Portainer

				await dashboardM.addNewStackToDB(newStack, req.session.userDetails.userId);
				// Gemmer den nye stack i databasen
			}
		}

		for (let i = 0; i < stacks.length; i++) {
			let findDBstack = allStacksDB.find(k => k.portainerStackId == stacks[i].Id);
			let fullName = await userM.getNameOfUserById(findDBstack.FK_userId);
			// Finder matchende database entry og henter brugerinfo

			allStacks.push({
				// Kombinerer data fra Portainer og database til komplet stack information
			});
		}

		const allTemplates = await templateM.getAllTemplatesIdAndTitle();
		// Henter alle tilgængelige templates

		response = {
			stack: allStacks,
			templates: allTemplates,
			title: 'Dashboard',
			isNewStackAllowed: req.session.userDetails.isNewStackAllowed,
			isSuperAdmin: req.session.userDetails.accessLevel == 'superAdmin',
		};
		// Samler al nødvendig data til dashboard visningen

		res.render('dashboard', response);
		// Viser dashboard med den samlede data
	} catch (error) {
		console.log(error);
		res.render('dashboard', await dashboardM.mockData());
		// Ved fejl vises mock data i stedet
	}
};

exports.createStack = async function (req, res) {
	try {
		if (!req.session.userDetails.isNewStackAllowed) {
			res.redirect('dashboard');
		}
		// Kontrollerer om brugeren har rettigheder til at oprette stacks

		const { stack_name, domain_name, chosen_template } = req.body;
		// Henter form data fra request

		const template = await templateM.replacePlaceholder(chosen_template, domain_name);
		// Erstatter placeholders i template med brugerens input

		const result = await dashboardM.portainerCreateStack(
			await getJWT(req.session.userDetails.userId),
			stack_name,
			template
		);
		// Opretter ny stack i Portainer

		if (result) {
			let saveToDb = {
				// Forbereder data til at gemme i databasen
			};
			await dashboardM.addNewStackToDB(saveToDb, saveToDb.userId);
			// Gemmer stack informationen i databasen
		}
		res.redirect('/dashboard');
	} catch (error) {
		console.warn('Dashboard : ' + error);
		res.redirect('/dashboard');
	}
};
