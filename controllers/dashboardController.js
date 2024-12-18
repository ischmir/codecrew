const dashboardM = require('../models/dashboardModel');
const userM = require('../models/userModel');
const templateM = require('../models/templateModel');
const extraM = require('../models/extraModel');

async function getJWT(userId) {
	return (await userM.getJWTfromUser(userId)) || (await dashboardM.portainerSystemAuth());
}

exports.dashboard = async function (req, res) {
	try {
		if (!req.session.userDetails) {
			throw new Error('You are not logged in');
		}

		let response;

		const stacks = await dashboardM.portainerStacks(await getJWT(req.session.userDetails.userId));
		const allStacksDB = await dashboardM.getAllStacksFromDB();
		const allStacks = [];



		for (let i = 0; i < stacks.length; i++) {
			// for getting data from portainer to the db. but we cant get info on some things, so we have dummy there, only use it for catch up.
			const stack = stacks[i];

			if (!allStacksDB.some(k => k.portainerStackId == stack.Id)) {
				// check if the db is missing a stack.
				const newStack = {
					userId: req.session.userDetails.userId, // dummy
					name: stack.Name,
					status: stack.Status === 1,
					creationDate: new Date(stack.CreationDate * 1000),
					lastUpdate: stack.UpdateDate == 0 ? new Date(stack.CreationDate * 1000) : new Date(stack.UpdateDate * 1000),
					createdBy: stack.CreatedBy,
					template: null,  // dummy
					subDomain: 'dummyDomain', // dummy
					lastActive: new Date(),
					author: "Can't find. " + stack.createdBy, // dummy
					portainerStackId: stack.Id,
				};

				await dashboardM.addNewStackToDB(newStack);
			}
		}

		for (let i = 0; i < stacks.length; i++) {
			let findDBstack = await allStacksDB.find(k => k.portainerStackId == stacks[i].Id);
			let fullName = await userM.getNameOfUserById(findDBstack.FK_userId);

			allStacks.push({
				userId: findDBstack.FK_userId,
				name: stacks[i].Name,
				status: stacks[i].Status === 1,
				creationDate: extraM.convertingDateFormat(stacks[i].CreationDate * 1000),
				lastUpdate:
					stacks[i].UpdateDate == 0
						? extraM.convertingDateFormat(stacks[i].CreationDate * 1000)
						: extraM.convertingDateFormat(stacks[i].UpdateDate * 1000),
				createdBy: stacks[i].CreatedBy,
				template: findDBstack.template,
				subDomain: findDBstack.subDomain,
				lastActive: extraM.convertingDateFormat(new Date()),
				author: fullName.firstName + ' ' + fullName.lastName,
				portainerStackId: stacks[i].Id,
				isCreator: req.session.userDetails.userId == findDBstack.FK_userId,
			});
		}

		const allTemplates = await templateM.getAllTemplatesIdAndTitle();
		response = {
			stack: allStacks,
			templates: allTemplates,
			title: 'Dashboard',
			isNewStackAllowed: req.session.userDetails.isNewStackAllowed,
			isSuperAdmin: req.session.userDetails.accessLevel == 'superAdmin',
		};

		res.render('dashboard', response);
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
        if (!req.session.userDetails.isNewStackAllowed) {
            return res.redirect('/dashboard'); 
        }

        const { stack_name, domain_name, chosen_template } = req.body;
        const template = await templateM.replacePlaceholder(chosen_template, domain_name);

        const result = await dashboardM.portainerCreateStack(
            await getJWT(req.session.userDetails.userId),
            stack_name,
            template
        );

        if (result) {
            const saveToDb = {
                userId: req.session.userDetails.userId || 8,
                name: result.Name,
                status: result.Status == 1,
                creationDate: new Date(result.CreationDate * 1000),
                lastUpdate: result.UpdateDate == 0 ? new Date(result.CreationDate * 1000) : new Date(result.UpdateDate * 1000),
                createdBy: result.CreatedBy,
                template: chosen_template,
                subDomain: domain_name,
                lastActive: new Date(),
                author: `${req.session.userDetails.firstName} ${req.session.userDetails.lastName}`,
                portainerStackId: result.Id,
            };
			
            await dashboardM.addNewStackToDB(saveToDb);
            
        }
        return res.redirect('/dashboard');
    } catch (error) {
        console.warn('Dashboard : ' + error);
        return res.redirect('/dashboard'); 
    }
};

// Stop Stack
exports.stopStack = async function (req, res) {
	try {
		console.log('welp');
		console.log(req.body);

		await dashboardM.portainerStopStack(await getJWT(req.session.userDetails.userId), req.body.stackId);
		res.redirect('/dashboard');
	} catch (error) {
		console.warn('Dashboard : ' + error);
		res.redirect('/dashboard');
	}
};
// Start Stack
exports.startStack = async function (req, res) {
	try {
		console.log('welp');
		console.log(req.body);

		await dashboardM.portainerStartStack(await getJWT(req.session.userDetails.userId), req.body.stackId);
		res.redirect('/dashboard');
	} catch (error) {
		console.warn('Dashboard : ' + error);
		res.redirect('/dashboard');
	}
};
// Restart Stack

exports.restartStack = async function (req, res) {
	try {
		await dashboardM.portainerRestartStack(await getJWT(req.session.userDetails.userId), req.body.stackId);
		res.redirect('/dashboard');
	} catch (error) {
		console.warn('Dashboard : ' + error);
		res.redirect('/dashboard');
	}
};

exports.deleteStack = async function (req, res) {
	try {
		const { portainerStackId } = req.params;

		const isDeleted = await dashboardM.portainerDeleteStack(
			await getJWT(req.session.userDetails.userId),
			portainerStackId
		); // Portainer
		const isDeletedDB = await dashboardM.deleteStackFromDB(portainerStackId); // DB

		if (isDeleted != 204 && isDeletedDB.affectedRows < 1) {
			throw new Error('Nothing got deleted');
		} else {
			res.redirect('/dashboard');
		}
	} catch (error) {
		console.warn('Dashboard : ' + error);
		res.redirect('/dashboard');
	}
};
