'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const src_1 = require('../src');
const Bluebird = require('bluebird');
const inquirer = require('inquirer');
(async () => {
  const ig = new src_1.IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  return Bluebird.try(() => ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD))
    .catch(src_1.IgLoginTwoFactorRequiredError, async err => {
      const { username, totp_two_factor_on, two_factor_identifier } = err.response.body.two_factor_info;
      const verificationMethod = totp_two_factor_on ? '0' : '1';
      const { code } = await inquirer.prompt([
        {
          type: 'input',
          name: 'code',
          message: `Enter code received via ${verificationMethod === '1' ? 'SMS' : 'TOTP'}`,
        },
      ]);
      return ig.account.twoFactorLogin({
        username,
        verificationCode: code,
        twoFactorIdentifier: two_factor_identifier,
        verificationMethod,
        trustThisDevice: '1',
      });
    })
    .catch(e => console.error('An error occurred while processing two factor auth', e, e.stack));
})();
//# sourceMappingURL=2fa-sms-login.example.js.map
