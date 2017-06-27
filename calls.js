#! /usr/bin/env node

const request = require('request');
/**
 *
 * Example of running the script
 * If you would like to make a query every minute for 3 hours you shoul
 * 1. numberOfCalls = 180 // 180 calls
 * 2. INTERVAL = 60 //every minute
 * 3. run `node index.js`
 */

/**
 * Defaults
 */
let INTERVAL = '120'; //Interval in seconds
let numberOfCalls = 10; // Number of calls
let authHeader = null;
let agent = null;
let URL = null
const args = process.argv;
const actions = [
  'url',
  'interval',
  'calls',
  'auth',
  'agent'
];
const parsedArgs = args.reduce((sum, currentVal, currentIndex, arr) => {
  if (arr[currentIndex-1].indexOf('-') !== -1) {
    const tmpAction = arr[currentIndex-1].toLowerCase().replace(/-/g, '');
    if (actions.indexOf(tmpAction) !== -1) {
      switch(tmpAction) {
        case 'url':
          URL = currentVal;
          break;
        case 'interval':
          INTERVAL = currentVal;
          break;
        case 'calls':
          numberOfCalls = currentVal;
          break;
        case 'auth':
          authHeader = currentVal;
          break;
        case 'agent':
          agent = currentVal;
          break;
      }
    } else {
      console.log(`Unknown Action ${tmpAction}`);
      process.exit(1);
    }
  }
});
/**
 * Verify fields
 */
if (URL === null) {
  console.log('URL is missing make sure to pass `-url SOMEURL`');
  process.exit(1);
}

console.log(`
  **** Starting... ****
  Making request to ${URL}
  ${numberOfCalls} times
  interval of ${INTERVAL} seconds
  Should be done in ${(parseInt(((INTERVAL * numberOfCalls))*100))/100} seconds
  ******************************************************************************************************
`);
const min = 0;
const max = 0;
const successfulResponseTimes = [];
const failureResponseTimes = [];

const options = {
  url: URL,
  headers: {
    'User-Agent': 'test',
  }
};
if (authHeader !== null) {
  options.headers['Authorization'] = authHeader;
}
if (agent !== null) {
  options.headers['User-Agent'] = agent;
}

let start = new Date().getTime();

const callback = (err, response, body) => {
  const end = new Date().getTime();
  const diff = end - start;
  if (!err && response.statusCode == 200) {
    successfulResponseTimes.push(diff);
    console.log('success');
  } else {
    failureResponseTimes.push(diff);
    console.log('fail');
  }
  console.log(`Request Took: ${diff}`);
};

setInterval(function() {
  start = new Date().getTime();
  request(options, callback);
  numberOfCalls--;
  if (numberOfCalls <= 0) {
    console.log('Done.');
    console.log(`Total Successful calls: ${successfulResponseTimes.length}`);
    var successfulReponseTimes = successfulResponseTimes.sort(function(a,b) { return a-b; });
    console.log(`\n
      **************** Successful times ****************
      Min: ${successfulReponseTimes[0]}
      Max: ${successfulReponseTimes[successfulReponseTimes.length-1]}
    `);

    if (failureResponseTimes.length > 0) {
      console.log(`Total UnSuccessful calls: ${failureResponseTimes.length}`);
      var times = successfulResponseTimes.sort(function(a,b) { return a-b; });
      console.log(`
      **************** Failure times ****************
      Min: ${times[0]}
      Max: ${times[times.length-1]}
      `)
    }
    return process.exit(0);
  }
}, INTERVAL*1000)


