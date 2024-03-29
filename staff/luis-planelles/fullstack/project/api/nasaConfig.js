require('dotenv').config();

const { getStringDate } = require('../api/logic/helpers');

const currentDate = new Date();
const startDate = getStringDate(currentDate);

const nasaApiKey = process.env.NASA_KEY;
const NASADonki = 'https://api.nasa.gov/DONKI';

const nasaEndpoints = {
  massEjection: `${NASADonki}/CME?startDate=${startDate}&api_key=${nasaApiKey}`,
  geoStorm: `${NASADonki}/GST?startDate=${startDate}&api_key=${nasaApiKey}`,
  planetShock: `${NASADonki}/IPS?startDate=${startDate}&api_key=${nasaApiKey}`,
  solarFlare: `${NASADonki}/FLR?startDate=${startDate}&api_key=${nasaApiKey}`,
  solarParticle: `${NASADonki}/SEP?startDate=${startDate}&api_key=${nasaApiKey}`,
  magnetoPause: `${NASADonki}/MPC?startDate=${startDate}&api_key=${nasaApiKey}`,
  radiationBelt: `${NASADonki}/RBE?startDate=${startDate}&api_key=${nasaApiKey}`,
  speedSteam: `${NASADonki}/HSS?startDate=${startDate}&api_key=${nasaApiKey}`,
};

module.exports = nasaEndpoints;
