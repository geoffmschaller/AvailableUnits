const axios = require('axios');

const getResults = async (url) => {
	const getMakes = await axios.get(url);
	return getMakes['data'].split('<div class="avresults">')[1].replace(/\n/g, '').split('<br />');
}

module.exports = getResults;