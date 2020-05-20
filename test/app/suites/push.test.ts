import fs = require('fs');
import request = require('request');
import * as messages from '../utils/messages';
import * as auth from '../utils/auth';

export { };

describe('Test Push', () => {
  it('send push request', async done => {
    request.post({
      headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Push Hook' },
      url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body: fs.readFileSync('./json/push/push.json')
    }, async (error, response, body) => {
      console.log(body)
      const msg = await messages.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  })
})

describe('Test Push (no avatar)', () => {
  it('send push request without user avatar', async done => {
    let res  = await auth.login();
    res = JSON.parse(res);
    await createUser(res.data.authToken, res.data.userId);

    request.post({
      headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Push Hook' },
      url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body: fs.readFileSync('./json/push/push-no-avatar.json')
    }, async (error, response, body) => {
      console.log(body)
      const msg = await messages.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  })
})



async function createUser(authToken, userId) {
  const channelBody = { email: 'example@example.com', name: 'Example User', password: 'pass@w0rd', username: 'test-user' };

  return new Promise((resolve, reject) => {
      request.post(
          {
              headers: {
                  'Content-Type': 'application/json',
                  'X-Auth-Token': authToken,
                  'X-User-Id': userId,
              },
              url: 'http://localhost:3000/api/v1/users.create',
              body: JSON.stringify(channelBody),
          },
          (error, res, body) => {
              if (!error && res.statusCode === 200) {
                  resolve(body);
              } else {
                  reject(error);
              }
          }
      );
  });
}