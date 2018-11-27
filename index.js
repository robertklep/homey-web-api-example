const { AthomApi } = require('athom-cli');

const FLOW_ID = '...';

void async function() {
  // Initialize API.
  await AthomApi._initApi();

  // Get active Homey.
  const homey = await AthomApi.getActiveHomey();

  // Example: list all devices.
  let devices = {};
  try {
    devices = await homey.devices.getDevices();
  } catch(e) {
    console.log(e);
    process.exit(1);
  }
  for (const id of Object.keys(devices)) {
    console.log(`Device ${ id }: ${ devices[id].name }`);
  }

  // Example: trigger a flow.
  const flow = await homey.flow.getFlow({ id : FLOW_ID });
  await homey.flow.testFlow({ flow, tokens : [] });

  // Done.
  process.exit(0);
}();
