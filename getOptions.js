const axios = require('axios');

const getOptions = async (title, url) => {
	const getMakes = await axios.get(url);
	const raw_make_results = getMakes['data'].split('<option value=\"');
	if (raw_make_results < 4) throw error;
	let make_results = [];
	for (let i = 2; i < raw_make_results.length; i++){
		let abbr = raw_make_results[i].split("\">")[0];
		let full = raw_make_results[i].split("\">")[1].replace('</option>\n', '');
		let result = {};
		result[full] = abbr;
		make_results.push(result);
	}
	console.log(`\n --- ${title} ---`);
	for (let k = 0; k < make_results.length; k++){
		for (const [key] of Object.entries(make_results[k])) {
			console.log(`[${k}]: ${key}`);
		  }
	}
	return make_results;
}

module.exports = getOptions;