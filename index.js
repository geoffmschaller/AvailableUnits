const getOptions = require('./getOptions');
const getResults = require('./getResults');
const printTitle = require('./printTitle');
const getInput = require('./getInput');

require('dotenv').config();


const main = async () => {

	const truck_details = {}
	const args = process.argv;

	if (args.length < 3) {
		console.log("THis is the help screen.");
		return;
	}

	if (args[2].length != 4) {
		console.log("This is the formatting screen.");
		return;
	}

	printTitle();

	truck_details.year = args[2];

	mode = 0;
	let options_results = '';
	let ans = '';
	while (mode >= 0) {
		try {
			switch (mode) {
				case 0:
					options_results = await getOptions('Make', process.env.base_url + process.env.make_url + `?year=${truck_details.year}`);
					ans = await getInput('Select Make...');
					truck_details.make = options_results[ans][Object.keys(options_results[ans])[0]];
					mode += 1;
					break;
				case 1:
					options_results = await getOptions('Model', process.env.base_url + process.env.model_url + `?year=${truck_details.year}&make=${truck_details.make}`);
					ans = await getInput('Select Model...');
					if (ans === 'b' || ans === 'back') {
						mode -= 1;
						break;
					}
					truck_details.model = options_results[ans][Object.keys(options_results[ans])[0]];
					mode += 1;
					break;
				case 2:
					options_results = await getOptions('Cab', process.env.base_url + process.env.cab_url + `?year=${truck_details.year}&make=${truck_details.make}&model=${truck_details.model}`);
					ans = await getInput('Select Cab...');
					if (ans === 'b' || ans === 'back') {
						mode -= 1;
						break;
					}
					truck_details.cab = options_results[ans][Object.keys(options_results[ans])[0]];
					mode += 1;
					break;
				case 3:
					options_results = await getOptions('Bed Length', process.env.base_url + process.env.bed_url + `?year=${truck_details.year}&make=${truck_details.make}&model=${truck_details.model}&cab=${truck_details.cab}`);
					ans = await getInput('Select Bed Length...');
					if (ans === 'b' || ans === 'back') {
						mode -= 1;
						break;
					}
					truck_details.bed = options_results[ans][Object.keys(options_results[ans])[0]];
					mode = -1;
					break;
			}	
		} catch (err) {
			console.log("\nInvalid Information Provided.");
		}
	}
	
	
	const results = await getResults(process.env.base_url + process.env.results_url + `?year=${truck_details.year}&make=${truck_details.make}&model=${truck_details.model}&cab=${truck_details.cab}&bed=${truck_details.bed}`);
	console.log('\n--- RESULTS ---');
	for (let j = 0; j < results.length - 1; j++){
		console.log(results[j]);
	}
	console.log('\n');

}

main();