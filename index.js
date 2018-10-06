const { AthomCloudAPI, HomeyAPI } = require('athom-api');
const { join }                    = require('path');
const settings                    = require(join(process.env.HOME, '.athom-cli', 'settings.json'));

// Lifted from `athom-cli`
const CLIENT_ID     = '598d85a330e1bb0c0d75b8eb';
const CLIENT_SECRET = 'ba93fc861b204732607169fb29c2708f1da7e17f';

// XXX: CHANGE THIS TO THE ID OF A FLOW YOU WANT TO TEST
const FLOW_ID       = '....';

let athomCloudApi = new AthomCloudAPI({
  token        : settings.athomToken,
  clientId     : CLIENT_ID,
  clientSecret : CLIENT_SECRET,
});

void async function() {
  const user     = await athomCloudApi.getAuthenticatedUser();
  const homeys   = await user.getHomeys();
  const homey    = homeys[0];
  const homeyApi = await homey.authenticate();

  // Example: list all devices.
  const devices = await homeyApi.devices.getDevices();
  for (const id of Object.keys(devices)) {
    console.log(`Device ${ id }: ${ devices[id].name }`);
  }

  // Example: trigger a flow.
  const flow   = await homeyApi.flow.getFlow({ id : FLOW_ID });
  await homeyApi.flow.testFlow({ flow, tokens : [] });

  // Done.
  process.exit(0);
}();
