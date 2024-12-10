const dashboardM = require('../models/dashboardModel');
const userM = require('../models/userModel');
const templateM = require('../models/templateModel');
const extraM = require("../models/extraModel");

async function getJWT(userId) {
	return await userM.getJWTfromUser(userId) || await dashboardM.portainerSystemAuth()  // last half shouldn't reaaaaly be there. but we dont have to login then
} 


exports.dashboard = async function (req, res) {
	try {
		if(!req.session.userDetails) {
		     throw new Error("You are not logged in")
		}

		let response;

		const stacks = await dashboardM.portainerStacks(await getJWT(req.session.userDetails.userId));
		
		const allStacks = [];

		for (let i = 0; i < stacks.length; i++) {
			allStacks.push({
				userId: req.session.userDetails.userId || 8,
				name: stacks[i].Name,
				status: stacks[i].Status === 1,
				creationDate: extraM.convertingDateFormat(stacks[i].CreationDate * 1000),
				lastUpdate:
					stacks[i].UpdateDate == 0
						? extraM.convertingDateFormat(stacks[i].CreationDate * 1000)
						: extraM.convertingDateFormat(stacks[i].UpdateDate * 1000),
				createdBy: stacks[i].CreatedBy,
				template: stacks[i].EntryPoint,
				subDomain: 'ehhh, brain no work',
				lastActive: extraM.convertingDateFormat(new Date()),
				author: 'welp', // firstname lastname function based on userId
				portainerStackId: stacks[i].Id,
				isCreator: true // should be an if statement with (req.session.userDetails.userId == FK_userId) from the Stacks table
			});
		}

		const allTemplates = await templateM.getAllTemplatesIdAndTitle();			
		response = {
			stack: allStacks,
			templates: allTemplates,
            title: "Dashboard",
			isNewStackAllowed: req.session.userDetails.isNewStackAllowed
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

		if(req.session.userDetails.isNewStackAllowed) {
			res.redirect("back");
		}

		const { stack_name, domain_name, chosen_template } = req.body; // get content from form
		
		// const await getJWT() = await userM.getJWTfromUser(req.session.userDetails.userId) // gets the logged in user's JWT
		const template = await templateM.replacePlaceholder(chosen_template, domain_name) // if the choosen template has "CHANGEME" and/or "SUBDOMAIN" it will be replaced with the subDomain and return the whole template.

		//const result = await dashboardM.portainerCreateStack(await getJWT(req.session.userDetails.userId), stack_name, template); // comment, so we dont create a new stack, on the live server by accident.
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
				portainerId: result.Id,
			}
			await dashboardM.portainerDeleteStack(await getJWT(req.session.userDetails.userId), result.Id); // just if we want to delete the stack right after creation, so we dont flod the live server. we still get whatever we log.
			await dashboardM.addNewStackToDB(saveToDb, saveToDb.userId); // save it to DB. runs twice??
			console.log(saveToDb);	
		}
		res.redirect('/dashboard');
	}
	catch(error) {
		console.warn("Dashboard : " + error);
		res.redirect('/dashboard');
	}
};

exports.stopStack = async function (req, res) {
	try {
		console.log("welp");
		console.log(req.body);
		
		await dashboardM.portainerStartStack(await getJWT(req.session.userDetails.userId), req.body.stackId);
		res.redirect('/dashboard');
	}
	
	catch(error) {
		console.warn("Dashboard : " + error);
		res.redirect('/dashboard');
	}
}

exports.startStack = async function (req, res) {
	try {
		console.log("welp");
		console.log(req.body);
		
		await dashboardM.portainerStartStack(await getJWT(req.session.userDetails.userId), req.body.stackId);
		res.redirect('/dashboard');
	}
	
	catch(error) {
		console.warn("Dashboard : " + error);
		res.redirect('/dashboard');
	}
}