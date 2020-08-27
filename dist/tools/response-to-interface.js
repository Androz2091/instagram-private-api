'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv/config');
const src_1 = require('../src');
const dist_1 = require('json-ts/dist');
const lodash_1 = require('lodash');
const fs = require('fs');
const util_1 = require('util');
const readFileAsync = util_1.promisify(fs.readFile);
const writeFileAsync = util_1.promisify(fs.writeFile);
const existsAsync = util_1.promisify(fs.exists);
const statePath = 'tools/state.json';
const ig = new src_1.IgApiClient();
async function createInterface(request, outputName) {
  const json = await request;
  const camelCasedOutputName = lodash_1.camelCase(outputName);
  let interfaces = dist_1.json2ts(JSON.stringify(json), {
    prefix: camelCasedOutputName.charAt(0).toUpperCase() + camelCasedOutputName.slice(1) + 'Response',
  });
  interfaces = interfaces.replace(/interface/g, 'export interface');
  const fileName = `${outputName}.response`;
  await writeFileAsync(`./src/responses/${fileName}.ts`, interfaces);
  console.log('Success');
  return json;
}
async function login() {
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.request.end$.subscribe(async () => {
    const state = await ig.state.serialize();
    delete state.constants;
    await writeFileAsync(statePath, JSON.stringify(state), { encoding: 'utf8' });
  });
  if (await existsAsync(statePath)) {
    await ig.state.deserialize(await readFileAsync(statePath, { encoding: 'utf8' }));
    await ig.qe.syncLoginExperiments();
  } else {
    await ig.qe.syncLoginExperiments();
    return await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  }
}
(async function mainAsync() {
  ig.state.generateDevice(process.env.IG_USERNAME);
  await login();
  try {
    console.log(
      await ig.publish.photo({
        file: await readFileAsync('D:\\ShareX\\Screenshots\\2020-01-10_19-47-29.jpg'),
      }),
    );
  } catch (e) {
    console.error(e);
    console.error(e.response.body);
  }
})();
//# sourceMappingURL=response-to-interface.js.map
