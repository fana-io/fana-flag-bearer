const MANAGER_URI = 'http://localhost:6000';
const axios = require('axios');

const getRuleset = async () => {
  let { data } = await axios.get(MANAGER_URI+'/flagset');
  return data;
};

module.exports = { getRuleset }