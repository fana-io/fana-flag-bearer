const MANAGER_URI = 'http://localhost:6000/api';
const axios = require('axios');

const getRuleset = async () => {
  let { data } = await axios.get(MANAGER_URI+'/ruleset');
  return data;
};

module.exports = { getRuleset }