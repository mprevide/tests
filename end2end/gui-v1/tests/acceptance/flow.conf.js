const config = require('./default.conf');

// clearDb won't work anymore
config.clearDb = true;
config.tests = './Scenarios/Sanity/flow_test.js',

exports.config = config;